import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyush Gupta — Sr Engineering Manager",
  description:
    "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (3M+ users), now leading platform engineering at Slice (10M+ users daily).",
  openGraph: {
    title: "Piyush Gupta — Sr Engineering Manager",
    description:
      "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (3M+ users), now leading platform engineering at Slice (10M+ users daily).",
    type: "website",
    images: ["https://piyushgupta.io/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Gupta — Sr Engineering Manager",
    description:
      "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (3M+ users), now leading platform engineering at Slice (10M+ users daily).",
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
      <body className="min-h-full flex flex-col bg-grid">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
