export interface Industry {
  id: string
  title: string
  description: string
  products: string[]
}

export const industriesIntro =
  "Prepoznajte se. Radimo za široku lepezu klijenata: turizam, ugostiteljstvo, proizvodnju, sportske klubove, udruženja i brojne druge sektore."

export const industries: Industry[] = [
  {
    id: "sportski-klubovi",
    title: "Sportski klubovi i udruženja",
    description: "Amblemi, majice i kačketi za moto klubove, sportske ekipe i udruženja.",
    products: [
      "Dresovi i majice sa klupskim amblemima",
      "Trenerke i odeća za džoging",
      "Kačketi i kape sa šiltom",
      "Polo majice za upravu i stručni štab",
      "Vetrovke i softshell jakne",
      "Sportske torbe i ruksaci",
      "Peškiri sa logom kluba",
      "Navijački šalovi (DTF štampa)",
    ],
  },
  {
    id: "hoteli-restorani",
    title: "Hoteli i restorani",
    description: "Mašinski vez na peškirima, stolnjacima, posteljini i kuhinjskim krpama.",
    products: [
      "Peškiri i kuhinjske krpe",
      "Stolnjaci i posteljina sa monogramom",
      "Polo majice za recepcionere",
      "Uniforme za konobare i osoblje u sali",
      "Kecelje za kuvare i kuhinjski tim",
      "Kuhinjske kape i marame",
      "Radni mantili za tehničko osoblje",
    ],
  },
  {
    id: "kafici-ugostiteljstvo",
    title: "Kafići i ugostiteljstvo",
    description: "Majice, kape i kecelje sa brendiranim vezom ili DTF štampom.",
    products: [
      "Kecelje za bariste sa logom kafića",
      "Polo majice i majice za osoblje",
      "Kačketi sa brendom kafića",
      "Majice za promotere na događajima",
      "Promotivne torbe",
      "Peškiri za šank",
    ],
  },
  {
    id: "apoteke-zdravstvo",
    title: "Apoteke i zdravstvo",
    description: "Uniforme, radna odela i promotivni tekstil.",
    products: [
      "Beli mantili sa logom apoteke",
      "Medicinske uniforme za zdravstvene ustanove",
      "Polo majice za farmaceute",
      "Medicinske kape i marame",
      "Promotivne torbe sa logom",
      "Majice za promotivne akcije",
    ],
  },
  {
    id: "ketering",
    title: "Ketering i prehrambena industrija",
    description: "Brendirani tekstil za osoblje radi higijenskog i profesionalnog izgleda.",
    products: [
      "Kecelje za kuvare i osoblje",
      "Polo majice i majice za tim",
      "Kačketi za kuhinjski tim",
      "Radna odela za dostavljače",
      "Torbe i hladnjače sa logom",
      "Kuhinjske kape i marame",
    ],
  },
  {
    id: "korporativni-sektor",
    title: "Korporativni sektor",
    description: "Majice, torbe i poklon program za zaposlene i poslovne partnere.",
    products: [
      "Polo majice sa logom kompanije",
      "Poslovne košulje sa vezom",
      "Fleece i softshell jakne",
      "Korporativne torbe i ruksaci",
      "Poklon setovi za zaposlene",
      "Majice za timske događaje",
      "Šolje i termosi (sublimacija)",
    ],
  },
  {
    id: "skole-ustanove",
    title: "Škole i ustanove",
    description: "Uniforme, sportska oprema, amblemi i oznake.",
    products: [
      "Maturske majice i dukserice",
      "Školski amblemi i oznake (vez)",
      "Sportske majice i trenerke",
      "Kačketi sa logom škole",
      "Uniforme za posebne prilike",
      "Torbe i ruksaci sa logom",
    ],
  },
  {
    id: "auto-servisi",
    title: "Auto servisi i mehanika",
    description: "Uniforme i radna odela sa brendiranim vezom ili DTF štampom za servisne timove.",
    products: [
      "Radna odela i kombinezoni sa logom",
      "Polo majice za servisno osoblje",
      "Kačketi i radne kape",
      "Softshell jakne za osoblje",
      "Radne košulje sa imenom i logom",
      "Majice za prodajni tim",
    ],
  },
  {
    id: "frizerstvo-kozmetika",
    title: "Frizerski saloni i kozmetika",
    description:
      "Kecelje, uniforme i promotivni tekstil za frizerske i kozmetičke salone, kao i wellness centre.",
    products: [
      "Kecelje za frizere i stiliste",
      "Uniforme za kozmetičare i estetičare",
      "Peškiri sa logom salona",
      "Majice i polo majice za osoblje",
      "Kačketi sa brendom salona",
      "Promotivne majice za klijente",
    ],
  },
]
