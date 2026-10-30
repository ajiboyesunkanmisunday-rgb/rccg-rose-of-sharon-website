import type { Metadata } from "next";
import "./market.css";
import FormChecks from "@ros/shared/kit/FormChecks";

export const metadata: Metadata = {
  title: "ROS Marketplace | RCCG Rose of Sharon",
  description: "Shop within the family — quality goods from the RCCG Rose of Sharon church community.",
  icons: { icon: [{ url: "/ros-logo.png", type: "image/png" }] },
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <FormChecks />
        {children}
      </body>
    </html>
  );
}
