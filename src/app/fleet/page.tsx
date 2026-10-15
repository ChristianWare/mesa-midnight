import type { Metadata } from "next";
import { SITE } from "@/config/site";
import FleetHero from "@/components/FleetPage/FleetHero/FleetHero";
import FleetTeaser from "@/components/HomePage/FleetTeaser/FleetTeaser";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Fleet",
  description: `The ${SITE.name} fleet: late-model sedans, SUVs, Sprinters and party buses, detailed before every ride.`,
  alternates: { canonical: "/fleet" },
};

export default function Page() {
  return (
    <main>
      <FleetHero />
      <FleetTeaser />
      <FinalCta />
    </main>
  );
}
