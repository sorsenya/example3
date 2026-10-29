import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { BookButton } from './Button'

const nav = [
  { href: '#services', label: 'Услуги' }, { href: '#gallery', label: 'Галерея' },
  { href: '#about', label: 'О салоне' }, { href: '#reviews', label: 'Отзывы' }, { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`header ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar wrap">
        <a href="#top" aria-label="Ангелина — Beauty Studio, на главную" onClick={() => setOpen(false)}><Logo /></a>
        <nav id="nav" className="nav" aria-label="Основная навигация">
          {nav.map(n => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          <BookButton className="nav__cta">Записаться</BookButton>
        </nav>
        <button ref={btn} className="burger" aria-expanded={open} aria-controls="nav"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(o => !o)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
