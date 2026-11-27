"use client";

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./Promises.module.css";

type PromiseItem = {
  label: string;
  value: string;
  badge: string;
  shape: "ribbon" | "rosette";
  title: string;
  chip: string;
  body: string;
};

// The service standards every ride is held to.
const PROMISES: PromiseItem[] = [
  {
    label: "Arrival standard",
    value: "No. 01",
    badge: "15",
    shape: "ribbon",
    title: "Early, every time",
    chip: "Promise",
    body: "Your chauffeur is parked and waiting 15 minutes before pickup, and texts when they arrive.",
  },
  {
    label: "Price lock",
    value: "No. 02",
    badge: "$",
    shape: "rosette",
    title: "Flat-rate pricing",
    chip: "No surge",
    body: "The price you're quoted is the price you pay. Same rate at 2 a.m., on holidays and on game day.",
  },
  {
    label: "Airport grace",
    value: "No. 03",
    badge: "60",
    shape: "rosette",
    title: "Free wait time",
    chip: "Flights",
    body: "We track your flight and give you 60 free minutes after landing, delays included.",
  },
  {
    label: "Always on",
    value: "No. 04",
    badge: "24/7",
    shape: "ribbon",
    title: "Live dispatch",
    chip: "24/7",
    body: "A real person answers the phone day or night, weekends and holidays included.",
  },
];

// Scalloped seal outline, worked out once (same on server and client).
const ROSETTE = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 === 0 ? 30 : 26.5;
  const a = (i / 32) * Math.PI * 2 - Math.PI / 2;
  return `${(32 + r * Math.cos(a)).toFixed(2)},${(32 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

function Badge({ shape, text }: { shape: PromiseItem["shape"]; text: string }) {
  return (
    <span className={styles.badge} aria-hidden='true'>
      {shape === "ribbon" ? (
        <svg viewBox='0 0 48 64' className={styles.ribbon}>
          <path d='M0 0H48V64L24 52L0 64Z' fill='currentColor' />
        </svg>
      ) : (
        <svg viewBox='0 0 64 64' className={styles.rosette}>
          <polygon
            points={ROSETTE}
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinejoin='round'
          />
        </svg>
      )}
      <span
        className={`${styles.badgeText} ${shape === "ribbon" ? styles.badgeTextRibbon : ""}`}
      >
        {text}
      </span>
    </span>
  );
}

// Progress points of the pinned stretch (0 → 1):
// the title lines leave first, then the cards come in, then a short hold.
const TEXT_END = 0.42;
const CARDS_START = 0.42;
const CARDS_END = 0.94;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function Promises() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  // Desktop: the section pins to the screen with the big title in the
  // middle. Scrolling slides the top line off to the left and the bottom
  // line off to the right, then the cards slide in from the right. Once
  // they're in, the pin lets go and the page scrolls on.
  //   --text:  0 → 1, the title lines leaving
  //   --cards: 0 → 1, the cards arriving
  //   --outTop / --outBottom: how far each line travels to clear the screen
  useEffect(() => {
    const section = sectionRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!section || !top || !bottom) return;
    const wide = window.matchMedia("(min-width: 969px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!wide.matches || reduced.matches) {
        section.style.setProperty("--text", "0");
        section.style.setProperty("--cards", "1");
        return;
      }
      const W = document.documentElement.clientWidth;
      // The lines' wrappers don't move, so these are their resting spots.
      const t = top.getBoundingClientRect();
      const b = bottom.getBoundingClientRect();
      section.style.setProperty("--outTop", `${Math.ceil(t.right + 40)}px`);
      section.style.setProperty(
        "--outBottom",
        `${Math.ceil(W - b.left + 40)}px`,
      );

      const r = section.getBoundingClientRect();
      const run = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = clamp01(-r.top / run);
      section.style.setProperty("--text", String(clamp01(p / TEXT_END)));
      section.style.setProperty(
        "--cards",
        String(clamp01((p - CARDS_START) / (CARDS_END - CARDS_START))),
      );
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    wide.addEventListener("change", request);
    reduced.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      wide.removeEventListener("change", request);
      reduced.removeEventListener("change", request);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='promises-heading'
    >
      <div className={styles.stage}>
        {/* Big two-line title, in the middle of the screen */}
        <div className={styles.titleLayer}>
          <LayoutWrapper paddingNone='paddingNone'>
            <h2 id='promises-heading' className={styles.bigTitle}>
              <span ref={topRef} className={`${styles.line} ${styles.lineTop}`}>
                <span className={styles.count} aria-hidden='true'>
                  ({String(PROMISES.length).padStart(2, "0")})
                </span>
                <span className={`${styles.lineInner} ${styles.innerTop}`}>
                  Promises +
                </span>
              </span>{" "}
              <span
                ref={bottomRef}
                className={`${styles.line} ${styles.lineBottom}`}
              >
                <span className={`${styles.lineInner} ${styles.innerBottom}`}>
                  Standards
                </span>
              </span>
            </h2>
          </LayoutWrapper>
        </div>

        {/* The cards: they slide in from the right after the title leaves */}
        <div className={styles.cardsLayer}>
          <LayoutWrapper paddingNone='paddingNone'>
            <ul className={styles.grid}>
              {PROMISES.map((p) => (
                <li key={p.title} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.mono}>{p.label}</span>
                    <span className={styles.mono}>{p.value}</span>
                  </div>

                  <div className={styles.panel}>
                    <div className={styles.badgeArea}>
                      <Badge shape={p.shape} text={p.badge} />
                    </div>
                    <div className={styles.titleRow}>
                      <h3 className={styles.title}>{p.title}</h3>
                      <span className={styles.chip}>{p.chip}</span>
                    </div>
                    <p className={styles.body}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </LayoutWrapper>
        </div>

        {/* Note and button, along the bottom the whole time */}
        <div className={styles.bottomLayer}>
          <LayoutWrapper paddingNone='paddingNone'>
            <div className={styles.bottom}>
              <p className={styles.note}>
                Standards we hold every ride to, whether it&apos;s a 4 a.m.
                airport run or a wedding for eighty.
              </p>
              <Button
                href='/contact'
                text='Questions? Call us'
                btnType='underlinedWhite'
                arrow
              />
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </section>
  );
}
