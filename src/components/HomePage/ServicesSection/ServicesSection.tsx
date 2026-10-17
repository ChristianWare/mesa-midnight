import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./ServicesSection.module.css";

type Service = {
  slug: string;
  title: string;
  /** Small chips under the photo */
  chips: [string, string];
  image: string;
  /** Which part of the photo stays in frame when it's cropped */
  focus?: string;
  /** Big number over the photo (top row only) */
  stat?: { value: string; label: string };
};

/*
 * The five services from the copy doc (src/lib/services.ts slugs).
 * Swap each `image` for a service-specific photo when you have one.
 */
const TOP: Service[] = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    chips: ["PHX · AZA", "Flight tracking"],
    image: "/images/img7.jpg",
    focus: "30% 50%",
    stat: { value: "60 min", label: "Free wait time" },
  },
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    chips: ["Business", "Monthly billing"],
    image: "/images/img8.jpg",
    stat: { value: "1", label: "Invoice per month" },
  },
];

const BOTTOM: Service[] = [
  {
    slug: "hourly-chauffeur",
    title: "Hourly Chauffeur",
    chips: ["By the hour", "2-hr minimum"],
    image: "/images/img9.jpg",
    focus: "35% 50%",
  },
  {
    slug: "weddings-and-events",
    title: "Weddings & Events",
    chips: ["Events", "Up to 14 guests"],
    image: "/images/img10.jpg",
    focus: "70% 50%",
  },
  {
    slug: "late-night-rides",
    title: "Late-Night Rides",
    chips: ["24/7", "No surcharge"],
    image: "/images/img11.jpg",
    focus: "65% 50%",
  },
];

const MARQUEE_TEXT = "Our Services © 2019 ~ 2026";

const pad = (n: number) => `/${String(n).padStart(2, "0")}`;

function ServiceCard({
  service,
  index,
  sizes,
}: {
  service: Service;
  index: number;
  sizes: string;
}) {
  return (
    <Link href={`/services/${service.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={service.image}
          alt={`${service.title}: Mesa Midnight black car service`}
          fill
          sizes={sizes}
          className={styles.image}
          style={service.focus ? { objectPosition: service.focus } : undefined}
        />
        {service.stat && (
          <span className={styles.stat}>
            <span className={styles.statValue}>{service.stat.value}</span>
            <span className={styles.statLabel}>{service.stat.label}</span>
          </span>
        )}
      </div>

      <div className={styles.meta}>
        <ul className={styles.chips}>
          {service.chips.map((c) => (
            <li key={c} className={styles.chip}>
              {c}
            </li>
          ))}
        </ul>
        <span className={styles.chip}>{pad(index)}</span>
      </div>

      <h3 className={styles.title}>{service.title}</h3>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section className={styles.section} aria-labelledby='services-heading'>
      {/* ── Marquee (decorative; the real heading is below) ── */}
      <div className={styles.marquee} aria-hidden='true'>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.group}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={styles.marqueeText}>
                  {MARQUEE_TEXT}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <LayoutWrapper>
        {/* ── Heading row ── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
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
              Our services
            </span>
            <h2 id='services-heading' className={styles.heading}>
              Services<sup className={styles.count}>(05)</sup>
            </h2>
            <p className={styles.intro}>
              Whatever the reason for the trip, you get the same thing: a
              spotless car, a chauffeur who&apos;s early, and the price you
              were quoted.
            </p>
          </div>
          <div className={styles.headerBtn}>
            <Button
              href='/services'
              text='All services'
              btnType='mainBlack'
              arrow
            />
          </div>
        </div>

        {/* ── Two wide cards on top ── */}
        <div className={styles.topRow}>
          {TOP.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i + 1}
              sizes='(max-width: 568px) 100vw, 50vw'
            />
          ))}
        </div>

        {/* ── Three below ── */}
        <div className={styles.bottomRow}>
          {BOTTOM.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i + 3}
              sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 33vw'
            />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
