import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, 
  },
  reactStrictMode: true,
  images: {
    domains: [
      "i.ytimg.com",
      "exclusive.kz",
      "adm-english-prime-site.seok.com.ua",
    ],
  },
};

export default nextConfig;
