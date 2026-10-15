/**
 * Example services. One entry = one /services/[slug] page (plus the sitemap,
 * llms.txt, and the services hub). Replace per client.
 */
export type ServiceEntry = {
  slug: string;
  title: string;
  /** One sentence: who it's for and what it is */
  copy: string;
};

export const servicesData: readonly ServiceEntry[] = [
  { slug: "airport-transfers", title: "Airport Transfers", copy: "Flat-rate rides to and from the airport with flight tracking and meet-and-greet." },
  { slug: "corporate-travel", title: "Corporate Travel", copy: "Executive transportation for teams, clients, and roadshows, billed monthly." },
  { slug: "weddings-and-events", title: "Weddings & Events", copy: "Wedding party, guest shuttles, concerts, and game-day transportation." },
  { slug: "hourly-chauffeur", title: "Hourly Chauffeur", copy: "A chauffeur and vehicle at your disposal by the hour, with a minimum." },
  { slug: "late-night-rides", title: "Late-Night Rides", copy: "Rides at any hour of the night, with no late-night surcharge." },
];
