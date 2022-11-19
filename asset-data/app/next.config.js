/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '185.205.210.169'],
  },
  publicRuntimeConfig: {
    BACKEND_API: process.env.BACKEND_API,
  }
}

module.exports = nextConfig
