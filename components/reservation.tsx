'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reserve-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="grain relative border-t border-border/40 bg-[#080808] py-28 md:py-40"
    >
      <div className="grain-overlay" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:px-10 lg:gap-32">
        {/* Left — info */}
        <div>
          <div className="reserve-item mb-3 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent opacity-0" />
          <h2 className="reserve-item font-serif text-4xl italic leading-tight text-foreground opacity-0 md:text-5xl lg:text-6xl">
            Reserve<br />Your Table
          </h2>
          <p className="reserve-item mt-6 text-[0.95rem] leading-relaxed text-muted-foreground opacity-0">
            We offer a limited number of reservations each day to ensure every
            guest receives our full attention. Walk-ins are always welcome,
            but a table held for you ensures the morning is entirely yours.
          </p>

          <div className="reserve-item mt-12 space-y-8 opacity-0">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Hours
              </p>
              <p className="text-sm text-muted-foreground">Monday – Friday: 6:30 AM – 8:00 PM</p>
              <p className="text-sm text-muted-foreground">Saturday – Sunday: 7:00 AM – 9:00 PM</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Location
              </p>
              <a
                href="https://maps.google.com/?q=Westlands,+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
              >
                Westlands, Nairobi, Kenya →
              </a>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Telephone
              </p>
              <a
                href="tel:+254700000000"
                className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
              >
                +254 700 000 000
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="reserve-item opacity-0">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <span className="font-serif text-6xl italic text-[color:var(--gold)]">✓</span>
              <h3 className="font-serif text-3xl text-foreground">Your table is held.</h3>
              <p className="text-sm text-muted-foreground">
                We will send a confirmation to {form.email} shortly.
                We look forward to welcoming you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="noir-input"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="noir-input"
                  />
                </div>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="noir-input"
                  style={{ colorScheme: 'dark' }}
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="noir-input"
                  style={{ colorScheme: 'dark' }}
                />
                <div className="col-span-2">
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="noir-input appearance-none"
                    style={{ background: 'transparent' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} style={{ background: '#0d0d0d' }}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <textarea
                    name="message"
                    placeholder="Special Requests (optional)"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="noir-input resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full border border-[color:var(--gold)] py-4 text-xs uppercase tracking-[0.35em] text-[color:var(--gold)] transition-all duration-400 hover:bg-[color:var(--gold)] hover:text-background hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
