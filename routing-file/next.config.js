/** @type {import('next').NextConfig} */
const nextConfig = {
    // 环境变量会捆绑到js bundle
    env: {
        HOME_URL: 'http://localhost:3000',
    },

    // Experimental features
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig
