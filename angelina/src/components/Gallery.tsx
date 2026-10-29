import { useEffect, useMemo, useRef, useState } from 'react'
import { gallery, galleryLabels, type GalleryCategory } from '../data/gallery'

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all')
  const [current, setCurrent] = useState<number | null>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const cats = useMemo(() => (Object.keys(galleryLabels) as GalleryCategory[]).filter(c => gallery.some(g => g.category === c)), [])
  const items = filter === 'all' ? gallery : gallery.filter(g => g.category === filter)

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (current !== null && !d.open) d.showModal()
    if (current === null && d.open) d.close()
  }, [current])

  const open = (i: number, el: HTMLElement) => { lastFocus.current = el; setCurrent(i) }
  const close = () => { setCurrent(null); lastFocus.current?.focus() }
  const step = (d: number) => setCurrent(c => c === null ? c : (c + d + items.length) % items.length)
  const item = current !== null ? items[current] : null

  return (
    <section id="gallery" className="section gallery">
      <div className="wrap">
        <header className="section__head section__head--row reveal">
          <div><p className="eyebrow">Галерея</p><h2>Пространство и&nbsp;работы</h2></div>
          {cats.length > 1 && (
            <div className="filters" role="group" aria-label="Фильтр галереи">
              {(['all', ...cats] as const).map(c => (
                <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c === 'all' ? 'Все' : galleryLabels[c]}</button>
              ))}
            </div>
          )}
        </header>
        <ul className="mosaic">
          {items.map((g, i) => (
            <li key={g.src} className="tile">
              <button onClick={e => open(i, e.currentTarget)} aria-label={`Открыть фото крупнее: ${g.alt}`}>
                <img src={`/gallery/${g.src}-sm.webp`} alt={g.alt} loading="lazy" width={520} height={Math.round(520 * g.h / g.w)} />
              </button>
            </li>
          ))}
        </ul>
        <p className="muted small">Часть фотографий интерьера — визуализации пространства.</p>
      </div>

      <dialog ref={dlg} className="lightbox" aria-label="Просмотр фотографии" onClose={() => setCurrent(null)}
        onClick={e => { if (e.target === dlg.current) close() }}
        onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}>
        {item && (
          <figure>
            <img src={`/gallery/${item.src}.webp`} alt={item.alt} />
            <figcaption>{item.alt} · {current! + 1} / {items.length}</figcaption>
          </figure>
        )}
        <button className="lb lb--close" onClick={close} aria-label="Закрыть">×</button>
        {items.length > 1 && <>
          <button className="lb lb--prev" onClick={() => step(-1)} aria-label="Предыдущее фото">‹</button>
          <button className="lb lb--next" onClick={() => step(1)} aria-label="Следующее фото">›</button>
        </>}
      </dialog>
    </section>
  )
}
