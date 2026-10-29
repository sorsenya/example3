import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <Logo />
        <p>© {new Date().getFullYear()} Ангелина — Beauty Studio</p>
        <a href="#top" className="link">Наверх</a>
      </div>
    </footer>
  )
}
