// const path = require('path');
const { determineBuildId } = require('./src/utils/build-id');
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
        appDir: true,

        // customize the cache handler
        // incrementalCacheHandlerPath: require.resolve('./src/utils/cache-handler.js'),

        // enable mdx
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

        // enable server action
        serverActions: true,

        // 不建议开启，在buid时很多路由可能探测不到，需要手动添加`as Route`，与其这样不如手动检查
        // typedRoutes: true,
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
                pathname: '/image/upload/**'
            },
            /* 
             * 子域名：单个*和两个**的区别，前者只能匹配一级路径，后者可以匹配多个路径，但不能用于路径中间
            {
                protocol: 'https',
                hostname: '**.example.com',
            },*/
        ],

        // unoptimized: true,    // 默认不压缩优化图片

        // domains: ['assets.acme.com'],    // 推荐用`remotePatterns`，domain，不能使用通配符，端口，协议等

        /*
         * 使用本地加载器代替nextjs图片处理
         * 例如用七牛的图片处理，不推荐，因为nextjs本地处理器只有3个参数，如果非要用建议使用`Image`组件的`loader`属性
        loader: 'custom',
        loaderFile: './src/utils/myImageLoader.ts',
        */

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
    /*onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },*/

    // 采用静态方式导出到`out`，不支持动态方法，具体看总结
    // output: 'export',

    // 采用standalone的方式导出到`./next/standalone`，具体看总结
    // output: 'standalone',

    // This can be modified to allow other extensions like markdown (.md, .mdx).
    // pageExtensions: ['ts', 'tsx', 'mdx'],

    // disable the `x-powered-by` header (default true).
    // poweredByHeader: false,

    // Source Maps are enabled by default during development. set true enabled production Source Maps (Not recommended, default false)
    // productionBrowserSourceMaps: true,

    // Since Next.js 13.4, Strict Mode is true by default with app router
    // reactStrictMode: true,

    // /about becomes /about/index.html and is routable via /about/, default false.
    // trailingSlash: true,

    // 禁用ts类型检测，这是个危险举措
    /*typescript: {
        ignoreBuildErrors: false,
    },*/

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

    // Headers allow you to set custom HTTP headers on the response to an incoming request on a given path.
    async headers() {
        const ContentSecurityPolicy = (nonce = '') => `
            default-src 'self';
            script-src 'self'${nonce ? ` '${nonce}'` : ''} 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net;
            child-src example.com;
            style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
            font-src 'self';
        `;

        return [
            {
                source: '/blog/:post(\\d{1,})',
                headers: [
                    // This header allows you to control which features and APIs can be used in the browser. 
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
                    },
                    // This header controls how much information the browser includes when navigating from the current website (origin) to another.
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    // This header informs browsers it should only be accessed using HTTPS, instead of using HTTP. 
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    // This header prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set.
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // This header controls DNS prefetching, allowing browsers to proactively perform domain name resolution on external links, images, CSS, JavaScript, and more
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    // This header indicates whether the site should be allowed to be displayed within an iframe.
                    // This header has been superseded by CSP's frame-ancestors option
                    /*{
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },*/
                    {
                        key: 'x-post',
                        value: ':post',
                    },
                ],
            },
            {
                source: '/blog/:slug',
                headers: [
                    {
                        key: 'x-slug',
                        value: ':slug',  // Matched parameters can be used in the value
                    },
                    {
                        key: 'x-slug-:slug',  // Matched parameters can be used in the key
                        value: 'my other custom header value',
                    },
                ],
            },
            {
                source: '/blog/:slug',  // if set i18n, automatically handles all locales
                has: [
                    {
                        type: 'header',
                        key: 'Cache-Control',
                    },
                ],
                headers: [
                    {
                        key: 'x-another-header',
                        value: 'hello',
                    },
                ],
            },
            {
                source: '/blog/:slug',
                headers: [
                    {
                        key: 'x-any-header',
                        value: 'word',
                    },
                ],
                // locale: false,  // does not handle locales automatically since locale: false is set
                missing: [
                    {
                        type: 'header',
                        key: 'x-no-header',
                    },
                ],
            },
            {
                source: '/blog/:slug',
                has: [
                    {
                        type: 'query',
                        key: 'page',
                        value: 'home',
                    },
                    {
                        type: 'cookie',
                        key: 'ramdom-time',
                        value: '2023/8/15 15:40:54',
                    },
                ],
                headers: [
                    {
                        key: 'x-authorized',
                        value: 'yes',
                    },
                ],
            },
            {
                source: '/blog/:slug',
                has: [
                    {
                        type: 'header',
                        key: 'Connection',
                        value: '(?<authorized>yes|close)',
                    },
                ],
                headers: [
                    {
                        key: 'x-another-regex-header',
                        value: ':authorized',
                    },
                ],
            },
            {
                source: '/blog/:slug',  // if set basePath is 'docs', it is becomes /docs//blog/:slug
                has: [
                    {
                        type: 'host',
                        value: 'localhost',
                    },
                ],
                headers: [
                    {
                        key: 'x-another-host-header',
                        value: 'host-name',
                    },
                ],
                // basePath: false,   // unless add basePath: false, it is becomes /blog/:slug
            },
            // this matches '/' since `en` is the defaultLocale
            /*{
                source: '/en',
                locale: false,
                headers: [
                    {
                        key: 'x-hello',
                        value: 'world',
                    },
                ],
            },*/
            // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
            // `/` or `/fr` routes like /:path* would
            /*{
                source: '/(.*)',
                headers: [
                    {
                        key: 'x-hello',
                        value: 'world',
                    },
                ],
            },*/
            {
                source: '/optimizing/script/cspe',
                headers: [
                    {
                        key: 'x-another-custom-header',
                        value: 'my other custom header value',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy('nonce-XUENAJFW').replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
            {
                source: '/optimizing/script/group/:path*',
                headers: [
                    {
                        key: 'x-custom-header',
                        value: 'my custom header value',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy().replace(/\s{2,}/g, ' ').trim(),
                    },
                    {
                        key: 'x-path',
                        value: ':path*',  // Matched parameters can be used in the value
                    },
                    {
                        key: 'x-path-:path*',  // Matched parameters can be used in the key
                        value: 'my other custom header value',
                    },
                ],
            },
        ];
    },
}

const withMDX = require('@next/mdx')({
    options: {
        providerImportSource: '@mdx-js/react',
    },
});
module.exports = withMDX(nextConfig);
