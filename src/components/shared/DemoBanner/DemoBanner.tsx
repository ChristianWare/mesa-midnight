import styles from "./DemoBanner.module.css";

/** Thin bar at the top of every page while SITE.demo is on. */
export default function DemoBanner() {
  return (
    <div className={styles.bar} role='note'>
      <p className={styles.text}>
        <span className={styles.tag}>Demo site</span>
        <span className={styles.copy}>
          Mesa Midnight is a fictional company. No real rides are booked, and
          checkout runs in Stripe test mode: use card 4242 4242 4242 4242.
        </span>
      </p>
    </div>
  );
}
