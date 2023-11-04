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
        ],
    },
    // nextjs有自己顽固的编译配置。这个开关相当于一个escape出口，配置在这个数组内的包不受它原有编译的限制。
    transpilePackages: [
        '@douyinfe/semi-icons', 
        '@douyinfe/semi-illustrations',
        '@douyinfe/semi-ui'
    ],
}

module.exports = nextConfig
