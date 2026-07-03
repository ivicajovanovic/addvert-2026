import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export function HomeAboutTeaser() {
  return (
    <section className="py-24 md:py-32 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 items-center">
          <div className="md:col-span-5 flex flex-col gap-8">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">O nama</h2>
            </ScrollReveal>
            <ScrollReveal animation="fade" delay={200} duration={500}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ADD VERT postoji od 31. decembra 2016. godine, ali naše iskustvo u dizajnu, štampi i proizvodnoj
                pripremi traje od 2003. godine. Radimo kao mali, precizan tim sa fokusom na hotele, restorane i
                wellness objekte.
              </p>
              <Link
                href="/o-nama"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
              >
                Pročitajte celu priču
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="hidden md:block md:col-span-1" />

          <ScrollReveal animation="zoom" delay={100} duration={600} className="md:col-span-6">
            <Link href="/o-nama" className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src="/o-nama.webp"
                  alt="Spakovani hotelski peškiri sa mašinskim vezom, ADD VERT"
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
