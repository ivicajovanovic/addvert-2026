import { PageHero } from "@/components/page-hero"
import { ShopCatalog } from "@/components/shop-catalog"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Personalizovani pokloni sa vezom | Peškiri, platna i pokloni po narudžbi",
  description:
    "Personalizovani pokloni sa vezom za krštenja, venčanja, bebe i posebne prilike. Peškiri, platna, ćebad, portikle i pokloni po narudžbi.",
  path: "/shop",
})

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="Shop"
        title="Personalizovani pokloni"
        description="Peškiri, platna, ćebad, portikle i drugi pokloni sa imenom, datumom ili kratkom porukom. Poručivanje ide preko WhatsApp-a ili telefonom, a cena, rok izrade i detalji personalizacije potvrđuju se pre izrade."
        size="compact"
      />
      <ShopCatalog />
    </main>
  )
}
