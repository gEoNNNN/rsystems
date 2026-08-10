import { useState, useEffect, useRef } from 'react'
import './ParteneriPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

const partnerLogos = [
  '/img/logoparteneri/27.sushi_master_png.png',
  '/img/logoparteneri/LogoDesktop.png',
  '/img/logoparteneri/Logo_Rem_s.png',
  '/img/logoparteneri/baneasa-logo-maramura.jpg',
  '/img/logoparteneri/bosco-meaning-forest.jpg',
  '/img/logoparteneri/223207132_1662595560618228_7621162525100529872_n.jpg',
  '/img/logoparteneri/328154078_940766720248327_5305514490057701471_n.jpg',
  '/img/logoparteneri/347796824_1447988932613792_6813527696715963790_n.jpg',
  '/img/logoparteneri/431080677_786494806847675_8878245591464981613_n.jpg',
  '/img/logoparteneri/461414983_956360793189966_803625503366461516_n.jpg',
  '/img/logoparteneri/IOS Icon - 1.png',
  '/img/logoparteneri/images (1).jpg',
]

function ParteneriPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    activity: '',
    message: ''
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Bună! Vreau să devin partener RSistems.%0A%0ANume: ${formData.name}%0AEmail: ${formData.email}%0ATelefon: ${formData.phone}%0ACompanie: ${formData.company}%0ATip activitate: ${formData.activity}%0AMesaj: ${formData.message}`
    window.open(`https://wa.me/40751088772?text=${message}`, '_blank')
  }

  return (
    <div className="parteneri-page">
      <SEO
        title="Devino Partener RSistems - Creștem împreună"
        description="Oferă clienților tăi soluții performante pentru automatizarea restaurantelor și descoperă o nouă sursă de venit cu programul de parteneriat RSistems."
        canonical="/devino-partener"
      />
      <Header />

      <section className="parteneri-hero">
        <div className="parteneri-hero-overlay" />
        <img src="/img/tip-bg.svg" alt="" className="parteneri-hero-bg" />
        <div className="parteneri-hero-container">
          <div className="parteneri-hero-left">
            <p className="parteneri-hero-eyebrow">Creștem împreună.</p>
            <h1 className="parteneri-hero-title">Devino partener RSistems</h1>
            <p className="parteneri-hero-subtitle">
              Oferă clienților tăi soluții performante pentru automatizarea restaurantelor și descoperă o nouă sursă de venit.
            </p>
            <a href="#formular" className="parteneri-hero-btn">
              Devino partener
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="parteneri-hero-right">
            <img src="/img/pos-1.jpg" alt="Parteneriat RSistems" className="parteneri-hero-image" />
          </div>
        </div>
      </section>

      <section className="parteneri-benefits" data-animate>
        <div className="parteneri-benefits-header">
          <p className="parteneri-section-eyebrow">De ce să devii partener RSistems</p>
          <h2 className="parteneri-benefits-title">Avantaje pentru tine și clienții tăi</h2>
        </div>
        <div className="parteneri-benefits-grid" data-stagger>
          <div className="parteneri-benefit-card">
            <div className="parteneri-benefit-icon">
              <img src="/img/comenzi.svg" alt="Soluții complete" />
            </div>
            <h3 className="parteneri-benefit-title">Soluții complete HoReCa</h3>
            <p className="parteneri-benefit-text">
              Acces la un portofoliu complet de software și hardware pentru restaurante, cafenele și baruri.
            </p>
          </div>

          <div className="parteneri-benefit-card">
            <div className="parteneri-benefit-icon">
              <img src="/img/rapoarte.svg" alt="Parteneriat profitabil" />
            </div>
            <h3 className="parteneri-benefit-title">Parteneriat profitabil</h3>
            <p className="parteneri-benefit-text">
              Creează o nouă sursă de venit și câștigă comisioane atractive din fiecare proiect sau client recomandat.
            </p>
          </div>

          <div className="parteneri-benefit-card">
            <div className="parteneri-benefit-icon">
              <img src="/img/suport.svg" alt="Suport dedicat" />
            </div>
            <h3 className="parteneri-benefit-title">Suport dedicat</h3>
            <p className="parteneri-benefit-text">
              Echipa noastră tehnici și de vânzări te ajută la fiecare pas, de la prezentare până la implementare.
            </p>
          </div>

          <div className="parteneri-benefit-card">
            <div className="parteneri-benefit-icon">
              <img src="/img/optimizare.svg" alt="Training și certificare" />
            </div>
            <h3 className="parteneri-benefit-title">Training și certificare</h3>
            <p className="parteneri-benefit-text">
              Instruire completă pe produse și acces la materiale de marketing pentru a-ți prezenta oferta.
            </p>
          </div>

          <div className="parteneri-benefit-card">
            <div className="parteneri-benefit-icon">
              <img src="/img/integrare.svg" alt="Marketing și materiale" />
            </div>
            <h3 className="parteneri-benefit-title">Marketing și materiale dedicate</h3>
            <p className="parteneri-benefit-text">
              Beneficiezi de materiale promoționale, prezentări și suport pentru promovarea soluțiilor RSistems.
            </p>
          </div>
        </div>
      </section>

      <section className="parteneri-program" data-animate>
        <div className="parteneri-program-split">
          <div className="parteneri-program-left">
            <p className="parteneri-section-eyebrow">Pentru cine este programul</p>
            <h2 className="parteneri-program-title">Căutăm parteneri ambițioși ca tine</h2>
            <div className="parteneri-program-list">
              <div className="parteneri-program-item">
                <div className="parteneri-program-check">✓</div>
                <span>Integratori IT și software</span>
              </div>
              <div className="parteneri-program-item">
                <div className="parteneri-program-check">✓</div>
                <span>Consultanți și specialiști POS</span>
              </div>
              <div className="parteneri-program-item">
                <div className="parteneri-program-check">✓</div>
                <span>Distribuitori de echipamente</span>
              </div>
              <div className="parteneri-program-item">
                <div className="parteneri-program-check">✓</div>
                <span>Agenți de marketing și digitalizare</span>
              </div>
            </div>
          </div>
          <div className="parteneri-program-right">
            <img src="/img/pos-2.jpg" alt="Program parteneriat" className="parteneri-program-image" />
          </div>
        </div>
      </section>

      <section className="parteneri-process" data-animate>
        <div className="parteneri-process-header">
          <h2 className="parteneri-process-title">Cum funcționează</h2>
          <p className="parteneri-process-subtitle">Un proces simplu, beneficii reale</p>
        </div>
        <div className="parteneri-process-grid" data-stagger>
          <div className="parteneri-process-step">
            <div className="parteneri-process-number">1</div>
            <div className="parteneri-process-content">
              <h3 className="parteneri-process-step-title">Completezi formularul</h3>
              <p className="parteneri-process-text">
                Trimite cererea și contactează-ne. Echipa noastră te va contacta în maximum 24h.
              </p>
            </div>
          </div>

          <div className="parteneri-process-step">
            <div className="parteneri-process-number">2</div>
            <div className="parteneri-process-content">
              <h3 className="parteneri-process-step-title">Discutăm colaborarea</h3>
              <p className="parteneri-process-text">
                Stabilim împreună condițiile de parteneriat și îți trimitem toate detaliile contractuale.
              </p>
            </div>
          </div>

          <div className="parteneri-process-step">
            <div className="parteneri-process-number">3</div>
            <div className="parteneri-process-content">
              <h3 className="parteneri-process-step-title">Devii partener</h3>
              <p className="parteneri-process-text">
                Semnăm contractul de parteneriat și îți oferim acces la platformă și materiale de training.
              </p>
            </div>
          </div>

          <div className="parteneri-process-step">
            <div className="parteneri-process-number">4</div>
            <div className="parteneri-process-content">
              <h3 className="parteneri-process-step-title">Începi să vinzi</h3>
              <p className="parteneri-process-text">
                Promovezi soluțiile RSistems, iar noi te ajutăm cu suport tehnic și la fiecare pas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="parteneri-form-section" id="formular" data-animate>
        <div className="parteneri-form-container">
          <div className="parteneri-form-left">
            <h2 className="parteneri-form-title">Mai să colaborăm</h2>
            <p className="parteneri-form-subtitle">
              Completează formularul sau contactează-ne direct și echipa noastră îți va răspunde în cel mai scurt timp pentru a discuta despre parteneriat.
            </p>
            <div className="parteneri-form-contact">
              <div className="parteneri-form-contact-item">
                <img src="/img/suport.svg" alt="Phone" />
                <div>
                  <div className="parteneri-form-contact-label">Răspuns rapid</div>
                  <div className="parteneri-form-contact-value">Te contactăm în maximum 24h</div>
                </div>
              </div>
              <div className="parteneri-form-contact-item">
                <img src="/img/comenzi.svg" alt="Email" />
                <div>
                  <div className="parteneri-form-contact-label">Parteneriat pe termen lung</div>
                  <div className="parteneri-form-contact-value">Construim împreună o relație de durată</div>
                </div>
              </div>
              <div className="parteneri-form-contact-item">
                <img src="/img/optimizare.svg" alt="Location" />
                <div>
                  <div className="parteneri-form-contact-label">Consultanță și suport</div>
                  <div className="parteneri-form-contact-value">Echipă dedicată pentru parteneri</div>
                </div>
              </div>
            </div>
          </div>

          <div className="parteneri-form-right">
            <form className="parteneri-form" onSubmit={handleSubmit}>
              <div className="parteneri-form-row">
                <div className="parteneri-form-group">
                  <label className="parteneri-form-label">Nume*</label>
                  <input
                    type="text"
                    className="parteneri-form-input"
                    placeholder="Numele tău"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="parteneri-form-group">
                  <label className="parteneri-form-label">Email*</label>
                  <input
                    type="email"
                    className="parteneri-form-input"
                    placeholder="email@exemplu.ro"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="parteneri-form-row">
                <div className="parteneri-form-group">
                  <label className="parteneri-form-label">Telefon*</label>
                  <input
                    type="tel"
                    className="parteneri-form-input"
                    placeholder="+40 XXX XXX XXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="parteneri-form-group">
                  <label className="parteneri-form-label">Companie</label>
                  <input
                    type="text"
                    className="parteneri-form-input"
                    placeholder="Numele companiei"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="parteneri-form-group">
                <label className="parteneri-form-label">Tip de activitate*</label>
                <select
                  className="parteneri-form-select"
                  value={formData.activity}
                  onChange={e => setFormData({ ...formData, activity: e.target.value })}
                  required
                >
                  <option value="">Selectează</option>
                  <option value="integrator">Integrator IT și software</option>
                  <option value="consultant">Consultant și specialist POS</option>
                  <option value="distribuitor">Distribuitor de echipamente</option>
                  <option value="marketing">Agent de marketing și digitalizare</option>
                  <option value="altele">Altele</option>
                </select>
              </div>

              <div className="parteneri-form-group">
                <label className="parteneri-form-label">Mesaj</label>
                <textarea
                  className="parteneri-form-textarea"
                  placeholder="Spune-ne mai multe despre tine și despre cum vrei să colaborăm..."
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="parteneri-form-footer">
                <label className="parteneri-form-checkbox">
                  <input type="checkbox" required />
                  <span>Sunt de acord cu prelucrarea datelor personale. Citește <a href="/politica-confidentialitate">Politica de confidențialitate</a></span>
                </label>
                <button type="submit" className="parteneri-form-submit">
                  Trimite solicitarea
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="parteneri-logos" data-animate>
        <div className="parteneri-logos-header">
          <h2 className="parteneri-logos-title">Partenerii noștri de încredere</h2>
        </div>
        <LogoCarousel logos={partnerLogos} />
      </section>

      <section className="parteneri-cta" data-animate>
        <div className="parteneri-cta-content">
          <h2 className="parteneri-cta-title">Vrei să dezvoltăm împreună piața HoReCa?</h2>
          <p className="parteneri-cta-text">
            Contactează-ne acum și descoperă cum putem construi un parteneriat de succes.
          </p>
          <a
            href="https://wa.me/40751088772?text=Bună! Vreau să devin partener RSistems."
            target="_blank"
            rel="noopener noreferrer"
            className="parteneri-cta-btn"
          >
            Devino partener acum
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function LogoCarousel({ logos }: { logos: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const scrollWidth = track.scrollWidth
    const animationDuration = logos.length * 3

    track.style.setProperty('--scroll-width', `${scrollWidth}px`)
    track.style.setProperty('--animation-duration', `${animationDuration}s`)
  }, [logos])

  return (
    <div className="logo-carousel">
      <div className="logo-carousel-track" ref={trackRef}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="logo-carousel-item">
            <img src={logo} alt="Partner logo" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParteneriPage
