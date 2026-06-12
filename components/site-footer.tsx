const footerNav = [
  { label: 'About', href: '#about' },
  { label: 'Atmosphere', href: '#gallery' },
  { label: 'The Craft', href: '#experience' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit Us', href: '#visit' },
  { label: 'Reserve', href: '#reserve' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'TikTok', href: '#' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-[#060606] px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top grid */}
        <div className="grid gap-14 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-3xl tracking-[0.4em] text-foreground">NOIR</span>
            <p className="mt-4 max-w-[180px] text-xs leading-relaxed text-muted-foreground">
              Where every morning begins. Westlands, Nairobi — Est. 2019.
            </p>
            <div className="mt-6 h-px w-10 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Find Us
            </p>
            <div className="flex flex-col gap-4 text-xs text-muted-foreground">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-foreground/50">Hours</p>
                <p>Mon – Fri: 6:30 – 20:00</p>
                <p>Sat – Sun: 7:00 – 21:00</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-foreground/50">Address</p>
                <a
                  href="https://maps.google.com/?q=Westlands,+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--gold)]"
                >
                  Westlands, Nairobi<br />Kenya
                </a>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-foreground/50">Phone</p>
                <a
                  href="tel:+254700000000"
                  className="transition-colors hover:text-[color:var(--gold)]"
                >
                  +254 700 000 000
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter + Social */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Stay Close
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mb-8 flex items-end gap-3"
            >
              <input
                type="email"
                placeholder="Your email"
                className="noir-input flex-1 text-xs"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-[color:var(--gold)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)] hover:text-background"
              >
                Join
              </button>
            </form>

            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 h-px bg-border/40" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Noir Coffee. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-[color:var(--gold)]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[color:var(--gold)]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
