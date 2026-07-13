type ServiceCardProps = {
  title: string
  description: string
  icon: string
  features: string[]
  index: number
}

export default function ServiceCard({ title, description, icon, features, index }: ServiceCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-900/20 transition duration-300 hover:-translate-y-1 hover:border-pink-400 hover:bg-white/10">
      <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-black/70 border border-white/10 backdrop-blur-xl">
            <img src={icon} alt={`${title} icon`} className="h-12 w-12 object-contain" />
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-pink-200">
            {index < 10 ? `0${index}` : index}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-slate-200">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-pink-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
