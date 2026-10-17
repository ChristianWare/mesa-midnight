"use client";

import { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import { homeQuestions } from "@/lib/data";
import { SITE } from "@/config/site";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  // All closed by default; click a question to open it, again to close.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby='faq-heading'>
      <LayoutWrapper>
        <div className={styles.layout}>
          {/* ── Left: heading + "talk to dispatch" card ── */}
          <div className={styles.left}>
            <span className={styles.tag}>
              <svg
                className={styles.tagIcon}
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path
                  d='M8 0c.4 4.2 3.8 7.6 8 8-4.2.4-7.6 3.8-8 8-.4-4.2-3.8-7.6-8-8 4.2-.4 7.6-3.8 8-8Z'
                  fill='currentColor'
                />
              </svg>
              FAQ&apos;s
            </span>

            <h2 id='faq-heading' className={styles.heading}>
              Questions before you book
            </h2>

            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  <Image
                    src='/images/people/JW.jpg'
                    alt='Mesa Midnight dispatcher'
                    fill
                    sizes='64px'
                    className={styles.avatarImg}
                  />
                </div>
                <span className={styles.cardMeta}>24/7 dispatch</span>
              </div>

              <div className={styles.cardText}>
                <p className={styles.cardTitle}>Talk to a real dispatcher</p>
                <p className={styles.cardCopy}>
                  Straight answers on pricing, timing and what happens when
                  your flight runs late.
                </p>
              </div>

              <div className={styles.cardBtn}>
                <Button
                  href={`tel:${SITE.phone.tel}`}
                  text={`Call ${SITE.phone.display}`}
                  btnType='yellowBlock'
                />
              </div>
            </div>
          </div>

          {/* ── Right: questions ── */}
          <ul className={styles.list}>
            {homeQuestions.map((q, i) => {
              const isOpen = open === i;
              const id = `faq-answer-${i}`;
              return (
                <li
                  key={q.id}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <h3 className={styles.question}>
                    <button
                      type='button'
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className={styles.questionText}>{q.question}</span>
                      <span className={styles.icon} aria-hidden='true'>
                        <span className={styles.iconBar} />
                        <span
                          className={`${styles.iconBar} ${styles.iconBarV}`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    className={styles.collapse}
                    id={id}
                    role='region'
                    inert={!isOpen}
                  >
                    <div className={styles.collapseInner}>
                      <p className={styles.answer}>{q.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
