import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { ServiceDetailPage } from "@/components/service-detail-page"
import { buildPageMetadata } from "@/lib/metadata"
import { getBreadcrumbJsonLd, getServiceFaqPageJsonLd, getServiceJsonLd } from "@/lib/structured-data"

const description =
  "DTF štampa na majicama, duksericama i tekstilu za firme, klubove i događaje. Pošaljite dizajn i količinu za tačnu cenu štampe na majicama."

const faqs = [
  {
    question: "Kolika je cena štampe na majicama?",
    answer:
      "Cena štampe na majicama zavisi od veličine i broja otisaka, broja komada, vrste tekstila i da li obezbeđujemo majice. Pošaljite dizajn, količinu i željenu poziciju štampe za tačnu ponudu.",
  },
  {
    question: "Šta je DTF štampa?",
    answer:
      "DTF je postupak štampe za tekstil koji omogućava detaljne motive i pune boje na različitim vrstama materijala. Dobar je izbor za logotipe, ilustracije i kratke serije garderobe.",
  },
  {
    question: "Na čemu radite štampu na tekstilu?",
    answer:
      "DTF štampu radimo na majicama, polo majicama, duksericama i radnoj odeći. Pošaljite fotografiju ili specifikaciju komada ako želite proveru pre naručivanja.",
  },
  {
    question: "Da li radite porudžbine za Beograd i Novi Sad?",
    answer:
      "Da. Saradnju dogovaramo na daljinu i šaljemo gotovu robu kurirskom službom, tako da radimo sa klijentima iz Beograda, Novog Sada i cele Srbije.",
  },
] as const

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "DTF štampa na majicama i tekstilu",
    description,
    path: "/stampa-na-majicama",
  }),
  keywords: [
    "DTF štampa",
    "štampa na majicama",
    "štampa na tekstilu",
    "DTF štampa na majicama",
    "štampa na majicama cena",
    "štampa na majicama Beograd",
    "štampa na majicama Novi Sad",
  ],
}

export default function StampaNaMajicamaPage() {
  return (
    <>
      <JsonLd
        data={[
          getServiceJsonLd({
            name: "DTF štampa na majicama i tekstilu",
            description,
            path: "/stampa-na-majicama",
          }),
          getServiceFaqPageJsonLd([...faqs]),
          getBreadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "DTF štampa na majicama", path: "/stampa-na-majicama" },
          ]),
        ]}
      />
      <ServiceDetailPage
        eyebrow="DTF štampa"
        title="Štampa na majicama i tekstilu"
        intro="DTF štampa je praktično rešenje za majice, dukserice i radnu odeću sa logotipom, ilustracijom ili promotivnim motivom — za firme, klubove, događaje i timove."
        serviceParam="dtf-stampa"
        overviewTitle="Precizan otisak za vaš dizajn"
        overview="Pre štampe proveravamo fajl, veličinu i poziciju motiva kako bi štampa na tekstilu bila jasna i primerena komadu. DTF je naročito pogodan kada dizajn ima više boja, fine detalje ili kada vam treba kraća serija."
        applications={[
          {
            title: "Štampa na majicama",
            description: "Majice za zaposlene, promocije, događaje, klubove, timska okupljanja i poklon serije.",
          },
          {
            title: "Štampa na duksericama",
            description: "Dukserice sa logotipom, grafikom ili natpisom za jesenje i zimske kolekcije tima.",
          },
          {
            title: "Radna odeća sa štampom",
            description: "Majice, polo majice i drugi tekstil za vidljiv i ujednačen identitet vašeg tima.",
          },
          {
            title: "Promotivni tekstil",
            description: "Tekstil za aktivacije brenda, sajmove, događaje, kampanje i poklone klijentima.",
          },
          {
            title: "Klubovi i udruženja",
            description: "Majice i dukserice sa znakom, imenom ili grafikom za sportske ekipe, udruženja i zajednice.",
          },
          {
            title: "Kombinacija štampe i veza",
            description: "Kada projekat traži oba postupka, predlažemo gde štampa a gde mašinski vez daje bolji rezultat.",
          },
        ]}
        priceTitle="Cena štampe na majicama"
        priceDescription="Za cenu DTF štampe na majicama pošaljite dizajn i nekoliko osnovnih informacija. Tako možemo odmah predložiti odgovarajuću veličinu otiska i pripremiti tačnu ponudu."
        priceFactors={[
          "veličina, broj i pozicija otisaka",
          "količina majica ili drugih komada",
          "vrsta materijala i da li obezbeđujemo tekstil",
          "spremnost fajla za štampu i eventualna priprema",
        ]}
        faqs={[...faqs]}
        relatedService={{ label: "Mašinski vez na majicama, peškirima i tekstilu", href: "/masinski-vez" }}
      />
    </>
  )
}
