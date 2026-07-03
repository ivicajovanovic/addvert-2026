import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

const partners = [
  { label: "Hotelski sektor", href: "/industrije#hoteli-restorani" },
  { label: "Restorani", href: "/industrije#hoteli-restorani" },
  { label: "Sportski klubovi", href: "/industrije#sportski-klubovi" },
  { label: "Korporacije", href: "/industrije#korporativni-sektor" },
  { label: "Wellness", href: "/industrije#frizerstvo-kozmetika" },
] as const

export function ClientLogos() {
  return (
    <section className="py-16 border-b border-white/10 bg-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-3 shrink-0">
            <ScrollReveal animation="fade" duration={500}>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Sarađujemo sa</h3>
            </ScrollReveal>
          </div>
          <div className="md:col-span-9">
            <ScrollReveal animation="fade" delay={100} duration={500}>
              <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 md:gap-x-12 lg:gap-x-14">
                {partners.map((partner) => (
                  <li key={partner.label}>
                    <Link
                      href={partner.href}
                      className="text-lg font-bold tracking-tight whitespace-nowrap text-white/50 transition-colors hover:text-white"
                    >
                      {partner.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
