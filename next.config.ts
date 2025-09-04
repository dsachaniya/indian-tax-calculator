import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? '/indian-tax-calculator' : '',
  assetPrefix: isGithubPages ? '/indian-tax-calculator/' : '',
};

export default nextConfig;
