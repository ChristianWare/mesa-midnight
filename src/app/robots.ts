import { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Demo site: block every crawler (see SITE.demo)
  if (SITE.demo) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // NOTE: robots rules are prefix matches. "/corporate/" (with the
        // trailing slash) blocks the portal's subpages WITHOUT blocking
        // the public /corporate-accounts page, which "/corporate" would.
        disallow: [
          "/admin",
          "/api",
          "/driver",
          "/dashboard",
          "/corporate/",
          "/pay",
          "/studio",
          "/book/confirmation",
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
