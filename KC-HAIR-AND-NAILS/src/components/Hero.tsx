import { motion } from 'framer-motion'
import Button from './Button'

export default function Hero() {
  const heroImage = new URL('../assets/hero.png', import.meta.url).href

  return (
    <section
      id="home"
      className="relative min-h-[100vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,113,184,0.18),_transparent_35%),linear-gradient(180deg,_rgba(0,0,0,0.55),_rgba(0,0,0,0.9))]" />
      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-6 py-28 text-center text-white md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-pink-200 shadow-lg shadow-pink-500/10 backdrop-blur-xl">
            Luxury hair & nail studio
          </span>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl" style={{ fontFamily: 'Great Vibes, cursive' }}>
            KC Hair & Nails
          </h1>

          <p className="max-w-2xl text-base text-slate-200 sm:text-lg md:text-xl">
            Experience bold salon beauty with premium nail art, signature hair making, and custom wig ventilation in a refined luxury studio.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
            className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button to="/booking">Book Appointment</Button>
            <Button variant="secondary" href="#services">
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
