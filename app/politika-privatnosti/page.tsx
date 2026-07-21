import { PageHero } from "@/components/page-hero"
import { BUSINESS } from "@/lib/site-config"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Politika privatnosti",
  description:
    "Informacije o obradi podataka i prijavi na ADD VERT vodič i novosti.",
  path: "/politika-privatnosti",
})

const controllerName = "IVICA JOVANOVIĆ PR RADNJA ZA ŠTAMPARSKE USLUGE ADD VERT PETROVAC NA MLAVI"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="Pravne informacije"
        title="Politika privatnosti"
        description="Ovde objašnjavamo koje podatke obrađujemo, zašto ih koristimo i kako možete da upravljate svojim pristankom."
        size="compact"
      />

      <section className="border-b border-white/10">
        <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-12 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Rukovalac podacima</p>
            <p className="mt-3 max-w-xl text-base font-medium leading-7 text-white">{controllerName}</p>
            <p className="mt-2 text-base leading-7 text-muted-foreground">{BUSINESS.address.formatted}</p>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-12">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Poslednje ažuriranje</p>
            <p className="mt-3 text-base font-medium leading-7 text-white">21. jul 2026.</p>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="mt-2 inline-block text-base leading-7 text-muted-foreground underline decoration-white/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="max-w-[72ch]">
          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">01. Ko obrađuje podatke</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Rukovalac podacima je {controllerName}, sa adresom {BUSINESS.address.formatted}. Za pitanja o privatnosti možete nam pisati na{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {BUSINESS.email}
              </a>.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">02. Koje podatke prikupljamo</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Kroz formu za vodič i novosti prikupljamo email adresu, datum i vreme pristanka, kao i tehnički zapis potreban za bezbednost i dokaz saglasnosti. Ime ne prikupljamo kroz ovu formu dok ga izričito ne uvedemo.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">03. Svrhe i osnov obrade</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Podatke koristimo da bismo poslali traženi vodič, upravljali prijavom na novosti i sačuvali dokaz datog pristanka. Osnov za slanje marketinških poruka je vaš pristanak.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">04. Newsletter</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Newsletter prima samo osoba koja sama pošalje prijavu i potvrdi saglasnost. Po uspešnoj prijavi stiže automatska poruka sa vodičem, a marketinške poruke šaljemo najviše jednom mesečno. Odjava je dostupna u svakoj poruci i preko adrese{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {BUSINESS.email}
              </a>.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">05. Primaoci i obrađivači</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Brevo koristimo kao obrađivača za upravljanje listom i slanje poruka. Netlify obezbeđuje hosting sajta.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">06. Rok čuvanja</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Aktivan marketinški kontakt čuvamo dok ne povučete pristanak. Nakon toga zadržavamo samo minimalni zapis potreban da sprečimo ponovno slanje i ispunimo zakonske obaveze.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">07. Vaša prava</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Imate pravo na pristup, ispravku, brisanje, ograničenje obrade, prigovor i prenosivost podataka kada je primenljivo. Pristanak možete povući u svakom trenutku, bez uticaja na zakonitost obrade pre povlačenja. Takođe možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">08. Kolačići i analitika</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Sajt koristi neophodne kolačiće za svoj rad. Analitički kolačići se ne aktiviraju dok ne date svoj izbor.
            </p>
          </section>

          <section className="border-t border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">09. Izmene politike</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Ovu politiku možemo ažurirati kada se promeni način obrade podataka ili naše obaveze. Na ovoj stranici ćemo objaviti datum poslednjeg ažuriranja.
            </p>
          </section>

          <section className="border-y border-white/10 py-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">10. Kontakt</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Za pitanja, zahteve ili povlačenje pristanka pišite nam na{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {BUSINESS.email}
              </a>.
            </p>
          </section>
        </div>

        <aside className="mt-12 max-w-[72ch] border border-white/10 bg-card p-6 md:mt-16 md:p-8" aria-labelledby="privacy-contact-title">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Kontakt za privatnost</p>
          <h2 id="privacy-contact-title" className="mt-3 text-2xl font-bold tracking-tight text-white">Tu smo za svako pitanje o vašim podacima.</h2>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="mt-5 inline-block text-lg font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {BUSINESS.email}
          </a>
        </aside>
      </article>
    </main>
  )
}
