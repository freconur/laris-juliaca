/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,    
  images: {
    remotePatterns: [
      {
        hostname: 'https://lh3.googleusercontent.com/'
      },
    ],
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
