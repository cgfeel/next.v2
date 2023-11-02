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
    transpilePackages: [
        '@douyinfe/semi-icons', 
        '@douyinfe/semi-illustrations',
        '@douyinfe/semi-ui'
    ],
}

module.exports = nextConfig
