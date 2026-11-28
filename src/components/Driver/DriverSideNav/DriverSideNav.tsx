"use client";

// The driver dashboard's side nav on desktop: its pages in three groups
// (driverNav.tsx), shown by the shared PortalSideNav, then the person's
// other dashboards and Sign out.

import PortalSideNav from "@/components/shared/PortalNav/PortalSideNav";
import {
  driverExtraLinks,
  driverNavGroups,
  type DriverNavCounts,
} from "./driverNav";

export type DriverSideNavProps = DriverNavCounts & { roles?: string[] };

export default function DriverSideNav({
  roles = [],
  ...counts
}: DriverSideNavProps) {
  return (
    <PortalSideNav
      groups={driverNavGroups(counts)}
      rootHref='/driver-dashboard'
      label='Driver dashboard'
      extraLinks={driverExtraLinks(roles)}
    />
  );
}
