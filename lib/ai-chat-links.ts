import type { FaqItem } from "./faq-data"
import { industries, industriesIntro } from "./industries-data"
import { BUSINESS, PHONES, PRIMARY_PHONE, SITE_NAME } from "./site-config"

export type AiChatProvider = "chatgpt" | "claude"

const CORE_SERVICES = [
  "Mašinski vez: uniforme, peškiri, posteljina, amblemi, promo tekstil za firme i udruženja",
  "DTF štampa: majice, dukserice, kačketi, radna odela i promotivni tekstil",
  "Vez na komadima klijenta: primaju se gotovi komadi (kape, jakne, torbe i sl.)",
  "Priprema dizajna za vez: ako klijent nema spreman vizuelni materijal",
  "Personalizovani pokloni sa vezom: peškiri, platna, bebi tekstil; poručivanje preko upita",
] as const

function buildIndustriesBlock(): string {
  return industries
    .map((industry) => {
      const examples = industry.products.slice(0, 4).join(", ")
      return `• ${industry.title}: ${industry.description} Primeri: ${examples}.`
    })
    .join("\n")
}

function buildAiInstructions(): string {
  return [
    "Uloga: pomozi mi kao potencijalnom klijentu da razumem šta ADD VERT nudi i da li je to pravo rešenje za moj posao ili projekat.",
    "",
    "Fokus odgovora:",
    "• koje usluge imaju smisla za koju industriju ili tip posla",
    "• kako izgleda saradnja (rokovi, isporuka, minimumi, šta firma preuzima)",
    "• profesionalnost, pouzdanost i praktična vrednost za B2B i poslovne klijente",
    "• personalizovani pokloni za fizička lica, ako je relevantno za moje pitanje",
    "",
    "Izbegavaj duboku tehničku terminologiju o mašinama, programima za digitalizaciju i proizvodnom procesu, osim ako me to eksplicitno ne zanima.",
    "",
    "Ako nešto na sajtu deluje nejasno, nedorečeno ili nedostaje, objasni u razumnoj meri na osnovu konteksta ispod, ali naglasi da za tačnu cenu, rok i ponudu treba direktan kontakt sa firmom.",
    "",
    "Na kraju, ako je korisno, predloži konkretan sledeći korak (upit, poziv, WhatsApp).",
  ].join("\n")
}

export function buildFaqAiPrompt(pageUrl: string, items: FaqItem[]): string {
  const faqBlock = items.map((item, index) => `${index + 1}. ${item.question}\n   ${item.answer}`).join("\n\n")
  const contactLine = `Kontakt: ${PHONES.map((phone) => phone.display).join(" / ")}, ${BUSINESS.email}, ${BUSINESS.address.formatted}. WhatsApp: ${PRIMARY_PHONE.display}.`

  return [
    `${SITE_NAME}: ${BUSINESS.name}`,
    BUSINESS.tagline,
    `Lokacija: ${BUSINESS.address.formatted}. Radno vreme: ${BUSINESS.hours}.`,
    contactLine,
    `Stranica sa koje dolazim: ${pageUrl}`,
    "",
    "O firmi (sa stajališta klijenta):",
    "ADD VERT je vezionica i štamparija iz Petrovca na Mlavi, aktivna od 2016. Radimo sa hotelima, restoranima, kafićima, sportskim klubovima, korporacijama, školama, zdravstvenim ustanovama, auto servisima, frizerskim salonima i drugim klijentima širom Srbije. Nudimo mašinski vez, DTF štampu, pripremu dizajna i personalizovane poklone. Moguće je lično preuzimanje, slanje kurirskom službom i isporuka na adresu.",
    "",
    "Glavne usluge:",
    ...CORE_SERVICES.map((service) => `• ${service}`),
    "",
    "Industrije i šta obično radimo po sektorima:",
    industriesIntro,
    buildIndustriesBlock(),
    "",
    "Često postavljana pitanja (FAQ):",
    "",
    faqBlock,
    "",
    buildAiInstructions(),
  ].join("\n")
}

export function buildAiChatUrl(provider: AiChatProvider, prompt: string): string {
  const encoded = encodeURIComponent(prompt)

  switch (provider) {
    case "chatgpt":
      return `https://chatgpt.com/?q=${encoded}`
    case "claude":
      return `https://claude.ai/new?q=${encoded}`
    default: {
      const exhaustive: never = provider
      return exhaustive
    }
  }
}
