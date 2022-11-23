/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  publicRuntimeConfig: {
    BACKEND_API: process.env.BACKEND_API,
  }
}

module.exports = nextConfig
