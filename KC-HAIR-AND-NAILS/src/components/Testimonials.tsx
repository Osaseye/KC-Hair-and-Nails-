import { Quote, Star } from 'lucide-react'
import SectionTitle from './SectionTitle'

const testimonials = [
  {
    quote: 'Absolutely gorgeous nails and friendly service. I always leave feeling confident and polished.',
    author: 'Arielle M.',
    service: 'Nails',
  },
  {
    quote: 'The braids came out perfect. The stylist was precise and the salon atmosphere was very premium.',
    author: 'Samantha R.',
    service: 'Braids',
  },
  {
    quote: 'My wig looks natural and flawless. I will definitely book again for future styles.',
    author: 'Chloe N.',
    service: 'Wig styling',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow="Testimonials"
          title="What clients love about KC Hair & Nails"
          subtitle="Real feedback from guests who trust us for premium beauty results."
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col rounded-[2rem] border border-white/10 bg-black/70 p-8 shadow-2xl shadow-slate-900/20"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-[var(--color-accent)]/50" />
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  ))}
                </div>
              </div>

              <p className="mt-5 flex-1 leading-relaxed text-slate-300">“{testimonial.quote}”</p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}