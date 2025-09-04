import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // No basePath needed for custom domain
  // basePath: '',
  // assetPrefix: '',
};

export default nextConfig;
