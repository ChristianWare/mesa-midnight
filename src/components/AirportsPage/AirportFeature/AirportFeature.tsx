"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import Moon from "@/components/shared/icons/Moon/Moon";
import type { AirportFeatureData } from "@/lib/airportFeatures";
import styles from "./AirportFeature.module.css";

/**
 * Dark text card + photo with a frosted card on top.
 * Clicking a numbered item swaps the frosted card's text.
 * `as="h1"` on an airport's own page; `h2` on the airports hub.
 */
export default function AirportFeature({
  data,
  as = "h2",
}: {
  data: AirportFeatureData;
  as?: "h1" | "h2";
}) {
  const [active, setActive] = useState(0);
  const Heading = as;
  const current = data.items[active];
  const headingId = `${data.id}-feature-heading`;
  const isPhone = data.cta.href.startsWith("tel:");

  return (
    <article
      className={`${styles.feature} ${data.reverse ? styles.reverse : ""}`}
      aria-labelledby={headingId}
    >
      {/* ── Text card ── */}
      <div className={styles.textCard}>
        <div className={styles.top}>
          <span className={styles.tag}>
            <Moon className={styles.tagIcon} />
            {data.tag}
          </span>

          <ol className={styles.items}>
            {data.items.map((item, i) => (
              <li key={item.label}>
                <button
                  type='button'
                  className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.num} aria-hidden='true'>
                    {i + 1}
                  </span>
                  <span className={styles.itemLabel}>
                    {item.label}
                    {i < data.items.length - 1 ? "," : ""}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <Heading id={headingId} className={`${styles.heading} h3`}>
            {data.heading}
          </Heading>
          <p className={styles.intro}>{data.intro}</p>
        </div>

        <div className={styles.btn}>
          <Button
            href={data.cta.href}
            text={data.cta.text}
            btnType='whiteMain'
            arrow={!isPhone}
          />
        </div>
      </div>

      {/* ── Photo + frosted card ── */}
      <div className={styles.media}>
        <Image
          src={data.image}
          alt={data.alt}
          fill
          sizes='(max-width: 968px) 100vw, 50vw'
          className={styles.image}
        />
        <div className={styles.glass} aria-live='polite'>
          <div className={styles.glassTop}>
            <span className={styles.glassTitle}>{current.title}</span>
            <Moon className={styles.glassIcon} />
          </div>
          {/* key replays the fade each time the item changes */}
          <p key={active} className={styles.glassBody}>
            {current.body}
          </p>
        </div>
      </div>
    </article>
  );
}
