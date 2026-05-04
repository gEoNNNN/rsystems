import { useState, useEffect } from 'react'
import './RestaurantPage.css'
import Header from './Header'
import Footer from './Footer'

const faqIcons = [
  '/img/stea1.svg',
  '/img/persoane.svg',
  '/img/smile.svg',
  '/img/chart.svg',
  '/img/mancare.svg',
  '/img/om1.svg',
]

type ContentData = {
  description: string
  bullets: string[]
  faq: { q: string; a: string }[]
}

const benefits = [
  { icon: '/img/glob.svg',    title: 'Servire mai rapidă',    desc: 'Comenzi procesate instant, fără întârzieri.' },
  { icon: '/img/monitor.svg', title: 'Monitorizare vânzări',  desc: 'Vezi în timp real ce se vinde.' },
  { icon: '/img/cutie.svg',   title: 'Gestionare stocuri',    desc: 'Actualizare automată, fără lipsuri.' },
  { icon: '/img/om.svg',      title: 'Control angajați',      desc: 'Urmărești activitatea și performanța.' },
  { icon: '/img/stea.svg',    title: 'Experiență mai bună',   desc: 'Plăți rapide și servicii eficiente.' },
]

const menuItems = [
  { id: 'cafenele',                label: 'Cafenele',                icon: '/img/Cafenele.svg' },
  { id: 'servicii-dining',         label: 'Servicii Dining',         icon: '/img/Servicii Dining.svg' },
  { id: 'pub-baruri',              label: 'Pub-uri și Baruri',       icon: '/img/Pub-uri și Baruri.svg' },
  { id: 'pizzerii',                label: 'Pizzerii',                icon: '/img/Pizzerii.svg' },
  { id: 'lanturi-franciza',        label: 'Lanțuri de franciză',     icon: '/img/Lanțuri de franciză.svg' },
  { id: 'fast-food',               label: 'Fast-food',               icon: '/img/Fast-food.svg' },
  { id: 'industria-ospitalitatii', label: 'Industria ospitalității', icon: '/img/Industria ospitalității.svg' },
  { id: 'food-truck',              label: 'Food truck',              icon: '/img/Food truck.svg' },
  { id: 'dark-kitchen',            label: 'Dark Kitchen',            icon: '/img/Dark Kitchen.svg' },
]

function RestaurantPage() {
  const [activeItem, setActiveItem] = useState('cafenele')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [content, setContent] = useState<ContentData | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setContent(null)
    setOpenFaq(null)
    fetch(`/text/${activeItem}.json`)
      .then(r => r.json())
      .then((data: ContentData) => setContent(data))
      .catch(() => setContent(null))
  }, [activeItem])

  return (
    <div className="rp-page">
      <Header />

      {/* Hero */}
      <section className="rp-hero">
        <img src="/img/tip bg.svg" alt="" className="rp-hero-bg" />
        <div className="rp-hero-content">
          <h1 className="rp-hero-heading">
            Administrează-ți restaurantul<br />
            mai simplu, mai rapid și mai eficient
          </h1>
          <p className="rp-hero-accent">cu o platformă POS unificată</p>
          <p className="rp-hero-description">
            De la cafenele și pizzerii până la restaurante, baruri, food trucks sau lanțuri HoReCa,
            sistemul POS RSistems te ajută să controlezi comenzile, vânzările, stocurile și
            operațiunile zilnice dintr-un singur loc.
          </p>
        </div>
      </section>

      {/* Main: sidebar left + content right */}
      <section className="rp-main">
        <aside className="rp-sidebar">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`rp-sidebar-item${activeItem === item.id ? ' active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              <img src={item.icon} alt={item.label} className="rp-sidebar-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        <div className="rp-content">
          {(() => {
            const active = menuItems.find(i => i.id === activeItem)!
            return (
              <>
                <h2 className="rp-content-title">{active.label}</h2>
                <img
                  src={`/img/${active.label} bg.svg`}
                  alt={active.label}
                  className="rp-content-img"
                />
                <div className="rp-info-row">
                  <div className="rp-info-col">
                    <h3>Despre {active.label}</h3>
                    <p>{content?.description ?? 'Conținut în lucru...'}</p>
                  </div>
                  <div className="rp-info-col">
                    <h3>Funcționalități cheie</h3>
                    <ul>
                      {(content?.bullets ?? [
                        'Gestionare comenzi în timp real',
                        'Rapoarte de vânzări zilnice și lunare',
                        'Control stocuri și inventar',
                        'Integrare cu case de marcat fiscale',
                        'Suport multi-locație și franciză',
                      ]).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* Benefits */}
      <section className="rp-benefits">
        <h2 className="rp-benefits-title">
          Beneficii pentru {menuItems.find(i => i.id === activeItem)?.label.toLowerCase()}
        </h2>
        <div className="rp-benefits-grid">
          {benefits.map((b, idx) => (
            <div key={idx} className="rp-benefit-card">
              <img src={b.icon} alt={b.title} className="rp-benefit-icon" />
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* De ce alegi RSistems */}
      <section className="rp-why">
        <div className="rp-why-text">
          <h2 className="rp-why-title">De ce alegi compania RSistems</h2>
          <p className="rp-why-subtitle">Soluții complete care aduc eficiență, creștere și clienți mulțumiți.</p>
          <p className="rp-why-body">Conținut detaliat în lucru — va fi adăugat în curând.</p>
        </div>
        <img
          src={`/img/${menuItems.find(i => i.id === activeItem)?.label} bg2.svg`}
          alt="De ce RSistems"
          className="rp-why-img"
        />
      </section>

      {/* FAQ + Contact form */}
      <section className="rp-faq-section">
        <div className="rp-faq-list">
          {(content?.faq ?? []).map((item, idx) => (
            <div
              key={idx}
              className={`rp-faq-item${openFaq === idx ? ' open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="rp-faq-row">
                <img src={faqIcons[idx] ?? faqIcons[0]} alt="" className="rp-faq-icon" />
                <span className="rp-faq-q">{idx + 1}. {item.q}</span>
                <span className="rp-faq-chevron" aria-hidden="true" />
              </div>
              <div className="rp-faq-answer-wrap">
                <div className="rp-faq-answer-inner">
                  <p className="rp-faq-answer">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rp-contact-form">
          <div className="rp-form-group">
            <label>Telefon de serviciu</label>
            <input type="tel" placeholder="" />
          </div>
          <div className="rp-form-row">
            <div className="rp-form-group">
              <label>Nume</label>
              <input type="text" placeholder="" />
            </div>
            <div className="rp-form-group">
              <label>Prenume</label>
              <input type="text" placeholder="" />
            </div>
          </div>
          <div className="rp-form-group">
            <label>Adresă de e-mail de serviciu</label>
            <input type="email" placeholder="" />
          </div>
          <button className="rp-form-submit">Trimite</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default RestaurantPage
