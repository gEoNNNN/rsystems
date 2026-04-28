import { useState } from 'react'
import './Header.css'

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="/img/Logo.svg" alt="Logo" />
        </div>

        {/* Navigation */}
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
          <a href="#solutii" className="nav-item">Solutii & Echipamente</a>
          <a href="#preturi" className="nav-item">Preturi</a>
          <a href="#blog" className="nav-item">Blog</a>
          <a href="#despre" className="nav-item">Despre noi</a>
        </nav>

        {/* Contact & CTA */}
        <div className="header-actions">
          <a href="tel:+40123456789" className="contact-item">
            <img src="/img/phone.svg" alt="Phone" className="icon" />
            <span>+405175088772</span>
          </a>
          <a href="mailto:contact@example.com" className="contact-item">
            <img src="/img/email.svg" alt="Email" className="icon" />
            <span>welcome@rsistems.ro</span>
          </a>
          <a href="https://wa.me/40517508772?text=Bună! Vreau să încep să folosesc RSistems." className="cta-button" target="_blank" rel="noopener noreferrer">Incepe acum</a>
        </div>
      </div>
    </header>
  )
}

export default Header
