import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import { SITE } from "@/config/site";
import styles from "./OurStandards.module.css";

type Standard = { name: string; meaning: string };

type Group = {
  chip: string;
  title: string;
  intro: string;
  standards: Standard[];
  figure: string;
  cta: { text: string; href: string };
  tone: "light" | "dark" | "framed";
};

const GROUPS: Group[] = [
  {
    chip: "Before",
    title: "Before you ride",
    intro: "What's already true by the time your car pulls up.",
    standards: [
      {
        name: "15 minutes early",
        meaning:
          "Your chauffeur is parked and waiting before the time you booked.",
      },
      {
        name: "Spotless cars",
        meaning: "Every vehicle is detailed before every ride.",
      },
    ],
    figure: "15 min early",
    cta: { text: "Book a ride", href: "/book" },
    tone: "light",
  },
  {
    chip: "Pricing",
    title: "When you pay",
    intro: "No meter running and nothing added at the end.",
    standards: [
      {
        name: "One price",
        meaning:
          "The quote you see is the price you pay. No surge, no late-night markup.",
      },
    ],
    figure: "$0 surge",
    cta: { text: "Get a quote", href: "/book" },
    tone: "dark",
  },
  {
    chip: "Every hour",
    title: "Around the clock",
    intro: "How we treat you from the first call to the last mile.",
    standards: [
      {
        name: "Someone answers",
        meaning: "Dispatch picks up 24/7, including holidays.",
      },
      {
        name: "Quiet by default",
        meaning:
          "Chauffeurs follow your lead: conversation if you want it, silence if you don't.",
      },
    ],
    figure: "24/7",
    cta: { text: "Call dispatch", href: `tel:${SITE.phone.tel}` },
    tone: "framed",
  },
];

export default function OurStandards() {
  return (
    <section className={styles.section} aria-labelledby='standards-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <span className={styles.tag}>Our standards</span>

        <div className={styles.header}>
          <div>
            <h2 id='standards-heading' className={styles.heading}>
              What we hold ourselves to
            </h2>
            <p className={styles.intro}>
              Five promises every chauffeur and every dispatcher works to, on
              every ride, at every hour.
            </p>
          </div>
          <span className={styles.count}>05 standards</span>
        </div>

        <ul className={styles.grid}>
          {GROUPS.map((g) => (
            <li
              key={g.title}
              className={`${styles.card} ${styles[g.tone]}`}
            >
              <div className={styles.cardInner}>
                <span className={styles.chip}>{g.chip}</span>
                <h3 className={`${styles.title} h5`}>{g.title}</h3>
                <p className={styles.cardIntro}>{g.intro}</p>

                <div className={styles.divider} aria-hidden='true' />

                <span className={styles.listLabel}>What it means:</span>
                <ul className={styles.list}>
                  {g.standards.map((s) => (
                    <li key={s.name} className={styles.item}>
                      <span className={styles.plus} aria-hidden='true'>
                        +
                      </span>
                      <span className={styles.itemText}>
                        <span className={styles.itemName}>{s.name}.</span>{" "}
                        {s.meaning}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={styles.bottom}>
                  <span className={`${styles.figure} h5`}>{g.figure}</span>
                  <Button
                    href={g.cta.href}
                    text={g.cta.text}
                    btnType={g.tone === "dark" ? "whiteMain" : "mainBlack"}
                    arrow
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
