## NextJS 4个模式的关系

![NextJS 4个模式的关系](https://github.com/cgfeel/next.v2/assets/578141/8a4cd4c1-c07b-4782-a506-bdfd2c2690c5)

- NextJS默认所有`page`都是`SSG`，需要通过调用动态函数`cookies`、`headers`，或者通过声明`revalidate`、`dynamic`转换为`SSR`
- 可以通过`generateStaticParams`去声明`SSG`的渲染范围
- 无论`SSG`还是`SSR`，服务端所有的`fetch`都将在build前以`SSG`方式完成加载，build之后不再请求，除非将`fetch`采用`cache: 'no-store`模式（具体看上述`fetch`总结）
- `no-store`模式下，通过`revalidate`实现`ISR`
- `SSR` + `use client`实现`CSR`，`SSG`在`build`后可采用`CSR`方式对边缘计算做交互



~~SSG的坑点：~~

一旦通过`generateStaticParams`去声明`SSG`渲染，无论是在`page`中，还是在`page`上方的布局中，请不要在服务端去调用`cookies`和`headers`这样的动态函数，否则会报错`[NEXT-1181] DynamicServerError: Dynamic server usage: cookies`，见issue：https://github.com/vercel/next.js/issues/49373

阅读整个issue，你会发现有人提供了这样的解决办法：
```
export const dynamic = 'force-dynamic'
// or
export const revalidate = 0
```

实测不建议，原因有人在issue中提到了

> The `export const dynamic = 'force-dynamic` line worked for me when placed in my `layout.tsx` file, but when I navigate to a different page using the `useRouter` hook, I get the following err:
>
> `Error: Dynamic server usage: force-dynamic`

解决办法：

1. 既然声明了`SSG`，那么就遵循要求，不要在服务端去做任何`dynamic action`，如果需要做请通过本地`client`操作，如上图所示
2. 通过`middleware`去做权限判断，没有权限统一`redirect`到指定`router`

这就意味着：

- 需要鉴权才能展示请不要用`SSG`的方式，用`SSR`代替
- 如果要`SSG`，又需要做相应的交互，请在`client`中进行，参考案例：淘宝宝贝详情页是SSG，销售数据可以`client`异步获取（仅登录可见），帮助中心文档是SSG，文档点赞和评论可以`client`异步获取（仅登录可操作）
- 否则请采用解决办法中的第2条解决
