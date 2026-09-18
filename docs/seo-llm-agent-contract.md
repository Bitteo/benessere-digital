# benessere.digital — SEO / LLM Agent Contract

Adattato dal contratto CineQuill (`docs/agent-guides/i18n-seo-agent-contract.md` + `docs/seo-e-contenuti-ai.md`), semplificato per un sito **solo italiano**, Next.js App Router, contenuti file-based.

## Principi

1. **Canonical host**: `https://www.benessere.digital` (apex `benessere.digital` fa già 307 → www). Sitemap, robots, canonical, OG e `llms.txt` usano solo www.
2. **JSON-LD = contenuto visibile** (o equivalente `sr-only`). Niente schema che descrive copy assente.
3. **Un solo `<h1>` per pagina**.
4. **Sitemap** solo URL indexabili: home, pagine statiche pubbliche, articoli `status: "published"`, categorie/autori che esistono davvero. **Mai** draft, API, 404.
5. **Evidence-based**: niente claim medici inventati; citazioni solo se verificabili.
6. **LLM discovery**: mantenere `public/llms.txt` allineato alle pagine strategiche + puntatori a sitemap/robots.

## Superfici indexabili (oggi)

| Path | Note |
|------|------|
| `/` | Home |
| `/articoli` | Indice articoli |
| `/articoli/[slug]` | Solo `published` |
| `/categorie`, `/categoria/[slug]` | Solo slug presenti in catalog |
| `/autore/[slug]` | Solo autori in catalog |
| `/chi-siamo`, `/collabora`, `/contatti`, `/newsletter` | Marketing |
| `/privacy`, `/termini`, `/cookie` | Legali (indexabili a bassa priorità) |

Non indexare: `/api/*`, bozze (`status: "draft"`), preview interne.

## Deliverable tecnici obbligatori

| File | Ruolo |
|------|--------|
| `src/lib/seo/site.ts` | `CANONICAL_ORIGIN`, `absoluteUrl()`, liste path pubblici |
| `src/app/robots.ts` | `MetadataRoute.Robots` → allow `/`, disallow `/api/`, sitemap URL |
| `src/app/sitemap.ts` | `MetadataRoute.Sitemap` da path statici + articoli published + categorie/autori |
| `public/llms.txt` | Indice markdown per crawler LLM (IT), link www only |
| Metadata root | `metadataBase` su www; title/description/OG già in `layout.tsx` |

## Checklist agent (ogni PR SEO)

- [ ] `curl -sI https://www.benessere.digital/robots.txt` → 200, `Sitemap:` punta a www
- [ ] `curl -sI https://www.benessere.digital/sitemap.xml` → 200, solo URL www, niente draft
- [ ] `curl -sI https://www.benessere.digital/llms.txt` → 200
- [ ] Nuovi articoli published entrano in sitemap al prossimo build
- [ ] Nessun hardcode di `benessere.digital` (apex) in canonical/sitemap/llms
- [ ] Nessun merge/deploy senza OK esplicito di Matteo

## Differenze vs CineQuill (non portare)

- Niente i18n / hreflang / `/{locale}`
- Niente asset SEO bilingue, comparison hubs, resource indexes EN
- Niente SoftareApplication schema prodotto SaaS (qui è portale editoriale → Organization + WebSite + Article)

## Prossimi step (fuori da questa PR se non chiesti)

- JSON-LD Organization/WebSite in layout + Article sulle pagine articolo
- HTML sitemap `/mappa-del-sito`
- OG image per articolo
- Allineare `NEXT_PUBLIC_SERVER_URL` a `https://www.benessere.digital`
