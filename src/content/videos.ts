export type VideoItem = {
  id: string
  title: string
}

export const videos: VideoItem[] = [
  { title: 'Che cosa è il digital detox secondo Fedez ft. Willwoosh', id: 'Xus4ihr2O0s' },
  { title: '30 giorni senza social media', id: 'rZJ9vMF9l14' },
  { title: 'Digital Detox: Come disintossicarsi dalla tecnologia', id: 'P5LspDIWO0E' },
  { title: "Rimanere umani nell'era digitale | Digital Wellbeing", id: '1ImeSWuFYE8' },
  { title: 'Come riprendere in mano la tua vita: dopamine detox', id: 'bo9q6-EeMF4' },
  { title: 'Come non impazzire sui social media (minimalismo digitale)', id: 'BP0KinHOjrA' },
]

export function videoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}
