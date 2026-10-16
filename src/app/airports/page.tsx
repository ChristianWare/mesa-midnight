import type { Metadata } from "next";
import AirportsHero from "@/components/AirportsPage/AirportsHero/AirportsHero";
import AirportsIntro from "@/components/AirportsPage/AirportsIntro/AirportsIntro";
import AirportFeatures from "@/components/AirportsPage/AirportFeature/AirportFeatures";
// Same pinned-hero layout as the home page.
import styles from "../page.module.css";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

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

export default function Page() {
  return (
    <main className={styles.main}>
      {/* The hero stays pinned to the screen... */}
      <div className={styles.heroStage}>
        <AirportsHero />
      </div>

      {/* ...and the next sections scroll up over it. */}
      <div className={styles.overHero}>
        <AirportsIntro />
        <AirportFeatures />
        <FinalCta />
      </div>
    </main>
  );
}
