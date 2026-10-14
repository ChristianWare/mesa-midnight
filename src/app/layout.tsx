import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/shared/Footer/Footer";
import SessionProviderWrap from "@/components/Providers/SessionProvider";
import ToastsProvider from "@/components/Providers/ToastsProvider";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";
import PlausibleProvider from "next-plausible";
import { SITE } from "@/config/site";
import { serviceAreaCities } from "@/lib/cities";
import localFont from "next/font/local";

// CreatoDisplay-ExtraBold.otf

const CreatoDisplayExtraBold = localFont({
  src: "../../public/fonts/CreatoDisplay-ExtraBold.otf",
  variable: "--CreatoDisplayExtraBold",
  display: "swap",
});

const CreatoDisplayBold = localFont({
  src: "../../public/fonts/CreatoDisplay-Bold.otf",
  variable: "--CreatoDisplayBold",
  display: "swap",
});

const CreatoDisplayMedium = localFont({
  src: "../../public/fonts/CreatoDisplay-Medium.otf",
  variable: "--CreatoDisplayMedium",
  display: "swap",
});

const CreatoDisplayRegular = localFont({
  src: "../../public/fonts/CreatoDisplay-Regular.otf",
  variable: "--CreatoDisplayRegular",
  display: "swap",
});

const IBMPlex = localFont({
  src: "../../public/fonts/IBMPlexMono-Medium.ttf",
  variable: "--IBMPlex",
  display: "swap",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  image: `${SITE.url}/brand/logo.png`,
  telephone: SITE.phone.tel,
  email: SITE.email.info,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  areaServed: serviceAreaCities.map(
    (c) => `${c.name}, ${SITE.market.stateCode}`,
  ),
  sameAs: Object.values(SITE.social).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* ── Cloudinary preconnect ── */}
        {/* <link rel='preconnect' href='https://res.cloudinary.com' /> */}
        {/* <link
          rel='preload'
          href='https://res.cloudinary.com/dkxlrhwjd/video/upload/q_auto/phx_y9t0y5.mp4'
          as='video'
          type='video/mp4'
        /> */}
        <link rel='preconnect' href='https://plausible.io' />

        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/dkxlrhwjd/image/upload/w_750,q_60,f_auto/phx-poster_bps55j'
          media='(max-width: 768px)'
        />

        {/* ── PWA ── */}
        <meta name='theme-color' content={SITE.themeColor} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content={SITE.name} />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </head>
      <body
        className={`${inter.variable} ${CreatoDisplayExtraBold.variable} ${CreatoDisplayBold.variable} ${CreatoDisplayMedium.variable} ${CreatoDisplayRegular.variable} ${IBMPlex.variable}`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ScrollToTop />
        <PlausibleProvider
          domain={SITE.domain}
          trackLocalhost={false}
          enabled={true}
        >
          <SessionProviderWrap>
            <ToastsProvider />
            {children}
            <Footer />
          </SessionProviderWrap>
        </PlausibleProvider>
      </body>
    </html>
  );
}
