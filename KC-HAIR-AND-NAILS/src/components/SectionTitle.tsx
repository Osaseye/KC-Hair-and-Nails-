type SectionTitleProps = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 max-w-3xl text-center md:text-left">
      {eyebrow ? <p className="text-pink-300 uppercase tracking-[0.4em] text-sm mb-3">{eyebrow}</p> : null}
      <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">{title}</h2>
      {subtitle ? <p className="mt-4 text-slate-300 text-base md:text-lg">{subtitle}</p> : null}
    </div>
  )
}
