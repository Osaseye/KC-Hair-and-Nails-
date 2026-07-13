import SectionTitle from './SectionTitle'
import ServiceCard from './ServiceCard'
import hairIcon from '../assets/icons8-woman\'s-hair-48.png'
import nailIcon from '../assets/icons8-nails-48.png'
import wigIcon from '../assets/icons8-hair-100.png'

const services = [
  {
    title: 'Hair Making',
    description: 'Expert braids, weaves, and protective styles finished with flawless technique.',
    icon: hairIcon,
    features: ['Custom parts & edges', 'Soft, natural finish', 'Protective styling']
  },
  {
    title: 'Gel Nails',
    description: 'Polished gel manicures with refined color, nail art, and long-lasting shine.',
    icon: nailIcon,
    features: ['Glossy finishes', 'Detailed nail art', 'Durable comfort']
  },
  {
    title: 'Wig Ventilation',
    description: 'High-quality lace ventilation for seamless wigs and natural hairline detail.',
    icon: wigIcon,
    features: ['Precision hand-knotting', 'Natural scalp appearance', 'Custom lace install']
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow="Services"
          title="Styled services that feel personal and polished"
          subtitle="We use refined salon technique and clear service structure to make booking simple and the results unforgettable."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index + 1} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
