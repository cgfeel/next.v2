/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOME_URL: 'http://localhost:3000',
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig