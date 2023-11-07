# NextJS渲染

思维导图中的案例：

- 代码仅供服务端使用，多语言字典：@/src/app/lang/[slug] [[查看](https://github.com/cgfeel/next.v2/tree/master/src/app/lang/%5Bslug%5D)]
- 通过`use client`包裹第三方组件包实现客户端渲染，搜索条：@/src/app/fetch/server-action/client-cart/transition/[...slug] [[查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/client-cart/transition/%5B...slug%5D)]
- 使用Context Providers在根布局中使用主题：
  - 根布局文件：@/src/app/layout.tsx [[查看](https://github.com/cgfeel/next.v2/blob/master/src/app/layout.tsx)]
  - 布局配置：@/src/lib [[查看](https://github.com/cgfeel/next.v2/tree/master/src/lib)]
- 使用Context Providers附加案例，semi-ui主题切换：https://codesandbox.io/p/sandbox/semi-ui-zhu-ti-qie-huan-45cg5l
- 通过esbuild将`use client`从文件中剥离，官方案例：
  - [react-wrap-balancer](https://github.com/shuding/react-wrap-balancer/blob/main/tsup.config.ts#L10-L13)
  - [Vercel Analytics](https://github.com/vercel/analytics/blob/main/packages/web/tsup.config.js#L26-L30)
- 下移交互组件到服务器组件，最小化分离渲染，搜索条：@/src/app/fetch/server-action/client-cart/transition/[...slug] [[查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/client-cart/transition/%5B...slug%5D)]
- 组件嵌套，客户端组件包裹服务器组件，下拉刷新：@/src/app/fetch/server-action/post [[查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/post)]
- 客户端上通过组件嵌套避免副作用，颜色选择：https://codesandbox.io/s/she-wei-zi-ji-gao-bie-fu-zuo-yong-w8dqmc?file=/src/App.js:599-618
- Edge运行时，动态图标生成：@/src/app/optimizing/metadata/[id]/icon.tsx [[查看](https://github.com/cgfeel/next.v2/blob/master/src/app/optimizing/metadata/%5Bid%5D/icon.tsx))]
- Nodejs运行时，仓库中所有没有申明运行时的路由段

<img width="1393" alt="NextJS渲染" src="https://github.com/cgfeel/next.v2/assets/578141/dfd3a37d-a5f9-4716-8504-8e03d3963fa5">
