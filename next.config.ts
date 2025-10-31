import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [],
    unoptimized: false,
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
