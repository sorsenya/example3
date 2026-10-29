import { useEffect, useMemo, useState } from 'react'
import { categories } from '../data/services'
import { site } from '../data/site'
import { BOOKING_EVENT, type Prefill } from '../lib/booking'
import { NotConfiguredError, formatPhone, phoneDigits, submitLead } from '../lib/submitLead'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'
type Errors = Partial<Record<'name' | 'phone' | 'consent', string>>

export default function BookingForm() {
  const [v, setV] = useState({ name: '', phone: '', category: '', service: '', date: '', time: '', comment: '', consent: false, website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const services = useMemo(() => categories.find(c => c.id === v.category)?.items ?? [], [v.category])
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const h = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail
      if (p.category) setV(s => ({ ...s, category: p.category!, service: p.service ?? '' }))
    }
    window.addEventListener(BOOKING_EVENT, h)
    return () => window.removeEventListener(BOOKING_EVENT, h)
  }, [])

  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV(s => ({ ...s, [k]: val }))

  const validate = (): Errors => {
    const e: Errors = {}
    if (v.name.trim().length < 2) e.name = 'Укажите, как к вам обращаться'
    if (phoneDigits(v.phone).length !== 10) e.phone = 'Введите номер полностью: +7 (900) 000-00-00'
    if (!v.consent) e.consent = 'Нужно согласие на обработку персональных данных'
    return e
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate(); setErrors(e)
    if (Object.keys(e).length) { document.getElementById(`lead-${Object.keys(e)[0]}`)?.focus(); return }
    if (v.website) return // honeypot
    setStatus('sending')
    try {
      await submitLead({
        name: v.name.trim(), phone: '+7' + phoneDigits(v.phone),
        category: categories.find(c => c.id === v.category)?.title ?? '', service: v.service,
        date: v.date || undefined, time: v.time || undefined, comment: v.comment.trim() || undefined,
        consent: v.consent, source: 'angelina-site',
      })
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof NotConfiguredError ? 'unconfigured' : 'error')
    }
  }

  const sending = status === 'sending'
  const err = (k: keyof Errors) => errors[k] ? { 'aria-invalid': true, 'aria-describedby': `err-${k}` } : {}

  return (
    <section id="booking" className="section booking" aria-labelledby="book-title">
      <div className="pearl pearl--book" aria-hidden="true" />
      <div className="wrap booking__grid">
        <header className="booking__intro reveal">
          <p className="eyebrow">Запись</p>
          <h2 id="book-title">Оставьте заявку</h2>
          <p>Оставьте заявку, и мы свяжемся с вами, чтобы уточнить детали записи.</p>
          <p className="muted small">Это заявка, а не подтверждённая запись: время согласуем при звонке.</p>
        </header>

        {status === 'success' ? (
          <div className="form form--done reveal in" role="status">
            <h3>Заявка отправлена</h3>
            <p>Спасибо! Мы свяжемся с вами, чтобы уточнить детали записи.</p>
            <button className="link link--btn" onClick={() => { setStatus('idle'); setV(s => ({ ...s, comment: '', service: '' })) }}>Отправить ещё одну</button>
          </div>
        ) : (
          <form className="form reveal" onSubmit={onSubmit} noValidate aria-busy={sending}>
            <div className="field">
              <label htmlFor="lead-name">Имя *</label>
              <input id="lead-name" name="name" autoComplete="given-name" value={v.name} onChange={e => set('name', e.target.value)} {...err('name')} />
              {errors.name && <p className="field__err" id="err-name">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="lead-phone">Телефон *</label>
              <input id="lead-phone" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (900) 000-00-00"
                value={v.phone} onChange={e => set('phone', formatPhone(e.target.value))} {...err('phone')} />
              {errors.phone && <p className="field__err" id="err-phone">{errors.phone}</p>}
            </div>
            <div className="field">
              <label htmlFor="lead-category">Направление</label>
              <select id="lead-category" value={v.category} onChange={e => setV(s => ({ ...s, category: e.target.value, service: '' }))}>
                <option value="">Выберите направление</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="lead-service">Услуга</label>
              <select id="lead-service" value={v.service} disabled={!v.category} onChange={e => set('service', e.target.value)}>
                <option value="">{v.category ? 'Выберите услугу или «не знаю»' : 'Сначала выберите направление'}</option>
                {services.length > 0 && <option value="Не знаю, нужна консультация">Не знаю, нужна консультация</option>}
                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="field field--half">
              <label htmlFor="lead-date">Желаемая дата</label>
              <input id="lead-date" type="date" min={today} value={v.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="field field--half">
              <label htmlFor="lead-time">Желаемое время</label>
              <input id="lead-time" type="time" value={v.time} onChange={e => set('time', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="lead-comment">Комментарий</label>
              <textarea id="lead-comment" rows={3} value={v.comment} onChange={e => set('comment', e.target.value)} />
            </div>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={v.website} onChange={e => set('website', e.target.value)} />
            <div className="field check">
              <input id="lead-consent" type="checkbox" checked={v.consent} onChange={e => set('consent', e.target.checked)} {...err('consent')} />
              <label htmlFor="lead-consent">
                Согласен(на) на обработку персональных данных
                {site.privacyUrl && <> — <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer">документ</a></>}
              </label>
              {errors.consent && <p className="field__err" id="err-consent">{errors.consent}</p>}
            </div>

            {status === 'unconfigured' && <p className="notice" role="alert">Отправка заявок на сайте пока не настроена, поэтому заявка не отправлена. Пожалуйста, свяжитесь с салоном напрямую.</p>}
            {status === 'error' && <p className="notice" role="alert">Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.</p>}
            <button className="btn btn--block" type="submit" disabled={sending}>{sending ? 'Отправляем…' : 'Оставить заявку'}</button>
          </form>
        )}
      </div>
    </section>
  )
}
