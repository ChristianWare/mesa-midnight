import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { FLEET_GALLERY, type FleetDetail as Data } from "@/lib/fleetDetails";
import styles from "./FleetDetail.module.css";

const initials = (name: string) =>
  name
    .replace(/^The\s+/i, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

function Stars() {
  return (
    <span className={styles.stars} role='img' aria-label='5 out of 5 stars'>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z' />
        </svg>
      ))}
    </span>
  );
}

/** Vehicle page: dark hero, then inside / best for / review blocks. */
export default function FleetDetail({ data }: { data: Data }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby='vehicle-heading'>
        <Nav variant='overlay' />
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <div className={styles.chips}>
                <span className={styles.chipDark}>{data.seats} seats</span>
                <span className={styles.chipPlain}>{data.category}</span>
              </div>
              <h1 id='vehicle-heading' className={styles.heading}>
                {data.name}
              </h1>
              <p className={styles.intro}>{data.intro}</p>
            </div>

            <dl className={styles.meta}>
              <div className={styles.metaCol}>
                <dt className={styles.metaLabel}>Features</dt>
                {data.features.map((f) => (
                  <dd key={f} className={styles.metaValue}>
                    {f}
                  </dd>
                ))}
              </div>
              <div className={styles.metaCol}>
                <dt className={styles.metaLabel}>Capacity</dt>
                <dd className={styles.metaValue}>
                  {data.seats} seats · {data.bags} bags
                </dd>
                <dt className={`${styles.metaLabel} ${styles.metaGap}`}>
                  Rate
                </dt>
                <dd className={styles.metaValue}>
                  From {data.from} · {data.minimum} min
                </dd>
              </div>
            </dl>
          </div>

          {/* Vehicle on a light stage, same 2:1 frame as the service hero */}
          <div className={styles.stage}>
            <Image
              src={data.cutout}
              alt={`${data.name}`}
              fill
              priority
              sizes='(max-width: 968px) 100vw, 80vw'
              className={styles.cutout}
            />
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Inside the car ── */}
      <section className={styles.block} aria-labelledby='inside-heading'>
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.row}>
            <span className={styles.tag}>Inside</span>
            <div className={styles.body}>
              <h2 id='inside-heading' className={`${styles.blockHeading} h4`}>
                {data.inside.heading}
              </h2>
              <p className={styles.text}>{data.inside.body}</p>
            </div>
          </div>

          <div className={styles.galleryThree}>
            {FLEET_GALLERY.inside.map((g, i) => (
              <div
                key={g.src}
                className={`${styles.photo} ${i === 2 ? styles.photoWide : ""}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={i === 2 ? "(max-width: 968px) 100vw, 75vw" : "(max-width: 968px) 50vw, 38vw"}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Best for ── */}
      <section className={styles.block} aria-labelledby='bestfor-heading'>
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.row}>
            <span className={styles.tag}>Best for</span>
            <div className={styles.body}>
              <h2 id='bestfor-heading' className={`${styles.blockHeading} h4`}>
                {data.bestFor.heading}
              </h2>
              <p className={styles.text}>{data.bestFor.body}</p>
            </div>
          </div>

          <div className={styles.galleryTwo}>
            {FLEET_GALLERY.bestFor.map((g) => (
              <div key={g.src} className={styles.photo}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes='(max-width: 968px) 50vw, 38vw'
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Feedback ── */}
      <section
        className={`${styles.block} ${styles.blockLast}`}
        aria-labelledby='feedback-heading'
      >
        <LayoutWrapper paddingNone='paddingNone'>
          <div className={styles.row}>
            <span className={styles.tag} id='feedback-heading'>
              Feedback
            </span>
            <figure className={styles.body}>
              <blockquote className={styles.quote}>
                <p className='h5'>&ldquo;{data.review.quote}&rdquo;</p>
              </blockquote>

              <div className={styles.statRow}>
                {data.review.stats.map((s) => (
                  <div key={s.label} className={styles.statCard}>
                    <span className={`${styles.statValue} h4`}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              <figcaption className={styles.reviewer}>
                <span className={styles.avatar} aria-hidden='true'>
                  {initials(data.review.name)}
                </span>
                <span className={styles.reviewerText}>
                  <span className={styles.reviewerName}>{data.review.name}</span>
                  <span className={styles.reviewerRole}>{data.review.role}</span>
                </span>
                <Stars />
              </figcaption>
            </figure>
          </div>
        </LayoutWrapper>
      </section>
    </>
  );
}
