import { SITE } from "@/config/site";

/**
 * Content for the three airport feature blocks. Used on /airports (all three)
 * and on each airport's own page (one each, with the heading as the H1).
 */
export type AirportFeatureItem = {
  /** Short label in the numbered list */
  label: string;
  /** Shown in the glass card when this item is selected */
  title: string;
  body: string;
};

export type AirportFeatureData = {
  id: "phx" | "aza" | "private";
  href: string;
  tag: string;
  heading: string;
  intro: string;
  items: AirportFeatureItem[];
  cta: { text: string; href: string };
  image: string;
  alt: string;
  /** Photo on the left instead of the right */
  reverse?: boolean;
  meta: { title: string; description: string };
};

/** Dispatch number from site config, so it stays in one place. */
const DISPATCH = SITE.phone;

export const AIRPORT_FEATURES: AirportFeatureData[] = [
  {
    id: "phx",
    href: "/airports/phx-sky-harbor",
    tag: "Phoenix Sky Harbor · PHX",
    heading: "Sky Harbor car service from the East Valley.",
    intro:
      "Mesa to Sky Harbor is about 25 minutes without traffic and 45 at rush hour. We plan around both and book your pickup so you're at the curb two hours before departure.",
    items: [
      {
        label: "Text us when you land",
        title: "Step 1 · Landed",
        body: "Text us when you land. We're already tracking your flight, so your chauffeur is on the way before the plane reaches the gate.",
      },
      {
        label: "Curbside or inside",
        title: "Step 2 · Meet",
        body: "Your chauffeur meets you curbside at your terminal, or inside at baggage claim with meet-and-greet and your name on a sign.",
      },
      {
        label: "On the 202",
        title: "Step 3 · Home",
        body: "Bags in the car, and you're on the 202. Water and a phone charger are waiting in the back seat.",
      },
    ],
    cta: { text: "Price your Sky Harbor ride", href: "/book" },
    image: "/images/skyHarbor.png",
    alt: "Phoenix Sky Harbor control tower against a blue sky",
    meta: {
      title: "Sky Harbor Car Service from Mesa | Flat Rate, 24/7",
      description:
        "Mesa to Sky Harbor is about 25 minutes without traffic and 45 at rush hour. Flat-rate car service with flight tracking and curbside or inside pickup.",
    },
  },
  {
    id: "aza",
    href: "/airports/phoenix-mesa-gateway",
    tag: "Phoenix-Mesa Gateway · AZA",
    heading: "Mesa Gateway rides, ten minutes from home.",
    intro:
      "Gateway is the East Valley's own airport, and many of its flights land late at night. We're there for every one of them, at the same flat rate.",
    items: [
      {
        label: "Late arrivals",
        title: "Late-night flights",
        body: "Many Gateway flights land late at night. We're there for every one of them, with no late-night surcharge.",
      },
      {
        label: "One arrivals curb",
        title: "Pickup note",
        body: "Gateway has a single arrivals curb. Your chauffeur waits in the cell lot and pulls up the moment you text.",
      },
      {
        label: "Same flat rate",
        title: "Flat rate",
        body: "The price you're quoted is the price you pay, whether you land at 2 p.m. or 2 a.m.",
      },
    ],
    cta: { text: "Price your Gateway ride", href: "/book" },
    image: "/images/mesaGateway.webp",
    alt: "Phoenix-Mesa Gateway Airport",
    reverse: true,
    meta: {
      title: "Mesa Gateway Airport Car Service | AZA Rides 24/7",
      description:
        "Gateway is the East Valley's own airport, and many of its flights land late at night. We're there for every one of them, at the same flat rate.",
    },
  },
  {
    id: "private",
    href: "/airports/private-aviation",
    tag: "Private aviation · FFZ · SDL",
    heading: "Tarmac to door, no waiting.",
    intro:
      "We meet private flights at Falcon Field (FFZ), Scottsdale Airport (SDL), Mesa Gateway's FBO and Sky Harbor's private terminal. Your chauffeur coordinates with the FBO, so the car is waiting when the stairs come down.",
    items: [
      {
        label: "FBO coordination",
        title: "FBO coordination",
        body: "We confirm ramp access and timing with the FBO ahead of time, so the car is waiting when the stairs come down.",
      },
      {
        label: "Tail-number tracking",
        title: "Tail-number tracking",
        body: "We follow your aircraft by tail number, so an early wheels-up or a late departure never leaves you waiting.",
      },
      {
        label: "Crew transport",
        title: "Crew transport",
        body: "Pilots and cabin crew get the same service: hotel runs, overnight layovers and early call times.",
      },
      {
        label: "Discreet vehicles",
        title: "Discreet, unmarked vehicles",
        body: "No logos, no signs. A clean black car and a chauffeur who knows when not to talk.",
      },
    ],
    cta: {
      text: `Call dispatch: ${DISPATCH.display}`,
      href: `tel:${DISPATCH.tel}`,
    },
    image: "/images/img4.jpg",
    alt: "Chauffeur waiting beside a black car on the tarmac",
    meta: {
      title: "Private Aviation Car Service | Falcon Field & Scottsdale Airport",
      description:
        "We meet private flights at Falcon Field, Scottsdale Airport, Mesa Gateway's FBO and Sky Harbor's private terminal. Call dispatch to arrange a ramp-side pickup.",
    },
  },
];

export const featureById = (id: AirportFeatureData["id"]) =>
  AIRPORT_FEATURES.find((f) => f.id === id)!;
