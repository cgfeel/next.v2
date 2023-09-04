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

        // To prevent certain packages from being included in the client bundle
        serverComponentsExternalPackages: ["bcryptjs"],

        // 不建议开启，在buid时很多路由可能探测不到，需要手动添加`as Route`，与其这样不如手动检查
        // typedRoutes: true,

        // import modules directly from URLs, eg. '/optimizing/script'.
        urlImports: ['http://up1.yii.so/'],

        // 留额坑，一开始以为和useReportWebVitals有关，实际开不开启都一样
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
    // pageExtensions: ['ts', 'tsx', 'mdx'],

    // disable the `x-powered-by` header (default true).
    // poweredByHeader: false,

    // Source Maps are enabled by default during development. set true enabled production Source Maps (Not recommended, default false)
    // productionBrowserSourceMaps: true,

    // Since Next.js 13.4, Strict Mode is true by default with app router
    // reactStrictMode: true,

    // /about becomes /about/index.html and is routable via /about/, default false.
    // trailingSlash: true,

    // monorepo下用于编译指定包，由于当前不涉及到monorepo，所以只提供参考案例
    // https://github.com/vercel/turbo/tree/main/examples/basic
    // https://github.com/vercel/turbo/blob/main/examples/basic/apps/web/next.config.js'
    // https://github.com/vercel/turbo/blob/main/examples/basic/packages/ui/index.tsx
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
    async redirects() {
        return [
            {
                source: '/about',
                destination: '/',
                permanent: true,
            },
            // When a redirect is applied, any query values provided in the request will be passed through to the redirect destination.
            // When /old-blog/1?page=home is requested, the client will be redirected to /blog/1?page=home.
            // Wildcard Path Matching: Matched parameters can be used in the destination
            {
                source: '/old-blog/:path*',
                destination: '/blog/:path*',
                permanent: false,
            },
            // Path matches are allowed (no nested paths):
            // Matched parameters can be used in the destination
            {
                source: '/old-blog-1/:slug',
                destination: '/blog/:slug',
                permanent: true,
            },
            // To match a regex path you can wrap the regex in parentheses after a parameter
            // Matched parameters can be used in the destination
            {
                source: '/old-blog-2/:slug(\\d{1,})',
                destination: '/blog/:slug',
                permanent: true,
            },
            // when used in the source as non-special values they must be escaped by adding \\ before them
            {
                source: '/old-blog\\(default\\)/:slug',
                destination: '/blog/:slug',
                permanent: true,
            },
            // if the header `Cache-Control` is present, this redirect will be applied
            {
                source: '/old-blog-3/:path((?!another-page$).*)',
                destination: '/blog/:path',
                has: [
                    {
                        type: 'header',
                        key: 'connection',
                    },
                ],
                permanent: false,
            },
            // if the header `x-dont-redirect` is present, this redirect will NOT be applied
            // The will be 404
            {
                source: '/old-blog-4/:path((?!another-page$).*)',
                destination: '/blog/:path',
                missing: [
                    {
                        type: 'header',
                        key: 'connection',
                    },
                ],
                permanent: false,
            },
            // if the source, query, and cookie are matched, this redirect will be applied
            {
                source: '/old-blog-5/:path*',
                destination: '/blog/:path*',
                has: [
                    {
                        type: 'query',
                        key: 'page',
                        // the page value will not be available in the destination since value is provided
                        // and doesn't use a named capture group e.g. (?<page>home)
                        value: 'home',
                    },
                    {
                        type: 'cookie',
                        key: 'myCookie',
                    },
                ],
                permanent: false,
            },
            // if the header `connection` is present and contains a matching value, this redirect will be applied
            {
                source: '/old-blog-6/:path',
                destination: '/blog/:path?authorized=:authorized',
                has: [
                    {
                        type: 'header',
                        key: 'connection',
                        value: '(?<authorized>close|true)',
                    },
                ],
                permanent: false,
            },
            // if the host is `localhost`, this redirect will be applied
            {
                source: '/old-blog-7/:path((?!another-page$).*)',  // if set basePath is 'docs', it is automatically becomes /docs/old-blog-7/:path((?!another-page$).*)
                destination: '/blog/:path',  // if set basePath is 'docs', it is automatically becomes /docs/blog/:path
                has: [
                    {
                        type: 'host',
                        value: 'localhost'
                    },
                ],
                permanent: false,
            },
            // if set basePath is 'docs', does not add /docs since basePath: false is set
            {
                source: '/blog/without-basePath',
                basePath: false,
                destination: 'https://github.com/cgfeel/next.v2',
                permanent: false,
            },
            // In some rare cases, you might need to assign a custom status code for older HTTP Clients to properly redirect.
            // To to ensure IE11 compatibility, a Refresh header is automatically added for the 308 status code.
            {
                source: '/old-blog-8/:path',
                destination: '/blog/:path',
                statusCode: 302,
            },
            // if used i18n (default en)
            /*{
                source: '/with-locale',  // automatically handles all locales
                destination: '/another',  // automatically passes the locale on (eg. /en/another)
                permanent: false,
            },
            // does not handle locales automatically since locale: false is set
            {
                source: '/n1/with-locale-manual',
                destination: '/n1/another',
                locale: false,
                permanent: false,
            },
            // this matches '/' since `en` is the defaultLocale
            {
                source: '/en',
                destination: '/en/another',
                locale: false,
                permanent: false,
            },
            // it's possible to match all locales even when locale: false is set
            {
                source: '/:locale/page',
                destination: '/en/newpage',
                locale: false,
                permanent: false,
            },
            // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
            // `/` or `/fr` routes like /:path* would
            {
                source: '/(.*)',
                destination: '/another',
                permanent: false,
            },*/
        ];
    },
    async rewrites() {
        /*return {
            beforeFiles: [
                // These rewrites are checked after headers/redirects and before all files including _next/public files which
                // allows overriding page files. eg. /new-blog-1/1?overrideme=1
                {
                    source: '/new-blog-1/:path',
                    destination: '/blog/:path',
                    has: [{ type: 'query', key: 'overrideme' }],
                },
                // missing, becase redirects contain this router.
                {
                    source: '/about',
                    destination: '/',
                },
            ],
            afterFiles: [
                // These rewrites are checked after pages/public files are checked but before dynamic routes
                // eg. /new-blog-2/1
                {
                    source: '/new-blog-2/:path',
                    destination: '/blog/:path',
                },
                // missing, becase files is exist, but Cannot be used for dynamic router.
                {
                    source: '/blog/time',
                    destination: '/posts/isr',
                },
            ],
            fallback: [
                // These rewrites are checked after both pages/public files and dynamic routes are checked
                // eg. /cgfeel/levi (missing, becase [...slug] in app root)
                {
                    source: '/cgfeel/:path*',
                    destination: 'https://gitee.com/:path*',
                },
                // missing, becase router is exist.
                {
                    source: '/blog/:path',
                    destination: '/posts/:path',
                },
            ],
        };*/
        return [
            // default
            {
                source: '/about-new',
                destination: '/',
            },
            // Rewrite parameters
            {
                // The :path parameter isn't used here so will be automatically passed in the query
                // eg. `/about-new-1/1/2` rewrite `/func/client/search-params/server?path=1&path=2`, path is variable
                source: '/about-new-1/:path*',
                destination: '/func/client/search-params/server',
            },
            {
                // The :path parameter is used here so will not be automatically passed in the query
                // eg. `/about-new-2/1` rewrite `/blog/1`, query is none
                source: '/about-new-2/:path*',
                destination: '/blog/:path*',
            },
            {
                // Since the :first parameter is used in the destination the :second parameter will not automatically be added in the query although we can manually add it as shown below
                // eg. `/about-new-3/server/1` rewrite `/func/client/search-params/server?second=1`
                source: '/about-new-3/:first/:second',
                destination: '/func/client/search-params/:first?second=:second',
            },
            // Path Matching
            {
                // Matched parameters can be used in the destination
                source: '/new-blog-1/:slug',
                destination: '/blog/:slug',
            },
            {
                // Wildcard Path Matching: eg. `/new-blog-2/list/1/2` to `/blog/list/1/2`
                source: '/new-blog-2/:slug*',
                destination: '/blog/:slug*',
            },
            {
                // Regex Path Matching: eg. `/new-blog-3/1` to `/blog/1`
                source: '/new-blog-3/:slug(\\d{1,})',
                destination: '/blog/:slug',
            },
            {
                // this will match `/new-blog-3(default)/1` being requested.
                source: '/new-blog-3\\(default\\)/:slug',
                destination: '/blog/:slug',
            },
            // Header, Cookie, and Query Matching
            {
                // if the header `connection` is present, this rewrite will be applied
                source: '/new-post-1/:path*',
                destination: '/blog/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'connection',
                    },
                ],
            },
            {
                // if the header `x-rewrite-me` is not present, this rewrite will be applied
                source: '/new-post-2/:path*',
                destination: '/blog/:path*',
                missing: [
                    {
                        type: 'header',
                        key: 'x-rewrite-me',
                    },
                ],
            },
            {
                // if the source, query, and cookie are matched, this rewrite will be applied
                source: '/new-post-3/:path*',
                destination: '/blog/:path*',
                has: [
                    {
                        type: 'query',
                        key: 'page',
                        // the page value will not be available in the destination since value is provided
                        // and doesn't use a named capture group e.g. (?<page>home)
                        value: 'home',
                    },
                    {
                        type: 'cookie',
                        key: 'myCookie',
                    },
                ],
            },
            {
                // if the header `connection` is present and contains a matching value, this redirect will be applied
                source: '/new-post-4/:path',
                destination: '/blog/:path?authorized=:authorized',
                has: [
                    {
                        type: 'header',
                        key: 'connection',
                        value: '(?<authorized>close|true)',
                    },
                ],
            },
            {
                // if the host is `localhost`, this redirect will be applied
                source: '/new-post-5/:path((?!another-page$).*)',  // if set basePath is 'docs', it is automatically becomes /docs/new-post-5/:path((?!another-page$).*)
                destination: '/blog/:path',  // if set basePath is 'docs', it is automatically becomes /docs/blog/:path
                has: [
                    {
                        type: 'host',
                        value: 'localhost'
                    },
                ],
            },
            {
                // if set basePath is 'docs', does not add /docs since basePath: false is set
                source: '/blog/without-basePath-1',
                basePath: false,
                destination: 'https://gitee.com',
            },
            // Rewriting to an external URL
            {
                source: '/external-blog',
                destination: 'https://gitee.com/',
            },
            {
                source: '/external-blog-1/:slug',
                destination: 'https://gitee.com/:slug',  // Matched parameters can be used in the destination
            },
            // trailingSlash (before enable trailingSlash)
            {
                source: '/external-blog-2/',
                destination: 'https://gitee.com/',
            },
            {
                source: '/external-blog-3/:path*/',
                destination: 'https://gitee.com/:path*/',
            },
            // Incremental adoption of Next.js
            {
                source: '/external-blog-4/:path*',
                destination: 'https://gitee.com/:path*',
            },
            // if used i18n (default en)
            /*{
                source: '/with-locale-1',  // automatically handles all locales
                destination: '/another',  // automatically passes the locale on (eg. /en/another)
            },
            {
                // does not handle locales automatically since locale: false is set
                source: '/n1/with-locale-manual-1',
                destination: '/n1/another',
                locale: false,
            },
            {
                // this matches '/' since `en` is the defaultLocale
                source: '/en-1',
                destination: '/en/another',
                locale: false,
            },
            {
                // it's possible to match all locales even when locale: false is set
                source: '/:locale/api-alias/:path*',
                destination: '/api/:path*',
                locale: false,
            },
            // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
            // `/` or `/fr` routes like /:path* would (eg. /fr/another)
            {
                source: '/(.*)',
                destination: '/another',
                permanent: false,
            },*/
        ];
    },
}

const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
    options: {
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [],
        remarkPlugins: [],
    },
});
module.exports = withMDX(nextConfig);
