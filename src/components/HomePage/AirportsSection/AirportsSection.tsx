"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import CornerArrow from "@/components/shared/icons/CornerArrow/CornerArrow";
import styles from "./AirportsSection.module.css";

type Airport = {
  name: string;
  code: string;
  sub: string;
  blurb: string;
  href: string;
  image: string;
  alt: string;
};

// Photos are fleet shots for now; swap in airport photos when you have them.
const AIRPORTS: Airport[] = [
  {
    name: "Phoenix Sky Harbor",
    code: "PHX",
    sub: "About 25 min from Mesa",
    blurb: "Curbside or inside at baggage claim, with your name on a sign.",
    href: "/airports/phx-sky-harbor",
    image: "/images/skyHarbor.png",
    alt: "Black Cadillac Escalade waiting on a wet road",
  },
  {
    name: "Phoenix-Mesa Gateway",
    code: "AZA",
    sub: "About 10 min from Mesa",
    blurb:
      "Ten minutes from most of Mesa and Gilbert. We know its one-curb pickup well.",
    href: "/airports/phoenix-mesa-gateway",
    image: "/images/mesaGateway.webp",
    alt: "Black SUV driving a desert highway",
  },
  {
    name: "Private Aviation",
    code: "FFZ · SDL",
    sub: "Falcon Field & Scottsdale",
    blurb: "Tarmac-side pickups at Falcon Field and Scottsdale Airport.",
    href: "/airports/private-aviation",
    image: "/images/scottsdaleAirport.jpg",
    alt: "Black Cadillac Escalade parked outside a stone house",
  },
  {
    name: "Tucson International",
    code: "TUS",
    sub: "About 1 hr 45 min",
    blurb:
      "Flat-rate rides between Tucson and the East Valley, with your flight tracked the whole way.",
    href: "/airports",
    image: "/images/tucsonAirport.jpeg",
    alt: "Black Chevrolet Suburban parked on an open lot",
  },
  {
    name: "Prescott Regional",
    code: "PRC",
    sub: "About 2 hr",
    blurb:
      "Door-to-door rides up to Prescott, with room in the back for every bag.",
    href: "/airports",
    image: "/images/prescottAirport.jpg",
    alt: "Black SUV parked in the desert at sunrise",
  },
  {
    name: "Flagstaff Pulliam",
    code: "FLG",
    sub: "About 2 hr 15 min",
    blurb:
      "Long-distance transfers to northern Arizona. Stop for food or a stretch whenever you like.",
    href: "/airports",
    image: "/images/flagstaffAirport.jpg",
    alt: "Black Chevrolet Suburban on a grassy roadside",
  },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function AirportsSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!outer || !stage || !track) return;

    const grid = window.matchMedia("(max-width: 768px)");
    const tablet = window.matchMedia("(max-width: 968px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let distance = 0;
    let stickyTop = 0;

    const reset = () => {
      outer.style.height = "";
      stage.style.top = "";
      track.style.transform = "";
      cardRefs.current.forEach((c) => c && (c.style.transform = ""));
    };

    // Sizes only change on resize, so work them out separately.
    const layout = () => {
      if (grid.matches || reduced.matches) {
        reset();
        return;
      }
      const H = window.innerHeight;
      const stageH = stage.offsetHeight;
      // Pin the section so its bottom edge sits on the bottom of the screen
      // (or its top on the top, when it's shorter than the screen).
      stickyTop = Math.min(0, H - stageH);
      stage.style.top = `${stickyTop}px`;
      // One stretch of scrolling per card that slides in.
      distance = (AIRPORTS.length - 1) * Math.max(320, H * 0.5);
      outer.style.height = `${stageH + distance}px`;
    };

    const update = () => {
      frame = 0;
      if (grid.matches || reduced.matches) return;

      const cards = cardRefs.current;
      const first = cards[0];
      if (!first) return;

      const rect = outer.getBoundingClientRect();
      const p = clamp((stickyTop - rect.top) / distance);

      const steps = AIRPORTS.length - 1;
      const visible = tablet.matches ? 3 : 4;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = first.offsetWidth + gap;
      const photo = first.querySelector<HTMLElement>("[data-photo]");
      const drop = photo ? photo.offsetHeight : 0;

      // Track glides left the whole time...
      const shift = p * (AIRPORTS.length - visible) * step;
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;

      // ...while each card drops down from the top, one after another.
      for (let i = 1; i < cards.length; i++) {
        const c = cards[i];
        if (!c) continue;
        const local = clamp(p * steps - (i - 1));
        c.style.transform = `translate3d(0, ${-(1 - local) * drop}px, 0)`;
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      request();
    };

    layout();
    update();

    // Fonts and images can change the stage height after first paint.
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onResize)
        : null;
    ro?.observe(stage);

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", onResize);
    grid.addEventListener("change", onResize);
    tablet.addEventListener("change", onResize);
    reduced.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      ro?.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", onResize);
      grid.removeEventListener("change", onResize);
      tablet.removeEventListener("change", onResize);
      reduced.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby='airports-heading'>
      <div className={styles.outer} ref={outerRef}>
        <div className={styles.stage} ref={stageRef}>
          <LayoutWrapper paddingNone='paddingNone'>
            <div className={styles.layout}>
              <div className={styles.labelCol}>
                <span className={styles.tag}>Airports</span>
              </div>

              <div className={styles.header}>
                <h2 id='airports-heading' className={styles.heading}>
                  Both East Valley Airports, Covered.
                </h2>
                <div className={styles.headerRight}>
                  <p className={styles.intro}>
                    We track every flight and move your pickup to match, so a
                    delay never costs you extra.
                  </p>
                  <div className={styles.headerBtn}>
                    <Button
                      href='/airports'
                      text='All airports'
                      btnType='underlinedBlack'
                      arrow
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.labels} aria-hidden='true'>
              <span className={styles.label}>#6 airports</span>
              <span className={styles.label}>#Flight tracking</span>
              <span className={styles.label}>#60 min free wait</span>
            </div>
          </LayoutWrapper>

          {/* ── Cards ── */}
          <div className={styles.row}>
            <ul className={styles.track} ref={trackRef}>
              {AIRPORTS.map((a, i) => (
                <li
                  key={a.code}
                  className={styles.card}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <Link href={a.href} className={styles.cardLink}>
                    <span className={styles.photo} data-photo>
                      <Image
                        src={a.image}
                        alt={a.alt}
                        fill
                        sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 968px) 34vw, 26vw'
                        className={styles.image}
                      />
                      <span className={styles.code}>{a.code}</span>
                      {/* <span className={styles.blurb}>{a.blurb}</span> */}
                    </span>

                    <span className={styles.info}>
                      <span className={styles.infoText}>
                        <span className={styles.name}>{a.name}</span>
                        <span className={styles.sub}>{a.sub}</span>
                      </span>
                      <span className={styles.round} aria-hidden='true'>
                        <CornerArrow className={styles.roundIcon} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
