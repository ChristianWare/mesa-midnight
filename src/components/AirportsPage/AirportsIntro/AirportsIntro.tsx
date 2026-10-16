import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import CountUp from "@/components/shared/CountUp/CountUp";
import styles from "./AirportsIntro.module.css";

const STATS = [
  {
    label: "Sky Harbor · PHX",
    value: 60,
    suffix: "\u00A0min",
    delta: null,
    foot: "Free wait after landing, flight tracked",
  },
  {
    label: "Mesa Gateway · AZA",
    value: 10,
    suffix: "\u00A0min",
    delta: null,
    foot: "From most of Mesa and Gilbert",
  },
  {
    label: "Private aviation",
    value: 2,
    suffix: "\u00A0FBOs",
    delta: null,
    foot: "Tarmac-side at Falcon Field & Scottsdale",
  },
];

const IMAGES = [
  {
    src: "/images/skyHarbor.png",
    alt: "Phoenix Sky Harbor control tower",
  },
  {
    src: "/images/mesaGateway.webp",
    alt: "Phoenix-Mesa Gateway Airport",
  },
  {
    src: "/images/img4.jpg",
    alt: "Chauffeur waiting beside a black car on the tarmac",
  },
];

export default function AirportsIntro() {
  return (
    <section className={styles.section} aria-labelledby='airports-intro-heading'>
      <LayoutWrapper>
        <div className={styles.grid}>
          {/* ── Left: stays pinned while the photos scroll past ── */}
          <div className={styles.left}>
            <div className={styles.top}>
              <span className={styles.tag}>Where we pick up</span>
              <h2 id='airports-intro-heading' className={`${styles.heading} h3`}>
                Three airports, one standard. We know every curb, gate and
                private terminal in the Valley, and we track your flight from
                wheels-up to the moment you&apos;re in the car.
              </h2>
              <div className={styles.btnContainer}>
                <Button
                  href='/book'
                  text='Book an airport ride'
                  btnType='mainBlack'
                  arrow
                />
              </div>
            </div>

            <ul className={styles.stats}>
              {STATS.map((s) => (
                <li key={s.label} className={styles.card}>
                  <div className={styles.cardInner}>
                    <span className={styles.cardLabel}>{s.label}</span>
                    <div className={styles.cardBottom}>
                      {s.delta ? (
                        <span className={styles.delta}>{s.delta}</span>
                      ) : (
                        <span />
                      )}
                      <p className={styles.number}>
                        <CountUp
                          to={s.value}
                          duration={1.2}
                          className={`${styles.count} h2`}
                        />
                        {s.suffix && (
                          <span className={styles.suffix}>{s.suffix}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className={styles.cardFoot}>{s.foot}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: photo stack ── */}
          <div className={styles.right}>
            {IMAGES.map((img, i) => (
              <div key={img.src} className={styles.imageWrap}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes='(max-width: 968px) 50vw, (max-width: 1268px) 240px, 440px'
                  className={styles.image}
                />
                {i === IMAGES.length - 1 && (
                  <span className={styles.imageTag}>FFZ · SDL</span>
                )}
              </div>
            ))}

            <div className={styles.caption}>
              <div>
                <Link
                  href='/airports/phx-sky-harbor'
                  className={styles.captionTitle}
                >
                  Sky Harbor (PHX)
                </Link>
                <p className={styles.captionSub}>
                  Curbside or inside · 60 min free wait
                </p>
              </div>
              <span className={styles.captionLocation}>Phoenix, AZ</span>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
