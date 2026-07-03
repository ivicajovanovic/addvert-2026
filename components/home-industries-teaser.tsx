import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { industries, industriesIntro } from "@/lib/industries-data"
import { IndustryIcon } from "./industry-icon"
import { ScrollReveal } from "./scroll-reveal"

const teaserIndustries = industries.slice(0, 3)

export function HomeIndustriesTeaser() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                Industrije koje opremamo
              </h2>
              <div className="h-1 w-12 bg-white mb-6" />
              <p className="text-muted-foreground text-lg max-w-sm mb-8">{industriesIntro}</p>
              <Link
                href="/industrije"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
              >
                Sve industrije
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {teaserIndustries.map((industry, index) => (
                <ScrollReveal key={industry.id} animation="slide-up" delay={index * 80} duration={500}>
                  <Link
                    href={`/industrije#${industry.id}`}
                    className="group flex flex-col border-t border-white/20 pt-6 h-full"
                  >
                    <h3 className="mb-3 flex items-start gap-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white/80">
                      <IndustryIcon
                        id={industry.id}
                        className="mt-0.5 size-5 text-muted-foreground transition-colors group-hover:text-white/70"
                      />
                      <span>{industry.title}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4 flex-grow">
                      {industry.description}
                    </p>
                    <ul className="mb-5 flex flex-col gap-2">
                      {industry.products.slice(0, 2).map((product) => (
                        <li key={product} className="flex items-start gap-2 text-sm leading-relaxed text-white/65">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/35" aria-hidden="true" />
                          {product}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center text-sm font-medium text-white opacity-70 group-hover:opacity-100 transition-opacity">
                      Saznaj više <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
