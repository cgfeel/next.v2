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
  - 动态路由，目录`@/src/app/posts/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/posts))
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
  - 中间件，目录：`@/src/middleware.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/middleware.ts))
    - 包含：路由重定向、重写url、获取header、设置header、设置cookies
    - ---- 分割线 ----
- 4个不同的模式，说明和关系图 ([查看](#nextjs-4个模式的关系))
  - SSR模式，目录：`@/src/app/blog/time/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/page.tsx))
    - `page`和`fetch`均为`SSR`
  - CSR，目录：`@/src/app/blog/time/client/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/client/page.tsx))
  - SSG模式，目录：`@/src/app/blog/time/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/%5Bid%5D/page.tsx))
    - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
    - 访问时`[id] > 1`，则`page`为`SSR`，`fetch`缓存为`SSG`
  - ISR模式，目录：`@/src/app/blog/time/isr/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/blog/time/isr/%5Bid%5D/page.tsx))
    - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
    - 访问时`[id] > 1`，则通过`revalidate`缓存为`ISR`
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

## NextJS 4个模式的关系

- NextJS默认所有`page`都是`SSG`
- 在build前将会对所有设置过`generateStaticParams`生成静态页面
- 没有设置过的`page`将视为`dynamic page`或`sigle page`
- 只有通过`generateStaticParams`生成的`page`，每次请求时是通过`SSG`的方式，否则就是`SSR`
- 无论`SSG`还是`SSR`，所有的`fetch`都将在build前以`SSG`放下完成加载，build之后不在请求
- 除非将`fetch`采用`cache: 'no-store`模式（类似`getStaticProps`）
- `no-store`模式下，通过`revalidate`实现ISR
- `SSR` + `use client`实现`CSR`，`SSG`在`build`后可采用`CSR`方式对边缘计算做交互

![NextJS 4个模式的关系](https://github.com/cgfeel/next.v2/assets/578141/8a4cd4c1-c07b-4782-a506-bdfd2c2690c5)


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
