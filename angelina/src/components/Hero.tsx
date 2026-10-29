import { BookButton } from './Button'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="pearl pearl--hero" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Beauty Studio · Angelina</p>
          <h1 id="hero-title">Красота, в&nbsp;которой вы&nbsp;— <em>главная</em></h1>
          <p className="hero__lead">Уход за волосами, ногтями и лицом в атмосфере комфорта и внимания к деталям.</p>
          <div className="hero__actions">
            <BookButton>Записаться на услугу</BookButton>
            <a className="link" href="#gallery">Посмотреть работы</a>
          </div>
        </div>
        <div className="hero__art">
          <div className="arch"><img src="/gallery/hair-long.webp" alt="Светлые длинные волосы на фоне перламутровой стены салона" width="960" height="1280" fetchPriority="high" /></div>
          <div className="orb"><img src="/gallery/nails-1-sm.webp" alt="Маникюр с розовым акцентом" width="520" height="693" /></div>
          <svg className="ring" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth=".6" /></svg>
        </div>
      </div>
    </section>
  )
}
