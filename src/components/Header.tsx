import { useState } from 'react'
import './Header.css'

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [solutiiOpen, setSolutiiOpen] = useState(false)
  const [echipamenteOpen, setEchipamenteOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileRestaurante, setMobileRestaurante] = useState(false)
  const [mobileSolutii, setMobileSolutii] = useState(false)
  const [mobileEchipamente, setMobileEchipamente] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="/img/Logo.svg" alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav">
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span>Tipuri de Restaurante</span>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="#restaurant1">Restaurant tip 1</a>
                <a href="#restaurant2">Restaurant tip 2</a>
                <a href="#restaurant3">Restaurant tip 3</a>
              </div>
            )}
          </div>
          <div
            className="nav-item dropdown"
            onMouseEnter={() => setSolutiiOpen(true)}
            onMouseLeave={() => setSolutiiOpen(false)}
          >
            <span>Soluții</span>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {solutiiOpen && (
              <div className="dropdown-menu">
                <a href="#solutii1">Soluție 1</a>
                <a href="#solutii2">Soluție 2</a>
                <a href="#solutii3">Soluție 3</a>
              </div>
            )}
          </div>
          <div
            className="nav-item dropdown"
            onMouseEnter={() => setEchipamenteOpen(true)}
            onMouseLeave={() => setEchipamenteOpen(false)}
          >
            <span>Echipamente</span>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {echipamenteOpen && (
              <div className="dropdown-menu">
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
          <div className="mobile-nav-item" onClick={() => setMobileRestaurante(!mobileRestaurante)}>
            <span>Tipuri de Restaurante</span>
            <svg className={`arrow-down${mobileRestaurante ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {mobileRestaurante && (
            <div className="mobile-submenu">
              <a href="#restaurant1" onClick={() => setMobileOpen(false)}>Restaurant tip 1</a>
              <a href="#restaurant2" onClick={() => setMobileOpen(false)}>Restaurant tip 2</a>
              <a href="#restaurant3" onClick={() => setMobileOpen(false)}>Restaurant tip 3</a>
            </div>
          )}
          <div className="mobile-nav-item" onClick={() => setMobileSolutii(!mobileSolutii)}>
            <span>Soluții</span>
            <svg className={`arrow-down${mobileSolutii ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {mobileSolutii && (
            <div className="mobile-submenu">
              <a href="#solutii1" onClick={() => setMobileOpen(false)}>Soluție 1</a>
              <a href="#solutii2" onClick={() => setMobileOpen(false)}>Soluție 2</a>
              <a href="#solutii3" onClick={() => setMobileOpen(false)}>Soluție 3</a>
            </div>
          )}
          <div className="mobile-nav-item" onClick={() => setMobileEchipamente(!mobileEchipamente)}>
            <span>Echipamente</span>
            <svg className={`arrow-down${mobileEchipamente ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {mobileEchipamente && (
            <div className="mobile-submenu">
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
