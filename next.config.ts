import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "rapid-preserve-hierarchy-portraits.trycloudflare.com",
  ],
};

export default nextConfig;
