'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const logoRef   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const loader = loaderRef.current
    const logo   = logoRef.current
    if (!loader || !logo) return

    // Lock scroll while loader is visible
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.display = 'none'
        document.body.style.overflow = ''
      },
    })

    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
    .to({}, { duration: 0.5 })           // hold
    .to(logo, {
      opacity: 0,
      y: -16,
      duration: 0.4,
      ease: 'power2.in',
    })
    .to(loader, {
      yPercent: -100,
      duration: 0.75,
      ease: 'power4.inOut',
    }, '-=0.15')
  }, [])

  return (
    <div
      ref={loaderRef}
      id="page-loader"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#0d0d0d',
               display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span
        ref={logoRef}
        className="loader-logo"
        style={{ opacity: 0, transform: 'translateY(10px)' }}
      >
        NOIR
      </span>
    </div>
  )
}

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Use transform instead of top/left for GPU compositing
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      // Dot: instant snap
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`

      // Ring: lerp for trailing smoothness
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    document.addEventListener('mousemove', onMove, { passive: true })

    // Hover state — use event delegation on document
    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"]')) ring.classList.add('hovering')
    }
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"]')) ring.classList.remove('hovering')
    }

    document.addEventListener('mouseover', onEnter, { passive: true })
    document.addEventListener('mouseout', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
      />
    </>
  )
}
