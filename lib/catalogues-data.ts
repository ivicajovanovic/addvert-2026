import { WHATSAPP_NUMBER } from "@/lib/site-config"

export type CatalogueId = "workwear-2026" | "promo-2026"

export interface CatalogueCover {
  src: string
  alt: string
}

export interface Catalogue {
  id: CatalogueId
  title: string
  edition: string
  description: string
  cover: CatalogueCover | null
  flipHref?: string
  pdfHref?: string
}

export const catalogues: readonly Catalogue[] = [
  {
    id: "workwear-2026",
    title: "Tekstil i radna oprema",
    edition: "Najnovije izdanje",
    description: "Odeća, uniforme i radna oprema za vaš tim, objekat ili događaj.",
    cover: {
      src: "/naslovna-katalog-tekstila.webp",
      alt: "Naslovna strana kataloga Tekstil i radna oprema, izdanje 2026",
    },
    flipHref: "https://flipboxapp.net/client/promobox-2026-workwear-srb",
    pdfHref:
      "https://promobox.com/storage/catalogues/Katalog%20Tekstil%20i%20Radna%20oprema%20smanjeno%20sa%20koricom.pdf",
  },
  {
    id: "promo-2026",
    title: "Promo pokloni",
    edition: "Najnovije izdanje",
    description: "Pokloni za klijente, zaposlene i događaje, spremni za vaše brendiranje.",
    cover: {
      src: "/naslovna-katalog-promo-poklona.webp",
      alt: "Naslovna strana kataloga Promo pokloni, izdanje 2026",
    },
    flipHref: "https://flipboxapp.net/client/promobox-2026-sr",
    pdfHref: "https://promobox.com/storage/catalogues/Katalog%202026-SRB.pdf",
  },
] as const

export const catalogueProcess = [
  {
    title: "Pregledajte katalog",
    description: "Pronađite proizvod koji odgovara nameni.",
  },
  {
    title: "Zapišite šifru artikla",
    description: "Šifra ubrzava proveru boja, dostupnosti i opcija štampe.",
  },
  {
    title: "Pošaljite nam upit",
    description: "Navedite količinu i željeni vez ili DTF štampu.",
  },
] as const

const catalogueInquiryMessage =
  "Zdravo, pronašao/la sam artikal u katalogu. Šifra artikla: [upišite šifru]. Količina: [upišite količinu]. Potreban mi je: [vez / DTF štampa]."

export function buildCatalogueInquiryHref(catalogueTitle?: string): string {
  const catalogueContext = catalogueTitle ? ` Katalog: ${catalogueTitle}.` : ""
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${catalogueInquiryMessage}${catalogueContext}`)}`
}
