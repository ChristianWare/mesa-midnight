import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import type { ServiceDetail as Data } from "@/lib/serviceDetails";
import styles from "./ServiceDetail.module.css";

/** Hero + sticky summary card + overview, approach, steps and gallery. */
export default function ServiceDetail({ data }: { data: Data }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby='service-heading'>
        <Nav variant='dark' />
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.tag}>Service details</span>
              <h1 id='service-heading' className={styles.heading}>
                {data.title}
              </h1>
              <p className={styles.intro}>{data.intro}</p>
            </div>
            <p className={`${styles.year} h1`} aria-hidden='true'>
              19~26©
            </p>
          </div>

          <div className={styles.heroImage}>
            <Image
              src={data.heroImage}
              alt={data.heroAlt}
              fill
              priority
              sizes='100vw'
              className={styles.image}
            />
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Details ── */}
      <section className={styles.details} aria-label={`${data.title} details`}>
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.layout}>
            {/* Sticky summary card */}
            <aside className={styles.side}>
              <div className={styles.summary}>
                <div>
                  <span className={styles.summaryLabel}>[ Included ]</span>
                  <ul className={styles.tags}>
                    {data.tags.map((t) => (
                      <li key={t} className={styles.tagChip}>
                        # {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`${styles.statValue} h2`}>{data.stat.value}</p>
                  <span className={styles.statLabel}>{data.stat.label}</span>
                </div>
              </div>
            </aside>

            {/* Content rows */}
            <div className={styles.content}>
              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h6`}>Service Overview</h2>
                <div className={styles.rowBody}>
                  {data.overview.map((p, i) => (
                    <p key={i} className={styles.text}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h6`}>Our Approach</h2>
                <div className={styles.rowBody}>
                  <p className={styles.text}>{data.approach}</p>

                  <ol className={styles.steps}>
                    {data.steps.map((s, i) => (
                      <li key={s.title} className={styles.step}>
                        <div className={styles.stepTop}>
                          <span
                            className={styles.stepLine}
                            aria-hidden='true'
                          />
                          <div className={styles.stepTopBox}>
                            <h3 className={`${styles.stepTitle} h6`}>
                              {s.title}
                            </h3>
                            <span className={styles.stepNum}>
                              /{String(i + 1).padStart(3, "0")}
                            </span>
                          </div>
                        </div>
                        <p className={styles.stepBody}>{s.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h6`}>What We Deliver</h2>
                <div className={styles.rowBody}>
                  {data.deliver.map((p, i) => (
                    <p key={i} className={styles.text}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.gallery}>
                {data.gallery.map((g) => (
                  <div key={g.src} className={styles.galleryImage}>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes='(max-width: 968px) 50vw, 30vw'
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </section>
    </>
  );
}
