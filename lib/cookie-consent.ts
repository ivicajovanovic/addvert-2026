export const COOKIE_CONSENT_KEY = "addvert-cookie-consent"
export const COOKIE_PREFERENCES_EVENT = "addvert:open-cookie-preferences"
export const COOKIE_CONSENT_CHANGED_EVENT = "addvert:cookie-consent-changed"

export type CookieConsentValue = "granted" | "denied"
export type CookieConsentState = CookieConsentValue | "unknown"

export function isCookieConsentValue(value: string | null): value is CookieConsentValue {
  return value === "granted" || value === "denied"
}
