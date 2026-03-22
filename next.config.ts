import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
