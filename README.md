# ADD VERT — addvert.net

Javni sajt za **ADD VERT** (vezionica i štamparija, Petrovac na Mlavi): mašinski vez, DTF štampa, galerija radova i personalizovani pokloni.

- **Produkcija:** [https://addvert.net](https://addvert.net)
- **Hosting:** Netlify (Next.js 16)
- **Repo:** privatni GitHub → Netlify continuous deploy

## Zahtevi

- Node.js **22** (vidi `.nvmrc`)
- [pnpm](https://pnpm.io/) 9+

## Lokalni razvoj

```bash
pnpm install
cp .env.example .env.local   # opciono; podrazumevani domen je addvert.net
pnpm dev
```

Sajt: [http://localhost:3000](http://localhost:3000)

## Skripte

| Komanda | Opis |
|---------|------|
| `pnpm dev` | Dev server |
| `pnpm build` | Produkcioni build |
| `pnpm start` | Serve posle build-a |
| `pnpm lint` | ESLint (`--max-warnings 0`) |
| `pnpm typecheck` | TypeScript provera |
| `pnpm gallery:build` | Obrada novih slika galerije + regeneracija `portfolio-data` |
| `pnpm og:generate` | Regeneracija `public/images/og-default.webp` (1200×630) |

## Deploy (Netlify)

1. Push na GitHub (preporuka: **privatni** repo).
2. Netlify → **Add new site** → Import from Git.
3. Build: `pnpm build` (već u `netlify.toml`), Node 22.
4. Env za production: `NEXT_PUBLIC_SITE_URL=https://addvert.net` (u `netlify.toml` za `production` context).
5. **Domain management:** dodati `addvert.net`, HTTPS, redirect `www` → apex (ili obrnuto).
6. Posle deploy-a: proveriti `https://addvert.net/robots.txt` i `https://addvert.net/sitemap.xml`.

Detaljniji checklist: `preostalo.md`.

## Struktura

| Putanja | Sadržaj |
|---------|---------|
| `app/` | Next.js rute |
| `components/` | UI sekcije |
| `lib/` | Podaci, SEO, konfiguracija (`site-config.ts`) |
| `public/images/galerija/` | Optimizovane WebP slike galerije |
| `scripts/` | Galerija i OG generator |

## Napomene

- Kontakt forma i shop poručivanje idu preko **WhatsApp-a** (nema backend checkout-a).
- Stranica `/shop`: proizvodi bez slike prikazuju labelu **Uskoro** dok ne stignu fotografije.
- `.env.local` se ne commituje; u repou je samo `.env.example`.

## Interni dokumenti

- `preostalo.md` — checklist do live sajta i Google indeksiranja
- `plan-za-poboljšanje.md` — istorija UX/UI plana
