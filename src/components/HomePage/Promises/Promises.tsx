import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./Promises.module.css";

type PromiseItem = {
  label: string;
  value: string;
  badge: string;
  shape: "ribbon" | "rosette";
  title: string;
  chip: string;
  body: string;
};

// The service standards every ride is held to.
const PROMISES: PromiseItem[] = [
  {
    label: "Arrival standard",
    value: "No. 01",
    badge: "15",
    shape: "ribbon",
    title: "Early, every time",
    chip: "Promise",
    body: "Your chauffeur is parked and waiting 15 minutes before pickup, and texts when they arrive.",
  },
  {
    label: "Price lock",
    value: "No. 02",
    badge: "$",
    shape: "rosette",
    title: "Flat-rate pricing",
    chip: "No surge",
    body: "The price you're quoted is the price you pay. Same rate at 2 a.m., on holidays and on game day.",
  },
  {
    label: "Airport grace",
    value: "No. 03",
    badge: "60",
    shape: "rosette",
    title: "Free wait time",
    chip: "Flights",
    body: "We track your flight and give you 60 free minutes after landing, delays included.",
  },
  {
    label: "Always on",
    value: "No. 04",
    badge: "24/7",
    shape: "ribbon",
    title: "Live dispatch",
    chip: "24/7",
    body: "A real person answers the phone day or night, weekends and holidays included.",
  },
];

// Scalloped seal outline, worked out once (same on server and client).
const ROSETTE = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 === 0 ? 30 : 26.5;
  const a = (i / 32) * Math.PI * 2 - Math.PI / 2;
  return `${(32 + r * Math.cos(a)).toFixed(2)},${(32 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

function Badge({ shape, text }: { shape: PromiseItem["shape"]; text: string }) {
  return (
    <span className={styles.badge} aria-hidden='true'>
      {shape === "ribbon" ? (
        <svg viewBox='0 0 48 64' className={styles.ribbon}>
          <path d='M0 0H48V64L24 52L0 64Z' fill='currentColor' />
        </svg>
      ) : (
        <svg viewBox='0 0 64 64' className={styles.rosette}>
          <polygon
            points={ROSETTE}
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinejoin='round'
          />
        </svg>
      )}
      <span
        className={`${styles.badgeText} ${shape === "ribbon" ? styles.badgeTextRibbon : ""}`}
      >
        {text}
      </span>
    </span>
  );
}

export default function Promises() {
  return (
    <section className={styles.section} aria-labelledby='promises-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <h2 id='promises-heading' className={styles.tag}>
          Our promises
        </h2>

        <ul className={styles.grid}>
          {PROMISES.map((p) => (
            <li key={p.title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.mono}>{p.label}</span>
                <span className={styles.mono}>{p.value}</span>
              </div>

              <div className={styles.panel}>
                <div className={styles.badgeArea}>
                  <Badge shape={p.shape} text={p.badge} />
                </div>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <span className={styles.chip}>{p.chip}</span>
                </div>
                <p className={styles.body}>{p.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.bottom}>
          <p className={styles.note}>
            Standards we hold every ride to, whether it&apos;s a 4 a.m. airport
            run or a wedding for eighty.
          </p>
          <Button
            href='/contact'
            text='Questions? Call us'
            btnType='underlinedWhite'
            arrow
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
