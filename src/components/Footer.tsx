import { Link } from 'react-router-dom'
import './Footer.css'

const solutiiLinks = [
  { label: 'Restaurante & Cafenele', to: '/cafenea' },
  { label: 'Fast Food', to: '/fast-food' },
  { label: 'Livrare & Delivery', to: '/livrare' },
  { label: 'Sali de evenimente', to: '/sala-evenimente' },
]

const produseLinks = [
  { label: 'POS/PC Specializat', to: '/produse/pos-pc' },
  { label: 'Imprimante', to: '/produse/imprimante' },
  { label: 'Cântare Comerciale', to: '/produse/cantare-comerciale' },
  { label: 'Scanare Coduri de Bare', to: '/produse/scanare-coduri-de-bare' },
  { label: 'Sistem Numarare Vizitatori', to: '/produse/sistem-numarare-vizitatori' },
]

const companieLinks = [
  { label: 'Despre noi', to: '/despre' },
  { label: 'Pre?uri', to: '/preturi' },
  { label: 'Blog', to: '/blog' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/img/logofooter.svg" alt="RSistems" />
          </Link>
          <p className="footer-tagline">
            Software de management complet pentru afacerea ta HoReCa, Retail ...
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/rusivsistems/" className="footer-social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <img src="/img/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/rsistemsro/" className="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <img src="/img/insta.svg" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/rsistems/" className="footer-social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src="/img/link.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Solu?ii */}
        <div className="footer-col">
          <h4 className="footer-col-title">Solu?ii</h4>
          <ul className="footer-col-list">
            {solutiiLinks.map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Produse */}
        <div className="footer-col">
          <h4 className="footer-col-title">Produse</h4>
          <ul className="footer-col-list">
            {produseLinks.map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Companie */}
        <div className="footer-col">
          <h4 className="footer-col-title">Companie</h4>
          <ul className="footer-col-list">
            {companieLinks.map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-col-list footer-col-list--contact">
            <li>
              <a href="tel:+40751088772">
                <img src="/img/phone.svg" alt="" />
                +40 751 088 772
              </a>
            </li>
            <li>
              <a href="mailto:welcome@rsistems.ro">
                <img src="/img/email.svg" alt="" />
                welcome@rsistems.ro
              </a>
            </li>
            <li>
              <a href="https://wa.me/40751088772" target="_blank" rel="noopener noreferrer">
                <img src="/img/planeta.svg" alt="" />
                WhatsApp 24/7
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">&copy; {new Date().getFullYear()} RSistems. Toate drepturile rezervate.</span>
        <div className="footer-legal">
          <Link to="/termeni">Termeni &amp; condi?ii</Link>
          <span className="footer-legal-dot" aria-hidden="true">·</span>
          <Link to="/confidentialitate">Politica de confiden?ialitate</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
