// /airports: the private aviation band. A dark panel with a photo, the
// pitch, three facts and two buttons.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./AirportsAviation.module.css";

const FACTS = [
  { label: "Tracking", value: "By tail number" },
  { label: "Meet", value: "FBO lobby or planeside" },
  { label: "Airports", value: "FFZ, SDL, AZA and PHX" },
];

export default function AirportsAviation() {
  return (
    <section className={styles.section} aria-labelledby='aviation-heading'>
      <LayoutWrapper>
        <div className={styles.panel}>
          <div className={styles.photo}>
            <Image
              src='/images/img6.jpg'
              alt='Chauffeur on the phone beside a black car on the ramp'
              fill
              sizes='(max-width: 968px) 100vw, 45vw'
              className={styles.img}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.head}>
              <span className={styles.tag}>Private aviation</span>
              <h2 id='aviation-heading' className={`${styles.heading} h2`}>
                Flying private?
                <br />
                We meet the jet.
              </h2>
            </div>

            <p className={styles.copy}>
              Give us your tail number when you book. We track the flight,
              confirm ramp access with the FBO, and meet you in the lobby or at
              the aircraft, for passengers and crew, at Falcon Field,
              Scottsdale, Mesa Gateway and Sky Harbor.
            </p>

            <dl className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt className={styles.factLabel}>{f.label}</dt>
                  <dd className={styles.factValue}>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.actions}>
              <Button
                href='/book'
                text='Book an FBO pickup'
                btnType='yellowBlock'
                arrow
              />
              <Button
                href='/airports/private-aviation'
                text='Private aviation'
                btnType='underlinedWhite'
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
