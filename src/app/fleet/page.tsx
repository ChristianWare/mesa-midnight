import type { Metadata } from "next";
import { SITE } from "@/config/site";
import FleetHero from "@/components/FleetPage/FleetHero/FleetHero";
import FleetList from "@/components/FleetPage/FleetList/FleetList";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import BlogSection from "@/components/HomePage/BlogSection/BlogSection";

export const metadata: Metadata = {
  title: "Fleet",
  description: `The ${SITE.name} fleet: sedans, SUVs, Sprinters, a stretch limousine, a party bus and a coach bus, detailed before every ride.`,
  alternates: { canonical: "/fleet" },
};

export default function Page() {
  return (
    <main>
      <FleetHero />
      <FleetList />
      <FaqSection />
      <BlogSection />
    </main>
  );
}
