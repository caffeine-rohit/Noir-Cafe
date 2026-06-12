'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Promote video to its own compositor layer immediately
    if (videoRef.current) {
      videoRef.current.style.willChange = 'transform'
    }

    const ctx = gsap.context(() => {
      // Set initial states via GSAP (avoids CSS class flicker on hydration)
      gsap.set([subtitleRef.current, ctaRef.current, scrollRef.current], {
        opacity: 0,
        y: 20,
        force3D: true,
      })
      gsap.set('.hero-word', { opacity: 0, y: 80, skewY: 4, force3D: true })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(subtitleRef.current, {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
      })
        .to('.hero-word', {
          opacity: 1, y: 0, skewY: 0,
          duration: 1.1, stagger: 0.07, ease: 'power4.out',
          clearProps: 'transform,skewY',
        }, '-=0.5')
        .to(ctaRef.current, {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out',
          clearProps: 'transform',
        }, '-=0.4')
        .to(scrollRef.current, {
          opacity: 1, y: 0,
          duration: 0.6,
          clearProps: 'transform',
        }, '-=0.3')

      // Throttled parallax via rAF — much smoother than scroll event
      let rafId: number
      let lastScrollY = window.scrollY

      const tick = () => {
        if (videoRef.current && window.scrollY !== lastScrollY) {
          lastScrollY = window.scrollY
          gsap.set(videoRef.current, { y: lastScrollY * 0.35, force3D: true })
        }
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)

      return () => cancelAnimationFrame(rafId)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = ['Where', 'Every', 'Morning', 'Begins']

  return (
    <section
      ref={containerRef}
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Local hero video — copies from media/ to public/hero.mp4 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-[110%] w-full -top-[5%] object-cover"
        poster="/images/hero.jpeg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/90" />
      <div className="grain-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p
          ref={subtitleRef}
          className="mb-8 text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]"
        >
          Westlands, Nairobi — Est. 2019
        </p>

        <h1 className="max-w-5xl overflow-hidden font-serif text-5xl italic leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block"
              style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p className="mt-6 font-serif text-sm italic text-muted-foreground md:text-base">
          Single-origin. Hand-crafted. Unhurried.
        </p>

        <a
          ref={ctaRef}
          href="#reserve"
          className="mt-12 inline-block rounded-full border border-[color:var(--gold)] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)] transition-all duration-500 hover:bg-[color:var(--gold)] hover:text-background hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
        >
          Reserve a Table
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Scroll
        </span>
        <div className="flex h-8 w-px flex-col overflow-hidden">
          <span className="h-full w-px animate-scroll-line bg-[color:var(--gold)]" />
        </div>
      </div>
    </section>
  )
}
