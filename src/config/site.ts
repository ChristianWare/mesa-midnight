/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file you edit for every new client.
 * ───────────────────────────────────────────────────────────────────────────
 *  Every brand-specific value in the codebase reads from here: page titles,
 *  meta descriptions, JSON-LD, transactional emails, PDFs, the nav, the
 *  footer, the legal pages, the PWA manifest, llms.txt.
 *
 *  Values the OPERATOR can change later without a deploy (dispatch phone,
 *  office hours, social links, Stripe keys, logo upload) live in
 *  Admin → Company Settings and fall back to these values until filled in.
 *
 *  Search the repo for `SITE.` to see where each value lands.
 */

export type PartnerLink = {
  /** Menu label, e.g. "Grand Hotel & Spa" */
  text: string;
  /** Route of the partner landing page, e.g. "/partners/grand-hotel" */
  href: string;
  /** One-line description shown under the label in the dropdown */
  copy: string;
};

export interface SiteConfig {
  /** Display name used everywhere: "Skyline Black Car" */
  name: string;
  /** Legal entity for invoices, checks, terms: "Skyline Black Car LLC" */
  legalName: string;
  /** URL-safe id used for storage folders and cache keys: "skyline-black-car" */
  slug: string;
  /** Short positioning line used in titles and the manifest */
  tagline: string;
  /** Default meta description (≤160 chars) */
  description: string;
  /** Canonical origin, no trailing slash. Decides www vs apex (see next.config.ts) */
  url: string;
  /** Derived from url — do not edit */
  domain: string;
  email: {
    info: string;
    reservations: string;
    support: string;
    admin: string;
    corporate: string;
    noReply: string;
  };
  phone: {
    /** Human format shown on the site: "(480) 555-0100" */
    display: string;
    /** E.164 for tel: links and JSON-LD: "+14805550100" */
    tel: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  /** IANA timezone the business operates in */
  timezone: string;
  market: {
    /** Primary metro: "Phoenix" */
    city: string;
    /** "Arizona" */
    state: string;
    /** "AZ" */
    stateCode: string;
    /** How locals refer to the area: "the Valley" */
    region: string;
  };
  owner: {
    name: string;
    title: string;
  };
  /** Year founded, shown in about copy and JSON-LD */
  founded: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    google: string;
    yelp: string;
  };
  /** Paths under /public */
  logo: string;
  ogImage: string;
  /** PWA theme color */
  themeColor: string;
  /**
   * Demo / portfolio site: shows a "this is a demo" bar on every page and
   * asks search engines not to index the site. Set to false for a real client.
   */
  demo: boolean;
  nav: {
    /** Partner landing pages. Empty array hides the Partners menu. */
    partners: PartnerLink[];
  };
}

const url = "https://www.mesamidnighttransport.com";

export const SITE: SiteConfig = {
  name: "Mesa Midnight",
  legalName: "Mesa Midnight Transportation LLC",
  slug: "mesa-midnight",
  tagline: "Late-night and executive black car service in Mesa, Arizona",
  description:
    "Mesa Midnight is a 24/7 black car service in Mesa and the East Valley. Flat-rate Sky Harbor transfers, executive travel and event rides. Book online.",
  url,
  domain: new URL(url).host,
  email: {
    info: "info@mesamidnighttransport.com",
    reservations: "reservations@mesamidnighttransport.com",
    support: "support@mesamidnighttransport.com",
    admin: "admin@mesamidnighttransport.com",
    corporate: "corporate@mesamidnighttransport.com",
    noReply: "no-reply@mesamidnighttransport.com",
  },
  phone: {
    display: "(480) 555-0147",
    tel: "+14805550147",
  },
  address: {
    street: "1250 W Main St, Suite 210",
    city: "Mesa",
    state: "AZ",
    zip: "85201",
    country: "US",
  },
  timezone: "America/Phoenix",
  market: {
    city: "Mesa",
    state: "Arizona",
    stateCode: "AZ",
    region: "the East Valley",
  },
  owner: {
    name: "Daniel Ortega",
    title: "Founder & Owner",
  },
  founded: "2019",
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    google: "",
    yelp: "",
  },
  logo: "/brand/logo.png",
  ogImage: "/brand/og-image.png",
  themeColor: "#0B1020",
  demo: true,
  nav: {
    partners: [],
  },
};