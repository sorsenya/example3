import { useEffect, useRef, useState } from 'react'
import { categories, type Category } from '../data/services'
import { BookButton } from './Button'
import { openBooking } from '../lib/booking'

const LIMIT = 6

export default function ServicesCatalog() {
  const [active, setActive] = useState<Category['id']>('hair')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const cat = categories.find(c => c.id === active)!
  const isOpen = !!expanded[active]
  const shown = isOpen ? cat.items : cat.items.slice(0, LIMIT)

  useEffect(() => {
    const h = (e: Event) => setActive((e as CustomEvent<Category['id']>).detail)
    window.addEventListener('catalog:tab', h)
    return () => window.removeEventListener('catalog:tab', h)
  }, [])

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (i + d + categories.length) % categories.length
    setActive(categories[n].id); tabs.current[n]?.focus()
  }

  return (
    <section id="services" className="section catalog">
      <span id="prices" className="anchor" aria-hidden="true" />
      <div className="wrap catalog__grid">
        <header className="section__head reveal">
          <p className="eyebrow">Услуги и цены</p>
          <h2>Найдите нужную услугу</h2>
          <p className="muted">Там, где цена зависит от задачи, мы называем её при записи — без округлений «на глаз».</p>
        </header>
        <div className="catalog__main reveal">
          <div role="tablist" aria-label="Направления услуг" className="tabs">
            {categories.map((c, i) => (
              <button key={c.id} ref={el => { tabs.current[i] = el }} role="tab" id={`tab-${c.id}`}
                aria-selected={active === c.id} aria-controls="catalog-panel" tabIndex={active === c.id ? 0 : -1}
                onClick={() => setActive(c.id)} onKeyDown={e => onKey(e, i)}>{c.tab}</button>
            ))}
          </div>
          <div id="catalog-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="panel">
            <h3 className="panel__title">{cat.title}</h3>
            <ul className="rows">
              {shown.map(s => (
                <li key={s.name}>
                  <button className="row" onClick={() => openBooking({ category: cat.id, service: s.name })}
                    aria-label={`${s.name}${s.price ? `, ${s.price}` : ', стоимость уточняйте при записи'}. Выбрать для записи`}>
                    <span className="row__name">{s.name}</span>
                    <span className="row__dots" aria-hidden="true" />
                    {s.price ? <span className="row__price">{s.price}</span> : <span className="row__ask">уточняйте при записи</span>}
                  </button>
                </li>
              ))}
            </ul>
            <div className="panel__foot">
              {cat.items.length > LIMIT && (
                <button className="link link--btn" aria-expanded={isOpen}
                  onClick={() => setExpanded(x => ({ ...x, [active]: !x[active] }))}>
                  {isOpen ? 'Свернуть список' : `Показать все услуги (${cat.items.length})`}
                </button>
              )}
              <BookButton prefill={{ category: cat.id }}>Записаться: {cat.tab.toLowerCase()}</BookButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
