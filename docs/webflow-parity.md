# Parità Webflow → Next + Payload

Fonte visiva: [benesseredigital.webflow.io](https://benesseredigital.webflow.io/).  
Produzione: [www.benessere.digital](https://www.benessere.digital/).

## Verifica locale

```bash
docker compose up -d
cp .env.example .env
# imposta PAYLOAD_SECRET
pnpm install
pnpm payload:seed
pnpm dev
```

Controllare:

- `/` — FuturaPT, PixelifySans, hero, logo navbar, hub formati
- `/articoli` e un dettaglio (corpo Lexical, copertina)
- tab categorie (`/categoria/schermo-e-tempo`, `salute-mentale`, …)
- footer: `/newsletter`, `/contatti`, `/collabora`, `/privacy`, `/cookie`, `/termini`
- redirect `/post/brain-rot` → `/articoli/brain-rot`
- form newsletter **disabilitato** se `NEWSLETTER_WEBHOOK_URL` è assente (niente falso successo)

## Font (Linotype)

I file in `public/fonts/` (famiglia FuturaPT `.woff`) sono proprietari Linotype, copiati dal CDN Webflow (`cdn.prod.website-files.com/66cc9c88f0b691dee7428cf1/`) per evitare 404 in produzione. Verificare che la licenza commerciale copra il dominio `benessere.digital` prima di una redistribuzione pubblica. Pixelify Sans è variabile e usata solo per gli accenti.

## P1 fatto in questo PR

- Hub homepage: formati, blog, corso Google, creators, video YouTube, podcast stub, app, libri, contatti, FAQ
- Cookie banner (localStorage, Accetto/Rifiuto)
- Render Lexical del body articolo
- Icone app / copertine libri nello seed

## Follow-up

- Collezioni Payload per Video e Podcast (oggi sezioni statiche / stub)
- Import dei post Webflow extra non presenti nello seed
- Provider newsletter reale (`NEWSLETTER_WEBHOOK_URL`)
- Testi legal da validare con un legale
- Embed TikTok nativi per i creator
- Collection FAQ in Payload al posto delle 5 FAQ statiche
