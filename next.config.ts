import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include CHANGELOG.md in the build output for the changelog page
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
