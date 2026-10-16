import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services";
import { serviceDetailBySlug } from "@/lib/serviceDetails";
import ServiceDetail from "@/components/ServiceDetailPage/ServiceDetail";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

type Params = { slug: string };

export function generateStaticParams() {
  return servicesData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceDetailBySlug(slug);
  if (!data) return { title: "Not found" };
  return {
    title: { absolute: data.meta.title },
    description: data.meta.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = serviceDetailBySlug(slug);
  if (!data) notFound();
  return (
    <main>
      <ServiceDetail data={data} />
      <FinalCta />
    </main>
  );
}
