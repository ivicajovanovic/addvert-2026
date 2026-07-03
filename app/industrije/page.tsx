import { IndustriesSection } from "@/components/industries-section"
import { PageHero } from "@/components/page-hero"
import { industriesIntro } from "@/lib/industries-data"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Industrije koje opremamo: hoteli, restorani, sport i više",
  description:
    "Mašinski vez i DTF štampa za hotele, restorane, kafiće, apoteke, škole, auto servise i druge industrije. ADD VERT, Petrovac na Mlavi.",
  path: "/industrije",
})

export default function IndustrijePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="Industrije"
        title="Industrije koje opremamo"
        description={industriesIntro}
        size="compact"
      />
      <IndustriesSection hidePageHeader />
    </main>
  )
}
