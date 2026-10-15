import type { Metadata } from "next";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutIntro from "@/components/HomePage/AboutIntro/AboutIntro";
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
        <AboutIntro />
      </div>
    </main>
  );
}
