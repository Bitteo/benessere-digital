import Image from 'next/image'
import { CourseCtaLink } from '@/components/analytics/CourseCtaLink'

const COURSE_URL = 'https://skillshop.exceedlms.com/student/path/690424-benessere-digitale'

export function GoogleWellbeingBanner() {
  return (
    <section className="bg-primary" aria-labelledby="google-wellbeing-heading">
      <div className="container-nav padding-global py-12 md:py-10 sm:py-8">
        <div className="grid grid-cols-[1.3fr_0.9fr] items-center gap-8 md:grid-cols-1">
          <div className="flex flex-col gap-3">
            <h2
              id="google-wellbeing-heading"
              className="max-w-[22em] text-[clamp(1.125rem,2.15vw,1.85rem)] leading-[1.2] text-white"
            >
              Scopri il corso Google di introduzione al Digital{' '}
              <span className="text-pixel">Wellbeing</span>
            </h2>
            <p className="max-w-xl text-lg text-white/90">
              Costruisci abitudini tecnologiche sane e migliora il tuo stile di vita digitale!
            </p>
            <p className="text-[13px] text-white/80">Durata: 19min</p>
            <div className="mt-2">
              <CourseCtaLink href={COURSE_URL} className="btn-secondary">
                Vai al corso
              </CourseCtaLink>
            </div>
          </div>
          <div className="relative min-h-[14rem] self-stretch bg-white md:hidden">
            <Image
              src="/images/google-wellbeing-banner.png"
              alt="Illustrazione corso Google Digital Wellbeing"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 0px, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
