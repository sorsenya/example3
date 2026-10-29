export type Prefill = { category?: string; service?: string }
export const BOOKING_EVENT = 'booking:prefill'

/** Прокручивает к форме и (опционально) подставляет направление/услугу. */
export function openBooking(prefill: Prefill = {}) {
  window.dispatchEvent(new CustomEvent<Prefill>(BOOKING_EVENT, { detail: prefill }))
  const el = document.getElementById('booking')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', '#booking')
  window.setTimeout(() => document.getElementById('lead-name')?.focus({ preventScroll: true }), reduce ? 0 : 700)
}
