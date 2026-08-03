import { Download, ExternalLink, MessageCircle } from "lucide-react"
import { buildCatalogueInquiryHref, catalogueProcess, catalogues, type Catalogue } from "@/lib/catalogues-data"
import { CatalogueCoverImage } from "@/components/catalogue-cover"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

function CatalogProcess() {
  return (
    <section aria-labelledby="catalogue-process-title" className="border-b border-white/10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal animation="slide-right" duration={500} className="lg:col-span-4">
            <h2 id="catalogue-process-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
              Kako naručujete
            </h2>
            <div className="mt-6 h-1 w-12 bg-white" />
          </ScrollReveal>

          <div className="lg:col-span-8">
            {catalogueProcess.map((step, index) => (
              <ScrollReveal key={step.title} animation="slide-up" delay={index * 60} duration={500}>
                <div className="grid grid-cols-[2rem_1fr] gap-4 border-t border-white/20 py-5 md:grid-cols-[3rem_1fr] md:gap-6 md:py-6">
                  <span className="text-sm font-medium tabular-nums text-muted-foreground">{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CatalogCard({ catalogue }: { catalogue: Catalogue }) {
  const hasExternalCatalogue = Boolean(catalogue.flipHref || catalogue.pdfHref)

  return (
    <article className="flex h-full flex-col pt-6 md:pt-8">
      <div className="group relative aspect-[3/4] overflow-hidden border border-white/20 bg-white/[0.03]">
        <CatalogueCoverImage cover={catalogue.cover} title={catalogue.title} />
        {catalogue.flipHref ? (
          <div className="absolute inset-0 hidden items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:flex">
            <a
              href={catalogue.flipHref}
              target="_blank"
              rel="noopener noreferrer"
              className="translate-y-4 text-xs font-medium uppercase tracking-widest text-white/70 transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Pogledajte katalog
            </a>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{catalogue.edition}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tighter text-white md:text-3xl">{catalogue.title}</h2>
        <p className="mt-4 max-w-md flex-1 text-base leading-relaxed text-muted-foreground">{catalogue.description}</p>

        {hasExternalCatalogue ? (
          <div className="mt-8 space-y-4">
            {catalogue.flipHref ? (
              <Button
                asChild
                className="h-12 w-full rounded-none bg-white px-5 text-sm font-semibold tracking-wide text-black hover:bg-gray-200"
              >
                <a href={catalogue.flipHref} target="_blank" rel="noopener noreferrer">
                  Pregledajte interaktivni katalog
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            ) : null}
            {catalogue.pdfHref ? (
              <a
                href={catalogue.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Otvori PDF katalog
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm text-muted-foreground">Katalog trenutno ažuriramo. Pošaljite nam upit.</p>
            <a
              href={buildCatalogueInquiryHref(catalogue.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Pošaljite upit
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        )}

      </div>
    </article>
  )
}

function CatalogInquiryCta() {
  return (
    <section aria-labelledby="catalogue-inquiry-title" className="border-y border-white/10 py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="catalogue-inquiry-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
              Kontaktirajte nas
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Pošaljite šifru, količinu i željeni vez ili DTF štampu.
            </p>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <Button
              asChild
              className="h-12 w-full rounded-none bg-white px-6 text-sm font-semibold tracking-wide text-black hover:bg-gray-200 lg:w-auto"
            >
              <a
                href={buildCatalogueInquiryHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pošaljite šifru artikla putem WhatsApp-a"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Pošaljite šifru artikla
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CataloguesPage() {
  return (
    <>
      <section aria-label="Katalozi" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8 lg:gap-12">
            {catalogues.map((catalogue, index) => (
              <ScrollReveal key={catalogue.id} animation={index === 0 ? "slide-right" : "slide-left"} delay={index * 80} duration={500}>
                <CatalogCard catalogue={catalogue} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CatalogProcess />
      <CatalogInquiryCta />
    </>
  )
}
