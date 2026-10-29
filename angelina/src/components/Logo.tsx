export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__text">
        <span className="logo__name">ANGELINA</span>
        <span className="logo__sub">BEAUTY STUDIO</span>
      </span>
    </span>
  )
}
