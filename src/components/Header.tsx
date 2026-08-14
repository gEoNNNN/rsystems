import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useAuth } from './AuthContext'

const produseItems = [
  { label: 'POS/PC specializat',          icon: '/img/iPOS.svg',        href: '/produse/pos-pc' },
  { label: 'Imprimante',                  icon: '/img/iImprimante.svg', href: '/produse/imprimante' },
  { label: 'Cântare comerciale',           icon: '/img/iCantare.svg',    href: '/produse/cantare-comerciale' },
  { label: 'Scanare coduri de bare',      icon: '/img/iScanare.svg',    href: '/produse/scanare-coduri-de-bare' },
  { label: 'Sistem numărare vizitatori',  icon: '/img/iSistem.svg',     href: '/produse/sistem-numarare-vizitatori' },
  { label: 'Case de autoservire',          icon: '/img/iCase.svg',       href: '/produse/case-de-autoservire' },
  /* ASCUNS TEMPORAR – nu șterge
  { label: 'Echipamente fiscale',               icon: '/img/iEchipamente.svg',  href: '/produse/echipamente-fiscale' },
  { label: 'Terminale colectare date',          icon: '/img/iTerminale.svg',    href: '/produse/terminale-colectare-date' },
  { label: 'Sistem antifurt',                   icon: '/img/iSistem1.svg',      href: '/produse/sistem-antifurt' },
  { label: 'Echipamente de parcare',            icon: '/img/iEchipamente1.svg', href: '/produse/echipamente-de-parcare' },
  { label: 'Sisteme supraveghere video',        icon: '/img/iSisteme.svg',      href: '/produse/sisteme-supraveghere-video' },
  { label: 'Sisteme audio',                     icon: '/img/iSisteme1.svg',     href: '/produse/sisteme-audio' },
  { label: 'Sistem control acces',              icon: '/img/iSistem2.svg',      href: '/produse/sistem-control-acces' },
  { label: 'Echipament primire/emitere numerar', icon: '/img/iEchipament.svg',  href: '/produse/echipament-primire-emitere-numerar' },
  { label: 'Echipament industriale alimentare', icon: '/img/iEchipament1.svg', href: '/produse/echipament-industriale-alimentare' },
  */
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSolutii, setMobileSolutii] = useState(false)
  const [mobileProduse, setMobileProduse] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const { isPartner, login, logout } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = login(loginUser, loginPass)
    if (ok) {
      setLoginOpen(false)
      setLoginUser('')
      setLoginPass('')
      setLoginError('')
    } else {
      setLoginError('Credențiale incorecte. Încearcă din nou.')
    }
  }

  return (
    <>
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
          >
            <span>Soluții</span>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="dropdown-menu">
                <Link to="/cafenea">Automatizare HoReCa</Link>
                {/* ASCUNS TEMPORAR – Front-of-House
                <Link to="/front-of-house">Front-of-House</Link>
                */}
              </div>
          </div>
          <div
            className="nav-item dropdown"
          >
            <Link to="/magazin" className="nav-produse-label">Produse</Link>
            <svg className="arrow-down" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="produse-mega">
                {produseItems.map((item, ii) => (
                  <Link key={ii} to={item.href} className="produse-mega-item">
                    <img src={item.icon} alt="" className="produse-mega-icon" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
          </div>
          <Link to="/preturi" className="nav-item">Prețuri</Link>
          <Link to="/blog" className="nav-item">Blog</Link>
          <Link to="/devino-partener" className="nav-item">Devino Partener</Link>
          <Link to="/despre" className="nav-item">Despre noi</Link>
        </nav>

        {/* Contact & CTA */}
        <div className="header-actions">
          <a href="tel:+40751088772" className="contact-item">
            <img src="/img/phone.svg" alt="Phone" className="icon" />
            <span>+40751088772</span>
          </a>
          <a href="mailto:welcome@rsistems.ro" className="contact-item contact-item--icon-only" title="Trimite email">
            <img src="/img/email.svg" alt="Email" className="icon" />
          </a>
          {isPartner ? (
            <button className="partner-btn partner-btn--out" onClick={logout}>Deconectare</button>
          ) : (
            <button className="partner-btn" onClick={() => setLoginOpen(true)}>Partener</button>
          )}
          <a href="https://wa.me/40751088772?text=Bună! Vreau să încep să folosesc RSistems." className="cta-button" target="_blank" rel="noopener noreferrer">Începe acum</a>
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
          <div className="mobile-nav-item" onClick={() => setMobileSolutii(!mobileSolutii)}>
            <span>Soluții</span>
            <svg className={`arrow-down${mobileSolutii ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {mobileSolutii && (
            <div className="mobile-submenu">
              <Link to="/cafenea" onClick={() => setMobileOpen(false)}>Automatizare HoReCa</Link>
              {/* ASCUNS TEMPORAR: <Link to="/front-of-house" onClick={() => setMobileOpen(false)}>Front-of-House</Link> */}
            </div>
          )}
          <div className="mobile-nav-item mobile-nav-item--split">
            <Link to="/magazin" className="mobile-nav-item-label" onClick={() => setMobileOpen(false)}>Produse</Link>
            <span className="mobile-nav-item-toggle" onClick={() => setMobileProduse(!mobileProduse)}>
              <svg className={`arrow-down${mobileProduse ? ' rotated' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          {mobileProduse && (
            <div className="mobile-submenu">
              {produseItems.map((item, i) => (
                <Link key={i} to={item.href} className="mobile-produse-item" onClick={() => setMobileOpen(false)}>
                  <img src={item.icon} alt="" className="produse-mega-icon" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
          <Link to="/preturi" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Prețuri</Link>
          <Link to="/blog" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link to="/devino-partener" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Devino Partener</Link>
          <Link to="/despre" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Despre noi</Link>
          <div className="mobile-actions">
            {isPartner ? (
              <button className="partner-btn partner-btn--out" style={{width:'100%'}} onClick={() => { logout(); setMobileOpen(false) }}>Deconectare partener</button>
            ) : (
              <button className="partner-btn" style={{width:'100%'}} onClick={() => { setMobileOpen(false); setLoginOpen(true) }}>Login Partener</button>
            )}
            <a href="tel:+40751088772" className="mobile-contact">
              <img src="/img/phone.svg" alt="Phone" className="icon" />
              +40 751 088 772
            </a>
            <a href="mailto:welcome@rsistems.ro" className="mobile-contact">
              <img src="/img/email.svg" alt="Email" className="icon" />
              welcome@rsistems.ro
            </a>
            <a href="https://wa.me/40751088772?text=Bună! Vreau să încep să folosesc RSistems." className="cta-button" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Începe acum</a>
          </div>
        </div>
      )}
    </header>

    {loginOpen && (
      <div className="login-overlay" onClick={() => setLoginOpen(false)}>
        <div className="login-modal" onClick={e => e.stopPropagation()}>
          <button className="login-close" onClick={() => setLoginOpen(false)} aria-label="Închide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="login-header">
            <img src="/img/Logo.svg" alt="RSistems" className="login-logo" />
            <h2 className="login-title">Acces Parteneri</h2>
            <p className="login-subtitle">Autentifică-te pentru a vedea prețurile</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-field">
              <label className="login-label">Utilizator</label>
              <input
                className="login-input"
                type="text"
                placeholder="Utilizator"
                value={loginUser}
                onChange={e => { setLoginUser(e.target.value); setLoginError('') }}
                autoComplete="username"
              />
            </div>
            <div className="login-field">
              <label className="login-label">Parolă</label>
              <input
                className="login-input"
                type="password"
                placeholder="Parolă"
                value={loginPass}
                onChange={e => { setLoginPass(e.target.value); setLoginError('') }}
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="login-error">{loginError}</p>}
            <button type="submit" className="login-submit">Autentificare</button>
          </form>
        </div>
      </div>
    )}
    </>
  )
}

export default Header
