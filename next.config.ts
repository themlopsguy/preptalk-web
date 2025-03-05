import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Add support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  
  // Add any other Next.js configuration options here
  reactStrictMode: true,
};

export default nextConfig;
