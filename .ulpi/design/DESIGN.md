---
project: ADD VERT website
register: brand
aesthetic_direction: Swiss / grid
color_strategy: restrained
design_system: bespoke
design_variance: 3
motion_intensity: 1
visual_density: 5
---

## Design Read

Precizna, tamna radionica sa jasnim belim pravilima: poverenje se gradi čitljivošću i konkretnim podacima, a ne ukrasima.

## Signature

Tanka bela horizontalna crta ispod naslova i stroga kolonska mreža. To je vizuelni potpis postojećeg ADD VERT sajta i pretvara i pravni sadržaj u deo istog sistema.

## Color (locked)

| Role | OKLCH | Hex | Use |
| --- | --- | --- | --- |
| background | 0.145 0 0 | #0a0a0a | glavna pozadina |
| surface | 0.205 0 0 | #141414 | izdvojene celine kada je potrebno |
| text | 0.985 0 0 | #fafafa | naslovi i glavni tekst |
| muted | 0.708 0 0 | #a1a1aa | opisni tekst |
| border | 0.269 0 0 | #27272a | pravila i razdvajanja |
| accent | 0.985 0 0 | #fafafa | linkovi, fokus i primarni akcioni element |
| success | 0.696 0.17 162.48 | #22c55e | uspešno stanje |
| warning | 0.769 0.188 70.08 | #eab308 | upozorenje |
| danger | 0.577 0.245 27.325 | #dc2626 | greška |
| info | 0.488 0.243 264.376 | #2563eb | informativno stanje |

Kontrast teksta #fafafa na #0a0a0a je veći od 18:1. Prigušeni tekst se ne koristi ispod 14px i zadržava najmanje AA kontrast za njegovu namenu.

## Type (locked)

| Role | Family | Use | Notes |
| --- | --- | --- | --- |
| display | Inter, 700 | h1 i sekcijski naslovi | tesan tracking, bez dekorativnog fonta |
| body | Inter, 400/500 | pravni tekst | maksimalno 72ch |
| utility | Inter, 500 uppercase | nadnaslovi i meta podaci | letter spacing 0.14–0.2em |

## Scales (locked)

- Spacing: 4px ritam, koriste se samo 8, 12, 16, 24, 32, 48, 64, 80px.
- Radius: 0px. ADD VERT koristi oštre, radioničke ivice.
- Motion: 150/300/500ms, `cubic-bezier(0.16, 1, 0.3, 1)`; bez bounce efekata; poštovati `prefers-reduced-motion`.
- Icons: Lucide, stroke 1.5.

## Voice

Direktan, stručan i miran. Rečenice objašnjavaju šta se prikuplja, zašto i kako se osoba može odjaviti. Bez obećanja koja ne mogu da se provere.

Every screen must read as the same product if placed side by side.
