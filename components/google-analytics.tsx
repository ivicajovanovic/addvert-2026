"use client"

import Script from "next/script"
import { useEffect } from "react"

import { GOOGLE_ANALYTICS_ID } from "@/lib/site-config"

interface GoogleAnalyticsProps {
  enabled: boolean
}

export function GoogleAnalytics({ enabled }: GoogleAnalyticsProps) {
  useEffect(() => {
    const disableKey = `ga-disable-${GOOGLE_ANALYTICS_ID}`
    const analyticsWindow = window as unknown as Record<string, boolean>
    analyticsWindow[disableKey] = !enabled
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </>
  )
}
