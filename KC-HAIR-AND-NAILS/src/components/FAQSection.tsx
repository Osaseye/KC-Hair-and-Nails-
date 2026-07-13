import type { ReactElement } from 'react'
import { useState } from 'react'
import { ChevronDown, CalendarCheck, Heart, Home, Sparkles } from 'lucide-react'
import SectionTitle from './SectionTitle'

type FAQItem = {
  question: string
  answer: string
  icon: (props: { className?: string }) => ReactElement
}

const faqs: FAQItem[] = [
  {
    question: 'How do home appointments work (and what do you bring)?',
    answer:
      'We come to you with everything needed for a polished hair and nail finish. Just set up a clean, well-lit seating spot and a small workspace for nails if you’re booking a manicure.',
    icon: (props) => <Home className={props.className} />,
  },
  {
    question: 'Do you offer hair + nails in the same visit?',
    answer:
      'Yes. If your timing works, we can coordinate hair styling and nail services into one appointment at your home—so you get a complete, salon-quality look in one session.',
    icon: (props) => <Sparkles className={props.className} />,
  },
  {
    question: 'What should I prepare before KC Hair & Nails arrives?',
    answer:
      'Bring reference photos for your preferred look and make sure there’s good lighting. For nails, a table/desk area is perfect. We’ll handle the rest so you can relax while we style.',
    icon: (props) => <Heart className={props.className} />,
  },
  {
    question: 'What if I need to reschedule or cancel?',
    answer:
      'Please share changes as soon as possible (ideally 24 hours notice). Message or call us and we’ll arrange a new time window that fits your schedule—keeping our mobile route running smoothly.',
    icon: (props) => <CalendarCheck className={props.className} />,
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-[var(--color-background)] py-24 text-[var(--color-primary)]">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <SectionTitle
          eyebrow="FAQ"
          title="Find answers for our mobile styling experience"
          subtitle="Clear, salon-specific guidance for home appointments, booking, rescheduling, and what to expect when KC Hair & Nails comes to you."
        />

        <div className="divide-y divide-white/10 rounded-[2rem] border border-[var(--color-accent)]/15 bg-black/45 shadow-[0_0_30px_rgba(236,64,122,0.08)]">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {item.icon({ className: 'h-4 w-4' })}
                  </span>
                  <p className="flex-1 text-base font-semibold text-white">{item.question}</p>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--color-accent)]' : 'text-[var(--color-secondary)]'
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pl-19 text-sm leading-relaxed text-[var(--color-primary)]/80 md:pl-[4.25rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}