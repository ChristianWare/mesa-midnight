"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./Testimonials.module.css";

type Testimonial = {
  name: string;
  initials: string;
  role: string;
  service: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "James R.",
    initials: "JR",
    role: "Chandler",
    service: "Airport transfer",
    quote:
      "I book the 4:30 a.m. airport run twice a month. Not once has the car been late. Not once.",
  },
  {
    name: "Alicia & Tom",
    initials: "A&T",
    role: "Scottsdale",
    service: "Wedding",
    quote:
      "We moved 80 wedding guests between the resort and the venue with three Sprinters. Nobody waited.",
  },
  {
    name: "Rachel K.",
    initials: "RK",
    role: "Office manager, Tempe",
    service: "Corporate account",
    quote:
      "Our sales team uses the corporate account for every client visit. One invoice a month, zero follow-up.",
  },
];

// Places we drive, shown in the strip along the bottom.
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

function Stars() {
  return (
    <div className={styles.stars} role='img' aria-label='5 out of 5 stars'>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox='0 0 24 24'
          width='14'
          height='14'
          aria-hidden='true'
          className={styles.star}
        >
          <path
            fill='currentColor'
            d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className={styles.section} aria-labelledby='testimonials-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        {/* ── Heading row ── */}
        <div className={styles.layout}>
          <div className={styles.labelCol}>
            <span className={styles.tag}>Testimonials</span>
          </div>

          <div className={styles.header}>
            <h2 id='testimonials-heading' className={styles.heading}>
              What riders say at 5&nbsp;a.m.
            </h2>
            <div className={styles.headerRight}>
              <p className={styles.intro}>
                Early flights, big days and busy offices. Here&apos;s what our
                riders across the East Valley tell us.
              </p>
              <div className={styles.headerBtn}>
                <Button
                  href='/book'
                  text='Book a ride'
                  btnType='underlinedBlack'
                  arrow
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Names + quote ── */}
        <div className={styles.body}>
          <ul className={styles.names} aria-label='Choose a review'>
            {TESTIMONIALS.map((item, i) => (
              <li key={item.name}>
                <button
                  type='button'
                  className={`${styles.nameBtn} ${i === active ? styles.nameActive : ""}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.nameText}>{item.name}</span>
                  <svg
                    className={styles.nameArrow}
                    viewBox='0 0 24 24'
                    width='14'
                    height='14'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'
                  >
                    <path d='M5 12h14M13 6l6 6-6 6' />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* key remounts the block so each review fades in */}
          <figure className={styles.review} key={active} aria-live='polite'>
            <Stars />
            <blockquote className={styles.quote}>
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption className={styles.author}>
              <span className={styles.avatar} aria-hidden='true'>
                {t.initials}
              </span>
              <span className={styles.authorText}>
                <span className={styles.authorName}>{t.name}</span>
                <span className={styles.authorRole}>{t.role}</span>
              </span>
              <span className={styles.service}>{t.service}</span>
            </figcaption>
          </figure>
        </div>

        {/* ── Places strip ── */}
        <div className={styles.trusted}>
          <span className={styles.trustedTag}>
            Riding with us across Arizona
          </span>
        </div>
      </LayoutWrapper>

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
