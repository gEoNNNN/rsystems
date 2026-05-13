import './PosModal.css'

type ModalType = 'pos' | 'rapoarte' | 'management'

interface PosModalProps {
  type: ModalType
  onClose: () => void
}

export function NomenclatorUI() {
  const products = [
    { name: 'BAR', code: '10020', article: '289567', type: 'Grup', isGroup: true },
    { name: 'BAR MARFA', code: '10017', article: '', type: 'Grup', isGroup: true },
    { name: 'Cafea', code: '2000039', article: '289626', type: 'Grup', isGroup: true },
    { name: 'Certificate cadou', code: '', article: '', type: 'Grup', isGroup: true },
    { name: 'CIORBE.', code: '0045', article: '', type: 'Grup', isGroup: true, highlight: true },
    { name: 'Combo', code: '2000028', article: '289534', type: 'Grup', isGroup: true },
    { name: 'DESERT.', code: '0059', article: '', type: 'Grup', isGroup: true },
    { name: 'GARNITURI.', code: '0057', article: '', type: 'Grup', isGroup: true },
    { name: 'PASTE.', code: '0055', article: '', type: 'Grup', isGroup: true },
    { name: 'PIZZA', code: '0056', article: '', type: 'Grup', isGroup: true },
    { name: 'Combo pizza', code: '9995142', article: '289562', type: 'Ingrediente', sold: '0,000', unit: 'kg', price: '175,0000' },
    { name: 'Pizza Credintei', code: '00340', article: '395', type: 'Produs finit', sold: '0,000', unit: 'port', price: '55,0000' },
    { name: 'Pizza Demon', code: '00337', article: '392', type: 'Produs finit', sold: '0,000', unit: 'port', price: '45,0000' },
    { name: 'Pizza Focacoa', code: '00334', article: '389', type: 'Produs finit', sold: '0,000', unit: 'port', price: '43,0000' },
    { name: 'Pizza Horezu', code: '00333', article: '388', type: 'Produs finit', sold: '-1,000', unit: 'port', price: '45,0000' },
    { name: 'Pizza Macelaru', code: '00339', article: '394', type: 'Produs finit', sold: '0,000', unit: 'port', price: '45,0000' },
    { name: 'Pizza Martisor', code: '00342', article: '397', type: 'Produs finit', sold: '0,000', unit: 'port', price: '49,0000' },
  ]

  return (
    <div className="pm-app">
      <div className="pm-win-titlebar">
        <span className="pm-win-title">Rsistems – Syrve Office 2025</span>
        <div className="pm-win-controls">
          <span>─</span><span>□</span><span>✕</span>
        </div>
      </div>
      <div className="pm-tabs-bar">
        <span className="pm-tab active">Nomenclator ×</span>
        <span className="pm-tab">Raport Syrve POS ×</span>
        <span className="pm-tab">Rapoarte Syrve POS ×</span>
        <span className="pm-tab">Lista angajaților ×</span>
        <span className="pm-tab">Drepturi de acces ×</span>
        <span className="pm-tab pm-tab-home">Prima pagină ×</span>
      </div>
      <div className="pm-body">
        <div className="pm-sidebar">
          <div className="pm-sidebar-search">🔍 Căutare meniu</div>
          <div className="pm-sidebar-item pm-sidebar-fav">☆ Favorite</div>
          <div className="pm-sidebar-section">Vânzări <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Gestiune <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Producere centralizată și logistică <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Angajați <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Lista de prețuri <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Finanțe <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Contractanți <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section pm-sidebar-active">Rapoarte <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Sistem de reduceri <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Schimb de date <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Administrare <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Livrare <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Syrve Loyalty <span className="pm-arrow">›</span></div>
          <div className="pm-sidebar-section">Ajutor <span className="pm-arrow">›</span></div>
        </div>
        <div className="pm-main">
          <div className="pm-content-header">
            <h2 className="pm-content-title">Nomenclator</h2>
            <div className="pm-toolbar">
              <button className="pm-btn pm-btn-teal">Adaugă...</button>
              <button className="pm-btn">Adaugă grupul...</button>
              <button className="pm-btn">Acțiuni ▾</button>
              <button className="pm-btn">Tip ▾</button>
              <button className="pm-btn pm-btn-teal">Actualizați</button>
              <span className="pm-search-label">Căutare:</span>
              <input className="pm-search" type="text" readOnly />
            </div>
          </div>
          <div className="pm-table-wrap">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Denumire</th>
                  <th>Articol</th>
                  <th>Cod</th>
                  <th>Tip</th>
                  <th>Modul de consum</th>
                  <th>Sold</th>
                  <th>Unit. de măsură</th>
                  <th>Preț, MDL</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className={p.highlight ? 'pm-row-highlight' : ''}>
                    <td className={p.isGroup ? 'pm-cell-group' : ''}>
                      {p.isGroup && <span className="pm-expand-arrow">▶ </span>}
                      {p.name}
                    </td>
                    <td>{p.article}</td>
                    <td>{p.code}</td>
                    <td>{p.type}</td>
                    <td>{!p.isGroup ? 'Ingrediente' : ''}</td>
                    <td>{p.sold ?? ''}</td>
                    <td>{p.unit ?? ''}</td>
                    <td>{p.price ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pm-footer-bar">
            9.2.6029.0 built on 26 Apr 2025 &nbsp;&nbsp;&nbsp; Companie: Syrve-RO &nbsp;&nbsp;&nbsp;
            <span className="pm-footer-user">Utilizatorul: rsistems</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BasicIndicatorsUI() {
  const kpis = [
    { label: 'Comenzi',   value: '356',    change: '12.5%', up: true },
    { label: 'Clienți',   value: '248',    change: '8.1%',  up: true },
    { label: 'Bon mediu', value: '81 RON', change: '16.3%', up: true },
  ]

  const barData = [
    { label: '20.04', value: 0 },
    { label: '21.04', value: 290 },
    { label: '22.04', value: 0 },
    { label: '23.04', value: 0 },
    { label: '24.04', value: 0 },
    { label: '25.04', value: 0 },
    { label: '26.04', value: 0 },
  ]

  const maxBar = Math.max(...barData.map(d => d.value), 1)

  return (
    <div className="pm-syrve">
      <div className="pm-syrve-topbar">
        <div className="pm-syrve-logo">syrve</div>
        <div className="pm-syrve-company">Rsistems</div>
        <div className="pm-syrve-periods">
          {['D', 'W', 'M', 'Y', 'P'].map(p => (
            <span key={p} className={`pm-period${p === 'W' ? ' active' : ''}`}>{p}</span>
          ))}
        </div>
        <span className="pm-syrve-arrow">‹</span>
        <div className="pm-syrve-date">20/04/26 – 26/04/26</div>
        <span className="pm-syrve-arrow">›</span>
      </div>
      <div className="pm-syrve-body">
        <div className="pm-syrve-sidebar">
          <div className="pm-syrve-nav-item">Forecast</div>
          <div className="pm-syrve-nav-item">Inventory <span className="pm-badge">334</span></div>
          <div className="pm-syrve-nav-item">Prep Plan</div>
          <div className="pm-syrve-nav-item">Staff</div>
          <div className="pm-syrve-nav-item">Till Shifts</div>
          <div className="pm-syrve-nav-group">📊 Reports 2.0</div>
          <div className="pm-syrve-nav-sub active">Basic indicators</div>
          <div className="pm-syrve-nav-sub">Sales Report</div>
          <div className="pm-syrve-nav-sub">Staff Report</div>
          <div className="pm-syrve-nav-sub">Storage Report</div>
          <div className="pm-syrve-nav-sub">Profit and Loss Report</div>
          <div className="pm-syrve-nav-sub">Delivery report</div>
          <div className="pm-syrve-nav-sub">OLAP Personalizat</div>
          <div className="pm-syrve-nav-sub">Report nou</div>
          <div className="pm-syrve-nav-item">📊 Reports</div>
        </div>
        <div className="pm-syrve-content">
          <div className="pm-syrve-content-header">
            <h2>Basic indicators</h2>
            <button className="pm-syrve-all-reports">⭐ ALL REPORTS</button>
          </div>
          <div className="pm-kpi-grid">
            {kpis.map((k, i) => (
              <div key={i} className="pm-kpi-card">
                <div className="pm-kpi-label">{k.label}</div>
                <div className="pm-kpi-value">{k.value}</div>
                {k.change && (
                  <div className={`pm-kpi-change ${k.up ? 'up' : 'down'}`}>
                    {k.up ? '↑' : '↓'} ({k.change}) of the previous period
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pm-chart-section">
            <div className="pm-chart-header">
              <span className="pm-chart-section-title">Sales dynamics</span>
              <span className="pm-chart-tab active">SALES</span>
              <span className="pm-chart-tab">TRANSACTIONS</span>
              <span className="pm-chart-tab">AVERAGE BILL</span>
              <span className="pm-chart-days">Days</span>
            </div>
            <div className="pm-bar-chart">
              <div className="pm-bar-y-axis">
                {['lei300.00', 'lei250.00', 'lei200.00', 'lei150.00', 'lei100.00', 'lei50.00', 'lei0.00'].map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </div>
              <div className="pm-bars">
                {barData.map((d, i) => (
                  <div key={i} className="pm-bar-col">
                    <div className="pm-bar-track">
                      <div
                        className="pm-bar-fill"
                        style={{ height: `${(d.value / maxBar) * 100}%` }}
                      />
                    </div>
                    <div className="pm-bar-label">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pm-pie-row">
            <div className="pm-pie-section">
              <div className="pm-pie-title">Sales by payment types <span className="pm-pie-legend-btn">= Legend</span></div>
              <div className="pm-pie-wrap">
                <div className="pm-donut-wrap">
                  <div className="pm-donut pm-donut-red" />
                  <span className="pm-donut-center-label">100%</span>
                </div>
                <div className="pm-pie-legend">
                  <div><span className="pm-legend-dot" style={{ background: '#e74c3c' }} /> Card — 100%</div>
                </div>
              </div>
            </div>
            <div className="pm-pie-section">
              <div className="pm-pie-title">Sales by category <span className="pm-pie-legend-btn">= Legend</span></div>
              <div className="pm-pie-wrap">
                <div className="pm-donut-wrap">
                  <div className="pm-donut pm-donut-multi" />
                </div>
                <div className="pm-pie-legend">
                  <div><span className="pm-legend-dot" style={{ background: '#5c35d4' }} /> Cat. A — 35%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#1abc9c' }} /> Cat. B — 15%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#3498db' }} /> Cat. C — 11%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#e67e22' }} /> Cat. D — 10%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#2ecc71' }} /> Cat. E — 11%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#16a085' }} /> Cat. F — 6%</div>
                  <div><span className="pm-legend-dot" style={{ background: '#f39c12' }} /> Cat. G — 11%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfitLossUI() {
  const months = ['01–31.01.26', '01–28.02.26', '01–31.03.26', '01–30.04.26']
  const rows = [
    { label: 'Sales, revenue', values: ['lei11,161.05', 'lei8,424.50', 'lei12,910.27', 'lei914.65'], expand: true },
    { label: 'Cost', values: ['lei710.18', 'lei71.68', 'lei0.00', 'lei0.00'], expand: true },
    { label: 'Gross Profit', values: ['lei10,450.87', 'lei8,352.82', 'lei12,910.27', 'lei914.65'], highlight: true },
    { label: 'Expenses', values: ['lei4,463.83', 'lei0.00', 'lei0.00', 'lei0.00'], expand: true },
    { label: 'Operating profit', values: ['lei5,987.03', 'lei8,352.82', 'lei12,910.27', 'lei914.65'], highlight: true },
    { label: 'Other income', values: ['lei0.00', 'lei0.00', 'lei0.00', 'lei0.00'] },
    { label: 'Other expenses', values: ['lei0.00', 'lei0.00', 'lei0.00', 'lei0.00'] },
    { label: 'Net Profit', values: ['lei5,987.03', 'lei8,352.82', 'lei12,910.27', 'lei914.65'], highlight: true },
  ]

  return (
    <div className="pm-syrve">
      <div className="pm-syrve-topbar">
        <div className="pm-syrve-logo">syrve</div>
        <div className="pm-syrve-company">Rsistems</div>
        <div className="pm-syrve-periods">
          {['D', 'W', 'M', 'Y', 'P'].map(p => (
            <span key={p} className={`pm-period${p === 'Y' ? ' active' : ''}`}>{p}</span>
          ))}
        </div>
        <span className="pm-syrve-arrow">‹</span>
        <div className="pm-syrve-date">01/01/26 – 31/12/26</div>
        <span className="pm-syrve-arrow">›</span>
      </div>
      <div className="pm-syrve-body">
        <div className="pm-syrve-sidebar">
          <div className="pm-syrve-nav-item">Forecast</div>
          <div className="pm-syrve-nav-item">Inventory <span className="pm-badge">334</span></div>
          <div className="pm-syrve-nav-item">Prep Plan</div>
          <div className="pm-syrve-nav-item">Staff</div>
          <div className="pm-syrve-nav-item">Till Shifts</div>
          <div className="pm-syrve-nav-group">📊 Reports 2.0</div>
          <div className="pm-syrve-nav-sub">Basic indicators</div>
          <div className="pm-syrve-nav-sub">Sales Report</div>
          <div className="pm-syrve-nav-sub">Staff Report</div>
          <div className="pm-syrve-nav-sub">Storage Report</div>
          <div className="pm-syrve-nav-sub active">Profit and Loss Report</div>
          <div className="pm-syrve-nav-sub">Delivery report</div>
          <div className="pm-syrve-nav-item">📊 Reports</div>
        </div>
        <div className="pm-syrve-content">
          <div className="pm-syrve-content-header">
            <h2>Profit and Loss Report</h2>
            <button className="pm-syrve-all-reports">⭐ ALL REPORTS</button>
          </div>
          <div className="pm-pl-table-wrap">
            <table className="pm-pl-table">
              <thead>
                <tr>
                  <th></th>
                  {months.map((m, i) => <th key={i}>{m}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.highlight ? 'pm-pl-highlight' : ''}>
                    <td>
                      {r.expand && <span className="pm-expand-arrow">▶ </span>}
                      {r.label}
                    </td>
                    {r.values.map((v, j) => <td key={j}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PosModal({ type, onClose }: PosModalProps) {
  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-window" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose}>✕</button>
        {type === 'pos' && <NomenclatorUI />}
        {type === 'rapoarte' && <BasicIndicatorsUI />}
        {type === 'management' && <ProfitLossUI />}
      </div>
    </div>
  )
}
