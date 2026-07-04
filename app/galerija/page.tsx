import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { PageHero } from "@/components/page-hero"
import { PortfolioSection } from "@/components/portfolio-section"
import { buildPageMetadata } from "@/lib/metadata"
import { getBreadcrumbJsonLd, getGalleryPageJsonLd } from "@/lib/structured-data"

const galleryMetadata = buildPageMetadata({
  title: "Galerija radova: peškiri sa logom, majice, amblemi i uniforme",
  description:
    "Primeri mašinskog veza i DTF štampe: peškiri sa logom, majice, duksevi, kačketi, vezeni amblemi, uniforme i radna odeća za klijente širom Srbije.",
  path: "/galerija",
})

export const metadata: Metadata = {
  ...galleryMetadata,
  keywords: [
    "galerija mašinskog veza",
    "DTF štampa galerija",
    "peškiri sa logom",
    "majice sa logom firme",
    "vezeni amblemi",
    "radna odeća sa logom",
    "brendiranje izloga primeri",
    "vez na uniformama Srbija",
    "vez na peškirima hoteli",
    "reklamno brendiranje vozila",
    "ADD VERT radovi",
    "vezionica Petrovac na Mlavi",
  ],
}

export default function GalerijaPage() {
  return (
    <>
      <JsonLd
        data={[
          getGalleryPageJsonLd(),
          getBreadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Galerija", path: "/galerija" },
          ]),
        ]}
      />
      <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
        <PageHero
          eyebrow="Galerija radova"
          title="Naši radovi"
          description="Odabrani primeri mašinskog veza, DTF štampe i reklamnog brendiranja za kompanije, klubove, ugostitelje i lokalne brendove."
          size="compact"
        />
        <PortfolioSection hidePageHeader />
      </main>
    </>
  )
}
