import { JsonLd } from "@/components/json-ld"
import { ContactSection } from "@/components/contact-section"
import { FaqSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { PageHero } from "@/components/page-hero"
import { buildPageMetadata } from "@/lib/metadata"
import { getFaqPageJsonLd } from "@/lib/structured-data"

export const metadata = buildPageMetadata({
  title: "Kontakt za vez i DTF štampu | Petrovac i Požarevac",
  description:
    "Pošaljite upit za mašinski vez, DTF štampu, peškire sa logom, majice, uniforme i radnu odeću. Petrovac na Mlavi, Požarevac, Braničevo i cela Srbija.",
  path: "/kontakt",
})

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ usluga?: string }>
}) {
  const { usluga } = await searchParams

  return (
    <>
      <JsonLd data={getFaqPageJsonLd()} />
      <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
        <PageHero
          eyebrow="Kontakt"
          title="Pošaljite upit za vez ili štampu"
          description="Pišite nam na WhatsApp, pozovite ili pošaljite kratak opis projekta. Odgovaramo isti radni dan."
          size="compact"
        />
        <ContactSection hidePageHeader initialService={usluga} />
        <NewsletterSection compact />
        <FaqSection showContactLink={false} />
      </main>
    </>
  )
}
