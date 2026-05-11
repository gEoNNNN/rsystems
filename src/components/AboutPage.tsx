import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AboutPage.css'
import Header from './Header'
import Footer from './Footer'

const values = [
  {
    icon: '/img/Livrare.svg',
    title: 'Implementare rapidă',
    desc: 'Sisteme funcționale în câteva ore. Fără training complex, fără perioade lungi de onboarding — ești operațional din prima zi.',
  },
  {
    icon: '/img/Inventar.svg',
    title: 'Fiabilitate garantată',
    desc: 'Platformă stabilă cu uptime ridicat, proiectată să funcționeze fără întreruperi în fiecare schimb, indiferent de volum.',
  },
  {
    icon: '/img/Managementul.svg',
    title: 'Suport real',
    desc: 'Oameni reali, nu chatboți. Echipa noastră înțelege specificul HoReCa și răspunde rapid la orice problemă operațională.',
  },
  {
    icon: '/img/Meniu.svg',
    title: 'Soluții personalizate',
    desc: 'Fiecare implementare este configurată pentru afacerea ta: restaurant, cafenea, fast food sau lanț cu mai multe locații.',
  },
]

function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Counter animation for hero cards
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-count]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const target = parseInt(el.dataset.count ?? '0')
        const start  = parseInt(el.dataset.start  ?? '0')
        const suffix = el.dataset.suffix ?? ''
        const duration = 1400
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(start + eased * (target - start)) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.unobserve(el)
      })
    }, { threshold: 0.5 })
    counters.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Scroll animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="about-page">
      <Header />

      {/* ── Hero ── */}
      <section className="ab-hero">
        <div className="ab-hero-inner">
          <div className="ab-hero-left" data-animate>
            <span className="ab-tag">Despre noi</span>
            <h1 className="ab-hero-h1">
              Automatizăm HoReCa<br />din România
            </h1>
            <p className="ab-hero-p">
              Din 2018 ajutăm restaurante, cafenele și baruri să funcționeze mai eficient — cu sisteme POS, gestiune stocuri, kitchen display și integrare fiscală, toate dintr-un singur ecosistem.
            </p>
            <div className="ab-hero-actions">
              <a href="https://wa.me/40517508772" className="ab-btn-primary" target="_blank" rel="noopener noreferrer">Discută cu noi</a>
              <Link to="/preturi" className="ab-btn-ghost">Vezi prețuri</Link>
            </div>
          </div>
          <div className="ab-hero-right">
            <div className="ab-hero-card">
              <img src="/img/clienti.svg" alt="" className="ab-hero-card-icon" />
              <div className="ab-hero-card-text">
                <span className="ab-hero-card-val" data-count="100" data-suffix="+" data-start="0">0+</span>
                <span className="ab-hero-card-lbl">Clienți activi</span>
              </div>
            </div>
            <div className="ab-hero-card">
              <img src="/img/stea.svg" alt="" className="ab-hero-card-icon" />
              <div className="ab-hero-card-text">
                <span className="ab-hero-card-val" data-count="8" data-suffix="+" data-start="0">0+</span>
                <span className="ab-hero-card-lbl">Ani experiență</span>
              </div>
            </div>
            <div className="ab-hero-card">
              <img src="/img/suport.svg" alt="" className="ab-hero-card-icon" />
              <div className="ab-hero-card-text">
                <span className="ab-hero-card-val">24/7</span>
                <span className="ab-hero-card-lbl">Suport dedicat</span>
              </div>
            </div>
            <div className="ab-hero-card">
              <img src="/img/implementare.svg" alt="" className="ab-hero-card-icon" />
              <div className="ab-hero-card-text">
                <span className="ab-hero-card-val" data-count="2018" data-start="2010">2010</span>
                <span className="ab-hero-card-lbl">An fondare</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="ab-story" data-animate>
        <div className="ab-story-wrap">
          <div className="ab-story-text">
            <span className="ab-section-tag">Povestea noastră</span>
            <h2 className="ab-section-h2">Cine suntem</h2>
            <p>RSistems s-a născut în 2018 din dorința de a simplifica operațiunile zilnice ale afacerilor HoReCa. Am văzut restaurante luptând cu procese manuale, erori de comunicare între sală și bucătărie și lipsă totală de vizibilitate asupra costurilor.</p>
            <p>Astăzi oferim un ecosistem complet — de la sistemul POS și gestiunea stocurilor, până la kitchen display, comenzi digitale și integrare cu casele de marcat fiscale — toate conectate, toate gândite pentru HoReCa.</p>
          </div>
          <div className="ab-story-visual">
            <img src="/img/despre.svg" alt="RSistems HoReCa" className="ab-story-img" />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="ab-values" data-animate>
        <div className="ab-values-wrap">
          <div className="ab-values-header">
            <span className="ab-section-tag">Valorile noastre</span>
            <h2 className="ab-section-h2">De ce RSistems</h2>
            <p className="ab-values-sub">Suntem parteneri pe termen lung, nu furnizori de software. Asta înseamnă că succesul afacerii tale contează pentru noi la fel de mult.</p>
          </div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <div key={i} className="ab-value-item">
                <div className="ab-value-icon-wrap">
                  <img src={v.icon} alt="" className="ab-value-icon" />
                </div>
                <div className="ab-value-body">
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="ab-contact" data-animate>
        <div className="ab-contact-wrap">
          <div className="ab-contact-header">
            <h2>Suntem la dispoziția ta</h2>
            <p>Contactează-ne pentru o demonstrație gratuită sau pentru orice întrebare despre soluțiile noastre.</p>
          </div>
          <div className="ab-contact-cards">
            <a href="tel:+40517508772" className="ab-contact-card">
              <div className="ab-contact-icon-wrap">
                <img src="/img/phone.svg" alt="" />
              </div>
              <div>
                <div className="ab-contact-label">Telefon</div>
                <div className="ab-contact-val">+40 517 508 772</div>
              </div>
            </a>
            <a href="mailto:welcome@rsistems.ro" className="ab-contact-card">
              <div className="ab-contact-icon-wrap">
                <img src="/img/email.svg" alt="" />
              </div>
              <div>
                <div className="ab-contact-label">Email</div>
                <div className="ab-contact-val">welcome@rsistems.ro</div>
              </div>
            </a>
            <a href="https://wa.me/40517508772" className="ab-contact-card" target="_blank" rel="noopener noreferrer">
              <div className="ab-contact-icon-wrap">
                <img src="/img/planeta.svg" alt="" />
              </div>
              <div>
                <div className="ab-contact-label">WhatsApp</div>
                <div className="ab-contact-val">Disponibil 24/7</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
