import type { Metadata } from "next";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <main className={styles.main}>
      {/* The hero stays pinned to the screen... */}
      <div className={styles.heroStage}>
        <Hero />
      </div>

      {/* ...and everything after it scrolls up over the top. */}
      <div className={styles.overHero}>
        {/* TEMPORARY: stand-in so there's something to scroll.
            Replace with the real home sections (services, fleet, quote band,
            testimonials, FAQ...) and delete this block. */}
        <section className={styles.placeholder}>
          <p>Next sections go here.</p>
        </section>
      </div>
    </main>
  );
}
