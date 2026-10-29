import { site } from '../data/site'

export type LeadPayload = {
  name: string; phone: string; category: string; service: string
  date?: string; time?: string; comment?: string; consent: boolean; source: 'angelina-site'
}
export class NotConfiguredError extends Error {}

/**
 * Адаптер отправки заявки. Пока VITE_LEAD_ENDPOINT не задан — честно бросает NotConfiguredError.
 * Ожидается: POST application/json → любой 2xx = успех.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!site.leadEndpoint) throw new NotConfiguredError('Lead endpoint is not configured')
  const res = await fetch(site.leadEndpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`)
}

/** Приводит ввод к виду +7 (XXX) XXX-XX-XX */
export function formatPhone(raw: string): string {
  if (!raw) return ''
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('8') || d.startsWith('7')) d = d.slice(1)
  d = d.slice(0, 10)
  let out = '+7'
  if (d.length) out += ' (' + d.slice(0, 3)
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ' ' + d.slice(3, 6)
  if (d.length > 6) out += '-' + d.slice(6, 8)
  if (d.length > 8) out += '-' + d.slice(8, 10)
  return out
}
export const phoneDigits = (v: string) => v.replace(/\D/g, '').replace(/^[78]/, '')
