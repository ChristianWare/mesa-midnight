import LayoutWrapper from "@/components/shared/LayoutWrapper";
import CountUp from "@/components/shared/CountUp/CountUp";
import styles from "./OurStory.module.css";

const CHAPTERS = [
  {
    when: "2011 — 2019",
    text: "Daniel Ortega spent eight years driving for other car services across the Valley. The calls he remembers are the ones at 4 a.m.: a traveler at the curb, a ride that never came, a dispatcher who didn't pick up.",
  },
  {
    when: "2019",
    text: "In 2019 he bought one black sedan, printed a phone number that rang to his own cell, and promised every rider the same thing: early, every time, at a price agreed before the door closed.",
  },
  {
    when: "Today",
    text: "Today Mesa Midnight runs a fleet of sedans, SUVs and Sprinters from an office on Main Street in Mesa. Dispatch still answers 24 hours a day, and Daniel still takes the occasional 4 a.m. airport run himself.",
  },
];

const NUMBERS = [
  { label: "Rides", value: 40000, suffix: "+", separator: ",", foot: "Rides since 2019" },
  { label: "On time", value: 98, suffix: "%", separator: "", foot: "On-time pickups in 2025" },
  { label: "Chauffeurs", value: 12, suffix: "", separator: "", foot: "Full-time chauffeurs" },
  { label: "Reviews", value: 1200, suffix: "+", separator: ",", foot: "Five-star reviews" },
];

export default function OurStory() {
  return (
    <section className={styles.section} aria-labelledby='story-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <span className={styles.tag}>Our story</span>
        <h2 id='story-heading' className={`${styles.heading} h2h4`}>
          It started with a 4:10 a.m. phone call.
        </h2>

        <ol className={styles.chapters}>
          {CHAPTERS.map((c) => (
            <li key={c.when} className={styles.chapter}>
              <span className={styles.when}>{c.when}</span>
              <p className={styles.text}>{c.text}</p>
            </li>
          ))}
        </ol>

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
      </LayoutWrapper>
    </section>
  );
}
