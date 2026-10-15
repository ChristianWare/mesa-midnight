import Link from "next/link";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import CornerArrow from "@/components/shared/icons/CornerArrow/CornerArrow";
import HeroClock from "./HeroClock";
import styles from "./Hero.module.css";

const SERVICES = [
  {
    n: "/001",
    label: "Airport transfers",
    href: "/services/airport-transfers",
  },
  { n: "/002", label: "Corporate travel", href: "/services/corporate-travel" },
  { n: "/003", label: "Hourly chauffeur", href: "/services/hourly-chauffeur" },
  { n: "/004", label: "Late-night rides", href: "/services/late-night-rides" },
];

const CHAUFFEURS = [
  { src: "/images/img1.png", alt: "Mesa Midnight chauffeur" },
  { src: "/images/img2.png", alt: "Mesa Midnight chauffeur" },
  { src: "/images/img3.webp", alt: "Mesa Midnight chauffeur" },
];

export default function Hero() {
  return (
    <section className={styles.section} aria-labelledby='hero-heading'>
      {/* Background video */}
      <video
        className={styles.video}
        src='/videos/heroiii.mp4'
        autoPlay
        muted
        loop
        playsInline
        preload='metadata'
        aria-hidden='true'
      />
      <div className={styles.overlay} aria-hidden='true' />
      <div className={styles.centerLine} aria-hidden='true' />

      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.grid}>
            {/* ── Left: headline + CTA ── */}
            <div className={styles.left}>
              <h1 id='hero-heading' className={styles.heading}>
                {/* On Time at 4 a.m.
                <br />
                On Time at Midnight. */}
                Executive Black Car Service in Mesa, Phoenix and Beyond
              </h1>
              <div className={styles.btnContainer}>
                <Button
                  href='/book'
                  text='Book a ride'
                  btnType='whiteMain'
                  arrow
                />
              </div>
            </div>

            {/* ── Right: services + intro ── */}
            <div className={styles.right}>
              <div className={styles.rightTop}>
                <p className={styles.eyebrow}>
                  <svg
                    className={styles.sparkle}
                    viewBox='0 0 16 16'
                    aria-hidden='true'
                  >
                    <path
                      d='M8 0c.4 4.2 3.8 7.6 8 8-4.2.4-7.6 3.8-8 8-.4-4.2-3.8-7.6-8-8 4.2-.4 7.6-3.8 8-8Z'
                      fill='currentColor'
                    />
                  </svg>
                  What we do
                </p>

                <ul className={styles.services}>
                  {SERVICES.map((s) => (
                    <li key={s.n}>
                      <Link href={s.href} className={styles.serviceLink}>
                        <span className={styles.serviceNum}>{s.n}</span>
                        <span
                          className={styles.serviceRule}
                          aria-hidden='true'
                        />
                        <span className={styles.serviceLabel}>{s.label}</span>
                        <CornerArrow className={styles.serviceArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.copy}>
                A 24/7 black car service for the East Valley, with a
                professional chauffeur and a flat rate you see before you book.
              </p>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomLeft}>
              <div className={styles.barcode} aria-hidden='true' />

              <div className={styles.team}>
                <ul className={styles.avatars}>
                  {CHAUFFEURS.map((c) => (
                    <li key={c.src} className={styles.avatar}>
                      <Image
                        src={c.src}
                        alt={c.alt}
                        fill
                        sizes='44px'
                        className={styles.avatarImg}
                      />
                    </li>
                  ))}
                </ul>
                <div className={styles.teamText}>
                  <span className={styles.teamTitle}>Chauffeurs</span>
                  <span className={styles.teamSub}>#On call 24/7</span>
                </div>
              </div>
            </div>

            <div className={styles.location}>
              <span className={styles.locationLabel}>Based in Mesa, AZ</span>
              <HeroClock className={styles.clock} />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
