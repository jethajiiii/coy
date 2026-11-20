import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coy-eight.vercel.app"),
  title: "Coy – Discover",
  description: "Privacy-first crush matching. Find out if your crush likes you back.",
  openGraph: {
    title: "Coy – Discover",
    description: "Privacy-first crush matching. Find out if your crush likes you back.",
    url: "https://coy-eight.vercel.app",
    siteName: "Coy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`h-full ${jakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body className="h-full bg-zinc-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
