"use client";

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while on screen, never for "reduce motion".
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduced.matches) video.play().catch(() => {});
      else video.pause();
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
    <section className={styles.section} aria-labelledby='cta-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.box}>
          <video
            ref={videoRef}
            className={styles.video}
            src='/videos/heroiv.mp4'
            muted
            loop
            playsInline
            preload='metadata'
            aria-hidden='true'
          />
          <div className={styles.overlay} aria-hidden='true' />

          <div className={styles.top}>
            <span className={styles.tag}>Ready to ride</span>
            <span className={styles.mono}>Open 24/7</span>
          </div>

          <h2 id='cta-heading' className={`${styles.heading} h3`}>
            Your car is ready when you are. Get a flat rate in under a minute.
          </h2>

          <div className={styles.btn}>
            <Button href='/book' text='Book a ride' btnType='whiteMain' arrow />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
