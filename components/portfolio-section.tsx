"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import {
  CATEGORY_EMBROIDERY,
  portfolioCategories,
  portfolioItems,
  type PortfolioItem,
} from "@/lib/portfolio-data"
import { ScrollReveal } from "./scroll-reveal"

const categories = portfolioCategories

interface PortfolioSectionProps {
  hidePageHeader?: boolean
}

export function PortfolioSection({ hidePageHeader = false }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState(CATEGORY_EMBROIDERY)
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null)

  const filteredItems = portfolioItems.filter((item) => item.category.includes(activeCategory))

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = React.useCallback(() => {
    setSelectedItem(null)
  }, [])

  const navigateLightbox = React.useCallback(
    (direction: "next" | "prev") => {
      setSelectedItem((current) => {
        if (!current) return current
        const currentIndex = filteredItems.findIndex((item) => item.id === current.id)
        const newIndex =
          direction === "next"
            ? (currentIndex + 1) % filteredItems.length
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length
        return filteredItems[newIndex]
      })
    },
    [filteredItems],
  )

  React.useEffect(() => {
    if (!selectedItem) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedItem])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") navigateLightbox("next")
      if (e.key === "ArrowLeft") navigateLightbox("prev")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, closeLightbox, navigateLightbox])

  return (
    <section
      id="galerija"
      className={cn(
        "bg-background relative",
        hidePageHeader ? "py-16 md:py-24" : "border-t border-white/10 py-24 md:py-32",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {/* Section Header & Filter (Left Column on Desktop) */}
          <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0 flex flex-col items-start">
            {hidePageHeader ? null : (
              <ScrollReveal animation="slide-right" duration={500}>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Galerija radova</h2>
                <div className="h-1 w-12 bg-white mb-8" />
                <p className="text-muted-foreground text-lg max-w-xs mb-12">
                  Odabrani primeri naših radova iz mašinskog veza i digitalnog dizajna.
                </p>
              </ScrollReveal>
            )}

            {hidePageHeader ? (
              <div className="mb-8 max-w-sm lg:mb-12">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Primeri su organizovani u tri kategorije (mašinski vez, DTF i razno brendiranje) da brzo
                  vidite da li je rad sličan onome što vama treba.
                </p>
                <p className="mt-4 border-l border-white/20 pl-4 text-sm leading-relaxed text-white/60">
                  Obratite pažnju na poziciju logotipa, materijal i namenu artikla.
                </p>
              </div>
            ) : null}

            {/* Vertical Filter for Swiss Style Layout */}
            <ScrollReveal
              animation="fade"
              delay={200}
              duration={500}
              className="hidden lg:flex flex-col space-y-4 w-full"
            >
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2">Filtriraj po</span>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "min-h-11 py-3 text-left text-lg font-medium transition-colors hover:text-white",
                    activeCategory === category ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {activeCategory === category && <span className="mr-2 text-white">→</span>}
                  {category}
                </button>
              ))}
            </ScrollReveal>

            {/* Mobile/Tablet Horizontal Filter */}
            <div className="lg:hidden flex flex-wrap gap-3 w-full">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "inline-flex min-h-11 items-center px-4 text-sm font-medium border transition-colors",
                    activeCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-muted-foreground border-white/20 hover:border-white/50 hover:text-white",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid (Right Column on Desktop) */}
          <div className="col-span-12 lg:col-span-8">
            {/* Masonry Layout using CSS columns */}
            <div className="columns-1 md:columns-2 gap-8 space-y-8">
              {filteredItems.map((item, index) => (
                <ScrollReveal key={item.id} animation="slide-up" delay={index * 100} duration={500}>
                  <div className="break-inside-avoid group relative mb-8">
                    <button
                      type="button"
                      className="w-full cursor-pointer overflow-hidden bg-white/5 text-left shadow-lg transition-all duration-500 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.image_alt_text}
                          width={item.width}
                          height={item.height}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                        <div className="absolute left-4 top-4 bg-black/65 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm">
                          {item.technique}
                        </div>
                        <div className="absolute inset-0 hidden items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                          <div className="translate-y-4 text-center transition-transform duration-300 group-hover:translate-y-0">
                            <p className="text-xs uppercase tracking-widest text-white/50 border-b border-white/30 inline-block pb-1">
                              Pogledaj detalj
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-white/10 p-4">
                        <p className="mb-2 text-xs font-mono uppercase tracking-widest text-white/45">
                          {item.category.join(" / ")}
                        </p>
                        <h3 className="text-lg font-bold leading-tight text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.context}</p>
                      </div>
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && closeLightbox()}>
        {selectedItem ? (
          <DialogContent
            showCloseButton={false}
            className="!fixed !inset-0 !left-0 !top-0 z-[100] flex !max-w-none !translate-x-0 !translate-y-0 items-center justify-center !rounded-none !border-0 bg-black/95 p-4 shadow-none backdrop-blur-sm md:p-8"
          >
            <DialogClose asChild>
              <button
                type="button"
                className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center text-white/70 transition-colors hover:text-white md:top-8 md:right-8"
                aria-label="Zatvori"
              >
                <X className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1} />
              </button>
            </DialogClose>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox("prev")
              }}
              className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center text-white/50 transition-colors hover:text-white md:left-8"
              aria-label="Prethodna slika"
            >
              <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" strokeWidth={1} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox("next")
              }}
              className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center text-white/50 transition-colors hover:text-white md:right-8"
              aria-label="Sledeća slika"
            >
              <ChevronRight className="h-8 w-8 md:h-12 md:w-12" strokeWidth={1} />
            </button>

            <div className="flex w-full max-w-6xl flex-col items-center gap-6">
              <div className="relative aspect-[4/3] max-h-[70vh] w-full">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.image_alt_text}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
              <div className="px-4 text-center">
                <DialogTitle asChild>
                  <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">{selectedItem.title}</h3>
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="mx-auto mb-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                    {selectedItem.context}
                  </p>
                </DialogDescription>
                <p className="font-mono text-sm uppercase tracking-wider text-white/60 md:text-base">
                  {selectedItem.technique} / {selectedItem.category.join(", ")}
                </p>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}
