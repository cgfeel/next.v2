# 我对NextJs的掌握概括
> 基于NextJS.13下`App`模式进行梳理，我再这里将会按照官方文档的内容，将掌握的内容，通过简短的示范进行展示。而不是作为一个完整的项目进行开源，做这个仓库的目的有两个
> 1. 面试用，以下提到的内容肯定都是我已掌握的知识
> 2. 给同行一个讨论交流，或者是一个参考
> 
> 这个项目会随个人总结不定期完善

## 项目技术总结
- App模式下路由和目录结构
- - 基础路由，目录`@/src/app/features/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/features))
  - - 包含：1级页面，2级页面，文件划分：`layout`、`page`，
  - ---- 分割线 ----
  - 插槽和平行路由，目录`@/src/app/dashboard/` ([查看](https://github.com/cgfeel/next.v2/tree/master/src/app/dashboard))
  - - 插槽：`@/src/app/dashboard/@performance`，平行路由：`@performance`下所有目录
  - - 插槽下的`page.tsx`会自动注入到`dashboard`下的`layout.tsx`
- test

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
