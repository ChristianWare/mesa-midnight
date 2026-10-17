import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./BookingPageIntro.module.css";

const FACTS = [
  { label: "Pricing", value: "Flat rate, shown up front" },
  { label: "Airports", value: "Flight tracking included" },
  { label: "Dispatch", value: "Open 24/7" },
];

/** Booking page header, in the same style as the service and fleet pages. */
export default function BookingPageIntro() {
  return (
    <section className={styles.container} aria-labelledby='book-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.top}>
          <div>
            <span className={styles.tag}>Book a ride</span>
            <h1 id='book-heading' className={styles.heading}>
              Book Your Ride
            </h1>
            <p className={styles.intro}>
              Three quick steps: your trip, your vehicle, then confirm. You see
              the full price before you book, and we confirm by email and text.
            </p>
          </div>

          <dl className={styles.facts}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </LayoutWrapper>
    </section>
  );
}
