import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./PreRideCheck.module.css";

/**
 * About page: a full-width film (the home hero video) with one line about
 * how every ride is prepared, and a short client quote in the corner.
 */
export default function PreRideCheck() {
  return (
    <section className={styles.section} aria-labelledby='preride-heading'>
      {/* <LayoutWrapper> */}
        <div className={styles.frame}>
          <video
            className={styles.video}
            src='/videos/101.mp4'
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
            aria-hidden='true'
          />
          <div className={styles.overlay} aria-hidden='true' />

          <div className={styles.content}>
            <h2 id='preride-heading' className={`${styles.heading} h4`}>
              Just like a flight crew runs a pre-flight check, every car gets
              one before every ride: detailed inside and out, cabin cooled,
              water and chargers in the back, and the route planned around
              traffic.
            </h2>

            <figure className={styles.quote}>
              <blockquote className={styles.quoteText}>
                <p>
                  &ldquo;The car is always spotless and always early. It&apos;s
                  the most reliable part of my travel week.&rdquo;
                </p>
              </blockquote>
              <figcaption className={styles.person}>
                <span className={styles.avatar} aria-hidden='true'>
                  MT
                </span>
                <span className={styles.personText}>
                  <span className={styles.name}>Megan T.</span>
                  <span className={styles.place}>Gilbert, AZ</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      {/* </LayoutWrapper> */}
    </section>
  );
}
