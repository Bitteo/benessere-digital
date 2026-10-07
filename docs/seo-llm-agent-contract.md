# benessere.digital — SEO / LLM Agent Contract

Adattato dal contratto CineQuill (`docs/agent-guides/i18n-seo-agent-contract.md` + `docs/seo-e-contenuti-ai.md`), semplificato per un sito **solo italiano**, Next.js App Router, contenuti file-based.

Entrypoint agent (scope IT-only + gate publish/merge/deploy): [`docs/AGENTS.md`](./AGENTS.md).

## Principi

1. **Canonical host**: `https://www.benessere.digital` (apex `benessere.digital` fa già **301** → www). Sitemap, robots, canonical, OG e `llms.txt` usano solo www.
2. **JSON-LD = contenuto visibile** (o equivalente `sr-only`). Niente schema che descrive copy assente.
3. **Un solo `<h1>` per pagina**.
4. **Sitemap** solo URL indexabili: home, pagine statiche pubbliche, articoli `status: "published"` con `publishedAt` già trascorso e senza `seo.noIndex`, categorie usate da quegli articoli, autori in catalog. **Mai** draft, articoli con data futura, `noIndex`, API, 404.
5. **Evidence-based**: niente claim medici inventati; citazioni solo se verificabili.
6. **LLM discovery**: `llms.txt` è generato da `src/app/llms.txt/route.ts` (non da `public/llms.txt`). Stesso gate degli articoli in sitemap. Un file statico in `public/` vincerebbe sulla route e resterebbe stantio.

## Superfici indexabili (oggi)

| Path | Note |
|------|------|
| `/` | Home |
| `/articoli` | Indice articoli |
| `/articoli/[slug]` | Solo `published` con `publishedAt` <= ora e senza `noIndex` (altrimenti 404, come le bozze) |
| `/categorie`, `/categoria/[slug]` | Solo slug presenti in catalog; in sitemap e `llms.txt` solo se un articolo indexabile li usa |
| `/autore/[slug]` | Solo autori in catalog (sitemap sì, `llms.txt` no) |
| `/chi-siamo`, `/collabora`, `/contatti`, `/newsletter` | Marketing |
| `/privacy`, `/termini`, `/cookie` | Legali (indexabili a bassa priorità) |

Non indexare: `/api/*`, bozze (`status: "draft"`), articoli con `publishedAt` futuro, articoli `noIndex`, preview interne.

## Deliverable tecnici obbligatori

| File | Ruolo |
|------|--------|
| `src/lib/seo/site.ts` | `CANONICAL_ORIGIN`, `absoluteUrl()`, path pubblici, tagline e profili usati dal JSON-LD |
| `src/lib/seo/indexable.ts` | Gate condiviso: published, `publishedAt` <= now, non `noIndex` |
| `src/lib/seo/jsonld.ts` | Article, BreadcrumbList, FAQPage, Organization, WebSite |
| `src/lib/seo/llms.ts` | Testo markdown di `llms.txt` |
| `src/lib/seo/indexnow.ts` | POST a `https://api.indexnow.org/indexnow` solo in produzione e con chiave valida |
| `src/app/robots.ts` | `MetadataRoute.Robots` → allow `/`, disallow `/api/`, sitemap URL |
| `src/app/sitemap.ts` | `MetadataRoute.Sitemap` dal gate condiviso, `revalidate` 300 |
| `src/app/llms.txt/route.ts` | `llms.txt` dinamico, `text/plain; charset=utf-8`, `revalidate` 300 |
| `src/app/layout.tsx` | `metadataBase` su www; JSON-LD Organization + WebSite |
| `src/components/article/ArticleFaq.tsx` | FAQ visibile, stesso testo di `faq[]` |
| `src/app/api/indexnow/route.ts` | POST protetto, invia gli URL della sitemap |
| `public/<INDEXNOW_KEY>.txt` | Chiave IndexNow: 32 hex, niente newline finale |
| `.env.example` | `INDEXNOW_KEY` (pubblica), `CRON_SECRET` e `INDEXNOW_SUBMIT_SECRET` (segreti, commentati) |

## `llms.txt`

Tono italiano, come l’indice storico. Sezioni:

- introduzione evidence-based (non è consiglio medico)
- pagine principali (path statici non legali)
- pagine legali
- hub tematici: solo categorie usate da articoli indexabili, nome da catalog
- articoli pubblicati: titolo = `h1`, dal più recente
- puntatori a `sitemap.xml` e `robots.txt`
- nota d’uso e `mailto:ciao@benessere.digital`

Niente lista a mano. `smartphone-a-scuola-cosa-funziona` entra quando `publishedAt` è già trascorso, insieme agli altri articoli del gate, e ne esce se torna draft o `noIndex`.

## FAQ in pagina

Se `article.faq?.length`, `/articoli/[slug]` mostra una sezione «Domande frequenti» con le stesse domande e risposte, nello stesso ordine, del JSON-LD `FAQPage`. Non inventare, riassumere o omettere voci. Se `faq` manca o è vuoto: niente sezione e niente `FAQPage`.

## Organization e WebSite

Nel root layout, uno script `Organization` e uno `WebSite`. URL solo da `CANONICAL_ORIGIN` / `absoluteUrl()`. Nome, tagline, logo e `sameAs` sono quelli visibili in navbar e footer (`SITE_NAME`, `SITE_TAGLINE`, `ORGANIZATION_LOGO_PATH`, `ORGANIZATION_SAME_AS`). Niente `SearchAction`: il sito non ha ricerca.

## IndexNow

La chiave è pubblica (il file in `public/` la espone). Il segreto è solo l’autorizzazione del POST.

- Chiave: 32 caratteri esadecimali. Il file `public/<chiave>.txt` contiene esattamente la chiave, senza newline.
- `INDEXNOW_KEY` in `.env.example` è lo stesso valore. Su Vercel va impostata **Production** (e solo lì, se non si vuole che altre env la vedano).
- L’helper chiama soltanto `https://api.indexnow.org/indexnow`. Non parte se manca la chiave, se la chiave non è hex 8–128, o se l’ambiente non è produzione. Produzione significa `VERCEL_ENV=production`; se `VERCEL_ENV` non c’è, `NODE_ENV=production`. Le preview Vercel hanno `NODE_ENV=production` ma `VERCEL_ENV=preview`: non inviano.
- `POST /api/indexnow` non legge URL dal client. Invia gli URL correnti della sitemap. Header `Authorization: Bearer <CRON_SECRET>` oppure `Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>`. Senza uno dei due segreti: 401.

Dopo il deploy in production, con `INDEXNOW_KEY` e almeno un segreto impostati:

```bash
curl -sS -X POST https://www.benessere.digital/api/indexnow \
  -H "Authorization: Bearer $CRON_SECRET"
```

Risposta attesa: `{"ok":true,"submitted":true,"urlCount":<n>,"status":200}` (anche 202 va bene).

Verifica della chiave, prima o dopo il deploy:

```bash
curl -sS "https://www.benessere.digital/${INDEXNOW_KEY}.txt"
```

Il body deve essere identico a `INDEXNOW_KEY`, 32 byte, senza newline.

Se la chiave non è in env: `{"ok":true,"submitted":false,"reason":"missing-key"}`. Fuori produzione: `"reason":"not-production"` e nessuna richiesta verso IndexNow.

## Checklist agent (ogni PR SEO)

- [ ] `curl -sI https://www.benessere.digital/robots.txt` → 200, `Sitemap:` punta a www
- [ ] `curl -sI https://www.benessere.digital/sitemap.xml` → 200, solo URL www, niente draft, date future o `noIndex`
- [ ] `curl -sI https://www.benessere.digital/llms.txt` → 200, `Content-Type` `text/plain`, e `public/llms.txt` non esiste
- [ ] Il body di `llms.txt` include gli articoli del gate (tra cui `smartphone-a-scuola-cosa-funziona` quando `publishedAt` è passato) e non i draft
- [ ] Un articolo con `faq[]` mostra le stesse voci del JSON-LD `FAQPage`
- [ ] L’HTML di pagina contiene `Organization` e `WebSite` con URL www
- [ ] `curl -s https://www.benessere.digital/<INDEXNOW_KEY>.txt` è la chiave, 32 byte
- [ ] Nessun hardcode di `benessere.digital` (apex) negli URL di canonical/sitemap/llms
- [ ] Nessun merge/deploy senza OK esplicito di Matteo

## Differenze vs CineQuill (non portare)

- Niente i18n / hreflang / `/{locale}`
- Niente asset SEO bilingue, comparison hubs, resource indexes EN
- Niente SoftareApplication schema prodotto SaaS (qui è portale editoriale → Organization + WebSite + Article)

## Fatto (pagina articolo e sito)

- JSON-LD `Article` + `BreadcrumbList` (+ `FAQPage` se `faq[]` è valorizzato)
- Sezione FAQ visibile, stesso testo del JSON-LD, solo se `faq[]` è valorizzato
- Sezione Fonti da `sources[]`
- `updatedAt` → «Aggiornato il» + sitemap `lastModified`
- `og:image` assoluto su `www` via `absoluteUrl()`
- JSON-LD `Organization` + `WebSite` nel root layout
- `llms.txt` generato dallo stesso gate della sitemap
- IndexNow: chiave pubblica, helper e `POST /api/indexnow`

## Prossimi step (fuori da questa PR se non chiesti)

- HTML sitemap `/mappa-del-sito`
- Allineare `NEXT_PUBLIC_SERVER_URL` a `https://www.benessere.digital`
