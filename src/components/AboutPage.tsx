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
  { title: 'Inovație', desc: 'Suntem mereu în căutarea celor mai noi tehnologii pentru a oferi soluții moderne, scalabile și eficiente afacerilor HoReCa din România.' },
  { title: 'Fiabilitate', desc: 'Sistemele noastre funcționează non-stop, fără întreruperi. Clienții noștri se pot baza pe RSistems în fiecare zi de lucru.' },
  { title: 'Simplitate', desc: 'Credem că tehnologia trebuie să fie ușor de utilizat. Interfețele noastre sunt intuitive, fără training complex, gata de folosit din prima zi.' },
  { title: 'Parteneriat', desc: 'Nu suntem doar un furnizor — suntem partenerul tău pe termen lung. Suportul nostru este disponibil pentru orice nevoie apărută în activitatea zilnică.' },
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
        <p className="about-text">RSistems s-a născut din dorința de a transforma modul în care funcționează afacerile din industria HoReCa. Într-o piață competitivă și în continuă schimbare, am văzut cum restaurantele, cafenelele și fast food-urile se confruntau zilnic cu procese manuale lente, erori de comunicare și lipsă de control asupra operațiunilor. Am decis să schimbăm asta.</p>
        <p className="about-text">De la primele implementări și până astăzi, RSistems a crescut alături de clienții săi — oferind soluții complete de automatizare care conectează sala, bucătăria, gestiunea și raportarea într-un singur ecosistem digital, adaptat realităților din România.</p>
      </section>

      {/* ── Mission ── */}
      <section className="about-section" data-animate>
        <h2 className="about-section-heading">Misiunea noastră</h2>
        <p className="about-text">Misiunea RSistems este să ofere afacerilor HoReCa din România acces la tehnologii moderne de automatizare — sisteme POS inteligente, gestiune automată a stocurilor, kitchen display, comenzi digitale, meniuri QR, rapoarte în timp real și integrare fiscală completă. Credem că fiecare restaurant, cafenea sau bar merită să funcționeze eficient, profitabil și fără erori, indiferent de dimensiunea afacerii.</p>
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
