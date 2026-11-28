import type { Metadata } from "next";
import AirportsHero from "@/components/AirportsPage/AirportsHero/AirportsHero";
import AirportsIntro from "@/components/AirportsPage/AirportsIntro/AirportsIntro";
import AirportsServed from "@/components/AirportsPage/AirportsServed/AirportsServed";
import AirportsAviation from "@/components/AirportsPage/AirportsAviation/AirportsAviation";
import AirportsDirectory from "@/components/AirportsPage/AirportsDirectory/AirportsDirectory";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import HeroStage from "@/components/HomePage/HeroStage/HeroStage";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";
import { AIRPORT_FAQS, ARIZONA_AIRPORTS } from "@/lib/arizonaAirports";
import styles from "./page.module.css";

const TITLE = "Airport Car Service | Sky Harbor & Mesa Gateway | Mesa Midnight";
const DESCRIPTION =
  "We cover both Valley airports and the private terminals around them. Flight tracking is on every booking, and your first 60 minutes after landing are free.";

export const metadata: Metadata = {
  // absolute: the title already includes the brand, so skip the template
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/airports" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/airports" },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Airports in Arizona",
    numberOfItems: ARIZONA_AIRPORTS.length,
    itemListElement: ARIZONA_AIRPORTS.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Airport",
        name: a.name,
        ...(a.iata && { iataCode: a.iata }),
        ...(a.icao && { icaoCode: a.icao }),
        address: {
          "@type": "PostalAddress",
          addressLocality: a.city,
          addressRegion: "AZ",
          addressCountry: "US",
        },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AIRPORT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function Page() {
  return (
    <main className={styles.main}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* The hero stays pinned to the screen... */}
      <HeroStage className={styles.heroStage}>
        <AirportsHero />
      </HeroStage>

      {/* ...and the next sections scroll up over it. */}
      <div className={styles.overHero}>
        <AirportsIntro />
        <AirportsServed />
        <AirportsAviation />
        <AirportsDirectory />
        <FaqSection
          heading='Questions about Arizona airports'
          items={AIRPORT_FAQS}
        />
        <FinalCta />
      </div>
    </main>
  );
}
