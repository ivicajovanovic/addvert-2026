import { AboutSection } from "@/components/about-section"
import { PageHero } from "@/components/page-hero"
import { PartnersCtaSection } from "@/components/partners-cta-section"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "O nama: Vezionica i štamparija specijalizovana za hotele i ugostitelje",
  description:
    "ADD VERT, porodična vezionica iz Petrovca na Mlavi od 2016. Specijalizovani za vez na peškirima, uniformama i posteljini za hotele, apartmane i restorane. Iskustvo od 2003.",
  path: "/o-nama",
})

export default function ONamaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="O kompaniji"
        title="O nama"
        description="Porodična vezionica i štamparija iz Petrovca na Mlavi. Od ideje do gotovog proizvoda, sa fokusom na hotele, ugostiteljstvo i brendove."
        size="compact"
      />
      <AboutSection />
      <PartnersCtaSection />
    </main>
  )
}
