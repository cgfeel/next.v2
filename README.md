# NextJs的掌握概括

基于NextJS.13下`App`模式，将按照官方文档，将掌握的内容通过简短的示范进行展示。可直接本地运行比对下列清单，比口述概括掌握的能力更具直观。

> 仓库源码由我本人整理，共享，可通过提交记录中的信息和日期进行确认 ([查看](https://github.com/cgfeel/next.v2/activity))

## 技术总结（清单）

- 安装和运行 ([查看](#getting-started-安装和运行))
- App模式下路由和目录结构
  - 基础路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/features))
    - 1级目录`@/src/app/features/`
    - 2级目录`@/src/app/features/metadata/`
    - 文件划分：`layout`、`page`，
    - ---- 分割线 ----
  - 链接和导航，目录`@/src/app/dashboard/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/dashboard))
    - 包含：link组件，route跳转，usePathname监听路由变化
    - ---- 分割线 ----
  - 路由组 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/group))
    - 路由分组，目录`@/src/app/group/`
    - 嵌套布局，目录`@/src/app/group/(marketing)/blog`、`@/src/app/group/(shop)/cart`
    - ---- 分割线 ----
  - 动态路由`@/src/app/posts/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/posts))
    - 监听动态路由变化：`@/src/app/posts/[pid]/layout.tsx`
    - 动态路由：`@/src/app/posts/[pid]`
    - 嵌套路由：`@/src/app/posts/user/[...uid]`
    - 可选嵌套路由：`@/src/app/posts/shop/[[...slug]]`
    - ---- 分割线 ----
  - loading和自定义数据流
    - loading，目录：`@/src/app/posts/[pid]` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/posts/%5Bpid%5D))
    - 自定义数据流，目录：`@/src/app/posts/user/[...uid]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/posts/user/%5B...uid%5D/page.tsx))
    - ---- 分割线 ----
  - error组件 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/error))
    - 捕获子级layout，目录：`@/src/app/error/global`
    - 捕获同级page，目录：`@/src/app/error/path`
    - 向上抛出异常，目录：`@/src/app/error/up`
    - 跟目录捕获子级异常，目录：`@/src/app/error.tsx`
    - 捕获跟目录异常，目录：`@/src/app/global-error.tsx`
    - ---- 分割线 ----
  - 插槽和平行路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/dashboard))
    - 平行路由，目录`@/src/app/dashboard`
    - 插槽：`@/src/app/dashboard/layout.tsx`
    - 平行路由和`subroot`下的`page.tsx`会自动注入到`dashboard`下的`layout.tsx`
    - ---- 分割线 ----
  - 路由拦截 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/photo))
    - 目录下`@/src/app/photo/@model/(.)photos/[id]`会主动拦截上级目录`@/src/app/photo/photos/[id]`
    - 通过`@model/default.ts`返回`null`，阻止插槽自动注入
    - 从首页打开拦截的照片弹窗，刷新页面将不再被拦截，主动展示详情页 ([查看示例](#路由拦截器实现的案例))
    - ---- 分割线 ----
  - Api路由 ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/api))
    - 静态Api：`@/src/app/api/items/route.tsx`
    - 模拟错误：`@/src/app/api/error/route.tsx`
    - 包含：不同请求处理（`POST`、`GET`）、获取`URI`、获取`COOKIES`、获取`header`
    - ---- 分割线 ----
    - 动态Api、获取请求、跨域：`@/src/app/api/items/[slug]/route.tsx`
    - 跳转Api：`@/src/app/api/redirect/route.tsx`
    - Api数据流：`@/src/app/api/stream/route.tsx`
    - 静态资源响应：`@/src/app/api/rss.xml/route.tsx`
    - ---- 分割线 ----
    - Api Route在安全设计上的理解 ([查看](#api-route在安全设计上的理解))
    - ---- 分割线 ----
  - 中间件：`@/src/middleware.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/middleware.ts))
    - 包含：路由重定向、重写url、获取header、设置header、设置cookies
    - ---- 分割线 ----
  - 本地化，目录：`@/src/app/lang/[slug]` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/lang/%5Bslug%5D))
    - 只做了本地化词典本分
    - 还剩余两个方法`middleware`和`generateStaticParams`，由于需要调整目录结构会和当前实例冲突，目前不做演示
    - ---- 分割线 ----
- 数据获取
  - 静态和动态数据获取 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch))
    - server components中获取数据：`@/src/app/fetch/page.tsx`
    - 并行请求：`@/src/app/fetch/parallel/[id]/page.tsx`
    - 通过`suspense`优先渲染：`@/src/app/fetch/suspense/[id]/page.tsx`
    - 顺序请求：`@/src/app/fetch/sequential/[id]/page.tsx`
    - 缓存配置：`@/src/app/fetch/revalidate/[id]/page.tsx`
    - ---- 分割线 ----
  - 缓存 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/cache))
    - 请求树：`@/src/app/fetch/cache/page.tsx`
    - 服务组件到客服组件：`@/src/app/fetch/cache/client/page.tsx`
    - 不缓存：`@/src/app/fetch/cache/nostore/page.tsx`
    - POST缓存：`@/src/app/fetch/cache/post/page.tsx`
    - 预缓存：`@/src/app/fetch/cache/preload/page.tsx`
    - 通过react缓存：`@/src/app/fetch/cache/react-cache/page.tsx`
    - ISR：`@/src/app/blog/time/isr/page.tsx`
    - 总结 ([查看](#nextjs-缓存总结))
    - ---- 分割线 ----
  - 重新验证
    - `fetch`静默更新：`@/src/app/blog/time/isr/page.tsx`
    - 配置文件静默更新：`@/src/app/blog/time/isr/revalidate/page.tsx`
    - 动态标签更新（`revalidateTag`）：`@/src/app/fetch/server-action/revalidation/page.tsx`
    - ---- 分割线 ----
  - 服务端操作 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action))
    - 服务端操作（`action`、`formAction`）：`@/src/app/fetch/server-action/server-cart/page.tsx`
    - 客户端操作：`@/src/app/fetch/server-action/client-cart/page.tsx`
    - 除表单外通过`startTransition`进行操作：`@/src/app/fetch/server-action/client-cart/transition/page.tsx`
    - 除`startTransition`外，非表单操作：`@/src/app/fetch/server-action/custom/[id]/page.tsx`
    - 本地实验功能`useOptimistic`：`@/src/app/fetch/server-action/optimistic/page.tsx`
    - 服务端操作提交后重新渲染视图：`@/src/app/fetch/server-action/revalidation/page.tsx`
    - 服务端校验表单、设置cookies：`@/src/app/fetch/server-action/validation/page.tsx`
    - 服务端非表单进行操作：`@/src/app/fetch/server-action/server-cart/noform/page.tsx`
    - 客户端轮训：`@/src/app/fetch/server-action/client-cart/noform/page.tsx`
    - 总结 ([查看](#nextjs-server-action总结))
    - ---- 分割线 ----
- 组件和优化
  - 图片 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/images))
    - 图片相关配置信息：`@/next.config.js`，见`nextConfig.images`
    - 基础操作：`@/src/app/optimizing/images/page.tsx`，包含：内部图片、外部图片、图片加载器、图片事件
    - 背景图片：`@/src/app/optimizing/images/background`
    - 图片占位符图片：`@/src/app/optimizing/images/color/page.tsx`
    - 设置断点处理图片自适应：`@/src/app/optimizing/images/fill-container/page.tsx`
    - 根据父容器填充图片：`@/src/app/optimizing/images/fill-container/list/page.tsx`
    - 默认模糊占位符图片：`@/src/app/optimizing/images/placeholder/page.tsx`
    - 自适应图片：`@/src/app/optimizing/images/responsive`
    - svg占位符图片：`@/src/app/optimizing/images/shimmer/page.tsx`
    - 备注：nextjs推荐在生产环境和独立模式下通过`sharp`进行优化 ([查看](https://nextjs.org/docs/messages/sharp-missing-in-production))
    - ---- 分割线 ----
  - 字体 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/font/google))
    - 多页共享字体库：`@/src/utils/fonts.ts`
    - 字体包含：可变字体、不可变字体、
    - 组件修改字体：字体子集加载替换、通过样式名修改字体（含子组件字体），通过样式修改字体
    - 通过styled-jsx修改字体：`:root`托管全局字体变量，`:global`设置子组件字体
    - 通过字体别名设置字体、使用本地字体
    - 通过`Tailwind CSS`设置字体
    - ---- 分割线 ----
  - 链接 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/link))
    - 目录：`@/src/app/optimizing/link`
    - 包含：链接、对象链接、链接替换、阻止预加载、中间件
    - 导航监听和跳转：`@/src/app/optimizing/link/demo`
    - ---- 分割线 ----
  - 动态脚本 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/script))
    - 引入脚本，包含策略2个策略、2个内联模式：`@/src/app/optimizing/script/page.tsx`
    - 加载成功事件：`@/src/app/optimizing/script/group/chart/page.tsx`
    - 加载失败事件：`@/src/app/optimizing/script/group/onerror/page.tsx`
    - CSP组件：`@/src/app/optimizing/script/cspe/page.tsx`
    - CSP配置：`@/next.config.js`，见`nextConfig.headers`中`script`部分
    - 总结 ([查看](#nextjs-动态加载脚本总结))
    - ---- 分割线 ----
  - 元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/metadata))
    - 元数据重写、继承，提供`JSON-LD`，`open graph`共享，静态单个`icon`和`apple-icon`：`@/src/app/optimizing/metadata`
    - 动态生成描述信息，`open graph`继承、共享、覆盖，动态单个`icon`：`@/src/app/optimizing/metadata/[id]`
    - 静态多个`icon`，静态单个`OG image`和`twitter image`：`@/src/app/optimizing/metadata`
    - 动态多个`icon`，动态多个`OG image`：`@/src/app/optimizing/metadata/multiple/[id]`
    - 动态单个`OG image`，引入特殊字体：`@/src/app/optimizing/metadata/opengraph/[id]`
    - 动态`robot`，动态`sitemap`：`@/src/app/robots.ts`和`@/src/app/sitemap.ts`
    - 静态`robot`，静态`sitemap`（使用移动到`app`根目录）：`@/src/app/@metadata`
    - ---- 分割线 ----
  - 懒加载 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/lazy))
    - 及时懒加载、按需懒加载、客户端懒加载、加载loading、按命名懒加载：`@/src/app/optimizing/lazy/page.tsx`
    - 服务端懒加载：`@/src/app/optimizing/lazy/server/page.tsx`
    - 懒加载外部库：`@/src/app/optimizing/lazy/external/page.tsx`
    - ---- 分割线 ----
- 配置文件
  - 环境变量 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/env))
    - 示例：`@/src/app/env`，配置文件：`@/.env*`
    - Node环境变量：开发环境、生产环境、默认环境、覆盖环境变量、环境变量分组
    - 浏览器环境变量：服务端组件下调用，客户端组件下调用
    - ---- 分割线 ----
  - 模块重命名见：`@/tsconfig.json`，TS配置放置后面`nextjs.config.js`一起总结
- 4个不同的模式，说明和关系图 ([查看](#nextjs-4个模式的关系))
  - SSR模式：`@/src/app/blog/time/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/page.tsx))
    - `page`和`fetch`均为`SSR`
  - CSR模式：`@/src/app/blog/time/client/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/client/page.tsx))
  - SSG模式：`@/src/app/blog/time/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/%5Bid%5D/page.tsx))
    - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
    - 访问时`[id] > 1`，则`page`为`SSR`，`fetch`缓存为`SSG`
  - ISR模式：`@/src/app/blog/time/isr/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/isr/%5Bid%5D/page.tsx))
    - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
    - 访问时`[id] > 1`，则通过`revalidate`缓存为`ISR`
    - ---- 分割线 ----
- 其他
  - antd，只为展示引用`antd`库，并非做页面：`@/src/app/antd/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/antd/page.tsx))
  - swr：`@/src/app/posts/list/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/posts/list/%5Bid%5D/page.tsx))
  - HTTP库，封装`umi-request`，3种模式（SSR、SSG、CSR）下均可使用，对于非`client component`下配合`deviceStorage`能够作为代替`swr`的一种解决方案：`@/src/utils/api.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/api.ts))
  - localStorage封装：`@/src/utils/storage/deviceStorage.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/storage/deviceStorage.ts))

## Api Route在安全设计上的理解

- 通过`Api Route`搭建起`BFF`，通过容器内网IP和微服务进行交互，宿主机和外部都不可直接访问微服务容器
- 外网用户只能通过网关和NextJS的`Api Route`，获取微服务数据，不能直接访问微服务，也猜不到接口真实地址和具体入参信息
- 关于NextJS的3种模式
  - SSG：CI\CD下，通过build直接从微服务获取数据
  - SSR和CSR：通过`Api Route`包装的接口获取微服务数据

![Api Route在安全设计上的理解](https://github.com/cgfeel/next.v2/assets/578141/22031e79-1026-4e7b-bd79-825648467401)

## 路由拦截器实现的案例

点开列表图片将会被拦截器阻拦，当打开照片刷新页面，将跳过阻拦进入详情页

https://github.com/cgfeel/next.v2/assets/578141/238a03f8-d9a3-4f36-8b75-5fdebd1a2eea

## NextJS 缓存总结

![image](https://github.com/cgfeel/next.v2/assets/578141/f0e49045-cd9d-480a-94ab-93e06a3743d8)

- 缓存是树状结构，如上图官方所示，缓存只加载请求1次，多次相同链接的请求将按照第一次的结果从缓存中获取数据
- 如果要刷新缓存，通过`fetch`设置`no-store`或`export const revalidate = 0`
- 在请求树中相同链接的请求，只要有1个请求设置了重新验证，整个树所有请求都将重新向服务端发起请求（注1）
- 关于`POST`请求缓存的一处错误（注2）
- `POST`和`GET`缓存不同在于，`POST`如果链接相同，请求参数不同，将视作新的请求而不从缓存中获取，而`GET`没有，见`@/src/app/fetch/cache/post`
- 对于预存取的用法，在官方文档有提到（注3）
- 对于react的`cache`组件缓存（注3）
- 对于客户端组件，它本身和服务端组件不是一套组件，所以在客服端组件中，无论怎么刷新时间，都不重新渲染服务端，也不会使用服务端的缓存

**注1：** `@/src/app/fetch/cache/post/revalidate`

- 包含两个Api：`worldtimeapi`、`timeapi`
- 请求树链路：`cache/layout.tsx` - `cache/post/layout.tsx` - `cache/post/revalidate/page.tsx`
- 在`page.tsx`刷新缓存，整个树全部刷新，无论链接、请求方式，参数、层级，整个请求树缓存都重新请求
- 在重新请求过程中遵循缓存规则，后一条请求获取第一条请求结果的缓存

**注2：** `@/src/app/fetch/cache/post`

文档是这么说的

> Dynamic methods (next/headers, export const POST, or similar) are used and the fetch is a POST request (or uses Authorization or cookie headers)
 
实测：

1. post请求也缓存，请求缓存不缓存取决于`no-store`和`revalidate`
2. 除非这个post请求位于`server action`中，这样即便是get请求一样会重新请求
  
**注3：** 

官方不建议通过props跨层级传递数据，而建议重复使用fetch获取数据，因为NextJS中`fetch`的结果是默认获取上一条相同请求的缓存

> In this new model, we recommend fetching data directly in the component that needs it, even if you're requesting the same data in multiple components, rather than passing the data between components as props.

关于react的`cache`组件，官方备注一条：即便你不这样做，NextJS在`fetch`时默认也会缓存，并且推荐默认的做法

> `fetch()` caches requests automatically, so you don't need to wrap functions that use `fetch()` with `cache()`. See automatic request deduping for more information.

## NextJS Server Action总结

`use server`：

- 大部分情况是用于表单验证，非表单验证的情况下可做后台静默更新（例如埋点检测并更新用户信息）
- 在官方文档里提到这个功能目前是实验性的，对于用在表单场景的交互更多可能出于本地JS被禁用的情况
- 在服务端非表单情况下，可以不使用'use server'交互，但这样就意味着只能只能在构建时生效
- 反之，所有'use server'都脱离了缓存
  
**服务端提交后交互**：

- 文档里写到通过`redirect`、`revalidatePath`、`revalidateTag`（示范中提供了`revalidateTag`）
- 以示范文件说原理：页面首次fetch，得到未认证的结果，提交表单`revalidateTag`重新验证，视图中的fetch再次请求得到认证状态，重新渲染视图

`use client`：

- 可用于表单，也可以是非表单的操作（诸如：轮训，见示例文件）
- 对于表单验证，本地验证更符合当下交互习惯

**轮训场景**：

- 例如微信扫码登录，先从`server action`提交`OAUTH`认证，拿到`token`后交给客户端轮训登录状态
- 以示范文件说原理：先发起`server action`，通过后本地使用`swr`轮训状态

## NextJS 4个模式的关系

![NextJS 4个模式的关系](https://github.com/cgfeel/next.v2/assets/578141/8a4cd4c1-c07b-4782-a506-bdfd2c2690c5)

- NextJS默认所有`page`都是`SSG`
- 在build前将会对所有设置过`generateStaticParams`生成静态页面，没有设置过将视为`server components`
- 只有通过`generateStaticParams`生成的`page`，渲染时是通过`SSG`的方式，否则就是`SSR`
- 无论`SSG`还是`SSR`，所有的`fetch`都将在build前以`SSG`方式完成加载，build之后不再请求
- 除非将`fetch`采用`cache: 'no-store`模式（类似`getStaticProps`）
- `no-store`模式下，通过`revalidate`实现`ISR`
- `SSR` + `use client`实现`CSR`，`SSG`在`build`后可采用`CSR`方式对边缘计算做交互

## NextJS 动态加载脚本总结

示例采用[`cdn.jsdelivr.net`](https://www.jsdelivr.com/)作为外部脚本公共库，查看演示前先确保能够正常访问仓库资源。

**坑点1：两个策略**

- `beforeInteractive`：在`App dir`模式下，按照官方文档添加到根目录下的`layout`，会提示错误“No Before Interactive Script Outside Document” ([查看](https://nextjs.org/docs/messages/no-before-interactive-script-outside-document))，要求你放到`page`目录下，然而`app`和`page`两个模式并不可以同时存在
- `worker`：在`App dir`模式下，文档已明确目前不可用：`The worker strategy is not yet stable and does not yet work with the app directory. Use with caution.`

**坑点2：编译检测**

假定你远程调用`echart`，完成后有个全局的`echat`对象，编译时会异常提醒`echat`这个对象不存在，于是我将代码用字符的形式包裹起来，用`event`调用，编译通过，这样就埋下第3个坑

**坑点3：CSP**

- 对于`script-src`和`style-src`，默认要求配置`self`，而对于有在组件上写CSS的情况，`style-src`还需要设置`unsafe-inline`
- 对于`script-src`，如果有客户端组件用到JS的情况（例如：`useEffect`），必须设置`unsafe-inline`才能执行
- 对应坑点2，有使用到`eval`、`setTimeout`、`setInterval`和`Function`等函数，必须设置`unsafe-eval`才能执行

**坑点4：CSP-nonce模式**

> NextJS加载动态脚本分两部分：①通过`link`元素将远程的`script`下载下来；②按照组件情况插入`script`

接着说坑点：

- 对于使用`nonce`模式，那么一定会造成`unsafe-inline`失效，因为NextJS，不会根据你设置`nonce`的Hash值，动态去匹配每一个内联脚本，也就不会去执行
- 设置了`nonce`模式，如果是外部脚本，同样需要配置`domain`，它关系到外部的脚本在`link`标签下会不会下载，而`nonce`的Hash值决定下载后会不会动态插入到`document`
- 由于第一点问题，`nonce`模式下，`onLoad`和`onReady`，同样不会执行

总结：如果需要使用`csp`的`nonce`模式需要自行考虑了。如果不考虑引入外部脚本，那么`csp`完全可以解决`XSS`的问题。对于图片组件安全，配置安全作用域，对于脚本安全，可以采用`csp`作为安全解决方案

## Getting Started (安装和运行)

当前默认认为看的用户能力均能本地安装和运行，所以这里直接采用官方提供的内容，不做额外说明，对于我运行的环境补充一下。

- 系统：macOS, Windows (including WSL), and Linux（我是OSX）
- node版本：v18.12.1（官方推荐^16.8，16.0运行过会报错）

> 由于仓库已安装过了，如果需要本地运行，请clone项目后直接`npm install`

----

以下是官方文档内容：

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
