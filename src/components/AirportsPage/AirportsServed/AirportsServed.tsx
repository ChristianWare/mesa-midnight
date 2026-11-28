// /airports: the four airports we drive every day, as cards. Each has a
// code tile, its name, two facts, a line of copy and a booking button.

import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import Plane from "@/components/shared/icons/Plane/Plane";
import { AIRPORTS_SERVED } from "@/lib/arizonaAirports";
import styles from "./AirportsServed.module.css";

export default function AirportsServed() {
  return (
    <section className={styles.section} aria-labelledby='served-heading'>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <span className={styles.tag}>Airport car service</span>
            <h2 id='served-heading' className={`${styles.heading} h2`}>
              The airports we
              <br />
              drive every day.
            </h2>
          </div>
          <p className={styles.intro}>
            Flight tracking on every pickup, a chauffeur waiting when you land,
            and a flat rate quoted before you book.
          </p>
        </div>

        <ul className={styles.grid}>
          {AIRPORTS_SERVED.map((a) => (
            <li key={a.code} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.tile} aria-hidden='true'>
                    <Plane className={styles.tileIcon} />
                  </span>
                  <span className={styles.code}>{a.code}</span>
                </div>

                <div className={styles.cardText}>
                  <h3 className={`${styles.name} h5`}>
                    {a.href ? (
                      <Link href={a.href} className={styles.nameLink}>
                        {a.shortName}
                      </Link>
                    ) : (
                      a.shortName
                    )}
                  </h3>
                  <p className={styles.full}>{a.name}</p>
                </div>

                <ul className={styles.meta}>
                  {a.meta.map((m) => (
                    <li key={m} className={styles.metaItem}>
                      {m}
                    </li>
                  ))}
                </ul>

                <p className={styles.copy}>{a.copy}</p>
              </div>

              <div className={styles.cardFoot}>
                <Button
                  href='/book'
                  text='Book a pickup'
                  btnType='underlinedBlack'
                  arrow
                />
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
