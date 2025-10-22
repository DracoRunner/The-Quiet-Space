import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: "sass-embedded",
  },
  allowedDevOrigins: ["https://lottie.host/"],
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed/**")],
  },
};

export default nextConfig;
