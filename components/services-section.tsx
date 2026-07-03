import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const services = [
  {
    id: "01",
    name: "Mašinski vez",
    description:
      "Polo majice, T-shirt majice, prsluci, jakne, košulje, kačketi, uniforme, cegeri, amblemi za moto klubove i druga udruženja.",
    href: "/galerija",
    ctaLabel: "Pogledajte radove",
  },
  {
    id: "02",
    name: "DTF štampa",
    description: "T-shirt majice, polo majice, dukserice, kačketi i radna odela. Trajna štampa na tekstilu.",
    href: "/galerija",
    ctaLabel: "Pogledajte radove",
  },
  {
    id: "03",
    name: "Vez na vašim komadima",
    description: "Primamo gotove komade od klijenata: kape, jakne, radna odela i torbe.",
    href: "/kontakt?usluga=masinski-vez",
    ctaLabel: "Pošaljite upit",
  },
  {
    id: "04",
    name: "Digitalizacija dizajna",
    description: "Profesionalna priprema dizajna za vez u specijalizovanim programima.",
    href: "/kontakt?usluga=digitalizacija",
    ctaLabel: "Pošaljite upit",
  },
  {
    id: "05",
    name: "UV štampa i sublimacija",
    description: "Štampa na različitim površinama, sublimacija na šoljama i promotivnim predmetima.",
    href: "/galerija",
    ctaLabel: "Pogledajte radove",
  },
  {
    id: "06",
    name: "Brendiranje objekata",
    description: "PVC folije za izloge i 3D svetleća slova. Dostupno po dogovoru sa klijentom.",
    href: "/kontakt?usluga=ostalo",
    ctaLabel: "Pošaljite upit",
  },
] as const

export function ServicesSection() {
  return (
    <section id="usluge" className="bg-background py-24 md:py-32 border-t border-white/10 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Naše usluge</h2>
              <div className="h-1 w-12 bg-white mb-6" />
              <p className="text-muted-foreground text-lg max-w-xs">
                Od logotipa i pripreme fajla do gotovog komada spremnog za vaš tim, lokal ili događaj.
              </p>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} animation="slide-up" delay={index * 100} duration={500}>
                  <Link
                    href={service.href}
                    className="group flex flex-col border-t border-white/20 pt-6 h-full transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <span className="text-xs font-mono text-white/50 mb-4 block">{service.id}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white/80 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6 flex-grow">
                      {service.description}
                    </p>
                    <span className="mt-auto pt-4 flex items-center text-sm font-medium text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
                      {service.ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
