import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ProductCategoryPage.css'
import Header from './Header'
import Footer from './Footer'
import { CATEGORY_MAP, type Product } from './productsData'

function ProductCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState('Toate')

  const config = slug ? CATEGORY_MAP[slug] : undefined
  const products: Product[] = config?.products ?? []
  const subcategories = ['Toate', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]
  const filtered = activeTab === 'Toate' ? products : products.filter(p => p.category === activeTab)

  useEffect(() => { setActiveTab('Toate') }, [slug])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [slug, activeTab])

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
          <div className="pc-sidebar-box">
            <h3 className="pc-sidebar-title">Subcategorii</h3>
            <ul className="pc-sidebar-list">
              {subcategories.map(tab => (
                <li key={tab}>
                  <button
                    className={`pc-sidebar-btn${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    <span className="pc-sidebar-count">
                      {tab === 'Toate' ? products.length : products.filter(p => p.category === tab).length}
                    </span>
                  </button>
                </li>
              ))}
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
          {activeTab === 'Toate' ? (
            subcategories.filter(s => s !== 'Toate').map(sub => {
              const group = filtered.filter(p => p.category === sub)
              if (group.length === 0) return null
              return (
                <div key={sub} className="pc-subcategory" data-animate>
                  <div className="pc-sub-header">
                    <h2 className="pc-sub-heading">{sub}</h2>
                    <span className="pc-sub-count">{group.length} produse</span>
                  </div>
                  <div className="pc-grid" data-stagger>
                    {group.map((p, i) => (
                      <ProductCard key={i} product={p} categorySlug={slug!} />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="pc-subcategory" data-animate>
              <div className="pc-sub-header">
                <h2 className="pc-sub-heading">{activeTab}</h2>
                <span className="pc-sub-count">{filtered.length} produse</span>
              </div>
              <div className="pc-grid" data-stagger>
                {filtered.map((p, i) => (
                  <ProductCard key={i} product={p} categorySlug={slug!} />
                ))}
              </div>
            </div>
          )}
          {filtered.length === 0 && <p className="pc-no-results">Niciun produs găsit.</p>}
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
        {product.images?.length > 1 && (
          <div className="pc-card-img-dots">
            {product.images.slice(0, 3).map((_, i) => (
              <span key={i} className={imgIdx === i ? 'dot active' : 'dot'} />
            ))}
          </div>
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
