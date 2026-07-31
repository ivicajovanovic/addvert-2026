import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

interface ServiceDetailFaq {
  question: string
  answer: string
}

interface ServiceDetailPageProps {
  eyebrow: string
  title: string
  intro: string
  serviceParam: "masinski-vez" | "dtf-stampa"
  overviewTitle: string
  overview: string
  applications: Array<{ title: string; description: string }>
  priceTitle: string
  priceDescription: string
  priceFactors: string[]
  faqs: ServiceDetailFaq[]
  relatedService: { label: string; href: string }
}

export function ServiceDetailPage({
  eyebrow,
  title,
  intro,
  serviceParam,
  overviewTitle,
  overview,
  applications,
  priceTitle,
  priceDescription,
  priceFactors,
  faqs,
  relatedService,
}: ServiceDetailPageProps) {
  return (
    <main className="min-h-screen bg-background pt-18 text-foreground selection:bg-white selection:text-black">
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tighter text-white md:text-6xl">{title}</h1>
          <div className="mt-6 h-1 w-12 bg-white" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/kontakt?usluga=${serviceParam}`}
              className="inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-gray-200"
            >
              Zatražite ponudu
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/galerija"
              className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Pogledajte radove
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-12 md:px-6 lg:px-8">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">{overviewTitle}</h2>
            <div className="mt-6 h-1 w-12 bg-white" />
          </div>
          <div className="md:col-span-8">
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{overview}</p>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Radimo sa klijentima iz Beograda, Novog Sada i cele Srbije — dogovaramo detalje na daljinu, a robu je
              moguće poslati ili preuzeti po dogovoru.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Primene</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter text-white md:text-4xl">Šta možemo da uradimo</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <article key={application.title} className="border-t border-white/20 pt-6">
                <h3 className="text-xl font-bold tracking-tight text-white">{application.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{application.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-12 md:px-6 lg:px-8">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">{priceTitle}</h2>
            <div className="mt-6 h-1 w-12 bg-white" />
          </div>
          <div className="md:col-span-8">
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{priceDescription}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {priceFactors.map((factor) => (
                <li key={factor} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-white" aria-hidden="true" />
                  {factor}
                </li>
              ))}
            </ul>
            <Link
              href={`/kontakt?usluga=${serviceParam}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/70"
            >
              Pošaljite količinu i dizajn za tačnu cenu
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-12 md:px-6 lg:px-8">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">Česta pitanja</h2>
            <div className="mt-6 h-1 w-12 bg-white" />
          </div>
          <div className="md:col-span-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-b border-white/10 py-6 first:pt-0">
                <h3 className="text-lg font-semibold tracking-tight text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border border-white/10 bg-white/[0.02] p-7 md:flex-row md:items-center md:p-10">
            <div>
              <p className="text-sm text-muted-foreground">Pogledajte i povezanu uslugu</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tighter text-white">{relatedService.label}</h2>
            </div>
            <Link
              href={relatedService.href}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/70"
            >
              Saznajte više
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
