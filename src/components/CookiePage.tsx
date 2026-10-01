import { useEffect } from 'react'
import './LegalPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

const cookieInventory = [
  { name: 'fr', provider: 'Meta/Facebook', category: 'Necesare', purpose: 'Publicitate, personalizarea reclamelor și măsurarea performanței acestora', duration: '3 luni' },
  { name: '_fbp', provider: 'Meta/Facebook', category: 'Necesare', purpose: 'Identificarea browserului pentru măsurarea vizitelor și conversiilor', duration: 'aprox. 90 de zile' },
  { name: '_fbc', provider: 'Meta/Facebook', category: 'Necesare', purpose: 'Atribuirea conversiilor provenite din reclame Facebook; apare când accesarea conține identificatorul', duration: 'aprox. 90 de zile' },
  { name: 'YSC', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Securitatea solicitărilor și măsurarea interacțiunilor cu videoclipurile pe durata sesiunii', duration: 'aprox. 6 luni' },
  { name: 'VISITOR_INFO1_LIVE', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Funcționarea playerului, preferințe, analiză și recomandări', duration: 'aprox. 6 luni' },
  { name: '__Secure-YNID', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Preferințe, analiză și detectarea problemelor serviciului', duration: 'aprox. 6 luni' },
  { name: 'VISITOR_PRIVACY_METADATA', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Memorarea preferințelor de confidențialitate pentru conținut', duration: 'aprox. 6 luni' },
  { name: '__Secure-YEC / __Secure-YENID', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Detectarea spamului, fraudei și abuzului; analiză', duration: 'aprox. 13 luni' },
  { name: '__Secure-ROLLOUT_TOKEN', provider: 'Google/YouTube', category: 'Necesare', purpose: 'Lansarea graduală a funcționalităților și măsurarea experimentelor', duration: 'aprox. 6 luni' },
]

function CookiePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleResetConsent = () => {
    localStorage.removeItem('cookieConsent')
    window.location.href = '/'
  }

  return (
    <div className="legal-page">
      <SEO title="Politica de Cookieuri" description="Politica de cookieuri și tehnologii similare utilizate pe site-ul RSistems." canonical="/politica-cookieuri" noindex />
      <Header />

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-tag">Legal</span>
          <h1 className="legal-hero-h1">Politica de Cookieuri</h1>
          <p className="legal-hero-meta">Ultima actualizare: 1 octombrie 2026 · Versiunea 1.0</p>
        </div>
      </section>

      <div className="legal-content">
        <div className="legal-content-inner">

          {/* Table of contents */}
          <nav className="legal-toc" aria-label="Cuprins">
            <p className="legal-toc-title">Cuprins</p>
            <ol>
              <li><a href="#ce-sunt">Ce sunt cookie-urile</a></li>
              <li><a href="#inventar">Inventarul cookie-urilor</a></li>
              <li><a href="#tehnologii-similare">Tehnologii similare</a></li>
              <li><a href="#date-personale">Date personale colectate</a></li>
              <li><a href="#control">Controlul opțiunilor</a></li>
              <li><a href="#securitate-cookies">Securitate și confidențialitate</a></li>
              <li><a href="#actualizare">Actualizarea politicii</a></li>
            </ol>
          </nav>

          <div className="legal-section" id="ce-sunt">
            <span className="legal-section-num">Secțiunea 1</span>
            <h2>Ce sunt cookie-urile</h2>
            <p>Cookie-urile și tehnologiile similare sunt fișiere sau valori stocate pe dispozitiv pentru funcționarea site-ului, memorarea preferințelor, analiză ori marketing. Cookie-urile necesare sunt utilizate pentru funcțiile solicitate; celelalte categorii sunt activate numai după alegerea ta.</p>
            <p>Categorii:</p>
            <ul>
              <li><strong>Necesare:</strong> securitate, autentificare, sesiune și funcții esențiale.</li>
              <li><strong>Preferințe:</strong> funcții opționale și conținut extern.</li>
              <li><strong>Analiză:</strong> statistici și măsurarea utilizării.</li>
              <li><strong>Marketing:</strong> măsurarea campaniilor și publicitate.</li>
            </ul>
          </div>

          <div className="legal-section" id="inventar">
            <span className="legal-section-num">Secțiunea 2</span>
            <h2>Inventarul cookie-urilor</h2>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Furnizor</th>
                    <th>Categorie</th>
                    <th>Scop</th>
                    <th>Durata</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieInventory.map(c => (
                    <tr key={c.name}>
                      <td><code>{c.name}</code></td>
                      <td>{c.provider}</td>
                      <td>{c.category}</td>
                      <td>{c.purpose}</td>
                      <td>{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Cookie-urile YouTube sunt relevante pentru pagina <a href="/demo">Demo</a>, unde există videoclipuri încorporate. Lista poate varia în funcție de browser, setările utilizatorului și actualizările făcute de Meta sau Google.</p>
          </div>

          <div className="legal-section" id="tehnologii-similare">
            <span className="legal-section-num">Secțiunea 3</span>
            <h2>Tehnologii similare</h2>
            <p>Site-ul mai utilizează două mecanisme de stocare în browser care, tehnic, nu sunt cookie-uri, dar sunt menționate în această politică drept „tehnologii similare":</p>
            <ul>
              <li><strong><code>cookieConsent</code></strong> — furnizor RSistems; memorează acceptarea sau refuzul din banner; este păstrat în localStorage până când ștergi datele site-ului.</li>
              <li><strong><code>partnerLoggedIn</code></strong> — furnizor RSistems; memorează autentificarea în zona de parteneri; este păstrat în sessionStorage până la închiderea filei/sesiunii browserului.</li>
            </ul>
          </div>

          <div className="legal-section" id="date-personale">
            <span className="legal-section-num">Secțiunea 4</span>
            <h2>Date personale colectate prin cookie-uri</h2>
            <p>Prin cookie-uri și tehnologii similare pot fi prelucrate identificatori online, adresa IP, tipul dispozitivului și al navigatorului, paginile vizitate și evenimentele de interacțiune. Cookie-urile necesare se folosesc pentru furnizarea serviciului solicitat; cele de preferințe, analiză și marketing numai în baza consimțământului, care poate fi retras oricând.</p>
          </div>

          <div className="legal-section" id="control">
            <span className="legal-section-num">Secțiunea 5</span>
            <h2>Controlul opțiunilor</h2>
            <p>Poți accepta, refuza sau modifica separat categoriile opționale, la fel de simplu cum le-ai acordat. De asemenea, poți șterge cookie-urile din setările navigatorului; blocarea celor necesare poate împiedica funcționarea unor caracteristici.</p>
            <button type="button" className="legal-consent-btn" onClick={handleResetConsent}>
              Modifică consimțământul cookie
            </button>
          </div>

          <div className="legal-section" id="securitate-cookies">
            <span className="legal-section-num">Secțiunea 6</span>
            <h2>Măsuri de securitate și confidențialitate</h2>
            <p>Opțiunile tale sunt păstrate local în navigator și înregistrate la operator împreună cu versiunea politicii, ca dovadă a alegerii. Identificatorii de rețea (adresa IP și agentul de navigare) se păstrează exclusiv sub formă de valori criptografice cu sare, nu în clar. Accesul administrativ la aceste evidențe este restricționat și jurnalizat. Transmiterea datelor se face prin conexiuni criptate.</p>
          </div>

          <div className="legal-section" id="actualizare">
            <span className="legal-section-num">Secțiunea 7</span>
            <h2>Actualizarea politicii</h2>
            <p>Actualizăm această politică atunci când se modifică serviciile utilizate, scopurile, duratele de stocare sau destinatarii. Fiecare actualizare primește o versiune nouă, iar categoriile opționale sunt supuse din nou alegerii tale. Versiunile anterioare se păstrează de operator și pot fi solicitate la <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a>.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CookiePage
