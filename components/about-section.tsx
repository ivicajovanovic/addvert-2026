import Image from "next/image"
import { aboutImage, aboutParagraphs } from "@/lib/about-data"
import { ScrollReveal } from "./scroll-reveal"

export function AboutSection() {
  return (
    <section className="border-b border-white/10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="flex flex-col gap-8 md:col-span-5">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Naša priča</h2>
            </ScrollReveal>
            <ScrollReveal animation="fade" delay={200} duration={500}>
              <div className="space-y-6 text-lg text-muted-foreground">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="hidden md:col-span-1 md:block" />

          <ScrollReveal animation="zoom" delay={100} duration={600} className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
