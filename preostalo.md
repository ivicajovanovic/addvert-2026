# Preostali koraci do live sajta i Google rangiranja

> Cilj ovog dokumenta je da jasno definiše šta još treba uraditi od trenutnog stanja sajta do trenutka kada je sajt javno dostupan, indeksiran i spreman da vremenom dobija što bolji organski i lokalni Google rang.

## 0. Trenutni status

- UI/UX faze P0-P3 su urađene.
- P4 je odložen za finalne slike i video jer se materijal još obrađuje.
- Projekat već ima osnovne SEO elemente:
  - `app/sitemap.ts`
  - `app/robots.ts`
  - canonical URL metadata kroz `lib/metadata.ts`
  - Open Graph metadata
  - `LocalBusiness` JSON-LD kroz `lib/structured-data.ts`
- `pnpm build` prolazi.
- `pnpm lint` prolazi (`eslint.config.mjs`, Next 16 flat config; `components/ui/**` ignorišu se).

## 1. Šta znači "spremno za live"

Sajt je spreman za live kada:

- Sve glavne javne rute rade na produkcionom domenu:
  - `/`
  - `/galerija`
  - `/industrije`
  - `/o-nama`
  - `/shop`
  - `/kontakt`
- Produkcioni domen je konačan i usklađen sa `NEXT_PUBLIC_SITE_URL`.
- HTTPS radi bez upozorenja.
- `robots.txt` dozvoljava javne strane i blokira samo ono što ne treba da se indeksira.
- `sitemap.xml` prikazuje sve javne strane sa tačnim produkcionim URL-ovima.
- Stranice imaju jasne title/description/canonical vrednosti.
- Kontakt podaci su isti na sajtu, Google Business Profile-u i društvenim mrežama.
- Search Console je podešen i sitemap je submitovan.
- Google može da crawl-uje i indeksira stranice.

## 2. P4 - finalne slike i video

Ovo je sledeća kreativna/asset faza.

### 2.1 Slike radova

- Zameniti generičke ili privremene slike realnim fotografijama radova.
- Prioritet slika:
  - close-up mašinskog veza
  - peškiri, platna, posteljina i uniforme
  - DTF štampa na majicama i promo tekstilu
  - radovi za hotele, restorane, klubove i firme
  - personalizovani pokloni za fizička lica
- Svaka slika treba da ima smislen `alt`, bez keyword stuffing-a.
- Nazivi fajlova treba da budu čitljivi, npr. `vez-logo-peskir-hotel.webp`, ne `IMG_4321.jpg`.
- Kompresovati slike pre deploy-a.
- Proveriti da slike ne ruše mobile layout i ne prave layout shift.

### 2.2 Video

- ~~Ukloniti placeholder/demo video~~ — urađeno (`public/video/vez-u-pokretu.mp4`, ~3 MB, 720p).
- Poster: `public/video/vez-u-pokretu-poster.webp` (frame iz videa).
- Zvuk je isključen po defaultu (`muted`); korisnik može uključiti kontrolom.
- `preload="metadata"` — ne blokira prvi prikaz stranice.

### 2.3 OG i share slika

- Proveriti `public/images/og-default.webp`.
- Ako nije finalna, napraviti bolju social preview sliku:
  - logo/ime ADD VERT
  - realan detalj veza ili štampe
  - bez previše teksta
  - format 1200x630

## 3. Tehnički QA pre deploy-a

### 3.1 Build i provere

Pokrenuti:

```bash
pnpm build
```

Očekivano:
- build prolazi bez error-a
- javne rute se generišu ili renderuju očekivano

Pokrenuti:

```bash
pnpm lint
```

Očekivano: prolaz bez grešaka i upozorenja (`--max-warnings 0`).

Preporučeno dodati i proveriti TypeScript:

```bash
pnpm exec tsc --noEmit
```

### 3.2 Browser QA

Rute:
- `/`
- `/galerija`
- `/industrije`
- `/o-nama`
- `/shop`
- `/kontakt`

Viewportovi:
- 1440x1000
- 1280x800
- 390x844
- 360x780

Proveriti:
- nema horizontalnog scroll-a
- meni se pravilno otvara i zatvara
- CTA linkovi vode gde treba
- telefonski linkovi koriste `tel:`
- WhatsApp linkovi rade
- email link radi
- mapa se učitava ili ima prihvatljiv fallback
- forma pravi očekivanu WhatsApp poruku
- nema placeholder videa/slika koje deluju neprodukcijski

### 3.3 Admin i API površina

- ~~Demo `/admin`, checkout/orders API i `lib/security.ts`~~ — uklonjeno (shop ide preko WhatsApp-a).

## 4. Deploy i domen

### 4.1 Hosting

**Netlify** (odabrano) — Next.js 16 sa OpenNext adapterom, bez dodatne konfiguracije osim `netlify.toml`.

- Povezati Git repo u Netlify dashboard.
- Build command: `pnpm build` (već u `netlify.toml`).
- Node 22 (`.nvmrc` + `netlify.toml`).
- Dodati custom domain **addvert.net** u Netlify → Domain management.
- Primary domain: `https://addvert.net` (www redirektovati na apex ili obrnuto — jedna kanonska verzija).

### 4.2 Environment

Na Netlify (Site configuration → Environment variables) i lokalno u `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://addvert.net
```

U `netlify.toml` je već podešeno za `production` context. Za deploy preview po potrebi dodati override.

Kanonska verzija:

- `https://addvert.net`
- ili `https://www.addvert.net`

Ne koristiti obe kao ravnopravne. Drugu verziju redirektovati 301 u Netlify Domain settings.

### 4.3 DNS i HTTPS

- Podesiti DNS zapise prema hostingu.
- Sačekati propagaciju.
- Proveriti HTTPS sertifikat.
- Proveriti redirect:
  - `http -> https`
  - `www -> non-www` ili obrnuto
- Proveriti da canonical metadata koristi isti domen kao produkcija.

## 5. Google indeksiranje

Google ne garantuje crawling, indexing ili ranking, ali možemo ukloniti prepreke i poslati jasne signale.

### 5.1 Search Console

- Otvoriti Google Search Console.
- Dodati Domain property za domen.
- Verifikovati vlasništvo preko DNS TXT zapisa.
- Submitovati sitemap:

```text
https://addvert.net/sitemap.xml
```

- Proveriti Page Indexing izveštaj.
- Koristiti URL Inspection za glavne rute:
  - homepage
  - `/kontakt`
  - `/galerija`
  - `/industrije`
  - `/shop`

### 5.2 Robots i sitemap

Proveriti u browseru:

```text
https://addvert.net/robots.txt
https://addvert.net/sitemap.xml
```

Očekivano:
- `robots.txt` ne blokira javne stranice.
- `sitemap.xml` koristi produkcioni domen.
- nema staging, localhost ili preview URL-ova.

### 5.3 Indexability minimum

Svaka javna strana mora:
- vraćati HTTP 200
- imati tekstualni sadržaj koji Google može da pročita
- ne biti blokirana robots pravilima
- ne imati `noindex`
- imati canonical ka sebi ili pravilnoj kanonskoj strani

## 6. Lokalni SEO

Za ADD VERT je lokalni SEO važan jer postoji fizička lokacija i usluga u Srbiji.

### 6.1 Google Business Profile

- Claim/verify Google Business Profile.
- Podaci moraju biti isti kao na sajtu:
  - naziv firme
  - adresa
  - telefon
  - radno vreme
  - kategorije
  - website URL
- Dodati fotografije lokacije, mašina, radova i gotovih proizvoda.
- Redovno odgovarati na recenzije.
- Ne dodavati ključne reči u naziv firme ako nisu deo stvarnog naziva.

### 6.2 NAP doslednost

NAP = name, address, phone.

Proveriti da su isti podaci svuda:
- sajt
- Google Business Profile
- Facebook
- Instagram
- domaći poslovni direktorijumi ako se koriste

Nedosledni podaci slabe lokalno poverenje.

## 7. SEO sadržaj posle live-a

Prvi live ne treba preopteretiti SEO tekstom. Bolje je imati jasne, korisne i tačne strane.

Nakon live-a dodavati sadržaj postepeno:

- posebna landing strana za hotele i apartmane
- posebna landing strana za restorane i kafiće
- posebna landing strana za sportske klubove
- posebna landing strana za personalizovane poklone za krštenja i venčanja
- galerijski case entries: šta je rađeno, tehnika, materijal, rezultat
- FAQ proširenja zasnovana na realnim pitanjima klijenata

Svaka nova strana mora imati:
- jednu jasnu temu
- stvaran poslovni sadržaj
- relevantne slike
- jasan CTA
- internu vezu ka kontaktu ili galeriji

## 8. Linkovi i poverenje

Za bolje rangiranje vremenom treba graditi realne signale, ne spam linkove.

Prioritet:
- link sa Google Business Profile-a ka sajtu
- linkovi sa Facebook/Instagram profila
- linkovi od stvarnih partnera ili klijenata kada je prirodno
- lokalni direktorijumi sa tačnim NAP podacima
- objave o realnim projektima i radovima

Ne raditi:
- kupovinu spam backlinkova
- automatski generisan SEO tekst bez vrednosti
- sakriveni tekst i keyword stuffing
- lažne recenzije
- doorway strane za svaku varijaciju ključne reči

## 9. Monitoring posle live-a

Prvih 30 dana:

- proveriti Search Console 2-3 puta nedeljno
- pratiti da li su stranice indeksirane
- pratiti crawl/indexing greške
- proveriti Core Web Vitals kada podaci postanu dostupni
- proveriti upite koji donose impressions
- proveriti da li Google prikazuje dobar title/description

Prvih 90 dana:

- dopuniti sadržaj na osnovu realnih Search Console upita
- dodati case/galleries na osnovu realnih radova
- tražiti recenzije od zadovoljnih klijenata
- proveriti lokalne pozicije za relevantne upite:
  - mašinski vez Srbija
  - mašinski vez Petrovac na Mlavi
  - vez na peškirima
  - vez za hotele
  - DTF štampa na tekstilu
  - personalizovani pokloni sa vezom

## 10. Finalni redosled rada

1. Završiti P4 slike i video.
2. Zameniti sve placeholder/generičke assete.
3. Proveriti alt tekstove i image performanse.
4. ~~Rešiti ESLint config~~ — urađeno.
5. Pokrenuti `pnpm build`.
6. Pokrenuti browser QA na svim glavnim rutama.
7. ~~Proveriti `/admin`~~ — uklonjeno.
8. Podesiti produkcioni env `NEXT_PUBLIC_SITE_URL`.
9. Deploy na hosting.
10. Podesiti domen, HTTPS i redirecte.
11. Proveriti `robots.txt` i `sitemap.xml` na produkciji.
12. Podesiti Google Search Console.
13. Submitovati sitemap.
14. Request indexing za ključne URL-ove.
15. Verifikovati ili ažurirati Google Business Profile.
16. Proveriti NAP doslednost na svim javnim profilima.
17. Pratiti Search Console i Business Profile signale prvih 30-90 dana.

## 11. Definicija uspeha

Sajt je uspešno lansiran kada:

- produkcioni domen radi preko HTTPS-a
- sve javne rute rade bez očiglednih UI/UX bugova
- Google Search Console vidi sitemap
- ključne strane su crawlable i indexable
- Google Business Profile vodi ka istom domenu
- kontakt podaci su dosledni
- nema placeholder asseta koji ruše poverenje
- postoji plan za post-live sadržaj i praćenje Search Console upita

Rangiranje se ne dešava trenutno. Realan cilj je da Google prvo pouzdano crawl-uje i indeksira sajt, zatim da kroz korisne stranice, lokalne signale, recenzije, stvarne slike i relevantne upite vremenom poboljšava pozicije.

## 12. Korisni zvanični izvori

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google technical requirements: https://developers.google.com/search/docs/essentials/technical
- Google Search structured data intro: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google sitemap documentation: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google mobile-first indexing: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- Google helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Business Profile local ranking tips: https://support.google.com/business/answer/7091
- Google Business Profile guidelines: https://support.google.com/business/answer/3038177
