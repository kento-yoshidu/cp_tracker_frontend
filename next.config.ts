import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["node_modules/.pnpm/@shikijs+*/node_modules/@shikijs/**/*"],
  },
};

export default nextConfig;
