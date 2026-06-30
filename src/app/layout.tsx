import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://piyushgupta.io"),
  title: "Piyush Gupta — Sr Engineering Manager",
  description:
    "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (1M+ users), now leading platform engineering at Slice (10M+ users daily).",
  openGraph: {
    title: "Piyush Gupta — Sr Engineering Manager",
    description:
      "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (1M+ users), now leading platform engineering at Slice (10M+ users daily).",
    type: "website",
    url: "https://piyushgupta.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Gupta — Sr Engineering Manager",
    description:
      "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (1M+ users), now leading platform engineering at Slice (10M+ users daily).",
  },
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
      </head>
      <body className="min-h-full flex flex-col bg-grid">
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
