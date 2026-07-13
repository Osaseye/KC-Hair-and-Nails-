import SectionTitle from './SectionTitle'

export default function AboutSection() {
  return (
    <section id="about" className="bg-black py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center md:px-8">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl shadow-pink-500/10 backdrop-blur-xl">
          <img src="/brand.png" alt="KC Hair and Nails logo" className="h-28 w-28 object-contain" />
        </div>

        <div className="space-y-6 max-w-3xl">
          <SectionTitle
            eyebrow="About"
            title="KC Hair & Nails: polish, precision, and premium care"
            subtitle="We make every appointment feel luxurious, simple, and tailored to your beauty goals."
          />
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Our studio specializes in modern hair styling, signature gel nails, braids, and custom wig ventilation. We keep our process clean, creative, and focused on results you can feel confident wearing.
          </p>
        </div>
      </div>
    </section>
  )
}
