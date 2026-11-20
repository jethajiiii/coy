import type { NextConfig } from "next";

const rawBackendUrl =
  process.env.INTERNAL_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://coy-pcsz.onrender.com"
    : "http://127.0.0.1:4000");

const backendUrl = rawBackendUrl.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
