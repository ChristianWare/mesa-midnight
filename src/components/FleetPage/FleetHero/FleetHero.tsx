import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./FleetHero.module.css";

type Shot = { src: string; size: "small" | "large" };

// Alternating narrow and wide photos in the moving strip.
const SHOTS: Shot[] = [
  { src: "/images/img4.jpg", size: "small" },
  { src: "/images/img7.jpg", size: "large" },
  { src: "/images/img9.jpg", size: "small" },
  { src: "/images/img8.jpg", size: "large" },
  { src: "/images/img10.jpg", size: "small" },
  { src: "/images/img11.jpg", size: "large" },
  { src: "/images/img5.jpg", size: "small" },
  { src: "/images/img6.jpg", size: "large" },
];

// Listed twice so the strip is long enough to loop on wide screens.
const VEHICLES = ["Executive Sedan", "Luxury SUV", "Executive Sprinter", "Party Bus"];
const STRIP = [...VEHICLES, ...VEHICLES];

export default function FleetHero() {
  return (
    <section className={styles.section} aria-labelledby='fleet-hero-heading'>
      <div className={styles.dark}>
        {/* Transparent nav, white text */}
        <Nav variant='overlay' />

        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.content}>
            <span className={styles.tag}>Our fleet</span>
            <h1 id='fleet-hero-heading' className={styles.heading}>
              Late-model, spotless and quiet. Every single ride.
            </h1>
            <div className={styles.btn}>
              <Button
                href='/book'
                text='Book a ride'
                btnType='whiteMain'
                arrow
              />
            </div>
          </div>
        </LayoutWrapper>
      </div>

      {/* ── Moving photo strip, framed by two curves ── */}
      <div className={styles.ticker} aria-hidden='true'>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.set} key={copy}>
              {SHOTS.map((s) => (
                <div
                  key={s.src}
                  className={`${styles.shot} ${styles[s.size]}`}
                >
                  <Image
                    src={s.src}
                    alt=''
                    fill
                    sizes='(max-width: 968px) 60vw, 40vw'
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dark curve over the top edge, white curve over the bottom */}
        <svg
          className={`${styles.curve} ${styles.curveTop}`}
          viewBox='0 0 1000 100'
          preserveAspectRatio='none'
        >
          <path d='M0 0H1000V8Q500 120 0 8Z' />
        </svg>
        <svg
          className={`${styles.curve} ${styles.curveBottom}`}
          viewBox='0 0 1000 100'
          preserveAspectRatio='none'
        >
          <path d='M0 100H1000V92Q500 -20 0 92Z' />
        </svg>
      </div>

      {/* ── Vehicle strip ── */}
      <div className={styles.strip}>
        <span className={styles.stripTag}>Choose your ride</span>
        <div className={styles.marquee} aria-hidden='true'>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.marqueeGroup} key={copy}>
                {STRIP.map((v, i) => (
                  <span key={`${v}-${i}`} className={styles.vehicle}>
                    {v}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
