'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const HERO_ALT =
  'Una persona che medita, in pieno controllo della sua mente, fa fluttuare dispositivi elettronici intorno a lui.'

// Asset is 960×1200 — taller than the square wrapper (same as Webflow).
const HERO_WIDTH = 960
const HERO_HEIGHT = 1200

// Webflow IX2 "Mouse Hover Hero Img" on .layout4_image:
// X 0%→2%, Y 0%→4%, duration 500ms, smoothing 90, resting state 50%,
// element-based, desktop only.
const MAX_OFFSET_X_PCT = 2
const MAX_OFFSET_Y_PCT = 4
const REST_X_PCT = MAX_OFFSET_X_PCT * 0.5 // resting state 50% → 1%
const REST_Y_PCT = MAX_OFFSET_Y_PCT * 0.5 // → 2%
// Soft follow (~IX2 smoothing 90 + 500ms): lower lerp than a snappy UI tween.
const LERP = 0.06
const SETTLE_PCT = 0.008

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: REST_X_PCT, y: REST_Y_PCT })
  const currentRef = useRef({ x: REST_X_PCT, y: REST_Y_PCT })

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

    // Resting state 50% (Webflow IX2 default before/without pointer).
    setTransform(REST_X_PCT, REST_Y_PCT)

    const schedule = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const reset = () => {
      targetRef.current = { x: REST_X_PCT, y: REST_Y_PCT }
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
      // Element-based: pointer mapped over the square wrapper (not the viewport).
      const rect = root.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const ny = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
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
      className="flex h-full flex-1 items-center justify-end self-stretch md:h-auto md:w-full md:justify-center"
    >
      {/*
        Webflow .layout4_image-wrapper: square, height 100% of 60vh hero, overflow hidden.
        .layout4_image: width 100%, intrinsic height (960×1200 → taller than square),
        anchored bottom-left — vertical crop via overflow, not object-contain letterbox.
      */}
      <div className="relative aspect-square h-full w-auto max-w-full overflow-hidden md:h-auto md:w-full">
        <div ref={layerRef} className="absolute bottom-0 left-0 w-full will-change-transform">
          <Image
            src="/images/hero-benessere-digital.png"
            alt={HERO_ALT}
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
            className="h-auto w-full max-w-none"
            priority
            sizes="(max-width: 768px) 100vw, 60vh"
          />
        </div>
      </div>
    </div>
  )
}
