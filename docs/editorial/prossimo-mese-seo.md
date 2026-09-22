# Calendario editoriale — mese 1

Cadenza: 1 articolo / mercoledì. Autore: `matteo-foroni`.

- **A** (30 set): published — cover D
- **B** (7 ott): published — cover E
- **C** (14 ott): published — cover C

Le copertine Midjourney sono in `public/images/covers/{slug}.png`.

---

## A — mercoledì 30 settembre 2026 — genitori — **published** (cover D)

- **Slug:** `accordi-di-schermo-ragazzi-8-14`
- **Title:** Accordi di schermo per ragazzi 8–14: regole che reggono
- **Keyword primaria:** accordi di schermo
- **Secondarie:** regole smartphone figli, patto digitale famiglia, tempo schermo 8–14
- **Search intent:** informazionale + how-to. Genitore che cerca un metodo (non un elenco di divieti) per orari, camera e conseguenze.
- **Internal link da inserire in publish:**
  - `/articoli/telefono-in-camera-notifiche-e-sonno` (camera / sonno)
  - `/articoli/digital-detox-in-famiglia-consigli-per-ridurre-luso-della-tecnologia-a-casa`
  - `/articoli/10-semplici-strategie-per-un-digital-detox-quotidiano`
- **Categorie:** `genitori-e-scuola`, `schermo-e-tempo`

---

## B — mercoledì 7 ottobre 2026 — educatori — **published** (cover E)

- **Slug:** `smartphone-a-scuola-cosa-funziona`
- **Title:** Smartphone a scuola: oltre il divieto, cosa funziona davvero
- **Keyword primaria:** smartphone a scuola
- **Secondarie:** divieto cellulare scuola, regolamento smartphone istituto, telefono in classe
- **Search intent:** informazionale + professionale. Docenti e dirigenti che cercano un quadro oltre il sì/no al divieto, nel contesto italiano.
- **Internal link da inserire in publish:**
  - `/articoli/accordi-di-schermo-ragazzi-8-14` (dopo il publish di A)
  - `/articoli/digital-detox-in-famiglia-consigli-per-ridurre-luso-della-tecnologia-a-casa`
  - `/articoli/telefono-in-camera-notifiche-e-sonno`
  - `/articoli/come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica`
- **Categorie:** `genitori-e-scuola`, `benessere-digitale`

---

## C — mercoledì 14 ottobre 2026 — giovani (mix OK) — **published** (cover C)

- **Slug:** `fomo-jomo-social-senza-sparire`
- **Title:** FOMO e JOMO: come uscire dal loop senza sparire dai social
- **Keyword primaria:** FOMO JOMO
- **Secondarie:** FOMO social, JOMO significato, uscire dal loop social
- **Search intent:** informazionale + how-to. Giovane (o genitore che cerca per un figlio) che vuole capire FOMO/JOMO e abitudini, non «cancella Instagram».
- **publishedAt:** `2026-10-14T09:00:00.000+02:00`
- **Cover:** Midjourney C (giovane + telefono, bolle corallo che si dissolvono)
- **Internal link in publish:**
  - `/articoli/telefono-in-camera-notifiche-e-sonno` (FOMO a letto) — inserito
  - `/articoli/limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole`
  - `/articoli/brain-rot`
  - `/articoli/dopamina-la-guida-completa`
- **Categorie:** `social-media`, `salute-mentale`

---

## Gate publish (per ogni pezzo)

1. Cover in `public/images/covers/{slug}.png`.
2. `status: "published"`, `publishedAt` mercoledì target (09:00 Europe/Rome, come #1).
3. Togliere `seo.noIndex` (o `false`).
4. Inserire 2–3 internal link dal elenco sopra.
5. Ricontrollare sitemap / `llms.txt` solo dopo il publish.
