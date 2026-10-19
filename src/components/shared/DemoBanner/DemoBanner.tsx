import styles from "./DemoBanner.module.css";

const MESSAGE =
  "Mesa Midnight is a fictional company. No real rides are booked, and checkout runs in Stripe test mode: use card 4242 4242 4242 4242.";

function Item() {
  return (
    <span className={styles.item}>
      <span className={styles.tag}>Demo site</span>
      <span className={styles.copy}>{MESSAGE}</span>
    </span>
  );
}

/**
 * Thin bar at the top of every page while SITE.demo is on.
 * Wide screens: one centred line. 1268px and below: a scrolling marquee
 * so the message always stays on one line.
 */
export default function DemoBanner() {
  return (
    <div className={styles.bar} role='note'>
      {/* Wide screens */}
      <p className={styles.static}>
        <Item />
      </p>

      {/* 1268px and below: two identical groups slide left forever */}
      <div className={styles.marquee} aria-hidden='true'>
        <div className={styles.track}>
          {[0, 1].map((group) => (
            <div key={group} className={styles.group}>
              {[0, 1, 2].map((i) => (
                <Item key={i} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Screen readers still get the message once at small sizes */}
      <p className={styles.srOnly}>{`Demo site. ${MESSAGE}`}</p>
    </div>
  );
}
