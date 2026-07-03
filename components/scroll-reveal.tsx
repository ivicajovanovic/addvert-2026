"use client"

import type React from "react"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

type AnimationType = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom"

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
}

const animationClasses: Record<AnimationType, { hidden: string; visible: string }> = {
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "slide-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "slide-down": {
    hidden: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "slide-left": {
    hidden: "opacity-0 translate-y-8 md:translate-y-0 md:translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "slide-right": {
    hidden: "opacity-0 translate-y-8 md:translate-y-0 md:-translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  zoom: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
}

export function ScrollReveal({
  children,
  animation = "fade",
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold, triggerOnce })

  const animationClass = animationClasses[animation]

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out print:opacity-100 print:translate-x-0 print:translate-y-0 print:scale-100",
        isVisible ? animationClass.visible : animationClass.hidden,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
