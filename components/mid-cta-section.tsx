import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CTA_QUOTE, PRIMARY_PHONE } from "@/lib/site-config"
import { ScrollReveal } from "./scroll-reveal"

export function MidCtaSection() {
  return (
    <section className="py-24 md:py-32 border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal animation="fade" duration={600}>
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">Zatražite ponudu</p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Spremni ste za saradnju?</h2>

            <div className="mx-auto h-1 w-12 bg-white" />

            <p className="text-lg text-muted-foreground leading-relaxed">
              Pošaljite nam upit ili nas pozovite. Odgovaramo isti radni dan.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 pt-2">
              <Button
                size="lg"
                className="rounded-none h-14 px-10 text-base font-semibold tracking-wide bg-white text-black hover:bg-gray-200"
                asChild
              >
                <Link href={CTA_QUOTE.href}>Zatražite ponudu</Link>
              </Button>
              <a
                href={`tel:${PRIMARY_PHONE.tel}`}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {PRIMARY_PHONE.display}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
