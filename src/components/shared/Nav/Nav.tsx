"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import NavProgress from "@/components/shared/NavProgress/NavProgress";
import CornerArrow from "@/components/shared/icons/CornerArrow/CornerArrow";
import { SITE } from "@/config/site";
import styles from "./Nav.module.css";
import CarFront from "../icons/CarFront/CarFront";
import Moon from "../icons/Moon/Moon";

/**
 * Site nav.
 * - variant="overlay": transparent with white text, sits on top of the hero.
 * - default ("solid"): white bar with dark text, for every other page.
 * `background` and the color props are still accepted so the existing
 * `<Nav background="white" />` callers keep compiling.
 */
export interface NavProps {
  variant?: "overlay" | "solid";
  navItemColor?: string;
  color?: string;
  hamburgerColor?: string;
  background?: "white" | "cream" | "accent";
}

type AppRole = "USER" | "ADMIN" | "DRIVER" | "CORPORATE";

/** Top bar: five numbered links (hidden at 968px and below). */
const PRIMARY_LINKS = [
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "About Us", href: "/about" },
  { text: "Contact", href: "/contact" },
];

/** Slide-out menu: every public page. */
const MENU_LINKS = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "Locations", href: "/locations" },
  { text: "Corporate", href: "/corporate-accounts" },
  { text: "Blog", href: "/blog" },
  { text: "Contact", href: "/contact" },
  // Partner landing pages from config; none by default.
  ...SITE.nav.partners.map((p) => ({ text: p.text, href: p.href })),
];

const SOCIALS = [
  { key: "instagram", label: "Instagram", short: "IG" },
  { key: "facebook", label: "Facebook", short: "f" },
  { key: "linkedin", label: "LinkedIn", short: "in" },
  { key: "google", label: "Google", short: "G" },
  { key: "yelp", label: "Yelp", short: "Y" },
] as const;

const noopSubscribe = () => () => {};

function dashboardFor(roles: AppRole[]): string {
  if (roles.includes("ADMIN")) return "/admin";
  if (roles.includes("DRIVER")) return "/driver-dashboard";
  if (roles.includes("CORPORATE")) return "/corporate";
  return "/dashboard";
}

function AccountIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <circle cx='12' cy='8' r='4' />
      <path d='M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5' />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      aria-hidden='true'
    >
      <path d='M6 6l12 12M18 6L6 18' />
    </svg>
  );
}

export default function Nav({ variant = "solid" }: NavProps) {
  const pathname = usePathname() ?? "/";
  const { data: session, status } = useSession();
  const roles = ((session?.user as { roles?: AppRole[] } | undefined)?.roles ??
    []) as AppRole[];
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  // True only in the browser, so the portal never renders during SSR.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const accountHref = session ? dashboardFor(roles) : "/login";
  const close = () => setOpen(false);

  // Lock page scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const socials = SOCIALS.filter((s) => SITE.social[s.key]);

  return (
    <header
      className={`${styles.header} ${
        variant === "overlay" ? styles.overlay : styles.solid
      }`}
    >
      <nav className={styles.nav} aria-label='Main'>
        {/* ── Wordmark ── */}
        <Link href='/' className={styles.brand} onClick={close}>
          {/* <span className={styles.brandDot}>.</span> */}
          <Moon className={styles.icon} />
          {SITE.name}
        </Link>

        {/* ── Center links (desktop) ── */}
        <ul className={styles.links}>
          {PRIMARY_LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.link} ${
                  isActive(l.href) ? styles.active : ""
                }`}
              >
                <span className={styles.linkText}>{l.text}</span>
                <sup className={styles.count}>({i + 1})</sup>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right cluster ── */}
        <div className={styles.actions}>
          <Link
            href={accountHref}
            className={styles.iconBtn}
            aria-label={session ? "Your dashboard" : "Log in"}
          >
            <AccountIcon />
          </Link>

          <Link href='/book' className={`${styles.pill} ${styles.bookBtn}`}>
            Book a ride
          </Link>

          <button
            type='button'
            className={`${styles.pill} ${styles.menuBtn}`}
            aria-expanded={open}
            aria-controls='site-menu'
            onClick={() => setOpen(true)}
          >
            <span className={styles.burger} aria-hidden='true'>
              <span />
              <span />
            </span>
            <span className={styles.menuLabel}>Menu</span>
          </button>
        </div>
      </nav>

      {/* ── Slide-out menu ──
          Rendered into <body> so it always sits above the page, even when
          the nav lives inside the sticky hero that later sections scroll over. */}
      {mounted &&
        createPortal(
          <>
            <div
              className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
              onClick={close}
              aria-hidden='true'
            />
            <aside
              id='site-menu'
              className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
              aria-label='Site menu'
              aria-hidden={!open}
              inert={!open}
              data-lenis-prevent
            >
              <div className={styles.panelTop}>
                <Link
                  href={accountHref}
                  className={styles.panelIcon}
                  aria-label={session ? "Your dashboard" : "Log in"}
                  onClick={close}
                >
                  <AccountIcon />
                </Link>
                <Link href='/book' className={styles.panelBook} onClick={close}>
                  Book a ride
                </Link>
                <button
                  type='button'
                  className={styles.panelClose}
                  onClick={close}
                >
                  <span className={styles.closeIcon}>
                    <CloseIcon />
                  </span>
                  <span className={styles.panelCloseLabel}>Menu</span>
                </button>
              </div>

              <ul className={styles.menuList}>
                {MENU_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`${styles.menuLink} ${
                        isActive(l.href) ? styles.menuLinkActive : ""
                      }`}
                      onClick={close}
                    >
                      {l.text}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href='/corporate-accounts'
                className={styles.panelCta}
                onClick={close}
              >
                <span className={styles.panelCtaText}>
                  Open a corporate account
                </span>
                <CornerArrow className={styles.panelCtaArrow} />
              </Link>

              <div className={styles.account}>
                {status === "loading" ? null : session ? (
                  <>
                    <Link
                      href={dashboardFor(roles)}
                      className={styles.accountLink}
                      onClick={close}
                    >
                      Dashboard
                    </Link>
                    <button
                      type='button'
                      className={styles.accountLink}
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href='/login'
                      className={styles.accountLink}
                      onClick={close}
                    >
                      Log in
                    </Link>
                    <Link
                      href='/register'
                      className={styles.accountLink}
                      onClick={close}
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>

              <div className={styles.panelFooter}>
                <div className={styles.contactGroup}>
                  <span className={styles.contactLabel}>Email:</span>
                  <a
                    href={`mailto:${SITE.email.reservations}`}
                    className={styles.contactValue}
                  >
                    {SITE.email.reservations}
                  </a>
                  <a
                    href={`mailto:${SITE.email.support}`}
                    className={styles.contactValue}
                  >
                    {SITE.email.support}
                  </a>
                </div>

                <div className={styles.contactGroup}>
                  <span className={styles.contactLabel}>Dispatch 24/7:</span>
                  <a
                    href={`tel:${SITE.phone.tel}`}
                    className={styles.contactValue}
                  >
                    {SITE.phone.display}
                  </a>
                </div>

                {socials.length > 0 && (
                  <ul className={styles.socials}>
                    {socials.map((s) => (
                      <li key={s.key}>
                        <a
                          href={SITE.social[s.key]}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={styles.social}
                          aria-label={s.label}
                        >
                          {s.short}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </>,
          document.body,
        )}

      <NavProgress />
    </header>
  );
}
