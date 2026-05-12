import { useState, useEffect } from 'react'
import './IntegrationsPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

const partnerLogos = [
  '/img/LogoDesktop 1.svg',  '/img/LogoDesktop 2.svg',  '/img/LogoDesktop 3.svg',
  '/img/LogoDesktop 4.svg',  '/img/LogoDesktop 5.svg',  '/img/LogoDesktop 6.svg',
  '/img/LogoDesktop 7.svg',  '/img/LogoDesktop 8.svg',  '/img/LogoDesktop 9.svg',
  '/img/LogoDesktop 10.svg', '/img/LogoDesktop 11.svg', '/img/LogoDesktop 12.svg',
  '/img/LogoDesktop 13.svg', '/img/LogoDesktop 14.svg', '/img/LogoDesktop 15.svg',
  '/img/LogoDesktop 16.svg', '/img/LogoDesktop 17.svg', '/img/LogoDesktop 18.svg',
]

const integrationTypes = ['Accounting', 'Delivery Robots', 'Payment', 'CRM', 'HR', 'Inventory']
const countries = ['Moldova', 'Romania', 'Bulgaria', 'Ukraine']

const integrations = [
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 1.svg', type: 'Payment', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 2.svg', type: 'Payment', country: 'Moldova', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 3.svg', type: 'Accounting', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 4.svg', type: 'Delivery Robots', country: 'Moldova', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 5.svg', type: 'Payment', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 6.svg', type: 'Accounting', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 7.svg', type: 'CRM', country: 'Moldova', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 8.svg', type: 'HR', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 9.svg', type: 'Inventory', country: 'Moldova', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 10.svg', type: 'Payment', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 11.svg', type: 'Delivery Robots', country: 'Romania', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
  { name: 'Viva Wallet', logo: '/img/LogoDesktop 12.svg', type: 'Accounting', country: 'Moldova', desc: 'LoyaltyPlant is a full-featured, white-label loyalty and mobile ordering platform built for restaurants and hospitality brands.' },
]

function IntegrationsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [logoSlide, setLogoSlide] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [typeOpen, setTypeOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => prev + 1), 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const track = document.querySelector('.carousel-track') as HTMLElement | null
    if (!track) return
    const total = partnerLogos.length
    if (currentSlide >= total) {
      track.style.transition = 'none'
      setCurrentSlide(0)
      setTimeout(() => {
        track.style.transition = 'transform 0.6s ease'
      }, 50)
    }
  }, [currentSlide])

  useEffect(() => {
    const interval = setInterval(() => setLogoSlide(prev => prev + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const track = document.getElementById('int-logos-track')
    if (!track) return
    if (logoSlide >= partnerLogos.length) {
      track.style.transition = 'none'
      setLogoSlide(0)
      setTimeout(() => { track.style.transition = 'transform 0.6s ease' }, 50)
    }
  }, [logoSlide])

  const toggleType = (t: string) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const toggleCountry = (c: string) =>
    setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const filtered = integrations.filter(item => {
    const typeOk = selectedTypes.length === 0 || selectedTypes.includes(item.type)
    const countryOk = selectedCountries.length === 0 || selectedCountries.includes(item.country)
    return typeOk && countryOk
  }).slice(0, 10)

  return (
    <div className="int-page">
      <SEO
        title="Integrări RSistems – POS, Livrare, Contabilitate"
        description="RSistems se integrează cu platformele de livrare, sisteme de contabilitate și soluții de fidelizare. Conectează-ți afacerea HoReCa cu ecosistemul digital."
        canonical="/integrations"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="int-hero" data-animate>
        <img src="/img/tip bg.svg" alt="" className="int-hero-bg" />
        <div className="int-hero-content">
          <h1 className="int-hero-heading">Integrations</h1>
          <p className="int-hero-description">
            Capacitățile de integrare ale sistemului POS RSistems sunt unul dintre lucrurile care ne diferențiază.
            Ne conectăm fără probleme cu o gamă largă de sisteme terțe, inclusiv platforme de livrare,
            software de contabilitate, CRM, sisteme de loialitate, HR și multe altele. API-ul nostru deschis
            îți menține afacerea flexibilă, pregătită pentru viitor și complet conectată.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="int-filters" data-animate>
        {/* Integration type */}
        <div className="int-filter-group">
          <span className="int-filter-label">Integration type</span>
          <div className="int-filter-tags">
            {selectedTypes.map(t => (
              <span key={t} className="int-tag">
                {t}
                <button onClick={() => toggleType(t)} className="int-tag-remove">×</button>
              </span>
            ))}
          </div>
          <div className="int-dropdown-wrap">
            <button className="int-dropdown-btn" onClick={() => { setTypeOpen(o => !o); setCountryOpen(false) }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {typeOpen && (
              <div className="int-dropdown-menu">
                {integrationTypes.map(t => (
                  <label key={t} className="int-dropdown-item">
                    <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} />
                    {t}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="int-filter-separator" />

        {/* Country */}
        <div className="int-filter-group">
          <span className="int-filter-label">Country</span>
          <div className="int-filter-tags">
            {selectedCountries.map(c => (
              <span key={c} className="int-tag">
                {c}
                <button onClick={() => toggleCountry(c)} className="int-tag-remove">×</button>
              </span>
            ))}
          </div>
          <div className="int-dropdown-wrap">
            <button className="int-dropdown-btn" onClick={() => { setCountryOpen(o => !o); setTypeOpen(false) }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {countryOpen && (
              <div className="int-dropdown-menu">
                {countries.map(c => (
                  <label key={c} className="int-dropdown-item">
                    <input type="checkbox" checked={selectedCountries.includes(c)} onChange={() => toggleCountry(c)} />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Integrations Grid ── */}
      <section className="int-grid-section" data-animate>
        <div className="int-grid" data-stagger>
          {filtered.map((item, i) => (
            <div key={i} className="int-card">
              <div className="int-card-logo">
                <img src={item.logo} alt={item.name} />
              </div>
              <div className="int-card-name">{item.name}</div>
              <p className="int-card-desc">{item.desc}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="int-no-results">No integrations found for the selected filters.</p>
          )}
        </div>
      </section>

      {/* ── Logo Carousel ── */}
      <section className="int-logos-section" data-animate>
        <div className="int-logos-container">
          <div
            id="int-logos-track"
            className="int-logos-track"
            style={{ transform: `translateX(-${logoSlide * 12.5}%)`, transition: 'transform 0.6s ease' }}
          >
            {[...partnerLogos, ...partnerLogos].map((logo, index) => {
              const realIndex = index % partnerLogos.length
              const isLarge = realIndex >= 9 && realIndex <= 12
              return (
                <div key={index} className={`int-logos-item${isLarge ? ' int-logos-item-large' : ''}`}>
                  <img src={logo} alt={`Partner ${realIndex + 1}`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default IntegrationsPage
