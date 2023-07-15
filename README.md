# 我对NextJs的掌握概括
> 基于NextJS.13下`App`模式进行梳理，我再这里将会按照官方文档的内容，将掌握的内容，通过简短的示范进行展示。而不是作为一个完整的项目进行开源，做这个仓库的目的有两个
> 1. 面试用，以下提到的内容肯定都是我已掌握的知识
> 2. 给同行一个讨论交流，或者是一个参考
> 
> 这个项目会随个人总结不定期完善

## 项目技术总结
- App模式下路由和目录结构
  - 基础路由，目录`@/src/app/features/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/features))
    - 包含：1级页面，2级页面，文件划分：`layout`、`page`，
    - ---- 分割线 ----
  - 插槽和平行路由，目录`@/src/app/dashboard/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/dashboard))
    - 插槽：`@/src/app/dashboard/@performance`，平行路由：`@performance`下所有目录
    - 插槽下的`page.tsx`会自动注入到`dashboard`下的`layout.tsx`
    - ---- 分割线 ----
  - 动态路由，目录`@/src/app/posts/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/posts))
    - 所有包含`[]`的目录均为动态路由，获取动态路由参数：`@/src/app/posts/page.tsx`
    - 监听动态路由变化：`@/src/app/posts/[pid]/layout.tsx`
    - 嵌套动态路由：`@/src/app/posts/user/[...uid]/layout.tsx`
    - ---- 分割线 ----
  - 路由Api
    - 静态Api，目录：`@/src/app/api/items/route.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/api/items/route.ts))
    - 包含：不同请求处理（`POST`、`GET`）、获取`URI`、获取`COOKIES`、获取`header`
    - ---- 分割线 ----
    - 动态Api：`@/src/app/api/items/[slug]/route.tsx`
    - 跳转Api：`@/src/app/api/items/redirect/route.tsx`
- 3个不同的模式
  - SSR请求，目录：`@/src/app/posts/[pid]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/posts/%5Bpid%5D/page.tsx))
  - CSR模式
    - CSR请求，目录：`@/src/app/posts/list/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/posts/list/%5Bid%5D/page.tsx))
    - CSR组件，目录：`@/src/app/dashboard/components/ButtonToPost.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/dashboard/components/ButtonToPost.tsx))
    - ---- 分割线 ----
  - SSG模式，目录：`@/src/app/blog/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/blog))
    - 通过`generateStaticParams`分割页面`@/src/app/blog/[slug]/page.tsx`
    - 嵌套分割`@/src/app/blog/list/[category]/[product]/page.tsx`
    - 根据父级结果对子集切割`@/src/app/blog/product`
- 其他
  - antd，只为展示引用`antd`库，并非做页面：`@/src/app/antd/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/antd/page.tsx))
  - swr：`@/src/app/posts/list/[id]/page.tsx` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/app/posts/list/%5Bid%5D/page.tsx))
  - HTTP库，封装`umi-request`：`@/src/utils/api.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/api.ts))
  - localStorage封装：`@/src/utils/storage/deviceStorage.ts` ([查看](https://github.com/cgfeel/next.v2/blob/master/src/utils/storage/deviceStorage.ts))

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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
