import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { PHONES, WHATSAPP_NUMBER } from "@/lib/site-config"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background pt-18 lg:min-h-screen">
      {/* Grid Background Lines (Optional Swiss Touch) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
        <div className="w-full max-w-[1440px] px-4 md:px-6 lg:px-8 h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-white/5 last:border-r-0 hidden lg:block" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-full border-r border-white/5 last:border-r-0 hidden md:block lg:hidden" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-full border-r border-white/5 last:border-r-0 block md:hidden" />
          ))}
        </div>
      </div>

      {/* Added Hero Image Container - Absolute positioned to right half */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 z-0">
        <div className="relative w-full h-full">
          <HeroCarousel />
          <div className="absolute inset-0 z-30 bg-[linear-gradient(45deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.62)_32%,rgba(0,0,0,0.24)_64%,rgba(0,0,0,0)_100%)] lg:hidden" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-1 flex-col">
        <div className="swiss-grid flex-1 items-center">
          {/* Adjusted column span to 6 to avoid overlapping the image on desktop */}
          <div className="col-span-4 md:col-span-6 lg:col-span-6 flex flex-col justify-center py-10 md:py-0">
            <h1 className="mb-6 text-[2.4rem] font-bold leading-[1.12] tracking-tighter text-white md:mb-8 md:text-[4.05rem] md:leading-[1.196] lg:text-[5.4rem]">
              MAŠINSKI VEZ
              <br />
              & DTF Štampa
            </h1>

            <div className="mb-6 h-1 w-24 bg-white md:mb-8" />

            <p className="mb-5 max-w-xl text-base leading-relaxed text-white/75 md:mb-6 md:text-xl lg:text-muted-foreground">
              Za uniforme, promocije i brendiranje. Dugogodišnje iskustvo, kvalitetni materijali, profesionalni
              operateri i razumni rokovi.
            </p>

            <p className="mb-8 text-sm text-white/70 md:mb-10 md:text-base lg:text-muted-foreground">
              Pozovite odmah:{" "}
              {PHONES.map((phone, index) => (
                <span key={phone.tel}>
                  {index > 0 ? <span className="mx-2 text-white/30">·</span> : null}
                  <a
                    href={`tel:${phone.tel}`}
                    className="font-medium text-white hover:text-white/80 underline-offset-4 hover:underline"
                  >
                    {phone.display}
                  </a>
                </span>
              ))}
              <span className="mx-2 text-white/30">·</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-white/80 underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-none h-14 px-8 text-base font-semibold tracking-wide"
                asChild
              >
                <Link href="/#usluge">Naše usluge</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 rounded-none h-14 px-8 text-base font-semibold tracking-wide bg-transparent"
                asChild
              >
                <Link href="/kontakt">Zatražite ponudu</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="swiss-grid hidden shrink-0 pb-8 md:block md:pb-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-6">
            <div className="flex items-center gap-8 opacity-50 transition-opacity duration-500 hover:opacity-80">
              {/* Ricoma Logo Representation */}
              <svg height="18" viewBox="0 0 80 18" className="fill-current text-gray-300" aria-hidden="true">
                <text x="0" y="14" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5">
                  RICOMA
                </text>
              </svg>
              {/* Brother Logo Representation */}
              <svg height="22" viewBox="0 0 80 22" className="fill-current text-gray-300" aria-hidden="true">
                <text x="0" y="16" fontFamily="Times New Roman, serif" fontWeight="bold" fontSize="18">
                  brother
                </text>
              </svg>
              {/* Madeira Logo Representation */}
              <svg height="18" viewBox="0 0 90 18" className="fill-current text-gray-300" aria-hidden="true">
                <text x="0" y="14" fontFamily="Times New Roman, serif" fontWeight="bold" fontSize="13" letterSpacing="1">
                  MADEIRA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
