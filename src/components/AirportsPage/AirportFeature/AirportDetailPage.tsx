import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";
import type { AirportFeatureData } from "@/lib/airportFeatures";
import AirportFeature from "./AirportFeature";
import styles from "./AirportFeatures.module.css";

/** One airport's own page: nav, its feature block (heading as H1), CTA. */
export default function AirportDetailPage({ data }: { data: AirportFeatureData }) {
  return (
    <main>
      <Nav />
      <section className={styles.section} style={{ paddingTop: "3rem" }}>
        <LayoutWrapper paddingNone='paddingNone'>
          <AirportFeature data={data} as='h1' />
        </LayoutWrapper>
      </section>
      <FinalCta />
    </main>
  );
}
