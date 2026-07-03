import { FileText, Wand2, Scissors, PackageCheck } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const steps = [
  {
    number: "01",
    title: "Dizajn / Priprema",
    description:
      "Klijent dostavlja logo (PDF, AI, EPS, PNG, JPG). Proveravamo izvodljivost i predlažemo optimizaciju.",
    timeframe: "1 dan",
    icon: FileText,
  },
  {
    number: "02",
    title: "Digitalizacija",
    description: "Pretvaramo dizajn u fajl spreman za mašinski vez u profesionalnim programima.",
    timeframe: "2 do 4 dana",
    icon: Wand2,
  },
  {
    number: "03",
    title: "Vez / Štampa",
    description: "Proizvodnja na mašinama, vez ili DTF štampa, u zavisnosti od projekta.",
    timeframe: "5 do 10 dana",
    icon: Scissors,
  },
  {
    number: "04",
    title: "Kontrola i isporuka",
    description:
      "Finalna provera i pakovanje. Lično preuzimanje, kurirska služba ili direktna isporuka.",
    timeframe: "1 dan",
    icon: PackageCheck,
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-y-12 md:gap-8">
          {/* Section Header */}
          <div className="col-span-12 md:col-span-4">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Kako naručiti vez ili DTF štampu
              </h2>
              <p className="text-muted-foreground text-lg max-w-sm">
                Od ideje do gotovog proizvoda, transparentno i profesionalno
              </p>
            </ScrollReveal>
          </div>

          {/* Steps Grid */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {steps.map((step, index) => (
                <ScrollReveal key={step.number} animation="slide-up" delay={index * 100} duration={500}>
                  <div className="group relative">
                    {/* Top Border */}
                    <div className="absolute top-0 left-0 w-full h-px bg-white/20 group-hover:bg-white transition-colors duration-300" />

                    <div className="pt-6">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-4xl md:text-5xl font-bold text-white/20 group-hover:text-white transition-colors duration-300">
                          {step.number}
                        </span>
                        <step.icon className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      <p className="text-xs font-mono text-white/50 uppercase tracking-widest mt-3">
                        {step.timeframe}
                      </p>
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
