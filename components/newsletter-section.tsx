import { NewsletterSignup } from "@/components/newsletter-signup"

interface NewsletterSectionProps {
  compact?: boolean
}

export function NewsletterSection({ compact = false }: NewsletterSectionProps) {
  return (
    <section className="border-y border-white/10 bg-background">
      <div
        className={`container mx-auto grid gap-10 px-4 md:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 ${
          compact ? "py-16 md:py-20" : "py-24 md:py-32"
        }`}
      >
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Besplatan vodič</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Kako da vaša firma izgleda ozbiljnije
          </h2>
          <div className="mt-6 h-px w-12 bg-white" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            5 praktičnih odluka za profesionalno brendiranje radne odeće, uniformi i promotivnog tekstila.
          </p>

          {!compact ? (
            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm leading-6 text-muted-foreground">
              <li>Šta prvo brendirati da bi utisak bio dosledan.</li>
              <li>Kada izabrati mašinski vez.</li>
              <li>Kada je DTF štampa bolji izbor.</li>
            </ul>
          ) : null}
        </div>

        <div className="border-t border-white/10 pt-8 lg:col-span-6 lg:col-start-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <NewsletterSignup />
        </div>
      </div>
    </section>
  )
}
