import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import HomeBookingWidget from "@/components/HomePage/HomeBookingWidget/HomeBookingWidget";
import type { BookingWidgetData } from "@/lib/booking/widgetData";
import { SITE } from "@/config/site";
import styles from "./QuoteBand.module.css";

/** The rider quote shown on the photo (from the home Testimonials). */
const FEATURED = {
  quote: "Not once has the car been late. Not once.",
  reviewer: "James R.",
  company: "Chandler",
};

/** Small round photos in the trust row. */
const AVATARS = [
  { src: "/images/people/EV.jpg", alt: "Mesa Midnight rider" },
  { src: "/images/people/MR.jpg", alt: "Mesa Midnight rider" },
  { src: "/images/people/TB.jpg", alt: "Mesa Midnight rider" },
];

const DEFAULT_HEADING =
  "Your flat rate, quoted before you book. No surge, no surprises.";
const DEFAULT_COPY =
  "Executives, families and frequent flyers across the East Valley have booked with us since 2019. Free flight tracking on every airport ride.";

/**
 * Photo card with a rider quote on the left, booking widget on the right.
 * Same component as Nier's homepage QuoteBand.
 */
export default function QuoteBand({
  widget,
  heading = DEFAULT_HEADING,
  copy = DEFAULT_COPY,
  source = "home:quote-band",
  headingId = "quote-heading",
  showMap = false,
}: {
  widget: BookingWidgetData;
  heading?: string;
  /** Sentence(s) under the avatars; the phone line is added after it. */
  copy?: string;
  /** Where the booking came from, passed to the widget. */
  source?: string;
  /** Unique id for the heading when the band appears more than once. */
  headingId?: string;
  /** Show the live route map beside the widget and run the band full width. */
  showMap?: boolean;
}) {
  return (
    <section className={styles.container} aria-labelledby={headingId}>
      <LayoutWrapper>
        <div
          className={
            showMap ? `${styles.content} ${styles.contentWide}` : styles.content
          }
        >
          <figure className={styles.photoCard}>
            <Image
              src='/images/img4.jpg'
              alt='Mesa Midnight chauffeur waiting beside a black car'
              fill
              sizes='(max-width: 1068px) 100vw, 45vw'
              className={styles.photo}
            />
            <div className={styles.overlay} aria-hidden='true' />
            <div className={styles.photoCardTop}>
              <h2 id={headingId} className={`${styles.heading} h3`}>
                {heading}
              </h2>
              <div className={styles.trust}>
                <ul className={styles.avatars} aria-label='Mesa Midnight riders'>
                  {AVATARS.map((a) => (
                    <li key={a.src} className={styles.avatar}>
                      <Image
                        src={a.src}
                        alt={a.alt}
                        fill
                        sizes='48px'
                        className={styles.avatarImg}
                      />
                    </li>
                  ))}
                </ul>
                <p className={styles.copy}>
                  {copy} Prefer to talk?{" "}
                  <a href={`tel:${SITE.phone.tel}`} className={styles.phone}>
                    {SITE.phone.display}
                  </a>
                  24/7.
                </p>
              </div>
            </div>
            <div className={styles.quoteWrap}>
              <blockquote className={styles.quote}>
                &ldquo;{FEATURED.quote}&rdquo;
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.rule} aria-hidden='true' />
                {FEATURED.reviewer}, {FEATURED.company}
              </figcaption>
            </div>
          </figure>

          {/* ── Right: pitch on top, booking widget below ── */}
          <div className={styles.right}>
            <div className={styles.top}>
              <SectionHeading text='Instant Quote' dot />
            </div>

            <div className={styles.widget}>
              <HomeBookingWidget
                serviceTypes={widget.serviceTypes}
                vehicles={widget.vehicles}
                companyTimezone={widget.companyTimezone}
                companyTimezoneLabel={widget.companyTimezoneLabel}
                source={source}
                fluid
                showMap={showMap}
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
