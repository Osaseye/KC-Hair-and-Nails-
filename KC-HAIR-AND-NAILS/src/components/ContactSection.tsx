import { Home, Mail, PhoneCall } from 'lucide-react'
import type { ReactNode } from 'react'
import SectionTitle from './SectionTitle'
import Button from './Button'

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <div className="mt-0.5 text-sm text-[var(--color-secondary)]">{children}</div>
      </div>
    </li>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-background)] py-24 text-[var(--color-primary)]">
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 overflow-hidden text-[var(--color-background)] opacity-90">
        <svg viewBox="0 0 1200 120" className="h-28 w-full">
          <path d="M0 28C240 90 480 0 720 36C960 72 1200 20 1200 20V120H0V28Z" />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-5xl px-6 md:px-8">
        <SectionTitle
          eyebrow="Contact"
          title="We come to you — book your appointment"
          subtitle="KC Hair & Nails offers home appointments and mobile styling. Tell us what you want, and we’ll coordinate a smooth schedule for London and nearby communities."
        />

        <div className=" bg-black/60 p-10 shadow-[0_0_30px_rgba(236,64,122,0.12)]">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Contact details + CTA */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">Schedule your KC visit</h3>
              <p className="mb-6 text-sm text-[var(--color-secondary)]">
                Message or call us to reserve your preferred time. We’ll confirm your home appointment
                and let you know how to prepare before we arrive.
              </p>

              <ul className="space-y-4 text-sm text-[var(--color-secondary)]">
                <ContactItem icon={<PhoneCall className="h-4 w-4" />} title="Phone">
                  <a className="transition hover:text-[var(--color-accent)]" href="tel:+4374106792">
                    +43 741 06792
                  </a>
                </ContactItem>

                <ContactItem icon={<Mail className="h-4 w-4" />} title="Email">
                  <a className="transition hover:text-[var(--color-accent)]" href="mailto:kchairandnails8@gmail.com">
                    kchairandnails8@gmail.com
                  </a>
                </ContactItem>

                <ContactItem icon={<Home className="h-4 w-4" />} title="Service area">
                  London, Ontario and surrounding neighborhoods.
                </ContactItem>
              </ul>

              <div className="mt-8">
                <Button to="/booking">Book Now</Button>
              </div>
            </div>

            {/* Hours — single source of truth, no contradicting copy elsewhere */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">Hours</h4>
              <div className="divide-y divide-white/10 rounded-2xl bg-white/5">
                <div className="flex justify-between px-4 py-3 text-sm text-[var(--color-secondary)]">
                  <span>Mon – Fri</span>
                  <span>10am – 7pm</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm text-[var(--color-secondary)]">
                  <span>Saturday</span>
                  <span>10am – 5pm</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm text-[var(--color-secondary)]/50">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--color-secondary)]">
                Choose hair, nails, or both when you book — we’ll plan the arrival window and timing around your service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}