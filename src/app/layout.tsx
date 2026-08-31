import type { Metadata } from "next";
import "./globals.css";
import FloatingRequestButton from "@/components/sections/FloatingRequestButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";

const SITE_URL = "https://rccg-rose-of-sharon.netlify.app";
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

export const metadata: Metadata = {
  title: {
    default: "RCCG Rose of Sharon",
    template: "%s | RCCG Rose of Sharon",
  },
  description:
    "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.",
  keywords: ["RCCG", "Rose of Sharon", "church", "Redeemed Christian Church of God", "worship", "prayer"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "RCCG Rose of Sharon",
    title: "RCCG Rose of Sharon — Where God Has a Permanent Seat",
    description:
      "Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon. Watch sermons, request prayer, and grow in faith.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "RCCG Rose of Sharon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCCG Rose of Sharon",
    description:
      "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingRequestButton />
        <ScrollRevealInit />
      </body>
    </html>
  );
}
