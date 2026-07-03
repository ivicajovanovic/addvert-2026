export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: "minimalna-kolicina",
    question: "Kolika je minimalna količina?",
    answer:
      "Minimum je 20+ komada za mašinski vez i 10+ komada za DTF štampu. Po dogovoru možemo razgovarati i o manjim serijama.",
  },
  {
    id: "format-fajlova",
    question: "Koji format fajlova vam je potreban?",
    answer: "PDF, AI, EPS, PNG ili JPG. Ako nemate spreman dizajn, možemo ga pripremiti za vas.",
  },
  {
    id: "trajanje-izrade",
    question: "Koliko traje izrada?",
    answer:
      "Digitalizacija traje 2 do 4 dana, a proizvodnja 5 do 10 radnih dana, u zavisnosti od količine i trenutne zauzetosti.",
  },
  {
    id: "vez-na-vasim-komadima",
    question: "Da li radite vez na našim komadima?",
    answer: "Da, radimo vez i na gotovim komadima klijenata.",
  },
  {
    id: "bez-dizajna",
    question: "Šta ako nemam dizajn?",
    answer: "Nudimo profesionalnu digitalizaciju i pripremu dizajna za vez u specijalizovanim programima.",
  },
  {
    id: "slanje-robe",
    question: "Da li šaljete robu?",
    answer:
      "Da. Moguće je lično preuzimanje, slanje kurirskom službom ili direktna isporuka na adresu klijenta.",
  },
  {
    id: "na-cemu-radite-vez",
    question: "Na čemu sve možete da radite vez?",
    answer:
      "Vez možemo raditi na polo majicama, T-shirt majicama, prslucima, jaknama, košuljama, kačketima, uniformama, cegerima, torbama i drugim materijalima.",
  },
]

export const HOME_FAQ_COUNT = 3
