import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    // Disable loading spinner overlay
    optimisticClientCache: false,
  },
};

export default nextConfig;
