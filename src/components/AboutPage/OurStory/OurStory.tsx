import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import CountUp from "@/components/shared/CountUp/CountUp";
import styles from "./OurStory.module.css";

const NUMBERS = [
  { value: 25000, suffix: "+", separator: ",", label: "Rides since 2019" },
  { value: 98, suffix: "%", separator: "", label: "On-time pickups in 2025" },
  { value: 12, suffix: "", separator: "", label: "Full-time chauffeurs" },
  { value: 1200, suffix: "+", separator: ",", label: "Five-star reviews" },
];

/**
 * About page: the founding story. Heading left, story and button right,
 * then the numbers in rows beside a photo of the same height.
 */
export default function OurStory() {
  return (
    <section className={styles.section} aria-labelledby='story-heading'>
      <LayoutWrapper>
        {/* ── Heading + story ── */}
        <div className={styles.top}>
          <div className={styles.left}>
            <span className={styles.tag}>
              <svg
                className={styles.tagIcon}
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path
                  d='M8 0c.4 4.2 3.8 7.6 8 8-4.2.4-7.6 3.8-8 8-.4-4.2-3.8-7.6-8-8 4.2-.4 7.6-3.8 8-8Z'
                  fill='currentColor'
                />
              </svg>
              Based in Mesa, AZ
            </span>
            <h2 id='story-heading' className={`${styles.heading} h2`}>
              Founded in <span className={styles.nowrap}>2019©</span>
            </h2>
          </div>

          <div className={styles.right}>
            <p className={`${styles.copy} h6`}>
              What if a car service ran like a good airline crew? Early to every
              gate, a plan for every delay, and nobody left waiting at the curb
              at 4 a.m.
            </p>
            <p className={`${styles.copy} h6`}>
              Daniel Ortega asked that question in 2019, after one too many
              early travelers were stranded by no-show rides. He bought one
              black sedan and started driving. Today Mesa Midnight runs a full
              fleet across the Valley, and Daniel still takes the occasional
              early airport run himself.
            </p>
            <div className={styles.btn}>
              <Button
                href='/services'
                text='Explore services'
                btnType='blackBlock'
                arrow
              />
            </div>
          </div>
        </div>

        {/* ── Numbers + photo ── */}
        <div className={styles.bottom}>
          <h3 className={styles.srOnly}>By the numbers</h3>
          <ul className={styles.stats}>
            {NUMBERS.map((n) => (
              <li key={n.label} className={styles.stat}>
                <span className={styles.label}>{n.label}</span>
                <p className={styles.number}>
                  <CountUp
                    to={n.value}
                    duration={1.2}
                    separator={n.separator}
                    className={`${styles.count} h2`}
                  />
                  {n.suffix && (
                    <span className={`${styles.suffix} h2`}>{n.suffix}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          <div className={styles.photo}>
            <Image
              src='/images/img5.jpg'
              alt='Mesa Midnight chauffeur with a coffee beside the car'
              fill
              sizes='(max-width: 568px) 100vw, 50vw'
              className={styles.image}
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
