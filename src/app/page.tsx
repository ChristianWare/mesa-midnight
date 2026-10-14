import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    // <PagePlaceholder {...guides.home}></PagePlaceholder>
    <main>
      <Hero />
    </main>
  );
}
