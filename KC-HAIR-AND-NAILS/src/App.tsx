import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import BookingPage from './components/BookingPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <Hero />
                <AboutSection />
                <Services />
                <Gallery />
                <Testimonials />
                <FAQSection />
                <ContactSection />
              </motion.div>
            }
          />
          <Route
            path="/booking"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <BookingPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
