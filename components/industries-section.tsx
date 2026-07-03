"use client"

import * as React from "react"
import { ArrowRight, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { industries, industriesIntro, type Industry } from "@/lib/industries-data"
import { cn } from "@/lib/utils"
import { IndustryIcon } from "./industry-icon"
import { ScrollReveal } from "./scroll-reveal"

interface IndustriesSectionProps {
  hidePageHeader?: boolean
}

export function IndustriesSection({ hidePageHeader = false }: IndustriesSectionProps) {
  const [selectedIndustry, setSelectedIndustry] = React.useState<Industry | null>(null)

  const openIndustry = (industry: Industry) => {
    setSelectedIndustry(industry)
  }

  const closeIndustry = () => {
    setSelectedIndustry(null)
  }

  React.useEffect(() => {
    if (!selectedIndustry) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedIndustry])

  return (
    <>
      <section
        className={cn(
          "bg-background relative",
          hidePageHeader ? "py-16 md:py-24" : "border-t border-white/10 py-24 md:py-32",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {hidePageHeader ? null : (
              <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
                <ScrollReveal animation="slide-right" duration={500}>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                    Industrije koje opremamo
                  </h2>
                  <div className="h-1 w-12 bg-white mb-6" />
                  <p className="text-muted-foreground text-lg max-w-sm">{industriesIntro}</p>
                </ScrollReveal>
              </div>
            )}

            <div className={hidePageHeader ? "col-span-12" : "col-span-12 lg:col-span-8"}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
                {industries.map((industry, index) => (
                  <ScrollReveal key={industry.id} animation="slide-up" delay={index * 80} duration={500}>
                    <button
                      type="button"
                      id={industry.id}
                      onClick={() => openIndustry(industry)}
                      aria-label={industry.title}
                      className="group flex scroll-mt-24 flex-col border-t border-white/20 pt-6 h-full w-full text-left cursor-pointer"
                    >
                      <h3 className="mb-3 flex items-start gap-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white/80">
                        <IndustryIcon
                          id={industry.id}
                          className="mt-0.5 size-5 text-muted-foreground transition-colors group-hover:text-white/70"
                        />
                        <span>{industry.title}</span>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                        {industry.description}
                      </p>

                      <ul className="mb-4 flex flex-col gap-2 lg:hidden">
                        {industry.products.slice(0, 3).map((product) => (
                          <li key={product} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                            {product}
                          </li>
                        ))}
                      </ul>

                      <ul
                        className={cn(
                          "hidden flex-col gap-2 overflow-hidden transition-all duration-300 lg:flex",
                          "max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 group-hover:mb-4",
                        )}
                      >
                        {industry.products.slice(0, 4).map((product) => (
                          <li
                            key={product}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70 md:text-base"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                            {product}
                          </li>
                        ))}
                        {industry.products.length > 4 ? (
                          <li className="pl-4 text-sm font-medium uppercase tracking-wider text-white/50">
                            +{industry.products.length - 4} još
                          </li>
                        ) : null}
                      </ul>

                      <div className="mt-auto pt-2 flex items-center text-sm font-medium text-white opacity-70 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-2 lg:opacity-0">
                        Pogledaj artikle <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded overlay */}
      <Dialog open={selectedIndustry !== null} onOpenChange={(open) => !open && closeIndustry()}>
        {selectedIndustry ? (
          <DialogContent
            showCloseButton={false}
            className="z-[100] w-full max-w-lg rounded-none border border-white/10 bg-background p-8 md:p-10"
          >
            <DialogClose asChild>
              <button
                type="button"
                className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center text-white/70 transition-colors hover:text-white"
                aria-label="Zatvori"
              >
                <X className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1} />
              </button>
            </DialogClose>

            <DialogTitle asChild>
              <h3 className="mb-4 flex items-start gap-4 pr-10 text-2xl font-bold tracking-tighter text-white md:text-3xl">
                <IndustryIcon id={selectedIndustry.id} className="mt-1 size-6 text-white/60 md:size-7" />
                <span>{selectedIndustry.title}</span>
              </h3>
            </DialogTitle>
            <div className="mb-6 h-1 w-12 bg-white" />
            <DialogDescription asChild>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                {selectedIndustry.description}
              </p>
            </DialogDescription>

            <ul className="flex flex-col gap-3.5">
              {selectedIndustry.products.map((product) => (
                <li key={product} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                  {product}
                </li>
              ))}
            </ul>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  )
}
