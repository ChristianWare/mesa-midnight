import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import { SITE } from "@/config/site";
import { fleetData } from "@/lib/data";
import {
  FLEET_DETAILS,
  FLEET_GALLERY,
  FLEET_POLICIES,
  FLEET_RATE_NOTES,
  type FleetDetail as Data,
} from "@/lib/fleetDetails";
import styles from "./FleetDetail.module.css";

/** Every vehicle by passengers, for the capacity track under the photo. */
const STOPS = [...FLEET_DETAILS].sort((a, b) => a.seats - b.seats);

/** "Airport transfers, executive travel" → ["Airport transfers", "Executive travel"] */
const bestForList = (slug: string) =>
  (fleetData.find((f) => f.slug === slug)?.bestFor ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1));

/** "$95/hr" → { value: "$95", unit: "hr" } */
const splitRate = (from: string) => {
  const [value, unit = "hr"] = from.split("/");
  return { value, unit };
};

function Check() {
  return (
    <svg
      className={styles.check}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      aria-hidden='true'
    >
      <path
        d='M3 8.5l3.2 3L13 4.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

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

/**
 * /fleet/[slug]: dark intro with the vehicle and a capacity track, then the
 * details in rows beside a sticky booking card, then the rest of the fleet.
 */
export default function FleetDetail({ data }: { data: Data }) {
  const rate = splitRate(data.from);
  const best = bestForList(data.slug);
  const others = FLEET_DETAILS.filter((o) => o.slug !== data.slug);

  const rateLines = [
    `Hourly bookings from ${data.from}, ${data.minimum} minimum`,
    ...FLEET_RATE_NOTES,
  ];
  const policyLines = [...FLEET_POLICIES, ...(data.policyNotes ?? [])];

  return (
    <>
      {/* ── Intro ── */}
      <section className={styles.hero} aria-labelledby='vehicle-heading'>
        <Nav variant='overlay' />
        <LayoutWrapper>
          <nav className={styles.crumbs} aria-label='Breadcrumb'>
            <Link href='/fleet'>Fleet</Link>
            <span aria-hidden='true'>/</span>
            <span aria-current='page'>{data.name}</span>
          </nav>

          <div className={styles.introGrid}>
            <div className={styles.stage}>
              <Image
                src={data.cutout}
                alt={data.name}
                fill
                priority
                sizes='(max-width: 1068px) 100vw, 55vw'
                className={styles.cutout}
              />
              <div className={styles.track} aria-hidden='true'>
                <span className={styles.line} />
                {STOPS.map((o) => (
                  <span
                    key={o.slug}
                    className={`${styles.stop} ${o.slug === data.slug ? styles.stopActive : ""}`}
                  >
                    <span className={styles.stopTag}>
                      {o.seats}
                      <span className={styles.stopName}> · {o.short}</span>
                    </span>
                    <span className={styles.stopDot} />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.side}>
              <div className={styles.chips}>
                <span className={styles.chipDark}>{data.seats} seats</span>
                <span className={styles.chipPlain}>{data.category}</span>
              </div>

              <h1 id='vehicle-heading' className={`${styles.heading} h2`}>
                {data.name}
              </h1>
              <p className={styles.intro}>{data.intro}</p>

              <dl className={styles.stats}>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Passengers</dt>
                  <dd className={styles.statValue}>Up to {data.seats}</dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Bags</dt>
                  <dd className={styles.statValue}>{data.bags}</dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>{data.extra.label}</dt>
                  <dd className={styles.statValue}>{data.extra.value}</dd>
                </div>
              </dl>

              {best.length > 0 && (
                <div className={styles.best}>
                  <span className={styles.label}>Best for</span>
                  <ul className={styles.bestList}>
                    {best.map((b) => (
                      <li key={b} className={styles.bestItem}>
                        <span className={styles.dot} aria-hidden='true' />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.actions}>
                <Button
                  href='/book'
                  text={data.cta}
                  btnType='whiteMain'
                  arrow
                />
                <Button
                  href={`tel:${SITE.phone.tel}`}
                  text={`Call ${SITE.phone.display}`}
                  btnType='underlinedWhite'
                />
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Details: rows left, sticky card right ── */}
      <section className={styles.details} aria-label={`${data.name} details`}>
        <LayoutWrapper>
          <div className={styles.layout}>
            <div className={styles.content}>
              <div className={styles.row}>
                <h2 className={styles.tag}>Vehicle details</h2>
                <div className={styles.rowBody}>
                  <p className={`${styles.rowHeading} h5`}>
                    {data.inside.heading}
                  </p>
                  <p className={styles.text}>{data.inside.body}</p>
                  <p className={styles.text}>{data.bestFor.body}</p>
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={styles.tag}>Features</h2>
                <ul className={`${styles.rowBody} ${styles.checks}`}>
                  {data.features.map((f) => (
                    <li key={f} className={styles.checkItem}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={styles.tag}>Specs</h2>
                <dl className={`${styles.rowBody} ${styles.specs}`}>
                  {data.specs.map((s) => (
                    <div key={s.label} className={styles.spec}>
                      <dt className={styles.label}>{s.label}</dt>
                      <dd className={styles.specValue}>{s.value}</dd>
                    </div>
                  ))}
                  <div className={styles.spec}>
                    <dt className={styles.label}>Capacity</dt>
                    <dd className={styles.specValue}>
                      {data.seats} passengers, {data.bags} bags
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={styles.row}>
                <h2 className={styles.tag}>Rates & booking</h2>
                <ul className={`${styles.rowBody} ${styles.checks}`}>
                  {rateLines.map((l) => (
                    <li key={l} className={styles.checkItem}>
                      <Check />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={styles.tag}>Policies</h2>
                <ul className={`${styles.rowBody} ${styles.checks}`}>
                  {policyLines.map((l) => (
                    <li key={l} className={styles.checkItem}>
                      <Check />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={styles.tag}>Feedback</h2>
                <figure className={styles.rowBody}>
                  <blockquote className={styles.quote}>
                    <p className='h6'>&ldquo;{data.review.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className={styles.reviewer}>
                    <span className={styles.reviewerText}>
                      <span className={styles.reviewerName}>
                        {data.review.name}
                      </span>
                      <span className={styles.reviewerRole}>
                        {data.review.role}
                      </span>
                    </span>
                    <Stars />
                  </figcaption>
                </figure>
              </div>

              <div className={styles.gallery}>
                {FLEET_GALLERY.bestFor.map((g) => (
                  <div key={g.src} className={styles.photo}>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes='(max-width: 1068px) 50vw, 30vw'
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <aside className={styles.aside} aria-label='Book this vehicle'>
              <div className={styles.summary}>
                <div className={styles.summaryPhoto}>
                  <Image
                    src={data.cutout}
                    alt=''
                    fill
                    sizes='(max-width: 1068px) 100vw, 400px'
                    className={styles.summaryCutout}
                  />
                </div>

                <div className={styles.summaryStat}>
                  <span className={styles.summaryEyebrow}>Hourly from</span>
                  <p className={styles.summaryValue}>
                    {rate.value}
                    <span className={styles.summaryUnit}>/{rate.unit}</span>
                  </p>
                  <span className={styles.summaryLabel}>
                    {data.minimum} minimum · up to {data.seats} passengers
                  </span>
                </div>

                <ul className={styles.summaryChips}>
                  {data.features.slice(0, 4).map((f) => (
                    <li key={f} className={styles.summaryChip}>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={styles.summaryFoot}>
                  <Button
                    href='/book'
                    text={data.cta}
                    btnType='yellowBlock'
                    arrow
                  />
                  <p className={styles.summaryCall}>
                    Or call dispatch at{" "}
                    <a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </LayoutWrapper>
      </section>

      {/* ── The rest of the fleet ── */}
      <section className={styles.others} aria-labelledby='others-heading'>
        <LayoutWrapper>
          <div className={styles.othersTop}>
            <span className={styles.tag}>Fleet</span>
            <h2 id='others-heading' className={`${styles.othersTitle} h4`}>
              The rest of the fleet
            </h2>
          </div>
          <ul className={styles.otherList}>
            {others.map((o) => (
              <li key={o.slug} className={styles.other}>
                <div className={styles.otherImg}>
                  <Image
                    src={o.cutout}
                    alt=''
                    fill
                    sizes='(max-width: 568px) 50vw, (max-width: 1068px) 33vw, 25vw'
                    className={styles.otherCutout}
                  />
                </div>
                <Link href={`/fleet/${o.slug}`} className={styles.otherName}>
                  {o.name}
                </Link>
                <span className={styles.otherMeta}>
                  {o.seats} passengers · {o.bags} bags · from {o.from}
                </span>
              </li>
            ))}
          </ul>
        </LayoutWrapper>
      </section>
    </>
  );
}
