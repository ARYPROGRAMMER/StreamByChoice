import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'plus.unsplash.com',
      },
      {
        hostname: 'media.licdn.com'
      },
      {
        hostname: 'encrypted-tbn0.gstatic.com'
      }
    ],
  },
};

export default nextConfig;
