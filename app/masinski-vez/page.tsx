import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { ServiceDetailPage } from "@/components/service-detail-page"
import { buildPageMetadata } from "@/lib/metadata"
import { getBreadcrumbJsonLd, getServiceFaqPageJsonLd, getServiceJsonLd } from "@/lib/structured-data"

const description =
  "Mašinski vez na majicama, tekstilu, peškirima, platnu, kačketima, uniformama i radnoj odeći. Pošaljite logo i količinu za tačnu cenu veza."

const faqs = [
  {
    question: "Kolika je cena veza na majicama?",
    answer:
      "Cena veza na majicama zavisi od dimenzije i složenosti motiva, broja boja, vrste materijala i ukupne količine. Pošaljite logo, željenu poziciju veza i broj komada, pa dobijate konkretnu ponudu.",
  },
  {
    question: "Da li radite vez na peškirima i platnu?",
    answer:
      "Da. Radimo vez na peškirima za hotele, apartmane i poklone, kao i personalizaciju platna i poveza za krštenja i venčanja.",
  },
  {
    question: "Da li može vez na kačketima?",
    answer:
      "Da, radimo vez na kačketima i kapama za firme, klubove, događaje i promotivne timove. Pre izrade proveravamo veličinu i poziciju logotipa da bi rezultat bio čitak.",
  },
  {
    question: "Da li primate naše majice i drugu garderobu?",
    answer:
      "Da. Možete doneti ili poslati gotove majice, jakne, radna odela, torbe i druge odgovarajuće komade za vez.",
  },
] as const

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Mašinski vez na majicama, tekstilu, peškirima i kačketima",
    description,
    path: "/masinski-vez",
  }),
  keywords: [
    "mašinski vez",
    "vez na majicama",
    "vez na tekstilu",
    "vez na peškirima",
    "vez na platnu",
    "vez na kačketima",
    "vez na majicama cena",
    "vez na majicama Beograd",
    "vez na majicama Novi Sad",
  ],
}

export default function MasinskiVezPage() {
  return (
    <>
      <JsonLd
        data={[
          getServiceJsonLd({
            name: "Mašinski vez na tekstilu",
            description,
            path: "/masinski-vez",
          }),
          getServiceFaqPageJsonLd([...faqs]),
          getBreadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Mašinski vez", path: "/masinski-vez" },
          ]),
        ]}
      />
      <ServiceDetailPage
        eyebrow="Mašinski vez"
        title="Vez na majicama, tekstilu, peškirima i kačketima"
        intro="Izrađujemo mašinski vez za firme, hotele, klubove i poklone: od malog logotipa na majici do monograma na peškiru ili prepoznatljivog amblema na radnoj odeći."
        serviceParam="masinski-vez"
        overviewTitle="Trajan znak na tekstilu"
        overview="Vez je odličan izbor kada želite uredan, dugotrajan i profesionalan rezultat. Pre proizvodnje pripremamo dizajn za vez i dogovaramo poziciju, dimenziju i boje konca kako bi logo ili motiv odgovarao materijalu i nameni komada."
        applications={[
          {
            title: "Vez na majicama i uniformama",
            description: "Polo i T-shirt majice, košulje, prsluci, jakne i radna odela sa logom firme ili imenom zaposlenog.",
          },
          {
            title: "Vez na peškirima",
            description: "Peškiri sa logom za hotele, apartmane i spa centre, kao i peškiri sa imenom za poklone i posebne prilike.",
          },
          {
            title: "Vez na kačketima i kapama",
            description: "Brendirani kačketi i kape za timove, promotere, klubove, udruženja i događaje.",
          },
          {
            title: "Vez na platnu",
            description: "Personalizovano platno i povez za krštenja, venčanja i druge svečane prilike.",
          },
          {
            title: "Vezeni amblemi",
            description: "Amblemi za sportske i moto klubove, udruženja, uniforme i opremu koja traži poseban znak.",
          },
          {
            title: "Vez na vašim komadima",
            description: "Možete doneti ili poslati odgovarajuće gotove komade — proverićemo materijal i predložiti rešenje.",
          },
        ]}
        priceTitle="Cena mašinskog veza"
        priceDescription="Za cenu veza na majicama ili drugom tekstilu potreban nam je kratak uvid u posao. Na taj način ponuda odgovara stvarnom dizajnu i količini, bez skrivanja bitnih stavki."
        priceFactors={[
          "veličina i složenost motiva",
          "broj boja konca i broj uboda",
          "vrsta, pozicija i debljina materijala",
          "količina komada i eventualna priprema dizajna",
        ]}
        faqs={[...faqs]}
        relatedService={{ label: "DTF štampa na majicama i tekstilu", href: "/stampa-na-majicama" }}
      />
    </>
  )
}
