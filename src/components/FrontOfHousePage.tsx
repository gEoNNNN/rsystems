import { useState, useEffect } from 'react'
import './FrontOfHousePage.css'
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

const faqIcons = [
  '/img/stea1.svg',
  '/img/persoane.svg',
  '/img/smile.svg',
  '/img/chart.svg',
  '/img/mancare.svg',
  '/img/om1.svg',
]

const faqData = [
  {
    q: 'Ce informații sunt necesare în evidență?',
    a: 'Sistemul POS RSistems colectează automat toate datele esențiale: comenzi, plăți, stocuri și rapoarte de vânzări în timp real, fără a necesita introducere manuală.'
  },
  {
    q: 'Ce rol au ospătarii în servicii?',
    a: 'Ospătarii folosesc tablete sau terminale POS pentru a lua comenzile direct la masă, reducând erorile și accelerând serviciul pentru fiecare client.'
  },
  {
    q: 'Cum asigurați satisfacția completă?',
    a: 'Prin monitorizare continuă, training dedicat și suport tehnic disponibil 24/7 pentru toate locațiile partenere din rețeaua RSistems.'
  },
  {
    q: 'Cum controlez costurile și stocurile?',
    a: 'Sistemul actualizează automat stocurile la fiecare comandă și generează alerte când produsele se apropie de limita minimă setată de tine.'
  },
  {
    q: 'Cum gestionez mesele cu încredere?',
    a: 'Planul de masă digital vă permite să vizualizați în timp real starea fiecărei mese, numărul de clienți și comenzile active din restaurant.'
  },
  {
    q: 'Cum afișez preferințele clienților?',
    a: 'Sistemul salvează istoricul comenzilor și preferințele fiecărui client, permițând personalizarea serviciului și a recomandărilor pentru fidelizare.'
  },
]

const mainTabs = [
  { id: 'pos',      label: 'POS' },
  { id: 'arrival',  label: 'Arrival Screen' },
  { id: 'kiosk',    label: 'Kiosk' },
  { id: 'qrmenu',   label: 'QR Menu' },
  { id: 'qrorder',  label: 'QR Order' },
  { id: 'delivery', label: 'Delivery & Takeaway' },
  { id: 'pay',      label: 'RSistem Pay' },
]

const subTabs = [
  { id: 'upselling', label: 'Upselling Prompts' },
  { id: 'pizza',     label: 'Pizza Builder' },
  { id: 'combo',     label: 'Combo Set Recommendations' },
  { id: 'floor',     label: 'Floor Plan' },
  { id: 'display',   label: 'Centralised Customer Display' },
]

const tabContent: Record<string, { title: string; description: string }> = {
  pos:      { title: 'Sistema POS',           description: 'Text foate foarte foarte foarte foarte foarte foarte foarte foartefoarte foarte foarte foarte lung' },
  arrival:  { title: 'Arrival Screen',        description: 'Afișați mesaje personalizate de bun venit și informații relevante pe ecranele de la intrarea în restaurant.' },
  kiosk:    { title: 'Kiosk Autoservire',     description: 'Permiteți clienților să comande singuri din chioșcuri interactive, reducând timpii de așteptare și costurile cu personalul.' },
  qrmenu:   { title: 'Meniu QR',              description: 'Clienții scanează un cod QR și accesează meniul digital actualizat în timp real, fără a fi necesare meniuri fizice.' },
  qrorder:  { title: 'Comandă QR',            description: 'Clienții plasează comenzi direct de la masă prin telefon, iar comenzile ajung instant în bucătărie fără intervenția ospătarului.' },
  delivery: { title: 'Delivery & Takeaway',   description: 'Gestionați comenzile de livrare și ridicare dintr-un singur sistem, integrat cu platformele de food delivery.' },
  pay:      { title: 'RSistem Pay',           description: 'Procesare rapidă a plăților prin card, NFC sau QR, cu bonuri electronice și reconciliere automată a încasărilor.' },
}

const subTabContent: Record<string, { heading: string; paragraphs: string[]; image: string }> = {
  upselling: {
    heading: 'Upsell Menu Items With Dynamic Prompts And Suggestions',
    paragraphs: [
      'Recommend menu-specific items to customers during order-taking to boost sales and improve average spend.',
      'Recommend menu-specific items to customers during order-taking to boost sales and improve average spend.',
      'Recommend menu-specific items to customers during order-taking to boost sales and improve average spend.',
    ],
    image: '/img/POS 1.jpg',
  },
  pizza: {
    heading: 'Build Custom Pizzas With Flexible Ingredient Options',
    paragraphs: [
      'Allow customers to customize every aspect of their pizza with an intuitive drag-and-drop builder.',
      'Set ingredient combinations, pricing rules, and visual previews to guide the customer experience.',
      'Sync custom orders directly to the kitchen display for accurate and efficient preparation.',
    ],
    image: '/img/POS 2.jpg',
  },
  combo: {
    heading: 'Boost Revenue With Smart Combo Set Recommendations',
    paragraphs: [
      'Automatically suggest combo sets based on current order items and customer purchase history.',
      'Configure bundle discounts and limited-time offers to drive higher transaction values.',
      'Track combo performance with built-in analytics to refine your promotions over time.',
    ],
    image: '/img/POS 3.jpg',
  },
  floor: {
    heading: 'Manage Your Floor Plan With a Real-Time Visual Layout',
    paragraphs: [
      'Drag and drop tables on an interactive floor map to match your restaurant layout exactly.',
      'View table status, party size, and open time at a glance from the host station or any device.',
      'Reassign tables and merge checks instantly without disrupting the guest experience.',
    ],
    image: '/img/POS 1.jpg',
  },
  display: {
    heading: 'Keep Customers Informed With a Centralised Display Screen',
    paragraphs: [
      'Show real-time order progress, promotional content, and wait times on customer-facing screens.',
      'Customise display layouts per location or time of day for maximum relevance and engagement.',
      'Integrate with kitchen operations to automatically update customers when their order is ready.',
    ],
    image: '/img/POS 2.jpg',
  },
}

function FrontOfHousePage() {
  const [activeTab, setActiveTab]         = useState('pos')
  const [activeSubTab, setActiveSubTab]   = useState('upselling')
  const [openFaq, setOpenFaq]             = useState<number | null>(null)
  const [currentSlide, setCurrentSlide]   = useState(0)
  const [formData, setFormData]           = useState({ phone: '', firstName: '', lastName: '', email: '' })
  const [formStatus, setFormStatus]       = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const getItemWidthPercent = () => (window.innerWidth <= 700 ? 20 : 12.5)
  const [itemWidthPercent, setItemWidthPercent] = useState(getItemWidthPercent)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handleResize = () => setItemWidthPercent(getItemWidthPercent())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(p => p + 1), 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentSlide === partnerLogos.length) {
      setTimeout(() => {
        const track = document.querySelector('.carousel-track') as HTMLElement
        if (track) {
          track.style.transition = 'none'
          setCurrentSlide(0)
          setTimeout(() => { track.style.transition = 'transform 1s ease-in-out' }, 50)
        }
      }, 1000)
    }
  }, [currentSlide])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
      el.classList.remove('is-visible')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [activeTab, activeSubTab])

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    setActiveSubTab('upselling')
  }

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

  const currentTab    = tabContent[activeTab]
  const currentSubTab = subTabContent[activeSubTab]

  return (
    <div className="foh-page">
      <SEO
        title="Front of House – Soluții Sală RSistems"
        description="Soluții POS complete pentru sala restaurantului: comenzi la masă, meniu QR, kiosk autoservire și plăți rapide. Demo gratuit RSistems."
        canonical="/front-of-house"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="foh-hero">
        <img src="/img/tip bg.svg" alt="" className="foh-hero-bg" />
        <div className="foh-hero-content">
          <h1 className="foh-hero-heading">
            Software<br />
            pentru restaurant<br />
            <span className="foh-hero-accent">Front-of-House</span>
          </h1>
          <p className="foh-hero-description">
            Gestionează toate comenzile într-un singur loc, fără a avea nevoie de mai multe dispozitive.
            Servește mai rapid. Îmbunătățiți eficiența și susțineți creșterea pe termen lung.
          </p>
          <a href="https://wa.me/40517508772?text=Bun%C4%83!%20Vreau%20s%C4%83%20%C3%AEncep%20s%C4%83%20folosesc%20RSistems." className="foh-hero-btn" target="_blank" rel="noopener noreferrer">
            Începe acum
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── Logo Carousel ── */}
      <section className="partners-section" data-animate>
        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * itemWidthPercent}%)` }}
          >
            {[...partnerLogos, ...partnerLogos].map((logo, index) => {
              const realIndex = index % partnerLogos.length
              const isLarge   = realIndex >= 9 && realIndex <= 12
              return (
                <div key={index} className={`carousel-item${isLarge ? ' carousel-item-large' : ''}`}>
                  <img src={logo} alt={`Partner ${realIndex + 1}`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Product Tabs ── */}
      <section className="foh-products">
        {/* Main tab grid — centered with teal squares */}
        <div className="foh-tab-grid">
          {mainTabs.map(tab => (
            <button
              key={tab.id}
              className={`foh-tab-box${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div className="foh-tab-body" data-animate>
          <h2 className="foh-product-title">{currentTab.title}</h2>
          <p className="foh-product-desc">{currentTab.description}</p>

          {/* Sub-tabs */}
          <div className="foh-subtab-bar">
            {subTabs.map(st => (
              <button
                key={st.id}
                className={`foh-subtab-btn${activeSubTab === st.id ? ' active' : ''}`}
                onClick={() => setActiveSubTab(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sub-tab content */}
          <div className="foh-subtab-content">
            <div className="foh-subtab-left">
              <h3 className="foh-subtab-heading">{currentSubTab.heading}</h3>
              {currentSubTab.paragraphs.map((p, i) => (
                <p key={i} className="foh-subtab-para">{p}</p>
              ))}
            </div>
            <div className="foh-subtab-right">
              <img src="/img/image 1.svg" alt={currentSubTab.heading} className="foh-subtab-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Section ── */}
      <section className="foh-platform" data-animate>
        {/* Left 66% — white with text */}
        <div className="foh-platform-left">
          <h2 className="foh-platform-heading">
            Ruleaza întreaga ta<br />
            afacere pe o<br />
            singura platforma
          </h2>
          <div className="foh-platform-divider" />
          <p className="foh-platform-desc">
            RSistems este un sistem POS și de management pentru restaurante, care utilizează analiza
            datelor pentru a oferi mai multă putere afacerilor din domeniul serviciilor alimentare.
          </p>
          <a href="https://wa.me/40517508772?text=Bun%C4%83!%20Vreau%20s%C4%83%20%C3%AEncep%20s%C4%83%20folosesc%20RSistems." className="foh-platform-btn" target="_blank" rel="noopener noreferrer">
            Începe acum
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right 66% — panel with dark card + images below */}
        <div className="foh-platform-right">
          <div className="foh-stats-dark-card">
            <div className="foh-stat-card">
              <img src="/img/serv.svg" alt="" className="foh-stat-icon" />
              <div className="foh-stat-number">50+</div>
              <p className="foh-stat-desc">Reducere a costurilor alimentare datorita controlului în timp real</p>
            </div>
            <div className="foh-stats-divider" />
            <div className="foh-stat-card">
              <img src="/img/serv.svg" alt="" className="foh-stat-icon" />
              <div className="foh-stat-number">50+</div>
              <p className="foh-stat-desc">Reducere a costurilor alimentare datorita controlului în timp real</p>
            </div>
            <div className="foh-stat-dots-col">
              <img src="/img/puncte.svg" alt="" className="foh-stats-dots" />
            </div>
          </div>
          <div className="foh-platform-images">
            <img src="/img/stanga.svg" alt="" className="foh-platform-img" />
            <div className="foh-mid-card">
              <div className="foh-mid-item">
                <img src="/img/Quality.svg" alt="" className="foh-mid-icon" />
                <div><div className="foh-mid-title">Quality</div><div className="foh-mid-sub">Control</div></div>
              </div>
              <div className="foh-mid-item">
                <img src="/img/Performance.svg" alt="" className="foh-mid-icon" />
                <div><div className="foh-mid-title">Performance</div><div className="foh-mid-sub">Tracking</div></div>
              </div>
              <div className="foh-mid-item">
                <img src="/img/Team.svg" alt="" className="foh-mid-icon" />
                <div><div className="foh-mid-title">Team</div><div className="foh-mid-sub">Management</div></div>
              </div>
              <div className="foh-mid-item">
                <img src="/img/Scalable growth.svg" alt="" className="foh-mid-icon" />
                <div><div className="foh-mid-title">Scalable growth</div><div className="foh-mid-sub">Growth</div></div>
              </div>
            </div>
            <img src="/img/drepata.svg" alt="" className="foh-platform-img" />
          </div>
        </div>
      </section>

      {/* ── FAQ + Contact ── */}
      <section className="foh-faq-section" id="foh-faq" data-animate>
        <div className="foh-faq-list">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className={`foh-faq-item${openFaq === idx ? ' open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="foh-faq-row">
                <img src={faqIcons[idx] ?? faqIcons[0]} alt="" className="foh-faq-icon" />
                <span className="foh-faq-q">{idx + 1}. {item.q}</span>
                <span className="foh-faq-chevron" aria-hidden="true" />
              </div>
              <div className="foh-faq-answer-wrap">
                <div className="foh-faq-answer-inner">
                  <p className="foh-faq-answer">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="foh-contact-form">
          <div className="foh-form-group">
            <label>Telefon de serviciu</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <div className="foh-form-row">
            <div className="foh-form-group">
              <label>Nume</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
              />
            </div>
            <div className="foh-form-group">
              <label>Prenume</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
              />
            </div>
          </div>
          <div className="foh-form-group">
            <label>Adresă de e-mail de serviciu</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <button
            className="foh-form-submit"
            onClick={handleSubmit}
            disabled={formStatus === 'sending'}
          >
            {formStatus === 'sending' ? 'Se trimite...' : formStatus === 'sent' ? 'Trimis ✓' : 'Trimite'}
          </button>
          {formStatus === 'sent'  && <p className="foh-form-success">Mesajul a fost trimis cu succes!</p>}
          {formStatus === 'error' && <p className="foh-form-error">Eroare la trimitere. Încearcă din nou.</p>}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FrontOfHousePage
