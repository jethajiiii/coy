import React from "react";
import { HomeHero, HowItWorks, FaqSection } from "@/features/home/components";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] pb-4">
      <HomeHero />
      <HowItWorks />
      <FaqSection />
    </div>
  );
}
