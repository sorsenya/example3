import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ServiceCategories from './components/ServiceCategories'
import ServicesCatalog from './components/ServicesCatalog'
import Gallery from './components/Gallery'
import About from './components/About'
import Reviews from './components/Reviews'
import BookingForm from './components/BookingForm'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'

export default function App() {
  // Плавное появление секций (в CSS отключается при prefers-reduced-motion)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip" href="#main">К содержимому</a>
      <Header />
      <main id="main">
        <Hero />
        <ServiceCategories />
        <ServicesCatalog />
        <Gallery />
        <About />
        <Reviews />
        <BookingForm />
        <Contacts />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
