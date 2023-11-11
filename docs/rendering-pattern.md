## 重新总结

更新于：23.11.07

- 总结：NextJS默认以静态模式，或试图最大化静态模式进行渲染
- 区别
  - 静态渲染：是指在构建时或请求前预先缓存，在下次请求优先读取缓存作为响应
  - 动态渲染：需要经过服务器进行计算渲染，给出响应结果
- 3种动态渲染行为：
  - 动态目录：`/demo/[slug]`[[总结-目录部分](https://github.com/cgfeel/next.v2/blob/master/README.md#%E8%B7%AF%E7%94%B1%E5%92%8C%E6%96%87%E4%BB%B6%E7%BA%A6%E5%AE%9Arouting--file-conventions)]
  - 路由段声明：`export const dynamic = 'force-dynamic';` [[总结-路由段部分](https://github.com/cgfeel/next.v2/blob/master/README.md#%E8%B7%AF%E7%94%B1%E5%92%8C%E6%96%87%E4%BB%B6%E7%BA%A6%E5%AE%9Arouting--file-conventions)]
  - 动态函数：`header`、`cookies`... [[总结-函数部分](https://github.com/cgfeel/next.v2/blob/master/README.md#%E6%A0%B7%E5%BC%8F%E4%BC%98%E5%8C%96%E7%BB%84%E4%BB%B6%E5%87%BD%E6%95%B0styling--optimizing--compoonents--functions)]
- 关于服务端`fetch` [[总结](https://github.com/cgfeel/next.v2/blob/master/README.md#%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96%E6%B8%B2%E6%9F%93%E7%BC%93%E5%AD%98fetching--rendering--caching)]
  - `fetch`和视图(component tree)是两条单独的缓存路线
  - `fetch`默认也是在构建时静态缓存，一旦缓存之后所有请求都直接从缓存中读取给出响应
  - 除非声明fetch动态渲染：`no-store`、`revalidate`
- 综上所述，如何判断当前路由段是动态还是静态：
  - 看url对应的目录、看路由段声明、看动态函数、看`fetch`是否有额外声明
  - 如果都没有，那么就是静态
  - 再回想下自己的业务页面所需哪些功能，采用哪种渲染是不是清晰多了？
- 通过以上总结再来看NextJS的几个渲染模式
  - SSG：静态渲染，包括有`generateStaticParams`和静态的`single page`
  - SSR：含动态路由、方法、声明、动态`fetch`
  - ISR：带有时间间隔的缓存SSR
  - CSR：`hydrate`后在`client side`进行`interactive`部分
  - PPR：混合动态和静态渲染部分

## NextJS 4个模式的关系

![NextJS 4个模式的关系](https://github.com/cgfeel/next.v2/assets/578141/8a4cd4c1-c07b-4782-a506-bdfd2c2690c5)

- NextJS默认所有`page`都是`SSG`，需要通过调用动态函数`cookies`、`headers`，或者通过声明`revalidate`、`dynamic`转换为`SSR`
- 可以通过`generateStaticParams`去声明`SSG`的渲染范围
- 无论`SSG`还是`SSR`，服务端所有的`fetch`都将在build前以`SSG`方式完成加载，build之后不再请求，除非将`fetch`采用`cache: 'no-store`模式（具体看上述`fetch`总结）
- `no-store`模式下，通过`revalidate`实现`ISR`
- `SSR` + `use client`实现`CSR`，`SSG`在`build`后可采用`CSR`方式对边缘计算做交互

---

**~~SSG的坑点：~~**

> - 随着NextJS 14增加的PPR模式，这个坑点将可能不复存在，案例测试后附上

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
