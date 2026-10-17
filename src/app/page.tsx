import type { Metadata } from "next";
import Script from "next/script";
import { googleMapsSrc } from "@/lib/googleMaps";
import { getBookingWidgetData } from "@/lib/booking/widgetData";
// import QuoteBand from "@/components/HomePage/QuoteBand/QuoteBand";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";
import HeroStage from "@/components/HomePage/HeroStage/HeroStage";
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

export default async function Page() {
  // Services, vehicles and fees for the instant-quote widget
  const widget = await getBookingWidgetData();

  return (
    <main className={styles.main}>
      {/* Google Maps for address search in the quote widget */}
      <Script
        id='google-maps'
        src={googleMapsSrc()}
        data-google-maps='1'
        strategy='lazyOnload'
      />

      {/* The hero stays pinned to the screen... */}
      <HeroStage className={styles.heroStage}>
        <Hero widget={widget} />
      </HeroStage>

      {/* ...and everything after it scrolls up over the top. */}
      <div className={styles.overHero}>
        <AboutIntro />
        {/* <QuoteBand widget={widget} showMap /> */}
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
