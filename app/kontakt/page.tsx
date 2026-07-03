import { JsonLd } from "@/components/json-ld"
import { ContactSection } from "@/components/contact-section"
import { FaqSection } from "@/components/faq-section"
import { PageHero } from "@/components/page-hero"
import { buildPageMetadata } from "@/lib/metadata"
import { getFaqPageJsonLd } from "@/lib/structured-data"

export const metadata = buildPageMetadata({
  title: "Kontakt i upit za ponudu: vez na peškirima, uniformama i tekstilu",
  description:
    "Pošaljite upit za vez na peškirima, hotelskim uniformama ili promo tekstilu. Odgovaramo u roku od 24 sata. Dostava po celoj Srbiji, pozovite ili pišite na WhatsApp.",
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
        <FaqSection showContactLink={false} />
      </main>
    </>
  )
}
