import Link from "next/link";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import Moon from "../icons/Moon/Moon";
import Instagram from "../icons/Instagram/Instagram";
import Facebook from "../icons/Facebook/Facebook";
import LinkedIn from "../icons/LinkedIn/LinkedIn";
import Twitter from "../icons/Twitter/Twitter";
import TikTok from "../icons/TikTok/TikTok";
import YouTube from "../icons/YouTube/YouTube";
import Yelp from "../icons/Yelp/Yelp";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Main pages",
    links: [
      { text: "Home", href: "/" },
      { text: "Services", href: "/services" },
      { text: "Fleet", href: "/fleet" },
      { text: "Airports", href: "/airports" },
      { text: "About", href: "/about" },
      { text: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "Locations", href: "/locations" },
      { text: "Routes", href: "/routes" },
      { text: "Corporate accounts", href: "/corporate-accounts" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { text: "Book a ride", href: "/book" },
      { text: "Log in", href: "/login" },
      { text: "Create account", href: "/register" },
    ],
  },
];

/**
 * Site footer. Contact details and social links come from
 * Admin → Company Settings (falling back to src/config/site.ts).
 * Social icons only show for the links that are filled in.
 */
export default async function Footer() {
  const s = await getCompanySettings();
  const year = new Date().getFullYear();

  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw || SITE.phone.tel;
  const email = s.supportEmail || SITE.email.support;
  const street = s.officeAddress || SITE.address.street;
  const city =
    s.officeCity ||
    `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;

  const socials = [
    { label: "Instagram", href: s.instagramUrl, Icon: Instagram },
    { label: "Facebook", href: s.facebookUrl, Icon: Facebook },
    { label: "LinkedIn", href: s.linkedinUrl, Icon: LinkedIn },
    { label: "X (Twitter)", href: s.twitterUrl, Icon: Twitter },
    { label: "TikTok", href: s.tiktokUrl, Icon: TikTok },
    { label: "YouTube", href: s.youtubeUrl, Icon: YouTube },
    { label: "Yelp", href: s.yelpUrl, Icon: Yelp },
  ].filter((x) => x.href);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ── Brand ── */}
          <div className={styles.brandCol}>
            <Link href='/' className={`${styles.brand} h6`}>
              <Moon className={styles.moon} />
              {s.companyName || SITE.name}
            </Link>
            <p className={styles.tagline}>
              {s.companyTagline || SITE.tagline}
            </p>

            <span className={styles.label}>Dispatch, 24/7</span>
            <a href={`tel:${phoneTel}`} className={styles.link}>
              {phone}
            </a>
          </div>

          {/* ── Link columns ── */}
          <div className={styles.cols}>
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <span className={styles.label}>{col.title}</span>
                <ul className={styles.list}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={styles.link}>
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <span className={styles.label}>Get in touch</span>
              <ul className={styles.list}>
                <li>
                  <a href={`mailto:${email}`} className={styles.link}>
                    {email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${phoneTel}`} className={styles.link}>
                    {phone}
                  </a>
                </li>
                <li className={styles.address}>
                  {street}
                  <br />
                  {city}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          {socials.length > 0 ? (
            <ul className={styles.socials}>
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className={styles.social}
                  >
                    <Icon className={styles.socialIcon} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}

          <p className={styles.legal}>
            © {year} {SITE.legalName}
            <span className={styles.sep} aria-hidden='true'>
              |
            </span>
            <Link href='/privacy'>Privacy</Link>
            <span className={styles.sep} aria-hidden='true'>
              |
            </span>
            <Link href='/terms'>Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
