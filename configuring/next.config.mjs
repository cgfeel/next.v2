import createMDX from "@next/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from "remark-gfm";
// import determineBuildId from './src/utils/build-id-ems';

const { determineBuildId } = await import('./src/utils/build-id.js').then(info => info.default)

// const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // NextJS 13.4默认支持`appDir`模式，不需要开启
    // appDir: true,

    /**
     * 使用CDN配置静态资源，默认为不配置undefined，例如：
     * /_next/static/chunks/4b9b41aaa062cbbfeff4add70f256968c51ece5d.4d708494b3aed70c04f0.js
     * 配置后：
     * https://cdn.mydomain.com/_next/static/chunks/4b9b41aaa062cbbfeff4add70f256968c51ece5d.4d708494b3aed70c04f0.js
     */
    // assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,

    // 设置项目在二级域名下，默认空字符
    // basePath: '/docs',

    // 关闭压缩，默认开启
    // compress: false,

    // 开发指示器
    /*devIndicators: {
        // 开启、关闭指示器，默认开启
        // buildActivity: false,

        // 指示器的位置，默认：bottom-right
        // buildActivityPosition: 'bottom-right',
    },*/

    // 替换构建目录，默认：.next
    // distDir: 'build',

    // 环境变量会捆绑到js bundle
    env: {
        HOME_URL: 'http://localhost:3000',
    },

    /*eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: false,
    },*/

    // Experimental features
    experimental: {
        // 如果需要用到并行渲染做子路由，还是要开启实验性功能（通常并行路由下的子路由用于路由拦截）
        // 13.5 之后彻底废弃，请勿使用
        // appDir: true,

        // customize the cache handler
        // incrementalCacheHandlerPath: require.resolve('./src/utils/cache-handler.js'),

        // Using the Rust-based MDX compiler
        mdxRs: true,

        // There are some cases in which Next.js might fail to include required files, or might incorrectly include unused files. 
        // outputFileTracingExcludes: {
        //    '/api/hello': ['./un-necessary-folder/**/*'],
        // },

        // outputFileTracingIncludes: {
        //    '/api/another': ['./necessary-folder/**/*'],
        // },

        // While tracing in monorepo setups, the project directory is used for tracing by default.
        // outputFileTracingRoot: path.join(__dirname, '../../'),

        // enable server action. 14之后不再需要
        // serverActions: true,

        // To prevent certain packages from being included in the client bundle
        serverComponentsExternalPackages: ["bcryptjs"],

        // 不建议开启，在buid时很多路由可能探测不到，需要手动添加`as Route`，与其这样不如手动检查
        // typedRoutes: true,

        // import modules directly from URLs, eg. '/optimizing/script'.
        urlImports: ['http://up1.yii.so/'],

        webpackBuildWorker: true,

        // 留坑，一开始以为和useReportWebVitals有关，实际开不开启都一样
        // webVitalsAttribution: ['CLS', 'LCP'],
    },

    // default is true, set false to disable etag. https://en.wikipedia.org/wiki/HTTP_ETag
    // generateEtags: false,

    // In Node.js versions prior to 18, To disable HTTP Keep-Alive for all fetch() calls on the server-side.
    /*httpAgentOptions: {
        keepAlive: false,
    },*/

    // i18n
    /*i18n: {
        locales: ['en', 'fr', 'de', 'zh-CN'],
        defaultLocale: 'en',
    },*/

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
                port: '',
                pathname: '/image/upload/**',
            },
        ],
        /* 
         * 子域名：单个*和两个**的区别，前者只能匹配一级路径，后者可以匹配多个路径，但不能用于路径中间
        {
            protocol: 'https',
            hostname: '**.example.com',
        },*/

        // unoptimized: true,    // 默认不压缩优化图片

        // domains: ['assets.acme.com'],    // 推荐用`remotePatterns`，domain，不能使用通配符，端口，协议等

        /*
         * 使用本地加载器代替nextjs图片处理
         * 例如用七牛的图片处理，不推荐，因为nextjs本地处理器只有3个参数，如果非要用建议使用`Image`组件的`loader`属性
         */
        // loader: 'custom',
        // loaderFile: './src/utils/myImageLoader.ts',

        // 当使用`fill`填充或者`responsive`图片的时候，以下是默认的srcset尺寸，其中384是文档没有，而`nextjs: "13.4.9"`新增
        // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

        // 当使用`fixed`或者`intrinsic`图片的时候，将采用下列宽度
        // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

        // 默认输出的格式，也可以设置为：['image/avif', 'image/webp'],
        // formats: ['image/webp'],

        // 设置TTL
        // minimumCacheTTL: 60,

        // 禁止静态文件导入
        // disableStaticImages: true,

        // 在`Image`组件中引入一段外部的SVG
        /*
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        */
    },

    // Next.js exposes some options that give you some control over how the server will dispose or keep in memory built pages in development.
    // 页面内容缓存配置
    /*onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        // 内容在内存中缓存的时长（ms）
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        // 同时缓存多少个页面
        pagesBufferLength: 2,
    },*/

    // 采用静态方式导出到`out`，不支持动态方法，具体看总结
    // output: 'export',

    // 采用standalone的方式导出到`./next/standalone`，具体看总结
    // output: 'standalone',

    // This can be modified to allow other extensions like markdown (.md, .mdx).
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

    // disable the `x-powered-by` header (default true).
    // poweredByHeader: false,

    // Source Maps are enabled by default during development. set true enabled production Source Maps (Not recommended, default false)
    // productionBrowserSourceMaps: true,

    // Since Next.js 13.4, Strict Mode is true by default with app router
    // reactStrictMode: true,

    // /about becomes /about/index.html and is routable via /about/, default false.
    // trailingSlash: true,

    // monorepo下用于编译指定包，由于当前不涉及到monorepo，所以只提供参考案例
    // - https://github.com/vercel/turbo/tree/main/examples/basic
    // - https://github.com/vercel/turbo/blob/main/examples/basic/apps/web/next.config.js'
    // - https://github.com/vercel/turbo/blob/main/examples/basic/packages/ui/index.tsx
    // 在示例项目optimizing的配置中有段semi的transpilePackages配置示例
    // nextjs有自己顽固的编译配置。这个开关相当于一个escape出口，配置在这个数组内的包不受它原有编译的限制。
    // transpilePackages: [],

    // 禁用ts类型检测，这是个危险举措
    /*typescript: {
        ignoreBuildErrors: false,
    },*/

    webpack: (
        config, 
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // Important: return the modified config
        return config;
    },

    // This feature is exclusive to next export and currently deprecated in favor of getStaticPaths with pages or generateStaticParams with app.
    /*exportPathMap: async function (
        defaultPathMap, { dev, dir, outDir, distDir, buildId }
    ) {
        return {};
    },*/

    // 根据git commit hash生成ID
    async generateBuildId () {
        const buildId = await determineBuildId();
        return buildId;
    },
}

// const withMDX = require('@next/mdx')();

// module.exports = withMDX(nextConfig)

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension: /\.(md|mdx)$/,
    options: {
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [],
    }
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);