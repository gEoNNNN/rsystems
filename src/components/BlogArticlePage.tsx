import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './BlogArticlePage.css'
import Header from './Header'
import Footer from './Footer'
import blogArticles, { type ArticleSection } from './blogArticlesData'

const popularLinks = [
  { title: 'Top 5 Greșeli Care Încetinesc un Restaurant', href: '/blog/reducere-pierderi-horeca', readTime: '5 min' },
  { title: 'Ce Înseamnă Gestiune Integrată pentru HoReCa', href: '/blog/automatizare-horeca', readTime: '7 min' },
  { title: 'Cum Alegi Cel Mai Bun Sistem POS', href: '/blog/pos-cafenele', readTime: '6 min' },
]

const categories = [
  'Automatizare Restaurante', 'Automatizare Cafenele', 'Fast Food & Delivery',
  'Gestiune HoReCa', 'POS & Fiscalizare', 'Digital Signage',
]

function renderSection(s: ArticleSection, i: number) {
  switch (s.type) {
    case 'h2':
      return <h2 id={s.id} key={i} className="ba-h2">{s.text}</h2>
    case 'h3':
      return <h3 key={i} className="ba-h3">{s.text}</h3>
    case 'p':
      return <p key={i} className="ba-p">{s.text}</p>
    case 'ul':
      return (
        <ul key={i} className="ba-ul">
          {s.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )
    case 'highlight':
      return (
        <div key={i} className="ba-highlight">
          <p>{s.text}</p>
        </div>
      )
    default:
      return null
  }
}

function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = blogArticles.find(a => a.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!article) {
    return (
      <div className="ba-page">
        <Header />
        <div className="ba-not-found">
          <h1>Articol negăsit</h1>
          <Link to="/blog">← Înapoi la blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const toc = article.sections.filter(s => s.type === 'h2') as { type: 'h2'; id: string; text: string }[]
  const related = blogArticles.filter(a => a.slug !== article.slug).slice(0, 3)
  const articleIndex = blogArticles.findIndex(a => a.slug === slug)
  const altImg = ['/img/blog01.svg', '/img/blog02.svg', '/img/blog03.svg', '/img/blog04.svg', '/img/blog05.svg'][(articleIndex + 1) % 5]
  const midPoint = Math.floor(article.sections.length / 2)

  return (
    <div className="ba-page">
      <Header />

      {/* ── Hero (split layout) ── */}
      <section className="ba-hero">
        <div className="ba-hero-left">
          <div className="ba-breadcrumb">
            <Link to="/">Acasă</Link>
            <span>/</span>
            <Link to="/blog">Blog</Link>
            <span>/</span>
            <span>{article.category}</span>
          </div>
          <div className="ba-meta">
            <span className="ba-category-tag">{article.category}</span>
            <span className="ba-dot">·</span>
            <span>{article.date}</span>
            <span className="ba-dot">·</span>
            <span>{article.readTime} lectură</span>
          </div>
          <h1 className="ba-title">{article.title}</h1>
          <p className="ba-intro">{article.intro}</p>
        </div>
        <div className="ba-hero-right">
          <img src={article.img} alt={article.title} className="ba-hero-img" />
        </div>
      </section>

      {/* ── Content + Sidebar ── */}
      <div className="ba-content-wrap">
        <article className="ba-article">
          {article.sections.flatMap((s, i) => {
            const node = renderSection(s, i)
            const imgBreak = i === midPoint ? [
              <div key="ba-mid-img" className="ba-inline-img">
                <img src={altImg} alt="" />
              </div>
            ] : []
            return node ? [node, ...imgBreak] : imgBreak
          })}

          {/* FAQ */}
          {article.faq.length > 0 && (
            <div className="ba-faq">
              <h2 className="ba-h2" style={{ borderTop: 'none', marginTop: '3rem' }}>Întrebări Frecvente</h2>
              {article.faq.map((f, i) => (
                <div key={i} className="ba-faq-item">
                  <h3 className="ba-faq-q">{f.q}</h3>
                  <p className="ba-faq-a">{f.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="ba-cta">
            <h3>Vrei să automatizezi afacerea ta?</h3>
            <p>Contactează echipa RSistems și descoperă soluțiile potrivite pentru restaurantul, cafeneaua sau fast food-ul tău.</p>
            <a
              href="https://wa.me/40517508772?text=Bun%C4%83!+Vreau+s%C4%83+aflu+mai+multe+despre+automatizare+HoReCa."
              className="ba-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cere Consultanță Gratuită
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="ba-sidebar">
          {/* Table of contents */}
          {toc.length > 0 && (
            <div className="ba-sidebar-box">
              <h3 className="ba-sidebar-heading">Cuprins</h3>
              <ul className="ba-toc-list">
                {toc.map((h, i) => (
                  <li key={i}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Popular */}
          <div className="ba-sidebar-box">
            <h3 className="ba-sidebar-heading">Articole Populare</h3>
            <ul className="ba-popular-list">
              {popularLinks.map((p, i) => (
                <li key={i}>
                  <Link to={p.href}>
                    <strong>{p.title}</strong>
                    <span className="ba-pop-time">{p.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="ba-sidebar-box">
            <h3 className="ba-sidebar-heading">Categorii</h3>
            <ul className="ba-cat-list">
              {categories.map((c, i) => (
                <li key={i}><Link to="/blog">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="ba-sidebar-cta">
            <div className="ba-sidebar-cta-icon">💬</div>
            <h4>Ai nevoie de o soluție personalizată?</h4>
            <p>Experții RSistems sunt disponibili pentru o consultanță gratuită.</p>
            <a
              href="https://wa.me/40517508772"
              className="ba-sidebar-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactează-ne
            </a>
          </div>
        </aside>
      </div>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="ba-related">
          <h2 className="ba-related-heading">Articole Similare</h2>
          <div className="ba-related-grid">
            {related.map((a, i) => (
              <Link key={i} to={`/blog/${a.slug}`} className="ba-related-card">
                <img src={a.img} alt={a.title} className="ba-related-img" />
                <div className="ba-related-body">
                  <span className="ba-related-cat">{a.category}</span>
                  <h3>{a.title}</h3>
                  <span className="ba-related-time">{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SEO text ── */}
      <section className="ba-seo-text">
        <p>
          RSistems oferă soluții complete de automatizare HoReCa pentru restaurante, cafenele, baruri, fast food-uri
          și lanțuri multi-location din România. Sisteme POS profesionale, gestiune integrată, digital signage și suport tehnic dedicat.
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default BlogArticlePage
