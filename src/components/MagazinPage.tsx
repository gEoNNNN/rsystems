import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MagazinPage.css'
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
  'case-de-autoservire',
]

function MagazinPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('toate')
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 10000])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const allProducts: (Product & { categorySlug: string })[] = []
  ACTIVE_CATEGORY_SLUGS.forEach(slug => {
    const cat = CATEGORY_MAP[slug]
    if (cat) {
      cat.products.forEach(p => allProducts.push({ ...p, categorySlug: slug }))
    }
  })

  const filteredProducts = allProducts.filter(p => {
    if (selectedCategory !== 'toate' && p.categorySlug !== selectedCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="magazin-page">
      <SEO
        title="Magazin RSistems - Echipamente pentru Restaurante, Cafenele și Baruri"
        description="Echipamente performante pentru restaurante eficiente. Descoperă gama completă de produse RSistems: POS, imprimante, cântare, scanere și multe altele."
        canonical="/magazin"
      />
      <Header />

      <section className="magazin-hero">
        <div className="magazin-hero-overlay" />
        <img src="/img/tip-bg.svg" alt="" className="magazin-hero-bg" />
        <div className="magazin-hero-content">
          <h1 className="magazin-hero-title">Magazin RSistems</h1>
          <p className="magazin-hero-subtitle">Echipamente performante pentru restaurante eficiente.</p>
          <div className="magazin-hero-features">
            <div className="magazin-hero-feature">
              <img src="/img/comenzi.svg" alt="Livrare" />
              <span>Livrare rapidă</span>
            </div>
            <div className="magazin-hero-feature">
              <img src="/img/rapoarte.svg" alt="Compatibile" />
              <span>Compatibile cu soluțiile RSistems</span>
            </div>
            <div className="magazin-hero-feature">
              <img src="/img/suport.svg" alt="Suport" />
              <span>Suport tehnic operațional</span>
            </div>
            <div className="magazin-hero-feature">
              <img src="/img/optimizare.svg" alt="Flexibilitate" />
              <span>Plată flexibilă</span>
            </div>
          </div>
        </div>
      </section>

      <div className="magazin-body">
        <aside className="magazin-sidebar">
          <div className="magazin-sidebar-box">
            <h3 className="magazin-sidebar-title">Categorii de produse</h3>
            <ul className="magazin-sidebar-list">
              <li>
                <button
                  className={`magazin-sidebar-btn${selectedCategory === 'toate' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('toate')}
                >
                  <span className="magazin-sidebar-cat-label">
                    <img src="/img/iPOS.svg" alt="" className="magazin-sidebar-cat-icon" />
                    Toate produsele
                  </span>
                  <span className="magazin-sidebar-count">{allProducts.length}</span>
                </button>
              </li>
              {ACTIVE_CATEGORY_SLUGS.map(catSlug => {
                const cat = CATEGORY_MAP[catSlug]
                if (!cat) return null
                return (
                  <li key={catSlug}>
                    <button
                      className={`magazin-sidebar-btn${selectedCategory === catSlug ? ' active' : ''}`}
                      onClick={() => setSelectedCategory(catSlug)}
                    >
                      <span className="magazin-sidebar-cat-label">
                        <img src={cat.icon} alt="" className="magazin-sidebar-cat-icon" />
                        {cat.label}
                      </span>
                      <span className="magazin-sidebar-count">{cat.products.length}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="magazin-sidebar-box">
            <h3 className="magazin-sidebar-title">Filtrează după</h3>
            <div className="magazin-filter-group">
              <label className="magazin-filter-label">Preț</label>
              <div className="magazin-price-inputs">
                <input
                  type="number"
                  placeholder="0"
                  value={priceFilter[0]}
                  onChange={e => setPriceFilter([+e.target.value, priceFilter[1]])}
                  className="magazin-price-input"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="10,000"
                  value={priceFilter[1]}
                  onChange={e => setPriceFilter([priceFilter[0], +e.target.value])}
                  className="magazin-price-input"
                />
              </div>
            </div>
          </div>

          <div className="magazin-sidebar-box">
            <div className="magazin-help-icon">💬</div>
            <h3 className="magazin-help-title">Ai nevoie de ajutor?</h3>
            <p className="magazin-help-text">Echipa noastră te ajută să alegi produsele potrivite pentru afacerea ta.</p>
            <a
              href="https://wa.me/40751088772?text=Bună! Am nevoie de ajutor."
              target="_blank"
              rel="noopener noreferrer"
              className="magazin-help-btn"
            >
              Contactează-ne
            </a>
          </div>
        </aside>

        <main className="magazin-main">
          <div className="magazin-toolbar">
            <div className="magazin-toolbar-left">
              <h2 className="magazin-toolbar-title">
                {selectedCategory === 'toate' ? 'Toate produsele' : CATEGORY_MAP[selectedCategory]?.label}
              </h2>
              <span className="magazin-toolbar-count">{filteredProducts.length} produse găsite</span>
            </div>
            <div className="magazin-toolbar-right">
              <select className="magazin-sort-select">
                <option>Sortează după</option>
                <option>Cele mai populare</option>
                <option>Preț crescător</option>
                <option>Preț descrescător</option>
              </select>
            </div>
          </div>

          <div className="magazin-grid" data-stagger>
            {filteredProducts.map((p, i) => (
              <ProductCard key={i} product={p} categorySlug={p.categorySlug} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="magazin-no-results">
              <p>Nu am găsit produse care să corespundă criteriilor tale.</p>
            </div>
          )}
        </main>
      </div>

      <section className="magazin-cta" data-animate>
        <div className="magazin-cta-content">
          <h2 className="magazin-cta-title">Nu ești sigur ce echipamente ai nevoie?</h2>
          <p className="magazin-cta-text">
            Echipa noastră te ajută să alegi soluția perfectă pentru afacerea ta și îți oferă o ofertă personalizată.
          </p>
          <a
            href="https://wa.me/40751088772?text=Bună! Vreau o ofertă personalizată."
            target="_blank"
            rel="noopener noreferrer"
            className="magazin-cta-btn"
          >
            Solicită ofertă
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function ProductCard({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const [imgIdx, setImgIdx] = useState(0)
  const img = product.images?.[imgIdx] || '/img/blogph.svg'
  const desc = product.description?.slice(0, 90) + (product.description?.length > 90 ? '…' : '')

  return (
    <Link
      to={`/produse/${categorySlug}/${product.slug}`}
      className="magazin-card"
      onMouseEnter={() => product.images?.[1] && setImgIdx(1)}
      onMouseLeave={() => setImgIdx(0)}
    >
      <div className="magazin-card-img-wrap">
        <img src={img} alt={product.title} className="magazin-card-img" />
        {product.stock_status && (
          <span className={`magazin-stock ${product.stock_status === 'In stoc' ? 'in' : 'out'}`}>
            {product.stock_status}
          </span>
        )}
      </div>
      <div className="magazin-card-body">
        {product.category && <span className="magazin-card-tag">{product.category}</span>}
        <h3 className="magazin-card-title">{product.title}</h3>
        <p className="magazin-card-desc">{desc}</p>
        <div className="magazin-card-footer">
          <button className="magazin-card-btn-details">Vezi detalii</button>
          <button className="magazin-card-btn-order">Solicită ofertă</button>
        </div>
      </div>
    </Link>
  )
}

export default MagazinPage
