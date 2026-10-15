import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServicesSection.module.css";

type Service = {
  slug: string;
  title: string;
  sub: string;
  label: string;
  tag: string;
  image: string;
  /** Which part of the photo stays in frame when it's cropped */
  focus?: string;
};

/*
 * The five services from the copy doc (src/lib/services.ts slugs).
 * Photos are the three SUV shots for now; swap each `image` for a
 * service-specific photo when you have one.
 */
const TOP: Service[] = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    sub: "Flat-rate rides with flight tracking",
    label: "PHX · AZA",
    tag: "60 min free wait",
    image: "/images/img7.jpg",
    focus: "30% 50%",
  },
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    sub: "Executive rides on one monthly invoice",
    label: "Business",
    tag: "Monthly billing",
    image: "/images/img8.jpg",
  },
];

const BOTTOM: Service[] = [
  {
    slug: "hourly-chauffeur",
    title: "Hourly Chauffeur",
    sub: "A car and chauffeur on standby",
    label: "By the hour",
    tag: "2-hr minimum",
    image: "/images/img9.jpg",
    focus: "35% 50%",
  },
  {
    slug: "weddings-and-events",
    title: "Weddings & Events",
    sub: "Bridal parties, guest shuttles, game nights",
    label: "Events",
    tag: "Up to 14 guests",
    image: "/images/img10.jpg",
    focus: "70% 50%",
  },
  {
    slug: "late-night-rides",
    title: "Late-Night Rides",
    sub: "The same flat rate at 2 a.m. as 2 p.m.",
    label: "24/7",
    tag: "No surcharge",
    image: "/images/img11.jpg",
    focus: "65% 50%",
  },
];

const MARQUEE_TEXT = "Our Services © 2019 ~ 2026";

function ServiceCard({
  service,
  className,
  sizes,
}: {
  service: Service;
  className?: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`${styles.card} ${className ?? ""}`}
    >
      <div className={styles.imageWrap}>
        <Image
          src={service.image}
          alt={`${service.title}: Mesa Midnight black car service`}
          fill
          sizes={sizes}
          className={styles.image}
          style={service.focus ? { objectPosition: service.focus } : undefined}
        />
        <span className={styles.tag}>{service.tag}</span>
      </div>
      <div className={styles.caption}>
        <div className={styles.captionText}>
          <h3 className={styles.title}>{service.title}</h3>
          <p className={styles.sub}>{service.sub}</p>
        </div>
        <span className={styles.label}>{service.label}</span>
      </div>
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
          <h2 id='services-heading' className={styles.heading}>
            Services<sup className={styles.count}>(05)</sup>
          </h2>
          <p className={styles.intro}>
            Whatever the reason for the trip, you get the same thing: a spotless
            car, a chauffeur who&apos;s early, and the price you were quoted.
          </p>
        </div>

        {/* ── Two cards on top ── */}
        <div className={styles.topRow}>
          <ServiceCard
            service={TOP[0]}
            className={styles.cardNarrow}
            sizes='(max-width: 568px) 100vw, (max-width: 968px) 45vw, 33vw'
          />
          <ServiceCard
            service={TOP[1]}
            className={styles.cardWide}
            sizes='(max-width: 568px) 100vw, (max-width: 968px) 55vw, 50vw'
          />
        </div>

        {/* ── Three equal cards below ── */}
        <div className={styles.bottomRow}>
          {BOTTOM.map((s) => (
            <ServiceCard
              key={s.slug}
              service={s}
              sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 33vw'
            />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
