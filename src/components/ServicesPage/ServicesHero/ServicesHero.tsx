import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.section} aria-labelledby='services-hero-heading'>
      {/* Light hero, so the nav uses dark text */}
      <Nav variant='dark' />

      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.content}>
          <span className={styles.tag}>Services</span>

          <div className={styles.row}>
            <h1 id='services-hero-heading' className={styles.heading}>
              Every ride, handled the same way.
            </h1>
            <p className={styles.intro}>
              Five services, one standard: a chauffeur who&apos;s early, a
              spotless car and the flat rate you were quoted.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
