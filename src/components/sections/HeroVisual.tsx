'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const HERO_ALT =
  'Una persona che medita, in pieno controllo della sua mente, fa fluttuare dispositivi elettronici intorno a lui.'

const MAX_OFFSET_X_PCT = 1.2
const MAX_OFFSET_Y_PCT = 1.6
const LERP = 0.06
const SETTLE_PCT = 0.008

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
      layer.style.transform = `translate3d(${x}%, ${y}%, 0) scale(1.04)`
    }

    setTransform(0, 0)

    const schedule = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
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
      const rect = root.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const ny = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      targetRef.current = {
        x: (nx - 0.5) * MAX_OFFSET_X_PCT,
        y: (ny - 0.5) * MAX_OFFSET_Y_PCT,
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
      className="relative h-full min-h-[48dvh] w-full overflow-hidden md:min-h-[46dvh]"
    >
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-benessere-digital.png"
          alt={HERO_ALT}
          fill
          priority
          className="object-cover object-[center_22%]"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    </div>
  )
}
