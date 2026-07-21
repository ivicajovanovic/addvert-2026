"use client"

import Link from "next/link"
import { useEffect, useState, useSyncExternalStore } from "react"
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_EVENT,
  isCookieConsentValue,
  type CookieConsentState,
  type CookieConsentValue,
} from "@/lib/cookie-consent"
import { GoogleAnalytics } from "@/components/google-analytics"

let sessionConsent: CookieConsentState = "unknown"

function getCookieConsent() {
  if (sessionConsent !== "unknown") {
    return sessionConsent
  }

  try {
    const savedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return isCookieConsentValue(savedConsent) ? savedConsent : "unknown"
  } catch {
    return "unknown"
  }
}

function getServerCookieConsent(): CookieConsentState {
  return "unknown"
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_KEY) {
      sessionConsent = "unknown"
      onStoreChange()
    }
  }

  window.addEventListener("storage", handleStorageChange)
  window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", handleStorageChange)
    window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange)
  }
}

function saveCookieConsent(value: CookieConsentValue) {
  sessionConsent = value

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // The selected value still applies for this visit when storage is unavailable.
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT))
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsent,
    getServerCookieConsent,
  )
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const isOpen = consent === "unknown" || preferencesOpen

  useEffect(() => {
    const showPreferences = () => setPreferencesOpen(true)

    window.addEventListener(COOKIE_PREFERENCES_EVENT, showPreferences)
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, showPreferences)
  }, [])

  const handleConsentChoice = (value: CookieConsentValue) => {
    saveCookieConsent(value)
    setPreferencesOpen(false)
  }

  return (
    <>
      <GoogleAnalytics enabled={consent === "granted"} />
      {isOpen ? (
        <section
          role="region"
          aria-label="Podešavanja kolačića"
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto border border-white/10 bg-card px-5 py-6 md:px-8 md:py-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold tracking-tight text-white">Kolačići i analitika</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Koristimo analitiku da razumemo kako se sajt koristi. Ona se aktivira samo ako je prihvatite. Više informacija je u{" "}
                  <Link
                    href="/politika-privatnosti"
                    className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    Politici privatnosti
                  </Link>.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => handleConsentChoice("denied")}
                  className="min-h-11 border border-white/30 px-5 text-sm font-medium text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Odbijam
                </button>
                <button
                  type="button"
                  onClick={() => handleConsentChoice("granted")}
                  className="min-h-11 bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Prihvatam analitiku
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
