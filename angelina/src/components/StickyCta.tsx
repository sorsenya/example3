import { useEffect, useState } from 'react'
import { BookButton } from './Button'

export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let past = false, hidden = false
    const upd = () => setShow(past && !hidden)
    const on = () => { past = window.scrollY > 600; upd() }
    on(); window.addEventListener('scroll', on, { passive: true })
    const io = new IntersectionObserver(es => { hidden = es.some(e => e.isIntersecting); upd() }, { threshold: 0.15 })
    const t = ['booking', 'contacts'].map(id => document.getElementById(id)).filter(Boolean) as Element[]
    t.forEach(e => io.observe(e))
    return () => { window.removeEventListener('scroll', on); io.disconnect() }
  }, [])
  return <div className={`sticky-cta ${show ? 'is-on' : ''}`} aria-hidden={!show}><BookButton className="btn--block">Записаться</BookButton></div>
}
