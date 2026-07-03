"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Povratak na vrh"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex size-11 items-center justify-center rounded-none border border-white/20 bg-background text-muted-foreground transition-all duration-300 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-4" strokeWidth={2} />
    </button>
  )
}
