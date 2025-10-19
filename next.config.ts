import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: "sass-embedded",
  },
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
