import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'

const MotionLink = motion(Link)

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const isBookingPage = pathname === '/booking'
  const ctaText = isBookingPage ? 'Home' : 'Book Now'
  const ctaLink = isBookingPage ? '/' : '/booking'

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 z-50 w-full bg-transparent px-6 py-4 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/brand.png"
            alt="KC Hair and Nails logo"
            className="h-16 w-16 object-contain"
          />
        </a>

        <nav className="hidden items-center gap-0 rounded-full bg-white/10 px-3 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex">
          {navItems.map((item, index) => (
            <MotionLink
              key={item.href}
              to={item.href}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-[0.15em] text-white transition duration-200 hover:text-pink-300 ${
                index > 0 ? 'border-l border-white/10' : ''
              }`}
            >
              {item.label}
            </MotionLink>
          ))}
        </nav>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button to={ctaLink}>{ctaText}</Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
