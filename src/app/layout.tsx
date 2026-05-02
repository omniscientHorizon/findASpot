import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "SpotFinder — Schaffer Library",
  description: "Real-time study spot availability at Schaffer Library, Union College",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpotFinder",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="bg-[#fafafa] text-gray-900 antialiased overflow-hidden">{children}</body>
    </html>
  );
}
