"use client";

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play while on screen, and not at all for "reduce motion".
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
            { threshold: 0.1 },
          )
        : null;

    if (io) io.observe(video);
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
    <section className={styles.section} aria-labelledby='why-heading'>
      {/* Background video */}
      <video
        ref={videoRef}
        className={styles.video}
        src='/videos/mesa.mp4'
        muted
        loop
        playsInline
        preload='metadata'
        aria-hidden='true'
      />
      <div className={styles.overlay} aria-hidden='true' />

      <LayoutWrapper>
        <div className={styles.content}>
          <h2 id='why-heading' className={`${styles.heading} h3`}>
            Why choose us
          </h2>
          <p className={`${styles.copy} mediumParagrapgh`}>
            We started with one car and one rule: be early, be clean, and charge
            exactly what we quoted. Every chauffeur is full-time, licensed and
            background-checked, and every car is detailed before each ride. We
            track your flight, answer the phone at any hour, and never add surge
            pricing at 2 a.m. or on game day. From Sky Harbor to Flagstaff,
            we&apos;ve completed more than 40,000 rides since 2019, with 98% of
            pickups on time. When the trip matters, there&apos;s no reason to
            gamble on anyone else in Arizona.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
