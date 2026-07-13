import {  Mail, MapPin, PhoneCall } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--color-background)] text-[var(--color-primary)]">
      {/* single soft glow, not three */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden bg-black/40 p-2">
                <img src="/brand.png" alt="KC Hair & Nails logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">KC Hair & Nails</p>
                <p className="text-lg font-semibold text-[var(--color-secondary)]">We come to you</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-primary)]/70">
              Mobile hair and nail appointments, at your home or wherever suits you — no shop visit required.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Menu</p>
            <ul className="space-y-2.5 text-sm text-[var(--color-primary)]/70">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-[var(--color-accent)]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — one block, not two */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Get in touch</p>
            <ul className="space-y-3 text-sm text-[var(--color-primary)]/70">
              <li>
                <a href="tel:+4374106792" className="flex items-center gap-2.5 transition hover:text-[var(--color-accent)]">
                  <PhoneCall className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  +43 741 06792
                </a>
              </li>
              <li>
                <a
                  href="mailto:kchairandnails8@gmail.com"
                  className="flex items-center gap-2.5 transition hover:text-[var(--color-accent)]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  kchairandnails8@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                London, Ontario area
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[var(--color-primary)]/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} KC Hair & Nails. All rights reserved.</p>
          <p>Home appointment styling, made elegant.</p>
        </div>
      </div>
    </footer>
  )
}