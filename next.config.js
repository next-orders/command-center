/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["v1.next-orders.org", "avatar.o5system.net"],
  },
  basePath: "/command-center",
  output: "standalone",
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
