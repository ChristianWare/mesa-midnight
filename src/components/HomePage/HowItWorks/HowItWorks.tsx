"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./HowItWorks.module.css";

type Step = {
  title: string;
  body: string;
  tags: string[];
  cta: { label: string; href: string };
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
    tags: ["Instant quote", "All-in price", "No surge pricing"],
    cta: { label: "Get a quote", href: "/book" },
    image: "/images/img3.webp",
    alt: "Black Mesa Midnight SUV in a white studio",
  },
  {
    title: "Book and relax",
    body: "Pay online or save a card. You get a confirmation with your chauffeur's name the day before.",
    tags: ["Pay online", "Saved cards", "Chauffeur named"],
    cta: { label: "Book a ride", href: "/book" },
    image: "/images/img2.png",
    alt: "Black Mesa Midnight SUV driving a desert highway",
  },
  {
    title: "Ride",
    body: "Your chauffeur arrives 15 minutes early and texts when they're outside. Track the car live.",
    tags: ["15 min early", "Text on arrival", "Live tracking"],
    cta: { label: "Meet the fleet", href: "/fleet" },
    image: "/images/img1.png",
    alt: "Black Mesa Midnight SUV parked in the desert at sunrise",
  },
  {
    title: "Ride again",
    body: "Your addresses, trips and receipts stay in your account, so the next booking takes seconds.",
    tags: ["Saved addresses", "Trip history", "Receipts & invoices"],
    cta: { label: "Create an account", href: "/register" },
    image: "/images/img2.png",
    alt: "Black Mesa Midnight SUV on the open road",
    focus: "70% 50%",
  },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

// useLayoutEffect warns on the server; this is the usual safe swap.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [mediaY, setMediaY] = useState(0);

  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  /**
   * Where the desktop photo should sit: level with the top of the open step.
   * Worked out from each step's closed height (its full height minus whatever
   * is currently expanding or collapsing), so the photo heads straight to its
   * final spot instead of chasing the accordion animation.
   */
  const measure = useCallback((index: number) => {
    const list = listRef.current;
    if (!list) return;
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
    let y = 0;
    for (let i = 0; i < index; i++) {
      const li = itemRefs.current[i];
      if (!li) continue;
      let open = 0;
      li.querySelectorAll<HTMLElement>("[data-collapse]").forEach((c) => {
        open += c.offsetHeight;
      });
      y += li.offsetHeight - open + gap;
    }
    setMediaY(y);
  }, []);

  useIsoLayoutEffect(() => {
    measure(active);
  }, [active, measure]);

  // Re-measure when the layout changes size (fonts loading, resizing).
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure(active));
    ro.observe(list);
    return () => ro.disconnect();
  }, [active, measure]);

  const current = STEPS[active];

  return (
    <section className={styles.section} aria-labelledby='how-heading'>
      <LayoutWrapper>
        <div className={styles.layout}>
          <div className={styles.labelCol}>
            <span className={styles.tag}>How it works</span>
          </div>

          <div className={styles.main}>
            {/* ── Heading row ── */}
            <div className={styles.header}>
              <h2 id='how-heading' className={styles.heading}>
                Booked in a minute. Remembered for years.
              </h2>
              <div className={styles.headerRight}>
                <p className={styles.intro}>
                  Four steps from quote to curb. The price you see first is the
                  price you pay.
                </p>
                <div className={styles.headerBtn}>
                  <Button
                    href='/book'
                    text='Book a ride'
                    btnType='underlinedWhite'
                    arrow
                  />
                </div>
              </div>
            </div>

            {/* ── Photo + steps ── */}
            <div className={styles.body}>
              {/* Desktop photo: follows the open step */}
              <div className={styles.mediaCol} aria-hidden='true'>
                <div
                  className={styles.media}
                  style={{ transform: `translate3d(0, ${mediaY}px, 0)` }}
                >
                  <span className={styles.mediaLabel}>
                    {pad(active)}&nbsp;&nbsp;{current.title}
                  </span>
                  <div className={styles.mediaFrame}>
                    {STEPS.map((s, i) => (
                      <Image
                        key={i}
                        src={s.image}
                        alt=''
                        fill
                        sizes='(max-width: 968px) 1px, 340px'
                        className={`${styles.mediaImg} ${i === active ? styles.mediaImgActive : ""}`}
                        style={{ objectPosition: s.focus ?? "center" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <ol className={styles.list} ref={listRef}>
                {STEPS.map((s, i) => {
                  const isOpen = i === active;
                  const panelId = `how-step-${i}`;
                  return (
                    <li
                      key={s.title}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                    >
                      <div className={styles.box}>
                        <div className={styles.card}>
                          <h3 className={styles.titleWrap}>
                            <button
                              type='button'
                              className={styles.trigger}
                              aria-expanded={isOpen}
                              aria-controls={panelId}
                              onClick={() => setActive(i)}
                            >
                              <span className={styles.srOnly}>
                                Step {i + 1}:{" "}
                              </span>
                              <span className={styles.title}>{s.title}</span>
                            </button>
                          </h3>

                          <div
                            className={styles.collapse}
                            data-collapse
                            id={panelId}
                            inert={!isOpen}
                          >
                            <div className={styles.collapseInner}>
                              <p className={styles.text}>{s.body}</p>
                              <ul className={styles.tags}>
                                {s.tags.map((t) => (
                                  <li key={t} className={styles.chip}>
                                    # {t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div
                          className={styles.collapse}
                          data-collapse
                          inert={!isOpen}
                        >
                          <div className={styles.collapseInner}>
                            <Link href={s.cta.href} className={styles.cta}>
                              <span className={styles.ctaText}>
                                {s.cta.label}
                              </span>
                              <svg
                                className={styles.ctaIcon}
                                viewBox='0 0 24 24'
                                width='18'
                                height='18'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='1.6'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                              >
                                <path d='M5 12h14M13 6l6 6-6 6' />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Phone / tablet photo: opens under the step */}
                      <div
                        className={`${styles.collapse} ${styles.mobileMedia}`}
                        data-collapse
                        aria-hidden='true'
                      >
                        <div className={styles.collapseInner}>
                          <div className={styles.mobileFrame}>
                            <Image
                              src={s.image}
                              alt={s.alt}
                              fill
                              sizes='(max-width: 968px) 100vw, 1px'
                              className={styles.mobileImg}
                              style={{ objectPosition: s.focus ?? "center" }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
