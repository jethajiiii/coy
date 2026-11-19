import React from "react";

const FOOTER_LINKS = [
  { label: "Blog", href: "#blog" },
  { label: "App Store", href: "https://apps.apple.com" },
  { label: "Google Play", href: "https://play.google.com" },
  { label: "Terms", href: "#terms" },
  { label: "Privacy policy", href: "#privacy" },
  { label: "Stop messages", href: "#stop-messages" },
  { label: "Contact", href: "mailto:help@coy.app" },
] as const;

export function HomeFooter(): React.JSX.Element {
  return (
    <footer className="mt-4 pt-6 pb-6 px-5 border-t border-neutral-200 bg-white">
      <div className="flex flex-col gap-4">
        {/* Brand & Legal Name */}
        <div>
          <div className="flex items-center gap-0.5">
            <span className="font-display font-black text-2xl text-black tracking-tight">coy</span>
            <span className="w-2.5 h-2.5 rounded-full bg-coy-pink inline-block translate-y-0.5 ml-0.5" />
          </div>
          <p className="text-[10.5px] text-neutral-500 font-medium mt-1 leading-normal">
            Coy is run by Fiquity Technology Private Limited.
          </p>
        </div>

        {/* Links Navigation */}
        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-bold text-neutral-800 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
