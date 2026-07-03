import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS } from "@/lib/site-config"
import { ScrollReveal } from "./scroll-reveal"

const partnerMailSubject = encodeURIComponent("Partnerski program")

export function PartnersCtaSection() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal animation="fade" duration={600}>
          <div className="border border-white/10 bg-white/[0.02] p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-8 space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Partnerski program</p>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Proizvodite tekstil? Povežimo se.</h2>
                <div className="h-1 w-12 bg-white" />
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Ako ste pogon za proizvodnju tekstila, fashion brend ili veći dobavljač, ponudite svojim klijentima i
                  mašinski vez i DTF štampu. Šta nudimo partnerima: konkurentne uslove, tačne rokove, profesionalnu
                  pripremu fajlova i mogućnost white label saradnje.
                </p>
              </div>

              <div className="lg:col-span-4">
                <Button
                  asChild
                  className="h-12 w-full rounded-none bg-white px-8 text-sm font-semibold tracking-wide text-black hover:bg-gray-200 sm:w-auto"
                >
                  <Link href={`mailto:${BUSINESS.email}?subject=${partnerMailSubject}`}>
                    <Mail className="mr-2 size-4" aria-hidden="true" />
                    Postanite partner
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
