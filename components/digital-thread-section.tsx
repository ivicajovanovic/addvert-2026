import { ScrollReveal } from "./scroll-reveal"

export function DigitalThreadSection() {
  return (
    <section className="py-24 md:py-32 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Section Heading */}
          <div className="md:col-span-4">
            <ScrollReveal animation="fade" duration={500}>
              <h2 className="text-xl md:text-2xl font-medium tracking-tight text-muted-foreground sticky top-24">
                ADD VERT pristup
              </h2>
            </ScrollReveal>
          </div>

          {/* Content */}
          <div className="md:col-span-8 space-y-16">
            {/* Pull Quote */}
            <ScrollReveal animation="slide-up" delay={100} duration={600}>
              <div className="space-y-6">
                <blockquote className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-balance">
                  &ldquo;Svaki motiv prilagođavamo vrsti materijala, dimenziji i nameni proizvoda. Isti fajl ne može dati
                  isti rezultat na majici, kačketu, peškiru i radnoj uniformi.&rdquo;
                </blockquote>
                <p className="text-lg text-muted-foreground font-medium">ADD VERT pristup</p>
              </div>
            </ScrollReveal>

            {/* Supporting Text */}
            <ScrollReveal animation="fade" delay={300} duration={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-white/10">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  Podešavamo gustinu bodova, podlogu, kompenzaciju, redosled vezenja i napetost konca. Tako dobijamo
                  čist vez bez deformacija, nabiranja i nepotrebne tvrdoće.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  Cilj nije samo da vez dobro izgleda kada izađe iz mašine. Mora ostati stabilan, uredan i postojan
                  tokom nošenja, korišćenja i pranja.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
