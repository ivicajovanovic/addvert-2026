import { ScrollReveal } from "./scroll-reveal"

const stats = [
  { value: "23", suffix: "", label: "Godine iskustva u štampi" },
  { value: "10", suffix: "+", label: "Godina specijalizacije za vez" },
  { value: "100", suffix: "+", label: "Klijenata koji redovno naručuju" },
  { value: "5", suffix: "", label: "Mašina za precizan vez" },
]

export function StatsStrip() {
  return (
    <section className="bg-background border-t border-b border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} animation="slide-up" delay={index * 100} duration={500}>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-2">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
