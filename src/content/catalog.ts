import type { AppSource, AuthorSource, BookSource, CategorySource, CreatorSource } from './types'

export const categories: CategorySource[] = [
  {
    name: 'Benessere Digitale',
    slug: 'benessere-digitale',
    description: "Articoli sul benessere digitale e la salute mentale nell'era tecnologica.",
  },
  {
    name: 'Digital Detox',
    slug: 'digital-detox',
    description: "Strategie e guide per ridurre l'uso della tecnologia e ritrovare l'equilibrio.",
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
    name: 'Social Media',
    slug: 'social-media',
    description: 'Come i social media influenzano il benessere e strategie per un uso consapevole.',
  },
  {
    name: 'Sicurezza online',
    slug: 'sicurezza-online',
    description: 'Privacy, cyberbullismo e sicurezza per i giovani.',
  },
  {
    name: 'App e strumenti',
    slug: 'app-e-strumenti',
    description: 'Le migliori app per il benessere digitale.',
  },
  {
    name: 'Genitori e scuola',
    slug: 'genitori-e-scuola',
    description: 'Risorse per genitori, famiglie ed educatori.',
  },
]

export const authors: AuthorSource[] = [
  {
    name: 'Matteo Foroni',
    slug: 'matteo-foroni',
    bio: 'Fondatore di benessere.digital. Esperto di benessere digitale e strategie per un uso consapevole della tecnologia.',
    socialLinks: [{ platform: 'website', url: 'https://benessere.digital' }],
  },
]

export const apps: AppSource[] = [
  {
    name: 'BePresent',
    slug: 'bepresent',
    description:
      'BePresent blocca le app e monitora il tuo tempo di utilizzo con carattere, arrivando ad arrabbiarsi e deriderti se passi troppo tempo al telefono.',
    useCase: 'Focus / Wellbeing',
    appStoreUrl: 'https://apps.apple.com/it/app/bepresent-lower-screen-time/id1644737181',
    icon: '/images/apps/bepresent.webp',
    featured: true,
  },
  {
    name: 'Tiimo',
    slug: 'tiimo',
    description: 'Planner visivo progettato per persone con ADHD e neurodivergenza.',
    useCase: 'Produttività / ADHD',
    appStoreUrl: 'https://apps.apple.com/it/app/tiimo-planner-per-ladhd/id1480220328',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tiimoapp.androidapp',
    icon: '/images/apps/tiimo.webp',
    featured: true,
  },
  {
    name: 'Flipd',
    slug: 'flipd',
    description: 'Timer focus e studio che blocca le distrazioni digitali.',
    useCase: 'Studio / Focus',
    appStoreUrl: 'https://apps.apple.com/us/app/flipd-focus-study-timer/id1071708905',
    icon: '/images/apps/flipd.webp',
    featured: true,
  },
  {
    name: 'One Sec',
    slug: 'one-sec',
    description: 'Aggiunge un secondo di riflessione consapevole prima di aprire app distraenti.',
    useCase: 'Screen time / Mindfulness',
    appStoreUrl: 'https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=wtf.riedel.onesec',
    icon: '/images/apps/one-sec.webp',
    featured: true,
  },
  {
    name: 'Forest',
    slug: 'forest',
    description: 'Gamifica la produttività: pianta alberi virtuali mentre resti concentrato.',
    useCase: 'Produttività',
    appStoreUrl: 'https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=cc.forestapp',
    icon: '/images/apps/forest.webp',
    featured: true,
  },
  {
    name: 'Opal',
    slug: 'opal',
    description:
      'Limiti di screen time e blocchi programmati per ridurre le distrazioni e proteggere le fasce di concentrazione.',
    useCase: 'Screen time / Focus',
    appStoreUrl: 'https://apps.apple.com/us/app/opal-screen-time-control/id1497465230',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.withopal.opal',
    icon: '/images/apps/opal.webp',
    featured: true,
  },
  {
    name: 'Freedom',
    slug: 'freedom',
    description:
      'Blocco di siti e app su più dispositivi, utile per sessioni di lavoro o studio senza interruzioni digitali.',
    useCase: 'Focus / Blocking',
    appStoreUrl: 'https://apps.apple.com/us/app/freedom-screen-time-control/id1269788228',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=to.freedom.android2',
    icon: '/images/apps/freedom.webp',
    featured: true,
  },
  {
    name: 'Clearspace',
    slug: 'clearspace',
    description:
      'Introduce una pausa consapevole prima di aprire le app che tendono a rubare tempo, così l’apertura diventa una scelta e non un riflesso.',
    useCase: 'Screen time / Mindfulness',
    appStoreUrl: 'https://apps.apple.com/us/app/clearspace-reduce-screen-time/id1572515807',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.clearspace.app',
    icon: '/images/apps/clearspace.webp',
    featured: true,
  },
  {
    name: 'Jomo',
    slug: 'jomo',
    description:
      'Blocchi e routine di focus con tono leggero: aiuta a capire quanto usi il telefono e a proteggere le fasce della giornata che contano.',
    useCase: 'Screen time / Focus',
    appStoreUrl: 'https://apps.apple.com/us/app/jomo-screen-time-blocker/id1609960918',
    icon: '/images/apps/jomo.webp',
    featured: true,
  },
  {
    name: 'AppBlock',
    slug: 'appblock',
    description:
      'Blocchi di app e siti con orari e modalità rigorose; particolarmente solido su Android per ridurre le distrazioni ricorrenti.',
    useCase: 'Screen time / Blocking',
    appStoreUrl: 'https://apps.apple.com/us/app/appblock-block-apps-website/id1515753232',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=cz.mobilesoft.appblock',
    icon: '/images/apps/appblock.webp',
    featured: true,
  },
]

export const books: BookSource[] = [
  {
    title: 'Wellbeing. Il futuro umano e digitale',
    slug: 'wellbeing-futuro-umano-digitale',
    author: 'Alessio Carciofi',
    description: '21 consigli per vivere con serenità il digitale.',
    buyUrl: 'https://amzn.eu/d/960jwQc',
    cover: '/images/books/wellbeing.jpg',
    featured: true,
  },
  {
    title: 'Digital detox per tutta la famiglia',
    slug: 'digital-detox-per-tutta-la-famiglia',
    author: 'Tanya Goodin',
    description: 'Guida pratica per un uso consapevole di tv, smartphone e computer.',
    buyUrl: 'https://amzn.eu/d/3pE7Tm0',
    cover: '/images/books/digital-detox-famiglia.jpg',
    featured: true,
  },
  {
    title: "L'era della dopamina",
    slug: 'era-della-dopamina',
    author: 'Anna Lembke',
    description: 'Come mantenere l\'equilibrio nella società del "tutto e subito".',
    buyUrl: 'https://amzn.eu/d/iEhci2P',
    cover: '/images/books/era-della-dopamina.jpg',
    featured: true,
  },
  {
    title: 'Come disintossicarti dal tuo cellulare',
    slug: 'come-disintossicarti-dal-tuo-cellulare',
    author: 'Catherine Price',
    description: 'Programma detox in 4 settimane.',
    buyUrl: 'https://amzn.eu/d/gBrKegX',
    cover: '/images/books/disintossicarti-cellulare.jpg',
    featured: true,
  },
  {
    title: 'Il benessere digitale',
    slug: 'il-benessere-digitale',
    author: 'Marco Fasoli',
    buyUrl: 'https://amzn.eu/d/4TvsJ2j',
    cover: '/images/books/benessere-digitale-fasoli.jpg',
    featured: true,
  },
  {
    title: 'La generazione ansiosa',
    slug: 'la-generazione-ansiosa',
    author: 'Jonathan Haidt',
    description:
      'Analisi basata su dati e ricerche su smartphone, social e benessere psicologico dei giovani: una lettura utile per genitori ed educatori che vogliono capire cosa è cambiato.',
    buyUrl: 'https://amzn.eu/d/0etXJnEG',
    cover: '/images/books/la-generazione-ansiosa.jpg',
    featured: true,
  },
  {
    title: 'Minimalismo digitale',
    slug: 'minimalismo-digitale',
    author: 'Cal Newport',
    description:
      'Una proposta pratica per ripensare il rapporto con le tecnologie: meno rumore di fondo, più spazio a ciò che ha valore nella vita quotidiana.',
    buyUrl: 'https://amzn.eu/d/07CuLOxR',
    cover: '/images/books/minimalismo-digitale.jpg',
    featured: true,
  },
  {
    title: "Il furto dell'attenzione",
    slug: 'il-furto-dell-attenzione',
    author: 'Johann Hari',
    description:
      'Indagine su come ambienti digitali e pressioni esterne frammentano la concentrazione, e su cosa possono fare individui e società per recuperare focus.',
    buyUrl: 'https://amzn.eu/d/04p6J7cY',
    cover: '/images/books/il-furto-dell-attenzione.jpg',
    featured: true,
  },
  {
    title: 'Indistraibili',
    slug: 'indistraibili',
    author: 'Nir Eyal',
    description:
      'Metodo in quattro fasi per riconoscere trigger interni ed esterni e progettare abitudini che riducono le distrazioni, senza demonizzare la tecnologia.',
    buyUrl: 'https://amzn.eu/d/0eReRnMC',
    cover: '/images/books/indistraibili.jpg',
    featured: true,
  },
  {
    title: 'iGen',
    slug: 'igen',
    author: 'Jean M. Twenge',
    description:
      'Ritratto della generazione cresciuta con lo smartphone: dati su tempo online, relazioni e benessere, pensato per chi educa o lavora con adolescenti.',
    buyUrl: 'https://amzn.eu/d/07bMfFlj',
    cover: '/images/books/igen.jpg',
    featured: true,
  },
]

export const creators: CreatorSource[] = [
  {
    handle: '@virginia.gambardella',
    slug: 'virginia-gambardella',
    name: 'Virginia Gambardella',
    bio: 'Parlo di benessere a 360°: crescita personale, relazioni, emozioni.',
    platforms: [
      { platform: 'instagram', url: 'https://www.instagram.com/virginia.gambardella/' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@virginia.gambardella' },
      { platform: 'youtube', url: 'https://www.youtube.com/@virginia.gambardella' },
    ],
    featured: true,
  },
  {
    handle: '@theoxcatalano',
    slug: 'theoxcatalano',
    name: 'theoxcatalano',
    platforms: [{ platform: 'tiktok', url: 'https://www.tiktok.com/@theoxcatalano' }],
    featured: true,
  },
  {
    handle: '@poci.tv',
    slug: 'poci-tv',
    name: 'Poci.tv',
    bio: 'Cerco di migliorare la mia vita :)',
    platforms: [
      { platform: 'tiktok', url: 'https://www.tiktok.com/@poci.tv' },
      { platform: 'youtube', url: 'https://www.youtube.com/@pocitv' },
    ],
    featured: true,
  },
]
