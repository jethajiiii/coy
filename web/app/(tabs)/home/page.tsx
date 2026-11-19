import React from "react";
import { HomeHero, HowItWorks, FaqSection, HomeFooter } from "@/features/home/components";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5]">
      <HomeHero />
      <HowItWorks />
      <FaqSection />
      <HomeFooter />
    </div>
  );
}
