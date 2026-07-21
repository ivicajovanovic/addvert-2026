import type React from "react"
import type { Viewport } from "next"
import { Inter } from "next/font/google"
import { CookieConsent } from "@/components/cookie-consent"
import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SiteMusic } from "@/components/site-music"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ROOT_METADATA } from "@/lib/metadata"
import { getLocalBusinessJsonLd, getWebSiteJsonLd } from "@/lib/structured-data"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = ROOT_METADATA

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" className="dark">
      <head>
        <JsonLd data={[getWebSiteJsonLd(), getLocalBusinessJsonLd()]} />
      </head>
      <body className={cn("min-h-screen bg-background font-sans text-foreground antialiased", inter.variable)}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteMusic />
        <ScrollToTop />
        <CookieConsent />
      </body>
    </html>
  )
}
