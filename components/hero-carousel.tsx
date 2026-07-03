"use client"

import Image from "next/image"
import { useEffect, useState, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"
import {
  HERO_CAROUSEL_FADE_MS,
  HERO_CAROUSEL_INTERVAL_MS,
  heroCarouselSlides,
} from "@/lib/hero-carousel-slides"

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )

  useEffect(() => {
    if (reduceMotion || heroCarouselSlides.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroCarouselSlides.length)
    }, HERO_CAROUSEL_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [reduceMotion])

  return (
    <div className="relative h-full w-full bg-neutral-900">
      {heroCarouselSlides.map((slide, index) => {
        const isActive = index === activeIndex

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={isActive ? slide.alt : ""}
            aria-hidden={!isActive}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover object-center transition-opacity ease-in-out",
              isActive ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            style={{ transitionDuration: `${HERO_CAROUSEL_FADE_MS}ms` }}
          />
        )
      })}
    </div>
  )
}
