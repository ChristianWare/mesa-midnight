"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutIntro.module.css";

type Card = {
  value: string;
  unit: string;
  chip: string;
  lead: string;
  rest: string;
  href: string;
};

const SIDE_LEFT: Card = {
  value: "40K+",
  unit: "rides",
  chip: "Since 2019",
  lead: "More than 40,000 rides across the East Valley.",
  rest: " Airport runs, client pickups, weddings and late nights, all at the rate we quoted.",
  href: "/about",
};

const MIDDLE: Card = {
  value: "98%",
  unit: "on time",
  chip: "On-time pickups",
  lead: "A 24/7 black car service built by a former chauffeur.",
  rest: " We arrive 15 minutes early, track every flight and keep the price you were quoted.",
  href: "/about",
};

const SIDE_RIGHT: Card = {
  value: "12",
  unit: "chauffeurs",
  chip: "Full-time",
  lead: "Every chauffeur is full-time, licensed and background-checked.",
  rest: " They train on our routes before they drive alone.",
  href: "/about",
};

function Stat({ card, big }: { card: Card; big?: boolean }) {
  return (
    <div className={styles.top}>
      <p className={styles.stat}>
        <span className={`${styles.value} ${big ? "h2" : "h2"}`}>
          {card.value}
        </span>
        <span className={styles.unit}>{card.unit}</span>
      </p>
      <span className={styles.chip}>{card.chip}</span>
    </div>
  );
}

function Copy({ card }: { card: Card }) {
  return (
    <Link href={card.href} className={styles.copy}>
      <span className={styles.lead}>{card.lead}</span>
      <span className={styles.rest}>{card.rest}</span>
    </Link>
  );
}

export default function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  // The middle column grows taller as the section scrolls up the screen.
  // Progress (0 → 1) goes into --grow, which the CSS turns into height.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches) {
        section.style.setProperty("--grow", "1");
        return;
      }
      const r = section.getBoundingClientRect();
      const H = window.innerHeight;
      // Starts when the section enters; done a little after its top reaches the top of the screen.
      const p = (H - r.top) / (H * 1.3);
      section.style.setProperty("--grow", String(Math.min(1, Math.max(0, p))));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='about-intro-heading'
    >
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.header}>
          <span className={styles.tag}>About us</span>
          <h2 id='about-intro-heading' className={`${styles.heading} h4`}>
            A 24/7 black car service built by a former chauffeur. We answer at
            every hour, arrive 15 minutes early, and charge the flat rate you
            were quoted.
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Middle column: button + the card that grows */}
          <div className={styles.middle}>
            <Link href='/about' className={styles.bar}>
              <span className={styles.barText}>Learn about us</span>
              <span className={styles.barIcon} aria-hidden='true'>
                <svg viewBox='0 0 24 24'>
                  <path d='M5 12h14M13 6l6 6-6 6' />
                </svg>
              </span>
            </Link>

            <article className={`${styles.card} ${styles.cardMiddle}`}>
              <Stat card={MIDDLE} big />
              <div className={styles.oval}>
                <Image
                  src='/images/img5.jpg'
                  alt='Mesa Midnight chauffeur waiting beside the car'
                  fill
                  sizes='(max-width: 968px) 40vw, 180px'
                  className={styles.ovalImg}
                />
              </div>
              <Copy card={MIDDLE} />
            </article>
          </div>

          <article className={`${styles.card} ${styles.cardLeft}`}>
            <Stat card={SIDE_LEFT} />
            <Copy card={SIDE_LEFT} />
          </article>

          <article className={`${styles.card} ${styles.cardRight}`}>
            <Stat card={SIDE_RIGHT} />
            <Copy card={SIDE_RIGHT} />
          </article>
        </div>
      </LayoutWrapper>
    </section>
  );
}
