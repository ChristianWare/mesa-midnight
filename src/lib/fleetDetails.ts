/**
 * Content for each /fleet/[slug] page. Slugs match fleetData in src/lib/data.ts.
 * Rates are placeholders (same as the fleet cards): set your real numbers.
 */
export type FleetDetail = {
  slug: string;
  name: string;
  category: string;
  intro: string;
  cutout: string;
  features: string[];
  seats: number;
  bags: number;
  from: string;
  minimum: string;
  inside: { heading: string; body: string };
  bestFor: { heading: string; body: string };
  review: {
    quote: string;
    name: string;
    role: string;
    stats: { value: string; label: string }[];
  };
  /** Short name for buttons and the capacity track: "sedan", "SUV". */
  short: string;
  /** Third stat box beside passengers and bags. */
  extra: { label: string; value: string };
  specs: { label: string; value: string }[];
  /** Vehicle-specific policy lines, added after the shared ones. */
  policyNotes?: string[];
  /** Questions on the page, also sent as FAQPage schema. */
  faqs: { q: string; a: string }[];
  /** Book button text: "Book the sedan". */
  cta: string;
  meta: { title: string; description: string };
};

/** Lines every vehicle page shows under "Rates & booking". */
export const FLEET_RATE_NOTES = [
  "Airport transfers and point-to-point rides are a flat rate, quoted before you book",
  "Flight tracking on every airport ride, with up to 60 minutes of free wait after landing",
  "Up to three extra stops can be added to your route",
  "No surge pricing. Your fare is the total cost; tips are welcome, never expected",
];

/** Lines every vehicle page shows under "Policies". */
export const FLEET_POLICIES = [
  "Free changes and cancellation up to 24 hours before pickup",
  "Within 24 hours, the fee is one hour of service or 50% of the fare, whichever is less",
  "Small pets ride free in a carrier",
  "Every vehicle is cleaned before each trip",
];

/** Lifestyle photos, shared across vehicles until you have real ones. */
export const FLEET_GALLERY = {
  inside: [
    { src: "/images/img5.jpg", alt: "Chauffeur with a coffee beside the car" },
    { src: "/images/img9.jpg", alt: "Chauffeur's hands on the steering wheel" },
    // Wide frame: needs a landscape photo
    { src: "/images/img8.jpg", alt: "Passenger with a coffee in the back seat" },
  ],
  bestFor: [
    { src: "/images/img7.jpg", alt: "Traveler stepping out of the car at the airport" },
    { src: "/images/img4.jpg", alt: "Chauffeur waiting beside a black car" },
  ],
};

export const FLEET_DETAILS: FleetDetail[] = [
  {
    slug: "luxury-sedan",
    name: "Executive Sedan",
    category: "Sedan",
    intro:
      "Mercedes E-Class or similar. Quiet and quick, made for airport runs and solo business trips.",
    cutout: "/images/vehicles/mercedesSedan.png",
    features: ["Leather seats", "Wi-Fi", "Water & chargers", "Rear climate"],
    seats: 3,
    bags: 3,
    from: "$95/hr",
    minimum: "2 hrs",
    inside: {
      heading: "A quiet office on the way to the airport.",
      body: "Rear seats with real legroom, phone chargers in the armrest, cold water and Wi-Fi. Climate is set before you get in, and your chauffeur keeps the radio off unless you ask.",
    },
    bestFor: {
      heading: "Built for one or two travelers and a couple of bags.",
      body: "The sedan is our most-booked vehicle for Sky Harbor and Mesa Gateway runs, client pickups and dinners out. It's the easiest way to arrive on time without drawing attention.",
    },
    review: {
      quote:
        "I book the sedan for every early flight. It's spotless, it's early, and I get twenty quiet minutes to clear my inbox before I land anywhere.",
      name: "Megan T.",
      role: "Sales director, Gilbert",
      stats: [
        { value: "15 min", label: "Early, every time" },
        { value: "3", label: "Passengers" },
      ],
    },
    short: "sedan",
    extra: { label: "Seats", value: "Leather" },
    specs: [
      { label: "Model", value: "Mercedes E-Class or similar" },
      { label: "Cabin", value: "Leather, rear climate control" },
      { label: "Luggage", value: "3 suitcases in the trunk" },
      { label: "Ride", value: "Quiet, smooth and low to the curb" },
    ],
    faqs: [
      {
        q: "How many bags fit in the sedan?",
        a: "Three suitcases in the trunk, plus carry-ons in the cabin. Traveling with more than that? Book the Executive SUV.",
      },
      {
        q: "Can I work in the back seat?",
        a: "Yes. It's quiet, there's a charger in the armrest and Wi-Fi on board. Your chauffeur keeps the radio off unless you ask.",
      },
      {
        q: "Is the sedan a good fit for airport runs?",
        a: "It's our most-booked vehicle for Sky Harbor and Mesa Gateway. One to three travelers with normal luggage fit comfortably.",
      },
    ],
    cta: "Book the sedan",
    meta: {
      title: "Executive Sedan Service in Mesa | Mesa Midnight",
      description:
        "Mercedes E-Class or similar for up to 3 passengers. Airport runs and business trips at a flat rate, with Wi-Fi, water and chargers.",
    },
  },
  {
    slug: "executive-suv",
    name: "Executive SUV",
    category: "SUV",
    intro:
      "Chevrolet Suburban or similar. Room for six people and their luggage, our favorite for family airport runs.",
    cutout: "/images/vehicles/sub.png",
    features: ["Captain's chairs", "Wi-Fi", "Water & chargers", "Car seats on request"],
    seats: 6,
    bags: 6,
    from: "$115/hr",
    minimum: "2 hrs",
    inside: {
      heading: "Space for everyone, and everything they packed.",
      body: "Captain's chairs in the second row, a third row for the rest of the group and a cargo area that takes six full-size suitcases. Car seats are available when you book.",
    },
    bestFor: {
      heading: "Families, small teams and anyone with real luggage.",
      body: "The Suburban handles family vacations, golf trips and small corporate teams with ease. Everyone rides together, and nobody has to hold a bag on their lap.",
    },
    review: {
      quote:
        "Two kids, two car seats and five suitcases, and the driver had it all loaded before we'd finished saying hello. It made the start of our trip easy.",
      name: "The Alvarez family",
      role: "Queen Creek",
      stats: [
        { value: "6", label: "Passengers" },
        { value: "6", label: "Full-size bags" },
      ],
    },
    short: "SUV",
    extra: { label: "Rows", value: "3" },
    specs: [
      { label: "Model", value: "Chevrolet Suburban or similar" },
      { label: "Cabin", value: "Captain's chairs and a third row" },
      { label: "Luggage", value: "6 full-size suitcases" },
      { label: "Extras", value: "Car seats on request" },
    ],
    policyNotes: [
      "Car seats are available on request. Add them when you book so they're fitted before pickup.",
    ],
    faqs: [
      {
        q: "Can you provide car seats?",
        a: "Yes. Tell us the ages of the children when you book and the seats are installed before your chauffeur arrives.",
      },
      {
        q: "Will six people and six bags really fit?",
        a: "Yes. The Suburban seats six with room for six full-size suitcases behind the third row.",
      },
      {
        q: "What's the difference between this and the Luxury SUV?",
        a: "Same space and seating. The Luxury SUV is a Cadillac Escalade with a more premium cabin, for VIP guests and special occasions.",
      },
    ],
    cta: "Book the SUV",
    meta: {
      title: "Executive SUV Service in Mesa | Suburban Car Service",
      description:
        "Chevrolet Suburban or similar for up to 6 passengers and 6 bags. Family airport runs and small groups at a flat rate.",
    },
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    category: "Premium SUV",
    intro:
      "Cadillac Escalade or similar. Our premium SUV for VIP pickups, special occasions and executive guests.",
    cutout: "/images/vehicles/escalade.png",
    features: ["Premium leather", "Wi-Fi", "Ambient lighting", "Privacy glass"],
    seats: 6,
    bags: 6,
    from: "$135/hr",
    minimum: "2 hrs",
    inside: {
      heading: "The Escalade, detailed and ready.",
      body: "Premium leather, ambient lighting, privacy glass and a quiet cabin. It's the vehicle we send when the arrival matters as much as the ride.",
    },
    bestFor: {
      heading: "VIP guests, celebrations and nights that call for something more.",
      body: "Clients flying in for a big meeting, anniversary dinners, concerts and nights out in Scottsdale. Same flat rate, same early arrival, a bigger entrance.",
    },
    review: {
      quote:
        "We send the Escalade for every client we fly in. They notice the car, and then they notice the chauffeur was waiting before they reached the curb.",
      name: "Rachel K.",
      role: "Office manager, Tempe",
      stats: [
        { value: "6", label: "Passengers" },
        { value: "5★", label: "Average review" },
      ],
    },
    short: "Escalade",
    extra: { label: "Glass", value: "Privacy" },
    specs: [
      { label: "Model", value: "Cadillac Escalade or similar" },
      { label: "Cabin", value: "Premium leather, ambient lighting" },
      { label: "Luggage", value: "6 full-size suitcases" },
      { label: "Privacy", value: "Tinted rear glass" },
    ],
    faqs: [
      {
        q: "Is it always an Escalade?",
        a: "It's a Cadillac Escalade or a comparable premium SUV. If you need a specific vehicle for an event, mention it when you book.",
      },
      {
        q: "Can I book it for a client I'm flying in?",
        a: "Yes. Book in your name, add your guest as the passenger, and we'll send the pickup details to both of you.",
      },
      {
        q: "Is it good for a night out in Scottsdale?",
        a: "It's one of our most popular choices for dinners, concerts and nights out. Book it by the hour and keep it for the whole evening.",
      },
    ],
    cta: "Book the Escalade",
    meta: {
      title: "Luxury SUV Service in Mesa | Cadillac Escalade",
      description:
        "Cadillac Escalade or similar for up to 6 passengers. VIP pickups, special occasions and executive guests at a flat rate.",
    },
  },
  {
    slug: "executive-sprinter",
    name: "Executive Sprinter",
    category: "Van",
    intro:
      "Mercedes Sprinter with leather seats, standing headroom and space for the whole team's bags.",
    cutout: "/images/vehicles/sprinter.png",
    features: ["Standing headroom", "Wi-Fi", "USB at every seat", "Rear luggage bay"],
    seats: 14,
    bags: 12,
    from: "$165/hr",
    minimum: "3 hrs",
    inside: {
      heading: "Everyone in one vehicle, nobody squeezed.",
      body: "Leather seats for 14, standing headroom, USB charging at every seat and a rear luggage bay. Groups stay together instead of splitting across three cars.",
    },
    bestFor: {
      heading: "Teams, wedding parties and group airport runs.",
      body: "Crews heading to a job site, wedding guests moving between the hotel and the venue, and sports teams flying in for a tournament. One booking, one chauffeur, one arrival.",
    },
    review: {
      quote:
        "We moved 80 wedding guests between the resort and the venue with three Sprinters. Nobody waited.",
      name: "Alicia & Tom",
      role: "Scottsdale",
      stats: [
        { value: "14", label: "Passengers" },
        { value: "12", label: "Bags" },
      ],
    },
    short: "Sprinter",
    extra: { label: "Headroom", value: "Standing" },
    specs: [
      { label: "Model", value: "Mercedes Sprinter" },
      { label: "Seating", value: "14 leather seats" },
      { label: "Luggage", value: "Rear bay for 12 bags" },
      { label: "Charging", value: "USB at every seat" },
    ],
    faqs: [
      {
        q: "How many people fit in the Sprinter?",
        a: "Up to 14 passengers in leather seats, with a rear luggage bay for 12 bags.",
      },
      {
        q: "Can we book more than one Sprinter?",
        a: "Yes. For larger groups we run several Sprinters on the same schedule, like a wedding shuttle between the hotel and the venue.",
      },
      {
        q: "Is it good for group airport runs?",
        a: "It's built for it. Everyone rides together, the bags go in the back, and your chauffeur tracks the flight.",
      },
    ],
    cta: "Book the Sprinter",
    meta: {
      title: "Sprinter Van Service in Mesa | Group Transportation",
      description:
        "Mercedes Sprinter for up to 14 passengers and 12 bags. Group airport runs, teams and wedding guests at a flat rate.",
    },
  },
  {
    slug: "stretch-limo",
    name: "Stretch Limousine",
    category: "Limousine",
    intro:
      "A stretched Cadillac Escalade for weddings, proms and anniversaries, with room for ten.",
    cutout: "/images/vehicles/limo.png",
    features: ["Wraparound seating", "Bar area", "Mood lighting", "Sound system"],
    seats: 10,
    bags: 4,
    from: "$175/hr",
    minimum: "3 hrs",
    inside: {
      heading: "A celebration before you get there.",
      body: "Wraparound leather seating, a bar area, mood lighting and a sound system you control. Your chauffeur handles the route so the party can focus on the night.",
    },
    bestFor: {
      heading: "Weddings, proms, anniversaries and big birthdays.",
      body: "The limo is built for the moments people photograph. We plan the timing around your day, from the first pickup to the late-night drop-off.",
    },
    review: {
      quote:
        "The limo was the first thing our guests asked about. The chauffeur kept us on schedule all night without ever making it feel rushed.",
      name: "Jasmine & Andre",
      role: "Mesa",
      stats: [
        { value: "10", label: "Passengers" },
        { value: "3 hrs", label: "Minimum booking" },
      ],
    },
    short: "limo",
    extra: { label: "Bar", value: "On board" },
    specs: [
      { label: "Model", value: "Stretched Cadillac Escalade" },
      { label: "Seating", value: "Wraparound leather for 10" },
      { label: "Lighting", value: "Mood lighting" },
      { label: "Sound", value: "A sound system you control" },
    ],
    policyNotes: [
      "Alcohol on board is for guests 21 and over. Your chauffeur may ask for ID.",
    ],
    faqs: [
      {
        q: "Can we bring our own drinks?",
        a: "Guests 21 and over can bring their own drinks for the bar area. Your chauffeur may ask for ID.",
      },
      {
        q: "Do you do prom bookings?",
        a: "Yes. We plan the route and timing with parents ahead of time, and the bar area stays empty for under-21 groups.",
      },
      {
        q: "How far ahead should we book for a wedding?",
        a: "As early as you can, especially for spring and fall Saturdays. We plan the timing around your day once it's booked.",
      },
    ],
    cta: "Book the limo",
    meta: {
      title: "Stretch Limousine Service in Mesa | Weddings & Proms",
      description:
        "A stretched Cadillac Escalade for up to 10 passengers. Weddings, proms and anniversaries, planned around your timeline.",
    },
  },
  {
    slug: "party-bus",
    name: "Party Bus",
    category: "Party bus",
    intro:
      "Wraparound seating, lighting and sound for weddings, birthdays and big nights out.",
    cutout: "/images/vehicles/partyBusii.png",
    features: ["Lounge seating", "LED lighting", "Premium sound", "Coolers on board"],
    seats: 20,
    bags: 8,
    from: "$225/hr",
    minimum: "4 hrs",
    inside: {
      heading: "The night starts when the door closes.",
      body: "Lounge seating for 20, LED lighting, a premium sound system and coolers on board. Plug in your playlist and let your chauffeur handle every stop.",
    },
    bestFor: {
      heading: "Birthdays, bachelor and bachelorette parties, and game days.",
      body: "Keep the whole group together from the first stop to the last. No splitting rides, no waiting outside venues, and a safe trip home at the end of the night.",
    },
    review: {
      quote:
        "Twenty of us, four stops and not one person left behind. The chauffeur knew every venue and had us home safe at 2 a.m.",
      name: "Danielle R.",
      role: "Chandler",
      stats: [
        { value: "20", label: "Passengers" },
        { value: "4 hrs", label: "Minimum booking" },
      ],
    },
    short: "party bus",
    extra: { label: "Lighting", value: "LED" },
    specs: [
      { label: "Seating", value: "Lounge seating for 20" },
      { label: "Lighting", value: "LED lighting" },
      { label: "Sound", value: "Premium sound, plug in your playlist" },
      { label: "Coolers", value: "On board" },
    ],
    policyNotes: [
      "Alcohol on board is for guests 21 and over. Your chauffeur may ask for ID.",
    ],
    faqs: [
      {
        q: "Can we make several stops?",
        a: "Yes. Give us the plan when you book, and your chauffeur handles every stop and waits while you're inside.",
      },
      {
        q: "Can we play our own music?",
        a: "Yes. Plug in your phone and play your own playlist on the premium sound system.",
      },
      {
        q: "What's the minimum booking?",
        a: "Four hours. Most birthday and bachelor party bookings run four to six hours.",
      },
    ],
    cta: "Book the party bus",
    meta: {
      title: "Party Bus Rental in Mesa | Up to 20 Passengers",
      description:
        "Lounge seating, lighting and sound for up to 20 passengers. Birthdays, bachelor parties and game days across the Valley.",
    },
  },
  {
    slug: "coach-bus",
    name: "Coach Bus",
    category: "Motorcoach",
    intro:
      "A full-size motorcoach for conferences, tours and large groups, with room for fifty.",
    cutout: "/images/vehicles/bus.png",
    features: ["Reclining seats", "Restroom", "Wi-Fi", "Under-floor luggage"],
    seats: 50,
    bags: 50,
    from: "$295/hr",
    minimum: "5 hrs",
    inside: {
      heading: "Comfort for the long haul.",
      body: "Reclining seats, a restroom on board, Wi-Fi and a full under-floor luggage hold. It's built for long days and longer drives, like Phoenix to Sedona or Tucson.",
    },
    bestFor: {
      heading: "Conferences, tours, school trips and large events.",
      body: "Move an entire conference between the airport, the hotel and the venue, or take a group on a day trip across Arizona. One vehicle, one schedule, everyone together.",
    },
    review: {
      quote:
        "We ran shuttles for a three-day conference with two coaches. Every departure left on the minute, and our attendees never had to think about it.",
      name: "Marcus L.",
      role: "Event planner, Phoenix",
      stats: [
        { value: "50", label: "Passengers" },
        { value: "50", label: "Bags" },
      ],
    },
    short: "coach",
    extra: { label: "Restroom", value: "On board" },
    specs: [
      { label: "Class", value: "Full-size motorcoach" },
      { label: "Seating", value: "50 reclining seats" },
      { label: "Luggage", value: "Under-floor luggage hold" },
      { label: "On board", value: "Restroom and Wi-Fi" },
    ],
    faqs: [
      {
        q: "Can the coach run conference shuttles all day?",
        a: "Yes. We build a shuttle schedule between the airport, hotels and the venue, and can run several coaches on it.",
      },
      {
        q: "Do you do day trips outside the Valley?",
        a: "Yes. Sedona, Tucson and the Grand Canyon are common trips. The coach is built for long drives.",
      },
      {
        q: "Is there a restroom on board?",
        a: "Yes, plus Wi-Fi and reclining seats.",
      },
    ],
    cta: "Book the coach",
    meta: {
      title: "Coach Bus Charter in Mesa | Conferences & Large Groups",
      description:
        "A full-size motorcoach for up to 50 passengers. Conferences, tours and large groups across Arizona.",
    },
  },
];

export const fleetDetailBySlug = (slug: string) =>
  FLEET_DETAILS.find((v) => v.slug === slug);
