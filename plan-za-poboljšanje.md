# Plan za neinvazivno poboljšanje UI/UX kvaliteta

> Radni dokument za završno zatezanje sajta pre push-a. Plan je namerno neinvazivan: ne menjamo vizuelni pravac, stack, arhitekturu ni brend ton, nego uklanjamo trenje, povećavamo poverenje i sređujemo produkcioni polish.

## 0. Status rada

- P0: završeno. Rešeni su mobile meni, scroll reveal fallback i mobile prisustvo music dugmeta.
- P1: završeno. Kontakt tok, pozicioniranje shop/pokloni sekcije i homepage proof copy su zategnuti.
- P2: završeno i verifikovano 2026-06-24. Ujednačen je ritam unutrašnjih strana, galerija je pripremljena kao dokaz kvaliteta, industrije sada ranije prikazuju konkretne artikle, shop placeholderi deluju namerno dok ne stignu slike, a mobile hero ima stabilniji kontrast.
- P3: završeno i verifikovano 2026-06-24. Urađena je CTA/mikrocopy doslednost i QA bez finalnih slika i videa.
- P4: sledeće. Finalne slike i video idu u posebnu asset fazu kada materijal bude spreman.

## 1. Šta želimo da postignemo

Želimo da sajt iz stanja "vizuelno dobar, ali ponegde spor i nedovoljno direktan" pređe u stanje "profesionalan, jasan, prodajno efikasan i spreman za javni link".

Primarni cilj:
- Potencijalni klijent u prvih 10-15 sekundi jasno razume da ADD VERT radi mašinski vez i DTF štampu, za koga radi, kakav kvalitet može da očekuje i koji je najbrži sledeći korak.

Sekundarni ciljevi:
- Zadržati postojeći premium/crni/swiss-industrial vizuelni pravac.
- Smanjiti prazne zone i preduge razmake bez rušenja atmosfere.
- Popraviti mobilni UX, kontakt tok i shop/katalog komunikaciju.
- Ukloniti ili ublažiti elemente koji deluju dekorativno, zbunjujuće ili neprodukcijski.
- Pripremiti jasna mesta za realne slike i video.

## 2. Faktori uspeha

Smatramo da je poboljšanje uspelo ako su ispunjeni sledeći uslovi:

- Hero na desktopu i mobilnom odmah komunicira: usluga, kvalitet, kontakt.
- Na mobilnom nema nevidljivih/semantički aktivnih navigacionih elemenata kada je meni zatvoren.
- Sadržaj ne ostaje nevidljiv zbog scroll animacija u screenshot alatima, reduced-motion režimima ili edge renderima.
- Kontakt strana prikazuje glavni CTA i direktne kanale ranije, bez osećaja traženja.
- Shop je jasno pozicioniran kao shop ili katalog, bez lažnog očekivanja checkout procesa.
- Floating elementi ne smetaju formama, karticama, galeriji i čitanju na mobilnom.
- Galerija posle ubacivanja slika deluje kao dokaz kvaliteta, ne kao dekorativni grid.
- Na svakoj glavnoj strani postoji jasan sledeći korak: kontakt, WhatsApp, galerija ili relevantna industrija.
- Lighthouse/automated QA nema očigledne accessibility regresije zbog menija, sakrivenog sadržaja ili kontrasta.
- Nema većeg redizajna: promene treba da budu male, proverljive i reverzibilne.

## 3. Šta ne radimo u ovoj fazi

- Ne menjamo globalni vizuelni identitet.
- Ne uvodimo novi CMS, bazu, checkout ili veći backend.
- Ne menjamo kompletnu strukturu stranica.
- Ne refaktorišemo shadcn/ui komponente osim ako direktno blokiraju UX fix.
- Ne uvodimo nove animacione biblioteke.
- Ne radimo "landing page" redizajn od nule.

## 4. Uloge i način rada

Plan ćemo raditi task-po-task. Za veće ili nezavisne zadatke možemo koristiti subagente:

- Senior UI designer subagent: procena vizuelne hijerarhije, spacinga, tipografije i polish-a.
- UX/conversion subagent: procena toka od prvog utiska do kontakta/upita.
- Accessibility/QA subagent: mobile meni, focus, reduced motion, kontrast, keyboard/screen reader rizici.
- Frontend implementation subagent: male izmene u komponentama uz minimalan rizik.
- Content/SEO subagent: mikrocopy za CTA, shop/katalog, galeriju, industrije i contact trust tekst.

Alati koje koristimo po potrebi:
- Playwright screenshotovi za desktop i mobile pre/posle.
- Browser snapshot za accessibility tree i mobile menu stanje.
- `pnpm lint` i `pnpm build` pre finalnog zaključka.
- Ručna vizuelna provera glavnih ruta: `/`, `/galerija`, `/industrije`, `/o-nama`, `/shop`, `/kontakt`.

## 5. Prioriteti

### P0 - Popraviti rizike pre bilo kakvog polish-a

#### 5.1 Mobile meni mora biti zaista zatvoren

Problem:
- Kada je mobilni meni vizuelno zatvoren preko `max-h-0`, linkovi i dalje postoje u accessibility tree-u.
- To može zbuniti screen reader, automated QA i potencijalno klik/focus ponašanje.

Fajlovi:
- `components/site-header.tsx`

Plan:
- Kada je `mobileOpen === false`, mobilna navigacija treba da bude semantički skrivena.
- Preferirano: conditional render menija samo kada je otvoren, ili `aria-hidden`, `inert` i `tabIndex` kontrola ako zadržavamo animaciju.
- Hamburger mora imati tačan `aria-expanded` i `aria-controls`.

Faktor uspeha:
- Browser accessibility snapshot ne prikazuje linkove iz mobilnog menija dok meni nije otvoren.
- Keyboard tab ne ulazi u skrivene linkove.
- Vizuelna animacija i dalje izgleda uredno.

#### 5.2 Scroll reveal ne sme sakrivati stvarni sadržaj u edge slučajevima

Problem:
- Full-page screenshot pokazuje velike prazne zone jer su sekcije inicijalno `opacity-0` dok ne uđu u viewport.
- To je rizik za QA, crawlerske renderere, preview alate i korisnike sa specifičnim podešavanjima.

Fajlovi:
- `hooks/use-scroll-reveal.ts`
- `components/scroll-reveal.tsx`

Plan:
- Dodati bezbedan fallback: ako `IntersectionObserver` nije dostupan, sadržaj odmah postaje vidljiv.
- Poštovati `prefers-reduced-motion`.
- Razmotriti kraći delay i manju translaciju za mobilni.
- Ne uklanjati animacije globalno, samo sprečiti "nevidljiv sadržaj" scenario.

Faktor uspeha:
- Full-page screenshot više ne izgleda kao skoro prazna crna stranica.
- Reduced-motion korisnici vide sadržaj odmah.
- Animacije ostaju suptilne za standardne korisnike.

#### 5.3 Floating music dugme preispitati za produkciju

Problem:
- Globalno dugme za muziku deluje kao distrakcija na B2B sajtu.
- Na mobilnom zauzima pažnju pored CTA-a, shop kartica i kontakt forme.

Fajlovi:
- `components/site-music.tsx`
- `app/layout.tsx` ako je komponenta tu uključena

Plan:
- Preporuka: ukloniti iz produkcionog UI-a ili sakriti iza diskretnog developer/brand flag-a.
- Ako ostaje, prikazivati samo na desktopu ili ga pomeriti da ne konkuriše kontaktu i scroll-to-top dugmetu.

Faktor uspeha:
- Na mobilnom nema floating elemenata koji ulaze u sadržaj forme/kartica.
- Primarni CTA-ovi imaju vizuelni prioritet nad dekorativnim kontrolama.

### P1 - Pojačati konverziju bez redizajna

#### 5.4 Kontakt strana mora brže da dovede do upita

Problem:
- Forma na desktopu počinje prenisko, a submit često pada ispod prvog viewporta.
- Klijent na kontakt strani treba odmah da vidi akciju: WhatsApp, telefon ili formu.

Fajlovi:
- `app/kontakt/page.tsx`
- `components/contact-section.tsx`
- `components/page-hero.tsx` ako je potrebno smanjiti vertikalni razmak samo za kontakt

Plan:
- Smanjiti vertikalni padding između page hero-a i forme.
- Kontakt page može koristiti kompaktniji hero ili direktno uvodni blok iznad forme.
- Direktne kanale kontaktiranja postaviti vizuelno bliže vrhu.
- Formu zadržati jasnom, ali smanjiti nepotrebnu visinu gde ne šteti čitljivosti.

Faktor uspeha:
- Na desktop viewportu oko 1440x1000 vidi se veći deo forme i jasni kontakt CTA-ovi.
- Na mobile-u korisnik brzo dolazi do prvog inputa i WhatsApp opcije.

#### 5.5 Shop preimenovati ili precizno objasniti

Problem:
- "Online shop" sugeriše checkout/e-commerce.
- Trenutni tok je poručivanje preko WhatsApp-a ili poziva.

Fajlovi:
- `app/shop/page.tsx`
- `components/shop-catalog.tsx`
- `lib/shop-data.ts`

Plan:
- Odabrati jedan pravac:
  - Ako nema checkouta: "Katalog proizvoda" ili "Proizvodi po narudžbi".
  - Ako ostaje "shop": odmah napisati "Poručivanje ide preko WhatsApp-a".
- Na kartice dodati korisne komercijalne podatke ako postoje: cena od, rok, personalizacija, minimalna količina, dostupnost.
- Ako podaci ne postoje, koristiti "Cena po upitu" i "Rok po dogovoru" samo ako je to poslovno tačno.

Faktor uspeha:
- Korisnik ne očekuje korpu/checkout.
- Svaka kartica jasno kaže šta je sledeći korak.
- Shop/katalog deluje kao prodajni alat, ne samo lista proizvoda.

#### 5.6 Homepage treba ranije da pokaže dokaz kvaliteta

Problem:
- Hero je jak, ali posle njega ima dosta ritmičkog uvoda pre pravih dokaza.
- Klijent želi brzo da vidi kvalitet rada i relevantnost za svoju industriju.

Fajlovi:
- `app/page.tsx`
- `components/stats-strip.tsx`
- `components/services-section.tsx`
- `components/home-gallery-teaser.tsx`
- `components/home-industries-teaser.tsx`

Plan:
- Zadržati hero, ali odmah posle njega proveriti redosled: stats + usluge + galerija treba da vode ka dokazima.
- U sekcijama smanjiti ponavljajući copy i ostaviti konkretnije tvrdnje.
- Kada slike budu spremne, galerija mora postati jači dokaz, sa realnim close-up radovima.

Faktor uspeha:
- Posle prvog skrola korisnik vidi ili usluge ili konkretne primere, ne samo atmosferu.
- CTA ka galeriji/kontaktu je lako uočljiv.

### P2 - Vizuelni polish i sadržaj

#### 5.7 Ujednačiti vertikalni ritam na unutrašnjim stranama

Problem:
- Strane imaju ozbiljan ton, ali neke počinju presporo zbog velikih praznih blokova.

Fajlovi:
- `components/page-hero.tsx`
- `app/galerija/page.tsx`
- `app/industrije/page.tsx`
- `app/o-nama/page.tsx`
- `app/kontakt/page.tsx`
- `app/shop/page.tsx`

Plan:
- Zadržati prostranost, ali smanjiti razmake tamo gde prvi korisni sadržaj dolazi kasno.
- Ako je potrebno, dodati varijantu `PageHero` veličine: `default` i `compact`.
- Kompaktni hero koristiti na kontakt/shop stranicama, a veći ostaviti gde ima smisla.

Faktor uspeha:
- Nema utiska "prazne crne strane" između hero-a i sadržaja.
- Stranice i dalje izgledaju premium, ne zbijeno.

#### 5.8 Galeriju pripremiti kao glavni dokaz kvaliteta

Problem:
- Struktura galerije je dobra, ali bez pravih fotografija ne može nositi prodaju.

Fajlovi:
- `app/galerija/page.tsx`
- `components/portfolio-section.tsx`
- `components/home-gallery-teaser.tsx`
- `lib/portfolio-data.ts`
- `public/images/*`

Plan:
- Uvesti realne slike radova: close-up konca, tekstura, gotovih uniformi, peškira, kačketa, DTF otisaka.
- Izbegavati slike koje deluju generički, AI ili previše stock.
- Svaka slika treba da ima poslovni kontekst: šta je rađeno, za koga/koji tip klijenta, tehnika.
- Filteri treba da ostanu jednostavni: Mašinski vez, DTF štampa, Ostalo.

Faktor uspeha:
- Galerija u prvom ekranu odmah daje osećaj stvarnog rada.
- Klijent može da kaže: "ovo je slično onome što meni treba".

#### 5.9 Industrije pojačati kao putanju prepoznavanja

Problem:
- Industrije su dobra ideja, ali mogu biti konkretnije.

Fajlovi:
- `app/industrije/page.tsx`
- `components/industries-section.tsx`
- `components/home-industries-teaser.tsx`
- `lib/industries-data.ts`

Plan:
- Za svaku industriju dodati konkretnije primere proizvoda.
- Povezati industrije sa galerijom ili kontakt upitom kada je relevantno.
- Zadržati kratke tekstove; ne pretvarati u SEO zid.

Faktor uspeha:
- Hotel, restoran, klub ili firma brzo vidi relevantan primer.
- Svaka industrija vodi ka akciji.

#### 5.10 Hero fine tuning

Problem:
- Mobile hero je jak, ali deo teksta preko fotografije je na granici čitljivosti.
- Logotipi/labeli pri dnu hero-a mogu delovati kao dekorativni šum.

Fajlovi:
- `components/hero-section.tsx`

Plan:
- Pojačati overlay samo koliko je potrebno za čitljivost.
- Preispitati `mix-blend-difference`; ako čitljivost varira po slici, koristiti stabilniji kontrastni overlay.
- Dno hero-a sa RICOMA/Brother/Madeira tretirati kao dokaz samo ako je poslovno relevantno i vizuelno dovoljno čitljivo. U suprotnom ga skloniti ili prebaciti u "kapaciteti/materijali" sekciju.

Faktor uspeha:
- H1, opis i kontakt linkovi su čitljivi na 390px širine bez naprezanja.
- Donji elementi ne odvlače pažnju od glavnog CTA-a.

### P3 - Mikrocopy i produkcioni QA bez finalnih asseta

#### 5.11 Mikrocopy i CTA doslednost

Problem:
- Pojavljuju se različite formulacije: zatražite ponudu, kontaktirajte nas, pošaljite upit, naruči preko WhatsApp-a.

Fajlovi:
- `lib/site-config.ts`
- `components/hero-section.tsx`
- `components/mid-cta-section.tsx`
- `components/contact-section.tsx`
- `components/shop-catalog.tsx`

Plan:
- Definisati 2-3 primarna CTA obrasca:
  - "Zatražite ponudu" za B2B upite.
  - "Pošaljite upit" za formu.
  - "Poruči preko WhatsApp-a" za personalizovane poklone.
- Ne uvoditi nove varijante bez razloga.

Faktor uspeha:
- Korisnik razume razliku između ponude, forme i WhatsApp narudžbine.
- CTA tekstovi su dosledni kroz sajt.

#### 5.12 Završni QA bez finalnih asseta

Rute:
- `/`
- `/galerija`
- `/industrije`
- `/o-nama`
- `/shop`
- `/kontakt`

Viewportovi:
- Desktop: 1440x1000
- Laptop: 1280x800
- Mobile: 390x844
- Narrow mobile: 360x780

Provere:
- Nema horizontalnog scroll-a.
- Nema preklapanja floating dugmadi sa formama/karticama.
- Meni se otvara/zatvara vizuelno i semantički ispravno.
- CTA dugmad su klikabilna i vode na očekivane lokacije.
- Telefoni, email i WhatsApp linkovi rade.
- Sadržaj ostaje vidljiv u reduced-motion režimu.
- `pnpm lint` je pokrenut; trenutno pada zbog nedostajuće ESLint konfiguracije, što je postojeći baseline problem.
- `pnpm build` prolazi.

Faktor uspeha:
- Glavne rute su čitljive i funkcionalne na desktopu i mobilnom i bez finalnih asseta.
- Nema očiglednih produkcionih blokera osim svesno odložene asset faze.

### P4 - Finalne slike i video

#### 5.13 Video sekcija mora imati svrhu

Problem:
- Video je najavljen kao deo finala. Ne sme biti samo dekoracija.

Fajlovi:
- `components/video-section.tsx`
- `public/videos/*` ili eksterni izvor ako se koristi

Plan:
- Video treba da pokaže proces: mašina, konac, detalj veza, gotov proizvod.
- Prvi frame/poster mora biti lep i informativan.
- Video mora biti tih po defaultu, bez agresivnog autoplay zvuka.
- Dodati fallback poster/sliku ako video ne učita.

Faktor uspeha:
- Video povećava poverenje u proizvodni proces.
- Ne usporava perceptivno učitavanje i ne smeta CTA-ovima.

#### 5.14 Finalne slike moraju zameniti placeholder osećaj

Problem:
- Realne slike radova i proizvoda još nisu ubačene jer se materijal obrađuje.

Fajlovi:
- `lib/portfolio-data.ts`
- `lib/shop-data.ts`
- `public/images/*`
- `public/shop/*`

Plan:
- Uvesti realne slike radova i proizvoda kada budu spremne.
- Proveriti `alt` tekstove posle zamene asseta.
- Izbaciti slike koje deluju generički, AI ili previše stock.

Faktor uspeha:
- Galerija i pokloni deluju kao stvaran dokaz rada, ne kao placeholder.

## 6. Predloženi redosled rada

1. Popraviti mobile meni.
2. Popraviti scroll reveal fallback.
3. Doneti odluku o music dugmetu i floating kontrolama.
4. Zategnuti kontakt stranu.
5. Razjasniti shop/katalog pozicioniranje.
6. Smanjiti spore/prazne zone na unutrašnjim stranama.
7. Pojačati homepage dokazima i galerijom.
8. Proći mikrocopy/CTA doslednost.
9. Uraditi završni desktop/mobile QA bez finalnih asseta.
10. Ubaciti realne slike i video u P4.
11. Ponoviti asset QA.
12. Tek onda push na GitHub.

## 7. Definicija "done"

Plan je sproveden kada:

- P0 i P1 stavke su rešene ili svesno odložene uz razlog.
- Sve glavne rute su pregledane na desktopu i mobilnom.
- Nema poznatih accessibility problema sa skrivenim menijem ili nevidljivim sadržajem.
- Kontakt i shop/katalog imaju jasne sledeće korake.
- Slike/video su integrisani bez narušavanja performansi i čitljivosti, ili su eksplicitno odloženi u P4.
- `pnpm lint` i `pnpm build` su pokrenuti i prolaze.
- Finalni vizuelni review potvrđuje da sajt i dalje izgleda kao ADD VERT, samo jasnije, korisnije i spremnije za klijente.
