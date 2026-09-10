# Parità Webflow → Next (contenuti file-based)

Fonte visiva: [benesseredigital.webflow.io](https://benesseredigital.webflow.io/).  
Produzione: [www.benessere.digital](https://www.benessere.digital/).

I contenuti pubblicati dello staging Webflow (7 articoli, categorie, app, libri, creator, autori) vivono in `src/content/`. Non c’è Payload né Postgres.

Vedi [content.md](./content.md) per come si modifica il catalogo.

## Verifica locale

```bash
pnpm install
pnpm dev
```

Controllare:

- `/` — FuturaPT, PixelifySans, hero, logo navbar, hub formati, blog con articoli, app, libri, creator
- `/articoli` e un dettaglio (corpo articolo, copertina)
- tab categorie (`/categoria/schermo-e-tempo`, `salute-mentale`, …)
- `/api/articles` e `/api/categories` (JSON dal catalogo file, 200)
- footer: `/newsletter`, `/contatti`, `/collabora`, `/privacy`, `/cookie`, `/termini`
- redirect `/post/brain-rot` → `/articoli/brain-rot`
- form newsletter **disabilitato** se `NEWSLETTER_WEBHOOK_URL` è assente (niente falso successo)

## Font (Linotype)

I file in `public/fonts/` (famiglia FuturaPT `.woff`) sono proprietari Linotype, copiati dal CDN Webflow (`cdn.prod.website-files.com/66cc9c88f0b691dee7428cf1/`) per evitare 404 in produzione. Verificare che la licenza commerciale copra il dominio `benessere.digital` prima di una redistribuzione pubblica. Pixelify Sans è variabile e usata solo per gli accenti.

## Inventario importato (staging Webflow, pubblicato)

Articoli:

- `brain-rot`
- `dopamina-la-guida-completa`
- `10-semplici-strategie-per-un-digital-detox-quotidiano`
- `il-minimalismo-digitale-come-vivere-meglio-con-meno-tecnologia`
- `come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica`
- `digital-detox-in-famiglia-consigli-per-ridurre-luso-della-tecnologia-a-casa`
- `limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole`

I body sono il testo ricco dello staging, non i riassunti dello seed Payload. I draft/unpublished Webflow restano fuori.

## Follow-up

- Provider newsletter reale (`NEWSLETTER_WEBHOOK_URL`)
- Testi legal da validare con un legale (le route `/privacy` `/cookie` `/termini` restano bozze Next; su Webflow la privacy è soprattutto un’immagine)
- Embed TikTok nativi per i creator
- Sezione podcast (oggi stub)
