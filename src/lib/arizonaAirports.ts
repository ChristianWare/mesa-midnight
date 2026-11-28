/**
 * Arizona airports for /airports. Hub page only: none of these get a page of
 * their own (the designed airport pages live in airportFeatures.ts).
 *
 * AIRPORTS_SERVED: the airports we drive every day, shown as cards.
 *
 * ARIZONA_AIRPORTS: Arizona's public airports in the FAA's commercial,
 * reliever and general aviation categories, shown as tables. Source: FAA
 * roles and calendar-year 2024 enplanements (passenger boardings), via the
 * Wikipedia "List of airports in Arizona". Military fields are left out.
 * Drive times are rough, from downtown Mesa without traffic: for
 * orientation, not quotes.
 */

export type AirportServed = {
  code: string;
  name: string;
  /** How riders say it. */
  shortName: string;
  /** Two short facts under the name. */
  meta: [string, string];
  copy: string;
  /** The airport's own page, where there is one. */
  href?: string;
};

export const AIRPORTS_SERVED: AirportServed[] = [
  {
    code: "PHX",
    name: "Phoenix Sky Harbor International Airport",
    shortName: "Sky Harbor",
    meta: ["Terminals 3 and 4", "About 25 min from Mesa"],
    copy: "Arizona's main airport and our most-driven route. Flight tracking, curbside or inside pickup, and 60 minutes of free wait after you land.",
    href: "/airports/phx-sky-harbor",
  },
  {
    code: "AZA",
    name: "Phoenix–Mesa Gateway Airport",
    shortName: "Mesa Gateway",
    meta: ["Low-cost airlines", "10–20 min from Mesa"],
    copy: "The East Valley's own airport. Many flights land late at night, and we're there for every one of them at the same flat rate.",
    href: "/airports/phoenix-mesa-gateway",
  },
  {
    code: "FFZ",
    name: "Falcon Field Airport",
    shortName: "Falcon Field",
    meta: ["Private aviation", "About 10 min from Mesa"],
    copy: "Mesa's private and charter airport in the north of the city. We coordinate with the FBO and meet you at the aircraft.",
    href: "/airports/private-aviation",
  },
  {
    code: "SDL",
    name: "Scottsdale Airport",
    shortName: "Scottsdale",
    meta: ["Private and charter", "About 25 min from Mesa"],
    copy: "The Valley's busiest private jet airport, with several FBOs. Give us your tail number and the car is waiting when the stairs come down.",
    href: "/airports/scottsdale-airport",
  },
];

export type DirectoryGroup = "commercial" | "reliever" | "regional";

export type ArizonaAirport = {
  name: string;
  city: string;
  faa: string;
  iata?: string;
  icao?: string;
  group: DirectoryGroup;
  /** The FAA category, in words. */
  role: string;
  /** Calendar-year 2024 boardings, where the FAA records any. */
  enplanements?: number;
  /** Rough drive from downtown Mesa. */
  drive?: string;
  /** One line: what it is, or what we do there. */
  note?: string;
};

export const DIRECTORY_GROUPS: {
  key: DirectoryGroup;
  heading: string;
  blurb: string;
}[] = [
  {
    key: "commercial",
    heading: "Commercial airports",
    blurb:
      "The airports with airline service. Sky Harbor carries most of Arizona's passengers, with Tucson and Mesa Gateway well behind it.",
  },
  {
    key: "reliever",
    heading: "Private aviation and reliever airports",
    blurb:
      "No airline counters, but this is where private jets, charters and flight schools fly from, around Phoenix and Tucson. We meet these flights at the FBO.",
  },
  {
    key: "regional",
    heading: "Regional and general aviation airports",
    blurb:
      "The rest of Arizona's public airports: county fields, tribal airports and Grand Canyon air tour bases. We drive to the ones near the Valley and quote long-distance rides to the rest.",
  },
];

export const ARIZONA_AIRPORTS: ArizonaAirport[] = [
  /* ── Commercial ── */
  {
    name: "Phoenix Sky Harbor International Airport",
    city: "Phoenix",
    faa: "PHX",
    iata: "PHX",
    icao: "KPHX",
    group: "commercial",
    role: "Commercial, large hub",
    enplanements: 25595723,
    drive: "About 25 min",
    note: "Arizona's main airport. Our most-driven route.",
  },
  {
    name: "Tucson International Airport",
    city: "Tucson",
    faa: "TUS",
    iata: "TUS",
    icao: "KTUS",
    group: "commercial",
    role: "Commercial, small hub",
    enplanements: 1959789,
    drive: "About 1 hr 45 min",
    note: "Southern Arizona's main airport. Rides by quote.",
  },
  {
    name: "Phoenix–Mesa Gateway Airport",
    city: "Mesa",
    faa: "IWA",
    iata: "AZA",
    icao: "KIWA",
    group: "commercial",
    role: "Commercial, small hub",
    enplanements: 978296,
    drive: "About 20 min",
    note: "The East Valley's airport. We drive it every day.",
  },
  {
    name: "Yuma International Airport",
    city: "Yuma",
    faa: "NYL",
    iata: "YUM",
    icao: "KNYL",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 85227,
    drive: "About 3 hr",
    note: "Shares its runways with Marine Corps Air Station Yuma.",
  },
  {
    name: "Flagstaff Pulliam Airport",
    city: "Flagstaff",
    faa: "FLG",
    iata: "FLG",
    icao: "KFLG",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 79081,
    drive: "About 2 hr 15 min",
  },
  {
    name: "Prescott Regional Airport",
    city: "Prescott",
    faa: "PRC",
    iata: "PRC",
    icao: "KPRC",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 25316,
    drive: "About 2 hr",
  },
  {
    name: "Page Municipal Airport",
    city: "Page",
    faa: "PGA",
    iata: "PGA",
    icao: "KPGA",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 22400,
    note: "Lake Powell and Antelope Canyon.",
  },
  {
    name: "Show Low Regional Airport",
    city: "Show Low",
    faa: "SOW",
    iata: "SOW",
    icao: "KSOW",
    group: "commercial",
    role: "Commercial, non-primary",
    enplanements: 3655,
    drive: "About 3 hr",
  },

  /* ── Private aviation and reliever ── */
  {
    name: "Scottsdale Airport",
    city: "Scottsdale",
    faa: "SDL",
    iata: "SCF",
    icao: "KSDL",
    group: "reliever",
    role: "Reliever",
    enplanements: 46524,
    drive: "About 25 min",
    note: "The Valley's busiest private jet airport. We meet flights at the FBO.",
  },
  {
    name: "Falcon Field Airport",
    city: "Mesa",
    faa: "FFZ",
    iata: "MSC",
    icao: "KFFZ",
    group: "reliever",
    role: "Reliever",
    enplanements: 17,
    drive: "About 10 min",
    note: "Mesa's private aviation airport. We drive it every day.",
  },
  {
    name: "Chandler Municipal Airport",
    city: "Chandler",
    faa: "CHD",
    iata: "CHD",
    icao: "KCHD",
    group: "reliever",
    role: "Reliever",
    enplanements: 42,
    drive: "About 20 min",
  },
  {
    name: "Phoenix Deer Valley Airport",
    city: "Phoenix",
    faa: "DVT",
    iata: "DVT",
    icao: "KDVT",
    group: "reliever",
    role: "Reliever",
    enplanements: 102,
    drive: "About 40 min",
  },
  {
    name: "Glendale Municipal Airport",
    city: "Glendale",
    faa: "GEU",
    icao: "KGEU",
    group: "reliever",
    role: "Reliever",
    enplanements: 36,
    drive: "About 40 min",
  },
  {
    name: "Phoenix Goodyear Airport",
    city: "Goodyear",
    faa: "GYR",
    iata: "GYR",
    icao: "KGYR",
    group: "reliever",
    role: "Reliever",
    enplanements: 8,
    drive: "About 45 min",
  },
  {
    name: "Marana Regional Airport",
    city: "Marana",
    faa: "AVQ",
    iata: "AVW",
    icao: "KAVQ",
    group: "reliever",
    role: "Reliever",
    enplanements: 14,
    drive: "About 1 hr 45 min",
  },
  {
    name: "Ryan Airfield",
    city: "Tucson",
    faa: "RYN",
    iata: "RYN",
    icao: "KRYN",
    group: "reliever",
    role: "Reliever",
    drive: "About 2 hr",
  },

  /* ── Regional and general aviation ── */
  {
    name: "Grand Canyon National Park Airport",
    city: "Grand Canyon",
    faa: "GCN",
    iata: "GCN",
    icao: "KGCN",
    group: "regional",
    role: "General aviation",
    enplanements: 120222,
    note: "The South Rim's airport and its air tours. Rides by quote.",
  },
  {
    name: "Laughlin/Bullhead International Airport",
    city: "Bullhead City",
    faa: "IFP",
    iata: "IFP",
    icao: "KIFP",
    group: "regional",
    role: "General aviation",
    enplanements: 68837,
  },
  {
    name: "Grand Canyon West Airport",
    city: "Peach Springs",
    faa: "1G4",
    iata: "GCW",
    group: "regional",
    role: "General aviation",
    enplanements: 29597,
    note: "The Skywalk side of the canyon.",
  },
  {
    name: "Kingman Airport",
    city: "Kingman",
    faa: "IGM",
    iata: "IGM",
    icao: "KIGM",
    group: "regional",
    role: "General aviation",
    enplanements: 209,
  },
  {
    name: "Sierra Vista Municipal Airport",
    city: "Sierra Vista",
    faa: "FHU",
    iata: "FHU",
    icao: "KFHU",
    group: "regional",
    role: "General aviation",
    enplanements: 178,
    note: "Shared with Libby Army Airfield at Fort Huachuca.",
  },
  {
    name: "Colorado City Municipal Airport",
    city: "Colorado City",
    faa: "AZC",
    icao: "KAZC",
    group: "regional",
    role: "General aviation",
    enplanements: 96,
  },
  {
    name: "Bagdad Airport",
    city: "Bagdad",
    faa: "E51",
    group: "regional",
    role: "General aviation",
    enplanements: 79,
  },
  {
    name: "Greenlee County Airport",
    city: "Clifton",
    faa: "CFT",
    icao: "KCFT",
    group: "regional",
    role: "General aviation",
    enplanements: 68,
  },
  {
    name: "Safford Regional Airport",
    city: "Safford",
    faa: "SAD",
    icao: "KSAD",
    group: "regional",
    role: "General aviation",
    enplanements: 63,
  },
  {
    name: "Sedona Airport",
    city: "Sedona",
    faa: "SEZ",
    icao: "KSEZ",
    group: "regional",
    role: "General aviation",
    enplanements: 62,
    drive: "About 2 hr",
    note: "On a mesa above town. Rides by quote.",
  },
  {
    name: "Lake Havasu City Airport",
    city: "Lake Havasu City",
    faa: "HII",
    icao: "KHII",
    group: "regional",
    role: "General aviation",
    enplanements: 17,
  },
  {
    name: "San Carlos Apache Airport",
    city: "Globe",
    faa: "P13",
    group: "regional",
    role: "General aviation",
    enplanements: 8,
    drive: "About 1 hr 30 min",
  },
  {
    name: "Payson Airport",
    city: "Payson",
    faa: "PAN",
    icao: "KPAN",
    group: "regional",
    role: "General aviation",
    enplanements: 3,
    drive: "About 1 hr 30 min",
  },
  {
    name: "Casa Grande Municipal Airport",
    city: "Casa Grande",
    faa: "CGZ",
    icao: "KCGZ",
    group: "regional",
    role: "General aviation",
    enplanements: 2,
    drive: "About 50 min",
  },
  {
    name: "Wickenburg Municipal Airport",
    city: "Wickenburg",
    faa: "E25",
    group: "regional",
    role: "General aviation",
    enplanements: 2,
    drive: "About 1 hr 15 min",
  },
  {
    name: "Ak-Chin Regional Airport",
    city: "Maricopa",
    faa: "A39",
    group: "regional",
    role: "General aviation",
    drive: "About 45 min",
  },
  {
    name: "Coolidge Municipal Airport",
    city: "Coolidge",
    faa: "P08",
    group: "regional",
    role: "General aviation",
    drive: "About 50 min",
  },
  {
    name: "Eloy Municipal Airport",
    city: "Eloy",
    faa: "E60",
    group: "regional",
    role: "General aviation",
    drive: "About 1 hr",
  },
  {
    name: "Buckeye Municipal Airport",
    city: "Buckeye",
    faa: "BXK",
    icao: "KBXK",
    group: "regional",
    role: "General aviation",
    drive: "About 1 hr",
  },
  {
    name: "Gila Bend Municipal Airport",
    city: "Gila Bend",
    faa: "E63",
    group: "regional",
    role: "General aviation",
    drive: "About 1 hr 15 min",
  },
  {
    name: "Pinal Airpark",
    city: "Marana",
    faa: "MZJ",
    icao: "KMZJ",
    group: "regional",
    role: "General aviation",
    drive: "About 1 hr 30 min",
  },
  {
    name: "San Manuel Airport",
    city: "San Manuel",
    faa: "E77",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Cottonwood Airport",
    city: "Cottonwood",
    faa: "P52",
    group: "regional",
    role: "General aviation",
    drive: "About 1 hr 50 min",
  },
  {
    name: "Eric Marcus Municipal Airport",
    city: "Ajo",
    faa: "P01",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Benson Municipal Airport",
    city: "Benson",
    faa: "E95",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Bisbee Municipal Airport",
    city: "Bisbee",
    faa: "P04",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Bisbee Douglas International Airport",
    city: "Douglas",
    faa: "DUG",
    icao: "KDUG",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Cochise County Airport",
    city: "Willcox",
    faa: "P33",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Nogales International Airport",
    city: "Nogales",
    faa: "OLS",
    icao: "KOLS",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Avi Suquilla Airport",
    city: "Parker",
    faa: "P20",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "H.A. Clark Memorial Field",
    city: "Williams",
    faa: "CMR",
    icao: "KCMR",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Holbrook Municipal Airport",
    city: "Holbrook",
    faa: "P14",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Winslow–Lindbergh Regional Airport",
    city: "Winslow",
    faa: "INW",
    icao: "KINW",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Taylor Airport",
    city: "Taylor",
    faa: "TYL",
    icao: "KTYL",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Springerville Municipal Airport",
    city: "Springerville",
    faa: "JTC",
    icao: "KJTC",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "St. Johns Industrial Air Park",
    city: "St. Johns",
    faa: "SJN",
    icao: "KSJN",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Whiteriver Airport",
    city: "Whiteriver",
    faa: "E24",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Cibecue Airport",
    city: "Cibecue",
    faa: "Z95",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Window Rock Airport",
    city: "Window Rock",
    faa: "RQE",
    icao: "KRQE",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Chinle Municipal Airport",
    city: "Chinle",
    faa: "E91",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Kayenta Airport",
    city: "Kayenta",
    faa: "0V7",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Tuba City Airport",
    city: "Tuba City",
    faa: "T03",
    group: "regional",
    role: "General aviation",
  },
  {
    name: "Polacca Airport",
    city: "Polacca",
    faa: "P10",
    group: "regional",
    role: "General aviation",
  },
];

export const AIRPORT_COUNT = ARIZONA_AIRPORTS.length;

const count = (g: DirectoryGroup) =>
  ARIZONA_AIRPORTS.filter((a) => a.group === g).length;

export const AIRPORT_COUNTS = {
  commercial: count("commercial"),
  reliever: count("reliever"),
  regional: count("regional"),
};

export const AIRPORT_FAQS: {
  id: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "how-many",
    question: "How many airports are in Arizona?",
    answer: `This page lists ${AIRPORT_COUNT} public airports in the FAA's main categories: ${AIRPORT_COUNTS.commercial} with airline service, ${AIRPORT_COUNTS.reliever} reliever airports for private aviation around Phoenix and Tucson, and ${AIRPORT_COUNTS.regional} regional and general aviation fields. Arizona also has military airfields and many small private and tribal airstrips.`,
  },
  {
    id: "commercial",
    question: "Which Arizona airports have airline flights?",
    answer:
      "Phoenix Sky Harbor (PHX) carries most of Arizona's airline passengers, followed by Tucson (TUS) and Phoenix–Mesa Gateway (AZA). Yuma, Flagstaff, Prescott, Page and Show Low have smaller amounts of airline service.",
  },
  {
    id: "closest",
    question: "What's the closest airport to Mesa?",
    answer:
      "For airline flights, Phoenix–Mesa Gateway in southeast Mesa, 10 to 20 minutes from most of Mesa and Gilbert. Sky Harbor is about 25 minutes away without traffic. For private flights, Falcon Field is in north Mesa, about 10 minutes from downtown.",
  },
  {
    id: "private",
    question: "Can I fly private into the East Valley?",
    answer:
      "Yes. Private jets use the FBOs at Falcon Field, Scottsdale Airport, Mesa Gateway and Sky Harbor. Give us your tail number when you book and we'll meet the aircraft at the FBO.",
  },
  {
    id: "every-airport",
    question: "Do you drive to every airport on this list?",
    answer:
      "We drive Sky Harbor, Mesa Gateway, Falcon Field, Scottsdale and Chandler every day. Long-distance rides to Tucson, Flagstaff, Sedona and the rest of Arizona are available by quote: call dispatch with the route and the date.",
  },
];
