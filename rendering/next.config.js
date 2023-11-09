/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: '',
    // trailingSlash: true,
    env: {
        HOME_URL: 'http://localhost:3000',
    },
    experimental: {
        serverActions: true,
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
                // source: '/optimizing/script/cspe',
                source: '/fetch/cache/client',
                headers: [
                    {
                        key: 'x-another-custom-header',
                        value: 'my other custom header value',
                    },
                    // 先屏蔽csp，配置查看`/optimizing/src/middleware.ts`
                    /*{
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy('nonce-XUENAJFW').replace(/\s{2,}/g, ' ').trim(),
                    },*/
                ],
            },
            {
                // source: '/optimizing/script/group/:path*',
                source: '/fetch/parallel/:path*',
                headers: [
                    {
                        key: 'x-custom-header',
                        value: 'my custom header value',
                    },
                    // 先屏蔽csp，配置查看`/optimizing/src/middleware.ts`
                    /*{
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy().replace(/\s{2,}/g, ' ').trim(),
                    },*/
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
                    // destination: '/posts/isr',
                    destination: '/fetch/suspense/1',
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
                    // destination: '/posts/:path',
                    destination: '/fetch/revalidate/:path',
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
                // eg. `/about-new-1?path* rewrite `/func/client/search-params/server?path*`, path is variable
                source: '/about-new-1/:path*',
                destination: '/antd/client',
                // destination: '/func/client/search-params/server',
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
                destination: '/antd/:first?second=:second',
                // destination: '/func/client/search-params/:first?second=:second',
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

module.exports = nextConfig
