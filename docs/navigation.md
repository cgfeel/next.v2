# NextJS路由导航总结

## 导航和刷新视图缓存

**问题：** 在`server components`下3个模式：(`SSR`、`SSG`、`ISR`)的缓存和重新验证，在官方文档所有说明中，只针对新开、刷新当前路由，而不包括路由导航之间的跳转。这就意味着，所有非单一用户产生的状态，需要在路由跳转后实时返回状态信息的页面，不能及时同步状态。

**示例：** `/rendering/src/app/link` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/link))

**解决办法：** 

 - 服务端渲染，用原生`<a>`标签代替`<Link>`组件，缺点：浏览器会有明显的刷新感，路由中`layout`页会被刷新
 - 客户端渲染，异步给链接添加`hash`值，缺点：导航链接会多出一串随机的`hash`值，路由中`layout`页不会被刷新
 - `server action`，缺点：只接受`post`请求，路由中`layout`页不会被刷新
 - 本地异步获取信息，缺点：不是服务端渲染，服务端不会输出任何静态资源，浏览器必须允许JS执行下才能运行
 - 继续往下看高级用法

**相关链接：** https://segmentfault.com/q/1010000044106831/a-1020000044112750

**附加情况：页面小部件** 

- 例如：个人中心出票状况、最新订单发货进度等等，这种可能在个人中心某一处位置的小部件，它不是整个页面主导部分，但又需要实时同步状态；
- 那么建议通过本地异步请求状态，而不要使用服务端加载（这就意味着在并行路由中，获取状态需要在本地进行异步`fetch`请求）
- 或者继续往下看高级用法

> 当然，如果存在非单一用户产生的状态（出票状况，快递进度、订单状态等），而又不需要实时同步信息的页面。无需考虑以上情况。
> 为何强调非单一用户，因为单一用户产生的状态可以通过`server action`提交信息的同时无感刷新路由视图

**源码解析：**

趴了源码看到这段，会阻止所有`Link`标签的点击事件：

```
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
    const { nodeName  } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    !isAppRouter && !(0, _islocalurl.isLocalURL)(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        const routerScroll = scroll != null ? scroll : true;
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll: routerScroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                forceOptimisticNavigation: !prefetchEnabled,
                scroll: routerScroll
            });
        }
    };
    if (isAppRouter) {
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
```

**高级用法：**

- 目录：`/rendering/src/app/link/server-action` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/link/server-action))
- 原理：服务端通过`server action`刷新，客户端通过异步发起请求，并通过`React Cache`或`zustand`这类状态机记录请求步骤

**解决的问题：**

- 能够每次导航后更新当前数据和`page`视图，不刷新整个`layout`，能够做到无感更新数据；
- 不需要通过给url添加随机`hash`后缀，也不用手动刷新页面；

## 阻塞导航

来自Semi群友的一个场景，当在表单提交或内容发布页时，需要监听用户离开，并阻塞其行为展开提示信息，待用户决定去留。这项功能在`App router`模式以前，可以监听`router.event`来实现，而在`App router`之后这个事件取消了。于是我通过`usePathname`、`useSearchParams` + `react context`的方式实现用户监听操作

https://github.com/cgfeel/next.v2/assets/578141/fe1e7f24-054a-4f56-892c-5345ac177a75


我设想了两个方法：

**方法1：监听router变化阻塞用户**

- 目录：`/routing-file/src/app/leaving/form` ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/leaving/form))

实现原理：

- 监听URL的变化
- 一旦发生改变发起确认框，点击“取消”之后立即返回前一页

缺点：

- 存在一个闪动的过程

**方法2：代理`router`对象和`Link`组件**（推荐）

- 目录：`/routing-file/src/app/leaving/proxy` ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/leaving/proxy))

实现原理：

- `router`对象，通过`ES6`的`proxy`代理转发调用
- `Link`组件，通过包装一层`forware`来实现`onClick`转发

**以上两种方法共同用到的技术：**

- 通过`React context`上下文的方式，在子组件中通知什么情况开始阻塞用户，示例采用表单内容发生变化时
- 通过`useEffect` + `beforeunload`，对浏览器默认行为进行阻塞

> 在`chrome`及相关内核中，要阻塞浏览器默认行为的前提是打开页面后，至少在页面发生或事件才能生效

**这样就监听并阻止了：**

- 点击`Link`组件发生的导航
- 通过`Router`触发的导航事件
- 浏览器默认行为：关闭、刷新、前进、后退、更改URL

**写在最后：**

在解决这个需求的时候，我发现了`NProgress.js`，可实现导航切换时顶部加载动画

```
'use client'

import Link from 'next/link'
import { PropsWithChildren, useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const CustomLink: React.FC<PropsWithChildren<{ href: string }>> = ({
    href,
    children
}) => {
    useEffect(() => {
        return () => {
            NProgress.done()
        }
    }, [])

    return (
        <>
            <Link href={href} onClick={() => NProgress.start()}>
                {children}
            </Link>
        </>
    )
}
```

相关链接：

- https://ricostacruz.com/nprogress/
- https://github.com/vercel/next.js/discussions/41934

## 一个坑点

App Dir模式下不支持`waitUntil`

> - https://nextjs.org/docs/pages/api-reference/functions/next-server#nextfetchevent
> - https://github.com/vercel/next.js/issues/50522

当时给出了3个方案：

1. `server action`非表单默认提交（无效），从上面例子中证实，`server action`并不根据`<Link>`组件跳转而执行；
2. `Api Route`异步`fetch`，有效但设置很繁琐；
3. `middleware`发起异步`fetch`（推荐），因为一个页面内容可以`no data`，但是绝对不会没有`header`；
