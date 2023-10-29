/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.next-orders.org",
      },
    ],
  },
  basePath: "/command-center",
  output: "standalone",
};

module.exports = nextConfig;
