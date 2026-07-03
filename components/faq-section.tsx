"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { faqItems } from "@/lib/faq-data"
import { FaqAiAssist } from "./faq-ai-assist"
import { ScrollReveal } from "./scroll-reveal"

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200",
        open ? "rotate-45" : "rotate-0",
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <line x1="7" y1="0" x2="7" y2="14" />
        <line x1="0" y1="7" x2="14" y2="7" />
      </svg>
    </span>
  )
}

interface FaqSectionProps {
  showContactLink?: boolean
}

export function FaqSection({ showContactLink = true }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="py-24 md:py-32 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left: header */}
          <div className="md:col-span-4 md:flex md:flex-col">
            <ScrollReveal animation="slide-right" duration={500} className="flex flex-col md:min-h-full">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6">
                  Često postavljana pitanja
                </h2>
                <div className="h-1 w-12 bg-white mb-6" />
                <p className="text-muted-foreground text-lg max-w-sm">
                  Odgovori na najčešća pitanja o narudžbini, rokovima i saradnji.
                </p>
                {showContactLink ? (
                  <Link
                    href="/kontakt"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
                  >
                    Pošaljite nam pitanje
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6h8M7 3l3 3-3 3" />
                    </svg>
                  </Link>
                ) : null}
              </div>
              <FaqAiAssist items={faqItems} className="mt-auto pt-12 md:pt-16" />
            </ScrollReveal>
          </div>

          {/* Right: accordion */}
          <div role="list" className="md:col-span-8">
            {faqItems.map((item, index) => {
              const isOpen = openId === item.id
              return (
                <ScrollReveal key={item.id} animation="fade" delay={index * 50} duration={400}>
                  <div role="listitem" className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left text-base font-medium text-white transition-colors hover:text-white/80"
                    >
                      <span>{item.question}</span>
                      <PlusIcon open={isOpen} />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-200 ease-in-out",
                        isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
