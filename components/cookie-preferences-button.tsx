"use client"

import { useSyncExternalStore } from "react"
import { COOKIE_PREFERENCES_EVENT } from "@/lib/cookie-consent"

function subscribeToHydration() {
  return () => undefined
}

function getClientHydrationState() {
  return true
}

function getServerHydrationState() {
  return false
}

export function CookiePreferencesButton() {
  const isInteractive = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationState,
    getServerHydrationState,
  )

  const openPreferences = () => {
    window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))
  }

  return isInteractive ? (
    <>
      <button
        type="button"
        onClick={openPreferences}
        className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Podešavanja kolačića
      </button>
      <span aria-hidden="true" className="text-white/20">·</span>
    </>
  ) : null
}
