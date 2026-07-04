import { faqItems } from "@/lib/faq-data"
import { absoluteUrl, OG_IMAGE_PATH } from "@/lib/metadata"
import { portfolioItems } from "@/lib/portfolio-data"
import { BUSINESS, PHONES, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config"

const MAP_LINK =
  "https://maps.google.com/?q=Vezionica+i+stamparija+ADD+VERT,+Petrovac+na+Mlavi"

const BUSINESS_DESCRIPTION =
  "Profesionalni mašinski vez i DTF štampa na tekstilu: peškiri sa logom, majice, duksevi, kačketi, vezeni amblemi, uniforme i radna odeća sa logom za firme širom Srbije."

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl(OG_IMAGE_PATH),
    telephone: PHONES.map((phone) => phone.tel),
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: MAP_LINK,
    areaServed: [
      { "@type": "Country", name: "Srbija" },
      { "@type": "City", name: "Petrovac na Mlavi" },
      { "@type": "City", name: "Požarevac" },
      { "@type": "AdministrativeArea", name: "Braničevski okrug" },
    ],
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge veza i štampe na tekstilu",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mašinski vez na peškirima za hotele i apartmane" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Peškiri sa logom i vezom za hotele, apartmane i poklone" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Vez na uniformama za ugostitelje i restorane" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Radna odeća sa logom za firme, servise i ugostiteljstvo" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Vez na hotelskoj posteljini i stolnjacima" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "DTF štampa na majicama i promo tekstilu" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Majice, duksevi i kačketi sa logom" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Vezeni amblemi za klubove, udruženja i radne uniforme" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Digitalizacija i priprema dizajna za vez" },
        },
      ],
    },
  }
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "sr-RS",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  }
}

export function getFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

const GALLERY_DESCRIPTION =
  "Galerija radova ADD VERT: peškiri sa logom, majice sa logom firme, duksevi, kačketi, vezeni amblemi, uniforme, radna odeća, DTF štampa i reklamno brendiranje."

export function getGalleryPageJsonLd() {
  const galleryUrl = absoluteUrl("/galerija")

  const associatedMedia = portfolioItems.map((item) => ({
    "@type": "ImageObject",
    "@id": `${absoluteUrl(item.image)}#image`,
    contentUrl: absoluteUrl(item.image),
    url: absoluteUrl(item.image),
    name: item.title,
    description: item.context,
    caption: item.image_alt_text,
    width: item.width,
    height: item.height,
    inLanguage: "sr-RS",
    creator: {
      "@id": `${SITE_URL}/#organization`,
    },
    keywords: item.technique,
  }))

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${galleryUrl}#gallery`,
    name: "Galerija radova: ADD VERT",
    description: GALLERY_DESCRIPTION,
    url: galleryUrl,
    inLanguage: "sr-RS",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    associatedMedia,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: portfolioItems.length,
      itemListElement: portfolioItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        item: `${absoluteUrl(item.image)}#image`,
      })),
    },
  }
}
