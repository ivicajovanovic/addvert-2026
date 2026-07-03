"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -10% 0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof window.matchMedia !== "function" || !("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const printMedia = window.matchMedia("print")

    if (prefersReducedMotion.matches || printMedia.matches) {
      setIsVisible(true)
      return
    }

    const handlePrint = () => setIsVisible(true)
    const handlePrintMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsVisible(true)
    }

    window.addEventListener("beforeprint", handlePrint)
    printMedia.addEventListener?.("change", handlePrintMediaChange)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce && element) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.1) {
      setIsVisible(true)
      if (triggerOnce) {
        observer.unobserve(element)
      }
    }

    return () => {
      if (element) observer.unobserve(element)
      window.removeEventListener("beforeprint", handlePrint)
      printMedia.removeEventListener?.("change", handlePrintMediaChange)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
