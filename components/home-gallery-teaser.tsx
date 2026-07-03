import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  CATEGORY_DTF,
  CATEGORY_EMBROIDERY,
  CATEGORY_OTHER,
  portfolioItems,
} from "@/lib/portfolio-data"
import { ScrollReveal } from "./scroll-reveal"

function pickTeaserItems() {
  const byCategory = (category: string, count: number) =>
    portfolioItems.filter((item) => item.category.includes(category)).slice(0, count)

  return [
    ...byCategory(CATEGORY_EMBROIDERY, 2),
    ...byCategory(CATEGORY_DTF, 2),
    ...byCategory(CATEGORY_OTHER, 2),
  ]
}

const teaserItems = pickTeaserItems()

export function HomeGalleryTeaser() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
            <ScrollReveal animation="slide-right" duration={500}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Galerija radova</h2>
              <div className="h-1 w-12 bg-white mb-6" />
              <p className="text-muted-foreground text-lg max-w-xs mb-8">
                Konkretni primeri mašinskog veza, DTF štampe i reklamnog brendiranja za kompanije, klubove i lokalne
                brendove.
              </p>
              <Link
                href="/galerija"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Pogledajte primere radova
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {teaserItems.map((item, index) => (
                <ScrollReveal key={item.id} animation="slide-up" delay={index * 80} duration={500}>
                  <Link
                    href="/galerija"
                    className="group block overflow-hidden bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.image_alt_text}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute left-3 top-3 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm">
                        {item.category.join(" / ")}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <p className="text-sm font-bold text-white">{item.title}</p>
                      </div>
                    </div>
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
