import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./ServicesList.module.css";

type Service = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
};

// Photos are fleet shots for now; swap per service when you have them.
const SERVICES: Service[] = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    description:
      "Flat-rate rides to and from Sky Harbor, Gateway and the private terminals, with your flight tracked from takeoff.",
    tags: ["Flight tracking", "60 min free wait", "Meet & greet", "Curbside or inside"],
    image: "/images/vehicles/cadi.jpg",
    alt: "Black Cadillac Escalade waiting for an airport pickup",
  },
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    description:
      "Executive transportation for teams, clients and roadshows, with one invoice at the end of the month.",
    tags: ["Monthly billing", "Client pickups", "Roadshows", "Account manager"],
    image: "/images/vehicles/heroiii.jpg",
    alt: "Black Chevrolet Suburban parked on an open lot",
  },
  {
    slug: "hourly-chauffeur",
    title: "Hourly Chauffeur",
    description:
      "A chauffeur and vehicle at your disposal by the hour, for back-to-back meetings, errands or a night out.",
    tags: ["2-hour minimum", "Multiple stops", "Wait time included"],
    image: "/images/img1.png",
    alt: "Black SUV parked in the desert at sunrise",
  },
  {
    slug: "weddings-and-events",
    title: "Weddings & Events",
    description:
      "Wedding parties, guest shuttles, concerts and game days, planned around your timeline down to the minute.",
    tags: ["Guest shuttles", "Up to 14 per Sprinter", "Timeline planning"],
    image: "/images/img2.png",
    alt: "Black SUV driving a desert highway",
  },
  {
    slug: "late-night-rides",
    title: "Late-Night Rides",
    description:
      "Rides at any hour, with no late-night surcharge and a dispatcher who actually picks up the phone.",
    tags: ["24/7 dispatch", "No surcharge", "Same flat rate"],
    image: "/images/vehicles/heroiv.jpg",
    alt: "Black Chevrolet Suburban on a roadside at dusk",
  },
];

export default function ServicesList() {
  return (
    <section className={styles.section} aria-label='Our services'>
      <LayoutWrapper paddingNone='paddingNone'>
        <ul className={styles.list}>
          {SERVICES.map((s) => (
            <li key={s.slug} className={styles.row}>
              {/* Flat children so each screen size can rearrange them
                  with grid areas (see the CSS). */}
              <h2 className={`${styles.title} h4`}>{s.title}</h2>

              <div className={styles.link}>
                <Button
                  href={`/services/${s.slug}`}
                  text='Explore service'
                  btnType='underlinedBlack'
                  arrow
                />
              </div>

              <p className={styles.description}>{s.description}</p>

              <ul className={styles.tags}>
                {s.tags.map((t) => (
                  <li key={t} className={styles.tagChip}>
                    # {t}
                  </li>
                ))}
              </ul>

              <div className={styles.imageWrap}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 968px) 50vw, 345px'
                  className={styles.image}
                />
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
