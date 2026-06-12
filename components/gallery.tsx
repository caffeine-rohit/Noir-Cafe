'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const items = [
  {
    src: '/images/grid-1.jpeg',
    alt: 'Dark wooden cafe seating beneath a single warm pendant light',
    label: 'The Room',
    caption: 'Designed for stillness',
  },
  {
    src: '/images/grid-2.jpeg',
    alt: 'Hands holding a ceramic coffee cup over a dark table',
    label: 'The Ritual',
    caption: 'Every morning, intentional',
  },
  {
    src: '/images/grid-3.jpeg',
    alt: 'A polished espresso machine with steam in a dark cafe',
    label: 'The Craft',
    caption: 'Precision in every pull',
  },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const galleryItems = sectionRef.current?.querySelectorAll('.gallery-item') ?? []

        // Prime GPU layers
        gsap.set(galleryItems, { opacity: 0, y: 50, force3D: true, willChange: 'transform, opacity' })

        // Staggered entrance
        gsap.to(galleryItems, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        })

        // Smooth parallax — different speeds per column, higher scrub = less jitter
        const speeds = [-28, -55, -40]
        galleryItems.forEach((col, i) => {
          gsap.to(col, {
            y: speeds[i],
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        })
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="overflow-hidden">
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
        <div className="mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
        <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          The Atmosphere
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`gallery-item group relative overflow-hidden ${i === 1 ? 'md:mt-12' : i === 2 ? 'md:mt-6' : ''
              }`}
            style={{ aspectRatio: i === 0 ? '3/4' : i === 1 ? '3/5' : '3/4' }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="translate-y-4 font-serif text-2xl italic text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.label}
              </span>
              <span className="translate-y-4 mt-1 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)] opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            </div>

            <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[color:var(--gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
          </div>
        ))}
      </div>
    </section>
  )
}
