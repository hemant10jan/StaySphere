import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:[
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint errors ko ignore karega
  }
};

export default nextConfig;
