import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@ros/shared/chrome/LayoutWrapper";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Youth | RCCG Rose of Sharon",
  description: "The Rose of Sharon youth church — leadership, departments, Youth Sunday, events and how to join.",
  openGraph: {
    title: "Youth | RCCG Rose of Sharon",
    description: "The Rose of Sharon youth church — leadership, departments, Youth Sunday, events and how to join.",
    images: [{ url: "/seo.jpg", alt: "RCCG Rose of Sharon" }],
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
            __html: `window.addEventListener('load',function(){setTimeout(function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JSPJ93H');},1500)});`,
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
