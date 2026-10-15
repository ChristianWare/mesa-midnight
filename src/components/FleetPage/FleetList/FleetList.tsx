import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./FleetList.module.css";

type Vehicle = {
  slug: string;
  name: string;
  model: string;
  tag: string;
  /** Starting hourly rate. Placeholder numbers: set your real rates here. */
  from: string;
  bestFor: string;
  minimum: string;
  seats: number;
  bags: number;
  feature: string;
  image: string;
};

const FLEET: Vehicle[] = [
  {
    slug: "luxury-sedan",
    name: "Executive Sedan",
    model: "Mercedes E-Class or similar",
    tag: "Most booked",
    from: "$95/hr",
    bestFor: "Airport runs",
    minimum: "2 hrs",
    seats: 3,
    bags: 3,
    feature: "Wi-Fi",
    image: "/images/vehicles/mercedesSedan.png",
  },
  {
    slug: "executive-suv",
    name: "Executive SUV",
    model: "Chevrolet Suburban or similar",
    tag: "Airport favorite",
    from: "$115/hr",
    bestFor: "Families",
    minimum: "2 hrs",
    seats: 6,
    bags: 6,
    feature: "Wi-Fi",
    image: "/images/vehicles/sub.png",
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    model: "Cadillac Escalade or similar",
    tag: "Premium",
    from: "$135/hr",
    bestFor: "VIP pickups",
    minimum: "2 hrs",
    seats: 6,
    bags: 6,
    feature: "Leather",
    image: "/images/vehicles/escalade.png",
  },
  {
    slug: "executive-sprinter",
    name: "Executive Sprinter",
    model: "Mercedes Sprinter",
    tag: "Groups",
    from: "$165/hr",
    bestFor: "Teams & crews",
    minimum: "3 hrs",
    seats: 14,
    bags: 12,
    feature: "Wi-Fi",
    image: "/images/vehicles/sprinter.png",
  },
  {
    slug: "stretch-limo",
    name: "Stretch Limousine",
    model: "Cadillac Escalade stretch",
    tag: "Weddings",
    from: "$175/hr",
    bestFor: "Weddings & proms",
    minimum: "3 hrs",
    seats: 10,
    bags: 4,
    feature: "Bar",
    image: "/images/vehicles/limo.png",
  },
  {
    slug: "party-bus",
    name: "Party Bus",
    model: "Lounge seating & sound",
    tag: "Events",
    from: "$225/hr",
    bestFor: "Nights out",
    minimum: "4 hrs",
    seats: 20,
    bags: 8,
    feature: "Sound",
    image: "/images/vehicles/partyBusii.png",
  },
  {
    slug: "coach-bus",
    name: "Coach Bus",
    model: "Full-size motorcoach",
    tag: "Large groups",
    from: "$295/hr",
    bestFor: "Conferences",
    minimum: "5 hrs",
    seats: 50,
    bags: 50,
    feature: "Restroom",
    image: "/images/vehicles/bus.png",
  },
];

/* Small line icons for the chips */
function SeatIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='12' cy='7' r='3.5' />
      <path d='M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6' />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='5' y='7' width='14' height='13' rx='2' />
      <path d='M9 7V4.5h6V7M9 11v5M15 11v5' />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z' />
    </svg>
  );
}

export default function FleetList() {
  return (
    <section className={styles.section} aria-labelledby='fleet-list-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        {/* ── Heading row ── */}
        <div className={styles.layout}>
          <div className={styles.labelCol}>
            <span className={styles.tag}>The fleet</span>
          </div>
          <div className={styles.header}>
            <h2 id='fleet-list-heading' className={styles.heading}>
              Seven vehicles, one standard.
            </h2>
            <div className={styles.headerRight}>
              <p className={styles.intro}>
                Every car is late-model, detailed before each ride and driven by
                a full-time chauffeur. Pick the size; the service stays the same.
              </p>
              <div className={styles.headerBtn}>
                <Button
                  href='/book'
                  text='Get a quote'
                  btnType='underlinedBlack'
                  arrow
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <ul className={styles.grid}>
          {FLEET.map((v) => (
            <li key={v.slug}>
              <Link href={`/fleet/${v.slug}`} className={styles.card}>
                <span className={styles.imageWrap}>
                  <Image
                    src={v.image}
                    alt={`${v.name}: ${v.model}`}
                    fill
                    sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 33vw'
                    className={styles.image}
                  />
                  <span className={styles.badge}>{v.tag}</span>
                </span>

                <span className={styles.body}>
                  <span className={styles.titleRow}>
                    <span className={styles.name}>{v.name}</span>
                    <span className={styles.price}>
                      <span className={styles.priceFrom}>From</span> {v.from}
                    </span>
                  </span>
                  <span className={styles.model}>{v.model}</span>

                  <span className={styles.divider} aria-hidden='true' />

                  <span className={styles.facts}>
                    <span className={styles.fact}>
                      Best for: <strong>{v.bestFor}</strong>
                    </span>
                    <span className={styles.fact}>
                      Minimum: <strong>{v.minimum}</strong>
                    </span>
                  </span>

                  <span className={styles.chips}>
                    <span className={styles.chip}>
                      <SeatIcon />
                      {v.seats} seats
                    </span>
                    <span className={styles.chip}>
                      <BagIcon />
                      {v.bags} bags
                    </span>
                    <span className={styles.chip}>
                      <StarIcon />
                      {v.feature}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
