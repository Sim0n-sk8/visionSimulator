import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    optimizeCss: false, // disable Next.js CSS optimization
  },
  swcMinify: false, // disable JS/CSS minification
};

export default nextConfig;
