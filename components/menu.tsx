'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const categories = ['All', 'Coffee', 'Cold Brew', 'Food']

const cards = [
  {
    src: '/images/menu-1.jpg',
    name: 'Pour Over',
    desc: 'Single-origin Kenyan beans, brewed by hand to reveal bright, floral notes. The purist\'s choice.',
    price: 'KSh 450',
    category: 'Coffee',
  },
  {
    src: '/images/menu-2.png',
    name: 'Flat White & Pastry',
    desc: 'A velvet double ristretto with steamed milk, paired with a daily house-made pastry.',
    price: 'KSh 650',
    category: 'Food',
  },
  {
    src: '/images/menu-3.png',
    name: 'Cold Brew Noir',
    desc: 'Steeped for eighteen hours over ice — deep, smooth, and quietly intense.',
    price: 'KSh 550',
    category: 'Cold Brew',
  },
  {
    src: '/images/menu-1.png',
    name: 'Espresso Noir',
    desc: 'A single concentrated shot — intense, syrupy, with a hazelnut-dark chocolate finish.',
    price: 'KSh 350',
    category: 'Coffee',
  },
  {
    src: '/images/menu-2.png',
    name: 'Matcha Ceremony',
    desc: 'Ceremonial-grade matcha whisked with oat milk. Calm in a cup. Served with intention.',
    price: 'KSh 600',
    category: 'Coffee',
  },
  {
    src: '/images/menu-3.png',
    name: 'Signature Toast',
    desc: 'Toasted sourdough, whipped ricotta, fig preserve, and house honey — a morning ritual.',
    price: 'KSh 480',
    category: 'Food',
  },
]

export function Menu() {
  const [active, setActive] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'All' ? cards : cards.filter((c) => c.category === active)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const headings = sectionRef.current?.querySelectorAll('.menu-heading') ?? []
        gsap.set(headings, { opacity: 0, y: 30, force3D: true, willChange: 'transform, opacity' })
        gsap.to(headings, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'willChange,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const menuCards = scrollRef.current?.querySelectorAll('.menu-card')
    if (!menuCards) return
    gsap.set(menuCards, { opacity: 0, x: 30, force3D: true })
    gsap.to(menuCards, {
      opacity: 1,
      x: 0,
      stagger: 0.07,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform',
    })
  }, [active])

  return (
    <section ref={sectionRef} id="menu" className="py-24 md:py-32">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-6 md:px-10">
        <div className="menu-heading mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="menu-heading font-serif text-4xl leading-tight text-foreground md:text-5xl">
            The Menu
          </h2>

          {/* Filter row */}
          <div className="menu-heading flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable cards — native scroll, no scrollbar shown */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-10"
        style={{ cursor: 'grab' }}
      >
        {filtered.map((card) => (
          <article
            key={card.name}
            className="menu-card group relative flex h-[70vh] w-[80vw] flex-none snap-center flex-col justify-end overflow-hidden sm:w-[60vw] md:w-[38vw] lg:w-[28vw]"
            style={{ borderRadius: '2px' }}
          >
            <Image
              src={card.src}
              alt={card.name}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 30vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
            {/* Category chip */}
            <div className="absolute left-6 top-6 rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] backdrop-blur-sm">
              {card.category}
            </div>
            {/* Text */}
            <div className="relative z-10 p-8">
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl italic text-foreground md:text-3xl">
                  {card.name}
                </h3>
                <span className="shrink-0 text-sm tracking-widest text-[color:var(--gold)]">
                  {card.price}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* View full menu link */}
      <div className="mx-auto mt-8 max-w-7xl px-6 md:px-10">
        <a
          href="#"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)] transition-opacity hover:opacity-70"
        >
          <span>View Full Menu</span>
          <span className="h-px w-8 bg-[color:var(--gold)]" />
        </a>
      </div>
    </section>
  )
}
