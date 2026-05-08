import { useEffect } from 'react'
import './BlogPage.css'
import Header from './Header'
import Footer from './Footer'

const featured = {
  title: 'Titlu cu text foarte lung și interesant despre industria HoReCa',
  subtitle: 'Subtitlu cu text foarte lung și subtitext foarte lung și subtiretext foarte lung și subtiretext foarte lung și subtire text foarte lung si subtire text foarte lung si subtire  text  foarte lung si subtire text foarte lung si subtire text foarte lung si subtire',
  date: '25 martie 2024',
  readTime: '10 minute',
  href: '/blog/featured',
}

const articles = [
  {
    title: 'React 19: Noi Funcții și Îmbunătățiri',
    desc: 'Descoperă funcțiile noi din React 19 și cum să le folosești în proiectele tale.',
    date: '22 iulie 2024',
    readTime: '10 minute',
    href: '/blog/react-19',
    img: '/img/blogph.svg',
  },
  {
    title: 'React 19: Noi Funcții și Îmbunătățiri',
    desc: 'Descoperă funcțiile noi din React 19 și cum să le folosești în proiectele tale.',
    date: '20 martie 2024',
    readTime: '10 minute',
    href: '/blog/react-19-2',
    img: '/img/blogph.svg',
  },
  {
    title: 'React 19: Noi Funcții și Îmbunătățiri',
    desc: 'Descoperă funcțiile noi din React 19 și cum să le folosești în proiectele tale.',
    date: '25 iunie 2024',
    readTime: '10 minute',
    href: '/blog/react-19-3',
    img: '/img/blogph.svg',
  },
]

const categories = ['Categorie', 'Categorie mica', 'Categorie mare mare mare mica', 'Categorie foarte mare']
const popular = ['Cea mai populara', 'Oleac mai putin', 'Inca oleac mai putin']

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
          <p className="blog-hero-sub">Ghiduri practice, idei și tendințe pentru dezvoltarea afacerii tale</p>
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
                    <span>{a.date}</span>
                    <span>·</span>
                    <span>{a.readTime}</span>
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
            <h3 className="blog-sidebar-heading">Categorii</h3>
            <div className="blog-sidebar-divider" />
            <ul className="blog-sidebar-list">
              {categories.map((c, i) => (
                <li key={i}><a href="#">{c}</a></li>
              ))}
            </ul>
          </div>
          <div className="blog-sidebar-box">
            <h3 className="blog-sidebar-heading">Populare</h3>
            <div className="blog-sidebar-divider" />
            <ul className="blog-sidebar-list">
              {popular.map((p, i) => (
                <li key={i}><a href="#">{p}</a></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage
