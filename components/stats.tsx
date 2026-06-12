'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once, globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Global GSAP defaults for GPU-accelerated smoothness
  gsap.config({ force3D: true })
  ScrollTrigger.config({ ignoreMobileResize: true })
}

const stats = [
  { value: 5,   suffix: '+',  label: 'Years of Craft' },
  { value: 12,  suffix: '',   label: 'Single-Origin Beans' },
  { value: 50,  suffix: 'K+', label: 'Cups Served' },
  { value: 4.9, suffix: '★',  label: 'Google Rating', isDecimal: true },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Wait for full layout paint before setting up ScrollTrigger
    // This prevents mis-measurement of positions on first load
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const counters = sectionRef.current?.querySelectorAll('.stat-counter')
        if (!counters) return

        counters.forEach((counter) => {
          const target  = parseFloat(counter.getAttribute('data-target') || '0')
          const suffix  = counter.getAttribute('data-suffix') || ''
          const isDec   = counter.getAttribute('data-decimal') === 'true'
          const obj     = { val: 0 }

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 85%',   // slightly lower threshold so it doesn't fire prematurely
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  counter.textContent =
                    (isDec ? obj.val.toFixed(1) : Math.floor(obj.val)) + suffix
                },
              })
            },
          })
        })

        // Stat items reveal
        gsap.fromTo(
          sectionRef.current?.querySelectorAll('.stat-item') ?? [],
          { opacity: 0, y: 30, willChange: 'transform, opacity' },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'willChange',   // clean up after animation
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-border/60 bg-[#0a0a0a] py-16"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-12 px-6 md:grid-cols-4 md:px-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="stat-item flex flex-col items-center gap-2 text-center"
            style={{ opacity: 0 }}   // inline style so SSR doesn't flash
          >
            <span
              className="counter-number stat-counter font-serif text-4xl italic text-[color:var(--gold)] md:text-5xl"
              data-target={s.value}
              data-suffix={s.suffix}
              data-decimal={s.isDecimal ? 'true' : 'false'}
            >
              0{s.suffix}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
