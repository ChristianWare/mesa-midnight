import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import CountUp from "@/components/shared/CountUp/CountUp";
import styles from "./AboutIntro.module.css";

const STATS = [
  {
    label: "Rides completed",
    value: 40,
    suffix: "K+",
    delta: null,
    foot: "Since 2019 across the East Valley",
  },
  {
    label: "On-time pickups",
    value: 98,
    suffix: "%",
    delta: "+3%",
    foot: "Measured across every 2025 ride",
  },
  {
    label: "Chauffeurs",
    value: 12,
    suffix: "",
    delta: null,
    foot: "Full-time, licensed & background-checked",
  },
];

const IMAGES = [
  {
    src: "/images/img4.jpg",
    alt: "Black Mesa Midnight SUV parked in the desert at sunrise",
  },
  {
    src: "/images/img5.jpg",
    alt: "Black Mesa Midnight SUV driving a desert highway",
  },
  {
    src: "/images/img6.jpg",
    alt: "Black Mesa Midnight SUV in a white studio",
  },
];

export default function AboutIntro() {
  return (
    <section className={styles.section} aria-labelledby='about-intro-heading'>
      <LayoutWrapper>
        <div className={styles.grid}>
          {/* ── Left: stays pinned while the photos scroll past ── */}
          <div className={styles.left}>
            <div className={styles.top}>
              <span className={styles.tag}>About us</span>
              <h2 id='about-intro-heading' className={`${styles.heading} h2h4`}>
                A 24/7 black car service built by a former chauffeur. We answer
                at every hour, arrive 15 minutes early, and charge the flat rate
                you were quoted.
              </h2>
              <div className={styles.btnContainer}>
                <Button
                  href='/about'
                  text='Learn about us'
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
                  <span className={styles.imageTag}>Est. 2019</span>
                )}
              </div>
            ))}

            <div className={styles.caption}>
              <div>
                <Link href='/fleet/luxury-suv' className={styles.captionTitle}>
                  Luxury SUV
                </Link>
                <p className={styles.captionSub}>
                  Seats 6 · Wi-Fi · Water & chargers
                </p>
              </div>
              <span className={styles.captionLocation}>Mesa, AZ</span>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
