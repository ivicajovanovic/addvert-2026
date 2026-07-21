# Saglasnost za analitičke kolačiće: specifikacija

This screen binds to `.ulpi/design/DESIGN.md`. Every screen must read as the same product if placed side by side.

## Cilj

Google Analytics ne sme da se učita niti da postavi analitičke kolačiće pre jasnog izbora posetioca. Izbor mora biti podjednako lak: prihvatiti ili odbiti. Posetilac može kasnije ponovo otvoriti podešavanja iz footera.

## Kompozicija i copy

- Fiksirani panel pri dnu ekrana, iznad sadržaja, sa oštrom ivicom, tamnom površinom `#141414`, tankim pravilom `#27272a` i bez senki/gradijenata.
- Naslov: `Kolačići i analitika`.
- Tekst: `Koristimo analitiku da razumemo kako se sajt koristi. Ona se aktivira samo ako je prihvatite. Više informacija je u Politici privatnosti.` Link vodi na `/politika-privatnosti`.
- Jedina dva izbora u istom vizuelnom rangu: `Odbijam` (obična outline kontrola) i `Prihvatam analitiku` (bela primarna kontrola). Ne koristiti unapred označenu opciju, odbrojavanje, zatvaranje bez izbora, niti nejasan tekst.
- Footer sadrži `Podešavanja kolačića`; klik ponovo prikazuje isti panel sa postojećim izborom, bez promene dok korisnik ne izabere novu opciju.

## Flow

```
[Prva poseta]
      |
      v
[Nema sačuvanog izbora] --> [Panel]
      |                         |             |
      |                         v             v
      |                   [Odbijam]      [Prihvatam]
      |                         |             |
      v                         v             v
[Nema GA skripte]       [Sačuvaj denied] [Sačuvaj granted + učitaj GA]

[Footer: Podešavanja kolačića] --> [Panel] --> [novi izbor po želji]
```

### Stanja

| Stanje | Panel | Google Analytics |
| --- | --- | --- |
| neodlučeno | vidljiv | ne učitava se |
| odbijeno | skriven | ne učitava se |
| prihvaćeno | skriven | učitava se |
| ponovo otvoreno | vidljiv | zadržava postojeće stanje dok se ne izabere nova opcija |

Ako je `localStorage` nedostupan, izbor važi samo za trenutni prikaz: analitika se i dalje ne učitava dok korisnik ne prihvati.

## Komponente i ugovor

### `CookieConsent`

- Client komponenta, npr. `components/cookie-consent.tsx`.
- Čuva isključivo vrednosti `granted` ili `denied` pod ključem `addvert-cookie-consent` u `localStorage`.
- Na učitavanju prvo proverava izbor; nema podrazumevanog pristanka.
- Dugmad imaju najmanje 44px visine, smislen fokus i tastaturu Enter/Space.
- Panel ima `role="region"` i `aria-label="Podešavanja kolačića"`; nije modal i ne blokira čitanje sajta.

### `GoogleAnalytics`

- Učitava `gtag.js` isključivo kada je stanje `granted`.
- Ne sme da emituje mrežni zahtev ka Google-u kada je stanje `unknown` ili `denied`.
- Ne uvoditi novu analitiku, server-side signal ili fingerprinting.

### `CookiePreferencesButton`

- Mala client komponenta u footeru koja emituje lokalni događaj da se panel ponovo prikaže.
- Ako JavaScript nije dostupan, nema lažne kontrole: korisnik i dalje može pročitati politiku privatnosti, a analitika se ne učitava.

## Pristupačnost i odziv

- Mobile: panel puni širinu sadržaja sa 16px marginama; dugmad se slažu vertikalno.
- Desktop: tekst levo, akcije desno; panel ostaje u čitljivoj širini kontejnera.
- Vidljiv fokus koristi `outline-ring`; kontrast teksta i dugmadi prolazi AA.
- Bez animacije ili samo opacity prelaz do 150ms uz `prefers-reduced-motion: reduce`.

## Build handoff

**Agent:** nextjs-senior-engineer.

**Design system:** bespoke postojeći Next.js/Tailwind sistem. Ne dodavati biblioteku za consent ni kolačiće.

**Prihvatanje:** implementirati tačno ovaj model. Na prvoj poseti ne sme postojati Google Analytics zahtev. Posle prihvatanja se Analytics učitava. Posle odbijanja ne učitava se, ni posle osvežavanja. Footer može otvoriti podešavanja. Proveriti typecheck, lint i build.
