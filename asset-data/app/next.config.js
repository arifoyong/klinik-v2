/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '185.205.210.169'],
  },
  env: {
    BACKEND_API: process.env.BACKEND_API || "http://default_domain:5000/api",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "default_token",
  }
  // publicRuntimeConfig: {
  //   BACKEND_API: process.env.BACKEND_API || "http://localhost:5000/api",
  // }
}

module.exports = nextConfig
