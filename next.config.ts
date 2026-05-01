import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.appilico.com",
      },
    ],
  },
};

export default nextConfig;
