/**
 * Content for each /services/[slug] page. Slugs match src/lib/services.ts.
 * Photos are placeholders from /public/images; swap any time.
 */
export type ServiceStep = { title: string; body: string };

export type ServiceDetail = {
  slug: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
  stat: { value: string; label: string };
  overview: string[];
  approach: string;
  steps: ServiceStep[];
  deliver: string[];
  gallery: { src: string; alt: string }[];
  meta: { title: string; description: string };
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    intro:
      "Flat-rate rides to and from Sky Harbor, Mesa Gateway and the private terminals, with your flight tracked from takeoff.",
    heroImage: "/images/img7.jpg",
    heroAlt: "Traveler stepping out of a black car at the airport",
    tags: ["Flight tracking", "60 min free wait", "Meet & greet", "Curbside or inside"],
    stat: { value: "60 min", label: "Free wait after landing" },
    overview: [
      "An airport ride should be the one part of the trip you never think about. We track your flight, adjust the pickup to match, and have your chauffeur at the curb or at baggage claim when you land.",
      "Every ride is quoted up front. Delays, early arrivals and late-night landings don't change the price.",
    ],
    approach:
      "We plan airport rides backwards from your flight. For departures, we look at the time of day, traffic on the 202 and the 60, and how busy your terminal usually is, then set a pickup that gets you to the curb with time to spare. For arrivals, we follow your flight from the moment it leaves. If it lands early, your chauffeur is already there. If it's delayed, we move the pickup so you don't have to call anyone. Inside pickups include meet-and-greet at baggage claim with your name on a sign, and your chauffeur handles every bag. Sky Harbor, Mesa Gateway, Falcon Field and Scottsdale Airport are all covered, along with the private terminals around them.",
    steps: [
      { title: "Book &\nConfirm", body: "Enter your flight and pickup address. You see the flat rate before you book." },
      { title: "Track &\nAdjust", body: "We follow your flight and move the pickup if it lands early or late." },
      { title: "Meet &\nGreet", body: "Your chauffeur meets you curbside or inside at baggage claim with a sign." },
      { title: "Bags In &\nHome", body: "Bags loaded, water and a charger in the back, and you're on your way." },
    ],
    deliver: [
      "Arrivals and departures at Sky Harbor, Mesa Gateway, Falcon Field and Scottsdale Airport, in a sedan, SUV or Sprinter sized to your group and luggage.",
      "Every booking includes flight tracking, 60 free minutes after landing and a chauffeur who knows the terminal layout. Business travelers can bill rides to a corporate account, and families can add car seats when booking.",
    ],
    gallery: [
      { src: "/images/img4.jpg", alt: "Chauffeur waiting beside a black car" },
      { src: "/images/mesaGateway.webp", alt: "Phoenix-Mesa Gateway Airport" },
    ],
    meta: {
      title: "Airport Transfers in Mesa | Flat-Rate Airport Car Service",
      description:
        "Flat-rate airport rides to and from Sky Harbor, Mesa Gateway and the private terminals, with flight tracking and 60 free minutes after landing.",
    },
  },
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    intro:
      "Executive transportation for teams, clients and roadshows, with one invoice at the end of the month.",
    heroImage: "/images/img8.jpg",
    heroAlt: "Executive working in the back seat of a black car",
    tags: ["Monthly billing", "Client pickups", "Roadshows", "Account manager"],
    stat: { value: "1", label: "Invoice a month" },
    overview: [
      "Corporate travel runs on reliability. We give your team and your clients the same early, quiet, spotless ride every time, and we keep the paperwork out of your way.",
      "Rides are billed to your company account and rolled into one monthly invoice, with every trip itemized by rider and cost center.",
    ],
    approach:
      "We start by setting up your account the way your office actually works: who can book, which cards or cost centers to bill, and who gets the receipts. From there, your team books online or through dispatch, and every ride lands on the same monthly invoice. For client visits and roadshows, we assign chauffeurs who know your schedule and your guests, plan the day around meetings rather than the clock, and keep a backup vehicle close by when the stakes are high. Your account manager is one phone call away for changes, and dispatch is open around the clock for everything else.",
    steps: [
      { title: "Account\nSetup", body: "We set up riders, billing and approvals to match how your office works." },
      { title: "Book &\nAssign", body: "Your team books online or by phone. We assign a regular chauffeur." },
      { title: "Ride &\nTrack", body: "Every trip is tracked live, with updates for assistants and travel managers." },
      { title: "One\nInvoice", body: "Trips roll into one itemized invoice at the end of the month." },
    ],
    deliver: [
      "Executive airport runs, client pickups, multi-stop roadshows and off-site meetings, in sedans, SUVs and Sprinters.",
      "Each account comes with monthly billing, itemized receipts by rider or cost center, and a dedicated account manager. Teams that book often get priority scheduling and the same small group of chauffeurs who know their routines.",
    ],
    gallery: [
      { src: "/images/img6.jpg", alt: "Executive on the phone beside a black car" },
      { src: "/images/img5.jpg", alt: "Chauffeur waiting on the tarmac" },
    ],
    meta: {
      title: "Corporate Car Service in Mesa & Phoenix | Monthly Billing",
      description:
        "Executive transportation for teams, clients and roadshows across the Valley, with one itemized invoice at the end of the month.",
    },
  },
  {
    slug: "hourly-chauffeur",
    title: "Hourly Chauffeur",
    intro:
      "A chauffeur and vehicle at your disposal by the hour, for back-to-back meetings, errands or a night out.",
    heroImage: "/images/img9.jpg",
    heroAlt: "Chauffeur's hands on the steering wheel",
    tags: ["2-hour minimum", "Multiple stops", "Wait time included"],
    stat: { value: "2 hr", label: "Minimum booking" },
    overview: [
      "Some days don't fit into point-to-point rides. Book a chauffeur by the hour and the car is yours: it waits while you're inside and goes wherever you need next.",
      "You pay one hourly rate with a two-hour minimum. Stops and wait time are included.",
    ],
    approach:
      "Hourly bookings start with a quick plan: where you're going, roughly how long you'll be at each stop, and anything your chauffeur should know. From there, the schedule is yours to change. Add a stop, stay longer at dinner or cut the day short, and your chauffeur adjusts. They park close, keep the car cool, and are at the door when you walk out. It works for real-estate tours, shopping days, back-to-back meetings, wine tastings and nights out, anywhere you'd rather not deal with parking or call a new ride every hour.",
    steps: [
      { title: "Plan the\nDay", body: "Tell us your stops and timing. We suggest the right vehicle and hours." },
      { title: "Pick Up &\nGo", body: "Your chauffeur arrives early and takes you to the first stop." },
      { title: "Wait &\nAdjust", body: "The car waits while you're inside. Add stops or stay longer anytime." },
      { title: "Drop Off &\nDone", body: "Home at the end of the day, billed at the hourly rate you were quoted." },
    ],
    deliver: [
      "Hourly service in any vehicle in the fleet, from an executive sedan for one to a Sprinter for the whole team.",
      "Popular uses include property tours, shopping and errands, multi-stop business days, nights out in Scottsdale and wine country trips. Extra hours are added at the same rate, so a long day never comes with a surprise.",
    ],
    gallery: [
      { src: "/images/img1.png", alt: "Black SUV parked in the desert at sunrise" },
      { src: "/images/img2.png", alt: "Black SUV driving a desert highway" },
    ],
    meta: {
      title: "Hourly Chauffeur Service in Mesa | By-the-Hour Car Service",
      description:
        "A chauffeur and vehicle at your disposal by the hour, with a two-hour minimum. Stops and wait time are included.",
    },
  },
  {
    slug: "weddings-and-events",
    title: "Weddings & Events",
    intro:
      "Wedding parties, guest shuttles, concerts and game days, planned around your timeline down to the minute.",
    heroImage: "/images/img10.jpg",
    heroAlt: "Bride holding a bouquet in the back of a car",
    tags: ["Guest shuttles", "Up to 14 per Sprinter", "Timeline planning"],
    stat: { value: "14", label: "Guests per Sprinter" },
    overview: [
      "On a wedding day, the schedule is everything. We build the transportation plan around your timeline, so the wedding party, family and guests are always where they need to be.",
      "From a single limousine for the couple to a fleet of Sprinters for guest shuttles, every vehicle is cleaned, stocked and on time.",
    ],
    approach:
      "We plan event transportation the way a coordinator would. We start with your timeline: hotel pickups, photos, the ceremony, the reception and the late-night send-off. From there we work out how many vehicles you need, where they wait between runs and how long each leg takes on the day. A lead chauffeur stays in touch with your planner so changes are handled on the spot. The same approach works for concerts, game days, galas and corporate events, anywhere a large group needs to arrive together and leave without waiting.",
    steps: [
      { title: "Timeline &\nPlan", body: "We map every pickup and drop-off against your event timeline." },
      { title: "Fleet &\nRoutes", body: "We size the fleet, plan staging spots and time each run." },
      { title: "Day-of\nCoordination", body: "A lead chauffeur stays in touch with your planner all day." },
      { title: "Send-off &\nHome", body: "Late-night runs get every guest back to their hotel safely." },
    ],
    deliver: [
      "Transportation for the couple, the wedding party and guests, plus concerts, game days, galas and corporate events across the Valley.",
      "Choose from the stretch limousine, Sprinters for up to 14 guests, the party bus for 20 or a coach for larger groups. Every event includes timeline planning, a lead chauffeur on the day and vehicles detailed before every run.",
    ],
    gallery: [
      { src: "/images/vehicles/cadi.jpg", alt: "Black Cadillac Escalade on a wet road" },
      { src: "/images/vehicles/cadi2.jpg", alt: "Black Cadillac Escalade outside a stone house" },
    ],
    meta: {
      title: "Wedding & Event Transportation in Mesa | Limos & Sprinters",
      description:
        "Wedding parties, guest shuttles, concerts and game days, planned around your timeline with limos, Sprinters and party buses.",
    },
  },
  {
    slug: "late-night-rides",
    title: "Late-Night Rides",
    intro:
      "Rides at any hour, with no late-night surcharge and a dispatcher who actually picks up the phone.",
    heroImage: "/images/img11.jpg",
    heroAlt: "Passenger smiling out of a car window at night",
    tags: ["24/7 dispatch", "No surcharge", "Same flat rate"],
    stat: { value: "$0", label: "Late-night surcharge" },
    overview: [
      "Mesa Midnight started because of the 4 a.m. calls nobody answered. Late-night rides are still the heart of what we do.",
      "Day or night, the price is the same flat rate, and a real dispatcher answers the phone at any hour.",
    ],
    approach:
      "Late-night rides get the same planning as any other booking, with a few extra checks. Your chauffeur arrives early and waits somewhere well lit. They text when they're outside so you're not standing on a curb, and they wait until you're inside before they pull away. If plans change at 1 a.m., call dispatch and a person answers. Early-morning airport runs, late shifts, nights out and long drives home after a delayed flight are all handled at the same flat rate, with no surge for the hour or the holiday.",
    steps: [
      { title: "Book\nAnytime", body: "Book online or call dispatch at any hour. A real person answers." },
      { title: "Early\nArrival", body: "Your chauffeur arrives early and texts when they're outside." },
      { title: "Safe\nRide", body: "A clean, quiet car and a chauffeur who knows the late-night roads." },
      { title: "Inside &\nDone", body: "Your chauffeur waits until you're inside before driving away." },
    ],
    deliver: [
      "Rides between 10 p.m. and 6 a.m., seven days a week, including holidays, in any vehicle in the fleet.",
      "Common bookings include red-eye flights, early airport runs, late shifts, nights out in Scottsdale and Tempe, and rides home after a delayed flight. Every one is quoted at the same flat rate as a daytime ride.",
    ],
    gallery: [
      { src: "/images/vehicles/heroiii.jpg", alt: "Black Chevrolet Suburban on an open lot" },
      { src: "/images/vehicles/heroiv.jpg", alt: "Black Chevrolet Suburban on a roadside" },
    ],
    meta: {
      title: "Late-Night Car Service in Mesa | 24/7, No Surcharge",
      description:
        "Rides at any hour with no late-night surcharge. A real dispatcher answers 24/7, and the price is the same flat rate day or night.",
    },
  },
];

export const serviceDetailBySlug = (slug: string) =>
  SERVICE_DETAILS.find((s) => s.slug === slug);
