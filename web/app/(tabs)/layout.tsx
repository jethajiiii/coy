"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass } from "lucide-react";
import React from "react";

const NAV_ITEMS = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/discover", label: "Discover", Icon: Compass },
] as const;

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh h-dvh flex flex-col items-center justify-center bg-neutral-100 antialiased selection:bg-rose-100 selection:text-rose-600">
      <div className="w-full max-w-md h-full flex flex-col bg-white shadow-2xl relative overflow-hidden">
        {/* Main scrollable view area with clearance for the bottom bar */}
        <main className="flex-1 flex flex-col overflow-y-auto pb-20">
          {children}
        </main>

        {/* Fixed bottom navigation bar with safe-area padding */}
        <nav
          aria-label="Primary navigation"
          className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-8 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-around"
        >
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 transition-all duration-200 px-4 py-1 rounded-xl ${
                  isActive
                    ? "text-rose-500 font-semibold scale-105"
                    : "text-neutral-400 hover:text-neutral-600 font-medium"
                }`}
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-transform"
                />
                <span className="text-[11px] tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
