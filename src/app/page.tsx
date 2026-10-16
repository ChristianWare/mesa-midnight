import type { Metadata } from "next";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutIntro from "@/components/HomePage/AboutIntro/AboutIntro";
import ServicesSection from "@/components/HomePage/ServicesSection/ServicesSection";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import FleetTeaser from "@/components/HomePage/FleetTeaser/FleetTeaser";
import AirportsSection from "@/components/HomePage/AirportsSection/AirportsSection";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import Promises from "@/components/HomePage/Promises/Promises";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import BlogSection from "@/components/HomePage/BlogSection/BlogSection";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";
import styles from "./page.module.css";
import AreasWeServe from "@/components/AboutPage/AreasWeServe/AreasWeServe";

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
        <ServicesSection />
        <HowItWorks />
        <FleetTeaser />
        <AreasWeServe />
        <AirportsSection />
        <WhyChooseUs />
        <Testimonials />
        <Promises />
        <FaqSection />
        <BlogSection />
        <FinalCta />
      </div>
    </main>
  );
}
