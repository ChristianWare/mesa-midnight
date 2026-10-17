/**
 * Removes ONLY the demo data added by `npm run db:seed:demo`:
 *
 *   npm run db:demo:clear
 *
 * Real customers, rides, settings and your admin login are left alone.
 * Demo records are recognised by:
 *   - emails ending in @demo.mesamidnight.com
 *   - "[demo]" at the start of notes / reasons
 *   - "DEMO" invoice numbers and "DEMO-" vehicle plates
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const DEMO_DOMAIN = "demo.mesamidnight.com";
export const DEMO_TAG = "[demo]";

export async function clearDemoData(
  db: PrismaClient,
  { quiet = false }: { quiet?: boolean } = {},
) {
  const log = (msg: string) => {
    if (!quiet) console.log(msg);
  };
  const demoEmail = { endsWith: `@${DEMO_DOMAIN}` };

  const demoAccounts = await db.corporateAccount.findMany({
    where: { billingEmail: demoEmail },
    select: { id: true },
  });
  const accountIds = demoAccounts.map((a) => a.id);

  // Corporate invoices (line items + events go with them)
  const corpInvoices = await db.corporateInvoice.deleteMany({
    where: {
      OR: [
        { corporateAccountId: { in: accountIds } },
        { invoiceNumber: { startsWith: "DEMO-" } },
      ],
    },
  });
  log(`  ✓ ${corpInvoices.count} corporate invoices`);

  // Rides (payments, assignments, history, stops, fees, notes go with them)
  const bookings = await db.booking.deleteMany({
    where: {
      OR: [
        { internalNotes: { startsWith: DEMO_TAG } },
        { guestEmail: demoEmail },
        { user: { email: demoEmail } },
        { corporateAccountId: { in: accountIds } },
      ],
    },
  });
  log(`  ✓ ${bookings.count} rides`);

  const invoices = await db.invoice.deleteMany({
    where: {
      OR: [
        { internalNotes: { startsWith: DEMO_TAG } },
        { invoiceNumber: { startsWith: "DEMO-" } },
      ],
    },
  });
  log(`  ✓ ${invoices.count} invoices`);

  const inquiries = await db.corporateInquiry.deleteMany({
    where: { email: demoEmail },
  });
  log(`  ✓ ${inquiries.count} corporate inquiries`);

  const accounts = await db.corporateAccount.deleteMany({
    where: { id: { in: accountIds } },
  });
  log(`  ✓ ${accounts.count} corporate accounts`);

  const codes = await db.discountCode.deleteMany({
    where: { notes: { startsWith: DEMO_TAG } },
  });
  log(`  ✓ ${codes.count} discount codes`);

  const blackouts = await db.blackoutDate.deleteMany({
    where: { reason: { startsWith: DEMO_TAG } },
  });
  log(`  ✓ ${blackouts.count} blackout dates`);

  const units = await db.vehicleUnit.deleteMany({
    where: { plate: { startsWith: "DEMO-" } },
  });
  log(`  ✓ ${units.count} vehicle units`);

  // People last (driver profiles, contacts etc. go with them)
  const users = await db.user.deleteMany({ where: { email: demoEmail } });
  log(`  ✓ ${users.count} demo users`);
}

// Run directly: `tsx prisma/clearDemo.ts`
if (process.argv[1]?.replace(/\\/g, "/").endsWith("prisma/clearDemo.ts")) {
  const db = new PrismaClient();
  console.log("Removing demo data…");
  clearDemoData(db)
    .then(() => console.log("Done. Only demo data was removed."))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => db.$disconnect());
}
