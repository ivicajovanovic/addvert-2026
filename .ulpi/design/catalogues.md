# Katalozi: UX/UI i implementaciona specifikacija

This feature binds to `.ulpi/design/DESIGN.md`. Every screen must read as the same product if placed side by side.

## Odluka i cilj

Dodaje se javna, indeksabilna stranica `/katalozi`. Oznaka u primarnoj navigaciji je kratka: `Katalozi`. Naslov stranice i meta podaci koriste punu nameru pretrage: promo proizvodi, poslovni tekstil i radna oprema.

Stranica nije prodavnica i ne sme ostaviti utisak da ADD VERT vodi sopstveni lager. Njena uloga je da kupcu pomogne da pronađe šifru artikla, a zatim pošalje ADD VERT-u upit za količinu i brendiranje. Aktuelni katalozi ostaju kod dobavljača. Ne hostujemo PDF fajlove, ne preuzimamo ih u repozitorijum i ne ugrađujemo tuđe stranice u iframe.

**Cilj korisnika:** pronaći pogodan artikal i bez nedoumice poslati šifru, količinu i željeni način brendiranja.

**Cilj ADD VERT-a:** zadržati upit i savetovanje kod sebe, bez održavanja tuđeg kataloga, cena i stanja zaliha.

## Dizajnerski pravac

Stranica ostaje strogo u zaključanom pravcu **Swiss / grid** iz `DESIGN.md`: tamna radionička površina, bela pravila, oštre ivice, Inter i jedna bela akcentna boja.

**Signature na ovoj stranici:** dve visoke naslovne strane kataloga presečene istim tankim horizontalnim pravilom koje nosi ADD VERT. One su materijal dokaza i orijentacije, ne dekoracija. Između kartica nema dodatnih panela ni efekata.

Ne uvoditi boje dobavljača kao novi identitet, gradijente, zaobljene kartice, karusel, tabove, cenu, lager, bedževe niti generički blok od tri jednake kartice. Ovo je namerno tih, precizan katalog-ulaz.

## Informaciona arhitektura

- Primarni navbar ima šest sadržajnih stavki: `Usluge`, `Katalozi`, `Galerija`, `O nama`, `Pokloni`, `Kontakt`. `Katalozi` je neposredno posle `Usluge`.
- `Industrije` ostaje indeksabilna ruta i zadržava postojeću sekciju i link na početnoj stranici, kao i linkove sa relevantnih uslužnih stranica i footera. Uklanja se samo iz primarnog desktop i mobilnog menija da novi `Katalozi` dobije vidljivost bez niza od sedam jednakih odluka. Globalni CTA `Zatražite ponudu` ostaje nepromenjen.
- H1: `Katalozi promo proizvoda i poslovnog tekstila`.
- Jedna stranica sa dva kataloga:
  - `Tekstil i radna oprema` (izdanje 2026)
  - `Promo pokloni` (izdanje 2026)
- Primarna radnja po katalogu: `Pregledajte interaktivni katalog`.
- Sekundarna radnja po katalogu: `Otvori PDF katalog`.
- Završna, domaća radnja: `Pošaljite šifru artikla` na WhatsApp, sa unapred popunjenim tekstom.

Naziv u navigaciji ostaje kratak zbog skenabilnosti. Puni naziv postoji samo tamo gde korisnik i pretraživač traže objašnjenje: H1, uvod i metadata. Smanjenje glavnog menija ne uklanja postojeće stranice iz sajta ili sa mape sajta.

## Wireframe

### Desktop, 12-kolonska mreža

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ADD VERT  USLUGE  KATALOZI  GALERIJA  O NAMA  POKLONI  KONTAKT [PONUDA] │
├──────────────────────────────────────────────────────────────────────────┤
│ KATALOZI                                                                │
│ Katalozi promo proizvoda                                                │
│ i poslovnog tekstila                                                    │
│ ━━━                                                                      │
│ Izaberite artikal, zapišite šifru i pošaljite nam količinu i logo.      │
├──────────────────────────────────────────────────────────────────────────┤
│ [ NASLOVNA TEKSTIL ]              │ [ NASLOVNA PROMO POKLONI ]          │
│                                   │                                    │
│ TEKSTIL I RADNA OPREMA            │ PROMO POKLONI                      │
│ Odeća, uniforme i radna oprema.   │ Pokloni za klijente i događaje.     │
│                                   │                                    │
│ [ PREGLEDAJTE INTERAKTIVNI ]      │ [ PREGLEDAJTE INTERAKTIVNI ]        │
│ [ Otvori PDF katalog ↗ ]          │ [ Otvori PDF katalog ↗ ]            │
├──────────────────────────────────────────────────────────────────────────┤
│ KAKO NARUČUJETE                    1  Pregledajte katalog               │
│                                      2  Zapišite šifru artikla          │
│                                      3  Pošaljite nam upit               │
├──────────────────────────────────────────────────────────────────────────┤
│ KONTAKTIRAJTE NAS                        [ POŠALJITE ŠIFRU ARTIKLA ]     │
│ Pošaljite šifru, količinu i željeni vez ili DTF štampu.                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Mobilni prikaz

```text
Header / meni
Hero: nadnaslov, H1, crta, uvod
Katalog 1: naslovna slika, tekst, primarno dugme, PDF link
Katalog 2: naslovna slika, tekst, primarno dugme, PDF link
Tok naručivanja: 3 pune redne stavke sa pravilima
Završni CTA: puni red, WhatsApp dugme pune širine
Footer
```

Na mobilnom se sadržaj samo slaže u jednu kolonu. Ne koristiti horizontalno skrolovanje, umanjene akcione zone niti plutajući CTA.

## Sekcije i sadržaj

### 1. Hero

- Koristi postojeći `PageHero`, veličina `default`.
- Nadnaslov: `Katalozi`.
- Naslov: `Katalozi promo proizvoda i poslovnog tekstila`.
- Opis: `Pregledajte ponudu promo poklona, poslovnog tekstila i radne opreme. Kada pronađete artikal, pošaljite nam šifru, količinu i logo za ponudu.`
- Nema CTA dugmeta u hero delu. Jedina primarna odluka u prvom prikazu je nastavak ka katalogu pri skrolu; globalno dugme `Zatražite ponudu` ostaje u headeru.

### 2. Katalozi

Layout porodica: dve jednake kolone samo za dve stvarne, ravnopravne kolekcije. Svaki element je jedan `article`, bez kartice u kartici:

- naslovna slika kataloga u odnosu približnom originalnoj naslovnoj strani, `object-fit: cover`, sa tankim okvirom;
- utility red: `NAJNOVIJE IZDANJE`;
- h2 sa nazivom kataloga;
- opis od najviše dve rečenice, pisan za ADD VERT publiku;
- puno belo primarno dugme `Pregledajte interaktivni katalog` sa ikonom ExternalLink;
- tekstualni sekundarni link `Otvori PDF katalog` sa ikonom Download ili ExternalLink;

Korišćenje dve naslovne slike kataloga je potvrđeno od strane dobavljača 1. avgusta 2026. ADD VERT koristi svoje lokalne, optimizovane WebP naslovne slike uz njihove aktuelne katalog linkove. Ne hotlinkovati nasumično slike i ne kopirati sadržaj unutrašnjih stranica kataloga.

Početni linkovi, izolovani u jednoj data konfiguraciji radi godišnjeg ažuriranja:

| id | Katalog | Interaktivni link | PDF link |
| --- | --- | --- | --- |
| `workwear-2026` | Tekstil i radna oprema | `https://flipboxapp.net/client/promobox-2026-workwear-srb` | `https://promobox.com/storage/catalogues/Katalog%20Tekstil%20i%20Radna%20oprema%20smanjeno%20sa%20koricom.pdf` |
| `promo-2026` | Promo pokloni | `https://flipboxapp.net/client/promobox-2026-sr` | `https://promobox.com/storage/catalogues/Katalog%202026-SRB.pdf` |

### 3. Tok naručivanja

Layout porodica: asimetrična podela 4/8 kolona, bez kartica. Levo je naslov `Kako naručujete`. Desno su tri redne stavke sa tankim gornjim pravilom:

1. `Pregledajte katalog` — pronađite proizvod koji odgovara nameni.
2. `Zapišite šifru artikla` — šifra ubrzava proveru boja, dostupnosti i opcija štampe.
3. `Pošaljite nam upit` — navedite količinu i željeni vez ili DTF štampu.

Brojevi su dozvoljeni jer objašnjavaju stvarni proces. Ne koristiti ih kao dekorativne section markere.

### 4. Završni CTA

Layout porodica: puna širina sa gornjim i donjim pravilom, 7/5 kolona na desktopu. Levo je `Kontaktirajte nas` i kratak tekst. Desno je jedino lokalno belo dugme `Pošaljite šifru artikla`.

Dugme otvara WhatsApp u novom tabu sa porukom:

`Zdravo, pronašao/la sam artikal u katalogu. Šifra artikla: [upišite šifru]. Količina: [upišite količinu]. Potreban mi je: [vez / DTF štampa].`

Braketirani delovi su namerna uputstva, ne forma. Ne tražiti podatke koje korisnik nema pre nego što je pregledao katalog.

## Tokovi i stanja

### Tok: Izbor artikla i slanje upita

**Korisnik:** osoba iz firme, udruženja ili događaja koja traži tekstil ili promo poklon sa brendiranjem.

**Ulazi:** navbar, interna veza sa početne/uslužne stranice, direktan URL `/katalozi`, organska pretraga.

```text
[ /katalozi ]
      |
      v
[pregleda kataloge]
      |
      v
[bira Tekstil ili Promo poklone]
      |
      +--> [interaktivni katalog, novi tab] --> [zapisuje šifru] --+
      |                                                          |
      +--> [PDF, novi tab] ------------------> [zapisuje šifru] -+
                                                                 |
                                                                 v
                                              [WhatsApp upit ADD VERT-u]
```

| Stanje | Prikaz i ponašanje |
| --- | --- |
| normalno | oba kataloga i obe akcije su dostupni |
| nedostaje slika | neutralna tamna površina sa nazivom kataloga, bez slomljene slike |
| nedostaje link | ne prikazivati neaktivno dugme; prikazati `Katalog trenutno ažuriramo. Pošaljite nam upit.` i lokalni CTA |
| spoljni katalog je nedostupan | novi tab može javiti grešku van naše kontrole; lokalni CTA i telefonski kontakt ostaju vidljivi na našoj stranici |
| spor internet | ne učitavati PDF, flip sadržaj niti tuđe skripte na našoj stranici; naslovne slike imaju rezervisan odnos stranica |
| povratak Back dugmetom | vraća korisnika na očuvanu `/katalozi` stranicu bez lokalnog stanja |
| offline | standardni browser prikaz; WhatsApp dugme ne sme obećavati slanje ako aplikacija/mreža nisu dostupne |

## Komponente i interakcije

### `CatalogProcess`

- Server komponenta, tri podatkom vođene redne stavke.
- Desktop: 4/8 podela. Mobilno: stavke vertikalno.
- Stavke nisu linkovi niti interaktivne kontrole.
- Scroll reveal koristi postojeće 500ms pojavljivanje samo pri prvom ulasku u viewport. Uz `prefers-reduced-motion` sadržaj je odmah vidljiv.

### `CatalogCard`

```ts
interface CatalogCardProps {
  id: "workwear-2026" | "promo-2026"
  title: string
  edition: string
  description: string
  cover: { src: string; alt: string } | null
  flipHref?: string
  pdfHref?: string
}
```

| Stanje | Vizuelno | Ponašanje |
| --- | --- | --- |
| podrazumevano | naslovna strana, pravilo, beli naslov, prigušen opis | primarno dugme i sekundarni link su dostupni ako URL postoji |
| hover | samo pravilo i strelica/ikona dobijaju puni beli kontrast | ne pomerati karticu i ne koristiti shadow |
| focus | postojeći beli focus ring oko fokusanog linka | Enter aktivira link |
| nedostajući podaci | neutralna zamena za sliku i lokalni CTA | nema praznog ili onemogućenog spoljnog dugmeta |

Eksterni linkovi imaju `target="_blank"`, `rel="noopener noreferrer"` i vizuelnu/tekstualnu napomenu da se otvaraju van sajta. Ne dodavati `nofollow` ili `sponsored` bez komercijalnog razloga koji to zahteva. Ne učitavati iframe, PDF viewer, prefetch niti skriptu dobavljača.

### `CatalogInquiryCta`

- Koristi postojeći `Button`, varijanta bela, bez radijusa.
- Na mobilnom je širine 100% i visine najmanje 48px.
- Link ima jasan `aria-label`: `Pošaljite šifru artikla putem WhatsApp-a`.
- Fokus ostaje na linku; nema dijaloga, forme ni asinhronog slanja na ovoj stranici.

## Pristupačnost

- H1 je jedini na stranici; nazivi kataloga su h2, naslov procesa je h2.
- Svaka naslovna slika ima opisni alt, npr. `Naslovna strana kataloga Tekstil i radna oprema, izdanje 2026`; dekorativne ikone imaju `aria-hidden`.
- Tekst #fafafa na #0a0a0a ima kontrast veći od 18:1. Prigušeni tekst #a1a1aa se koristi samo u veličini koja održava AA kontrast na tamnoj pozadini. Bela primarna akcija i crni tekst imaju kontrast veći od 18:1.
- Sve akcije imaju vidljiv tastaturni fokus i metu najmanje 44 × 44 px; na mobilnom 48 px visine.
- Izlazak na spoljni sajt je naznačen u vidljivom tekstu, ne samo ikonom.

## SEO, metadata i indeksiranje

Ruta se indeksira. Ne postavljati `noindex`, jer stranica ima originalan ADD VERT sadržaj i jasnu komercijalnu nameru. Ne duplirati tekst dobavljača, opise proizvoda ni PDF sadržaj.

```text
URL: /katalozi
title: Promo proizvodi i poslovni tekstil – katalozi
description: Pregledajte katalog promo poklona, poslovnog tekstila i radne opreme. Pošaljite nam šifru artikla i količinu, a ADD VERT priprema ponudu za brendiranje.
canonical: https://addvert.net/katalozi
Open Graph: isti naslov i opis, postojeća ADD VERT OG slika
```

- Izvesti `metadata` kroz postojeći `buildPageMetadata`, sa putanjom `/katalozi`.
- Dodati `/katalozi` u `app/sitemap.ts`, preporučeni `priority: 0.8`, `changeFrequency: monthly`.
- Dodati interni link ka `/katalozi` iz navigacije i po potrebi iz relevantnih sekcija usluga. To su pravi SEO signali, ne katalog-prepisivanje.
- Ne dodavati Product, Offer, price, availability ili AggregateRating structured data. ADD VERT ne objavljuje sopstvene proverene proizvode, cene ni lager na ovoj stranici.
- `CollectionPage`/`ItemList` nije potreban za dve spoljne reference. Ako kasnije dodamo originalne kategorije ili artikle na ADD VERT-u, tada modelirati sopstveni strukturisani sadržaj.

## Analitika i privatnost

Meriti samo akcije na ADD VERT sajtu, posle korisnikovog pristanka na analitiku:

| Događaj | Kada | Svojstva |
| --- | --- | --- |
| `catalog_open` | klik na Flip ili PDF | `catalog_id`, `catalog_name`, `format` (`flip` ili `pdf`) |
| `catalog_inquiry_start` | klik na WhatsApp CTA | `source: catalogs` |
| `catalogue_page_view` | standardni page view | ruta `/katalozi` |

Ne slati šifru artikla, količinu, ime, telefon ili sadržaj WhatsApp poruke u Google Analytics. Ne uvoditi dobavljačev tracking kod na ADD VERT sajtu.

## Implementacioni handoff

**Target:** Next.js senior engineer.

**Design system:** bespoke postojeći Next.js/Tailwind sistem. Koristiti postojeće `PageHero`, `Button`, `ScrollReveal`, Lucide ikone i zaključane tokene iz `.ulpi/design/DESIGN.md`. Ne redizajnirati header, footer ili postojeću temu.

**Predložene izmene:**

- `app/katalozi/page.tsx`: server strana i metadata.
- `components/catalogues-page.tsx` ili razdvojene male server komponente za proces, kartice i CTA.
- `lib/catalogues-data.ts`: jedina lokacija za naziv, izdanje, slike i spoljne URL-ove.
- `lib/site-config.ts`: primarni meni postaviti na `Usluge`, `Katalozi`, `Galerija`, `O nama`, `Pokloni`, `Kontakt`; `Katalozi` dodati posle `Usluge`, a `Industrije` ukloniti samo iz `NAV_ITEMS`. Rutu `/industrije`, sekciju na početnoj strani i njene interne linkove ne menjati.
- `app/sitemap.ts`: dodati rutu.
- Po potrebi, mala client komponenta samo za postojeći consent-aware GA događaj. Ako infrastruktura za consent-aware event ne postoji, prvo isporučiti bez dodatnog praćenja umesto da se zaobiđe pristanak.

**Prihvatanje:** implementirati tačno ovu specifikaciju. Stranica mora biti vidljiva u navigaciji, responzivna, indeksabilna, imati canonical metadata i sitemap unos. Spoljni katalozi se otvaraju u novom tabu bez iframe-a. PDF se ne hostuje niti učitava unapred. Svaka lokalna radnja vodi ka ADD VERT WhatsApp upitu. Proveriti `pnpm lint`, `pnpm typecheck` i `pnpm build`.

## Pre-flight

- [x] Identitet ostaje zaključan u postojećem `DESIGN.md`; nema novih boja, radijusa, fontova ni ikona.
- [x] Jedan akcenat, oštre ivice, Lucide i Inter; off-system vrednosti: 0.
- [x] Nema gradijenata, tri jednake kartice, kartice u karticama, dekorativnih brojeva, em dash znakova ni izmišljenih brojki.
- [x] Postoje tri različite layout porodice: hero, 4/8 procesna podela i dvokolonski katalog sa završnim punim CTA redom.
- [x] Pokriveni su nedostajući link/slika, spor internet, spoljni kvar, povratak i offline stanje.
- [x] Kontrast, fokus, naslovna hijerarhija, spoljne veze, ciljne površine i reduced-motion su određeni.
- [x] Primarni meni ima šest kratkih stavki, a novi `Katalozi` je uz `Usluge`; izbor je ograničen na dva kataloga po prikazu i jednu lokalnu primarnu akciju na kraju.
- [x] Slop test i counterfactual test prolaze: kompozicija je specifična za ADD VERT katalog-ulaz, ne generična marketinška stranica.

**Ocena:** distinctiveness 3, hierarchy 4, consistency 4, accessibility 4, state coverage 4, copy quality 4, restraint 4, motion motivation 4. Ukupno 31/32.
