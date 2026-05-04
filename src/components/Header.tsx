import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [solutiiEchipamenteOpen, setSolutiiEchipamenteOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSolutiiEchipamente, setMobileSolutiiEchipamente] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/img/Logo.svg" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav">
          <div
            className="nav-item dropdown"
            onMouseEnter={() => setSolutiiEchipamenteOpen(true)}
            onMouseLeave={() => setSolutiiEchipamenteOpen(false)}
          >
            <span>Soluții & Echipamente</span>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {solutiiEchipamenteOpen && (
              <div className="dropdown-menu">
                <Link to="/cafenea" onClick={() => setSolutiiEchipamenteOpen(false)}>Automatizare HoReCa</Link>
                <a href="#solutii1">Soluție 1</a>
                <a href="#solutii2">Soluție 2</a>
                <a href="#solutii3">Soluție 3</a>
                <a href="#echipamente1">Echipament 1</a>
                <a href="#echipamente2">Echipament 2</a>
                <a href="#echipamente3">Echipament 3</a>
              </div>
            )}
          </div>
          <a href="#preturi" className="nav-item">Prețuri</a>
          <a href="#blog" className="nav-item">Blog</a>
          <a href="#despre" className="nav-item">Despre noi</a>
        </nav>

        {/* Contact & CTA */}
        <div className="header-actions">
          <a href="tel:+40517508772" className="contact-item">
            <img src="/img/phone.svg" alt="Phone" className="icon" />
            <span>+40517508772</span>
          </a>
          <a href="mailto:welcome@rsistems.ro" className="contact-item">
            <img src="/img/email.svg" alt="Email" className="icon" />
            <span>welcome@rsistems.ro</span>
          </a>
          <a href="https://wa.me/40517508772?text=Bună! Vreau să încep să folosesc RSistems." className="cta-button" target="_blank" rel="noopener noreferrer">Începe acum</a>
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Meniu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-item" onClick={() => setMobileSolutiiEchipamente(!mobileSolutiiEchipamente)}>
            <span>Soluții & Echipamente</span>
            <svg className={`arrow-down${mobileSolutiiEchipamente ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {mobileSolutiiEchipamente && (
            <div className="mobile-submenu">
              <Link to="/cafenea" onClick={() => setMobileOpen(false)}>Automatizare HoReCa</Link>
              <a href="#solutii1" onClick={() => setMobileOpen(false)}>Soluție 1</a>
              <a href="#solutii2" onClick={() => setMobileOpen(false)}>Soluție 2</a>
              <a href="#solutii3" onClick={() => setMobileOpen(false)}>Soluție 3</a>
              <a href="#echipamente1" onClick={() => setMobileOpen(false)}>Echipament 1</a>
              <a href="#echipamente2" onClick={() => setMobileOpen(false)}>Echipament 2</a>
              <a href="#echipamente3" onClick={() => setMobileOpen(false)}>Echipament 3</a>
            </div>
          )}
          <a href="#preturi" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Prețuri</a>
          <a href="#blog" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Blog</a>
          <a href="#despre" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Despre noi</a>
          <div className="mobile-actions">
            <a href="tel:+40517508772" className="mobile-contact">
              <img src="/img/phone.svg" alt="Phone" className="icon" />
              +40517508772
            </a>
            <a href="mailto:welcome@rsistems.ro" className="mobile-contact">
              <img src="/img/email.svg" alt="Email" className="icon" />
              welcome@rsistems.ro
            </a>
            <a href="https://wa.me/40517508772?text=Bună! Vreau să încep să folosesc RSistems." className="cta-button" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Începe acum</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
