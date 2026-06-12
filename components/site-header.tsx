'use client'

import { useEffect, useRef, useState } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route hash change
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Atmosphere', href: '#gallery' },
    { label: 'The Craft', href: '#experience' },
    { label: 'Menu', href: '#menu' },
    { label: 'Visit', href: '#visit' },
    { label: 'Reserve', href: '#reserve' },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20'
            : ''
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-xl tracking-[0.3em] text-foreground transition-opacity hover:opacity-70"
          >
            NOIR
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            {navLinks.slice(0, 4).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative transition-colors hover:text-foreground group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Reserve CTA + hamburger */}
          <div className="flex items-center gap-6">
            <a
              href="#reserve"
              className="hidden text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] transition-opacity hover:opacity-70 md:block"
            >
              Reserve
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[8px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[8px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <span className="mb-8 font-serif text-4xl tracking-[0.4em] text-[color:var(--gold)]">
          NOIR
        </span>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-serif text-3xl italic text-foreground transition-opacity hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Westlands, Nairobi — Est. 2019
        </p>
      </div>
    </>
  )
}
