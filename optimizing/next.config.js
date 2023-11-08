/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOME_URL: 'http://localhost:3000',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
                port: '',
                pathname: '/image/upload/**',
            }
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
    // nextjs有自己顽固的编译配置。这个开关相当于一个escape出口，配置在这个数组内的包不受它原有编译的限制。
    transpilePackages: [
        '@douyinfe/semi-icons', 
        '@douyinfe/semi-illustrations',
        '@douyinfe/semi-ui'
    ],
}

module.exports = nextConfig
