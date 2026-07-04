import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ScrollReveal } from "./scroll-reveal"

const commonRequests = [
  {
    id: "01",
    title: "Peškiri sa logom",
    description: "Za hotele, apartmane, spa centre i poklone. Mašinski vez na peškirima koji moraju da traju.",
  },
  {
    id: "02",
    title: "Radna odeća sa logom",
    description: "Uniforme, kecelje, prsluci, jakne i majice za restorane, servise, firme i terenske timove.",
  },
  {
    id: "03",
    title: "Majice i duksevi sa logom",
    description: "DTF štampa i vez za firme, klubove, promo kampanje, događaje i zaposlene.",
  },
  {
    id: "04",
    title: "Vezeni amblemi",
    description: "Amblemi za klubove, udruženja, uniforme, radnu odeću, jakne i opremu.",
  },
  {
    id: "05",
    title: "Personalizovani pokloni",
    description: "Peškiri sa imenom, pokloni za bebe, krštenja, venčanja i posebne prilike.",
  },
] as const

export function CommonRequestsSection() {
  return (
    <section className="border-t border-white/10 bg-background py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          <div className="col-span-12 mb-12 lg:col-span-4 lg:mb-0">
            <ScrollReveal animation="slide-right" duration={500}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-white/45">
                Šta najčešće radimo
              </p>
              <h2 className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
                Kupci najčešće ne traže tehniku, nego gotov proizvod.
              </h2>
              <div className="mb-6 h-1 w-12 bg-white" />
              <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
                Zato najčešće upite prevodimo u konkretne narudžbine: peškiri sa logom, radna odeća, majice,
                amblemi i personalizovani pokloni.
              </p>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="border-b border-white/10">
              {commonRequests.map((request, index) => (
                <ScrollReveal key={request.id} animation="slide-up" delay={index * 80} duration={500}>
                  <div className="grid gap-4 border-t border-white/15 py-6 transition-colors duration-300 hover:border-white/35 md:grid-cols-12 md:gap-6 md:py-7">
                    <div className="flex items-baseline gap-4 md:col-span-5">
                      <span className="font-mono text-xs text-white/40">{request.id}</span>
                      <h3 className="text-2xl font-bold tracking-tight text-white">{request.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground md:col-span-7 md:text-base">
                      {request.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal animation="fade" delay={commonRequests.length * 80} duration={500}>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-white/55">
                  Ako već znate šta želite da brendirate, pošaljite kratak opis, količinu i rok. Predložićemo da li je
                  bolji mašinski vez, DTF štampa ili kombinacija.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex shrink-0 items-center gap-2 border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Pošaljite upit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
