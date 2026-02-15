import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: 'bottom-right',
  },
  experimental: {
    // Disable loading spinner overlay
    optimisticClientCache: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crypto.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.traderepublic.com',
      },
    ],
  },
};

export default nextConfig;
