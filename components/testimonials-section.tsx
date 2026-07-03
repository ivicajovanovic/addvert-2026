"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "./scroll-reveal"

const testimonials = [
  {
    id: "goran-m",
    quote:
      "Add Vert razume poslovne potrebe i zna da predloži rešenje koje izgleda profesionalno, a realno može da se proizvede.",
    author: "Goran M.",
    role: "Sportski klub",
  },
  {
    id: "mirko-p",
    quote:
      "Majice i promo materijal za kafić izgledaju ozbiljno, čisto i kvalitetno. Bez komplikacija, sve po dogovoru.",
    author: "Mirko P.",
    role: "Ugostiteljstvo",
  },
  {
    id: "danijel-k",
    quote:
      "Uniforme i brendirani tekstil podigli su nam celokupan utisak kod klijenata. Kvalitetno i pouzdano urađeno.",
    author: "Danijel K.",
    role: "Korporativni sektor",
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused || testimonials.length <= 1) return
    timerRef.current = setInterval(next, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, next])

  const item = testimonials[active]

  return (
    <section className="py-24 md:py-32 border-b border-white/10 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal animation="fade" duration={500}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12 md:mb-16 text-center">
            Šta kažu naši klijenti
          </h2>
        </ScrollReveal>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ScrollReveal animation="slide-up" delay={100} duration={600}>
            <div className="relative max-w-4xl mx-auto border border-white/10 bg-white/5 p-8 md:p-12">
              <span
                aria-hidden="true"
                className="absolute left-6 top-4 md:left-8 md:top-6 select-none text-7xl md:text-8xl font-bold leading-none text-white/10"
              >
                &ldquo;
              </span>

              <blockquote className="relative space-y-8">
                <p className="text-lg md:text-xl leading-relaxed text-white/90 pt-8 md:pt-4">
                  {item.quote}
                </p>
                <footer className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/20" />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{item.author}</p>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </ScrollReveal>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex size-11 items-center justify-center border border-white/20 text-muted-foreground transition-colors hover:border-white hover:text-white"
              aria-label="Prethodni testimonijal"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>

            <div className="flex gap-1" role="tablist" aria-label="Testimonijali">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonijal ${i + 1}: ${testimonial.author}`}
                  onClick={() => setActive(i)}
                  className="flex size-8 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1 transition-all duration-300",
                      i === active ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex size-11 items-center justify-center border border-white/20 text-muted-foreground transition-colors hover:border-white hover:text-white"
              aria-label="Sledeći testimonijal"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
