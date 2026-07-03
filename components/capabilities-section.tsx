import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const capabilities = [
  {
    category: "Formati fajlova",
    details: [
      { label: "Prihvatamo", value: ".PDF, .AI, .EPS, .PNG, .JPG" },
      { label: "Isporučujemo", value: ".DST, .PES, .EXP, .JEF, .XXX" },
    ],
  },
  {
    category: "Kapaciteti veza",
    details: [
      { label: "Kapacitet", value: "Do 150.000 uboda po dizajnu" },
      { label: "Boje", value: "1–15 boja iglom, standard" },
    ],
  },
  {
    category: "Materijali",
    details: [
      { label: "Tkanine", value: "Pamuk, Poliester, Keper, Džins" },
      { label: "Specijalno", value: "Fleece, Kačketi, Peškiri, Koža" },
    ],
  },
  {
    category: "Minimum narudžbine",
    details: [
      { label: "Mašinski vez", value: "20+ komada po dizajnu" },
      { label: "DTF štampa", value: "10+ komada po dizajnu" },
    ],
  },
]

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 md:py-32 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-8">
          <div className="md:col-span-4">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Materijali i kapaciteti</h2>
              <p className="text-muted-foreground text-lg max-w-sm">
                Konkretne specifikacije za profesionalnu saradnju.
              </p>
            </ScrollReveal>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {capabilities.map((item, index) => (
                <ScrollReveal key={item.category} animation="slide-up" delay={index * 100} duration={500}>
                  <div className="group">
                    <div className="border-t border-white/20 pt-6 transition-colors duration-300 group-hover:border-white">
                      <h3 className="text-xl font-medium mb-6 flex items-center justify-between">
                        {item.category}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </h3>
                      <div className="space-y-4">
                        {item.details.map((detail) => (
                          <div key={detail.label} className="grid grid-cols-12 gap-4">
                            <span className="col-span-4 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                              {detail.label}
                            </span>
                            <span className="col-span-8 text-sm font-medium">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
