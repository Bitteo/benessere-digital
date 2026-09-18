'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const HERO_ALT =
  'Una persona che medita, in pieno controllo della sua mente, fa fluttuare dispositivi elettronici intorno a lui.'

// Webflow "Mouse Hover Hero Img": X 0→2%, Y 0→4%, smoothing 90, desktop only.
const RANGE_X = 0.02
const RANGE_Y = 0.04
const LERP = 0.1
const SETTLE_PX = 0.05

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
    const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)')

    const canAnimate = () => !reduceMq.matches && desktopMq.matches && hoverMq.matches

    const setTransform = (x: number, y: number) => {
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
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
      if (Math.abs(tx - cur.x) < SETTLE_PX && Math.abs(ty - cur.y) < SETTLE_PX) {
        cur.x = tx
        cur.y = ty
      }
      setTransform(cur.x, cur.y)
      if (cur.x !== tx || cur.y !== ty) schedule()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!canAnimate()) return
      const section = root.closest('section') ?? root
      const rect = section.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = (event.clientX - rect.left) / rect.width
      const ny = (event.clientY - rect.top) / rect.height
      const layerRect = layer.getBoundingClientRect()
      targetRef.current = {
        x: (nx - 0.5) * RANGE_X * layerRect.width,
        y: (ny - 0.5) * RANGE_Y * layerRect.height,
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
    hoverMq.addEventListener('change', onMediaChange)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', reset)
      reduceMq.removeEventListener('change', onMediaChange)
      desktopMq.removeEventListener('change', onMediaChange)
      hoverMq.removeEventListener('change', onMediaChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={rootRef} className="flex flex-1 items-center justify-center self-stretch md:w-full">
      <div ref={layerRef} className="relative w-full max-w-[min(100%,60vh)] will-change-transform">
        <Image
          src="/images/hero-benessere-digital.png"
          alt={HERO_ALT}
          width={960}
          height={1200}
          className="h-auto w-full object-contain object-center"
          priority
          sizes="(max-width: 768px) 100vw, min(60vh, 50vw)"
        />
      </div>
    </div>
  )
}
