/**
 * Demo data — fills the dashboards with a believable year of rides.
 *
 *   npm run db:seed:demo     add (or refresh) the demo data
 *   npm run db:demo:clear    remove only the demo data
 *
 * Run `npm run db:seed` once first: this uses the service types, vehicle
 * categories and airports that seed creates (or the ones you've set up in
 * the admin).
 *
 * What it adds (dates are relative to the day you run it):
 *   - 8 drivers (with profiles, pay %, vehicles), 40 customers,
 *     3 corporate accounts with contacts and passengers
 *   - ~600 rides over the past 12 months + the next 2 weeks, priced with
 *     the app's own quote calculator, in every status
 *   - payments (paid, pending, refunded, partly refunded) with tips,
 *     driver assignments + pay, status history, stops, notes
 *   - corporate invoices, a few ad-hoc invoices, corporate inquiries,
 *     2 discount codes, extra vehicle units, a blackout date
 *
 * Safe to re-run: it clears the previous demo data first. Nothing is sent:
 * rows are written straight to the database, so no emails, texts, push
 * notifications or Stripe calls happen. Stripe IDs are fake ("pi_demo_…").
 *
 * Everything demo is marked so it can be removed cleanly:
 *   - people:   emails ending in @demo.mesamidnight.com
 *   - rides:    internal notes starting with "[demo]"
 *   - other:    "[demo]" in notes / reason, or a "DEMO" invoice number / plate
 *
 * Demo logins (password for all: ChangeMe123!)
 *   admin      chris.ware.dev@gmail.com   (kept as is if it already exists)
 *   driver     driver@demo.mesamidnight.com
 *   customer   customer@demo.mesamidnight.com
 *   corporate  corporate@demo.mesamidnight.com
 */
import "dotenv/config";
import {
  PrismaClient,
  Prisma,
  Role,
  BookingStatus,
  PaymentStatus,
  ServicePricingStrategy,
  AirportLeg,
  AddonType,
  CorporateContactRole,
  CorporateBillingCycle,
  CorporatePaymentMethod,
  PaymentTerms,
  CorporateInquiryStatus,
  CorporateInvoiceStatus,
  InvoiceStatus,
  DiscountKind,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { calcQuoteCents } from "../src/lib/pricing/calcQuote";
import { clearDemoData, DEMO_DOMAIN, DEMO_TAG } from "./clearDemo";

const db = new PrismaClient();

const ADMIN_EMAIL = (
  process.env.DEMO_ADMIN_EMAIL ?? "chris.ware.dev@gmail.com"
).toLowerCase();
const PASSWORD = process.env.DEMO_PASSWORD ?? "ChangeMe123!";
/** Mesa / Phoenix: Arizona has no daylight saving, always UTC-7. */
const UTC_OFFSET_HOURS = 7;

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const MIN = 60 * 1000;

// ─── Repeatable randomness ─────────────────────────────────────────────────
// Same "random" choices every run, so the charts always look the same.
let seed = 20261017;
function rand() {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const int = (min: number, max: number) =>
  Math.floor(rand() * (max - min + 1)) + min;
const chance = (p: number) => rand() < p;
const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
function weighted<T>(items: readonly (readonly [T, number])[]): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [v, w] of items) {
    r -= w;
    if (r <= 0) return v;
  }
  return items[items.length - 1][0];
}

// ─── Places (public venues, hotels and offices — no private homes) ─────────
type Place = { address: string; lat: number; lng: number };

const PLACES: Place[] = [
  { address: "Hotel Valley Ho, 6850 E Main St, Scottsdale, AZ 85251", lat: 33.4936, lng: -111.9339 },
  { address: "The Phoenician, 6000 E Camelback Rd, Scottsdale, AZ 85251", lat: 33.5009, lng: -111.9497 },
  { address: "Fairmont Scottsdale Princess, 7575 E Princess Dr, Scottsdale, AZ 85255", lat: 33.6513, lng: -111.9223 },
  { address: "Arizona Biltmore, 2400 E Missouri Ave, Phoenix, AZ 85016", lat: 33.5226, lng: -112.0257 },
  { address: "Phoenix Convention Center, 100 N 3rd St, Phoenix, AZ 85004", lat: 33.4489, lng: -112.0699 },
  { address: "Chase Field, 401 E Jefferson St, Phoenix, AZ 85004", lat: 33.4455, lng: -112.0667 },
  { address: "Footprint Center, 201 E Jefferson St, Phoenix, AZ 85004", lat: 33.4457, lng: -112.0712 },
  { address: "State Farm Stadium, 1 Cardinals Dr, Glendale, AZ 85305", lat: 33.5276, lng: -112.2626 },
  { address: "Mesa Arts Center, 1 E Main St, Mesa, AZ 85201", lat: 33.4152, lng: -111.8315 },
  { address: "Sloan Park, 2330 W Rio Salado Pkwy, Mesa, AZ 85201", lat: 33.4313, lng: -111.8826 },
  { address: "Hyatt Place Mesa, 1166 W Rio Salado Pkwy, Mesa, AZ 85201", lat: 33.4318, lng: -111.8584 },
  { address: "Mesa Riverview, 1061 N Dobson Rd, Mesa, AZ 85201", lat: 33.4334, lng: -111.8752 },
  { address: "Banner Desert Medical Center, 1400 S Dobson Rd, Mesa, AZ 85202", lat: 33.3913, lng: -111.8757 },
  { address: "Superstition Springs Center, 6555 E Southern Ave, Mesa, AZ 85206", lat: 33.3929, lng: -111.6876 },
  { address: "Las Sendas Golf Club, 7555 E Eagle Crest Dr, Mesa, AZ 85207", lat: 33.4805, lng: -111.6694 },
  { address: "SanTan Village, 2218 E Williams Field Rd, Gilbert, AZ 85295", lat: 33.3053, lng: -111.7451 },
  { address: "Gilbert Heritage District, 222 N Ash St, Gilbert, AZ 85233", lat: 33.3528, lng: -111.7890 },
  { address: "Chandler Fashion Center, 3111 W Chandler Blvd, Chandler, AZ 85226", lat: 33.3015, lng: -111.8992 },
  { address: "Sheraton Grand at Wild Horse Pass, 5594 W Wild Horse Pass Blvd, Chandler, AZ 85226", lat: 33.2667, lng: -111.9988 },
  { address: "ASU Tempe Campus, 1151 S Forest Ave, Tempe, AZ 85281", lat: 33.4242, lng: -111.9281 },
  { address: "Tempe Marketplace, 2000 E Rio Salado Pkwy, Tempe, AZ 85281", lat: 33.4301, lng: -111.8995 },
  { address: "Mountain Shadows Resort, 5445 E Lincoln Dr, Paradise Valley, AZ 85253", lat: 33.5309, lng: -111.9582 },
  { address: "Kierland Commons, 15205 N Kierland Blvd, Scottsdale, AZ 85254", lat: 33.6226, lng: -111.9264 },
  { address: "Salt River Fields, 7555 N Pima Rd, Scottsdale, AZ 85258", lat: 33.5453, lng: -111.8848 },
  { address: "Queen Creek Olive Mill, 25062 S Meridian Rd, Queen Creek, AZ 85142", lat: 33.2224, lng: -111.6338 },
];

type AirportRow = {
  id: string;
  iata: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

// ─── Names (made up) ───────────────────────────────────────────────────────
const FIRST = [
  "Avery", "Jordan", "Morgan", "Riley", "Cameron", "Taylor", "Quinn", "Reese",
  "Elena", "Marcus", "Priya", "Daniel", "Sofia", "Isaac", "Grace", "Mateo",
  "Hannah", "Owen", "Leah", "Caleb", "Nina", "Wesley", "Maya", "Julian",
  "Clara", "Andre", "Lucia", "Brooks", "Iris", "Theo", "Naomi", "Felix",
  "Camila", "Dominic", "Harper", "Silas", "Ava", "Rafael", "Elise", "Gavin",
];
const LAST = [
  "Hayes", "Patel", "Romero", "Whitaker", "Nguyen", "Calloway", "Brennan",
  "Okafor", "Lindqvist", "Delgado", "Sterling", "Ashford", "Moreno", "Kaplan",
  "Fairbanks", "Ruiz", "Holloway", "Chen", "Mercer", "Vasquez", "Langford",
  "Ortega", "Pruitt", "Castellanos", "Wexler", "Ibarra", "Thornton", "Abara",
];
const AIRLINES: [string, string][] = [
  ["American Airlines", "AA"],
  ["Southwest Airlines", "WN"],
  ["Delta Air Lines", "DL"],
  ["United Airlines", "UA"],
  ["Alaska Airlines", "AS"],
  ["Allegiant Air", "G4"],
];
const ADMIN_NOTES = [
  "Client prefers the same chauffeur as last time.",
  "Called to confirm pickup door. All set.",
  "VIP, keep the cabin at 70°F and have water ready.",
  "Flight delayed 40 min, pickup moved to match.",
  "Repeat customer, mentioned us to their office.",
  "Asked for a quiet ride, taking work calls.",
];
const SPECIAL = [
  "Two large golf bags.",
  "Please call on arrival, not text.",
  "Child seat for a 3 year old, please.",
  "Meet at the baggage claim carousel.",
  "Celebrating an anniversary.",
  null,
  null,
  null,
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function phone() {
  return `(480) 555-${String(int(100, 199)).padStart(4, "0")}`;
}

function miles(a: Place, b: Place) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  const straight = 2 * R * Math.asin(Math.sqrt(h));
  // Roads aren't straight lines.
  return Math.max(3, Math.round(straight * 1.3 * 10) / 10);
}

/** A Phoenix-local wall time on the day of `dayUtc`, as a UTC Date. */
function phoenixTime(dayUtc: Date, hour: number, minute: number) {
  return new Date(
    Date.UTC(
      dayUtc.getUTCFullYear(),
      dayUtc.getUTCMonth(),
      dayUtc.getUTCDate(),
      hour + UTC_OFFSET_HOURS,
      minute,
    ),
  );
}

const minDate = (...dates: Date[]) =>
  dates.reduce((m, d) => (d < m ? d : m));
const addMs = (d: Date, ms: number) => new Date(d.getTime() + ms);

// Busy winters and spring training, slow Phoenix summers.
const MONTH_WEIGHT = [1.3, 1.6, 1.6, 1.15, 0.9, 0.6, 0.5, 0.6, 0.85, 1.0, 1.1, 1.25];
// Sun..Sat — airport traffic peaks Friday and Sunday.
const WEEKDAY_WEIGHT = [1.35, 1.05, 0.95, 0.95, 1.05, 1.45, 1.0];

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  ) {
    throw new Error(
      "Refusing to add demo data in production. Run this against a dev database.",
    );
  }

  const now = new Date();
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  // ── What the base seed set up ──
  const services = await db.serviceType.findMany({
    where: { active: true },
    include: { fees: { where: { active: true } } },
  });
  const vehicles = await db.vehicle.findMany({
    where: { active: true, callForPricing: false },
    orderBy: [{ capacity: "asc" }, { sortOrder: "asc" }],
  });
  const airportRows = await db.airport.findMany({ where: { active: true } });

  const findService = (
    strategy: ServicePricingStrategy,
    leg: AirportLeg,
  ) =>
    services.find(
      (s) => s.pricingStrategy === strategy && s.airportLeg === leg,
    );
  const svcPickup = findService(ServicePricingStrategy.POINT_TO_POINT, AirportLeg.PICKUP);
  const svcDropoff = findService(ServicePricingStrategy.POINT_TO_POINT, AirportLeg.DROPOFF);
  const svcP2P = findService(ServicePricingStrategy.POINT_TO_POINT, AirportLeg.NONE);
  const svcHourly = findService(ServicePricingStrategy.HOURLY, AirportLeg.NONE);

  if (!svcP2P || vehicles.length === 0) {
    throw new Error(
      "Missing service types or vehicles. Run `npm run db:seed` first (or add them in the admin).",
    );
  }

  const airports: AirportRow[] = airportRows
    .filter((a) => a.lat != null && a.lng != null)
    .map((a) => ({
      id: a.id,
      iata: a.iata,
      name: a.name,
      address: a.address,
      lat: Number(a.lat),
      lng: Number(a.lng),
    }));

  // ── Start clean: remove the previous demo run ──
  await clearDemoData(db, { quiet: true });
  console.log("✓ cleared previous demo data");

  // ── Admin (the main login stays exactly as it is if it already exists) ──
  const existingAdmin = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const admin = existingAdmin
    ? await db.user.update({
        where: { id: existingAdmin.id },
        data: existingAdmin.roles.includes(Role.ADMIN)
          ? {}
          : { roles: { set: [...existingAdmin.roles, Role.ADMIN] } },
      })
    : await db.user.create({
        data: {
          email: ADMIN_EMAIL,
          name: "Chris Ware",
          password: passwordHash,
          roles: [Role.ADMIN],
          emailVerified: now,
        },
      });
  console.log(`✓ admin: ${ADMIN_EMAIL}${existingAdmin ? " (unchanged)" : ` (password: ${PASSWORD})`}`);

  // ── People ──
  const usedNames = new Set<string>();
  function personName() {
    for (;;) {
      const n = `${pick(FIRST)} ${pick(LAST)}`;
      if (!usedNames.has(n)) {
        usedNames.add(n);
        return n;
      }
    }
  }
  const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, ".");
  const demoEmail = (name: string) => `${slug(name)}@${DEMO_DOMAIN}`;
  const joinedAt = () => addMs(now, -int(20, 540) * DAY);

  // Drivers
  const drivers: { id: string; payPercent: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const name = personName();
    const email = i === 0 ? `driver@${DEMO_DOMAIN}` : demoEmail(name);
    const created = joinedAt();
    const payPercent = pick([30, 32, 35, 35, 38, 40]);
    const u = await db.user.create({
      data: {
        name,
        email,
        phone: phone(),
        password: passwordHash,
        roles: [Role.DRIVER],
        emailVerified: created,
        createdAt: created,
        driverProfile: {
          create: {
            payPercent,
            paidPerRide: i !== 7, // one owner-operator, not paid per ride
            active: true,
            legalName: name,
            mailingAddress: "1250 W Main St, Mesa, AZ 85201",
            w9ReceivedAt: addMs(created, 3 * DAY),
            licenseNumber: `D${int(10000000, 99999999)}`,
            licenseExpiresAt: addMs(now, int(60, 900) * DAY),
            permitExpiresAt: addMs(now, int(20, 500) * DAY),
            insuranceExpiresAt: addMs(now, int(15, 365) * DAY),
            backgroundCheckAt: addMs(created, 2 * DAY),
            notes: `${DEMO_TAG} Demo driver`,
          },
        },
      },
    });
    drivers.push({ id: u.id, payPercent: i === 7 ? 0 : payPercent });
  }

  // Customers
  const customers: { id: string; name: string; email: string }[] = [];
  for (let i = 0; i < 40; i++) {
    const name = personName();
    const email = i === 0 ? `customer@${DEMO_DOMAIN}` : demoEmail(name);
    const created = joinedAt();
    const u = await db.user.create({
      data: {
        name,
        email,
        phone: phone(),
        password: passwordHash,
        roles: [Role.USER],
        emailVerified: created,
        createdAt: created,
      },
    });
    customers.push({ id: u.id, name, email });
  }
  console.log(`✓ ${drivers.length} drivers, ${customers.length} customers`);

  // ── Vehicle units (2–3 per category) ──
  const unitsByVehicle = new Map<string, string[]>();
  let plateN = 100;
  for (const v of vehicles) {
    const ids: string[] = [];
    const count = v.capacity >= 10 ? 2 : 3;
    for (let i = 0; i < count; i++) {
      const unit = await db.vehicleUnit.create({
        data: {
          name: `${v.name} #${i + 1}`,
          plate: `DEMO-${plateN++}`,
          categoryId: v.id,
          active: true,
        },
      });
      ids.push(unit.id);
    }
    unitsByVehicle.set(v.id, ids);
  }
  console.log("✓ vehicle units");

  // ── Corporate accounts ──
  const CORP = [
    { name: "Saguaro Health Partners", discount: 10, dept: ["Executive", "Medical Staff", "Recruiting"], cycle: CorporateBillingCycle.MONTHLY, method: CorporatePaymentMethod.INVOICE, terms: PaymentTerms.NET_30 },
    { name: "Red Rock Logistics", discount: 5, dept: ["Operations", "Sales", "Leadership"], cycle: CorporateBillingCycle.MONTHLY, method: CorporatePaymentMethod.CHECK, terms: PaymentTerms.NET_15 },
    { name: "Canyon Ridge Capital", discount: 12, dept: ["Partners", "Investor Relations", "Analysts"], cycle: CorporateBillingCycle.MONTHLY, method: CorporatePaymentMethod.INVOICE, terms: PaymentTerms.NET_30 },
  ] as const;

  type Corp = {
    id: string;
    name: string;
    discount: number;
    contactUserIds: string[];
    passengers: { id: string; name: string; dept: string }[];
  };
  const corps: Corp[] = [];
  for (let c = 0; c < CORP.length; c++) {
    const def = CORP[c];
    const domainSlug = def.name.toLowerCase().replace(/[^a-z]+/g, "");
    const account = await db.corporateAccount.create({
      data: {
        name: def.name,
        billingEmail: `billing.${domainSlug}@${DEMO_DOMAIN}`,
        billingAddress: ["1 E Washington St, Suite 500", "2600 N Central Ave, Floor 9", "40 N Central Ave, Suite 1800"][c],
        billingCity: "Phoenix",
        billingState: "AZ",
        billingZip: "85004",
        billingCycle: def.cycle,
        paymentMethod: def.method,
        paymentTerms: def.terms,
        discountPercent: new Prisma.Decimal(def.discount),
        monthlyLimitCents: c === 1 ? 500000 : null,
        internalNotes: `${DEMO_TAG} Demo corporate account`,
        createdAt: addMs(now, -int(300, 420) * DAY),
      },
    });

    const contactUserIds: string[] = [];
    for (let k = 0; k < 2; k++) {
      const name = personName();
      const email =
        c === 0 && k === 0 ? `corporate@${DEMO_DOMAIN}` : demoEmail(name);
      const u = await db.user.create({
        data: {
          name,
          email,
          phone: phone(),
          password: passwordHash,
          roles: [Role.USER, Role.CORPORATE],
          emailVerified: account.createdAt,
          createdAt: account.createdAt,
          corporateContacts: {
            create: {
              corporateAccountId: account.id,
              role: k === 0 ? CorporateContactRole.PRIMARY : CorporateContactRole.ADMIN,
              title: k === 0 ? "Office Manager" : "Executive Assistant",
              phone: phone(),
            },
          },
        },
      });
      contactUserIds.push(u.id);
    }

    const passengers: Corp["passengers"] = [];
    for (let p = 0; p < 6; p++) {
      const name = personName();
      const dept = pick(def.dept);
      const row = await db.corporatePassenger.create({
        data: {
          corporateAccountId: account.id,
          name,
          email: demoEmail(name),
          phone: phone(),
          department: dept,
          employeeId: `E-${int(1000, 9999)}`,
        },
      });
      passengers.push({ id: row.id, name, dept });
    }
    corps.push({ id: account.id, name: def.name, discount: def.discount, contactUserIds, passengers });
  }
  console.log(`✓ ${corps.length} corporate accounts`);

  // ── Discount codes ──
  const codeSpring = await db.discountCode.create({
    data: {
      code: "DEMOSPRING15",
      name: "Spring training 15% off",
      partner: "Demo partner",
      kind: DiscountKind.PERCENT,
      percentOff: 15,
      maxDiscountCents: 4000,
      active: true,
      notes: `${DEMO_TAG} Demo discount code`,
      createdById: admin.id,
    },
  });
  const codeWelcome = await db.discountCode.create({
    data: {
      code: "DEMOWELCOME20",
      name: "$20 off your first ride",
      kind: DiscountKind.AMOUNT,
      amountOffCents: 2000,
      minFareCents: 8000,
      maxUsesPerCustomer: 1,
      active: true,
      notes: `${DEMO_TAG} Demo discount code`,
      createdById: admin.id,
    },
  });

  // ── Rides ──
  type Kind = "pickup" | "dropoff" | "p2p" | "hourly";
  const kinds: (readonly [Kind, number])[] = [
    ["pickup", svcPickup && airports.length ? 30 : 0],
    ["dropoff", svcDropoff && airports.length ? 26 : 0],
    ["p2p", 30],
    ["hourly", svcHourly ? 14 : 0],
  ];

  const start = addMs(now, -365 * DAY);
  const end = addMs(now, 14 * DAY);
  const corpRides: { bookingId: string; corpId: string; pickupAt: Date; totalCents: number; desc: string; status: BookingStatus }[] = [];
  let rideCount = 0;
  const statusTally = new Map<BookingStatus, number>();

  // A few rides happening today, so the live views have something to show
  const localYmd = (d: Date) => addMs(d, -UTC_OFFSET_HOURS * HOUR).toISOString().slice(0, 10);
  const roundTo5 = (d: Date) => new Date(Math.round(d.getTime() / (5 * MIN)) * 5 * MIN);
  const todayRides: { at: Date; status: BookingStatus }[] = [
    { at: roundTo5(addMs(now, -25 * MIN)), status: BookingStatus.IN_PROGRESS },
    { at: roundTo5(addMs(now, 40 * MIN)), status: BookingStatus.EN_ROUTE },
    { at: roundTo5(addMs(now, 3 * HOUR)), status: BookingStatus.ASSIGNED },
    { at: roundTo5(addMs(now, 5 * HOUR)), status: BookingStatus.CONFIRMED },
  ];

  for (let day = new Date(start); day <= end; day = addMs(day, DAY)) {
    const local = addMs(day, -UTC_OFFSET_HOURS * HOUR);
    const forced = localYmd(day) === localYmd(now) ? todayRides : [];
    const mw = MONTH_WEIGHT[local.getUTCMonth()];
    const ww = WEEKDAY_WEIGHT[local.getUTCDay()];
    const expected = 1.55 * mw * ww;
    const count = Math.floor(expected + rand());
    const isWeekday = local.getUTCDay() >= 1 && local.getUTCDay() <= 5;

    for (let r = 0; r < count + forced.length; r++) {
      const forcedRide = r >= count ? forced[r - count] : null;
      const kind = weighted(kinds);

      // Who's riding
      const who = weighted([
        ["user", 68],
        ["guest", 14],
        ["corp", isWeekday ? 18 : 4],
      ] as const);

      // When (Phoenix local)
      let hour: number;
      if (kind === "hourly") hour = int(15, 20);
      else if (who === "corp") hour = pick([6, 7, 7, 8, 16, 17, 18]);
      else hour = weighted([[5, 1], [6, 2], [7, 3], [9, 3], [11, 3], [13, 3], [15, 3], [17, 3], [19, 2], [21, 2], [22, 1]] as const);
      const pickupAt = forcedRide?.at ?? phoenixTime(local, hour, pick([0, 15, 30, 45]));

      // Where
      const place = pick(PLACES);
      let from: Place = place;
      let to: Place = pick(PLACES.filter((p) => p !== place));
      let airport: AirportRow | null = null;
      if (kind === "pickup" || kind === "dropoff") {
        airport = weighted(
          airports.map((a) => [a, a.iata === "PHX" ? 7 : a.iata === "AZA" ? 2 : 1] as const),
        );
        const ap: Place = { address: airport.address, lat: airport.lat, lng: airport.lng };
        if (kind === "pickup") {
          from = ap;
          to = place;
        } else {
          from = place;
          to = ap;
        }
      }
      const distance = miles(from, to);
      const duration = Math.round(distance * 1.8 + 6);

      // Passengers → vehicle
      const passengers =
        kind === "hourly"
          ? int(2, 10)
          : weighted([[1, 40], [2, 30], [3, 12], [4, 9], [5, 5], [8, 3], [11, 1]] as const);
      const fits = vehicles.filter((v) => v.capacity >= passengers);
      const vehicle =
        fits.length === 0
          ? vehicles[vehicles.length - 1]
          : chance(0.2) && fits.length > 1
            ? fits[1]
            : fits[0];

      const service =
        kind === "pickup" ? svcPickup! : kind === "dropoff" ? svcDropoff! : kind === "hourly" ? svcHourly! : svcP2P;

      // Extra stops (not on airport runs)
      const stopCount = kind === "p2p" && chance(0.12) ? 1 : 0;
      const stopPlace = stopCount ? pick(PLACES.filter((p) => p !== from && p !== to)) : null;

      const hoursRequested = kind === "hourly" ? int(2, 6) : null;

      const quote = calcQuoteCents({
        pricingStrategy: service.pricingStrategy,
        distanceMiles: distance,
        durationMinutes: duration,
        hoursRequested,
        stopCount,
        fees: service.fees.map((f) => ({ label: f.label, amountCents: f.amountCents })),
        vehicleMinHours: vehicle.minHours,
        serviceMinHours: service.minHours,
        serviceMinFareCents: service.minFareCents,
        serviceBaseFeeCents: service.baseFeeCents,
        servicePerMileCents: service.perMileCents,
        servicePerMinuteCents: service.perMinuteCents,
        servicePerHourCents: service.perHourCents,
        vehicleBaseFareCents: vehicle.baseFareCents,
        vehiclePerMileCents: vehicle.perMileCents,
        vehiclePerMinuteCents: vehicle.perMinuteCents,
        vehiclePerHourCents: vehicle.perHourCents,
      });

      // Discount codes (comes off the ride price, never fees)
      let discountCents = 0;
      let discountCodeId: string | null = null;
      if (who === "user" && chance(0.06)) {
        const rideOnly = quote.totalCents - quote.breakdown.totalFeesCents;
        const lm = local.getUTCMonth();
        if ((lm === 1 || lm === 2) && chance(0.7)) {
          discountCents = Math.min(Math.round(rideOnly * 0.15), 4000);
          discountCodeId = codeSpring.id;
        } else if (rideOnly >= 8000) {
          discountCents = 2000;
          discountCodeId = codeWelcome.id;
        }
      }
      const totalCents = quote.totalCents - discountCents;

      // Status, by where the pickup sits relative to now
      const msFromNow = pickupAt.getTime() - now.getTime();
      let status: BookingStatus;
      if (msFromNow < -3 * HOUR) {
        status = weighted([
          [BookingStatus.COMPLETED, 86],
          [BookingStatus.CANCELLED, 5],
          [BookingStatus.DECLINED, 2],
          [BookingStatus.NO_SHOW, 1.5],
          [BookingStatus.REFUNDED, 2],
          [BookingStatus.PARTIALLY_REFUNDED, 2.5],
        ] as const);
      } else if (msFromNow < 0) {
        status = weighted([
          [BookingStatus.IN_PROGRESS, 2],
          [BookingStatus.COMPLETED, 3],
        ] as const);
      } else if (msFromNow < 90 * MIN) {
        status = weighted([
          [BookingStatus.EN_ROUTE, 2],
          [BookingStatus.ARRIVED, 1],
          [BookingStatus.ASSIGNED, 2],
        ] as const);
      } else {
        status = weighted([
          [BookingStatus.ASSIGNED, msFromNow < 4 * DAY ? 45 : 25],
          [BookingStatus.CONFIRMED, 35],
          [BookingStatus.PENDING_PAYMENT, 18],
          [BookingStatus.PENDING_REVIEW, msFromNow < 2 * DAY ? 6 : 18],
        ] as const);
      }
      if (forcedRide) status = forcedRide.status;
      // Corporate rides are billed on invoice, so they skip the payment step
      if (who === "corp") {
        if (status === BookingStatus.PENDING_PAYMENT) status = BookingStatus.CONFIRMED;
        if (status === BookingStatus.REFUNDED || status === BookingStatus.PARTIALLY_REFUNDED) {
          status = BookingStatus.COMPLETED;
        }
      }
      statusTally.set(status, (statusTally.get(status) ?? 0) + 1);

      // Timeline
      const leadMs = int(1, 21) * DAY + int(0, 10) * HOUR;
      const createdAt = minDate(addMs(pickupAt, -leadMs), addMs(now, -int(10, 600) * MIN));
      const reviewedAt = minDate(addMs(createdAt, int(15, 180) * MIN), now);
      const paidAt = minDate(addMs(reviewedAt, int(10, 600) * MIN), addMs(pickupAt, -30 * MIN), now);
      const assignedAt = minDate(addMs(paidAt, int(1, 48) * HOUR), addMs(pickupAt, -2 * HOUR), now);
      const finishedAt = addMs(pickupAt, (hoursRequested ? hoursRequested * 60 : duration) * MIN);

      const isPaidFlow = (
        [
          BookingStatus.CONFIRMED,
          BookingStatus.ASSIGNED,
          BookingStatus.EN_ROUTE,
          BookingStatus.ARRIVED,
          BookingStatus.IN_PROGRESS,
          BookingStatus.COMPLETED,
          BookingStatus.NO_SHOW,
          BookingStatus.REFUNDED,
          BookingStatus.PARTIALLY_REFUNDED,
        ] as BookingStatus[]
      ).includes(status);
      const hasDriver = (
        [
          BookingStatus.ASSIGNED,
          BookingStatus.EN_ROUTE,
          BookingStatus.ARRIVED,
          BookingStatus.IN_PROGRESS,
          BookingStatus.COMPLETED,
          BookingStatus.NO_SHOW,
          BookingStatus.PARTIALLY_REFUNDED,
        ] as BookingStatus[]
      ).includes(status);

      // Status history
      const events: { status: BookingStatus; at: Date; by: string | null }[] = [
        { status: BookingStatus.PENDING_REVIEW, at: createdAt, by: null },
      ];
      if (status === BookingStatus.DECLINED) {
        events.push({ status, at: reviewedAt, by: admin.id });
      } else if (status === BookingStatus.CANCELLED) {
        events.push({ status: BookingStatus.PENDING_PAYMENT, at: reviewedAt, by: admin.id });
        events.push({ status, at: minDate(addMs(reviewedAt, int(2, 72) * HOUR), addMs(pickupAt, -HOUR)), by: null });
      } else if (status !== BookingStatus.PENDING_REVIEW) {
        if (who !== "corp") events.push({ status: BookingStatus.PENDING_PAYMENT, at: reviewedAt, by: admin.id });
        if (status !== BookingStatus.PENDING_PAYMENT) {
          events.push({ status: BookingStatus.CONFIRMED, at: who === "corp" ? reviewedAt : paidAt, by: who === "corp" ? admin.id : null });
        }
        if (hasDriver) events.push({ status: BookingStatus.ASSIGNED, at: assignedAt, by: admin.id });
        const ridden = (
          [BookingStatus.EN_ROUTE, BookingStatus.ARRIVED, BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED, BookingStatus.PARTIALLY_REFUNDED, BookingStatus.NO_SHOW] as BookingStatus[]
        ).includes(status);
        if (ridden) {
          events.push({ status: BookingStatus.EN_ROUTE, at: addMs(pickupAt, -35 * MIN), by: null });
          if (status !== BookingStatus.EN_ROUTE) events.push({ status: BookingStatus.ARRIVED, at: addMs(pickupAt, -5 * MIN), by: null });
          if (status === BookingStatus.NO_SHOW) events.push({ status, at: addMs(pickupAt, 30 * MIN), by: null });
          else if (status !== BookingStatus.EN_ROUTE && status !== BookingStatus.ARRIVED) {
            events.push({ status: BookingStatus.IN_PROGRESS, at: pickupAt, by: null });
            if (status === BookingStatus.COMPLETED || status === BookingStatus.PARTIALLY_REFUNDED) {
              events.push({ status: BookingStatus.COMPLETED, at: finishedAt, by: null });
            }
          }
        }
        if (status === BookingStatus.REFUNDED || status === BookingStatus.PARTIALLY_REFUNDED) {
          const refundAt = status === BookingStatus.REFUNDED ? addMs(pickupAt, -int(4, 48) * HOUR) : addMs(finishedAt, int(1, 3) * DAY);
          events.push({ status, at: minDate(refundAt, now), by: admin.id });
        }
      }
      const lastEventAt = events.reduce((m, e) => (e.at > m ? e.at : m), createdAt);

      // Payment (corporate rides are invoiced instead)
      let payment: Prisma.PaymentCreateWithoutBookingInput | undefined;
      let tipCents = 0;
      if (who !== "corp") {
        if (status === BookingStatus.PENDING_PAYMENT) {
          payment = {
            status: PaymentStatus.PENDING,
            amountSubtotalCents: totalCents,
            amountTotalCents: totalCents,
            createdAt: reviewedAt,
            updatedAt: reviewedAt,
          };
        } else if (isPaidFlow) {
          tipCents =
            status === BookingStatus.COMPLETED && chance(0.55)
              ? Math.round((totalCents * pick([15, 18, 20, 20, 25])) / 100 / 100) * 100
              : 0;
          let refunded = 0;
          let pStatus: PaymentStatus = PaymentStatus.PAID;
          let refundedAt: Date | null = null;
          if (status === BookingStatus.REFUNDED) {
            refunded = totalCents;
            pStatus = PaymentStatus.REFUNDED;
            refundedAt = minDate(events[events.length - 1].at, now);
          } else if (status === BookingStatus.PARTIALLY_REFUNDED) {
            refunded = Math.round((totalCents * pick([20, 25, 30, 50])) / 100);
            pStatus = PaymentStatus.PARTIALLY_REFUNDED;
            refundedAt = minDate(events[events.length - 1].at, now);
          }
          payment = {
            status: pStatus,
            stripePaymentIntentId: `pi_demo_${rideCount}_${int(100000, 999999)}`,
            amountSubtotalCents: totalCents,
            amountTotalCents: totalCents + tipCents,
            amountPaidCents: totalCents,
            amountRefundedCents: refunded,
            tipCents,
            paidAt,
            refundedAt,
            stripeRefundId: refundedAt ? `re_demo_${rideCount}` : null,
            createdAt: reviewedAt,
            // The earnings chart dates refunds by this field
            updatedAt: refundedAt ?? paidAt,
          };
        }
      }

      // Driver
      let assignment: Prisma.AssignmentCreateWithoutBookingInput | undefined;
      if (hasDriver) {
        const driver = pick(drivers);
        const units = unitsByVehicle.get(vehicle.id) ?? [];
        const payable =
          status === BookingStatus.COMPLETED || status === BookingStatus.PARTIALLY_REFUNDED;
        assignment = {
          driver: { connect: { id: driver.id } },
          vehicleUnit: units.length ? { connect: { id: pick(units) } } : undefined,
          assignedBy: { connect: { id: admin.id } },
          assignedAt,
          driverPaymentCents:
            payable && driver.payPercent > 0
              ? Math.round((totalCents * driver.payPercent) / 100)
              : null,
          driverTipCents: payable && tipCents > 0 ? tipCents : null,
        };
      }

      // Customer
      let userId: string | null = null;
      let guestName: string | null = null;
      let guestEmail: string | null = null;
      let guestPhone: string | null = null;
      let corp: Corp | null = null;
      let passenger: Corp["passengers"][number] | null = null;
      if (who === "user") {
        // A few regulars ride often
        const c = rand() < 0.45 ? customers[int(0, 7)] : pick(customers);
        userId = c.id;
      } else if (who === "guest") {
        guestName = personName();
        guestEmail = demoEmail(guestName);
        guestPhone = phone();
      } else {
        corp = pick(corps);
        passenger = pick(corp.passengers);
        userId = pick(corp.contactUserIds);
      }

      const airline = pick(AIRLINES);
      const declineReason =
        status === BookingStatus.DECLINED
          ? pick([
              "No vehicles available at that time.",
              "Outside our service area.",
              "Requested time is too soon to confirm.",
            ])
          : null;

      const booking = await db.booking.create({
        data: {
          userId,
          guestName,
          guestEmail,
          guestPhone,
          serviceTypeId: service.id,
          vehicleId: vehicle.id,
          status,
          declineReason,
          pickupAt,
          passengers,
          luggage: kind === "hourly" ? 0 : Math.min(passengers + int(0, 2), vehicle.luggageCapacity),
          hoursRequested: quote.requestedHours ?? null,
          hoursBilled: quote.billedHours ?? null,
          pickupAddress: from.address,
          pickupLat: new Prisma.Decimal(from.lat),
          pickupLng: new Prisma.Decimal(from.lng),
          dropoffAddress: to.address,
          dropoffLat: new Prisma.Decimal(to.lat),
          dropoffLng: new Prisma.Decimal(to.lng),
          distanceMiles: new Prisma.Decimal(distance),
          durationMinutes: duration,
          specialRequests: pick(SPECIAL),
          internalNotes: `${DEMO_TAG} Demo ride`,
          flightAirline: kind === "pickup" ? airline[0] : null,
          flightNumber: kind === "pickup" ? `${airline[1]}${int(100, 2999)}` : null,
          flightScheduledAt: kind === "pickup" ? addMs(pickupAt, -15 * MIN) : null,
          flightTerminal: kind === "pickup" && airport?.iata === "PHX" ? pick(["3", "4"]) : null,
          stopCount,
          stopSurchargeCents: quote.breakdown.stopSurchargeCents,
          subtotalCents: quote.breakdown.subtotalCents - discountCents,
          totalCents,
          discountCents: discountCents > 0 ? discountCents : null,
          discountCodeId,
          corporateAccountId: corp?.id ?? null,
          corporatePassengerId: passenger?.id ?? null,
          costCenter: passenger ? passenger.dept : null,
          routeApproved: status !== BookingStatus.PENDING_REVIEW,
          priceApproved: status !== BookingStatus.PENDING_REVIEW,
          createdAt,
          updatedAt: minDate(lastEventAt, now),

          stops: stopPlace
            ? {
                create: [
                  {
                    stopOrder: 1,
                    address: stopPlace.address,
                    lat: new Prisma.Decimal(stopPlace.lat),
                    lng: new Prisma.Decimal(stopPlace.lng),
                    waitTimeMinutes: 5,
                  },
                ],
              }
            : undefined,
          fees: service.fees.length
            ? {
                create: service.fees.map((f) => ({
                  label: f.label,
                  amountCents: f.amountCents,
                  serviceFeeId: f.id,
                })),
              }
            : undefined,
          addons:
            kind === "pickup" && chance(0.3)
              ? { create: [{ type: AddonType.MEET_GREET, label: "Meet & greet at baggage claim", quantity: 1 }] }
              : passengers <= 4 && chance(0.05)
                ? { create: [{ type: AddonType.CHILD_SEAT, label: "Child seat", quantity: 1 }] }
                : undefined,
          notes: chance(0.08)
            ? { create: [{ content: pick(ADMIN_NOTES), createdById: admin.id, createdAt: reviewedAt }] }
            : undefined,
          statusEvents: {
            create: events.map((e) => ({
              status: e.status,
              eventType: "STATUS_CHANGE",
              createdById: e.by,
              createdAt: minDate(e.at, now),
            })),
          },
          payment: payment ? { create: payment } : undefined,
          assignment: assignment ? { create: assignment } : undefined,
        },
        select: { id: true },
      });
      rideCount++;

      if (corp && (status === BookingStatus.COMPLETED || status === BookingStatus.NO_SHOW)) {
        const p = passenger!;
        corpRides.push({
          bookingId: booking.id,
          corpId: corp.id,
          pickupAt,
          totalCents,
          status,
          desc: `${pickupAt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Phoenix" })} · ${service.name} · ${p.name}`,
        });
      }
    }
  }
  console.log(
    `✓ ${rideCount} rides (${[...statusTally.entries()].map(([s, n]) => `${s.toLowerCase()} ${n}`).join(", ")})`,
  );

  // ── Corporate invoices: one per account per finished month ──
  let invoiceSeq = 1;
  let corpInvoiceCount = 0;
  const year = now.getUTCFullYear();
  for (const corp of corps) {
    const rides = corpRides.filter((r) => r.corpId === corp.id);
    const byMonth = new Map<string, typeof rides>();
    for (const r of rides) {
      const local = addMs(r.pickupAt, -UTC_OFFSET_HOURS * HOUR);
      const key = `${local.getUTCFullYear()}-${String(local.getUTCMonth() + 1).padStart(2, "0")}`;
      byMonth.set(key, [...(byMonth.get(key) ?? []), r]);
    }
    const thisMonthKey = `${year}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
    const months = [...byMonth.keys()].filter((k) => k < thisMonthKey).sort();
    for (let i = 0; i < months.length; i++) {
      const key = months[i];
      const list = byMonth.get(key)!;
      const [y, m] = key.split("-").map(Number);
      const periodStart = new Date(Date.UTC(y, m - 1, 1, UTC_OFFSET_HOURS));
      const periodEnd = new Date(Date.UTC(y, m, 1, UTC_OFFSET_HOURS) - 1000);
      const sentAt = addMs(periodEnd, 2 * DAY);
      const dueDate = addMs(sentAt, 30 * DAY);
      const subtotal = list.reduce((s, r) => s + r.totalCents, 0);
      const discount = Math.round((subtotal * corp.discount) / 100);
      const total = subtotal - discount;
      const isLast = i === months.length - 1;
      const status: CorporateInvoiceStatus = isLast
        ? dueDate < now
          ? CorporateInvoiceStatus.OVERDUE
          : CorporateInvoiceStatus.SENT
        : CorporateInvoiceStatus.PAID;
      const paidAt = status === CorporateInvoiceStatus.PAID ? minDate(addMs(sentAt, int(8, 28) * DAY), now) : null;

      await db.corporateInvoice.create({
        data: {
          corporateAccountId: corp.id,
          invoiceNumber: `DEMO-${y}-${String(invoiceSeq++).padStart(4, "0")}`,
          periodStart,
          periodEnd,
          subtotalCents: subtotal,
          discountCents: discount,
          totalCents: total,
          amountPaidCents: paidAt ? total : 0,
          status,
          dueDate,
          sentAt,
          paidAt,
          paymentNotes: paidAt ? `${DEMO_TAG} Paid by ACH` : null,
          paidById: paidAt ? admin.id : null,
          createdAt: addMs(periodEnd, DAY),
          lineItems: {
            create: list.map((r) => ({
              bookingId: r.bookingId,
              description: r.desc,
              amountCents: r.totalCents,
            })),
          },
          events: {
            create: [
              { eventType: "CREATED", createdById: admin.id, createdAt: addMs(periodEnd, DAY) },
              { eventType: "SENT", createdById: admin.id, createdAt: sentAt },
              ...(paidAt
                ? [{ eventType: "PAYMENT_RECORDED", createdById: admin.id, createdAt: paidAt, metadata: { amount: total } }]
                : []),
              ...(status === CorporateInvoiceStatus.OVERDUE
                ? [{ eventType: "MARKED_OVERDUE", createdById: null, createdAt: addMs(dueDate, DAY) }]
                : []),
            ],
          },
        },
      });
      corpInvoiceCount++;
    }
  }
  console.log(`✓ ${corpInvoiceCount} corporate invoices`);

  // ── Ad-hoc invoices ──
  const adHoc: { status: InvoiceStatus; desc: string; amount: number; daysAgo: number }[] = [
    { status: InvoiceStatus.PAID, desc: "Wedding shuttle, 3 hours, Executive Sprinter", amount: 64500, daysAgo: 64 },
    { status: InvoiceStatus.PAID, desc: "Golf trip transfers (4 rides)", amount: 38000, daysAgo: 31 },
    { status: InvoiceStatus.SENT, desc: "Concert night, round trip", amount: 27500, daysAgo: 6 },
    { status: InvoiceStatus.DRAFT, desc: "Corporate retreat, 2 days", amount: 112000, daysAgo: 1 },
    { status: InvoiceStatus.VOID, desc: "Duplicate charge, voided", amount: 15000, daysAgo: 45 },
  ];
  for (let i = 0; i < adHoc.length; i++) {
    const a = adHoc[i];
    const c = customers[i + 2];
    const createdAt = addMs(now, -a.daysAgo * DAY);
    const sentAt = a.status === InvoiceStatus.DRAFT ? null : addMs(createdAt, HOUR);
    const paidAt = a.status === InvoiceStatus.PAID ? addMs(createdAt, int(1, 6) * DAY) : null;
    const tip = paidAt ? Math.round(a.amount * 0.15 / 100) * 100 : 0;
    await db.invoice.create({
      data: {
        invoiceNumber: `DEMO-INV-${String(i + 1).padStart(4, "0")}`,
        userId: c.id,
        status: a.status,
        memo: "Thank you for riding with us.",
        internalNotes: `${DEMO_TAG} Demo invoice`,
        subtotalCents: a.amount,
        totalCents: a.amount + tip,
        tipCents: tip,
        amountPaidCents: paidAt ? a.amount + tip : 0,
        stripePaymentIntentId: paidAt ? `pi_demo_inv_${i + 1}` : null,
        dueDate: addMs(createdAt, 14 * DAY),
        sentAt,
        paidAt,
        voidedAt: a.status === InvoiceStatus.VOID ? addMs(createdAt, DAY) : null,
        createdById: admin.id,
        createdAt,
        lineItems: { create: [{ description: a.desc, quantity: 1, unitAmountCents: a.amount, position: 0 }] },
        events: {
          create: [
            { eventType: "CREATED", createdById: admin.id, createdAt },
            ...(sentAt ? [{ eventType: "SENT", createdById: admin.id, createdAt: sentAt }] : []),
            ...(paidAt ? [{ eventType: "PAID", createdAt: paidAt, metadata: { amount: a.amount, tip } }] : []),
            ...(a.status === InvoiceStatus.VOID ? [{ eventType: "VOIDED", createdById: admin.id, createdAt: addMs(createdAt, DAY) }] : []),
          ],
        },
      },
    });
  }
  console.log(`✓ ${adHoc.length} invoices`);

  // ── Corporate inquiries ──
  const inquiries = [
    { company: "Desert Bloom Events", status: CorporateInquiryStatus.PENDING, rides: "11-25", days: 2 },
    { company: "Copperline Engineering", status: CorporateInquiryStatus.PENDING, rides: "26-50", days: 5 },
    { company: "Sonoran Legal Group", status: CorporateInquiryStatus.CONTACTED, rides: "1-10", days: 12 },
    { company: "Mesa Valley Builders", status: CorporateInquiryStatus.DECLINED, rides: "1-10", days: 40 },
  ];
  for (const q of inquiries) {
    const contact = personName();
    const createdAt = addMs(now, -q.days * DAY);
    const reviewed = q.status !== CorporateInquiryStatus.PENDING;
    await db.corporateInquiry.create({
      data: {
        companyName: q.company,
        contactName: contact,
        email: demoEmail(contact),
        phone: phone(),
        estimatedMonthlyRides: q.rides,
        message: "We're looking for a reliable car service for client pickups and team travel to Sky Harbor.",
        status: q.status,
        reviewedAt: reviewed ? addMs(createdAt, DAY) : null,
        reviewedById: reviewed ? admin.id : null,
        adminNotes: reviewed ? `${DEMO_TAG} Followed up by phone.` : null,
        createdAt,
      },
    });
  }
  console.log(`✓ ${inquiries.length} corporate inquiries`);

  // ── A blackout date (skipped if that day is already blocked) ──
  const blackout = addMs(now, 10 * DAY - UTC_OFFSET_HOURS * HOUR);
  const ymd = `${blackout.getUTCFullYear()}-${String(blackout.getUTCMonth() + 1).padStart(2, "0")}-${String(blackout.getUTCDate()).padStart(2, "0")}`;
  const taken = await db.blackoutDate.findUnique({ where: { ymd } });
  if (!taken) {
    await db.blackoutDate.create({ data: { ymd, reason: `${DEMO_TAG} Fleet maintenance day` } });
    console.log(`✓ blackout date ${ymd}`);
  }

  console.log("\nDone. Log in at /login:");
  console.log(`  admin      ${ADMIN_EMAIL}`);
  console.log(`  driver     driver@${DEMO_DOMAIN}`);
  console.log(`  customer   customer@${DEMO_DOMAIN}`);
  console.log(`  corporate  corporate@${DEMO_DOMAIN}`);
  console.log(`  password   ${PASSWORD} (demo logins${existingAdmin ? "" : " and admin"})`);
  console.log("Remove it all with: npm run db:demo:clear");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
