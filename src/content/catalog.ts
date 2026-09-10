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
    name: 'Digital Wellness',
    slug: 'digital-wellness',
    description: 'Approcci e pratiche per un uso consapevole e sano della tecnologia.',
  },
  {
    name: 'Mental Health',
    slug: 'mental-health',
    description: "L'impatto della tecnologia sulla salute mentale e come gestirlo.",
  },
  {
    name: 'Famiglia e Tecnologia',
    slug: 'famiglia-tecnologia',
    description: "Consigli per gestire l'uso della tecnologia in famiglia e con i figli.",
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
