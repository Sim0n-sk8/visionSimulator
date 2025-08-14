import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    optimizeCss: false, // Disable CSS optimization if causing issues
  },
 
  cssModules: false,
};

export default nextConfig;
