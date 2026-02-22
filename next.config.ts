import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/docs/changelog": ["./CHANGELOG.md"],
  },
  async redirects() {
    return [
      {
        source: "/docs/components",
        destination: "/docs/components/accordion",
        permanent: true,
      },
    ];
  },
    experimental: {
      turbopackFileSystemCacheForDev: true,
      turbopackFileSystemCacheForBuild: true,
  },
};

export default withMDX(nextConfig);