import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { StatsStrip } from "@/components/stats-strip"
import { ServicesSection } from "@/components/services-section"
import { CommonRequestsSection } from "@/components/common-requests-section"
import { HomeGalleryTeaser } from "@/components/home-gallery-teaser"
import { HomeIndustriesTeaser } from "@/components/home-industries-teaser"
import { VideoSection } from "@/components/video-section"
import { DigitalThreadSection } from "@/components/digital-thread-section"
import { ProcessSection } from "@/components/process-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { HomeAboutTeaser } from "@/components/home-about-teaser"
import { ClientLogos } from "@/components/client-logos"
import { MidCtaSection } from "@/components/mid-cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { HomeFaqTeaser } from "@/components/home-faq-teaser"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "Mašinski vez i DTF štampa | Brendiranje tekstila u Srbiji",
  description:
    "Profesionalni mašinski vez i DTF štampa na tekstilu. Majice, duksevi, kačketi, amblemi i radna odeća sa logom za firme širom Srbije.",
  path: "/",
  absoluteTitle: true,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <HeroSection />
      <StatsStrip />
      <ServicesSection />
      <CommonRequestsSection />
      <HomeGalleryTeaser />
      <HomeIndustriesTeaser />
      <VideoSection />
      <DigitalThreadSection />
      <ProcessSection />
      <CapabilitiesSection />
      <HomeAboutTeaser />
      <ClientLogos />
      <MidCtaSection />
      <TestimonialsSection />
      <HomeFaqTeaser />
    </main>
  )
}
