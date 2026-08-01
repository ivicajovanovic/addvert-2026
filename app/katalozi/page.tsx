import { CataloguesPage } from "@/components/catalogues-page"
import { PageHero } from "@/components/page-hero"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Promo proizvodi i poslovni tekstil – katalozi",
  description:
    "Pregledajte katalog promo poklona, poslovnog tekstila i radne opreme. Pošaljite nam šifru artikla i količinu, a ADD VERT priprema ponudu za brendiranje.",
  path: "/katalozi",
})

export default function CataloguesPageRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="Katalozi"
        title="Katalozi promo proizvoda i poslovnog tekstila"
        description="Pregledajte ponudu promo poklona, poslovnog tekstila i radne opreme. Kada pronađete artikal, pošaljite nam šifru, količinu i logo za ponudu."
      />
      <CataloguesPage />
    </main>
  )
}
