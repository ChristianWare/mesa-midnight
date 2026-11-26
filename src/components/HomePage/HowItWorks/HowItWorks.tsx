"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./HowItWorks.module.css";

type IconName = "quote" | "book" | "ride" | "again";

type Step = {
  title: string;
  body: string;
  icon: IconName;
  image: string;
  alt: string;
  /** object-position, so the same photo can be framed differently */
  focus?: string;
};

// Photos are the SUV shots for now; swap in step-specific images later.
const STEPS: Step[] = [
  {
    title: "Get your flat rate",
    body: "Enter pickup, drop-off and time. You see the full price up front.",
    icon: "quote",
    image: "/images/img3.webp",
    alt: "Black Mesa Midnight SUV in a white studio",
  },
  {
    title: "Book and relax",
    body: "Pay online or save a card. You get a confirmation with your chauffeur's name the day before.",
    icon: "book",
    image: "/images/img2.png",
    alt: "Black Mesa Midnight SUV driving a desert highway",
  },
  {
    title: "Ride",
    body: "Your chauffeur arrives 15 minutes early and texts when they're outside. Track the car live.",
    icon: "ride",
    image: "/images/img1.png",
    alt: "Black Mesa Midnight SUV parked in the desert at sunrise",
  },
  {
    title: "Ride again",
    body: "Your addresses, trips and receipts stay in your account, so the next booking takes seconds.",
    icon: "again",
    image: "/images/img2.png",
    alt: "Black Mesa Midnight SUV on the open road",
    focus: "70% 50%",
  },
];

const COLUMNS = 8;
const pad = (n: number) => String(n).padStart(2, "0");

/** Outline icons with a yellow accent, like the reference. */
function StepIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: styles.icon,
  };
  if (name === "quote")
    return (
      <svg {...common}>
        <path
          d='M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1l8 8a1.4 1.4 0 0 1 0 2l-7.1 7.1a1.4 1.4 0 0 1-2 0z'
          fill='var(--yellow)'
        />
        <circle cx='8' cy='8' r='1.6' fill='var(--white)' />
      </svg>
    );
  if (name === "book")
    return (
      <svg {...common}>
        <rect x='3.5' y='5' width='17' height='15' rx='2' />
        <path
          d='M3.5 9.5h17v-2.5a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2z'
          fill='var(--yellow)'
        />
        <path d='M8 3v4M16 3v4M9 14.5l2 2 4-4' />
      </svg>
    );
  if (name === "again")
    return (
      <svg {...common}>
        <circle cx='12' cy='12' r='5' fill='var(--yellow)' />
        <path d='M20 12a8 8 0 0 1-14.2 5.1M4 12a8 8 0 0 1 14.2-5.1' />
        <path d='M18.6 3.4v3.8h-3.8M5.4 20.6v-3.8h3.8' />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx='12' cy='12' r='8.5' />
      <circle cx='12' cy='12' r='2.6' fill='var(--yellow)' />
      <path d='M3.8 10.5c2.6-1 5.3-1.5 8.2-1.5s5.6.5 8.2 1.5M10.2 14.2 7 19.6M13.8 14.2l3.2 5.4' />
    </svg>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLOListElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  // Desktop: four cards in three rows: one on top, two side by side in
  // the middle, one at the bottom. The section pins in the middle of the
  // screen; while it's pinned, scrolling slides the top card to the left
  // edge and the bottom card to the right edge. The middle two stay put. Then the pin lets
  // go and the next section scrolls up as normal.
  //   --slide: progress, 0 → 1
  //   --shift: how far the outer cards travel (from the centre to the edge)
  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const cards = cardsRef.current;
    const space = spaceRef.current;
    if (!section || !sticky || !cards || !space) return;
    const wide = window.matchMedia("(min-width: 969px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const card = cards.firstElementChild as HTMLElement | null;
      if (!card) return;

      if (!wide.matches) {
        sticky.style.top = "";
        section.style.setProperty("--slide", "0");
        return;
      }

      // Pin with the content centred. If it's taller than the screen, pin
      // it by its bottom edge so the cards are never cut off.
      const H = window.innerHeight;
      const h = sticky.offsetHeight;
      const top = Math.min((H - h) / 2, H - h);
      sticky.style.top = `${top}px`;

      const shift = Math.max(0, (cards.clientWidth - card.offsetWidth) / 2);
      section.style.setProperty("--shift", `${shift}px`);

      if (reduced.matches) {
        section.style.setProperty("--slide", "1");
        return;
      }
      // How far we've scrolled since the pin started, over the pinned stretch.
      const passed = top - section.getBoundingClientRect().top;
      const p = passed / Math.max(1, space.offsetHeight);
      section.style.setProperty("--slide", String(Math.min(1, Math.max(0, p))));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    wide.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      wide.removeEventListener("change", request);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='how-heading'
    >
      <div ref={stickyRef} className={styles.sticky}>
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.inner}>
            {/* Faint column lines behind everything, numbered at the bottom */}
            <div className={styles.guides} aria-hidden='true'>
              {Array.from({ length: COLUMNS }, (_, i) => (
                <span key={i} className={styles.guide} />
              ))}
            </div>

            <div className={styles.header}>
              <span className={styles.tag}>How it works</span>
              <h2 id='how-heading' className={styles.heading}>
                Booked in a Minute. Remembered for Years.
              </h2>
              <p className={styles.intro}>
                Four steps from quote to curb. The price you see first is the
                price you pay.
              </p>
            </div>

            <ol ref={cardsRef} className={styles.cards}>
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={`${styles.card} ${i === 0 ? styles.cardFirst : ""} ${i === STEPS.length - 1 ? styles.cardLast : ""}`}
                >
                  <div className={styles.cardText}>
                    <StepIcon name={s.icon} />
                    <div className={styles.cardCopy}>
                      <h3 className={`${styles.cardTitle} h6`}>
                        <span className={styles.srOnly}>Step {i + 1}: </span>
                        {s.title}
                      </h3>
                      <p className={styles.cardBody}>{s.body}</p>
                    </div>
                  </div>
                  <div className={styles.cardMedia}>
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes='(max-width: 568px) 100vw, (max-width: 968px) 200px, 280px'
                      className={styles.cardImg}
                      style={{ objectPosition: s.focus ?? "center" }}
                    />
                    <span className={styles.num} aria-hidden='true'>
                      {pad(i + 1)}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <ol className={styles.labels} aria-hidden='true'>
              {Array.from({ length: COLUMNS }, (_, i) => (
                <li key={i} className={styles.label}>
                  {pad(i + 1)}
                </li>
              ))}
            </ol>
          </div>
        </LayoutWrapper>
      </div>

      {/* The scroll it stays pinned for (desktop only) */}
      <div ref={spaceRef} className={styles.pinSpace} aria-hidden='true' />
    </section>
  );
}
