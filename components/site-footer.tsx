import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"
import { BUSINESS, NAV_ITEMS, PHONES, SITE_NAME, SOCIAL_LINKS } from "@/lib/site-config"

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return <Instagram className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
  }

  return <Facebook className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">{BUSINESS.tagline}</p>
            <div className="flex gap-3 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center border border-white/20 text-muted-foreground transition-colors hover:border-white hover:text-white"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigacija</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Kontakt</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{BUSINESS.address.formatted}</li>
              <li>
                {PHONES.map((phone, index) => (
                  <span key={phone.tel}>
                    {index > 0 ? <span className="mx-2 text-white/20">·</span> : null}
                    <a href={`tel:${phone.tel}`} className="transition-colors hover:text-white">
                      {phone.display}
                    </a>
                  </span>
                ))}
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-white">
                  {BUSINESS.email}
                </a>
              </li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Društvene mreže</h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    <SocialIcon label={social.label} />
                    <span>{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            © <span suppressHydrationWarning>{year}</span> {SITE_NAME}. Sva prava zadržana.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:justify-end">
            <CookiePreferencesButton />
            <Link
              href="/politika-privatnosti"
              className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Politika privatnosti
            </Link>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>Web design &amp; obrada fotografija: Ivica Jovanović.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
