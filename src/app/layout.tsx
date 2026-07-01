import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const SITE_URL = "https://www.piyushgupta.io";
const DESCRIPTION =
  "Sr Engineering Manager · IIT Roorkee · Disney+ Hotstar (50M CCU) · Founded JumpingMinds AI (1M+ users) · AI systems at Slice · Open to Sr EM roles globally.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Piyush Gupta — Sr Engineering Manager",
    template: "%s — Piyush Gupta",
  },
  description: DESCRIPTION,
  authors: [{ name: "Piyush Gupta", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Piyush Gupta — Sr Engineering Manager",
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Piyush Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Gupta — Sr Engineering Manager",
    description: DESCRIPTION,
    creator: "@piyushgupta27",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Piyush Gupta",
  url: SITE_URL,
  jobTitle: "Sr Engineering Manager",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology Roorkee",
    },
  ],
  sameAs: [
    "https://github.com/piyushgupta27",
    "https://linkedin.com/in/piyushgupta27",
    "https://twitter.com/piyushgupta27",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-grid">
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </MotionProvider>
      </body>
    </html>
  );
}
