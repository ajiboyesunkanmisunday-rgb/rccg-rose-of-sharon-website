import type { Metadata } from "next";
import { Anton, Lato } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const SITE_URL = "https://rccg-rose-of-sharon.netlify.app";
const OG_IMAGE = "/assets/hero-bg.png";
const DESCRIPTION =
  "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.";

export const metadata: Metadata = {
  title: {
    default: "RCCG Rose of Sharon",
    template: "%s | RCCG Rose of Sharon",
  },
  description: DESCRIPTION,
  keywords: ["RCCG", "Rose of Sharon", "church", "Redeemed Christian Church of God", "worship", "prayer"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "RCCG Rose of Sharon",
    title: "RCCG Rose of Sharon — Where God Has a Permanent Seat",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "RCCG Rose of Sharon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCCG Rose of Sharon",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/assets/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${anton.variable} ${lato.variable}`}>
      <body className="fade-in relative font-lato">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
