import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import './Demo.css'

const videos = [
  {
    id: 'B5DL4_vX4bU',
    title: 'Prezentare generală RSistems',
    desc: 'O privire completă asupra platformei — comenzi, meniu digital, plăți și rapoarte.',
    tag: 'Introducere',
  },
  {
    id: 'tVvzuVqapo4',
    title: 'Funcționalități POS',
    desc: 'Cum funcționează terminalul POS în restaurant, cafenea sau fast-food.',
    tag: 'POS',
  },
  {
    id: 'JYOpx6Lrk7c',
    title: 'Rapoarte & Dashboard',
    desc: 'Vizualizarea datelor de vânzări, angajați și stocuri în timp real.',
    tag: 'Rapoarte',
  },
]

const features = [
  {
    title: 'Implementare în 24h',
    desc: 'Sistemul este gata de funcționare în mai puțin de o zi, fără downtime.',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Training complet inclus',
    desc: 'Instruim toată echipa ta, de la casieri la manageri, fără costuri suplimentare.',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: 'Suport tehnic 24/7',
    desc: 'Suntem disponibili oricând ai nevoie, prin telefon sau intervenție remote.',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

type FormState = { name: string; phone: string; business: string; type: string }

function Demo() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [form, setForm] = useState<FormState>({ name: '', phone: '', business: '', type: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Bună! Mă numesc ${form.name} și aș dori să programez o demonstrație gratuită RSistems.\n\nAfacere: ${form.business}\nTip: ${form.type}\nTelefon: ${form.phone}`
    )
    window.open(`https://wa.me/40751088772?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Rezervă Demo Gratuit – Sistem POS HoReCa"
        description="Programează o demonstrație gratuită a sistemului RSistems POS pentru restaurant, cafenea sau bar. Implementare în 24h, training inclus, suport 24/7."
        canonical="/demo"
      />
      <Header />
      <main className="demo-page">

        {/* ── Hero ── */}
        <section className="demo-hero">
          <div className="demo-hero-inner">
            <span className="demo-hero-badge">Demo Live</span>
            <h1 className="demo-hero-h1">
              Descoperă RSistems<br className="demo-br" />în acțiune
            </h1>
            <p className="demo-hero-sub">
              Urmărește cum sistemul nostru transformă operațiunile HoReCa —<br className="demo-br" />
              comenzi, plăți, rapoarte, totul într-un singur loc.
            </p>
            <div className="demo-hero-actions">
              <a href="#videos" className="demo-btn-primary">Vizionează demo-urile</a>
              <a href="#contact" className="demo-btn-outline">Programează demo personalizat</a>
            </div>
            <div className="demo-hero-stats">
              <div className="demo-stat"><strong>200+</strong> clienți activi</div>
              <span className="demo-stat-div" />
              <div className="demo-stat"><strong>15+</strong> ani experiență</div>
              <span className="demo-stat-div" />
              <div className="demo-stat"><strong>24/7</strong> suport tehnic</div>
            </div>
          </div>
          <div className="demo-hero-wave">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#f4f7f6"/>
            </svg>
          </div>
        </section>

        {/* ── Feature strip ── */}
        <section className="demo-features">
          <div className="demo-features-inner">
            {features.map(f => (
              <div className="demo-feature" key={f.title}>
                <div className="demo-feature-icon">{f.svg}</div>
                <div>
                  <div className="demo-feature-title">{f.title}</div>
                  <div className="demo-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Videos ── */}
        <section className="demo-videos" id="videos">
          <div className="demo-videos-inner">
            <span className="demo-section-label">Demo-uri video</span>
            <h2 className="demo-section-h2">Totul explicat vizual</h2>
            <p className="demo-section-sub">
              Urmărește cum funcționează fiecare modul al platformei RSistems
            </p>

            {/* Featured */}
            <div className="demo-video-featured">
              <div className="demo-vid-meta">
                <span className="demo-video-tag">{videos[0].tag}</span>
                <h3 className="demo-video-title">{videos[0].title}</h3>
                <p className="demo-video-desc">{videos[0].desc}</p>
              </div>
              <div className="demo-video-frame featured">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[0].id}`}
                  title={videos[0].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Secondary grid */}
            <div className="demo-videos-grid">
              {videos.slice(1).map(v => (
                <div className="demo-video-card" key={v.id}>
                  <span className="demo-video-tag">{v.tag}</span>
                  <h3 className="demo-video-title">{v.title}</h3>
                  <p className="demo-video-desc">{v.desc}</p>
                  <div className="demo-video-frame">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Schedule form ── */}
        <section className="demo-contact" id="contact">
          <div className="demo-contact-inner">
            <div className="demo-contact-left">
              <span className="demo-section-label light">Demo personalizat</span>
              <h2 className="demo-contact-h2">Programează o demonstrație gratuită</h2>
              <p className="demo-contact-sub">
                Îți prezentăm sistemul adaptat tipului tău de afacere, cu toate funcționalitățile relevante pentru nevoile tale.
              </p>
              <ul className="demo-contact-list">
                {[
                  'Sesiune 1-on-1 cu un specialist RSistems',
                  'Demo adaptat afacerii tale',
                  'Răspunsuri la toate întrebările tale',
                  'Fără obligații, 100% gratuit',
                ].map(item => (
                  <li key={item}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1FB6B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="demo-contact-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.868.52 3.614 1.42 5.105L2 22l5.54-1.389A9.435 9.435 0 0 0 11.5 21.999C16.739 22 21 17.738 21 12.5 21 7.262 16.739 3 11.5 3zM11.5 20c-1.658 0-3.2-.468-4.51-1.276l-.323-.195-3.287.824.852-3.197-.212-.334A8.46 8.46 0 0 1 3 11.5C3 6.813 6.813 3 11.5 3S20 6.813 20 11.5 16.187 20 11.5 20z"/>
                </svg>
                Răspuns în maxim 2 ore în zilele lucrătoare
              </div>
            </div>

            <div className="demo-contact-right">
              {submitted ? (
                <div className="demo-form-success">
                  <div className="demo-success-check">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1FB6B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Mulțumim! Te contactăm în curând.</h3>
                  <p>Un specialist RSistems îți va răspunde în maxim 2 ore.</p>
                </div>
              ) : (
                <form className="demo-form" onSubmit={handleSubmit}>
                  <h3 className="demo-form-heading">Completează formularul</h3>
                  <div className="demo-form-row">
                    <div className="demo-form-group">
                      <label htmlFor="df-name">Numele tău</label>
                      <input
                        id="df-name" type="text" placeholder="Ion Popescu" required
                        value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div className="demo-form-group">
                      <label htmlFor="df-phone">Număr de telefon</label>
                      <input
                        id="df-phone" type="tel" placeholder="+40 7xx xxx xxx" required
                        value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="demo-form-group">
                    <label htmlFor="df-business">Numele afacerii</label>
                    <input
                      id="df-business" type="text" placeholder="Restaurant La Maria..." required
                      value={form.business} onChange={e => setForm(p => ({ ...p, business: e.target.value }))}
                    />
                  </div>
                  <div className="demo-form-group">
                    <label htmlFor="df-type">Tipul afacerii</label>
                    <select
                      id="df-type" required
                      value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                    >
                      <option value="">Selectează tipul...</option>
                      <option>Restaurant</option>
                      <option>Cafenea</option>
                      <option>Bar</option>
                      <option>Fast-food</option>
                      <option>Livrare la domiciliu</option>
                      <option>Sală de evenimente</option>
                      <option>Altele</option>
                    </select>
                  </div>
                  <button type="submit" className="demo-form-submit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.868.52 3.614 1.42 5.105L2 22l5.54-1.389A9.435 9.435 0 0 0 11.5 21.999C16.739 22 21 17.738 21 12.5 21 7.262 16.739 3 11.5 3zM11.5 20c-1.658 0-3.2-.468-4.51-1.276l-.323-.195-3.287.824.852-3.197-.212-.334A8.46 8.46 0 0 1 3 11.5C3 6.813 6.813 3 11.5 3S20 6.813 20 11.5 16.187 20 11.5 20z"/>
                    </svg>
                    Trimite pe WhatsApp
                  </button>
                  <p className="demo-form-note">
                    Prin trimitere ești redirecționat către WhatsApp cu datele completate.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Demo
