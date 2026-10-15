import LayoutWrapper from "@/components/shared/LayoutWrapper";
import CountUp from "@/components/shared/CountUp/CountUp";
import styles from "./OurStory.module.css";

// Places we drive, shown in the strip along the top.
const CITIES = [
  "Mesa",
  "Chandler",
  "Gilbert",
  "Scottsdale",
  "Tempe",
  "Phoenix",
  "Queen Creek",
  "Paradise Valley",
  "Fountain Hills",
  "Tucson",
];

const NUMBERS = [
  {
    label: "Rides",
    value: 25000,
    suffix: "+",
    separator: ",",
    foot: "Rides since 2019",
  },
  {
    label: "On time",
    value: 98,
    suffix: "%",
    separator: "",
    foot: "On-time pickups in 2025",
  },
  {
    label: "Chauffeurs",
    value: 12,
    suffix: "",
    separator: "",
    foot: "Full-time chauffeurs",
  },
  {
    label: "Reviews",
    value: 1200,
    suffix: "+",
    separator: ",",
    foot: "Five-star reviews",
  },
];

export default function OurStory() {
  return (
    <section className={styles.section} aria-labelledby='story-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        {/* ── Places strip ── */}
        <div className={styles.trusted}>
          <span className={styles.trustedTag}>
            Riding with us across Arizona
          </span>
        </div>

        <div className={styles.marquee} aria-hidden='true'>
          <div className={styles.track}>
            {[0, 1].map((g) => (
              <div className={styles.group} key={g}>
                {CITIES.map((c) => (
                  <span key={c} className={styles.city}>
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Story ── */}
        <div className={styles.story}>
          <span className={styles.tag}>Our story</span>
          <h2 id='story-heading' className={`${styles.heading} h2h4`}>
            Tired of seeing 4 a.m. travelers stranded, Daniel Ortega bought one
            black sedan in 2019. Today Mesa Midnight runs a full fleet, and
            Daniel still drives the occasional early airport run.
          </h2>

          {/* <ol className={styles.chapters}>
            {CHAPTERS.map((c) => (
              <li key={c.when} className={styles.chapter}>
                <span className={styles.when}>{c.when}</span>
                <p className={styles.text}>{c.text}</p>
              </li>
            ))}
          </ol> */}

          {/* ── By the numbers ── */}
          <h3 className={styles.srOnly}>By the numbers</h3>
          <ul className={styles.stats}>
            {NUMBERS.map((n) => (
              <li key={n.label} className={styles.card}>
                <div className={styles.cardInner}>
                  <span className={styles.cardLabel}>{n.label}</span>
                  <p className={styles.number}>
                    <CountUp
                      to={n.value}
                      duration={1.2}
                      separator={n.separator}
                      className={`${styles.count} h2`}
                    />
                    {n.suffix && (
                      <span className={`${styles.suffix} h2`}>{n.suffix}</span>
                    )}
                  </p>
                </div>
                <p className={styles.cardFoot}>{n.foot}</p>
              </li>
            ))}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
