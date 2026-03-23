import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@7obits/ui", "@7obits/db", "@7obits/queues", "@7obits/payments", "@7obits/emails"],
};

export default nextConfig;
