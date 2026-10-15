"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./FleetTeaser.module.css";

type Vehicle = {
  name: string;
  seats: number;
  bags: number;
  blurb: string;
  image: string;
  href: string;
};

/**
 * Order = where each diamond ends up:
 * 01 top, 02 left, 03 right, 04 bottom.
 */
const VEHICLES: Vehicle[] = [
  {
    name: "Executive Sedan",
    seats: 3,
    bags: 3,
    blurb:
      "Mercedes E-Class or similar. Quiet and quick, made for airport runs and solo business trips.",
    image: "/images/vehicles/mercedesSedan.png",
    href: "/fleet/luxury-sedan",
  },
  {
    name: "Luxury SUV",
    seats: 6,
    bags: 6,
    blurb:
      "Cadillac Escalade or similar. Room for six people and all of their luggage.",
    image: "/images/vehicles/escalade.png",
    href: "/fleet/executive-suv",
  },
  {
    name: "Executive Sprinter",
    seats: 14,
    bags: 12,
    blurb:
      "Leather seats, standing headroom and space for the whole team's bags. Ideal for groups and crews.",
    image: "/images/vehicles/sprinter.png",
    href: "/fleet/executive-sprinter",
  },
  {
    name: "Party Bus",
    seats: 20,
    bags: 8,
    blurb:
      "Wraparound seating, lighting and sound for weddings, birthdays and big nights out.",
    image: "/images/vehicles/partyBusii.png",
    href: "/fleet",
  },
];

const pad = (n: number) => `${String(n + 1).padStart(2, "0")}.`;

/** Gap between neighbouring diamonds once they meet, in px. */
const GAP = 18;
/** Size each diamond starts at, in px. */
const START_SIZE = 100;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function FleetTeaser() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const stacked = window.matchMedia("(max-width: 768px)");
    const tablet = window.matchMedia("(max-width: 968px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;

    const update = () => {
      frame = 0;
      const cards = cardRefs.current;

      // Phones: the cards just stack with CSS, no scroll animation.
      if (stacked.matches) {
        cards.forEach((c) => c && (c.style.transform = ""));
        stage.style.removeProperty("--f");
        return;
      }

      const H = window.innerHeight;
      const W = stage.clientWidth;
      const rect = track.getBoundingClientRect();

      // Progress: starts while the stage is still sliding into view,
      // finishes a little before the pinned stretch ends so it rests.
      const startTop = H * 0.55;
      const endTop = -(rect.height - H) * 0.8;
      const p = reduced.matches
        ? 1
        : clamp((startTop - rect.top) / (startTop - endTop));
      const t = easeInOut(p);

      // Final size: 500 (320 on tablets), smaller if the screen is too short
      // to fit all four diamonds plus the CTA bar.
      const maxF = tablet.matches ? 320 : 500;
      const ctaRoom = 130;
      const fitH = (H - ctaRoom * 2 - GAP * Math.SQRT2) / 2;
      const fitW = (W - 32 - GAP * Math.SQRT2) / 2;
      const F = Math.max(160, Math.min(maxF, fitH, fitW));
      stage.style.setProperty("--f", `${F}px`);

      const scale = lerp(START_SIZE / F, 1, t);
      const o = F / 2 + GAP / Math.SQRT2; // centre offset when they meet

      const from: [number, number][] = [
        [0, -H / 2 - 50], // top: starts up by the heading
        [-W * 0.33, 0], // left
        [W * 0.33, 0], // right
        [0, H / 2 - 70], // bottom
      ];
      const to: [number, number][] = [
        [0, -o],
        [-o, 0],
        [o, 0],
        [0, o],
      ];

      cards.forEach((c, i) => {
        if (!c) return;
        const x = lerp(from[i][0], to[i][0], t);
        const y = lerp(from[i][1], to[i][1], t);
        c.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    stacked.addEventListener("change", request);
    tablet.addEventListener("change", request);
    reduced.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      stacked.removeEventListener("change", request);
      tablet.removeEventListener("change", request);
      reduced.removeEventListener("change", request);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby='fleet-heading'>
      <LayoutWrapper>
        <div className={styles.header}>
          <span className={styles.tag}>Our fleet</span>
          <h2 id='fleet-heading' className={`${styles.heading} h4`}>
            Black, clean, and quiet. Every vehicle is late-model, detailed
            before each ride, and stocked with water, chargers and Wi-Fi.
          </h2>
        </div>
      </LayoutWrapper>

      <div className={styles.track} ref={trackRef}>
        <div className={styles.stage} ref={stageRef}>
          <span className={styles.vLine} aria-hidden='true' />
          <span className={styles.hLine} aria-hidden='true' />
          <span className={styles.plus} aria-hidden='true'>
            +
          </span>

          <ul className={styles.cards}>
            {VEHICLES.map((v, i) => (
              <li
                key={v.name}
                className={styles.card}
                style={{ "--i": i } as CSSProperties}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <Link href={v.href} className={styles.shape}>
                  <span className={styles.content}>
                    <span className={styles.num}>{pad(i)}</span>

                    {/* Default face: photo + name */}
                    <span className={styles.face}>
                      <span className={styles.imageWrap}>
                        <Image
                          src={v.image}
                          alt=''
                          fill
                          sizes='(max-width: 768px) 200px, 260px'
                          className={styles.image}
                        />
                      </span>
                      <span className={styles.name}>{v.name}</span>
                    </span>

                    {/* Hover face: short description */}
                    <span className={styles.details}>
                      <span className={styles.detailsName}>{v.name}</span>
                      <span className={styles.blurb}>{v.blurb}</span>
                      <span className={styles.specs}>
                        {v.seats} seats&nbsp;&nbsp;·&nbsp;&nbsp;{v.bags} bags
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ── CTA bar ── */}
          <div className={styles.ctaWrap}>
            <div className={styles.cta}>
              <div className={styles.ctaLeft}>
                <div className={styles.thumbs} aria-hidden='true'>
                  {VEHICLES.map((v) => (
                    <span key={v.name} className={styles.thumb}>
                      <Image
                        src={v.image}
                        alt=''
                        fill
                        sizes='48px'
                        className={styles.thumbImg}
                      />
                    </span>
                  ))}
                </div>
                <div className={styles.ctaText}>
                  <span className={styles.ctaTitle}>
                    Not sure which car?
                  </span>
                  <span className={styles.ctaSub}>
                    Tell us your group and we&apos;ll match the car.
                  </span>
                </div>
              </div>
              <div className={styles.ctaBtn}>
                <Button
                  href='/fleet'
                  text='See the fleet'
                  btnType='whiteBlock'
                  arrow
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
