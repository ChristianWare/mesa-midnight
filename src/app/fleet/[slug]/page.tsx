import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleetData } from "@/lib/data";
import { fleetDetailBySlug } from "@/lib/fleetDetails";
import FleetDetail from "@/components/FleetDetailPage/FleetDetail";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";
import { SITE } from "@/config/site";

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

  const url = `${SITE.url}/fleet/${slug}`;
  const hourly = Number(data.from.replace(/[^0-9.]/g, ""));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Vehicle",
      name: data.name,
      description: data.intro,
      url,
      image: `${SITE.url}${data.cutout}`,
      vehicleSeatingCapacity: data.seats,
      ...(hourly > 0 && {
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: hourly,
            priceCurrency: "USD",
            unitCode: "HUR",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "HUR",
            },
          },
          seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Fleet",
          item: `${SITE.url}/fleet`,
        },
        { "@type": "ListItem", position: 3, name: data.name, item: url },
      ],
    },
  ];

  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FleetDetail data={data} />
      <FaqSection
        heading={`Questions about the ${data.short}`}
        items={data.faqs.map((f, i) => ({ id: i, question: f.q, answer: f.a }))}
      />
      <FinalCta />
    </main>
  );
}
