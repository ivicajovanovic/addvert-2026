import Link from "next/link"
import { Download } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { buildPageMetadata } from "@/lib/metadata"

export const metadata = buildPageMetadata({
  title: "Email je potvrđen",
  description: "Preuzmite ADD VERT vodič za profesionalno brendiranje radne odeće, uniformi i promotivnog tekstila.",
  path: "/vodic-spreman",
})

export default function GuideReadyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <PageHero
        eyebrow="ADD VERT vodič"
        title="Email je potvrđen"
        description="Hvala na potvrdi. Vodič za profesionalnije brendiranje firme je spreman za preuzimanje."
        size="compact"
      />

      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl border-y border-white/10 py-8 md:py-10">
            <p className="text-base leading-7 text-muted-foreground">
              U vodiču ćete pronaći praktične smernice za izbor tekstila, mašinskog veza i DTF štampe.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/downloads/add-vert-vodic-za-brendiranje-firme.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Preuzmite PDF vodič
              </a>
              <Link
                href="/kontakt"
                className="inline-flex min-h-12 items-center justify-center px-1 py-3 text-sm font-medium text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Imate pitanje? Kontaktirajte nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
