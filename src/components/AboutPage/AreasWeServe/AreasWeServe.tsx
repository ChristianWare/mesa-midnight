import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./AreasWeServe.module.css";

const CITIES = [
  "Mesa",
  "Gilbert",
  "Chandler",
  "Queen Creek",
  "Tempe",
  "Scottsdale",
  "Phoenix",
  "Fountain Hills",
];

type Shot = { src: string; h: number };

// Two columns of photos with mixed heights. Swap in local photos any time.
const LEFT: Shot[] = [
  { src: "/images/areas/mesaii.jpg", h: 420 },
  { src: "/images/areas/gilbert.jpg", h: 220 },
  { src: "/images/areas/phoenix.jpg", h: 300 },
  { src: "/images/areas/prescott.webp", h: 260 },
];

const RIGHT: Shot[] = [
  { src: "/images/areas/scottsdale.jpg", h: 300 },
  { src: "/images/areas/sedona.jpg", h: 420 },
  { src: "/images/areas/tempe.jpg", h: 220 },
  { src: "/images/areas/tucson.webp", h: 260 },
];

/** One endlessly scrolling column. The list is drawn twice so it loops. */
function Column({
  shots,
  direction,
}: {
  shots: Shot[];
  direction: "up" | "down";
}) {
  return (
    <div className={styles.column}>
      <div
        className={`${styles.track} ${direction === "up" ? styles.up : styles.down}`}
      >
        {[0, 1].map((copy) => (
          <div className={styles.set} key={copy}>
            {shots.map((s) => (
              <div
                key={s.src}
                className={styles.shot}
                style={{ height: `${s.h}px` }}
              >
                <Image
                  src={s.src}
                  alt=''
                  fill
                  sizes='(max-width: 568px) 50vw, (max-width: 968px) 45vw, 25vw'
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AreasWeServe() {
  return (
    <section className={styles.section} aria-labelledby='areas-heading'>
      <div className={styles.grid}>
        {/* ── Left: text ── */}
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.content}>
            <div className={styles.labelCol}>
              <span className={styles.tag}>Areas we serve</span>
            </div>

            <div className={styles.main}>
              <div>
                <h2 id='areas-heading' className={`${styles.heading} h3`}>
                  From Mesa to anywhere in Arizona
                </h2>
                <p className={styles.intro}>
                  Home base is Mesa, but we pick up across the East Valley every
                  day, with long-distance rides to Tucson, Sedona and Flagstaff.
                </p>

                <ul className={styles.cities}>
                  {CITIES.map((c, i) => (
                    <li key={c} className={styles.city}>
                      <span className={styles.cityNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>

                <div className={styles.btn}>
                  <Button
                    href='/locations'
                    text='See all locations'
                    btnType='underlinedWhite'
                    arrow
                  />
                </div>
              </div>

              <p className={`${styles.year} h2`}>19~26©</p>
            </div>
          </div>
        </LayoutWrapper>

        {/* ── Right: two photo columns moving in opposite directions ── */}
        <div className={styles.gallery} aria-hidden='true'>
          <Column shots={LEFT} direction='down' />
          <Column shots={RIGHT} direction='up' />
        </div>
      </div>
    </section>
  );
}
