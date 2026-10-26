import type { NextConfig } from "next";
import path from "node:path";

// Browsers block http:// calls from an https:// page, so the site calls /ros-api/* on its own origin
// and the server forwards it to the ROS API. Point ROS_API_ORIGIN at the new server when moving.
const ROS_API_ORIGIN = process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_SITE: "media" },
  // the shared package lives two folders up, so let the bundler read from the repository root
  turbopack: { root: path.join(__dirname, "../..") },
  async rewrites() {
    return [{ source: "/ros-api/:path*", destination: `${ROS_API_ORIGIN}/api/v1/:path*` }];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
