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

现已知Server Action有两种方式，一种是函数式放在components中，一种是单独的文件式。那么有什么区别呢？官方文档没有说明，我通过下面的场景来告诉你。

还是字节大佬提供的场景，在一个超大型的环境情况下去更新线上版本，可能会遇到下面几个问题：

1. 在线几万人的项目，当你修改了action（例如: form submit, click event），那么在之前版本中，没有来得及刷新网页的在线用户，如何正确操作和反馈？
2. 在一个超大的项目中，一次版本迭代，可能来自不同项目，不同链路，一次发版就是2小时，那么不同区域的用户如何正确操作和反馈？
3. 如果更新需要启用新的URL怎么办？

在思考问题前，先对比下传统方法和Server Action有什么不同

**传统方法：**

- 指定URL接受CURD操作，当一个项目做了变更，只要接受的URL不变，以及请求和返回的数据没有变化，就不受以上3个情况影响
- 拿到数据后在本地做反馈

**Server Action：**

- 接受一个带有`use server`的函数，不需要第三方URL，提交时指向当前路由端的URL
- 在发起请求时，会将components tree通过`Next-Router-State-Tree`作为header发送到服务器
- 发送请求时，会将server action对应的ID通过payload发送作为寻址

![2241699345133_ pic](https://github.com/cgfeel/next.v2/assets/578141/ec298861-d9b7-4f3d-9f61-d986c728f036)

![2251699345134_ pic](https://github.com/cgfeel/next.v2/assets/578141/9219e6fc-a40f-4f59-99d3-1acb9869e3f3)

**产生的问题：**

- 一旦文件发生变更，编译后寻址也将改变，造成之前的用户无法提交

**解决办法：**

- 将`server action`放置在当前的component中去调用
- 可以是components下的`server action`，也可以是通过components下的`server action`去调用独立的`server action`文件中的函数
- 这样无论版本如何迭代，`server action`寻址不变

**示例：** `rendering/src/app/fetch/server-action/sub`

**演示：**

- 左边终端第一次编译打印：`form: ${time} -action-1`，退出
- 进入dev环境，修改文件重新编译，退出
- 重新进入start环境，发起请求打印：`form: ${time} -subaction`
- 手动刷新，视图更新，为了证明视图我已更新

https://github.com/cgfeel/next.v2/assets/578141/4a1cdb48-9487-4e27-85ac-2f7823924afd

第一次编译时`page`调用如下

![2271699345655_ pic](https://github.com/cgfeel/next.v2/assets/578141/2890b04e-29ef-4713-9c0b-46d49c225ada)


第二次编译时`page`调用如下

![2281699345664_ pic](https://github.com/cgfeel/next.v2/assets/578141/0f68d05a-7ce0-4c99-b37d-ccf1adf75b61)

执行结果：

![2291699345743_ pic](https://github.com/cgfeel/next.v2/assets/578141/94e595c8-a377-4dc2-a4a5-d8b56ac05a98)

**衍生问题1：**

- 如何改变视图，接受的请求和调用的方法不变呢？

**解决：**

- components下的`server action`调用的方法不变即可
- 结论：组件更新，还是 action 更新，还是两者都更新，在原始页面的在线用户都可以不受影响

https://github.com/cgfeel/next.v2/assets/578141/e60d65b2-ca66-474a-9e9d-aecbbf38c523

**衍生问题2：**

- 那在更新前，在线的用户怎么正确得到反馈呢？

**解决：**

- `server action`正常情况下也不会返回任何数据
- 服务器需要跟新视图，可以通过`redirect`跳转或`revalidate`去刷新视图
- 本地通过`router.reflush`更新视图

**NextJS无感刷新视图：**

https://github.com/cgfeel/next.v2/assets/578141/6b3d6ef7-e362-4412-871b-4f240389945b
