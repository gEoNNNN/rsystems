import { useEffect } from 'react'
import './AboutPage.css'
import Header from './Header'
import Footer from './Footer'

const team = [
  { name: 'Nume Prenume', role: 'Rol în companie', desc: 'Descriere scurta scurta scurta scurta scurta scurta scurta scurta', img: '/img/blogph.svg' },
  { name: 'Nume Prenume', role: 'Rol în companie', desc: 'Descriere scurta scurta scurta scurta scurta scurta scurta scurta', img: '/img/blogph.svg' },
  { name: 'Nume Prenume', role: 'Rol în companie', desc: 'Descriere scurta scurta scurta scurta scurta scurta scurta scurta', img: '/img/blogph.svg' },
  { name: 'Nume Prenume', role: 'Rol în companie', desc: 'Descriere scurta scurta scurta scurta scurta scurta scurta scurta', img: '/img/blogph.svg' },
]

const values = [
  { title: 'Inovație', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.' },
  { title: 'Inovație', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.' },
  { title: 'Inovație', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.' },
  { title: 'Inovație', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.' },
]

function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <div className="about-page">
      <Header />

      {/* ── Hero ── */}
      <section className="about-hero">
        <img src="/img/despre.svg" alt="" className="about-hero-bg" />
        <div className="about-hero-content">
          <h1 className="about-hero-heading">Despre compania noastră</h1>
          <p className="about-hero-sub">Construim viitorul prin inovație, colaborare și un angajament constant pentru excelență.</p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="about-section" data-animate>
        <h2 className="about-section-heading">Povestea noastră</h2>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi  pretium tellus duis convallis. Tempus leo eu aenean sed diam uma  tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.  Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit  semper vel class aptent taciti sociosqu. Ad litora torquent per conubia  nostra inceptos himenaeos.</p>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium  tellus duis convallis. Tempus leo eu aenean sed diam uma tempor.</p>
      </section>

      {/* ── Mission ── */}
      <section className="about-section" data-animate>
        <h2 className="about-section-heading">Misiunea noastră</h2>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi  pretium tellus duis convallis. Tempus leo eu aenean sed diam uma  tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.  Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit  semper vel class aptent taciti sociosqu. Ad litora torquent per conubia  nostra inceptos himenaeos.</p>
      </section>

      {/* ── Team ── */}
      <section className="about-section" data-animate>
        <h2 className="about-section-heading">Cunoaște echipa noastră</h2>
        <div className="about-team-grid" data-stagger>
          {team.map((m, i) => (
            <div key={i} className="about-team-card">
              <img src={m.img} alt={m.name} className="about-team-img" />
              <div className="about-team-name">{m.name}</div>
              <div className="about-team-role">{m.role}</div>
              <p className="about-team-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-section" data-animate>
        <h2 className="about-section-heading">Valorile noastre</h2>
        <div className="about-values-grid" data-stagger>
          {values.map((v, i) => (
            <div key={i} className="about-value-card">
              <h3 className="about-value-title">{v.title}</h3>
              <div className="about-value-divider" />
              <p className="about-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
