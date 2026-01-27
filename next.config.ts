import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
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
};

export default nextConfig;
