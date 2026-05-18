import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from './SEO'
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
  heroTitle?: string
  heroDescription?: string
  description: string
  bullets: string[]
  solutions?: string[]
  whyBody?: string
  whyReasons?: { title: string; desc: string }[]
  faq: { q: string; a: string }[]
}

const benefits = [
  { icon: '/img/glob.svg',    title: 'Servire mai rapidă',    desc: 'Comenzi procesate instant, fără întârzieri.' },
  { icon: '/img/monitor.svg', title: 'Monitorizare vânzări',  desc: 'Vezi în timp real ce se vinde.' },
  { icon: '/img/cutie.svg',   title: 'Gestionare stocuri',    desc: 'Actualizare automată, fără lipsuri.' },
  { icon: '/img/om.svg',      title: 'Control angajați',      desc: 'Urmărești activitatea și performanța.' },
  { icon: '/img/stea.svg',    title: 'Experiență mai bună',   desc: 'Plăți rapide și servicii eficiente.' },
]

const whyFallback = [
  { title: 'Expertiză în HoReCa România', desc: 'Implementări reale în afaceri HoReCa din toată țara.' },
  { title: 'Soluții personalizate', desc: 'Configurăm sistemul în funcție de fluxul tău operațional.' },
  { title: 'Implementare rapidă', desc: 'Instalare și training complet fără downtime.' },
  { title: 'Suport tehnic dedicat', desc: 'Intervenții rapide și mentenanță continuă.' },
  { title: 'Tehnologie stabilă', desc: 'Sisteme optimizate pentru volum mare de comenzi.' },
]

const menuItems = [
  { id: 'cafenea',         label: 'Cafenea',             icon: '/img/Cafenele.svg',                    bg: '/img/cafenele-bg.svg',                    bg2: '/img/cafenele-bg2.svg' },
  { id: 'bar',             label: 'Bar',                 icon: '/img/pub-uri-si-baruri.svg',            bg: '/img/pub-uri-si-baruri-bg.svg',            bg2: '/img/pub-uri-si-baruri-bg2.svg' },
  { id: 'fast-food',       label: 'Fast Food',           icon: '/img/Fast-food.svg',                    bg: '/img/fast-food-bg.svg',                    bg2: '/img/fast-food-bg2.svg' },
  { id: 'livrare',         label: 'Livrare',             icon: '/img/food-truck.svg',                   bg: '/img/food-truck-bg.svg',                   bg2: '/img/food-truck-bg2.svg' },
  { id: 'restaurant',      label: 'Restaurant',          icon: '/img/servicii-dining.svg',              bg: '/img/servicii-dining-bg.svg',              bg2: '/img/servicii-dining-bg2.svg' },
  { id: 'sala-evenimente', label: 'Sală de Evenimente',  icon: '/img/industria-ospitalitatii.svg',       bg: '/img/industria-ospitalitatii-bg.svg',       bg2: '/img/industria-ospitalitatii-bg2.svg' },
]

function RestaurantPage() {
  const location = useLocation()
  const pathId = location.pathname.slice(1)
  const [activeItem, setActiveItem] = useState(() =>
    menuItems.find(m => m.id === pathId)?.id ?? 'cafenea'
  )
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [content, setContent] = useState<ContentData | null>(null)
  const [bulletsOpen, setBulletsOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(false)
  const [formData, setFormData] = useState({ phone: '', firstName: '', lastName: '', email: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
      el.classList.remove('is-visible')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [content])

  useEffect(() => {
    setContent(null)
    setOpenFaq(null)
    fetch(`/text/${activeItem}.json`)
      .then(r => r.json())
      .then((data: ContentData) => setContent(data))
      .catch(() => setContent(null))
  }, [activeItem])

  const handleSubmit = async () => {
    if (!formData.phone && !formData.email) return
    setFormStatus('sending')
    const text =
      `📋 *Lead nou RSistems*\n` +
      `📞 Telefon: ${formData.phone || '—'}\n` +
      `👤 Nume: ${formData.lastName || '—'} ${formData.firstName || '—'}\n` +
      `📧 Email: ${formData.email || '—'}`
    try {
      const res = await fetch(
        `https://api.telegram.org/bot8689527569:AAHHCHXuJW1D9bio0dsnjnSRyIUSDH7sMQ4/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: 5599538468, text, parse_mode: 'Markdown' }),
        }
      )
      if (res.ok) {
        setFormStatus('sent')
        setFormData({ phone: '', firstName: '', lastName: '', email: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const seoMeta: Record<string, { title: string; description: string; keywords: string }> = {
    restaurant: {
      title: 'Sistem POS Restaurant România – Automatizare și Gestiune Completă',
      description: 'Sistem POS profesional pentru restaurante din România. Automatizare comenzi, KDS bucătărie, gestiune stocuri, rapoarte vânzări în timp real, integrare delivery Glovo, Tazz, Bolt Food. Demo gratuit RSistems!',
      keywords: 'sistem POS restaurant, automatizare restaurant, software restaurant, POS restaurant Romania, gestiune restaurant, KDS bucatarie, comenzi digitale restaurant, rapoarte vanzari restaurant, casa de marcat restaurant, digitalizare restaurant',
    },
    cafenea: {
      title: 'Sistem POS Cafenea și Coffee Shop – Software Automatizare Cafenea',
      description: 'Software POS pentru cafenele și coffee shop-uri. Servire rapidă, gestiune stocuri, programe fidelizare, rapoarte zilnice, fiscalizare ANAF. Soluție completă RSistems. Demo gratuit!',
      keywords: 'POS cafenea, sistem POS cafenea, automatizare cafenea, software cafenea, gestiune cafenea, coffee shop POS, program fidelizare cafenea, gestiune stocuri cafenea',
    },
    bar: {
      title: 'Sistem POS Bar și Pub – Automatizare și Gestiune Băuturi',
      description: 'Sistem POS profesional pentru baruri și pub-uri. Gestiune băuturi și ingrediente, comenzi instant, control angajați, rapoarte vânzări, prevenire pierderi. Soluție HoReCa completă.',
      keywords: 'POS bar, sistem POS bar, automatizare bar, software bar, gestiune bar, POS pub, gestiune bauturi, control vanzari bar',
    },
    'fast-food': {
      title: 'Sistem POS Fast-Food – Automatizare, Kiosk și Integrare Delivery',
      description: 'POS profesional pentru fast-food. Self-order kiosk, KDS bucătărie, integrare Glovo Tazz Bolt Food, gestiune stocuri în timp real, comenzi rapide. Soluție completă RSistems.',
      keywords: 'POS fast-food, sistem POS fast food, automatizare fast food, kiosk autoservire fast food, integrare delivery, comenzi rapide fast food, KDS fast food',
    },
    livrare: {
      title: 'Sistem POS Delivery și Takeaway – Integrare Glovo, Tazz, Bolt Food',
      description: 'Soluție POS completă pentru delivery și takeaway. Integrare directă cu Glovo, Tazz și Bolt Food, gestiune comenzi online centralizată și rapoarte per canal de vânzare.',
      keywords: 'POS delivery, sistem POS livrare, automatizare delivery, integrare Glovo, integrare Tazz, integrare Bolt Food, comenzi online restaurant, takeaway POS',
    },
    'sala-evenimente': {
      title: 'Sistem POS Sală de Evenimente – Gestiune Rezervări și Meniuri',
      description: 'POS profesional pentru săli de evenimente și industria ospilalității. Gestiune rezervări, facturare, control meniuri, rapoarte complete. Soluție RSistems.',
      keywords: 'POS sala evenimente, sistem POS evenimente, automatizare sala evenimente, gestiune rezervari, software evenimente, POS ospitalitate',
    },
  }
  const meta = seoMeta[pathId] ?? seoMeta['restaurant']

  const faqPageJsonLd = content?.faq && content.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <div className="rp-page">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={`/${pathId}`}
        keywords={meta.keywords}
        breadcrumbs={[
          { name: 'Acasă', url: '/' },
          { name: menuItems.find(m => m.id === pathId)?.label ?? 'Restaurant', url: `/${pathId}` },
        ]}
        jsonLd={faqPageJsonLd ? [faqPageJsonLd] : undefined}
      />
      <Header />

      {/* Hero */}
      <section className="rp-hero">
        <img src="/img/tip-bg.svg" alt="" className="rp-hero-bg" />
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
          <a href="https://wa.me/40751088772?text=Bun%C4%83!%20Vreau%20s%C4%83%20%C3%AEncep%20s%C4%83%20folosesc%20RSistems." className="rp-hero-btn" target="_blank" rel="noopener noreferrer">
            Începe acum
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
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
                <h2 className="rp-content-title" data-animate>{content?.heroTitle ?? active.label}</h2>
                <img
                  src={active.bg}
                  alt={active.label}
                  className="rp-content-img"
                />
                <div className="rp-info-row" data-stagger>
                  <div className="rp-info-col">
                    <h3>Ce este automatizarea?</h3>
                    <p className="rp-info-preview">
                      {(() => {
                        const full = content?.description ?? 'Automatizarea înseamnă digitalizarea tuturor operațiunilor zilnice: comenzi prin POS touchscreen, bon fiscal, transmitere comenzi, gestiune stocuri și monitorizare vânzări în timp real.'
                        const preview = full.slice(0, 40) + (full.length > 40 ? '...' : '')
                        return descOpen ? full : preview
                      })()}
                    </p>
                    <button
                      className={`rp-info-more-btn${descOpen ? ' open' : ''}`}
                      onClick={() => setDescOpen(o => !o)}
                    >
                      <span>{descOpen ? 'Ascunde' : 'Citește mai mult'}</span>
                      <svg className="rp-info-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="#1FB6B2" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="rp-info-col">
                    <h3>Funcționalități cheie</h3>
                    {(() => {
                      const bullets = content?.bullets ?? [
                        'Gestionare comenzi în timp real',
                        'Rapoarte de vânzări zilnice și lunare',
                        'Control stocuri și inventar',
                        'Integrare cu case de marcat fiscale',
                        'Suport multi-locație și franciză',
                      ]
                      return (
                        <>
                          <ul>
                            {bullets.slice(0, 1).map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                          <div className={`rp-info-collapse${bulletsOpen ? ' open' : ''}`}>
                            <div className="rp-info-collapse-inner">
                              <ul>
                                {bullets.slice(1).map((b, i) => <li key={i}>{b}</li>)}
                              </ul>
                            </div>
                          </div>
                          <button
                            className={`rp-info-more-btn${bulletsOpen ? ' open' : ''}`}
                            onClick={() => setBulletsOpen(o => !o)}
                          >
                            <span>{bulletsOpen ? 'Ascunde' : 'Citește mai mult'}</span>
                            <svg className="rp-info-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
                              <path d="M1 1L6 6L11 1" stroke="#1FB6B2" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* Benefits */}
      <section className="rp-benefits" data-animate>
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
        <div className="rp-why-left" data-animate>
          <h2 className="rp-why-title">De ce alegi compania RSistems</h2>
          <p className="rp-why-subtitle">Soluții complete care aduc eficiență, creștere și clienți mulțumiți.</p>
          <div className="rp-why-cards" data-stagger>
            {(content?.whyReasons ?? whyFallback).map((r, i) => (
              <div key={i} className="rp-why-card">
                <span className="rp-why-card-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="rp-why-card-body">
                  <h3 className="rp-why-card-title">{r.title}</h3>
                  <p className="rp-why-card-desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rp-why-right">
          <img
            src={menuItems.find(i => i.id === activeItem)?.bg2 ?? ''}
            alt="De ce RSistems"
            className="rp-why-img"
          />
        </div>
      </section>

      {/* FAQ + Contact form */}
      <section className="rp-faq-section" id="rp-faq" data-animate>
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
            <input
              type="tel"
              placeholder=""
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <div className="rp-form-row">
            <div className="rp-form-group">
              <label>Nume</label>
              <input
                type="text"
                placeholder=""
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
              />
            </div>
            <div className="rp-form-group">
              <label>Prenume</label>
              <input
                type="text"
                placeholder=""
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
              />
            </div>
          </div>
          <div className="rp-form-group">
            <label>Adresă de e-mail de serviciu</label>
            <input
              type="email"
              placeholder=""
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <button
            className="rp-form-submit"
            onClick={handleSubmit}
            disabled={formStatus === 'sending'}
          >
            {formStatus === 'sending' ? 'Se trimite...' : formStatus === 'sent' ? 'Trimis ✓' : 'Trimite'}
          </button>
          {formStatus === 'sent' && <p className="rp-form-success">Mesajul a fost trimis cu succes!</p>}
          {formStatus === 'error' && <p className="rp-form-error">Eroare la trimitere. Încearcă din nou.</p>}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default RestaurantPage
