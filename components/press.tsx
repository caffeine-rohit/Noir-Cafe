'use client'

const mentions = [
  { text: 'Best Café in Nairobi 2024', source: 'TimeOut Nairobi' },
  { text: 'Top 10 African Specialty Coffee', source: 'Condé Nast Traveller' },
  { text: 'A Café That Could Hold Its Own in Tokyo', source: 'The Coffee Wanderer' },
  { text: 'Where Nairobi\'s Creatives Begin Their Day', source: 'Business Daily Africa' },
  { text: 'Specialty Coffee Excellence Award 2023', source: 'Barista Magazine' },
  { text: 'One of Africa\'s Most Refined Café Experiences', source: 'Monocle' },
]

export function Press() {
  // Double for seamless loop
  const doubled = [...mentions, ...mentions]

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-[#090909] py-5">
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#090909] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#090909] to-transparent" />

      <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
        {doubled.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-8"
          >
            <span className="font-serif text-sm italic text-foreground/70">
              &ldquo;{m.text}&rdquo;
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]/60">
              — {m.source}
            </span>
            <span className="text-[color:var(--gold)]/30">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
