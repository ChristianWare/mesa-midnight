import type { Metadata } from "next";
import AboutUsHero from "@/components/AboutPage/AboutUsHero/AboutUsHero";
import OurStory from "@/components/AboutPage/OurStory/OurStory";
import OurStandards from "@/components/AboutPage/OurStandards/OurStandards";
// Same pinned-hero layout as the home page.
import styles from "../page.module.css";

const TITLE = "About Mesa Midnight | East Valley Black Car Service Since 2019";
const DESCRIPTION =
  "Founded in Mesa in 2019, Mesa Midnight runs a 24/7 black car service built on early pickups, flat rates and chauffeurs who know the East Valley.";

export const metadata: Metadata = {
  // absolute: skip the "| Mesa Midnight" template, the title already has it
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
};

export default function Page() {
  return (
    <main className={styles.main}>
      {/* The hero stays pinned to the screen... */}
      <div className={styles.heroStage}>
        <AboutUsHero />
      </div>

      {/* ...and the next sections scroll up over it. */}
      <div className={styles.overHero}>
        <OurStory />
        <OurStandards />
      </div>
    </main>
  );
}
