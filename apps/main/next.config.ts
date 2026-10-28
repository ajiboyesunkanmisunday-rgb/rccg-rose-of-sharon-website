import type { NextConfig } from "next";
import path from "node:path";

// Browsers block http:// calls from an https:// page, so the site calls /ros-api/* on its own origin
// and the server forwards it to the ROS API. Point ROS_API_ORIGIN at the new server when moving.
const ROS_API_ORIGIN = process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_SITE: "main" },
  // the shared package lives two folders up, so let the bundler read from the repository root
  turbopack: { root: path.join(__dirname, "../..") },
  // Old addresses of forms that used to be embedded from another site now open the native forms.
  async redirects() {
    return [
      { source: "/ft", destination: "/first-timer", permanent: true },
      { source: "/special-day", destination: "/celebrations#request", permanent: true },
      // pages the original design linked to that do not exist yet
      { source: "/cell-church/register", destination: "/membership", permanent: false },
      { source: "/cell-church/find", destination: "/membership", permanent: false },
      { source: "/map/register", destination: "/membership", permanent: false },
      { source: "/map/join", destination: "/membership", permanent: false },
      { source: "/ftabj", destination: "/first-timer", permanent: true },
      { source: "/prayer-request", destination: "/requests/prayer", permanent: true },
      { source: "/online-community", destination: "/e-member", permanent: true },
      { source: "/counselling", destination: "/requests/counseling", permanent: true },
      { source: "/pre-marital-counselling", destination: "/requests/counseling", permanent: true },
      { source: "/post-marital-counselling", destination: "/requests/counseling", permanent: true },
      { source: "/testimony", destination: "/testimonies", permanent: true },
      { source: "/st", destination: "/ql", permanent: true },
      { source: "/newcampusvolunteers", destination: "/ql", permanent: true },
      { source: "/discipleship", destination: "/ql", permanent: true },
      { source: "/ccilegacyfellowsprogram", destination: "/ql", permanent: true },
      { source: "/ccilegacyprojectspotlight", destination: "/ql", permanent: true },
      { source: "/feedback-survey", destination: "/ql", permanent: true },
      { source: "/gpa", destination: "/ql", permanent: true },
      { source: "/helpline-volunteers", destination: "/ql", permanent: true },
      { source: "/pfl", destination: "/ql", permanent: true },
      { source: "/rbcuk", destination: "/ql", permanent: true },
      { source: "/seniors-connect", destination: "/ql", permanent: true },
      { source: "/yaf-feedback", destination: "/ql", permanent: true },
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
