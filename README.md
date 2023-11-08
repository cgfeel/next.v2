# NextJs的掌握概括

基于NextJS.13、14下`App`模式，将按照官方文档，以最小示例去实现文档知识点。可直接本地运行比对下列清单，比口述归档更具直观。

> 本仓库根据英文官方文档([查看](https://nextjs.org/docs))逐字阅读整理，可通过提交记录查看历史提交 ([查看](https://github.com/cgfeel/next.v2/activity))

## 技术总结（清单）

以下清单基本按照英文官方文档章节顺序，以文档章节最小方式去复现出来。可以运行和直接打开文件查看，不用再去逐字阅读文档。

### 概览

- 安装和运行 ([查看](#getting-started-安装和运行))
- 更新，见末尾总结 ([查看](#更新))

### 路由和文件约定（Routing & File Conventions）

**包含章节：**

- [[Routing](https://nextjs.org/docs/app/building-your-application/routing)]
- [[File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)]

**运行环境：** 

- 路径：`/routing-file` ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file))
- NodeJS：`v18.13.0`
- NextJS：`13.5.6`

**示例：**

- App模式下路由和目录结构
  - 基础路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/features))
    - 包含：`layout`、`page`，
    - 1级目录：`/routing-file/src/app/features`
    - 2级目录：`/routing-file/src/app/features/metadata`
    - `_`前缀目录：`/routing-file/src/app/features/%5Fuser_post-info`
    - ---- 分割线 ----
  - 链接和导航 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/dashboard))
    - 包含：link组件，route跳转，usePathname监听路由变化
    - 目录：`@/src/app/dashboard/`
    - ---- 分割线 ----
  - 路由组 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/group))
    - 路由分组：`/routing-file/src/app/group`
    - 嵌套布局：
      - `/routing-file/src/app/group/(marketing)`
      - `/routing-file/src/app/group/(shop)`
    - ---- 分割线 ----
  - 动态路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/posts))
    - 目录：`/routing-file/src/app/posts`
    - 监听动态路由变化：
      - `/routing-file/src/app/posts/layout.tsx`
      - `/routing-file/src/app/posts/components/NavigationEvent.ts`
      - 注意：`usePathname`所在的组件需要通过`Suspense`包裹，以便拿到叶子节点的`pathname`
    - 动态路由：`/routing-file/src/app/posts/[pid]`
    - 嵌套路由：`/routing-file/src/app/posts/user/[...uid]`
    - 可选嵌套路由：`routing-file/src/app/posts/shop/[[...slug]]`
    - ---- 分割线 ----
  - loading和自定义数据流 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/posts))
    - loading，目录：`/routing-file/src/app/posts/[pid]`
    - 自定义数据流，目录：`/routing-file/src/app/posts/user/[...uid]`
    - ---- 附加案例 ----
    - 标签筛选内容：loading在error fallback中reset的用处： ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action/post))
      - 目录：`/rendering/src/app/fetch/server-action/post` ([预览](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md#%E6%A1%88%E4%BE%8B2-%E7%AD%9B%E9%80%89%E5%88%97%E8%A1%A8))
    - ---- 分割线 ----
  - error组件 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/error))
    - 捕获子级layout错误：`/routing-file/src/app/error/global`
    - 捕获同级page，目录：`/routing-file/src/app/error/path`
    - 向上抛出异常，目录：`/routing-file/src/app/error/up`
    - ---- `app`根目录 ----
    - 跟目录捕获子级异常，目录：`/routing-file/src/app/error.tsx`
    - 捕获跟目录异常，目录：`/routing-file/src/app/global-error.tsx`
    - ---- 分割线 ----
  - 插槽和平行路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/dashboard))
    - 目录：`/routing-file/src/app/dashboard`
    - 平行路由下的`page.tsx`会自动注入到`dashboard`下的`layout.tsx`
    - ---- 分割线 ----
  - 路由拦截 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/photo))
    - 拦截目录：`@/src/app/photo/@model/(.)photos/[id]`
    - 拦截目标：`@/src/app/photo/photos/[id]`，（`noscript`和直接访问）
    - 通过`/routing-file/src/app/photo/@modal/default.tsx`返回`null`，阻止插槽自动注入
    - 总结 ([查看示例](#路由拦截器-案例))
    - ---- 分割线 ----
  - Api路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/api))
    - 静态Api：`/routing-file/src/app/api/items/route.ts`
    - 模拟错误：`/routing-file/src/app/api/error`
    - 包含：不同请求处理（`POST`、`GET`）、获取`URI`、获取`COOKIES`、获取`header`
    - ---- 分割线 ----
    - 动态Api、获取请求、跨域：`/routing-file/src/app/api/items/[slug]`
    - 跳转Api：`/routing-file/src/app/api/redirect`
    - 数据流：`/routing-file/src/app/api/stream`
    - 静态资源响应：`/routing-file/src/app/api/rss.xml`
    - 总结：Api Route在安全设计上的理解 ([查看](#api-route在安全设计上的理解))
    - ---- 分割线 ----
  - 中间件 ([查看](https://github.com/cgfeel/next.v2/blob/master/routing-file/src/middleware.ts))
    - 目录：`/routing-file/src/middleware.ts`
    - 包含：路由重定向、重写url、获取header、设置header、设置cookies
    - ---- 分割线 ----
  - 本地化，只做了本地化词典本分 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/lang/%5Bslug%5D))
    - 目录：`/routing-file/src/app/lang/[slug]`
    - 还剩余两个方法`middleware`和`generateStaticParams`，由于需要调整目录结构会和当前实例冲突，目前不做演示
    - ---- 分割线 ----
  - default.js ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/photo))
    - 案例，路由拦截：`/routing-file/src/app/photo/@modal`
    - 这里说一个场景，在路由拦截中（`@`开头的目录），为了防止路由段下page默认渲染，添加一个`default.tsx`，返回`null`来阻塞
    - ---- 分割线 ----
  - not-found.js ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file))
    - 捕获当前路段：`/routing-file/src/app/file`
    - 发起捕获：`/routing-file/src/app/file/[not]`
    - 权限场景示范：`/routing-file/src/app/file/power`
    - --- `app`根目录 ---
    - 捕获全局：`/routing-file/src/app/not-found.tsx`
    - 捕获全局404：`/routing-file/src/app/[...slug]`
    - 区别：全局捕获用于接受所有路由段下抛出的`not-found`，而全局404用于捕获未知路由段提供统一展示页面
    - ---- 分割线 ----
    - 总结 ([查看](#not-foundtsx-总结))
    - ---- 分割线 ----
  - 路由段配置 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file/dynamic))
    - `dynamic`
      - 默认情况：`/routing-file/src/app/file/dynamic/(auto)`
      - 强制不缓存、强制请求不缓存：`/routing-file/src/app/file/dynamic/(force-dynamic)`
      - `error`静态模式、请求静态模式、`SSG`静态模式下允许动态参数（默认`error`模式下为静态）：`/routing-file/src/app/file/dynamic/(error)`
      - 强制静态模式（`cookie`、`header`、`searchParams`为空）：`/routing-file/src/app/file/dynamic/(force-static)`
    - `dynamicParams`：
      - `SSG`静态模式下允许动态参数：`/routing-file/src/app/file/dynamic/(dynamic-params)/in-dynmic-params/[slug]`
      - `SSG`静态模式下超出参数范围404：`/routing-file/src/app/file/dynamic/(dynamic-params)/not-in-dynmic-params/[slug]`
    - `revalidate`
      - 目录：`/routing-file/src/app/file/dynamic/(revalidate)`
      - 包含：默认强制缓存、每次请求重新验证、ISR定时重新验证
    - `fetchCache`高级设置覆盖默认缓存行为
      - 以缓存设置为准：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache`
      - 默认缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-default-cache`
      - 使用缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-only-cache`
      - 强制缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-force-cache`
      - 默认不缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-default-no-store`
      - 使用不缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-only-no-store`
      - 强制不缓存行为：`/routing-file/src/app/file/dynamic/(fetch-cache)/fetch-cache-force-no-store`
    - `runtime`（见元数据优化） ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/metadata/opengraph/%5Bid%5D))
      - 目录：`/optimizing/src/app/optimizing/metadata/opengraph/[id]/opengraph-image.tsx`
    - `generateStaticParams` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/blog/time/%5Bid%5D))
      - `/rendering/src/app/blog/time/[id]`
      - 详细见“数据获取、渲染、缓存”中4种模式
    - 其他，因为是单一例子所以放在`dynamic`的`auto`下
      - `preferredRegion`：`/routing-file/src/app/file/dynamic/(auto)/auto-preferred-region/page.tsx`
      - `maxDuration`：`/routing-file/src/app/file/dynamic/(auto)/auto-max-duration/page.tsx`
    - ---- 分割线 ----

### 数据获取、渲染、缓存（Fetching & Rendering & Caching）

**包含章节：**：

- [[Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)]
- [[Rendering](https://nextjs.org/docs/app/building-your-application/rendering)]
- [[caching](https://nextjs.org/docs/app/building-your-application/caching)]

**运行环境：** 

- 路径：`/rendering` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering))
- NodeJS：`v18.13.0`
- NextJS：`13.5.6`

**示例：**

- 数据获取
  - 数据获取和缓存 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch))
    - server components中获取数据：`/rendering/src/app/fetch/page.tsx`
    - 缓存配置
      - 路由段配置：`/rendering/src/app/fetch/revalidate/[id]`
      - ---- routing-file ----
      - fetch配置强制缓存：`/routing-file/src/app/file/dynamic/(error)/error-fetch/page.tsx`
      - fetch配置不缓存：`/routing-file/src/app/file/dynamic/(force-dynamic)/force-dynamic-revalidate`
      - 更多见路由段配置： ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file/dynamic))
    - ---- 分割线 ----
  - 重新验证
    - 定时重新验证：`/rendering/src/app/blog/time/isr/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/blog/time/isr/%5Bid%5D))
    - 缓存标签按需验证：`/rendering/src/app/fetch/server-action/revalidation` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action/revalidation))
    - 路径按需验证：`/routing-file/src/app/file/power/(list)/[slug]` ([查看](https://github.com/cgfeel/next.v2/blob/master/routing-file/src/app/file/power/(list)/%5Bslug%5D/page.tsx))
    - ---- 分割线 ----
  - 数据获取模式 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch))
    - 顺序请求+预加载数据：`/rendering/src/app/fetch/sequential/[id]`
    - 顺序请求+`suspense`优先渲染：`/rendering/src/app/fetch/suspense/[id]`
    - 并行请求：`/rendering/src/app/fetch/parallel/[id]`
    - 数据缓存详细见：`/rendering/src/app/fetch/cache`
    - ---- 附加案例 ----
    - `server-only`仅在服务端：`/routing-file/src/app/lang/[slug]` ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/lang/%5Bslug%5D))
    - ---- 分割线 ----
  - 服务端操作 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action))
    - 服务端操作（`Server-only Forms`）：`/rendering/src/app/fetch/server-action/server-cart`
    - 服务端操作提交后重新渲染视图：`/rendering/src/app/fetch/server-action/revalidation`
    - 客户端操作：`/rendering/src/app/fetch/server-action/client-cart`
    - 除表单外通过`startTransition`进行操作：`/rendering/src/app/fetch/server-action/client-cart/transition`
    - 除`startTransition`外，非表单操作：`/rendering/src/app/fetch/server-action/custom/[id]`
    - 服务端校验表单 + 设置cookies：`/rendering/src/app/fetch/server-action/validation`
    - 通过实验性Api (experimental_useFormStatus) 处理loading + Error处理 + 重定向：`/rendering/src/app/fetch/server-action/test/form-submit`
    - Zod数据校验，提供3个例子：
      - client validate + route validate: `/rendering/src/app/fetch/server-action/test/zod/user-info`
      - server validate + route validate: `/rendering/src/app/fetch/server-action/test/zod/user-info-server`
      - todolist (含错误处理): `/rendering/src/app/fetch/server-action/test/zod/todolist`
    - 通过`useOptimistic`乐观更新：`/rendering/src/app/fetch/server-action/optimistic`
    - 总结 ([查看](#nextjs-server-action总结))
    - ~~服务端非表单进行操作：`/rendering/src/app/fetch/server-action/server-cart/noform`~~ (查看：[路由导航总结](#路由导航缓存总结))
    - ---- 附赠应用场景 ----
    - 客户端轮训：`/rendering/src/app/fetch/server-action/client-cart/noform`
    - 通过`useTransition`实现的实时搜索预览：`/rendering/src/app/fetch/server-action/client-cart/transition/[...slug]` ([预览](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md#%E6%A1%88%E4%BE%8B1-%E5%AE%9E%E6%97%B6%E6%90%9C%E7%B4%A2%E9%A2%84%E8%A7%88))
    - 标签筛选内容+加载提示+错误fallback+断网fallback (包含cookies设置)：`/rendering/src/app/fetch/server-action/post` ([预览](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md#%E6%A1%88%E4%BE%8B2-%E7%AD%9B%E9%80%89%E5%88%97%E8%A1%A8))
    - 迭代更新，`Server Action`函数式和文件式有什么不同 ([预览](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md#%E6%A1%88%E4%BE%8B3-%E8%BF%AD%E4%BB%A3%E6%9B%B4%E6%96%B0))
    - ---- 分割线 ----
  - 附加案例
    - swr：`/rendering/src/app/fetch/client/list/[id]` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/client/list/%5Bid%5D))
    - HTTP库，封装`umi-request` ([查看](https://github.com/cgfeel/next.v2/blob/master/rendering/src/utils/api.ts))
      - 目录：`/rendering/src/utils/api.ts`
      - 3种模式（SSR、SSG、CSR）下均可使用，对于非`client component`下配合`deviceStorage`能够作为代替`swr`的一种解决方案
    - localStorage封装：`/rendering/src/utils/storage` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/utils/storage))
    - ---- 分割线 ----
- 渲染
  - 整理内容过长，单独总结一章 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering.md))
  - 其中包括的案例有：仅供服务器、客户端操作、上下文配置主题、esbuild配置、服务器组件和客户端组件交叉嵌套、运行时
  - 不同的渲染模式 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/blog/time))
    - 总结和关系图：
      - 23.11.6更新总结 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering-pattern.md#%E9%87%8D%E6%96%B0%E6%80%BB%E7%BB%93))
      - nextjs-4个模式的关系 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering-pattern.md#nextjs-4%E4%B8%AA%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%85%B3%E7%B3%BB))
    - SSR模式：`/rendering/src/app/blog/time/page.tsx`
    - CSR模式：`/rendering/src/app/blog/time/client`
    - SSG模式：`/rendering/src/app/blog/time/[id]`
      - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
      - 访问时`[id] > 1`，则`page`为`SSR`，`fetch`缓存为`SSG`
    - ISR模式：`/rendering/src/app/blog/time/isr/[id]`
      - 访问时`[id] = 1`，则`page`和`fetch`均为`SSG`
      - 访问时`[id] > 1`，则通过`revalidate`缓存为`ISR`
    - 补充：SSG超出范围404 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file/dynamic/(dynamic-params)/not-in-dynmic-params/%5Bslug%5D))
      - 目录：`/routing-file/src/app/file/dynamic/(dynamic-params)/not-in-dynmic-params/[slug]`
  - 附加案例
    - UI库：antd，演示服务器渲染中通过Provider提供context
      - 渲染配置：`/rendering/src/lib` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/lib))
      - 根布局引入：`/rendering/src/app/layout.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/rendering/src/app/layout.tsx))
      - 案例，实时搜索：`/rendering/src/app/fetch/server-action/client-cart/transition` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action/client-cart/transition))
    - ---- 分割线 ----
- 缓存 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/cache))
  - 请求树：
    - `/rendering/src/app/fetch/cache/layout.tsx`
    - `/rendering/src/app/fetch/cache/page.tsx`
  - 服务组件到客服组件：`/rendering/src/app/fetch/cache/client`
  - 不缓存：`/rendering/src/app/fetch/cache/nostore`
  - POST缓存：`/rendering/src/app/fetch/cache/post`
  - 预缓存：`/rendering/src/app/fetch/cache/preload`
  - 通过react缓存：`/rendering/src/app/fetch/cache/react-cache`
  - ISR：`/rendering/src/app/blog/time/isr/[id]` ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/blog/time/isr/%5Bid%5D))
  - 总结 ([查看](#nextjs-缓存总结))
  - 附加案例
    - 路由导航的缓存和视图刷新 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/link))
      - 目录：`/rendering/src/app/link`
      - 总结 ([查看](#路由导航缓存总结))
    - 刷新error fallback视图 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action/post))
      - 目录：`/rendering/src/app/fetch/server-action/post` ([预览](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md#%E6%A1%88%E4%BE%8B2-%E7%AD%9B%E9%80%89%E5%88%97%E8%A1%A8))
    - ---- 分割线 ----
 
### 样式、优化、组件、函数（Styling & Optimizing & Compoonents & Functions）

**包含章节：**：

- [[Styling](https://nextjs.org/docs/app/building-your-application/styling)]
- [[Optimizing](https://nextjs.org/docs/app/building-your-application/optimizing)]
- [[Components](https://nextjs.org/docs/app/api-reference/components)]
- [[Functions](https://nextjs.org/docs/app/api-reference/functions)]

> - 其中函数这部分作为本篇章和以上所有内容的概述，更适合Optimizing（优化）所以归纳在一起；
> - 而样式和组件关联系更大，组件仍旧和优化紧密关联，因此也放在一起总结；
> - 而优化中元数据（Metadata）在文件约定也有相关内容，为了便于理解也归纳在优化分类中
> - 由于在渲染中展示了antd，这一章将引入semi作为附加案例

**运行环境：** 

- 路径：`/optimizing` ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing))
- NodeJS：`v20.9.0`
- NextJS：`14.0.0`

**示例：**：

- 组件和优化
  - 图片 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/images))
    - 图片相关配置信息：`/optimizing/next.config.js`
      - 见`nextConfig.images`
    - 基础操作：`/optimizing/src/app/optimizing/images/page.tsx`
      - 包含：内部图片、外部图片、图片加载器、图片事件
    - 背景图片：`/optimizing/src/app/optimizing/images/background`
    - 图片占位符图片：`/optimizing/src/app/optimizing/images/color`
    - 设置断点处理图片自适应：`/optimizing/src/app/optimizing/images/fill-container`
    - 根据父容器填充图片：`/optimizing/src/app/optimizing/images/fill-container/list`
    - 默认模糊占位符图片：`/optimizing/src/app/optimizing/images/placeholder`
    - 自适应图片：`/optimizing/src/app/optimizing/images/responsive`
    - svg占位符图片：`/optimizing/src/app/optimizing/images/shimmer`
    - 备注：nextjs推荐在生产环境和独立模式下通过`sharp`进行优化 ([查看](https://nextjs.org/docs/messages/sharp-missing-in-production))
    - ---- 分割线 ----
  - 字体 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/font/google))
    - 多页共享字体库：`/optimizing/src/utils/fonts.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/optimizing/src/utils/fonts.ts))
    - 字体包含：可变字体、不可变字体
    - 组件修改字体：字体子集加载替换、通过样式名修改字体（含子组件字体），通过样式修改字体
    - 通过styled-jsx修改字体：`:root`托管全局字体变量，`:global`设置子组件字体
    - 通过字体别名设置字体、使用本地字体
    - 通过`Tailwind CSS`设置字体
    - ---- 分割线 ----
  - 链接 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/link))
    - 包含：链接、对象链接、链接替换、阻止预加载、中间件
    - 目录：`/optimizing/src/app/optimizing/link`
    - 导航监听和跳转：`/optimizing/src/app/optimizing/link/demo`
    - ---- 分割线 ----
  - 动态脚本 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/script))
    - 引入脚本，包含策略2个策略、2个内联模式：`/optimizing/src/app/optimizing/script/page.tsx`
    - 加载成功事件：`/optimizing/src/app/optimizing/script/group/chart`
    - 加载失败事件：`/optimizing/src/app/optimizing/script/group/onerror`
    - CSP组件：`/optimizing/src/app/optimizing/script/cspe/page.tsx`
    - CSP配置：`/optimizing/src/middleware.ts`
    - `urlImport`和`CSP`的坑点（整理中...）
    - 总结 ([查看](#nextjs-动态加载脚本总结))
    - ---- 分割线 ----
  - 元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/metadata))
    - 元数据重写、继承，提供`JSON-LD`，`open graph`共享，静态单个`icon`和`apple-icon`
      - 目录：`/optimizing/src/app/optimizing/metadata`
    - 动态生成描述信息，`open graph`继承、共享、覆盖，动态单个`icon`
      - 目录：`/optimizing/src/app/optimizing/metadata/[id]`
    - 静态多个`icon`，静态单个`OG image`和`twitter image`
      - 目录：`/optimizing/src/app/optimizing/metadata/multiple`
    - 动态多个`icon`，动态多个`OG image`
      - 目录：`@/src/app/optimizing/metadata/multiple/[id]`
    - 动态单个`OG image`，引入特殊字体
      - 目录：`/optimizing/src/app/optimizing/metadata/multiple/[id]`
    - `robot`，动态`sitemap`，目录：
      - `/optimizing/src/app/robots.ts`
      - `/optimizing/src/app/sitemap.ts`
    - 静态`robot`，静态`sitemap`
      - 目录：`/optimizing/src/app/@metadata`
      - 使用移动到`app`根目录，和动态资源不能并存
    - ---- 分割线 ----
  - 懒加载 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/lazy))
    - 及时懒加载、按需懒加载、客户端懒加载、加载loading、按命名懒加载
      - 目录：`/optimizing/src/app/optimizing/lazy/page.tsx`
    - 服务端懒加载：`/optimizing/src/app/optimizing/lazy/server`
    - 懒加载外部库：`/optimizing/src/app/optimizing/lazy/external`
    - ---- 分割线 ----
- 函数
  - cookies ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/cookies))
    - 目录：`/optimizing/src/app/func/cookies`
    - 包含：获取单个、获取所有、判断存在、设置、删除、设置生命周期、设置有效期
    - 备注：用`get`代替`has`判断cookies，否则在`server action`下报错
    - ---- 分割线 ----
  - draft，草稿模式见当前清单
    - Api路由 - 草稿模式 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/api/draft))
      - 目录：`/optimizing/src/app/api/draft`
    - 草稿模式 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/draft))
      - 目录：`/optimizing/src/app/optimizing/draft`
  - fetch ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/fetch))
    - 目录：`/optimizing/src/app/func/fetch`
    - 包含：缓存设置、重新校验
    - 视图标签和刷新，见当前清单：服务端操作 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/fetch/server-action/revalidation))
      - 目录：`/rendering/src/app/fetch/server-action/revalidation`
    - ---- 分割线 ----
  - 动态生成icon，见当前清单：组件和优化 - 元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/metadata))
    - 目录：`/optimizing/src/app/optimizing/metadata`
    - ---- 分割线 ----
  - metadata，元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/func/metadata))
    - 目录：`/optimizing/src/app/func/metadata`
    - 包含：title、description、baseic fields、metadataBase、openGraph、robots、icons、themeColor、manifest、twitter、viewport、verification、appleWebApp、alternates、appLinks、archives、assets、bookmarks、category、other custom、resource hints
    - 动态生成函数（含metadata的TS类型）
      - 目录：`/optimizing/src/app/optimizing/metadata`
      - 见当前清单：组件和优化 - 元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/metadata))
    - ---- 分割线 ----
  - SSG，见当前清单：4个不同的模式 ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/blog))
    - 动态路段生成静态路由(一级路段)：`/rendering/src/app/blog/[slug]`
    - 从下至上生成（多级路段）：`/rendering/src/app/blog/list/[category]/[product]`
    - 捕获全路段：`/rendering/src/app/blog/list/info/[...slug]`
    - 从上至下生成路段：`/rendering/src/app/blog/products/[category]`
    - 限定路段的静态路由 ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file/dynamic/(dynamic-params)/not-in-dynmic-params/%5Bslug%5D))
      - 目录：`/routing-file/src/app/file/dynamic/(dynamic-params)/not-in-dynmic-params/[slug]`
    - ---- 分割线 ----
  - headers ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/headers))
    - 目录：`/optimizing/src/app/func/headers`
  - ImageResponse，见当前清单：组件和优化 - 元数据 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/optimizing/metadata))
    - 目录：`/optimizing/src/app/optimizing/metadata`
  - NextRequest
    - middleware：`/optimizing/src/middleware.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/optimizing/src/middleware.ts))
    - 获取、更新、删除Cookies，同上方cookies方法一致 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/cookies))
      - 目录：`/optimizing/src/app/func/cookies`
    - ---- 分割线 ----
  - NextReponse
    - cookies操作`rewrite`和`next`：`/optimizing/src/middleware.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/optimizing/src/middleware.ts))
    - 输出JSON：`/routing-file/src/app/api/data/posts` ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/api/data/posts))
    - `redirect`：`/optimizing/src/app/api/draft` ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/api/draft))
    - ---- 分割线 ----
  - notFound，见清单：路由和文件约定，not-found ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/file))
    - 目录：`/routing-file/src/app/file`
    - 从官方文档提供的案例中，这个模式更青睐于找不到时的UI渲染，比如说：用户找不到，文章找不到，没有权限等，而404只是这个特性附带的一个功能
    - 总结 ([查看](#not-foundtsx-总结))
    - ---- 分割线 ----
  - redirect ([查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/api/redirect))
    - 目录：`/routing-file/src/app/api/redirect`
    - 如果定向到404，官方建议用`not-found`代替
    - ---- 分割线 ----
  - revalidatePath、revalidateTag ([查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/link/fetch))
    - 目录：`/rendering/src/app/link/fetch`
  - 客户端组件hooks ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/client))
    - `useParams`，包含：静态路由、动态路由、多级路由、路由全局捕获
      - 目录：`/optimizing/src/app/func/client`
    - `useRouter`，包含：监听路由变化、路由预取、路由跳转（不滚动页面）、替换页面、路由刷新、回退、前进
      - 目录：`/optimizing/src/app/func/client/router`
    - `useSearchParams`，包含：获取和判断参数，客户端静态获取、客户端静动态获取、服务端获取、更新查询参数
      - 目录：：`/optimizing/src/app/func/client/search-params`
    - 一级路由、二级路由
      - `useSelectedLayoutSegment`：`/optimizing/src/app/func/client/components/ActiveSegment.tsx`
      - `useSelectedLayoutSegments`：`/optimizing/src/app/func/client/components/Breadcrumbs.tsx`
    - ---- 分割线 ----
  - 网页指标：`useReportWebVitals` ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app/func/web-vitals))
    - 目录：`/optimizing/src/app/func/web-vitals`
    - 借助`google analytics`：监听路由`web vitals`作为非交互事件、发送交互事件、监听路由发送监听事件
    - 案例中`NEXT_PUBLIC_GA_ID`，请将自己的`google analytics`代码添加到`env.local`中，仓库没有提供
    - ---- 分割线 ----
- 案例
  - UI库：semi + [next-theme](https://github.com/pacocoursey/next-themes)主题切换 ([查看](https://github.com/cgfeel/next.v2/tree/master/optimizing/src/app))
    - 包含：
      - 配置`transpilePackages`：`/optimizing/next.config.js`
      - 服务端主题配置，目的在CSP中获取动态nonce，不需要启动CSP无需使用：`/optimizing/src/lib/Providers.tsx`
      - 客户端主题配置+next-theme主题切换：`/optimizing/src/lib/ProvidersClient.tsx`
      - 包裹主题：`/optimizing/src/app/layout.tsx`
      - 引入主题包：`/optimizing/src/app/globals.css`
      - 将主题切换挂载到`<html>`上避免闪缩：`/optimizing/src/app/semi.css`
    - 为了避免主题切换闪烁，采用了`HomeDash`（[查看](https://github.com/hamster1963/HomeDash)）的解决方案，将主题挂载到HTML下，而非官方目前推荐的body下
    - 主题切换原理：通过`script`阻塞渲染，直到`<html>`挂载主题为止，要验证防闪烁，请拷贝演示代码到本地product (`npm run start`)下运行，因为`dev`在`script`阻塞之前会阻塞所有渲染
    - ---- 分割线 ----

以下清单目录还在继续整理...

### 环境配置（Configuring & next.config.js）

**包含章节：**

- [[Configuring](https://nextjs.org/docs/app/building-your-application/configuring)]
- [[next.config.js](https://nextjs.org/docs/app/api-reference/next-config-js)]

**示例：**

- 配置文件
  - 环境变量 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/env))
    - 示例：`@/src/app/env`，配置文件：`@/.env*`
    - Node环境变量：开发环境、生产环境、默认环境、覆盖环境变量、环境变量分组
    - 浏览器环境变量：服务端组件下调用，客户端组件下调用
    - ---- 分割线 ----
  - 模块重命名见：`@/tsconfig.json`，TS配置放置后面`nextjs.config.js`一起总结
  - src目录，正如你看到当前示例，如果初始项目没有选择src目录，后期直接移动目录即可
- `next.config.js`配置 ([查看](https://github.com/cgfeel/next.v2/blob/master/next.config.js))
  - 配置文件按照属性名先后顺序排列，函数属性放置在属性名后
  - 包括：`appDir`、`assetPrefix`、`basePath`、`compress`、`devIndicators`、`distDir`、`env`、`eslint`、`generateEtags`、`keepAlive`、`mdxRs`、`onDemandEntries`、`poweredByHeader`、`productionBrowserSourceMaps`、`reactStrictMode`、`trailingSlash`
  - `generateBuildId`，生成`build-id`方法：`@/src/utils/build-id.js` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/build-id.js))
  - `header`：标头覆盖行为、路径匹配、通配符匹配、正则匹配、`header`匹配、`cookies`匹配、`query`匹配、`basePath`支持、`i18n`支持、可选属性（见`source: '/blog/:post(\\d{1,})'`）
  - `images`：`remotePatterns`、`unoptimized`、`domains`、`deviceSizes`、`imageSizes`、图片输出格式、`ttl`、文件导入、外部svg安全策略(csp)、本地图片加载器(`loader`、`loaderFile`): `@/src/utils/myImageLoader.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/myImageLoader.ts))
  - `incrementalCacheHandlerPath`：增量缓存处理器，实验功能，默认采用文件缓存 `@/src/utils/cache-handler.js` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/cache-handler.js))
  - `output`：([查看总结](#nextjs构建时导出总结))
  - `pageExtensions`：文件扩展、`NextConfig`
  - `redirects`：基础匹配、路径匹配、通配符匹配、正则匹配、特殊字符匹配、`header`匹配、`cookies`匹配、`query`匹配、`basePath`支持、`i18n`支持
  - `rewrites`：
    - 匹配周期：`beforeFiles`、`afterFiles`、`fallback`（注意配置文件中missing案例），`fallback`一个坑点和全局not-fount相关 ([查看](#not-foundtsx-总结))
    - 匹配参数：自动匹配路径、路径转换至`query`、手动匹配
    - 外部重写：路径匹配、尾斜线匹配、增量匹配
    - 其他：基础重写、路径重写、通配符重写、正则重写、特殊字符重写、`header`匹配、`cookies`匹配、`query`匹配、`basePath`支持、`i18n`支持
    - ---- 分割线 ----
  - `experimental`实验性功能：
    - 文件注释包含详细说明：`appDir`、`serverActions`、`serverComponentsExternalPackages`、`trailingSlash`、`typedRoutes`、`typescript`
    - `mdxRs`详细见下方`mdx`说明 ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/mdx))
    - output相关：`outputFileTracingExcludes`、`outputFileTracingIncludes`、`outputFileTracingRoot` ([查看总结](#nextjs构建时导出总结))
    - `urlImports`，除了配置外提供的示例：`@/src/app/optimizing/config/urlimports` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/optimizing/config/urlimports))；TS开启`urlImports`需要添加导入类型，见`tsconfig.json`中`typeRoots` ([查看](https://github.com/cgfeel/next.v2/blob/master/tsconfig.json))
    - `webpack`包含：配置函数、引入第三方包`withMDX`
    - `transpilePackages`没有实现，本次按照`multiplerepo`方式并非`monorepo`，注释列举了示例URL
    - `turbo`没有实现，因为和目前和`server action`冲突
    - `webVitalsAttribution`留个坑
    - ---- 分割线 ----
- 其他
  - mdx：`@/src/app/mdx` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/mdx))
    - 官方文档归类在配置里，但是引用的全是第三方包，配置文件：`@/next.config.js`
    - 额外用到的库：`@next/mdx`、`@mdx-js/loader`、`@mdx-js/react`、`@types/mdx`、`next-mdx-remote`
    - 本地解析（包含layout布局）：`@/src/app/mdx/page.tsx`
    - 远程解析：`@/src/app/mdx/remote`
    - 自定义组件元素：`@/src/app/mdx/custom`
    - 不包含插件`remark`（需要修改配置文件到`mjs`），不包含`mdxRs`（需要配置`rust`），当前文档主要总结`nextjs`
    - ---- 分割线 ----
    - 备注1：`mdx`的图片资源支持内部和外部，见：组件和优化-图片
    - ---- 分割线 ----
    - 坑点1：`mdx`和`nextjs`的TS体操标准不一样，见：`@/src/app/mdx/custom/page.tsx`
    - 坑点2：本地`mdx`必须`client component`否则报错，远程`mdx`基于`next-mdx-remote`，需要`server component`否则报错（或者至少把数据获取`fetch`和`MDXRemote`分开）
    - ---- 分割线 ----
 
---

## 额外总结

- NextJS渲染总结思维导图 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering.md))
- NextJS动态渲染和静态渲染总结 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering-pattern.md))
- `Server Action`实际应用场景案例 ([查看](https://github.com/cgfeel/next.v2/blob/master/docs/scenario-service-action.md))

---

## 总结

### Api Route在安全设计上的理解

- 通过`Api Route`搭建起`BFF`，通过容器内网IP和微服务进行交互，宿主机和外部都不可直接访问微服务容器
- 外网用户只能通过网关和NextJS的`Api Route`，获取微服务数据，不能直接访问微服务，也猜不到接口真实地址和具体入参信息
- 关于NextJS的3种模式
  - SSG：CI\CD下，通过build直接从微服务获取数据
  - SSR和CSR：通过`Api Route`包装的接口获取微服务数据

![Api Route在安全设计上的理解](https://github.com/cgfeel/next.v2/assets/578141/22031e79-1026-4e7b-bd79-825648467401)

### 路由拦截器-案例

目录：`@/src/app/photo` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/photo))

点开列表图片将会被拦截器阻拦，当打开照片刷新页面，将跳过阻拦进入详情页

https://github.com/cgfeel/next.v2/assets/578141/238a03f8-d9a3-4f36-8b75-5fdebd1a2eea

**路由拦截的坑点：**

只接受当前路由段拦截，其他URL均不可以。举个例子目录如下，只有`/list`下才可以拦截`/list/photo`，其他路由段无论是子级的`/list/catgory`还是相邻的`/blog`，跳转到`/list/photo`均报错，是名副其实的单页应用。

```
./list/
├── @modal
│   └── (.)photo
│   └── default.tsx
├── catgory
│   └── page.tsx
├── photo
│   └── page.tsx
├── default.tsx
├── layout.tsx
└── page.tsx
./blog/
└── page.tsx
```

### not-found.tsx 总结

![not-found tsx](https://github.com/cgfeel/next.v2/assets/578141/cd01ffa2-9c9a-41e6-be36-85a029f67c46)

**静态路由：**
 - 在路由段中先去查`page.tsx`，找到并进行渲染
 - 如果路由段中`page.tsx`抛出`notFound()`，将向`app`根目录查找`not-found.tsx`，如果整个路由段都没找到则采用默认`404`页面
 - 如果抛出`notFound()`找到`app`根目录`not-found.tsx`，先执行默认函数不渲染，然后根据路由段一级一级查找`not-found.tsx`，最后将在最接近叶子节点查找`not-found.tsx`捕获并渲染
 - 若只有根目录存在`not-found.tsx`，将渲染根目录下的`not-found.tsx`，并不断循环这个查找过程。这意味着所有找不到路由段的404都将按照这个步骤进行

**动态路由：**

 - 在路由段中先去查`page.tsx`，如果不存在将去查动态路由(`[slug]`)下的`page.tsx`
 - 如果当前路由段存在`page.tsx`，且抛出`notFound()`，则按照上面静态路由部分规则执行
 - 如果想要在动态路由段中抛出404，只要在动态路由段的`page.tsx`中抛出`notFound()`，抛出后渲染规则和静态路由段规则一致

**SSG路由(generateStaticParams)：**

 - 通过`notFound()`抛出的404，将按照上述规则，一层一层捕获
 - 通过`generateStaticParams` + `dynamicParams = false`限定路由抛出的404，将视作`not exist`通过下方`[...slug]`解决办法进行捕获

**坑点：**

由于静态路由中第三步和第四步，当访问一个不存在的路由段时，将不断循环查找过程，然而这种404的情况是很普遍的，而官方文档并没有提供任何解释和解决办法。

**我的解决办法：**

- 在`app`根目录下创建一个动态路由`[...slug]`，并且在按照上面的规则创建`page.tsx`和`not-found.tsx`，这样所有找不到路由段的404，都默认向下在`[...slug]`中进行捕获并渲染
- UML绘图使用了[revenote](https://revenote.com/)

**埋下的问题：**

如果按照上面去匹配全站404，那么会导致在`next.config.js`中使用`rewrites`的`fallback`失效。因为在根目录设置全局`not-found`匹配本身就是一种`fallback`，它属于filesystem，按照文档说法优先级高于`rewrites`的`fallback`。如果要两者并存，建议将全局`not-found`在`rewrites`外部的网站进行匹配，这样就相当于`location` - `external site` - `not-found`

**备注：**

- 抛出`notFound()`时，无论如何都会去执行`app`根目录`not-found.tsx`除非这个文件也不存在。
- 只要存在`not-found`文件，那么路由段下无论是否发生错误，这段静态资源就必须输出，如果文件里有`fetch`请求，无论是否错误也会执行
- 同理，结合这里提到的`cache`缓存部分，当前路段所有的`fetch`请求都会记录缓存，无论是从`layout`到`not-found`，还是从`not-found`到`page`

**not-found场景复现**：复现了需登录登录查看文章的流程

https://github.com/cgfeel/next.v2/assets/578141/9c9b89e9-39c1-4ca1-856b-5d520b88ec55

目录：`@/src/app/file/power` ([查看](src/app/file/power))

步骤：

- 访问`/file/power/[slug]`先检查权限，不够权限由`layout.tsx`抛出`notFound`，被`/file/power/not-found.tsx`捕获，并指引登录
- 权限够正常访问
- 权限够访问`[slug]`为4，由`page.tsx`抛出`notFound`，经由`/file/power/not-found.tsx`后被`/file/power/(list)/not-found.tsx`捕获，并提示找不到内容

原理：

- 同级目录下`layout`包裹了`not-found`，再包裹了子集的`page.tsx`，当权限不够由`layout`抛出的`notFound`只能被上一级的`not-found`捕获
- 当叶子节点`page`抛出`notFound`，将会一层一层进行捕获，最终会在最接近`page`层级下的`notFound`捕获进行渲染

备注：复现时分别发现两个坑点，请分别查看`server action`([查看](#nextjs-server-action总结))和NextJS 4个模式的关系([查看](https://github.com/cgfeel/next.v2/blob/master/docs/rendering-pattern.md#nextjs-4%E4%B8%AA%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%85%B3%E7%B3%BB))

### NextJS 缓存总结

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

### NextJS Server Action总结

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

~~**坑点1：`Server Action` + `redirect`**~~(13.5已修复，见末尾更新说明 - [查看](#更新))

<details>

<summary>展开此前的记录</summary>

- 不要在`Server Action`中直接调用`redirect`，否则会警告`failed to get redirect response TypeError: fetch failed`
- 正确做法，`Server Action`后通过`revalidateTag`或`revalidatePath`刷新视图，在视图中根据情况`redirect`

</details>

**坑点2：`Server Action` + `cookies().has()`**

- 不要在`Server Action`后去判断`cookies().has()`，会提示`has`这个方法补存在，也不要用`get`后去转换成`boolean`，因为删除`cookies`后对象依旧存在，只是值为空了
- 解决办法：`@/src/app/file/power/lib.ts`

### NextJS 动态加载脚本总结

示例采用[`cdn.jsdelivr.net`](https://www.jsdelivr.com/)作为外部脚本公共库，查看演示前先确保能够正常访问仓库资源。

**坑点1：两个策略**

- `beforeInteractive`：在`App dir`模式下，按照官方文档添加到根目录下的`layout`，会提示错误“No Before Interactive Script Outside Document” ([查看](https://nextjs.org/docs/messages/no-before-interactive-script-outside-document))，要求你放到`page`目录下，然而`app`和`page`两个模式并不可以同时存在
- `worker`：在`App dir`模式下，文档已明确目前不可用：`The worker strategy is not yet stable and does not yet work with the app directory. Use with caution.`

**坑点2：编译检测**

假定你远程调用`echart`，完成后有个全局的`echat`对象，编译时会异常提醒`echat`这个对象不存在，于是我将代码用字符的形式包裹起来，用`event`调用，编译通过，这样就埋下第3个坑

~~**坑点3：CSP**~~（并入CSP总结）

<details>

<summary>展开此前的记录</summary>

- 对于`script-src`和`style-src`，默认要求配置`self`，而对于有在组件上写CSS的情况，`style-src`还需要设置`unsafe-inline`
- 对于`script-src`，如果有客户端组件用到JS的情况（例如：`useEffect`），必须设置`unsafe-inline`才能执行
- 对应坑点2，有使用到`eval`、`setTimeout`、`setInterval`和`Function`等函数，必须设置`unsafe-eval`才能执行

</details>

~~**坑点4：CSP-nonce模式**~~（并入CSP总结）

<details>

<summary>展开此前的记录</summary>

> NextJS加载动态脚本分两部分：①通过`link`元素将远程的`script`下载下来；②按照组件情况插入`script`

接着说坑点：

- 对于使用`nonce`模式，那么一定会造成`unsafe-inline`失效，因为NextJS，不会根据你设置`nonce`的Hash值，动态去匹配每一个内联脚本，也就不会去执行
- 设置了`nonce`模式，如果是外部脚本，同样需要配置`domain`，它关系到外部的脚本在`link`标签下会不会下载，而`nonce`的Hash值决定下载后会不会动态插入到`document`
- 由于第一点问题，`nonce`模式下，`onLoad`和`onReady`，同样不会执行

总结：如果需要使用`csp`的`nonce`模式需要自行考虑了。如果不考虑引入外部脚本，那么`csp`完全可以解决`XSS`的问题。对于图片组件安全，配置安全作用域，对于脚本安全，可以采用`csp`作为安全解决方案

</details>

### CSP总结

**规范标准**（驳回：动态加载脚本坑点3）

- 使用上没有特定的规范标准，按实际情况来，通过调试工具查看错误信息进行调整
- 难点肯定不在NextJS，而是在于项目中引入的第三方库
- --- 仓库案例中遇到的问题 ---
- next-theme
  - 支持`unsafe-inline`或`nonce`，需要开启`unsafe-event`，无第三方CSS
- echart
  - 支持`unsafe-inline`或`nonce`，需要开启`unsafe-event`，不能启用严格模式`strict-dynamic`，否则url报错，目前暂无解
  - 动态引入的CSS不支持`nonce`，所以`style-src`不支持`nonce`
- google analytics
  - 适配度最好，会根据当前页面自动匹配`nonce`，需要开启`unsafe-event`
  - 由于会引入第三方资源，需要在`img-src`和`default-src`启用安全域名
 
**坑点1：nonce**（对应：动态加载脚本坑点4）

目前不用纠结是否要使用`nonce`，因为NextJS目前为止（14.0.0），在构建后`start`环境下会丢失`nonce`的值。详细见：https://github.com/vercel/next.js/issues/55638

### `urlImport`的一个坑

在启用`urlImport`导入外部的`script`后，请不要同时在`next.config.js`中启用`transpilePackages`，否则会提示一段：`undefinde export {default} ...`之类的错误，留一个坑待日后再观察

### 路由导航缓存总结

**问题：** 在`server components`下3个模式：(`SSR`、`SSG`、`ISR`)的缓存和重新验证，在官方文档所有说明中，只针对新开、刷新当前路由，而不包括路由导航之间的跳转。这就意味着，所有非单一用户产生的状态，需要在路由跳转后实时返回状态信息的页面，不能及时同步状态。

**示例：** `@/src/app/link` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/link))

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

- 目录：`@/src/app/link/server-action` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/link/server-action))
- 原理：服务端通过`server action`刷新，客户端通过异步发起请求，并通过`React Cache`或`zustand`这类状态机记录请求步骤

**解决的问题：**

- 能够每次导航后更新当前数据和`page`视图，不刷新整个`layout`，能够做到无感更新数据；
- 不需要通过给url添加随机`hash`后缀，也不用手动刷新页面；

---

**再补充一个群里提到的一个坑点：**

App Dir模式下不支持`waitUntil`

> - https://nextjs.org/docs/pages/api-reference/functions/next-server#nextfetchevent
> - https://github.com/vercel/next.js/issues/50522

当时给出了3个方案：

1. `server action`非表单默认提交（无效），从上面例子中证实，`server action`并不根据`<Link>`组件跳转而执行；
2. `Api Route`异步`fetch`，有效但设置很繁琐；
3. `middleware`发起异步`fetch`（推荐），因为一个页面内容可以`no data`，但是绝对不会没有`header`；

### NextJS构建时导出总结

构建导出包含3个模式：`default`、`export`、`standalone`

**export：纯静态模式，或采用客户端单页应用模式**

方法：在`next.config.js`中添加`output: 'export'`

说明：纯静态化，将根据路由导出静态文件到`out`目录，需要借助web server运行 ([示例](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#deploying))

缺点：不能在服务端进行动态路由处理，动态函数处理 ([查看](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features))

**default：默认模式**

方法：在`next.config.js`去掉`output`属性（默认没有启用）

说明：支持服务端静态和动态导出，导出将存放至`.next`目录，部署时需要按照开发环境目录连同`.next`一起运行

缺点：项目占用大；不支持`monorepo`模式；依赖`next cli`和`node_modules`；

**standalone：独立模式**

方法：在`next.config.js`中添加`output: 'standalone'`

说明：

- 支持服务端静态和动态导出，导出将存放至`.next/standalone`目录，部署时需仅需提供`standalone`目录，运行`node server.js`
- 其中`public`或`.next/static`需要手动添加到`standalone`目录，官方推荐存放至CDN，这样就需要在`next.config.js`中用到第二个属性：`assetPrefix`

优点：项目占用小，仅根据所需文件追踪；支持`monorepo`模式；不依赖`next cli`和`node_modules`（也拷贝到`standalone`目录），通过`node`即可启动服务

对于`monorepo`模式，`standalone`还提供几个实验性的功能：`outputFileTracingExcludes`、`outputFileTracingIncludes`、`outputFileTracingRoot`，说明见`next.config.js` ([查看](https://github.com/cgfeel/next.v2/blob/master/next.config.js))

> 对于`default`模式和`standalone`模式，如果项目中有使用`next\image`加载器的情况，构建时官方建议安装`sharp`依赖 ([查看](https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files))

### Getting Started (安装和运行)

当前默认认为看的用户能力均能本地安装和运行，所以这里直接采用官方提供的内容，不做额外说明，对于我运行的环境补充一下。

- 系统：macOS, Windows (including WSL), and Linux（我是OSX）
- node版本：v18.12.1（官方推荐^16.8，16.0运行过会报错）
- React：18.2.0

> - 由于仓库已安装过了，如果需要本地运行，请clone项目后直接`npm install`
> - 在官方文档中提到过，如果要在包含`TypeScript`的服务端组件中使用`async`/`await`，请确保你的`TypeScript`的版本为`5.1.3`或更高，`@types/react`版本为`18.2.8`或更高 ([查看](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating))

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

#### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### 更新

尝试了一次从`13.4.9`更新到`13.5.2`，做一个初步的记录，更新方法如下：

```
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

一些差异：

- `next.config.js`中`experimental`不再需要设置`appDir`，也支持并行渲染路由段下添加子目录，升级后将其去掉
- `next dev`环境下，不再展示`fetch`的情况，包括缓存激活，丢失的情况，渲染树的情况
- 修复了上面提到的在`server action`中重定向`redirect`报错
- 离谱的来了，`Api`路由中必须返回`Response`，这就意味着，请不要试图通过`redirect`或者`NextResponse.redirect`去进行重定向，而是手写一个带有`30*`头部的`Response`（对于这个问题，官方文档到目前还未改动）

这次更新更多内容见官方发布：https://nextjs.org/blog/next-13-5
