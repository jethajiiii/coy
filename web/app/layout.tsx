import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coy – Discover",
  description: "Privacy-first crush matching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-neutral-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
