"use client";

// The admin side nav on desktop: the admin pages in four groups
// (adminNav.tsx), shown by the shared PortalSideNav, then the other
// dashboards and Sign out. At 1068px and below the layout hides it and the
// site menu's "Admin options" lists the same pages.

import PortalSideNav from "@/components/shared/PortalNav/PortalSideNav";
import type {
  PortalExtraLink,
  PortalNavGroup,
} from "@/components/shared/PortalNav/portalNav";
import { ADMIN_NAV_GROUPS } from "./adminNav";

const GROUPS: PortalNavGroup[] = ADMIN_NAV_GROUPS.map((g) => ({
  label: g.label,
  items: g.items.map((i) => ({ ...i, key: i.href, short: i.title })),
}));

const EXTRA_LINKS: PortalExtraLink[] = [
  { title: "User dashboard", href: "/dashboard" },
  { title: "Driver dashboard", href: "/driver-dashboard" },
  { title: "Corporate dashboard", href: "/corporate" },
];

export default function AdminSideNav() {
  return (
    <PortalSideNav
      groups={GROUPS}
      rootHref='/admin'
      label='Admin'
      extraLinks={EXTRA_LINKS}
    />
  );
}
