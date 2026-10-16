import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { AIRPORT_FEATURES } from "@/lib/airportFeatures";
import AirportFeature from "./AirportFeature";
import styles from "./AirportFeatures.module.css";

/** All three airport features, stacked, for the /airports hub. */
export default function AirportFeatures() {
  return (
    <section className={styles.section} aria-label='Airports in detail'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.stack}>
          {AIRPORT_FEATURES.slice(0, 1).map((f) => (
            <AirportFeature key={f.id} data={f} />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
