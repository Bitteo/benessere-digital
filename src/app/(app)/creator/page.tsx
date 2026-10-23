import type { Metadata } from 'next'
import { CreatorsGrid } from '@/components/creators/CreatorsGrid'
import { HubFrame } from '@/components/hubs/HubFrame'
import { getCreators } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Creator del benessere digitale',
  description:
    'Profili da seguire sul benessere digitale: creator, docenti e psicologi che parlano di tempo sullo schermo, detox e abitudini consapevoli.',
  alternates: { canonical: '/creator' },
}

export default async function CreatorPage() {
  const creators = await getCreators()

  return (
    <HubFrame
      title={
        <>
          <span className="text-pixel">Creator</span> del benessere
        </>
      }
      lede="Profili da seguire vicini al tema: voci che raccontano tempo sullo schermo, detox e abitudini digitali."
    >
      <CreatorsGrid creators={creators} />
    </HubFrame>
  )
}
