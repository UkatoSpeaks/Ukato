import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { contact, profile, site } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { siteUrl } from "@/lib/site";
import { CommandPalette } from "@/components/CommandPalette";
import "./globals.css";

// Display: the name and section titles.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Body.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Labels, meta and tags.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: profile.name,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const resume = contact.links.find((l) => l.id === "resume");

// Dark is the default, so <html> ships with .dark. This runs before first
// paint and drops it when the visitor has saved the light theme.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS the load animation never runs, so show everything. */}
        <noscript>
          <style>{`[data-fade]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <CommandPalette
          resume={Boolean(resume && projectImage(resume.href))}
        />
      </body>
    </html>
  );
}
