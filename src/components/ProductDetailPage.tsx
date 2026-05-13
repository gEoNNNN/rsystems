import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ProductDetailPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import { CATEGORY_MAP, type Product } from './productsData'

function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>()
  const [activeImg, setActiveImg] = useState(0)

  const config = categorySlug ? CATEGORY_MAP[categorySlug] : undefined
  const products: Product[] = config?.products ?? []
  const product = products.find(p => p.slug === productSlug)

  // Related: same subcategory, different product, max 4
  const related = products
    .filter(p => p.slug !== productSlug && p.category === product?.category)
    .slice(0, 4)

  // Fallback: fill with other products from same category
  const filledRelated = related.length >= 2
    ? related
    : [...related, ...products.filter(p => p.slug !== productSlug && !related.includes(p)).slice(0, 4 - related.length)]

  useEffect(() => {
    setActiveImg(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productSlug])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [productSlug])

  if (!config || !product) {
    return (
      <div className="pd-page">
        <Header />
        <div className="pd-not-found">
          <h2>Produs negăsit</h2>
          <Link to={categorySlug ? `/produse/${categorySlug}` : '/'} className="pd-back-link">
            ← Înapoi la categorie
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const images = product.images?.length ? product.images : ['/img/blogph.svg']

  return (
    <div className="pd-page">
      <SEO
        title={`${product.title} – ${config.label}`}
        description={product.description ? product.description.slice(0, 155) : `${product.title} – echipament profesional din gama ${config.label} RSistems. Ideal pentru restaurante și afaceri HoReCa din România.`}
        canonical={`/produse/${categorySlug}/${productSlug}`}
        ogImage={product.images?.[0] ? `https://rsistems.ro${product.images[0]}` : undefined}
        ogType="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.description ?? product.title,
          image: product.images?.map(i => `https://rsistems.ro${i}`) ?? [],
          brand: { '@type': 'Brand', name: 'RSistems' },
          offers: { '@type': 'Offer', url: `https://rsistems.ro/produse/${categorySlug}/${productSlug}`, priceCurrency: 'RON', availability: 'https://schema.org/InStock' },
        }}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="pd-breadcrumb-bar">
        <nav className="pd-breadcrumb">
          <Link to="/">Acasă</Link>
          <svg width="5" height="9" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span>Produse</span>
          <svg width="5" height="9" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <Link to={`/produse/${categorySlug}`}>{config.label}</Link>
          <svg width="5" height="9" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span className="pd-breadcrumb-current">{product.title}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="pd-main" data-animate>
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={images[activeImg]} alt={product.title} className="pd-gallery-img" />
            {product.stock_status && (
              <span className={`pd-stock-badge ${product.stock_status === 'In stoc' ? 'in' : 'out'}`}>
                {product.stock_status}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="pd-gallery-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pd-info">
          {product.category && <span className="pd-category-tag">{product.category}</span>}
          <h1 className="pd-title">{product.title}</h1>

          {product.stock_status && (
            <div className={`pd-stock ${product.stock_status === 'In stoc' ? 'in' : 'out'}`}>
              <span className="pd-stock-dot" />
              {product.stock_status}
            </div>
          )}

          {product.description && (
            <div className="pd-desc-box">
              <h3 className="pd-desc-label">Descriere</h3>
              <div className="pd-desc-sentences">
                {product.description
                  .split(/(?<=[.!?])\s+/)
                  .filter(s => s.trim())
                  .map((sentence, i) => (
                    <p key={i} className="pd-desc-sentence">{sentence.trim()}</p>
                  ))}
              </div>
            </div>
          )}

          {Object.keys(product.specifications ?? {}).length > 0 && (
            <div className="pd-specs-box">
              <h3 className="pd-desc-label">Specificații tehnice</h3>
              <div className="pd-specs-grid">
                {Object.entries(product.specifications).map(([key, val], i) => (
                  <div key={i} className="pd-spec-row">
                    <span className="pd-spec-key">{key.trim()}</span>
                    <span className="pd-spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.tags?.length > 0 && (
            <div className="pd-tags">
              {product.tags.map((tag, i) => (
                <span key={i} className="pd-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="pd-ctas">
            <a
              href={`https://wa.me/40517508772?text=Bun%C4%83!+Sunt+interesat+de+produsul+${encodeURIComponent(product.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-cta-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.523 5.847L.057 23.882l6.198-1.448A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.856 0-3.596-.498-5.1-1.367l-.364-.215-3.78.883.944-3.666-.237-.377A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Solicită pe WhatsApp
            </a>
            <a href="mailto:welcome@rsistems.ro" className="pd-cta-email">
              Trimite email
            </a>
          </div>

          {/* Back link */}
          <Link to={`/produse/${categorySlug}`} className="pd-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Înapoi la {config.label}
          </Link>
        </div>
      </section>

      {/* Related products */}
      {filledRelated.length > 0 && (
        <section className="pd-related" data-animate>
          <h2 className="pd-related-heading">Produse similare</h2>
          <div className="pd-related-grid" data-stagger>
            {filledRelated.map((p, i) => (
              <Link key={i} to={`/produse/${categorySlug}/${p.slug}`} className="pd-rel-card">
                <div className="pd-rel-img-wrap">
                  <img src={p.images?.[0] || '/img/blogph.svg'} alt={p.title} className="pd-rel-img" />
                </div>
                <div className="pd-rel-body">
                  {p.category && <span className="pd-rel-tag">{p.category}</span>}
                  <h4 className="pd-rel-title">{p.title}</h4>
                  <span className="pd-rel-btn">
                    Vezi produs
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default ProductDetailPage
