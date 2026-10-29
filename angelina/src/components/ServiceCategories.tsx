import { categories } from '../data/services'
import { openBooking } from '../lib/booking'

export default function ServiceCategories() {
  return (
    <section className="section directions" aria-labelledby="dir-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Направления</p>
          <h2 id="dir-title">Четыре&nbsp;способа позаботиться о&nbsp;себе</h2>
        </header>
        <div className="dir-grid">
          {categories.map((c, i) => (
            <article key={c.id} className={`dir dir--${i + 1} reveal`}>
              <div className="dir__img">
                <img src={`${c.image}-sm.webp`} alt="" loading="lazy" width="520" height="693" />
              </div>
              <div className="dir__body">
                <span className="dir__n" aria-hidden="true">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.lead}</p>
                <div className="dir__links">
                  <a className="link" href="#prices" onClick={() => window.dispatchEvent(new CustomEvent('catalog:tab', { detail: c.id }))}>Услуги и цены</a>
                  <button className="link link--btn" onClick={() => openBooking({ category: c.id })}>Записаться</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
