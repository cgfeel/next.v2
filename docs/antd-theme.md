# `antd`引入和主题切换

目录：`/rendering/src/app/antd` [[查看](https://github.com/cgfeel/next.v2/tree/master/rendering/src/app/antd)]

演示：开发环境，请无视系统卡顿，只关注无闪烁 + 跟随系统自动切换

https://github.com/cgfeel/next.v2/assets/578141/f5d6233f-c75a-4068-a00a-84822d15d0b3

### 引入`andt`

这次官方发布了一个包`@ant-design/nextjs-registry`[[查看](https://github.com/ant-design/nextjs-registry)]，原理和之前封装的方法一样，通过`useServerInsertedHTML`将初始的样式发送到`header`，这是由NextJS的`css-in-js`提供的解决方案[[查看](https://nextjs.org/docs/app/building-your-application/styling/css-in-js#configuring-css-in-js-in-app)]。

而`antd`发的这个包的目的就是省去了自己封装，只要在根目录布局文件中`layout.tsx`引入：

```
            <body className={inter.className}>
                <AntdRegistry>{children}</AntdRegistry>
            </body>
```

注意点：

 - 这个包需要在`NextJS 14`以上才能安装，如果版本是13，建议直接把配置文件扒下来即可：https://github.com/ant-design/nextjs-registry/blob/main/src/AntdRegistry.tsx
 - 由于 `Next.js` 的 `App Router` 缺少获取 html 的钩子， `extractStaticStyle` 无法分析出当前应用中使用的样式，相当于没有 `TreeShaking` 能力，因此 `App Router` 引入的样式体积会比 `Page Router` 大一些。

### 主题切换

`antd v5`采用`css-in-js`的解决方案，切换主题需要：

 - 通过`ConfigProvider`配置主题算法`algorithm`[[查看](https://github.com/cgfeel/next.v2/blob/master/rendering/src/lib/WithTheme.tsx)]
 - 然后将其包裹指定页面，例如：https://github.com/cgfeel/next.v2/blob/master/rendering/src/app/antd/layout.tsx

产生的问题：

- 主题闪烁

### 解决主题闪烁

官方提供的方式是通过`cookies`，见`antd-style`文档[[查看](https://ant-design.github.io/antd-style/zh-CN/best-practice/fix-switch-theme-fouc)]。通过`server action`记录操作，并以`cookies`提供给`ConfigProvider`切换主题：

```
    const cookieStore = cookies();
    const appearance = (cookieStore.get("theme")?.value || "auto") as ThemeMode;

    async function changeTheme(theme: ThemeMode) {
        "use server";
        theme === "auto" ? cookies().delete("theme") : cookies().set("theme", theme);
        revalidatePath("/");
    }

    return (
        <WithTheme darkTheme={appearance === "dark"}>
        </WithTheme>
```

产生的问题：

- 以上操作均在服务端，在用户没有设置`cookies`之前，没办法获取到本地系统的主题

### 适应本地系统主题

通过CSS提权来实现，在此之前我需要在`html`中挂起当前主题是已手动配置还是随系统

```
    const cookieStore = cookies();
    const appearance = cookieStore.get("theme")?.value || "auto";
    return (
        <html lang="en" data-theme={appearance}>
        </html>
    );
```

当跟随主题的时候通过css提权设置默认主题，见`global.css`[[查看](https://github.com/cgfeel/next.v2/blob/master/rendering/src/app/globals.css)]

```
html[data-theme="dark"] {
  color-scheme: dark;
}

html[data-theme="light"] {
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  html[data-theme="auto"] {
    color-scheme: dark;
  }
  html[data-theme="auto"] body {
    color: rgb(var(--foreground-rgb));
  }
}
```

需要理清一个顺序：

- `antd`默认提供3个算法[[查看](https://ant-design.antgroup.com/docs/react/customize-theme-cn#%E4%BD%BF%E7%94%A8%E9%A2%84%E8%AE%BE%E7%AE%97%E6%B3%95)]，除了手动设置为`dark`之外，默认就是`light`
- 所以如果本地主题也是`light`不需要提权，只要关心本地是否是暗黑主题

于是：

```
/* 当本地是暗黑主题 */
@media (prefers-color-scheme: dark) {
  /* 且当前主题为跟随系统时 */
  html[data-theme="auto"] {
    color-scheme: dark;
  }
}
```

提醒：

- Demo只作为演示原理，并没有提供所有`antd`黑暗主题的变量
- 实际生产过程中，请自己参考以上方式，根据实际情况补完`global.css`

那这样就解彻底决闪屏问题了吗？

- 已解决闪屏问题，但`antd`组件本身加载机制存在抖动，查看了一些`tailwind`组件，抖动情况稍好点，但仍旧存在抖动
- 对于组件抖动这个问题还需要实际开发过程中根据实际情况解决，不在这次研究中

### 写在最后

手动设置变量是不是很麻烦？可以参考这篇`CSR`的解决办法。

https://github.com/cgfeel/ant-design-style?tab=readme-ov-file#csr%E4%B8%BB%E9%A2%98%E5%88%87%E6%8D%A2%E6%97%A0%E9%97%AA%E7%83%81
