'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const HERO_ALT =
  'Una persona che medita, in pieno controllo della sua mente, fa fluttuare dispositivi elettronici intorno a lui.'

// Webflow IX2 "Mouse Hover Hero Img": MOUSE_X 0%→2%, MOUSE_Y 0%→4% (of layer size).
// Desktop only; no touch. LERP ~0.12 ≈ 500ms settle feel.
const MAX_OFFSET_X_PCT = 2
const MAX_OFFSET_Y_PCT = 4
const LERP = 0.12
const SETTLE_PCT = 0.01

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const root = rootRef.current
    const layer = layerRef.current
    if (!root || !layer) return

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopMq = window.matchMedia('(min-width: 992px)')

    const canAnimate = () => !reduceMq.matches && desktopMq.matches

    const setTransform = (x: number, y: number) => {
      layer.style.transform = `translate3d(${x}%, ${y}%, 0)`
    }

    const schedule = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const reset = () => {
      targetRef.current = { x: 0, y: 0 }
      schedule()
    }

    function tick() {
      rafRef.current = 0
      const { x: tx, y: ty } = targetRef.current
      const cur = currentRef.current
      cur.x += (tx - cur.x) * LERP
      cur.y += (ty - cur.y) * LERP
      if (Math.abs(tx - cur.x) < SETTLE_PCT && Math.abs(ty - cur.y) < SETTLE_PCT) {
        cur.x = tx
        cur.y = ty
      }
      setTransform(cur.x, cur.y)
      if (cur.x !== tx || cur.y !== ty) schedule()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!canAnimate()) return
      if (event.pointerType === 'touch') return
      const section = root.closest('section') ?? root
      const rect = section.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const ny = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      // IX2 maps pointer 0→1 to translate 0%→2% / 0%→4% (not centered ±).
      targetRef.current = {
        x: nx * MAX_OFFSET_X_PCT,
        y: ny * MAX_OFFSET_Y_PCT,
      }
      schedule()
    }

    const onMediaChange = () => {
      if (!canAnimate()) reset()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    reduceMq.addEventListener('change', onMediaChange)
    desktopMq.addEventListener('change', onMediaChange)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', reset)
      reduceMq.removeEventListener('change', onMediaChange)
      desktopMq.removeEventListener('change', onMediaChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="flex h-full flex-1 items-center justify-end self-stretch overflow-hidden md:h-auto md:w-full md:justify-center"
    >
      {/*
        Webflow .layout4_image-wrapper: height 100% of 60vh hero, aspect-ratio 1,
        overflow hidden. Square fills the right column — no 46vh max-width cap.
      */}
      <div
        ref={layerRef}
        className="relative aspect-square h-full w-auto max-w-full will-change-transform md:aspect-square md:h-auto md:w-full"
      >
        <Image
          src="/images/hero-benessere-digital.png"
          alt={HERO_ALT}
          fill
          className="object-contain object-center"
          priority
          sizes="(max-width: 768px) 100vw, 60vh"
        />
      </div>
    </div>
  )
}
