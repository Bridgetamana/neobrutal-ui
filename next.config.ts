import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
