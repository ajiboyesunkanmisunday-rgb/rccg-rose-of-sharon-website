import type { NextConfig } from "next";
import path from "node:path";

// Browsers block http:// calls from an https:// page, so the site calls /ros-api/* on its own origin
// and the server forwards it to the ROS API. Point ROS_API_ORIGIN at the new server when moving.
const ROS_API_ORIGIN = process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_SITE: "media" },
  // the shared package lives two folders up, so let the bundler read from the repository root
  turbopack: { root: path.join(__dirname, "../..") },
  // Pictures, fonts and logos rarely change: let browsers keep them for a day and refresh quietly in the background
  // (Vercel's default for public files is "re-check every time", which is what made repeat visits slow).
  async headers() {
    return [
      {
        source: "/:file(.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|woff2|mp4))",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:dir(assets|home|gallery|buildingproject|csr|children|css)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async rewrites() {
    return [{ source: "/ros-api/:path*", destination: `${ROS_API_ORIGIN}/api/v1/:path*` }];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
