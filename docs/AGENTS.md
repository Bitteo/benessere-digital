# benessere.digital — istruzioni agent

Portale italiano di benessere digitale (evidence-based). Repo: `Bitteo/benessere-digital` (Next.js App Router, contenuti file-based). Live: `https://www.benessere.digital`.

Lingua di lavoro e di prodotto: **solo italiano**. Nessun EN, hreflang, locale path o copy bilingue finché Matteo non lo chiede esplicitamente.

## Anti-job / gate

- Niente publish di articoli (`status: "published"`), merge di PR di contenuto live, deploy o email **senza OK esplicito di Matteo**.
- Niente claim medici inventati; citazioni solo se verificabili.
- Non toccare: Fatture in Cloud (JIGO ADMIN), piattaforme client (PM4EU, Rasi, GeometrApp, Cinequill), brand personale Medeo (medeomedei), social aziendali JIGO (Jigohertz), life admin (Ambrogio).

## Host canonico (P0)

- Un solo origin: `https://www.benessere.digital` (niente trailing slash in `SITE_URL` / env pubbliche).
- Redirect apex → www: **già 301**. Mai 307. Su Vercel il redirect Domains gira prima di Next: allineare Domains + env.
- Metadata, sitemap, robots, `llms.txt`, link interni pubblici, OG: **solo www**.

## Contenuti file-based

Guida editoriale: [`docs/content.md`](./content.md).

| Path | Ruolo |
|------|--------|
| `src/content/articles/*.json` + `src/content/articles.ts` | Articoli (`status: draft \| published`) |
| `src/content/catalog.ts` | Hub categorie / autori / app / libri / creator |
| `docs/content.md` | Guida editoriale file-based |
| `docs/seo-llm-agent-contract.md` | Contratto SEO/LLM esteso (SoT tecnico) |

Bozze: `status: "draft"`, `noIndex` dove previsto. Non entrano in sitemap né in inventari live.

## SEO + LLM (IT-only)

SoT esteso: [`docs/seo-llm-agent-contract.md`](./seo-llm-agent-contract.md).

### Deliverable tecnici

| File | Ruolo |
|------|--------|
| `src/lib/seo/site.ts` | `CANONICAL_ORIGIN`, `absoluteUrl()`, path pubblici |
| `src/app/robots.ts` | allow `/`, disallow `/api/`, Sitemap www |
| `src/app/sitemap.ts` | solo URL indexabili (published + statiche + hub reali) |
| `public/llms.txt` | indice markdown per crawler LLM (IT), solo www |
| `src/app/layout.tsx` | `metadataBase` su www; `lang="it"`; OG `locale: it_IT` |

### Checklist PR SEO

- [ ] `curl -sI https://www.benessere.digital/robots.txt` → 200, `Sitemap:` su www
- [ ] `curl -sI https://www.benessere.digital/sitemap.xml` → 200, solo www, niente draft
- [ ] `curl -sI https://www.benessere.digital/llms.txt` → 200
- [ ] Apex path → **301** Location www
- [ ] Nessun hardcode apex in canonical / sitemap / llms / OG
- [ ] Un solo `<h1>` per pagina; JSON-LD = contenuto visibile

### Fuori scope (finché non chiesto)

- hreflang / EN / `x-default` / path `/{locale}`
- SoftwareApplication schema SaaS (qui: Organization + WebSite + Article)
- Keyword stuffing; claim wellness non evidence-based

## Voice

Italiano chiaro, evidence-based, niente “wellness woo”. Audience mix: giovani, genitori, educatori. Cadenza target: 1 articolo/settimana il **mercoledì** (Wednesday), salvo diversa indicazione.

## Done quando (baseline discovery)

- robots / sitemap / llms live 200 su www
- apex → www **301**
- `llms.txt` allineato a pillar e hub strategici
