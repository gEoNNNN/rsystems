import { useEffect } from 'react'
import './LegalPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="legal-page">
      <SEO title="Termeni și Condiții" description="Termenii și condițiile de utilizare ale platformei RSistems." canonical="/termeni" noindex />
      <Header />

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-tag">Legal</span>
          <h1 className="legal-hero-h1">Termeni &amp; Condiții</h1>
          <p className="legal-hero-meta">Ultima actualizare: 11 mai 2026</p>
        </div>
      </section>

      <div className="legal-content">
        <div className="legal-content-inner">

          {/* Table of contents */}
          <nav className="legal-toc" aria-label="Cuprins">
            <p className="legal-toc-title">Cuprins</p>
            <ol>
              <li><a href="#definitii">Definiții</a></li>
              <li><a href="#acceptare">Acceptarea termenilor</a></li>
              <li><a href="#servicii">Descrierea serviciilor</a></li>
              <li><a href="#cont">Contul utilizatorului</a></li>
              <li><a href="#plati">Plăți și abonamente</a></li>
              <li><a href="#rambursare">Politica de rambursare</a></li>
              <li><a href="#proprietate">Proprietate intelectuală</a></li>
              <li><a href="#raspundere">Limitarea răspunderii</a></li>
              <li><a href="#modificari">Modificarea termenilor</a></li>
              <li><a href="#contact-legal">Contact</a></li>
            </ol>
          </nav>

          <div className="legal-section" id="definitii">
            <span className="legal-section-num">Secțiunea 1</span>
            <h2>Definiții</h2>
            <p>În cadrul acestor Termeni și Condiții, următorii termeni au semnificațiile de mai jos:</p>
            <ul>
              <li><strong>„RSistems"</strong> sau <strong>„noi"</strong> — societatea RSistems SRL, furnizor al platformei software.</li>
              <li><strong>„Utilizator"</strong> sau <strong>„Client"</strong> — orice persoană fizică sau juridică care accesează sau utilizează serviciile RSistems.</li>
              <li><strong>„Platforma"</strong> — ansamblul aplicațiilor software, instrumentelor și serviciilor oferite de RSistems, inclusiv sistemul POS, modulul de gestiune a stocurilor, kitchen display, comenzi digitale și alte componente.</li>
              <li><strong>„Abonament"</strong> — planul de tarifare ales de Client (Basic, Professional sau Enterprise) ce conferă dreptul de acces la Platformă.</li>
              <li><strong>„Date"</strong> — orice informație introdusă sau generată de Client în cadrul utilizării Platformei.</li>
            </ul>
          </div>

          <div className="legal-section" id="acceptare">
            <span className="legal-section-num">Secțiunea 2</span>
            <h2>Acceptarea termenilor</h2>
            <p>Prin accesarea, înregistrarea sau utilizarea Platformei RSistems, confirmi că ai citit, înțeles și ești de acord să respecți acești Termeni și Condiții, împreună cu Politica de Confidențialitate.</p>
            <p>Dacă utilizezi Platforma în numele unei organizații, declari că ești autorizat să angajezi respectiva organizație prin acceptarea acestor termeni.</p>
            <div className="legal-highlight">
              <p>Dacă nu ești de acord cu oricare dintre termenii de mai jos, te rugăm să nu utilizezi serviciile RSistems.</p>
            </div>
          </div>

          <div className="legal-section" id="servicii">
            <span className="legal-section-num">Secțiunea 3</span>
            <h2>Descrierea serviciilor</h2>
            <p>RSistems oferă un ecosistem software dedicat industriei HoReCa, care include, fără a se limita la:</p>
            <ul>
              <li>Sistem POS (Point of Sale) pentru vânzări rapide și gestionarea comenzilor</li>
              <li>Gestiunea stocurilor și a rețetelor</li>
              <li>Kitchen Display System (KDS) pentru comunicare în timp real</li>
              <li>Rapoarte și analize detaliate</li>
              <li>Gestionarea livrărilor și comenzilor online</li>
              <li>Managementul echipei și al programului de lucru</li>
              <li>Integrare cu case de marcat fiscale și platforme externe</li>
            </ul>
            <p>RSistems își rezervă dreptul de a adăuga, modifica sau elimina funcționalități din Platformă, cu notificare prealabilă acolo unde este posibil.</p>
          </div>

          <div className="legal-section" id="cont">
            <span className="legal-section-num">Secțiunea 4</span>
            <h2>Contul utilizatorului</h2>
            <p>Pentru a accesa Platforma, este necesară crearea unui cont. Ești responsabil de:</p>
            <ul>
              <li>Corectitudinea informațiilor furnizate la înregistrare</li>
              <li>Confidențialitatea credențialelor de acces</li>
              <li>Toate activitățile desfășurate sub contul tău</li>
            </ul>
            <p>Trebuie să ne notifici imediat la <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a> în cazul oricărui acces neautorizat sau al oricărei breșe de securitate a contului tău.</p>
          </div>

          <div className="legal-section" id="plati">
            <span className="legal-section-num">Secțiunea 5</span>
            <h2>Plăți și abonamente</h2>
            <p>Accesul la funcționalitățile complete ale Platformei se face pe baza unui abonament lunar sau anual, în funcție de planul ales. Prețurile sunt afișate pe pagina <a href="/preturi">Prețuri</a> și pot fi modificate cu un preaviz de 30 de zile.</p>
            <ul>
              <li>Plata se efectuează în avans, la începutul fiecărei perioade de facturare.</li>
              <li>Facturile sunt emise electronic și transmise pe adresa de email asociată contului.</li>
              <li>Neplata în termen de 14 zile de la scadență poate duce la suspendarea temporară a accesului.</li>
              <li>Toate prețurile sunt exprimate în EUR și nu includ TVA, unde este aplicabil.</li>
            </ul>
          </div>

          <div className="legal-section" id="rambursare">
            <span className="legal-section-num">Secțiunea 6</span>
            <h2>Politica de rambursare</h2>
            <p>RSistems oferă o perioadă de testare gratuită de 14 zile fără obligații. După expirarea acestei perioade:</p>
            <ul>
              <li>Abonamentele lunare nu sunt rambursabile după debitul efectuat.</li>
              <li>Abonamentele anuale sunt eligibile pentru rambursare proporțională în primele 30 de zile de la activare.</li>
              <li>Rambursările se procesează în 5–10 zile lucrătoare.</li>
            </ul>
            <p>Pentru solicitări de rambursare, contactați echipa noastră la <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a>.</p>
          </div>

          <div className="legal-section" id="proprietate">
            <span className="legal-section-num">Secțiunea 7</span>
            <h2>Proprietate intelectuală</h2>
            <p>Toate drepturile de proprietate intelectuală asupra Platformei, inclusiv codul sursă, designul, logourile, textele și funcționalitățile, aparțin exclusiv RSistems sau licențiatorilor săi.</p>
            <p>Clientul nu are dreptul să copieze, modifice, distribuie, vândă sau exploateze comercial nicio parte a Platformei fără acordul scris prealabil al RSistems.</p>
            <p>Datele introduse de Client în Platformă rămân proprietatea Clientului. RSistems nu revendică niciun drept de proprietate asupra acestor date.</p>
          </div>

          <div className="legal-section" id="raspundere">
            <span className="legal-section-num">Secțiunea 8</span>
            <h2>Limitarea răspunderii</h2>
            <p>RSistems depune eforturi rezonabile pentru a asigura disponibilitatea și funcționarea corespunzătoare a Platformei. Cu toate acestea, Platforma este furnizată „ca atare", fără garanții exprese sau implicite privind:</p>
            <ul>
              <li>Disponibilitatea neîntreruptă a serviciului</li>
              <li>Absența erorilor sau a virușilor</li>
              <li>Potrivirea pentru un scop specific</li>
            </ul>
            <p>În nicio circumstanță RSistems nu va fi răspunzător pentru daune indirecte, incidentale, speciale sau consecvente, inclusiv pierderi de profit, date sau oportunități de afaceri.</p>
          </div>

          <div className="legal-section" id="modificari">
            <span className="legal-section-num">Secțiunea 9</span>
            <h2>Modificarea termenilor</h2>
            <p>RSistems poate actualiza acești Termeni și Condiții periodic. Modificările vor fi comunicate prin:</p>
            <ul>
              <li>Notificare prin email la adresa asociată contului</li>
              <li>Afișarea unui banner de informare la accesarea Platformei</li>
              <li>Actualizarea datei „Ultima actualizare" din antetul acestui document</li>
            </ul>
            <p>Continuarea utilizării Platformei după intrarea în vigoare a modificărilor constituie acceptarea noilor termeni.</p>
          </div>

          <div className="legal-section" id="contact-legal">
            <span className="legal-section-num">Secțiunea 10</span>
            <h2>Contact</h2>
            <p>Pentru orice întrebări legate de acești Termeni și Condiții, ne poți contacta:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a></li>
              <li><strong>Telefon:</strong> <a href="tel:+40751088772">+40 751 088 772</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/40751088772" target="_blank" rel="noopener noreferrer">Deschide conversația</a></li>
            </ul>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TermsPage
