/**
 * Seed script — benessere.digital CMS content migration
 *
 * Migrates all content from benesseredigital.webflow.io into Payload CMS.
 * Source: BEN-9 content audit (2026-03-17)
 *
 * Run with: pnpm payload:seed
 * Requires: DATABASE_URI set, Postgres running (docker compose up -d)
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'

const publicDir = path.resolve(process.cwd(), 'public')

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  relativePath: string,
  alt: string,
): Promise<string | null> {
  const filePath = path.join(publicDir, relativePath)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! Missing media file: ${relativePath}`)
    return null
  }

  const filename = path.basename(relativePath)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    return existing.docs[0].id as string
  }

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  })
  console.log(`  ✓ Uploaded media: ${filename}`)
  return created.id as string
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting benessere.digital content migration...')

  // ─── 1. Categories ───────────────────────────────────────────────────────────

  console.log('\n📁 Seeding categories...')

  const categoriesData = [
    {
      name: 'Benessere Digitale',
      slug: 'benessere-digitale',
      description: 'Articoli sul benessere digitale e la salute mentale nell\'era tecnologica.',
    },
    {
      name: 'Digital Detox',
      slug: 'digital-detox',
      description: 'Strategie e guide per ridurre l\'uso della tecnologia e ritrovare l\'equilibrio.',
    },
    {
      name: 'Digital Wellness',
      slug: 'digital-wellness',
      description: 'Approcci e pratiche per un uso consapevole e sano della tecnologia.',
    },
    {
      name: 'Mental Health',
      slug: 'mental-health',
      description: 'L\'impatto della tecnologia sulla salute mentale e come gestirlo.',
    },
    {
      name: 'Famiglia e Tecnologia',
      slug: 'famiglia-tecnologia',
      description: 'Consigli per gestire l\'uso della tecnologia in famiglia e con i figli.',
    },
    {
      name: 'Social Media',
      slug: 'social-media',
      description: 'Come i social media influenzano il benessere e strategie per un uso consapevole.',
    },
    {
      name: 'Schermo e tempo',
      slug: 'schermo-e-tempo',
      description: 'Gestione del tempo sullo schermo per giovani e famiglie.',
    },
    {
      name: 'Salute mentale',
      slug: 'salute-mentale',
      description: 'Impatto del digitale sul benessere psicologico.',
    },
    {
      name: 'Sicurezza online',
      slug: 'sicurezza-online',
      description: 'Privacy, cyberbullismo e sicurezza per i giovani.',
    },
    {
      name: 'Genitori e scuola',
      slug: 'genitori-e-scuola',
      description: 'Risorse per genitori ed educatori.',
    },
    {
      name: 'App e strumenti',
      slug: 'app-e-strumenti',
      description: 'Le migliori app per il benessere digitale.',
    },
  ]

  const categoryIds: Record<string, string> = {}

  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })
    if (existing.docs.length > 0) {
      categoryIds[cat.slug] = existing.docs[0].id as string
      console.log(`  ↩ Category exists: ${cat.name}`)
    } else {
      const created = await payload.create({ collection: 'categories', data: cat })
      categoryIds[cat.slug] = created.id as string
      console.log(`  ✓ Created category: ${cat.name}`)
    }
  }

  // ─── 2. Authors ──────────────────────────────────────────────────────────────

  console.log('\n👤 Seeding authors...')

  const authorsData = [
    {
      name: 'Matteo Foroni',
      slug: 'matteo-foroni',
      bio: 'Fondatore di benessere.digital. Esperto di benessere digitale e strategie per un uso consapevole della tecnologia.',
      socialLinks: [
        { platform: 'website' as const, url: 'https://benesseredigital.webflow.io/' },
      ],
    },
  ]

  const authorIds: Record<string, string> = {}

  for (const author of authorsData) {
    const existing = await payload.find({
      collection: 'authors',
      where: { slug: { equals: author.slug } },
    })
    if (existing.docs.length > 0) {
      authorIds[author.slug] = existing.docs[0].id as string
      console.log(`  ↩ Author exists: ${author.name}`)
    } else {
      const created = await payload.create({ collection: 'authors', data: author })
      authorIds[author.slug] = created.id as string
      console.log(`  ✓ Created author: ${author.name}`)
    }
  }

  // ─── 3. Articles ─────────────────────────────────────────────────────────────

  console.log('\n📝 Seeding articles...')

  const articlesData = [
    {
      title: "Brain Rot: La parola dell'anno che sta cambiando il modo di pensare ai contenuti digitali",
      slug: 'brain-rot',
      excerpt:
        'Il "brain rot" descrive il deterioramento cognitivo causato dal consumo eccessivo di contenuti digitali di bassa qualità. Oxford lo ha eletto parola dell\'anno 2024.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il "brain rot" — letteralmente "marciume cerebrale" — descrive il deterioramento cognitivo che si verifica quando consumiamo in modo eccessivo contenuti digitali di bassa qualità. Oxford Dictionary lo ha eletto parola dell\'anno 2024, con un uso cresciuto del 230% tra il 2023 e il 2024, trainato soprattutto da Gen Z e Gen Alpha.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il termine non è nuovo: Henry David Thoreau lo usò già nel 1854 in Walden per criticare la tendenza della società a svalutare idee complesse in favore di quelle semplici. Oggi torna di attualità nell\'era dello scroll infinito.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Gli effetti del brain rot', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il consumo cronico di contenuti di scarsa qualità produce: affaticamento cognitivo, riduzione della capacità di attenzione, deterioramento del pensiero critico e difficoltà decisionali. Fenomeni correlati includono il doomscrolling e lo zombie scrolling.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: 'matteo-foroni',
      categorySlug: 'benessere-digitale',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: "Brain Rot: La parola dell'anno 2024 e il benessere digitale",
        metaDescription:
          "Cosa significa brain rot, perché Oxford lo ha eletto parola dell'anno 2024 e come proteggersi dal deterioramento cognitivo digitale.",
      },
    },
    {
      title: 'Dopamina: La Guida Completa per la Motivazione e la Determinazione',
      slug: 'dopamina-la-guida-completa',
      excerpt:
        'La dopamina non è la molecola del piacere, ma della novità e dell\'anticipazione. Una guida completa per capire come funziona e come gestire il ciclo dipendenza-tolleranza.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Contrariamente a quanto si crede, la dopamina non è la molecola del piacere: è la molecola della novità e dell\'anticipazione. Il tuo cervello rilascia dopamina non quando ottieni qualcosa, ma quando si aspetta di ottenerla.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Tolleranza e ciclo baseline', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Con l\'uso ripetuto di stimoli ad alta intensità (social media, videogame, contenuti virali), il cervello sviluppa tolleranza: abbassa il livello baseline di dopamina, rendendo difficile provare soddisfazione dalle attività ordinarie.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Il metodo del budget dopaminergico', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Approccio consigliato: elimina il 60% degli stimoli ad alta intensità e basso sforzo, sostituiscili con abitudini sane che producono dopamina in modo sostenibile (40%). Mantra chiave: Astieni, Mantieni, Cerca il Disagio.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Nota: le strategie di dopamine fasting non sostituiscono un trattamento medico. Se hai ADHD o altri disturbi, consulta un professionista.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: 'matteo-foroni',
      categorySlug: 'benessere-digitale',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: 'Dopamina: Guida completa alla motivazione e al benessere digitale',
        metaDescription:
          'Come funziona la dopamina, perché i social media la sfruttano e come gestire il ciclo di tolleranza per ritrovare motivazione e concentrazione.',
      },
    },
    {
      title: '10 semplici strategie per un digital detox quotidiano',
      slug: '10-semplici-strategie-per-un-digital-detox-quotidiano',
      excerpt:
        'Dieci strategie pratiche e concrete per ridurre la dipendenza da smartphone e social media nella vita di tutti i giorni.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il digital detox non significa abbandonare la tecnologia, ma usarla in modo più intenzionale. Ecco dieci strategie pratiche che puoi iniziare ad applicare oggi.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: '1. Limiti di utilizzo per app', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Usa le impostazioni native di iOS (Screen Time) o Android (Digital Wellbeing) per impostare limiti giornalieri sulle app che consumi di più.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: '2. Zone tech-free in casa', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Designa stanze o momenti della giornata senza dispositivi: camera da letto, tavola da pranzo, prima ora del mattino.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: '3. Disabilita le notifiche non essenziali', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Mantieni solo le notifiche da contatti reali. Silenzia tutte le app di social media, news e shopping.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: '4. Regola 20-20-20', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Ogni 20 minuti davanti allo schermo, guarda qualcosa a 20 piedi di distanza (circa 6 metri) per 20 secondi. Riduce l\'affaticamento visivo.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: '5. Digital curfew serale', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Smetti di usare schermi almeno 60 minuti prima di andare a letto. La luce blu interferisce con la produzione di melatonina.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: null,
      categorySlug: 'digital-detox',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: '10 strategie per il digital detox quotidiano | benessere.digital',
        metaDescription:
          'Dieci tecniche pratiche per ridurre lo screen time e iniziare un digital detox sostenibile nella vita di tutti i giorni.',
      },
    },
    {
      title: 'Il minimalismo digitale: come vivere meglio con meno tecnologia',
      slug: 'il-minimalismo-digitale-come-vivere-meglio-con-meno-tecnologia',
      excerpt:
        'Cal Newport ha reso famoso il concetto di digital minimalism. Ecco i sette passi per applicarlo e recuperare attenzione, tempo e benessere.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il minimalismo digitale, reso popolare da Cal Newport nel suo libro omonimo, è la filosofia di usare solo la tecnologia che supporta genuinamente i tuoi valori, eliminando tutto il resto.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'I sette passi del minimalismo digitale', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: '1. Identifica i tuoi obiettivi digitali — cosa vuoi davvero ottenere con la tecnologia? 2. Fai un declutter digitale: elimina app e servizi che non usi o che consumano attenzione senza restituire valore. 3. Stabilisci limiti di screen time. 4. Crea regole per la tecnologia in famiglia. 5. Pianifica pause regolari dai dispositivi. 6. Cura attivamente il tuo feed social: smetti di seguire account che non ti arricchiscono. 7. Coltiva hobby offline.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: null,
      categorySlug: 'digital-wellness',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: 'Minimalismo digitale: vivere meglio con meno tecnologia',
        metaDescription:
          'Cos\'è il minimalismo digitale secondo Cal Newport e come applicarlo in sette passi concreti per recuperare attenzione e benessere.',
      },
    },
    {
      title: 'Come il benessere digitale influisce sulla salute mentale e fisica',
      slug: 'come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica',
      excerpt:
        'L\'abuso di tecnologia impatta sia la mente che il corpo. Dall\'information overload alla text neck, ecco tutti gli effetti e come contrastarli.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Impatti sulla salute mentale', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il sovraccarico informativo (information overload), la FOMO (Fear Of Missing Out) e la disruzione del sonno sono tra i principali effetti mentali dell\'uso eccessivo di tecnologia. La luce blu degli schermi inibisce la melatonina, compromettendo la qualità del riposo.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Impatti sulla salute fisica', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'L\'affaticamento visivo digitale (digital eye strain), la text neck (tensione cervicale da smartphone), il comportamento sedentario e le problematiche posturali sono effetti fisici documentati dell\'uso prolungato di dispositivi.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Strategie di contrasto', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Pause programmate, limiti di utilizzo, pratiche di mindfulness, zone tech-free e digital detox periodici sono le misure più efficaci per proteggere sia la salute mentale che quella fisica nell\'era digitale.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: null,
      categorySlug: 'mental-health',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: 'Benessere digitale e salute mentale: impatti e strategie',
        metaDescription:
          'Come l\'uso eccessivo di tecnologia influisce sulla salute mentale e fisica, con strategie concrete per proteggere il tuo benessere digitale.',
      },
    },
    {
      title: "Digital detox in famiglia: consigli per ridurre l'uso della tecnologia a casa",
      slug: 'digital-detox-in-famiglia-consigli-per-ridurre-luso-della-tecnologia-a-casa',
      excerpt:
        'Dieci strategie per famiglie che vogliono ritrovare spazio per la comunicazione reale, riducendo la dipendenza dai dispositivi digitali.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Il digital detox in famiglia non è proibizionismo tecnologico: è un atto consapevole per creare spazio alla comunicazione reale, al gioco, e alla connessione autentica tra genitori e figli.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Dieci strategie per famiglie', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: '1. Regole chiare e condivise — coinvolgi tutta la famiglia nel definirle. 2. Pasti senza dispositivi — il tavolo da pranzo è zona tech-free. 3. Orari di utilizzo definiti. 4. Controllo parentale attivo. 5. Attività alternative offline. 6. Il genitore come modello — mostra il comportamento che vuoi vedere. 7. Giornate o serate senza schermi. 8. Conversazioni aperte sul benessere digitale. 9. Spazi fisici tech-free (camere da letto). 10. Valutare insieme i contenuti che si consumano.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: null,
      categorySlug: 'famiglia-tecnologia',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: 'Digital detox in famiglia: 10 consigli pratici',
        metaDescription:
          'Strategie concrete per famiglie che vogliono ridurre l\'uso della tecnologia a casa e migliorare la qualità della vita digitale.',
      },
    },
    {
      title: "L'impatto dei social media sul benessere e come gestirlo in modo consapevole",
      slug: 'limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole',
      excerpt:
        'I social media hanno effetti sia positivi (connessione, comunità) che negativi (ansia, depressione, FOMO). Otto strategie per un uso consapevole.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'I social media non sono intrinsecamente buoni o cattivi: sono amplificatori. Amplificano connessioni, ma anche confronti tossici. Il segreto è un uso intenzionale.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Effetti positivi', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Connessione con amici e familiari lontani, creazione di comunità di interesse, networking professionale, accesso a informazioni e risorse, supporto per persone isolate o con disabilità.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Effetti negativi', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Ansia da confronto sociale, depressione correlata all\'uso intensivo, FOMO, riduzione dell\'autostima da esposizione a standard irrealistici, dipendenza da validazione esterna (like, commenti).',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Otto strategie per un uso consapevole', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: '1. Cura il tuo feed — smetti di seguire account che generano confronto negativo. 2. Disabilita le notifiche. 3. Usa i social in modalità scheduled (sessioni pianificate, non passive). 4. Pratica il "disconnect challenge": un giorno a settimana senza social. 5. Monitora il tuo umore prima e dopo l\'uso. 6. Preferisci la produzione alla consumazione. 7. Separa l\'identità online da quella offline. 8. Parla con i tuoi figli dell\'algoritmo e di come funziona.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      authorSlug: null,
      categorySlug: 'social-media',
      readingTime: 5,
      status: 'published' as const,
      seo: {
        metaTitle: "Social media e benessere: impatto e strategie consapevoli",
        metaDescription:
          'Come i social media influenzano il benessere psicologico e otto strategie concrete per un uso consapevole e sano dei social.',
      },
    },
  ]

  const articleMeta: Record<
    string,
    { cover: string; publishedAt: string; categorySlugs: string[] }
  > = {
    'brain-rot': {
      cover: 'images/covers/brain-rot.png',
      publishedAt: '2025-01-08T14:38:25.581Z',
      categorySlugs: ['benessere-digitale', 'schermo-e-tempo'],
    },
    'dopamina-la-guida-completa': {
      cover: 'images/covers/dopamina.png',
      publishedAt: '2024-12-20T17:27:13.817Z',
      categorySlugs: ['benessere-digitale', 'salute-mentale'],
    },
    '10-semplici-strategie-per-un-digital-detox-quotidiano': {
      cover: 'images/covers/digital-detox-quotidiano.jpg',
      publishedAt: '2024-12-20T17:27:13.817Z',
      categorySlugs: ['digital-detox', 'schermo-e-tempo'],
    },
    'il-minimalismo-digitale-come-vivere-meglio-con-meno-tecnologia': {
      cover: 'images/covers/minimalismo.jpg',
      publishedAt: '2024-09-03T00:00:00.000Z',
      categorySlugs: ['digital-wellness', 'app-e-strumenti'],
    },
    'come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica': {
      cover: 'images/covers/salute-mentale.jpg',
      publishedAt: '2024-09-03T00:00:00.000Z',
      categorySlugs: ['mental-health', 'salute-mentale'],
    },
    'digital-detox-in-famiglia-consigli-per-ridurre-luso-della-tecnologia-a-casa': {
      cover: 'images/covers/detox-famiglia.jpg',
      publishedAt: '2024-09-03T00:00:00.000Z',
      categorySlugs: ['famiglia-tecnologia', 'genitori-e-scuola'],
    },
    'limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole': {
      cover: 'images/covers/social-media.jpg',
      publishedAt: '2024-12-20T17:27:13.817Z',
      categorySlugs: ['social-media'],
    },
  }

  for (const article of articlesData) {
    const meta = articleMeta[article.slug]
    const featuredImage = meta
      ? await ensureMedia(payload, meta.cover, `Copertina: ${article.title}`)
      : null
    const categorySlugs = meta?.categorySlugs ?? (article.categorySlug ? [article.categorySlug] : [])
    const categories = categorySlugs
      .map((slug) => categoryIds[slug])
      .filter((id): id is string => Boolean(id))

    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: article.slug } },
    })

    const data: Record<string, unknown> = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      status: article.status,
      seo: article.seo,
    }

    if (categories.length > 0) data.categories = categories
    if (article.authorSlug && authorIds[article.authorSlug]) {
      data.authors = [authorIds[article.authorSlug]]
    }
    if (featuredImage) data.featuredImage = featuredImage
    if (meta?.publishedAt) data.publishedAt = meta.publishedAt

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'articles',
        id: existing.docs[0].id,
        data: {
          ...(featuredImage ? { featuredImage } : {}),
          publishedAt: meta?.publishedAt,
          categories,
          status: article.status,
        },
      })
      console.log(`  ↻ Updated article: ${article.title.substring(0, 50)}...`)
      continue
    }

    await payload.create({ collection: 'articles', data })
    console.log(`  ✓ Created article: ${article.title.substring(0, 50)}...`)
  }

  // ─── 4. Apps ─────────────────────────────────────────────────────────────────

  console.log('\n📱 Seeding apps...')

  const appsData = [
    {
      name: 'BePresent',
      slug: 'bepresent',
      description:
        'BePresent blocca le app e monitora il tuo tempo di utilizzo con carattere, arrivando ad arrabbiarsi e deriderti se passi troppo tempo al telefono.',
      useCase: 'Focus / Wellbeing',
      appStoreUrl: 'https://apps.apple.com/it/app/bepresent-lower-screen-time/id1644737181',
      icon: 'images/apps/bepresent.webp',
      featured: true,
    },
    {
      name: 'Tiimo',
      slug: 'tiimo',
      description: 'Planner visivo progettato per persone con ADHD e neurodivergenza.',
      useCase: 'Produttività / ADHD',
      appStoreUrl: 'https://apps.apple.com/it/app/tiimo-planner-per-ladhd/id1480220328',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tiimoapp.androidapp',
      icon: 'images/apps/tiimo.webp',
      featured: true,
    },
    {
      name: 'Flipd',
      slug: 'flipd',
      description: 'Timer focus e studio che blocca le distrazioni digitali.',
      useCase: 'Studio / Focus',
      appStoreUrl: 'https://apps.apple.com/us/app/flipd-focus-study-timer/id1071708905',
      icon: 'images/apps/flipd.webp',
      featured: true,
    },
    {
      name: 'One Sec',
      slug: 'one-sec',
      description: 'Aggiunge un secondo di riflessione consapevole prima di aprire app distraenti.',
      useCase: 'Screen time / Mindfulness',
      appStoreUrl: 'https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=wtf.riedel.onesec',
      icon: 'images/apps/one-sec.webp',
      featured: true,
    },
    {
      name: 'Forest',
      slug: 'forest',
      description: 'Gamifica la produttività: pianta alberi virtuali mentre resti concentrato.',
      useCase: 'Produttività',
      appStoreUrl: 'https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=cc.forestapp',
      icon: 'images/apps/forest.webp',
      featured: true,
    },
  ]

  for (const app of appsData) {
    const iconId = await ensureMedia(payload, app.icon, `Icona ${app.name}`)
    const data = {
      name: app.name,
      slug: app.slug,
      description: app.description,
      useCase: app.useCase,
      appStoreUrl: app.appStoreUrl,
      playStoreUrl: 'playStoreUrl' in app ? app.playStoreUrl : undefined,
      featured: app.featured,
      ...(iconId ? { icon: iconId } : {}),
    }

    const existing = await payload.find({
      collection: 'apps',
      where: { slug: { equals: app.slug } },
    })
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'apps', id: existing.docs[0].id, data })
      console.log(`  ↻ Updated app: ${app.name}`)
    } else {
      await payload.create({ collection: 'apps', data })
      console.log(`  ✓ Created app: ${app.name}`)
    }
  }

  // ─── 5. Books ────────────────────────────────────────────────────────────────

  console.log('\n📚 Seeding books...')

  const booksData = [
    {
      title: 'Wellbeing. Il futuro umano e digitale',
      slug: 'wellbeing-futuro-umano-digitale',
      author: 'Alessio Carciofi',
      description: '21 consigli per vivere con serenità il digitale.',
      buyUrl: 'https://amzn.eu/d/960jwQc',
      cover: 'images/books/wellbeing.jpg',
      featured: true,
    },
    {
      title: 'Digital detox per tutta la famiglia',
      slug: 'digital-detox-per-tutta-la-famiglia',
      author: 'Tanya Goodin',
      description: 'Guida pratica per un uso consapevole di tv, smartphone e computer.',
      buyUrl: 'https://amzn.eu/d/3pE7Tm0',
      cover: 'images/books/digital-detox-famiglia.jpg',
      featured: true,
    },
    {
      title: "L'era della dopamina",
      slug: 'era-della-dopamina',
      author: 'Anna Lembke',
      description: 'Come mantenere l\'equilibrio nella società del "tutto e subito".',
      buyUrl: 'https://amzn.eu/d/iEhci2P',
      cover: 'images/books/era-della-dopamina.jpg',
      featured: true,
    },
    {
      title: 'Come disintossicarti dal tuo cellulare',
      slug: 'come-disintossicarti-dal-tuo-cellulare',
      author: 'Catherine Price',
      description: 'Programma detox in 4 settimane.',
      buyUrl: 'https://amzn.eu/d/gBrKegX',
      cover: 'images/books/disintossicarti-cellulare.jpg',
      featured: true,
    },
    {
      title: 'Il benessere digitale',
      slug: 'il-benessere-digitale',
      author: 'Marco Fasoli',
      buyUrl: 'https://amzn.eu/d/4TvsJ2j',
      cover: 'images/books/benessere-digitale-fasoli.jpg',
      featured: true,
    },
  ]

  for (const book of booksData) {
    const coverId = await ensureMedia(payload, book.cover, `Copertina ${book.title}`)
    const data = {
      title: book.title,
      slug: book.slug,
      author: book.author,
      description: 'description' in book ? book.description : undefined,
      buyUrl: book.buyUrl,
      featured: book.featured,
      ...(coverId ? { coverImage: coverId } : {}),
    }

    const existing = await payload.find({
      collection: 'books',
      where: { slug: { equals: book.slug } },
    })
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'books', id: existing.docs[0].id, data })
      console.log(`  ↻ Updated book: ${book.title}`)
    } else {
      await payload.create({ collection: 'books', data })
      console.log(`  ✓ Created book: ${book.title}`)
    }
  }

  // ─── 6. Creators ─────────────────────────────────────────────────────────────

  console.log('\n🎨 Seeding creators...')

  const creatorsData = [
    {
      handle: '@virginia.gambardella',
      slug: 'virginia-gambardella',
      name: 'Virginia Gambardella',
      bio: 'Parlo di benessere a 360°: crescita personale, relazioni, emozioni.',
      platforms: [
        { platform: 'instagram' as const, url: 'https://www.instagram.com/virginia.gambardella/' },
        { platform: 'tiktok' as const, url: 'https://www.tiktok.com/@virginia.gambardella' },
        { platform: 'youtube' as const, url: 'https://www.youtube.com/@virginia.gambardella' },
      ],
      featured: true,
    },
    {
      handle: '@theoxcatalano',
      slug: 'theoxcatalano',
      name: 'theoxcatalano',
      platforms: [{ platform: 'tiktok' as const, url: 'https://www.tiktok.com/@theoxcatalano' }],
      featured: true,
    },
    {
      handle: '@poci.tv',
      slug: 'poci-tv',
      name: 'Poci.tv',
      bio: 'Cerco di migliorare la mia vita :)',
      platforms: [
        { platform: 'tiktok' as const, url: 'https://www.tiktok.com/@poci.tv' },
        { platform: 'youtube' as const, url: 'https://www.youtube.com/@pocitv' },
      ],
      featured: true,
    },
  ]

  for (const creator of creatorsData) {
    const existing = await payload.find({
      collection: 'creators',
      where: { slug: { equals: creator.slug } },
    })
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'creators', id: existing.docs[0].id, data: creator })
      console.log(`  ↻ Updated creator: ${creator.handle}`)
    } else {
      await payload.create({ collection: 'creators', data: creator })
      console.log(`  ✓ Created creator: ${creator.handle}`)
    }
  }

  // ─── Done ─────────────────────────────────────────────────────────────────────

  console.log('\n✅ Seed complete!')
  console.log('\nSummary:')
  console.log(`  Categories: ${categoriesData.length}`)
  console.log(`  Authors: ${authorsData.length}`)
  console.log(`  Articles: ${articlesData.length}`)
  console.log(`  Apps: ${appsData.length}`)
  console.log(`  Books: ${booksData.length}`)
  console.log(`  Creators: ${creatorsData.length}`)
  console.log('\nNext steps:')
  console.log('  • Attribute remaining articles missing an author field')
  console.log('  • Import extra unpublished Webflow posts if needed')
  console.log('  • Verify content parity with https://benesseredigital.webflow.io/')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
