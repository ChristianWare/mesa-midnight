import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleetData } from "@/lib/data";
import { fleetDetailBySlug } from "@/lib/fleetDetails";
import FleetDetail from "@/components/FleetDetailPage/FleetDetail";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

type Params = { slug: string };

export function generateStaticParams() {
  return fleetData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = fleetDetailBySlug(slug);
  if (!data) return { title: "Not found" };
  return {
    title: { absolute: data.meta.title },
    description: data.meta.description,
    alternates: { canonical: `/fleet/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = fleetDetailBySlug(slug);
  if (!data) notFound();
  return (
    <main>
      <FleetDetail data={data} />
      <FinalCta />
    </main>
  );
}
