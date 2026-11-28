import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CodeRainBackground } from "@/components/shared/CodeRainBackground";
import { GridBackground } from "@/components/shared/GridBackground";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root layout: global metadata, fonts, chrome (navbar + footer) and the
 * skip link that lets keyboard users jump straight to the page content.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches the browser chrome to the OS colour scheme; the app itself can
  // still be toggled independently via the navbar control.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#101827" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          {/* Site-wide backdrop: shared grid texture, then the code rain on
              top of it (later siblings paint above in the same layer). */}
          <GridBackground />
          <CodeRainBackground />

          {/* Keyboard users skip the fixed navigation entirely. */}
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-b-xl bg-accent px-5 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-0 focus:left-1/2 focus:-translate-x-1/2"
          >
            Skip to content
          </a>

          <Navbar />
          <div className="flex min-h-screen flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
