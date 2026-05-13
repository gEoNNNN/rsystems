import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_MAP } from './productsData'
import './SearchOverlay.css'

// Build flat list once
const allProducts = Object.entries(CATEGORY_MAP).flatMap(([catSlug, cat]) =>
  cat.products.map(p => ({ ...p, catSlug, catLabel: cat.label }))
)

type Props = {
  onClose: () => void
}

function SearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const q = query.trim().toLowerCase()
  const results = q.length < 2 ? [] : allProducts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category?.toLowerCase().includes(q) ||
    p.catLabel.toLowerCase().includes(q) ||
    p.tags?.some(t => t.toLowerCase().includes(q))
  ).slice(0, 10)

  return (
    <div className="so-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="so-modal">
        <div className="so-input-row">
          <svg className="so-search-icon" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="#999" strokeWidth="1.8"/>
            <path d="M14 14L18 18" stroke="#999" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            className="so-input"
            type="text"
            placeholder="Caută un produs..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="so-close" onClick={onClose} aria-label="Închide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {q.length >= 2 && (
          <div className="so-results">
            {results.length === 0 ? (
              <p className="so-empty">Niciun produs găsit pentru „{query}"</p>
            ) : (
              <>
                <p className="so-results-label">{results.length} rezultate</p>
                <ul className="so-list">
                  {results.map((p, i) => (
                    <li key={i}>
                      <Link
                        to={`/produse/${p.catSlug}/${p.slug}`}
                        className="so-item"
                        onClick={onClose}
                      >
                        <div className="so-item-img">
                          <img src={p.images?.[0] || '/img/blogph.svg'} alt={p.title} />
                        </div>
                        <div className="so-item-info">
                          <span className="so-item-cat">{p.catLabel}</span>
                          <span className="so-item-title">{p.title}</span>
                        </div>
                        {p.stock_status && (
                          <span className={`so-item-stock ${p.stock_status === 'In stoc' ? 'in' : 'out'}`}>
                            {p.stock_status}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {q.length < 2 && (
          <div className="so-hint">
            <p>Tasteaza cel puțin 2 caractere pentru a căuta</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchOverlay
