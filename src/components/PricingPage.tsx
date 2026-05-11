import { useState, useEffect } from 'react'
import './PricingPage.css'
import Header from './Header'
import Footer from './Footer'

const plans = [
  {
    id: 'basic',
    card: '/img/card1.svg',
    name: 'Basic',
    tagline: 'Perfect pentru cafenele independente, restaurante mici',
    price: '39€',
    period: '/ lună',
    features: [
      'POS intuitiv pentru vânzări rapide',
      'Management produse și meniu',
      'Rapoarte de bază (vânzări zilnice)',
      'Operare simplă, fără training complex',
    ],
    featured: false,
  },
  {
    id: 'professional',
    card: '/img/card1.svg',
    name: 'Proffesional',
    tagline: 'Ideal pentru restaurante cu opțiuni QSR, restaurante de lux, pub-uri și baruri',
    price: '59€',
    period: '/ lună',
    features: [
      'Rapoarte avansate și analize detaliate',
      'Gestionare livrări și comenzi online',
      'Multi-user + roluri angajați',
      'Operare simplă, fără training complex',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    card: '/img/card3.svg',
    name: 'Enterprise',
    tagline: 'Ideal pentru lanțuri mari, francize, servicii profesionale de livrare',
    price: '89€',
    period: '/ lună',
    features: [
      'POS intuitiv pentru vânzări rapide',
      'Management produse și meniu',
      'Rapoarte de bază (vânzări zilnice)',
      'Operare simplă, fără training complex',
    ],
    featured: false,
  },
]

const comparisonSections = [
  {
    title: 'Analiză și raportare',
    features: [
      { name: 'Integrări predefinite (de exemplu, Xero)', basic: true, pro: true, enterprise: true },
      { name: 'Notificări pentru echipă și conducere', basic: true, pro: true, enterprise: true },
      { name: 'Prognoza automată a vânzărilor', basic: true, pro: true, enterprise: true },
      { name: 'Rapoarte configurabile bazate pe KPI', basic: true, pro: true, enterprise: true },
      { name: 'Raport simplificat de profit și pierdere', basic: true, pro: true, enterprise: true },
      { name: 'Raportare avansată', basic: false, pro: true, enterprise: true },
      { name: 'API-ul de raportare', basic: false, pro: false, enterprise: true },
      { name: 'Tablou de bord în magazin', basic: false, pro: false, enterprise: true },
    ],
  },
  { title: 'Capacități multi-magazin', features: [
    { name: 'Gestionare locații multiple dintr-un singur panou', basic: false, pro: true, enterprise: true },
    { name: 'Rapoarte consolidate pe toate locațiile', basic: false, pro: true, enterprise: true },
    { name: 'Sincronizare meniu în timp real', basic: false, pro: false, enterprise: true },
    { name: 'Control acces per locație', basic: false, pro: true, enterprise: true },
  ]},
  { title: 'Caracteristici de bază ale restaurantului', features: [
    { name: 'Gestiunea meselor și rezervărilor', basic: true, pro: true, enterprise: true },
    { name: 'Imprimare bonuri și chitanțe', basic: true, pro: true, enterprise: true },
    { name: 'Divizare notă și plată parțială', basic: false, pro: true, enterprise: true },
    { name: 'Integrare cu casa de marcat fiscală', basic: true, pro: true, enterprise: true },
  ]},
  { title: 'Comandă online', features: [
    { name: 'Pagină de comandă online personalizată', basic: false, pro: true, enterprise: true },
    { name: 'Integrare platforme livrare (Bolt, Glovo)', basic: false, pro: true, enterprise: true },
    { name: 'Notificări automate client', basic: false, pro: true, enterprise: true },
    { name: 'Gestiune ore de livrare și disponibilitate', basic: false, pro: false, enterprise: true },
  ]},
  { title: 'Funcții avansate ale restaurantului', features: [
    { name: 'QR code pentru meniu digital la masă', basic: false, pro: true, enterprise: true },
    { name: 'Comandă la masă via telefon client', basic: false, pro: false, enterprise: true },
    { name: 'Kitchen Display System (KDS)', basic: false, pro: true, enterprise: true },
    { name: 'Modificatori și variante produs avansate', basic: true, pro: true, enterprise: true },
  ]},
  { title: 'Inventar și Achiziții', features: [
    { name: 'Urmărire stoc în timp real', basic: true, pro: true, enterprise: true },
    { name: 'Alerte stoc minim', basic: true, pro: true, enterprise: true },
    { name: 'Comenzi automate către furnizori', basic: false, pro: false, enterprise: true },
    { name: 'Rețete și costuri ingrediente', basic: false, pro: true, enterprise: true },
  ]},
  { title: 'Livrare și mâncare la pachet', features: [
    { name: 'Gestionare comenzi take-away', basic: true, pro: true, enterprise: true },
    { name: 'Urmărire livrator în timp real', basic: false, pro: true, enterprise: true },
    { name: 'Zone de livrare și tarife configurabile', basic: false, pro: true, enterprise: true },
    { name: 'Integrare aplicație mobilă client', basic: false, pro: false, enterprise: true },
  ]},
  { title: 'Managementul echipei', features: [
    { name: 'Roluri și permisiuni angajați', basic: true, pro: true, enterprise: true },
    { name: 'Pontaj și gestiune ture', basic: false, pro: true, enterprise: true },
    { name: 'Rapoarte performanță per angajat', basic: false, pro: true, enterprise: true },
    { name: 'Integrare sisteme HR externe', basic: false, pro: false, enterprise: true },
  ]},
  { title: 'Managementul fidelizării clienților', features: [
    { name: 'Program de puncte și recompense', basic: false, pro: true, enterprise: true },
    { name: 'Carduri cadou și vouchere', basic: false, pro: true, enterprise: true },
    { name: 'Campanii promoționale automate', basic: false, pro: false, enterprise: true },
    { name: 'Istoric achiziții per client', basic: false, pro: true, enterprise: true },
  ]},
  { title: 'Meniu și gestionare a prețurilor', features: [
    { name: 'Editare meniu în timp real', basic: true, pro: true, enterprise: true },
    { name: 'Prețuri diferențiate per canal de vânzare', basic: false, pro: true, enterprise: true },
    { name: 'Meniuri speciale și sezoniere', basic: false, pro: true, enterprise: true },
    { name: 'Prețuri dinamice bazate pe oră/zi', basic: false, pro: false, enterprise: true },
  ]},
]

const Checkmark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3.5 9L7.5 13L14.5 5" stroke="#1FB6B2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function PricingPage() {
  const [openSection, setOpenSection] = useState<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))

    // Stagger accordion rows when cmp-table enters viewport
    const tableEl = document.querySelector('[data-cmp-table]')
    if (tableEl) {
      const tableObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('[data-cmp-row]').forEach(row => row.classList.add('cmp-row-visible'))
            tableObserver.disconnect()
          }
        })
      }, { threshold: 0.05 })
      tableObserver.observe(tableEl)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="pricing-page">
      <Header />

      {/* ── Pricing Cards ── */}
      <section className="pricing-section" data-animate>
        <h2 className="pricing-section-heading">Alege planul potrivit pentru afacerea ta</h2>
        <p className="pricing-section-sub">Fără costuri ascunse. Poți schimba planul oricând.</p>
        <div className="pricing-cards" data-stagger>
          {plans.map(plan => (
            <div key={plan.id} className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}>
              {plan.featured && <div className="pricing-badge">⭐ Cel mai popular</div>}
              <img src={plan.card} alt="" className="pricing-card-bg" />
              <div className="pricing-card-content">
                <h2 className="pricing-card-name">{plan.name}</h2>
                <p className="pricing-card-tagline">{plan.tagline}</p>
                <div className="pricing-card-price">
                  <span className="pricing-price-amount">{plan.price}</span>
                  <span className="pricing-price-period">{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f, i) => (
                    <li key={i} className="pricing-feature-item">
                      <span>{f}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/40517508772?text=Bună! Vreau să încep să folosesc RSistems." className="pricing-btn" target="_blank" rel="noopener noreferrer">
                  Începe acum
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Wave transition to comparison section */}
        <div className="pricing-wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 L0,20 C180,70 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1380,10 1440,25 L1440,80 Z" fill="#f5f5f5"/>
          </svg>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="cmp-section" data-animate>
        <div className="cmp-section-intro">
          <h2 className="cmp-section-heading">Comparație completă a planurilor</h2>
          <p className="cmp-section-sub">Descoperă funcționalitățile incluse în fiecare plan și alege soluția potrivită pentru afacerea ta.</p>
        </div>
        <div className="cmp-table" data-cmp-table>
          {/* Header row */}
          <div className="cmp-header">
            <div className="cmp-header-title">POS intuitiv pentru vânzări rapide</div>
            <div className="cmp-header-col">Basic</div>
            <div className="cmp-header-col">Professional</div>
            <div className="cmp-header-col">Enterprise</div>
          </div>

          {/* Accordion sections */}
          {comparisonSections.map((section, idx) => {
            const firstWord = section.title.split(' ')[0]
            const isOpen = openSection === idx
            const sortedFeatures = [...section.features].sort((a, b) => {
              const countA = (a.basic ? 1 : 0) + (a.pro ? 1 : 0) + (a.enterprise ? 1 : 0)
              const countB = (b.basic ? 1 : 0) + (b.pro ? 1 : 0) + (b.enterprise ? 1 : 0)
              return countB - countA
            })
            return (
              <div
                key={idx}
                className={`cmp-accordion${isOpen ? ' cmp-accordion--open' : ''}`}
                data-cmp-row
                style={{ '--row-delay': `${idx * 60}ms` } as React.CSSProperties}
              >
                <button
                  className={`cmp-accordion-header${isOpen ? ' cmp-accordion-header--open' : ''}`}
                  onClick={() => setOpenSection(isOpen ? -1 : idx)}
                >
                  <div className="cmp-accordion-left">
                    <img src={`/img/${firstWord}.svg`} alt="" className="cmp-accordion-icon" />
                    <span>{section.title}</span>
                  </div>
                  <svg className={`cmp-chevron${isOpen ? ' cmp-chevron--open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                {isOpen && section.features.length > 0 && (
                  <div className="cmp-accordion-body">
                    {sortedFeatures.map((f, fi) => (
                      <div
                        key={fi}
                        className="cmp-feature-row"
                        style={{ '--fi': fi } as React.CSSProperties}
                      >
                        <div className="cmp-feature-name">{f.name}</div>
                        <div className="cmp-feature-col">{f.basic ? <Checkmark /> : null}</div>
                        <div className="cmp-feature-col">{f.pro ? <Checkmark /> : null}</div>
                        <div className="cmp-feature-col">{f.enterprise ? <Checkmark /> : null}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="pricing-cta" data-animate>
        <div className="pricing-cta-left">
          <h2 className="pricing-cta-heading">Gata să controlați tot lanțul dintr-un singur sistem?</h2>
          <p className="pricing-cta-desc">
            Cere o demonstrație personalizată pentru lanțuri de restaurante.
            Vă arătăm exact cum RSistems va reduce costurile și va crește profitul fiecărei locații.
          </p>
          <a href="https://wa.me/40517508772?text=Bun%C4%83!%20Vreau%20s%C4%83%20%C3%AEncep%20s%C4%83%20folosesc%20RSistems." className="pricing-cta-btn" target="_blank" rel="noopener noreferrer">
            Începe acum
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="pricing-cta-right">
          <img src="/img/ecran.svg" alt="" className="pricing-cta-img" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage

