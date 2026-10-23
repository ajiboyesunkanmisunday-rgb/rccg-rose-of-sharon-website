import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "RCCG Rose of Sharon",
  description:
    "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.",
  openGraph: {
    title: "RCCG Rose of Sharon",
    description:
    "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.",
    url: "https://rccg-rose-of-sharon.netlify.app",
    images: [{ url: "/seo.png", alt: "RCCG Rose of Sharon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCCG Rose of Sharon",
    description:
    "Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.",
    images: [{ url: "/seo.png", alt: "RCCG Rose of Sharon" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "129x129", type: "image/x-icon" },
      { url: "/logo.svg" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load the original site's CSS files for pixel-perfect parity */}
        <link rel="stylesheet" href="/css/f3f8de09d2044a56.css" />
        <link rel="stylesheet" href="/css/3ff23b8742f73c95.css" />
        <link rel="stylesheet" href="/css/07b6fb94d282a177.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JSPJ93H');`,
          }}
        />
      </head>
      <body className="fade-in relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5JSPJ93H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Suspense>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Suspense>
      </body>
    </html>
  );
}
