import { reviews } from '../data/reviews'
import { site } from '../data/site'

const Stars = () => <span className="stars" role="img" aria-label="Оценка: 5 из 5">★★★★★</span>

export default function Reviews() {
  const [main, ...rest] = reviews
  return (
    <section id="reviews" className="section reviews" aria-labelledby="rev-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Отзывы</p>
          <h2 id="rev-title">Слова клиентов</h2>
        </header>
        <div className="rev-grid">
          <figure className="quote quote--main reveal">
            <Stars />
            <blockquote>{main.text.map((t, i) => <p key={i}>{t}</p>)}</blockquote>
            <figcaption>{main.author}</figcaption>
          </figure>
          {rest.map(r => (
            <figure key={r.author} className="quote reveal">
              <Stars />
              <blockquote>{r.text.map((t, i) => <p key={i}>{t}</p>)}</blockquote>
              <figcaption>{r.author}</figcaption>
            </figure>
          ))}
        </div>
        <p className="muted small">Отзывы с Яндекс Карт.{' '}
          {site.yandexMapsUrl && <a className="link" href={site.yandexMapsUrl} target="_blank" rel="noopener noreferrer">Читать на Яндекс Картах</a>}
        </p>
      </div>
    </section>
  )
}
