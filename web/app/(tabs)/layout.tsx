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
  const isHome = pathname.startsWith("/home");

  return (
    <div className="min-h-dvh h-dvh flex flex-col items-center justify-center bg-zinc-900 sm:p-4 select-none antialiased overflow-hidden">
      {/* Phone frame on desktop; full viewport on mobile */}
      <div
        className="w-full max-w-[390px] h-full sm:h-[844px] sm:max-h-[96dvh] bg-[#FAF8F5] sm:border-[3px] sm:border-black sm:rounded-[42px] overflow-hidden flex flex-col relative"
        style={{ boxShadow: "0 0 0 0px transparent" }}
      >
        {/* Brutal shadow frame on desktop */}
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none rounded-[42px]"
          style={{ boxShadow: "8px 8px 0px #000000", zIndex: 50 }}
          aria-hidden="true"
        />

        {/* Main content view */}
        <main
          className={`flex-1 flex flex-col pb-16 bg-[#FAF8F5] ${
            isHome ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {children}
        </main>

        {/* Fixed Neobrutalist Bottom Nav */}
        <nav
          aria-label="Primary navigation"
          className="absolute bottom-0 inset-x-0 bg-white border-t-[2.5px] border-black px-10 py-2 z-40 flex items-center justify-around"
        >
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center gap-0.5 group brutal-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl"
              >
                <div
                  className={`w-10 h-10 border-[2px] border-black rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-coy-yellow text-black"
                      : "bg-white text-neutral-500 group-hover:bg-neutral-100"
                  }`}
                  style={isActive ? { boxShadow: "2px 2px 0px #000" } : {}}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <span
                  className={`text-[9px] uppercase tracking-tight font-black ${
                    isActive ? "text-black" : "text-neutral-400 group-hover:text-black"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
