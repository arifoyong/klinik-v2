/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '185.205.210.169'],
  },
  env: {
    BACKEND_API: process.env.BACKEND_API || "http://domain:5000/api",
  }
  // publicRuntimeConfig: {
  //   BACKEND_API: process.env.BACKEND_API || "http://localhost:5000/api",
  // }
}

module.exports = nextConfig
