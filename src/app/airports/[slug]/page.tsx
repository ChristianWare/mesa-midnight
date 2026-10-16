import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import AirportDetailPage from "@/components/AirportsPage/AirportFeature/AirportDetailPage";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { airportsData } from "@/lib/airports";
import { AIRPORT_FEATURES } from "@/lib/airportFeatures";

type Params = { slug: string };

/** Airports with a designed page; the rest still use the placeholder. */
const featureFor = (slug: string) =>
  AIRPORT_FEATURES.find((f) => f.href === `/airports/${slug}`);

export function generateStaticParams() {
  return airportsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureFor(slug);
  if (feature) {
    return {
      title: { absolute: feature.meta.title },
      description: feature.meta.description,
      alternates: { canonical: `/airports/${slug}` },
    };
  }
  const entry = airportsData.find((e) => e.slug === slug);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.name} Car Service`, description: `Car service to and from ${entry.name} (${entry.code}) with ${SITE.name}.` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = airportsData.find((e) => e.slug === slug);
  if (!entry) notFound();
  const feature = featureFor(slug);
  if (feature) return <AirportDetailPage data={feature} />;
  return <PagePlaceholder {...guides.airportDetail} heading={`${entry.name} Car Service`} />;
}
