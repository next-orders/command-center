/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: "/command-center",
  output: "standalone",
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
