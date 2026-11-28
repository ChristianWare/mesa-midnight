"use client";

// The driver dashboard's navigation on tablets and phones (1068px and
// below): Home, Trips, Schedule and Earnings, and More with Profile,
// Notifications, Support, the person's other dashboards and Log out. Shown
// by the shared PortalBottomBar. The greet sign fills the whole screen, so
// the bar stays away there.

import PortalBottomBar from "@/components/shared/PortalNav/PortalBottomBar";
import {
  DRIVER_TAB_KEYS,
  driverExtraLinks,
  driverNavGroups,
  type DriverNavCounts,
} from "@/components/Driver/DriverSideNav/driverNav";

const GREET_SIGN = /^\/driver-dashboard\/trips\/[^/]+\/greetsign/;

type Props = DriverNavCounts & { roles?: string[] };

export default function DriverBottomBar({ roles = [], ...counts }: Props) {
  return (
    <PortalBottomBar
      items={driverNavGroups(counts).flatMap((g) => g.items)}
      tabKeys={DRIVER_TAB_KEYS}
      rootHref='/driver-dashboard'
      label='Driver dashboard'
      extraLinks={driverExtraLinks(roles)}
      hideOn={GREET_SIGN}
    />
  );
}
