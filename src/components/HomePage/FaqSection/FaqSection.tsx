"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import { homeQuestions } from "@/lib/data";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  // First answer open by default; click again to close it.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby='faq-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.layout}>
          <div className={styles.labelCol}>
            <span className={styles.tag}>FAQ&apos;s</span>
          </div>

          <div className={styles.main}>
            <div className={styles.header}>
              <h2 id='faq-heading' className={styles.heading}>
                Questions before you book
              </h2>
              <div className={styles.headerRight}>
                <p className={styles.intro}>
                  Straight answers on pricing, timing and what happens when
                  your flight runs late.
                </p>
                <div className={styles.headerBtn}>
                  <Button
                    href='/contact'
                    text='Need help?'
                    btnType='underlinedBlack'
                    arrow
                  />
                </div>
              </div>
            </div>

            <ul className={styles.list}>
              {homeQuestions.map((q, i) => {
                const isOpen = open === i;
                const id = `faq-answer-${i}`;
                return (
                  <li
                    key={q.id}
                    className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                  >
                    <h3 className={`${styles.question} h6`}>
                      <button
                        type='button'
                        className={styles.trigger}
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span className={styles.icon} aria-hidden='true'>
                          <span className={styles.iconBar} />
                          <span
                            className={`${styles.iconBar} ${styles.iconBarV}`}
                          />
                        </span>
                        <span className={styles.questionText}>
                          {q.question}
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
        </div>
      </LayoutWrapper>
    </section>
  );
}
