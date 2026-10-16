"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AirportsIntro.module.css";

type Card = {
  value: string;
  unit: string;
  chip: string;
  lead: string;
  rest: string;
  href: string;
};

const SIDE_LEFT: Card = {
  value: "10",
  unit: "min",
  chip: "Mesa Gateway · AZA",
  lead: "Ten minutes from most of Mesa and Gilbert.",
  rest: " We know its one-curb pickup well, so you're in the car before the line forms.",
  href: "/airports/phoenix-mesa-gateway",
};

const MIDDLE: Card = {
  value: "60",
  unit: "min free",
  chip: "Sky Harbor · PHX",
  lead: "Curbside or inside at baggage claim, with your name on a sign.",
  rest: " Your flight is tracked from takeoff, and the first hour after landing is on us.",
  href: "/airports/phx-sky-harbor",
};

const SIDE_RIGHT: Card = {
  value: "2",
  unit: "FBOs",
  chip: "Private aviation",
  lead: "Tarmac-side pickups at Falcon Field and Scottsdale Airport.",
  rest: " Your chauffeur meets you at the aircraft and loads every bag.",
  href: "/airports/private-aviation",
};

function Stat({ card, big }: { card: Card; big?: boolean }) {
  return (
    <div className={styles.top}>
      <p className={styles.stat}>
        <span className={`${styles.value} ${big ? "h2" : "h3"}`}>
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

export default function AirportsIntro() {
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
      aria-labelledby='airports-intro-heading'
    >
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.header}>
          <span className={styles.tag}>Where we pick up</span>
          <h2 id='airports-intro-heading' className={`${styles.heading} h4`}>
            Three airports, one standard. We know every curb, gate and private
            terminal in the Valley, and we track your flight from wheels-up to
            the moment you&apos;re in the car.
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Middle column: button + the card that grows */}
          <div className={styles.middle}>
            <Link href='/book' className={styles.bar}>
              <span className={styles.barText}>Book an airport ride</span>
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
                  src='/images/skyHarbor.png'
                  alt='Phoenix Sky Harbor International Airport'
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
