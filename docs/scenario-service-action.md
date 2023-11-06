# Server Action应用场景

## 案例1-实时搜索预览

目录：`@/src/app/fetch/server-action/client-cart/transition/[...slug]` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/client-cart/transition/%5B...slug%5D))

通过`startTransition`实现的，输入完成后会通过`router`导航到搜索结果页，页面根据导航提供的`slug`展示搜索结果

https://github.com/cgfeel/next.v2/assets/578141/ebd18cec-8ba6-40e6-888f-4b6e74d334cf

## 案例2-筛选列表

https://github.com/cgfeel/next.v2/assets/578141/11d3c7ab-5908-47c4-8522-f6c890cf2af9

目录：`@/src/app/fetch/server-action/post` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/post))

来自字节大佬的需求：

 - 页面分标签选项和内容列表，选择标签后，内容变换标签位置内容都不变，解决：layout+page
 - 内容必须是服务端SSR输出静态资源，解决：服务端fetch
 - 下拉刷新列表，头部标签选项不改变，解决：pulltorefreshjs + useTransition + server action
 - 刷新列表要有个加载过程作骨架屏，解决：loading（NextJS中loading采用suspense的方式，UI界面做骨架屏也好，spin也好都可以）
 - 用户中途断网提示，标签：php、python，解决：not-found + router prefetch、router redirect（两种方法）

 附赠需求：
 
 - 假设后端接口挂了，服务端拿到一个错误的请求，问题可能并非来自前端，对于前端来说需要捕获这个错误，并提供一个专属的组件提供用户进行reset
 - 标签：java，通过cookies来模拟错误，可以自行删除cookies和reset
 - 解决：error-handling

截止目前官方文档都不告诉你的坑点（23.9.20）：

 - error-handling提供一个error，但是不要试图去捕获他的error信息，因为在构建时已经隐藏了
 - error-handling提供一个reset，用来帮你尝试刷新当前视图，但是却没有告诉你这个只刷新本地视图，在刷新前请先通过server action刷新服务端路由段的视图
 - 做到这了就OK了吗？并不会，因为你会发现服务端收到刷新视图了，本地还是没有更新？怎么回事？
 - 重点来了：请记得给所有error.tsx所在路由段下配套添加loading.tsx，否则你刷新视图会因为过程中重复点击而造成本地和服务端视图不一致，或重复渲染
 - 以上就是2天下来的总结，特地附加一段demo：`@/src/app/fetch/server-action/test/demo1`  ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/fetch/server-action/test/demo1))

> 注：官方文档中有提到，能够使用`not-found`解决的场景优先使用`not-found`

## 案例3-迭代更新

现已知Server Action有两种方式，一种是函数式放在components中，一种是单独的文件式。那么他们有什么区别呢？官方文档没有说明，我通过下面的场景来告诉你。

还是字节大佬提供的场景，在一个超大型的环境情况下去更新线上版本，可能会遇到下面几个问题：

1. 在线几万人的项目，当你修改了action（例如: form submit, click event），那么在之前版本中，没有来得及刷新网页的在线用户，如何正确操作和反馈？
2. 在一个超大的项目中，一次版本迭代，可能来自不同项目，不同链路，一次发版就是2小时，那么不同区域的用户如何正确操作和反馈？
3. 如果更新需要启用新的URL怎么办？

在思考问题前，先要明白
