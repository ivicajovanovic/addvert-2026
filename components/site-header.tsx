"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { Mail, Menu, X } from "lucide-react"
import { InteractiveCompass } from "@/components/interactive-compass"
import { CTA_QUOTE, NAV_ITEMS, SITE_NAME } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const headerCtaClassName =
  "hidden h-10 items-center justify-center gap-2 rounded-none bg-white px-5 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-gray-200 lg:inline-flex"

function subscribeToClientMount() {
  return () => {}
}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const hasMounted = useSyncExternalStore(subscribeToClientMount, getClientSnapshot, getServerSnapshot)
  const mobileMenuId = "mobile-menu"

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="h-8 w-8 text-white">
              <InteractiveCompass />
            </div>
            <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Glavni meni">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href={CTA_QUOTE.href} className={headerCtaClassName}>
              <Mail className="w-4 h-4" aria-hidden="true" />
              {CTA_QUOTE.label}
            </Link>

            <button
              type="button"
              className="flex lg:hidden items-center justify-center p-3 text-white transition-colors hover:text-white/80"
              onClick={() => setMobileOpen((open) => !open)}
              aria-controls={mobileMenuId}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
            >
              {mobileOpen ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <div
          id={mobileMenuId}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
            mobileOpen ? "max-h-[32rem]" : "max-h-0",
          )}
          aria-hidden={!mobileOpen}
          {...(hasMounted && !mobileOpen ? { inert: true } : {})}
        >
          <nav className="flex flex-col gap-1 border-t border-white/10 pb-4 pt-2" aria-label="Mobilni meni">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-medium text-muted-foreground uppercase tracking-wider transition-colors hover:text-white"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
