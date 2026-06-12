'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Noir has become the only way I begin my mornings. The room is hushed, the coffee precise, and the welcome always warm.',
    name: 'Amara Wanjiru',
    detail: 'Regular since 2019',
    initials: 'AW',
    stars: 5,
  },
  {
    quote: 'It feels less like a cafe and more like a private study. Every detail is considered — this is hospitality as an art form.',
    name: 'David Otieno',
    detail: 'Writer & Journalist',
    initials: 'DO',
    stars: 5,
  },
  {
    quote: 'I have visited specialty cafes across four continents. Noir belongs in the same conversation as the world\'s best. Quietly extraordinary.',
    name: 'Priya Sharma',
    detail: 'Food & Travel Editor',
    initials: 'PS',
    stars: 5,
  },
  {
    quote: 'The pour-over alone is worth the trip. But it is the atmosphere — that deliberate stillness — that keeps me coming back.',
    name: 'Marcus Odhiambo',
    detail: 'Architect',
    initials: 'MO',
    stars: 5,
  },
  {
    quote: 'Everything here is intentional. The light, the music, the temperature of the room. The coffee is the punctuation mark on a perfect experience.',
    name: 'Celine Moreau',
    detail: 'Creative Director, Paris',
    initials: 'CM',
    stars: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const quoteRef = useRef<HTMLElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [current])

  const goTo = (idx: number) => {
    if (animating || idx === current) return
    setAnimating(true)
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx)
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => setAnimating(false),
          }
        )
      },
    })
  }

  const t = testimonials[current]

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-4xl px-6 py-28 text-center opacity-0 md:py-36"
    >
      {/* Large decorative quote mark */}
      <span
        aria-hidden="true"
        className="block font-serif text-[8rem] leading-[0.5] text-[color:var(--gold)]/20 md:text-[12rem]"
      >
        &ldquo;
      </span>

      {/* Testimonial */}
      <figure ref={quoteRef as React.RefObject<HTMLElement>} className="mt-8">
        {/* Stars */}
        <div className="stars mb-6 justify-center">
          {Array.from({ length: t.stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <blockquote className="font-serif text-2xl italic leading-snug text-foreground md:text-3xl lg:text-4xl">
          {t.quote}
        </blockquote>

        <figcaption className="mt-10 flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--gold)]/40 font-serif text-sm italic text-[color:var(--gold)]">
            {t.initials}
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
              {t.name}
            </span>
            <span className="text-muted-foreground"> — </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.detail}
            </span>
          </div>
        </figcaption>
      </figure>

      {/* Dots */}
      <div className="mt-12 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-px transition-all duration-300 ${
              i === current
                ? 'w-8 bg-[color:var(--gold)]'
                : 'w-4 bg-muted-foreground/40 hover:bg-muted-foreground'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
