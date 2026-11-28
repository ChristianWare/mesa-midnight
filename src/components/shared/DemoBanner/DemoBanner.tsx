import { SITE } from "@/config/site";
import styles from "./DemoBanner.module.css";

/** Short lines that scroll along the bar: a chip, then the sentence. */
const MESSAGES = [
  {
    tag: "24/7",
    text: "Black car service across Mesa, Phoenix and the Valley",
  },
  {
    tag: "Flat rates",
    text: "Your price is set before you book. No surge, ever",
  },
  {
    tag: "Airports",
    text: "Flight tracking and 60 minutes of free wait on every pickup",
  },
  {
    tag: "Book now",
    text: `Online in two minutes, or call ${SITE.phone.display}`,
  },
];

function Item({ tag, text }: { tag: string; text: string }) {
  return (
    <span className={styles.item}>
      <span className={styles.tag}>{tag}</span>
      <span className={styles.copy}>{text}</span>
    </span>
  );
}

/**
 * Thin yellow bar at the top of every page while SITE.demo is on. The
 * messages scroll left forever at every screen size, so they always stay
 * on one line.
 */
export default function DemoBanner() {
  return (
    <div className={styles.bar} role='note'>
      {/* Two identical groups slide left; each is wider than any screen */}
      <div className={styles.marquee} aria-hidden='true'>
        <div className={styles.track}>
          {[0, 1].map((group) => (
            <div key={group} className={styles.group}>
              {[...MESSAGES, ...MESSAGES].map((m, i) => (
                <Item key={i} {...m} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Screen readers get each message once */}
      <p className={styles.srOnly}>
        {MESSAGES.map((m) => `${m.tag}: ${m.text}.`).join(" ")}
      </p>
    </div>
  );
}
