import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export', // github page에서 필요
    basePath: '/todos',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
