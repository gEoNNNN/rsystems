import { useEffect } from 'react'
import './BlogPage.css'
import Header from './Header'
import Footer from './Footer'

const featured = {
  title: 'Cum Automatizarea HoReCa Crește Profitul și Reduce Pierderile',
  subtitle: 'Digitalizarea nu mai este un avantaj opțional în industria HoReCa — este o necesitate. De la sisteme POS inteligente și gestiune automatizată, până la comenzi digitale și rapoarte în timp real, tehnologia RSistems ajută afacerile să funcționeze mai rapid, mai eficient și mai profitabil. Descoperă cum poți optimiza procesele din restaurant, reduce erorile umane și oferi clienților o experiență modernă și rapidă.',
  date: '25 Martie 2026',
  readTime: '10 minute',
  href: '/blog/automatizare-horeca',
}

const articles = [
  {
    title: 'Automatizare Restaurant: Tot Ce Trebuie să Știi în 2026',
    desc: 'Transformă operațiunile restaurantului tău cu soluții inteligente de gestiune, POS și automatizare completă pentru servire rapidă și control eficient.',
    category: 'Restaurante',
    readTime: '8 minute',
    href: '/blog/automatizare-restaurant-2026',
    img: '/img/blog01.svg',
    date: '2 zile în urmă',
  },
  {
    title: 'Sisteme POS Moderne pentru Cafenele și Coffee Shop-uri',
    desc: 'Află cum un sistem POS performant poate accelera comenzile, simplifica gestiunea stocurilor și îmbunătăți experiența clienților.',
    category: 'Cafenea',
    readTime: '6 minute',
    href: '/blog/pos-cafenele',
    img: '/img/blog02.svg',
    date: '5 zile în urmă',
  },
  {
    title: 'Cum Reduci Pierderile și Erorile în HoReCa',
    desc: 'Descoperă cele mai eficiente metode pentru controlul stocurilor, monitorizarea vânzărilor și prevenirea pierderilor operaționale.',
    category: 'Management HoReCa',
    readTime: '9 minute',
    href: '/blog/reducere-pierderi-horeca',
    img: '/img/blog03.svg',
    date: '1 săptămână în urmă',
  },
  {
    title: 'Ghid Complet pentru Automatizarea Fast Food-urilor',
    desc: 'De la comenzi digitale și chioșcuri self-service până la gestiunea automată a stocurilor și livrare optimizată.',
    category: 'Fast Food & Delivery',
    readTime: '7 minute',
    href: '/blog/automatizare-fast-food',
    img: '/img/blog04.svg',
    date: '2 săptămâni în urmă',
  },
  {
    title: 'Panouri Digitale pentru Restaurante și Meniuri Interactive',
    desc: 'Cum digital signage-ul transformă experiența clienților și crește valoarea medie a comenzilor în unitățile HoReCa.',
    category: 'Digital Signage',
    readTime: '5 minute',
    href: '/blog/digital-signage-horeca',
    img: '/img/blog05.svg',
    date: '3 săptămâni în urmă',
  },
]

const categories = [
  'Automatizare Restaurante',
  'Automatizare Cafenele',
  'Automatizare Baruri',
  'Fast Food & Delivery',
  'Gestiune HoReCa',
  'POS & Fiscalizare',
  'Digital Signage',
  'Supraveghere Video',
  'Sisteme Retail',
  'Sisteme de Parcare',
]

const popular = [
  { title: 'Top 5 Greșeli Care Încetinesc un Restaurant', desc: 'Cum identifici problemele operaționale care afectează servirea și profitabilitatea.', readTime: '5 min' },
  { title: 'Ce Înseamnă Gestiune Integrată pentru HoReCa', desc: 'Explicație completă despre automatizarea stocurilor, rapoartelor și vânzărilor.', readTime: '7 min' },
  { title: 'Cum Alegi Cel Mai Bun Sistem POS pentru Afacerea Ta', desc: 'Ghid practic pentru alegerea unui sistem modern și scalabil pentru HoReCa.', readTime: '6 min' },
]

function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <div className="blog-page">
      <Header />

      {/* ── Hero ── */}
      <section className="blog-hero">
        <img src="/img/blogbg.svg" alt="" className="blog-hero-bg" />
        <div className="blog-hero-content">
          <h1 className="blog-hero-heading">Descoperă articolele RSistems pentru industria HoReCa</h1>
          <p className="blog-hero-sub">Ghiduri practice, soluții inteligente și strategii moderne pentru restaurante, cafenele, baruri și retail. Află cum automatizarea îți poate reduce costurile, accelera servirea și crește profitabilitatea afacerii.</p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section className="blog-featured-wrap" data-animate>
        <div className="blog-featured">
          <div className="blog-featured-inner">
            <h2 className="blog-featured-title">{featured.title}</h2>
            <p className="blog-featured-sub">{featured.subtitle}</p>
            <div className="blog-featured-meta">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <a href={featured.href} className="blog-featured-btn">
              Citește articolul complet
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="blog-main" data-animate>
        <div className="blog-articles">
          <h2 className="blog-articles-heading">Articole Recente</h2>
          <div className="blog-list" data-stagger>
            {articles.map((a, i) => (
              <div key={i} className="blog-card">
                <img src={a.img} alt={a.title} className="blog-card-img" />
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{a.category}</span>
                    <span>·</span>
                    <span>{a.readTime}</span>
                    <span>·</span>
                    <span className="blog-card-date">{a.date}</span>
                  </div>
                  <h3 className="blog-card-title">{a.title}</h3>
                  <p className="blog-card-desc">{a.desc}</p>
                  <a href={a.href} className="blog-card-link">
                    Citește
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="blog-sidebar">
          <div className="blog-sidebar-box">
            <h3 className="blog-sidebar-heading">Populare</h3>
            <div className="blog-sidebar-divider" />
            <ul className="blog-sidebar-list">
              {popular.map((p, i) => (
                <li key={i}>
                  <a href="#">
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                    <span className="blog-pop-time">{p.readTime}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="blog-sidebar-box">
            <h3 className="blog-sidebar-heading">Categorii</h3>
            <div className="blog-sidebar-divider" />
            <ul className="blog-sidebar-list">
              {categories.map((c, i) => (
                <li key={i}><a href="#">{c}</a></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* ── SEO Footer Text ── */}
      <section className="blog-seo-text" data-animate>
        <p>Blogul RSistems oferă informații actuale despre automatizare HoReCa, sisteme POS, gestiune inteligentă, fiscalizare, digital signage și tehnologii moderne pentru restaurante, cafenele, baruri și retail. Publicăm constant ghiduri practice, studii de caz și soluții reale pentru optimizarea afacerilor din România.</p>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage
