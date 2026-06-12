'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function VisitUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Image scale-in from slightly zoomed (Ken Burns entrance)
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            clearProps: 'willChange',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )

        // Content stagger
        gsap.fromTo(
          '.visit-item',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )

        // Subtle parallax on the inner image (prevents transform conflict with the scale animation)
        gsap.to(imageInnerRef.current, {
          y: -80,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden"
    >
      {/* Full-bleed image with overlay */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <div 
          ref={imageInnerRef}
          className="absolute inset-0 -top-[10%] h-[120%] w-full"
          style={{ willChange: 'transform' }}
        >
          <Image
            src="/images/Cafe-exterior.jpeg"
            alt="Noir Coffee exterior — a premium cafe facade in Westlands, Nairobi"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Multi-layer gradient for depth — dark on bottom, lighter in middle */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />
        <div className="grain-overlay pointer-events-none" />
      </div>

      {/* Floating content card — natural document flow over the image */}
      <div className="relative z-10 w-full pt-[45vh] md:pt-[30vh]">
        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
          <div
            ref={contentRef}
            className="grid gap-10 md:grid-cols-[1fr_auto]"
          >
            {/* Left — address & story */}
            <div>
              <div className="visit-item mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" style={{ opacity: 0 }} />
              <p className="visit-item text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]" style={{ opacity: 0 }}>
                Find Us
              </p>
              <h2 className="visit-item mt-3 font-serif text-4xl italic leading-tight text-foreground sm:text-5xl lg:text-6xl" style={{ opacity: 0 }}>
                Come as you are.<br />
                <em>Leave transformed.</em>
              </h2>
              <p className="visit-item mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground" style={{ opacity: 0 }}>
                Nestled in the heart of Westlands, our doors open before the
                rest of the world wakes. Step inside and let the city
                disappear — one cup at a time.
              </p>
            </div>

            {/* Right — info pills */}
            <div className="visit-item flex flex-col justify-end gap-6" style={{ opacity: 0 }}>
              {/* Hours */}
              <div className="border border-border/40 bg-background/60 p-6 backdrop-blur-md" style={{ minWidth: '220px' }}>
                <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[color:var(--gold)]">
                  Hours
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-8">
                    <span>Mon – Fri</span>
                    <span className="text-foreground">6:30 – 20:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sat – Sun</span>
                    <span className="text-foreground">7:00 – 21:00</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="border border-border/40 bg-background/60 p-6 backdrop-blur-md">
                <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[color:var(--gold)]">
                  Location
                </p>
                <a
                  href="https://maps.google.com/?q=Westlands,+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
                >
                  <span>Westlands, Nairobi, Kenya</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="tel:+254700000000"
                  className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
                >
                  +254 700 000 000
                </a>
              </div>

              {/* CTA */}
              <a
                href="#reserve"
                className="block border border-[color:var(--gold)] px-8 py-4 text-center text-xs uppercase tracking-[0.35em] text-[color:var(--gold)] transition-all duration-400 hover:bg-[color:var(--gold)] hover:text-background hover:shadow-[0_0_40px_rgba(201,169,110,0.2)]"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
