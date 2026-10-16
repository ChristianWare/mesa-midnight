import styles from "./ContactMarquee.module.css";

// Places we drive, scrolling under the contact form.
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

export default function ContactMarquee() {
  return (
    <section className={styles.section} aria-label='Areas we serve'>
      <div className={styles.trusted}>
        <span className={styles.tag}>Riding with us across Arizona</span>
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
    </section>
  );
}
