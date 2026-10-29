import { site } from '../data/site'
import { BookButton } from './Button'

const dev = import.meta.env.DEV

export default function Contacts() {
  const rows: { label: string; node: React.ReactNode | null }[] = [
    { label: 'Адрес', node: site.address },
    { label: 'Телефон', node: site.phone && <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a> },
    { label: 'График работы', node: site.hours },
    { label: 'Яндекс Карты', node: site.yandexMapsUrl && <a href={site.yandexMapsUrl} target="_blank" rel="noopener noreferrer">Открыть на карте</a> },
    { label: 'Мы в сети', node: site.socials.length ? site.socials.map(s => <a key={s.href} className="inline" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>) : null },
  ]
  const filled = rows.filter(r => r.node)
  return (
    <section id="contacts" className="section contacts" aria-labelledby="c-title">
      <div className="wrap contacts__grid">
        <div className="reveal">
          <p className="eyebrow">Контакты</p>
          <h2 id="c-title">Ждём вас<br />в&nbsp;«Ангелине»</h2>
          <BookButton>Записаться</BookButton>
        </div>
        <dl className="contacts__list reveal">
          <div><dt>Салон</dt><dd>Ангелина — Beauty Studio</dd></div>
          {filled.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{r.node}</dd></div>)}
          {dev && rows.filter(r => !r.node).map(r => <div key={r.label} className="todo"><dt>{r.label}</dt><dd>заполнить в src/data/site.ts (в проде скрыто)</dd></div>)}
        </dl>
      </div>
    </section>
  )
}
