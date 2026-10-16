import type { Metadata } from "next";
import { SITE } from "@/config/site";
import Nav from "@/components/shared/Nav/Nav";
import ContactSection from "@/components/ContactPage/ContactSection/ContactSection";
import ContactMarquee from "@/components/ContactPage/ContactMarquee/ContactMarquee";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name}: dispatch answers 24/7 by phone, or send a message about bookings, corporate accounts and group trips.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <main>
      {/* White page, so the nav uses dark text */}
      <Nav variant='dark' />
      <ContactSection />
      <ContactMarquee />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
