export const SITE_DOMAIN = "addvert.net"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? `https://${SITE_DOMAIN}`

export const SITE_NAME = "ADD VERT"

export const BUSINESS = {
  name: "ADD VERT - Vezionica i štamparija",
  tagline: "Mašinski vez i DTF štampa. Od 2016.",
  email: "addvert.ivica@gmail.com",
  address: {
    street: "Srpskih vladara 316",
    city: "Petrovac na Mlavi",
    country: "RS",
    formatted: "Srpskih vladara 316, Petrovac na Mlavi",
  },
  hours: "Ponedeljak – Subota, 09:00 – 17:00",
  geo: {
    latitude: 44.375756,
    longitude: 21.417718,
  },
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.7336210766734!2d21.41771817629593!3d44.37575590539944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4751254882c0352d%3A0xa36520f1db45dd8f!2sVezionica%20i%20%C5%A1tamparija%20ADD%20VERT!5e1!3m2!1sen!2srs!4v1782123126375!5m2!1sen!2srs",
} as const

export const PHONES = [
  { display: "063 693 592", tel: "+38163693592", e164: "38163693592" },
  { display: "064 51 05 607", tel: "+381645105607", e164: "381645105607" },
] as const

export const PRIMARY_PHONE = PHONES[0]
export const WHATSAPP_NUMBER = PRIMARY_PHONE.e164

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/stamparija_addvert",
    handle: "@stamparija_addvert",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/addvert.rs",
    handle: "addvert.rs",
  },
] as const

export const NAV_ITEMS = [
  { label: "Usluge", href: "/#usluge" },
  { label: "Galerija", href: "/galerija" },
  { label: "Industrije", href: "/industrije" },
  { label: "O nama", href: "/o-nama" },
  { label: "Pokloni", href: "/shop" },
  { label: "Kontakt", href: "/kontakt" },
] as const

export const CTA_QUOTE = {
  label: "Zatražite ponudu",
  href: "/kontakt",
} as const
