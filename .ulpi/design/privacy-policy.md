# Politika privatnosti: specifikacija

This screen binds to `.ulpi/design/DESIGN.md`. Every screen must read as the same product if placed side by side.

## Kontekst

- Korisnik: posetilac ADD VERT sajta koji želi da razume obradu podataka pre prijave na vodič i novosti.
- Cilj: jedna javna, čitljiva i konkretna politika privatnosti na `/politika-privatnosti`.
- Rukovalac: `IVICA JOVANOVIĆ PR RADNJA ZA ŠTAMPARSKE USLUGE ADD VERT PETROVAC NA MLAVI`.
- Kontakt rukovaoca: `info@addvert.net`, Srpskih vladara 316, Petrovac na Mlavi.
- Datum poslednjeg ažuriranja: 21. jul 2026.

## Zaključana kompozicija

Pravac: **Swiss / grid**. Nema ilustracija, kartica u karticama, gradijenata ni dekorativnog marketinga.

1. Postojeći `PageHero`, kompaktna varijanta: nadnaslov `Pravne informacije`, naslov `Politika privatnosti`, jedna bela crta i kratak opis.
2. Uvodni blok u dve kolone na desktopu: levo identitet rukovaoca, desno datum poslednjeg ažuriranja i mail link. Na mobilnom se slaže u jednu kolonu.
3. Glavni tekst u čitljivo ograničenoj širini sa numerisanim sekcijama odvojenim tankim belim/sivim pravilima, ne karticama. Sekcije su: ko obrađuje podatke, koje podatke, svrhe i osnov, newsletter, primaoci/obrađivači, rok čuvanja, prava, kolačići i analitika, izmene, kontakt.
4. Završni kontakt blok: jedan izdvojen ali ravan (bez zaobljenja) tamniji panel sa jasnim `info@addvert.net` mail linkom.

## Copy contract

U samoj politici navesti samo sledeće proverljive tvrdnje:

- Newsletter prima samo osoba koja sama pošalje prijavu i potvrdi saglasnost; marketinške poruke se šalju najviše jednom mesečno, uz automatsku poruku sa vodičem po uspešnoj prijavi.
- Prikuplja se email adresa, datum/vreme pristanka i tehnički zapis potreban za bezbednost i dokaz saglasnosti. Ime se ne prikuplja kroz newsletter formu dok se izričito ne uvede.
- Osnov za marketing je pristanak; odjava je dostupna u svakoj poruci i preko `info@addvert.net`.
- Brevo je obrađivač za upravljanje listom i slanje poruka. Hosting obezbeđuje Netlify. Ne navoditi lokaciju servera ili međunarodne prenose kao činjenicu bez potvrde ugovora sa pružaocima usluga.
- Aktivni marketinški kontakt se čuva do povlačenja pristanka. Nakon toga se zadržava samo minimalni zapis potreban da se spreči ponovo slanje i ispune zakonske obaveze.
- Navesti prava: pristup, ispravka, brisanje, ograničenje, prigovor, prenosivost kada je primenljivo, povlačenje pristanka i pritužba Povereniku.
- Kolačići: precizno opisati da sajt koristi neophodne kolačiće; analitički kolačići se ne aktiviraju dok korisnik ne da izbor. Ovo je uslov za kasniju implementaciju banera za saglasnost i Google Analytics ne sme ostati aktivan pre tog izbora.
- Ne davati pravne garancije niti predstavljati stranicu kao pravni savet.

## Flow: čitanje i kontakt

**Goal:** posetilac razume obradu i može odmah da kontaktira rukovaoca.

```
[Footer ili link iz forme]
          |
          v
[Politika privatnosti]
          |
          +--> [mail link] --> [podrazumevani email program]
          |
          +--> [nazad] --> [prethodna stranica]
```

- Direktan URL `/politika-privatnosti` radi bez prijave i bez JavaScripta.
- Nema forme, učitavanja podataka, praznog ni mrežnog stanja.
- Neispravan mail klijent nije greška stranice: mail adresa ostaje kopirljiva kao tekstualni link.

## Komponente

### `PrivacyPolicyPage`

- Server komponenta u `app/politika-privatnosti/page.tsx`.
- Metapodaci: naslov `Politika privatnosti`, kratak opis, kanonski URL `/politika-privatnosti`.
- Koristi postojeći `PageHero`, bez novih JavaScript zavisnosti.

### `SiteFooter`

- Dodati običan `Link` ka `/politika-privatnosti` pored autorskog kredita ili u kratkom pravnom redu.
- Fokus: vidljiv `outline` koji nasleđuje postojeći `outline-ring` token.

## Pristupačnost i odziv

- Jedan `h1`, zatim sekcijski `h2`; redosled prati sadržaj.
- Linkovi imaju smislen opis i rade tastaturom; vidljiv fokus je obavezan.
- Glavni tekst 16px ili veći, line-height najmanje 1.6 i maksimalno 72ch.
- Na mobilnom nema horizontalnog skrola; kontakt blok je punom širinom.
- Nema animacije. Time se podrazumevano poštuje `prefers-reduced-motion`.

## Design pre-flight

- [x] Koriste se samo postojeći tokeni iz `DESIGN.md`.
- [x] Jedan akcenat, nulti radius, Lucide samo gde postoji potreba.
- [x] Nema zabranjenih fontova, gradijenata, kartica u karticama, izmišljenih podataka ili marketinških fraza.
- [x] Potpis stranice je postojeća bela crta i kolonska mreža.
- [x] Nema interaktivnih ili mrežnih stanja; mail link je čitljiv i bez mail klijenta.
- [x] Hijerarhija, fokus i mobilno slaganje su navedeni.
- [x] Ocena: distinctiveness 3, hierarchy 4, consistency 4, accessibility 4, state coverage 4, copy 4, restraint 4, motion 4. Ukupno 31/32.

## Build handoff

**Agent:** nextjs-senior-engineer.

**Design system:** bespoke, postojeći Next.js/Tailwind sistem. Ne dodavati biblioteku komponenti.

**Prihvatanje:** implementirati tačno ovu specifikaciju; ne redizajnirati postojeći header/footer. Dodati server-rendered stranicu i footer link, ažurirati poslovni kontakt u deljenoj konfiguraciji na `info@addvert.net`, proveriti `typecheck`, `lint` i `build`.
