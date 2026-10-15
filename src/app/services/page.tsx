import type { Metadata } from "next";
import { SITE } from "@/config/site";
import ServicesHero from "@/components/ServicesPage/ServicesHero/ServicesHero";
import ServicesList from "@/components/ServicesPage/ServicesList/ServicesList";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import OurStandards from "@/components/AboutPage/OurStandards/OurStandards";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import BlogSection from "@/components/HomePage/BlogSection/BlogSection";

export const metadata: Metadata = {
  title: "Services",
  description: `Airport transfers, corporate travel, hourly chauffeur, weddings and late-night rides from ${SITE.name}, at a flat rate you see before you book.`,
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <WhyChooseUs />
      <OurStandards />
      <FaqSection />
      <BlogSection />
      <FinalCta />
    </main>
  );
}
