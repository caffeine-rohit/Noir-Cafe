'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Single rAF to let image decode + layout paint complete
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const image = imageRef.current
        const textItems = sectionRef.current?.querySelectorAll('.about-text-item') ?? []

        // Prime GPU layers before ScrollTrigger fires
        gsap.set(image, { opacity: 0, x: -60, force3D: true, willChange: 'transform, opacity' })
        gsap.set(textItems, { opacity: 0, x: 40, y: 16, force3D: true, willChange: 'transform, opacity' })

        const commonTrigger = {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        }

        // Image slide in
        gsap.to(image, {
          opacity: 1, x: 0,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'willChange,transform',
          scrollTrigger: commonTrigger,
        })

        // Text cascade
        gsap.to(textItems, {
          opacity: 1, x: 0, y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'willChange,transform',
          scrollTrigger: commonTrigger,
        })

        // Subtle parallax on image (scrub = smooth)
        gsap.to(image, {
          y: -50,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,   // higher scrub = smoother (less 1:1 jitter)
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={sectionRef} id="about" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">

        {/* Image — priority since it's high on page, sizes for proper optimization */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] w-full overflow-hidden"
          style={{ borderRadius: '2px' }}
        >
          <Image
            src="/images/about.jpeg"
            alt="A barista in a dark apron pouring latte art in a dimly lit cafe"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-[color:var(--gold)] opacity-60" />
          <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-[color:var(--gold)] opacity-60" />
        </div>

        {/* Text */}
        <div className="max-w-md">
          <div className="about-text-item mb-8">
            <div className="mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
            <span className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Our Story
            </span>
          </div>

          <h2 className="about-text-item font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            A quiet ritual,<br />
            <em>perfected</em>
          </h2>

          <div className="mt-10 flex flex-col gap-6 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p className="about-text-item">
              Tucked into the heart of Westlands, Noir is a sanctuary for those
              who believe the day deserves a deliberate beginning. We source
              single-origin beans from the highlands of Kenya and roast them in
              small batches, in-house, with obsessive care.
            </p>
            <p className="about-text-item">
              Every cup is an invitation to slow down — to notice the warmth of
              the room, the quiet hum of conversation, and the craft poured into
              each detail. We are not a franchise. We are not in a hurry.
            </p>
            <p className="about-text-item">
              Our baristas train for months before serving a single espresso.
              Our pastries arrive before dawn. Our music is always at the
              perfect volume. This is what we mean by hospitality.
            </p>
          </div>

          <a
            href="#experience"
            className="about-text-item mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)] transition-opacity hover:opacity-70"
          >
            <span>Discover Our Process</span>
            <span className="h-px w-8 bg-[color:var(--gold)]" />
          </a>
        </div>
      </div>
    </section>
  )
}
