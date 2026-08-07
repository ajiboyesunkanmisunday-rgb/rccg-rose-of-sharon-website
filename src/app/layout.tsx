import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCCG Rose of Sharon",
  description: "A Place Where God Have a Permanent Seat — RCCG Rose of Sharon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
