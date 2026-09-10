# Come si editano i contenuti

Non c’è un CMS. Il sito legge file versionati nel repo e li pubblica al prossimo deploy.

## Dove sta cosa

| Contenuto | File |
|---|---|
| Articoli (testo, SEO, copertina, categorie) | `src/content/articles/<slug>.json` + registro in `src/content/articles.ts` |
| Categorie, autori, app, libri, creator | `src/content/catalog.ts` |
| Tipi sorgente | `src/content/types.ts` |
| Data layer usato dalle pagine | `src/lib/content.ts` |
| Pagine legali / chi siamo / contatti | route Next in `src/app/(app)/…` |
| Immagini | `public/images/` |

Il body degli articoli è JSON compatibile con il renderer `LexicalContent` (stesso albero usato in precedenza da Payload).

## Aggiungere un articolo

1. Copia un JSON esistente in `src/content/articles/nuovo-slug.json`.
2. Compila `slug`, `title`, `excerpt`, `cover`, `publishedAt`, `categorySlugs`, `authorSlugs`, `seo` e `content`.
3. Aggiungi l’import e la voce in `src/content/articles.ts`.
4. Metti la copertina in `public/images/covers/`.
5. `pnpm dev` e apri `/articoli/nuovo-slug`.

`status: "draft"` resta fuori dal sito. Solo `published` viene servito.

## Categorie, app, libri, creator

Modifica l’array corrispondente in `src/content/catalog.ts`. Gli slug categoria devono coincidere con quelli usati negli articoli e con le tab di `/categoria/<slug>`.

## Perché non Payload / Neon

La copia pubblicata su [benesseredigital.webflow.io](https://benesseredigital.webflow.io/) è la fonte di verità editoriale. Tenerla nei file evita database, admin e secret solo per contenuti statici.
