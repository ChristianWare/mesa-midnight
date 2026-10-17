# Fonts & Footers — Black Car Platform Foundation

The starting point for every black car / limo site. Clone it, fill in one config
file, design the public pages, add content. The booking engine, payments, and the
four dashboards (customer, driver, corporate, admin) come working out of the box.

**Every public page is a bare-bones placeholder** that lists what belongs on it
(hero, trust strip, services, FAQ…) and where its content lives. Design each one
per client; the platform pages (dashboards, booking, auth) are finished.

Ported from the Nier Transportation production build. See `docs/PORT-NOTES.md`
for exactly what changed.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Prisma 6 + Postgres ·
NextAuth v5 · Stripe · Resend · Google Maps · Cloudinary · Web Push · MDX blog ·
CSS Modules

## Quick start

```bash
npm install                 # runs prisma generate; works before .env exists
cp .env.example .env        # fill in DATABASE_URL, AUTH_SECRET, Stripe, Resend, Maps, Cloudinary
npm run db:push             # create the tables
npm run db:seed             # admin login, company settings, default services/vehicles/airports
npm run dev                 # http://localhost:3000  → /login with the seeded admin
```

Default admin: `admin@example.com` / `ChangeMe123!` (override with
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` before seeding).

## The only things you touch per client

| What | Where |
|---|---|
| Name, phone, emails, address, domain, socials, owner | `src/config/site.ts` |
| Colors and fonts | `src/app/globals.css` (`:root` tokens) + `src/app/layout.tsx` (font import) |
| Services, cities, routes, airports, fleet, FAQs | `src/lib/services.ts`, `cities.ts`, `routes.ts`, `airports.ts`, `data.ts` (example entries; one entry = one page) |
| What each page should contain | `src/lib/pageGuides.ts` (shown on every placeholder page) |
| Blog posts | `content/blog/*.mdx` |
| Logo, OG image, favicon, PWA icons | `public/brand/`, `src/app/favicon.ico`, `src/app/apple-touch-icon.png`, `public/icons/` |
| Public page design | `src/app/{page,about,services,fleet,airports,locations,routes,corporate-accounts,contact,blog,privacy,terms}` — each renders `PagePlaceholder` until designed |
| Nav and footer | `src/components/shared/Nav`, `src/components/shared/Footer` (minimal, text wordmark, no logo) |
| Secrets and deployment URLs | `.env` |

Everything under `actions/`, `prisma/`, `src/lib/` (except the content files
above), `src/app/{admin,dashboard,driver-dashboard,corporate,book,pay,api,(auth)}`
and `src/components/{admin,Driver,Dashboard,corporate,BookingPage,auth,loginPage,registerPage,shared}`
is the platform. Fix it once here, never inside a client repo. The custom icons
live in `src/components/shared/icons`.

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Asset manifest → `prisma generate` → `next build` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` | Sync schema to the database (fresh projects) |
| `npm run db:seed` | Seed admin + defaults (safe to re-run) |
| `npm run db:seed:demo` | Add a year of sample rides, drivers, customers and corporate accounts so the dashboards have data (dev only, re-run to refresh) |
| `npm run db:demo:clear` | Remove only the sample data |
| `npm run db:studio` | Prisma Studio |

## Docs

- `docs/NEW-CLIENT-CHECKLIST.md` — clone → provision → configure → launch, step by step
- `docs/ARCHITECTURE.md` — platform vs. site map, every route, every role
- `docs/PORT-NOTES.md` — what was removed or changed from nier-final, and known follow-ups
