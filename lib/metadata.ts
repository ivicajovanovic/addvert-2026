import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/site-config"

export const OG_IMAGE_PATH = "/images/og-default.webp"

export const OG_IMAGE = {
  path: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "ADD VERT: mašinski vez i DTF štampa na tekstilu",
} as const

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") {
    return SITE_URL
  }
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function buildOpenGraphImage() {
  const url = absoluteUrl(OG_IMAGE.path)
  return [
    {
      url,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      alt: OG_IMAGE.alt,
    },
  ]
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  /** Home page uses absolute title without template suffix */
  absoluteTitle?: boolean
}

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path)
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = buildOpenGraphImage()

  return {
    ...(absoluteTitle ? { title: { absolute: title } } : { title }),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: "website",
      locale: "sr_RS",
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: images.map((image) => image.url),
    },
  }
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: "Mašinski vez i DTF štampa | ADD VERT, isporuka po Srbiji",
  },
  description:
    "Mašinski vez na peškirima, uniformama i posteljini za hotele, apartmane i restorane. Profesionalna vezionica i štamparija, isporuka po celoj Srbiji. Upit u roku od 24h.",
  keywords: [
    "mašinski vez na peškirima",
    "vez na hotelskim peškirima",
    "vez za hotele",
    "vez za apartmane",
    "vez na uniformama za ugostitelje",
    "brendirani peškiri za hotele",
    "vez za restorane",
    "uniforme za ugostitelje vez",
    "vez na peškirima Srbija",
    "vezionica Petrovac na Mlavi",
    "štamparija Petrovac na Mlavi",
    "mašinski vez Srbija",
    "DTF štampa na tekstilu",
  ],
  openGraph: {
    title: "Mašinski vez i DTF štampa | ADD VERT",
    description:
      "Vez na peškirima, uniformama i posteljini za hotele, apartmane i restorane. Profesionalna vezionica iz Petrovca na Mlavi, isporuka po Srbiji.",
    type: "website",
    locale: "sr_RS",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: buildOpenGraphImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Mašinski vez i DTF štampa | ADD VERT",
    description:
      "Vez na peškirima, uniformama i posteljini za hotele, apartmane i restorane. Profesionalna vezionica iz Petrovca na Mlavi, isporuka po Srbiji.",
    images: [absoluteUrl(OG_IMAGE.path)],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
}
