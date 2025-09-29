// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  eslint: {
    // ⚡ Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚡ Ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
