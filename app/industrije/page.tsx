import { IndustriesSection } from "@/components/industries-section"
import { PageHero } from "@/components/page-hero"
import { industriesIntro } from "@/lib/industries-data"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Radna odeća i tekstil sa logom za hotele, restorane i firme",
  description:
    "Mašinski vez i DTF štampa za radnu odeću, uniforme, kecelje, majice i tekstil sa logom za hotele, restorane, auto servise, klubove i firme.",
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
