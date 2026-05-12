import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ProductCategoryPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import { CATEGORY_MAP, type Product } from './productsData'

const ACTIVE_CATEGORY_SLUGS = [
  'pos-pc',
  'imprimante',
  'cantare-comerciale',
  'scanare-coduri-de-bare',
  'sistem-numarare-vizitatori',
]

function ProductCategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  const config = slug ? CATEGORY_MAP[slug] : undefined
  const products: Product[] = config?.products ?? []

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [slug])

  if (!config) {
    return (
      <div className="pc-page">
        <Header />
        <div className="pc-not-found">
          <h2>Categorie negăsită</h2>
          <Link to="/" className="pc-back-link">← Înapoi acasă</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="pc-page">
      <SEO
        title={`${config.label} – Echipamente HoReCa`}
        description={`Descoperă gama de ${config.label.toLowerCase()} RSistems. Echipamente profesionale pentru restaurante, cafenele și baruri din România.`}
        canonical={`/produse/${slug}`}
      />
      <Header />

      {/* Hero */}
      <section className="pc-hero">
        <div className="pc-hero-overlay" />
        <img src="/img/tip bg.svg" alt="" className="pc-hero-bg" />
        <div className="pc-hero-content">
          <nav className="pc-breadcrumb">
            <Link to="/">Acasă</Link>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Produse</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="pc-breadcrumb-current">{config.label}</span>
          </nav>
          <div className="pc-hero-title-row">
            <div className="pc-hero-icon-wrap">
              <img src={config.icon} alt="" className="pc-hero-icon" />
            </div>
            <div>
              <h1 className="pc-hero-heading">{config.label}</h1>
              <p className="pc-hero-sub">{products.length} produse disponibile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="pc-body">
        <aside className="pc-sidebar">
          {/* Category navigation */}
          <div className="pc-sidebar-box">
            <h3 className="pc-sidebar-title">Categorii</h3>
            <ul className="pc-sidebar-list">
              {ACTIVE_CATEGORY_SLUGS.map(catSlug => {
                const cat = CATEGORY_MAP[catSlug]
                if (!cat) return null
                return (
                  <li key={catSlug}>
                    <Link
                      to={`/produse/${catSlug}`}
                      className={`pc-sidebar-btn${slug === catSlug ? ' active' : ''}`}
                    >
                      <span className="pc-sidebar-cat-label">
                        <img src={cat.icon} alt="" className="pc-sidebar-cat-icon" />
                        {cat.label}
                      </span>
                      <span className="pc-sidebar-count">{cat.products.length}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="pc-sidebar-cta">
            <div className="pc-sidebar-cta-icon">💬</div>
            <p>Ai nevoie de ajutor la alegerea produsului?</p>
            <a href="https://wa.me/40517508772?text=Bun%C4%83!+Am+nevoie+de+ajutor." target="_blank" rel="noopener noreferrer" className="pc-sidebar-cta-btn">
              Contactăm acum
            </a>
          </div>
        </aside>

        <main className="pc-main">
          <div className="pc-subcategory" data-animate>
            <div className="pc-sub-header">
              <h2 className="pc-sub-heading">{config.label}</h2>
              <span className="pc-sub-count">{products.length} produse</span>
            </div>
            <div className="pc-grid" data-stagger>
              {products.map((p, i) => (
                <ProductCard key={i} product={p} categorySlug={slug!} />
              ))}
            </div>
          </div>
          {products.length === 0 && <p className="pc-no-results">Niciun produs găsit.</p>}
        </main>
      </div>

      <Footer />
    </div>
  )
}

function ProductCard({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const [imgIdx, setImgIdx] = useState(0)
  const img = product.images?.[imgIdx] || '/img/blogph.svg'
  const desc = product.description?.slice(0, 110) + (product.description?.length > 110 ? '…' : '')

  return (
    <Link
      to={`/produse/${categorySlug}/${product.slug}`}
      className="pc-card"
      onMouseEnter={() => product.images?.[1] && setImgIdx(1)}
      onMouseLeave={() => setImgIdx(0)}
    >
      <div className="pc-card-img-wrap">
        <img src={img} alt={product.title} className="pc-card-img" />
        {product.stock_status && (
          <span className={`pc-stock ${product.stock_status === 'In stoc' ? 'in' : 'out'}`}>
            {product.stock_status}
          </span>
        )}

      </div>
      <div className="pc-card-body">
        {product.category && <span className="pc-card-tag">{product.category}</span>}
        <h3 className="pc-card-title">{product.title}</h3>
        <p className="pc-card-desc">{desc}</p>
        <div className="pc-card-footer">
          {product.price ? <span className="pc-card-price">{product.price}</span> : <span />}
          <span className="pc-card-btn">
            Vezi produs
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCategoryPage
