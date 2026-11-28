"use client";

import { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./WhoWeDrive.module.css";

const SLIDES = [
  { value: "92%", label: "Of our riders book with us again" },
  { value: "15 min", label: "Early to every pickup, on average" },
  { value: "40+", label: "Companies on monthly corporate accounts" },
];

const pad = (n: number) => String(n).padStart(2, "0");

function ArrowIcon({ left }: { left?: boolean }) {
  return (
    <svg
      viewBox='0 0 16 16'
      width='16'
      height='16'
      aria-hidden='true'
      style={left ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d='M2 8h11M9 4l4 4-4 4'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

/**
 * About page, after the chauffeurs: who we drive for. Heading, a small
 * stat slider, a photo and a short paragraph with a link.
 */
export default function WhoWeDrive() {
  const [i, setI] = useState(0);
  const go = (d: number) =>
    setI((p) => (p + d + SLIDES.length) % SLIDES.length);
  const s = SLIDES[i];

  return (
    <section className={styles.section} aria-labelledby='who-heading'>
      <LayoutWrapper>
        {/* ── Label + heading ── */}
        <div className={styles.top}>
          <p className={styles.bracket}>
            [ Who we drive
            <br />
            <span className={styles.indent}>/For whom ]</span>
          </p>
          <h2 id='who-heading' className={`${styles.heading} h4`}>
            We drive executives, families, wedding parties and event planners
            across the Valley, with flat rates, early arrivals and chauffeurs
            who treat every ride like the first one.
          </h2>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaText}>19~26©</span>
          <span className={styles.metaText}>Mesa, AZ</span>
        </div>

        {/* ── Slider, photo, text ── */}
        <div className={styles.grid}>
          <div className={styles.slider}>
            <div className={styles.slide} aria-live='polite'>
              <p key={i} className={styles.slideInner}>
                <span className={`${styles.value} h2`}>{s.value}</span>
                <span className={styles.slideLabel}>{s.label}</span>
              </p>
            </div>
            <div className={styles.controls}>
              <div className={styles.arrows}>
                <button
                  type='button'
                  className={styles.arrow}
                  onClick={() => go(-1)}
                  aria-label='Previous number'
                >
                  <ArrowIcon left />
                </button>
                <button
                  type='button'
                  className={styles.arrow}
                  onClick={() => go(1)}
                  aria-label='Next number'
                >
                  <ArrowIcon />
                </button>
              </div>
              <span className={styles.counter}>
                {pad(i + 1)}/{pad(SLIDES.length)}
              </span>
            </div>
          </div>

          <div className={styles.photo}>
            <Image
              src='/images/img8.jpg'
              alt='Passenger with a coffee in the back seat'
              fill
              sizes='(max-width: 1068px) 0px, 30vw'
              className={styles.image}
            />
          </div>

          <div className={styles.text}>
            <p className={styles.copy}>
              Corporate accounts get one monthly invoice, priority booking and a
              dispatcher who knows your travelers by name. Families and event
              planners get the same flat rate and the same early chauffeur,
              every time.
            </p>
            <div className={styles.link}>
              <Button
                href='/corporate-accounts'
                text='Corporate accounts'
                btnType='underlinedBlack'
                arrow
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
