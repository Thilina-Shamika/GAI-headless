import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "gai.local", pathname: "**" },
      { protocol: "https", hostname: "gai.local", pathname: "**" },
    ],
  },
};

export default nextConfig;
