import type { Metadata } from "next";
import AirportDetailPage from "@/components/AirportsPage/AirportFeature/AirportDetailPage";
import { featureById } from "@/lib/airportFeatures";

const data = featureById("private");

export const metadata: Metadata = {
  title: { absolute: data.meta.title },
  description: data.meta.description,
  alternates: { canonical: "/airports/private-aviation" },
};

export default function Page() {
  return <AirportDetailPage data={data} />;
}
