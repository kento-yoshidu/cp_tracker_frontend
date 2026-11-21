import type { NextConfig } from "next";

const origin = process.env.FIGURES_ORIGIN;

const nextConfig: NextConfig = {
  // 解説ページは S3 + CloudFront から配信する。public/ にファイルがあればそちらが優先される
  async rewrites() {
    if (!origin) return [];

    return [
      {
        source: "/figures/:path*",
        destination: `${origin}/figures/:path*`,
      },
    ];
  },
};

export default nextConfig;
