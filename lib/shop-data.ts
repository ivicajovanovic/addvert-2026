export interface ShopProduct {
  name: string
  sampleLabel: string
  personalization: string
  description: string
  orderMeta: {
    label: string
    value: string
  }[]
  image?: string
}

export const shopCatalogCopy = {
  personalizationLabel: "Personalizacija",
  ctaLabel: "Poruči",
}

const defaultOrderMeta = [{ label: "Cena", value: "po upitu" }]

export const shopProducts: ShopProduct[] = [
  {
    name: "Peškir za krštenje",
    sampleLabel: "ime + datum",
    personalization: "ime + datum",
    description:
      "Svečani peškir sa vezom imena i datuma, pažljivo izrađen kao trajna uspomena na dan krštenja.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Platno / povez za krštenje",
    sampleLabel: "krštenje",
    personalization: "ime + datum",
    description:
      "Personalizovano platno za krštenje sa imenom deteta i datumom, elegantan detalj za jedan od najvažnijih porodičnih dana.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Povez / platno za venčanje",
    sampleLabel: "venčanje",
    personalization: "imena + datum",
    description:
      "Svečani povez za crkveno venčanje sa imenima mladenaca i datumom, izrađen kao uspomena koja ostaje posle ceremonije.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Bebi peškir sa kapuljačom",
    sampleLabel: "bebi set",
    personalization: "ime",
    description:
      "Mekan bebi peškir sa kapuljačom i izvezenim imenom, praktičan i nežan poklon za rođenje, babine ili krštenje.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Bebi ćebe / prekrivač",
    sampleLabel: "ime bebe",
    personalization: "ime + datum rođenja",
    description:
      "Personalizovano bebi ćebe sa imenom i datumom rođenja, topao poklon koji postaje lepa uspomena iz prvih dana deteta.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Portikla sa imenom",
    sampleLabel: "ime",
    personalization: "ime",
    description:
      "Pamučna portikla sa izvezenim imenom, mali ali poseban poklon za bebu i savršen dodatak uz veći bebi set.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Vrećica / torbica za vrtić",
    sampleLabel: "vrtić",
    personalization: "ime ili ime + prezime",
    description:
      "Personalizovana vrećica za vrtić sa imenom deteta, praktična za presvlaku, pidžamu, patofne ili svakodnevne stvari.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Jastučnica / mali jastuk sa imenom",
    sampleLabel: "poklon",
    personalization: "ime + datum po izboru",
    description:
      "Mekana jastučnica sa vezom imena, lep personalizovani poklon za bebu, vrtić, rođendan ili uspomenu iz detinjstva.",
    orderMeta: defaultOrderMeta,
  },
  {
    name: "Kecelja sa imenom",
    sampleLabel: "za kuhinju",
    personalization: "ime ili kratka titula",
    description:
      "Kecelja sa izvezenim imenom ili titulom, praktičan i duhovit poklon za mamu, tatu, baku, deku ili ljubitelje kuvanja.",
    orderMeta: defaultOrderMeta,
  },
]

export function buildShopWhatsAppHref(productName: string, whatsappNumber: string): string {
  const message = encodeURIComponent(
    `Zdravo, zainteresovan/a sam za personalizovani poklon: ${productName}. Voleo/la bih informacije o ceni, roku izrade i mogućnostima personalizacije.`,
  )
  return `https://wa.me/${whatsappNumber}?text=${message}`
}
