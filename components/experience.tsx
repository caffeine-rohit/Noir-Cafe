'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'The Source',
    subtitle: 'Kenyan Highlands, 1,700m',
    body: 'We travel to the Nyeri and Kirinyaga highlands every harvest season, cup dozens of lots, and select only the beans that make us stop and close our eyes. Altitude, volcanic soil, and careful processing create a cup no other origin can replicate.',
    detail: 'Washed Process · AA Grade · Altitude 1,700–2,100m',
  },
  {
    number: '02',
    title: 'The Roast',
    subtitle: 'In-house · Small Batch',
    body: 'Our head roaster, trained in Oslo and Copenhagen, approaches every batch as a conversation with the green bean. We roast to a light-medium profile that preserves the fruit and clarity of the origin, never masking it with darkness.',
    detail: 'Weekly Fresh Roast · Profile-matched per origin',
  },
  {
    number: '03',
    title: 'The Pour',
    subtitle: 'Every Cup, by Hand',
    body: 'Each espresso is dialed in fresh each morning. Each pour-over is weighed to the gram. Our baristas do not multitask during extraction — they are present, quiet, and precise. The result is a cup that is never quite the same, and always exactly right.',
    detail: '±0.1g dose precision · 93°C extraction',
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const panels = track.querySelectorAll('.exp-panel')
      const totalWidth = (panels.length - 1) * (window.innerWidth * 0.85)

      // Pin and scroll horizontally
      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Each panel content fades in as it slides into view
      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel.querySelectorAll('.exp-content'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById('exp-scroll') as gsap.core.Tween,
              start: 'left 80%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="h-panel-container relative overflow-hidden">
      {/* Heading — visible above the horizontal track */}
      <div className="absolute left-0 right-0 top-12 z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
            <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              From Seed to<br />
              <em>Your Cup</em>
            </h2>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.4em] text-muted-foreground md:block">
            Scroll to explore →
          </span>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex h-screen w-max items-center pt-32"
        style={{ gap: '0' }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="exp-panel relative flex h-full w-[85vw] flex-shrink-0 items-center justify-center border-r border-border/30 last:border-r-0 md:w-[70vw] lg:w-[55vw]"
          >
            {/* Large background number */}
            <span className="exp-content absolute right-8 top-1/2 -translate-y-1/2 font-serif text-[20rem] leading-none text-white/[0.03] select-none opacity-0">
              {step.number}
            </span>

            {/* Content */}
            <div className="relative z-10 max-w-md px-12 md:px-16">
              <p className="exp-content mb-6 text-xs uppercase tracking-[0.5em] text-[color:var(--gold)] opacity-0">
                {step.number} / {steps.length.toString().padStart(2, '0')}
              </p>
              <h3 className="exp-content font-serif text-5xl italic leading-tight text-foreground opacity-0 md:text-6xl">
                {step.title}
              </h3>
              <p className="exp-content mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground opacity-0">
                {step.subtitle}
              </p>
              <p className="exp-content mt-8 text-[0.95rem] leading-relaxed text-muted-foreground opacity-0">
                {step.body}
              </p>
              <div className="exp-content mt-8 border-t border-border/60 pt-6 opacity-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]/70">
                  {step.detail}
                </p>
              </div>
            </div>

            {/* Vertical step number on left edge */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs uppercase tracking-[0.5em] text-muted-foreground/40">
              Step {step.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
