# Newsletter prijava i DOI tok: specifikacija

This feature binds to `.ulpi/design/DESIGN.md`. Every screen must read as the same product if placed side by side.

## Cilj i izbor arhitekture

Posetilac ostavlja samo email adresu, izričito pristaje na poruke i zatim potvrđuje adresu iz primljenog emaila. Formu crtamo kao nativni ADD VERT interfejs; Brevo API obavlja samo Double Opt-In. Ne ugrađujemo Brevo iframe niti generičku formu.

Brevo lista je `ADD VERT - vodič i novosti` (trenutni ID: `3`). Sajt nikada ne izlaže API ključ. API poziv ide samo kroz Next.js route handler.

## Lokacije

1. Početna strana, posle `CommonRequestsSection`: puna newsletter sekcija sa jasnim razlogom za prijavu.
2. Kontakt stranica, posle kontakt sekcije i pre FAQ: kompaktna ponovljena sekcija bez novog teksta koji menja ponudu.
3. Potvrdna stranica `/vodic-spreman`: nakon klika na DOI link, korisnik vidi uspeh i direktno preuzima PDF.

Nema iskačućeg prozora niti agresivnog prekida čitanja.

## Vizuelni pravac

**Swiss / grid**, u skladu sa `DESIGN.md`:

- Sekcija: tanko gornje i donje pravilo, pozadina `background`, dva asimetrična stupca na desktopu; forma stoji desno.
- Levo: utility nadnaslov `BESPLATAN VODIČ`, naslov `Kako da vaša firma izgleda ozbiljnije`, opis i tri konkretne stavke: šta prvo brendirati, kada izabrati vez, kada DTF štampu.
- Desno: bela email kontrola na tamnoj pozadini, oštre ivice, bela primarna akcija `Pošaljite mi vodič`.
- Bez kartica-u-kartici, gradijenata, ilustracija ili izmišljenih brojki.
- Mobilno: sadržaj i forma se slažu, dugme je punom širinom, ciljna površina najmanje 44px.

## Form contract

Polja i vidljivi tekst moraju biti tačni:

- `email`, type email, required, label `Poslovni email`.
- Neoznačen checkbox, required, tačan tekst: `Saglasan sam da primam email poruke od ADD VERT-a.`
- Ispod forme: `Prijavom pristajete da vam ADD VERT šalje vodič, korisne savete i povremene ponude. Odjava je moguća u svakom trenutku. Pogledajte Politiku privatnosti.` Poslednja rečenica je link na `/politika-privatnosti`.
- Ne tražiti ime, telefon, firmu ni bilo koji dodatni podatak.
- Skriveno honeypot polje (`company`) ne sme biti vidljivo korisnicima ni čitačima ekrana.

### Stanja

| Stanje | Ponašanje |
| --- | --- |
| početno | prazno polje, checkbox neoznačen, dugme aktivno; HTML validacija sprečava pogrešan submit |
| slanje | dugme kaže `Šaljemo potvrdu…`, blokirano je od duplog klika |
| uspeh | forma se menja u poruku: `Proverite email i kliknite na link za potvrdu. Vodič će vas čekati odmah nakon toga.` |
| greška | poruka bez tehničkih detalja: `Nismo uspeli da pošaljemo potvrdu. Pokušajte ponovo ili nam pišite na info@addvert.net.` |
| honeypot | vraća isti odgovor kao uspeh, bez Brevo poziva |

Status se objavljuje kroz `aria-live="polite"`. Ne oslanjati se samo na boju.

## DOI tok

```
[Email + checkbox] --> POST /api/newsletter
       |                    |
       |                    +--> Brevo DOI API (server-side)
       |                              |
       |                     [confirmation email]
       v                              |
["Proverite email"] <----------------+
                                      |
                                      v
                           [klik na {{ params.DOIurl }}]
                                      |
                                      v
                       /vodic-spreman --> javni PDF link
```

`POST /api/newsletter`:

- Prihvata JSON `{ email, consent, company? }`.
- Validira email i `consent === true`; za neispravne zahteve vraća 400 bez poziva Brevo-u.
- Ako je honeypot popunjen, vraća uspešan generički odgovor bez slanja.
- Čita samo server varijable: `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`.
- Poziva `https://api.brevo.com/v3/contacts/doubleOptinConfirmation` sa emailom, listom, DOI template ID i `redirectionUrl: ${SITE_URL}/vodic-spreman`.
- Nikad ne upisuje ključ, email adrese ili odgovor Brevo-a u klijentski bundle ili javne logove.
- Ako konfiguracija nedostaje ili Brevo ne uspe, vrati bezbednu poruku 500.

`/vodic-spreman` treba da sadrži naslov `Email je potvrđen`, kratku poruku, primarno dugme ka `/downloads/add-vert-vodic-za-brendiranje-firme.pdf` (atribut `download`) i sekundarni link ka `/kontakt`.

## Komponente i performanse

- `NewsletterSignup` je mala client komponenta samo zbog slanja i statusa.
- Vizuelna `NewsletterSection` može biti server komponenta koja uvozi formu.
- Ne dodavati Brevo SDK ni treće biblioteke; server koristi ugrađeni `fetch`.
- Importovati Lucide ikone direktno i samo ako donose značenje.
- Ne uvoditi čekanje, polling, analitiku ili dodatne mrežne pozive.

## Pristupačnost

- Svako polje ima `label`; checkbox je moguće označiti tastaturom.
- Vidljiv `focus-visible` outline, kontrast AA, poruka greške i uspeha čitljiva bez boje.
- H1 samo na potvrdnoj stranici; newsletter sekcije koriste h2.
- Link politike privatnosti i download link imaju jasne tekstove.

## Pre-flight

- [x] Jedan akcenat, nulti radius, postojeće boje i Inter.
- [x] Nema generičkih tri-kartica, popupa, gradijenta, em dash-a ni izmišljenih društvenih dokaza.
- [x] Pokriveni su početno, validaciono, slanje, uspeh, greška i bot stanja.
- [x] Tok radi bez API ključa u klijentu, na mobilnom i tastaturom.
- [x] Ocena: distinctiveness 3, hierarchy 4, consistency 4, accessibility 4, state coverage 4, copy 4, restraint 4, motion 4. Ukupno 31/32.

## Build handoff

**Agent:** nextjs-senior-engineer.

**Design system:** bespoke postojeći Next.js/Tailwind. Ne menjati postojeći header, footer, Google Analytics consent ili pravni tekst osim dodavanja propisanog newsletter linka.

**Prihvatanje:** implementirati tačno specifikaciju, sa API ključem isključivo server-side. Ne unositi stvarne tajne u fajlove. Postaviti liste/template kao environment promenljive, a ne kao javne prefikse. Dodati početnu i kontakt lokaciju, potvrdnu stranicu i API route. Proveriti typecheck, lint i production build.
