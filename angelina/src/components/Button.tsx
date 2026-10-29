import { openBooking, type Prefill } from '../lib/booking'

export function BookButton({ children, prefill, className = '' }: { children: React.ReactNode; prefill?: Prefill; className?: string }) {
  return (
    <a href="#booking" className={`btn ${className}`} onClick={e => { e.preventDefault(); openBooking(prefill) }}>
      {children}
    </a>
  )
}
