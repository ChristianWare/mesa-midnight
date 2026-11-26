"use client";

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./WhyChooseUs.module.css";

// The proof points under the copy: a label and a short badge, like the
// "Red Rock Canyon · 30 min" chips on the reference.
const PROOF = [
  { label: "Arrive early", badge: "15 min" },
  { label: "Phone answered", badge: "24/7" },
  { label: "Flights tracked", badge: "Every ride" },
  { label: "Surge pricing", badge: "Never" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play while the section is on screen, and not at all for
  // "reduce motion". We watch the section, not the video: the video is
  // position: fixed, so it always counts as on screen.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduced.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              sync();
            },
            { threshold: 0 },
          )
        : null;

    if (io) io.observe(section);
    else {
      onScreen = true;
      sync();
    }

    reduced.addEventListener("change", sync);
    return () => {
      io?.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='why-heading'
    >
      {/* Background video: fixed to the screen, seen through the section */}
      <video
        ref={videoRef}
        className={styles.video}
        src='/videos/mesaii.mp4'
        muted
        loop
        playsInline
        preload='metadata'
        aria-hidden='true'
      />
      <div className={styles.overlay} aria-hidden='true' />

      <LayoutWrapper>
        <div className={styles.content}>
          <p className={styles.tag}>
            <span className={styles.tagDot} aria-hidden='true' />
            Why Mesa Midnight
          </p>
          <h2 id='why-heading' className={`${styles.heading} h2`}>
            Why Choose Us for Your Transportation Needs?
          </h2>
          <p className={`${styles.copy} mediumParagrapgh`}>
            Every chauffeur is full-time, licensed and background-checked, and
            every car is detailed before each ride. We track your flight, answer
            the phone at any hour, and never add surge pricing at 2 a.m. or on
            game day.
          </p>
          <ul className={styles.proof}>
            {PROOF.map((p) => (
              <li key={p.label} className={styles.chip}>
                <span className={styles.chipLabel}>{p.label}</span>
                <span className={styles.chipBadge}>{p.badge}</span>
              </li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Button href='/book' text='Book a ride' btnType='whiteMain' arrow />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
