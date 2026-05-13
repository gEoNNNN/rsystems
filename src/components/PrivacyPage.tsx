import { useEffect } from 'react'
import './LegalPage.css'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="legal-page">
      <SEO title="Politica de Confidențialitate" description="Politica de confidențialitate și protecția datelor personale pe platforma RSistems." canonical="/confidentialitate" noindex />
      <Header />

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-tag">Legal</span>
          <h1 className="legal-hero-h1">Politica de Confidențialitate</h1>
          <p className="legal-hero-meta">Ultima actualizare: 11 mai 2026</p>
        </div>
      </section>

      <div className="legal-content">
        <div className="legal-content-inner">

          {/* Table of contents */}
          <nav className="legal-toc" aria-label="Cuprins">
            <p className="legal-toc-title">Cuprins</p>
            <ol>
              <li><a href="#intro">Cine suntem</a></li>
              <li><a href="#date-colectate">Ce date colectăm</a></li>
              <li><a href="#utilizare">Cum utilizăm datele</a></li>
              <li><a href="#partajare">Partajarea datelor</a></li>
              <li><a href="#drepturi">Drepturile tale</a></li>
              <li><a href="#cookies">Cookies</a></li>
              <li><a href="#retentie">Retenția datelor</a></li>
              <li><a href="#securitate">Securitate</a></li>
              <li><a href="#copii">Minori</a></li>
              <li><a href="#contact-privacy">Contact DPO</a></li>
            </ol>
          </nav>

          <div className="legal-section" id="intro">
            <span className="legal-section-num">Secțiunea 1</span>
            <h2>Cine suntem</h2>
            <p>RSistems SRL este operatorul datelor cu caracter personal colectate prin intermediul platformei noastre software și al site-ului web <strong>rsistems.ro</strong>.</p>
            <p>Ne angajăm să protejăm confidențialitatea datelor tale și să respectăm legislația aplicabilă în domeniu, inclusiv Regulamentul General privind Protecția Datelor (GDPR — Regulamentul UE 2016/679).</p>
            <div className="legal-highlight">
              <p>Această politică descrie ce date colectăm, de ce le colectăm și cum le utilizăm. Te rugăm să o citești cu atenție.</p>
            </div>
          </div>

          <div className="legal-section" id="date-colectate">
            <span className="legal-section-num">Secțiunea 2</span>
            <h2>Ce date colectăm</h2>
            <p>Colectăm date în mai multe moduri, în funcție de modul în care interacționezi cu RSistems:</p>
            <ul>
              <li><strong>Date de înregistrare:</strong> Nume, prenume, adresă de email, număr de telefon, denumire companie, CUI.</li>
              <li><strong>Date de utilizare:</strong> Informații despre cum utilizezi Platforma — comenzi procesate, rapoarte generate, sesiuni de conectare, adresă IP.</li>
              <li><strong>Date de facturare:</strong> Informații necesare emiterii facturilor fiscale (denumire firmă, adresă, date de contact).</li>
              <li><strong>Date de suport:</strong> Mesaje și solicitări transmise echipei noastre de suport.</li>
              <li><strong>Date tehnice:</strong> Tipul browser-ului, sistemul de operare, rezoluția ecranului, pagini vizitate și durata sesiunilor — colectate automat prin cookies și instrumente de analiză.</li>
            </ul>
          </div>

          <div className="legal-section" id="utilizare">
            <span className="legal-section-num">Secțiunea 3</span>
            <h2>Cum utilizăm datele</h2>
            <p>Datele colectate sunt utilizate pentru:</p>
            <ul>
              <li>Furnizarea, operarea și îmbunătățirea serviciilor RSistems</li>
              <li>Gestionarea contului tău și autentificarea în Platformă</li>
              <li>Procesarea plăților și emiterea facturilor</li>
              <li>Comunicarea cu tine — răspunsuri la solicitări, notificări tehnice, actualizări ale serviciului</li>
              <li>Trimiterea de materiale de marketing și promoționale, exclusiv cu consimțământul tău</li>
              <li>Detectarea și prevenirea fraudelor sau utilizărilor neautorizate</li>
              <li>Respectarea obligațiilor legale</li>
            </ul>
          </div>

          <div className="legal-section" id="partajare">
            <span className="legal-section-num">Secțiunea 4</span>
            <h2>Partajarea datelor</h2>
            <p>Nu vindem, nu închiriem și nu facem comerț cu datele tale personale. Putem partaja date cu terțe părți exclusiv în următoarele situații:</p>
            <ul>
              <li><strong>Furnizori de servicii:</strong> Companii care ne ajută să operăm Platforma (hosting, procesatori de plăți, servicii email), legate contractual de obligații de confidențialitate.</li>
              <li><strong>Cerințe legale:</strong> Dacă suntem obligați prin lege, hotărâre judecătorească sau solicitare a unei autorități competente.</li>
              <li><strong>Protecția drepturilor:</strong> Când este necesar pentru a proteja drepturile, proprietatea sau siguranța RSistems, a utilizatorilor noștri sau a publicului.</li>
              <li><strong>Transfer de afaceri:</strong> În cazul unei fuziuni, achiziții sau vânzări a activelor companiei, cu notificarea prealabilă a utilizatorilor afectați.</li>
            </ul>
          </div>

          <div className="legal-section" id="drepturi">
            <span className="legal-section-num">Secțiunea 5</span>
            <h2>Drepturile tale</h2>
            <p>În conformitate cu GDPR, ai următoarele drepturi în legătură cu datele tale personale:</p>
            <ul>
              <li><strong>Dreptul de acces</strong> — Poți solicita o copie a datelor personale pe care le deținem despre tine.</li>
              <li><strong>Dreptul la rectificare</strong> — Poți solicita corectarea datelor inexacte sau incomplete.</li>
              <li><strong>Dreptul la ștergere</strong> — Poți solicita ștergerea datelor tale, sub rezerva obligațiilor legale de retenție.</li>
              <li><strong>Dreptul la restricționarea prelucrării</strong> — Poți solicita limitarea modului în care utilizăm datele tale.</li>
              <li><strong>Dreptul la portabilitate</strong> — Poți solicita exportul datelor tale într-un format structurat, lizibil automat.</li>
              <li><strong>Dreptul de opoziție</strong> — Te poți opune prelucrării datelor tale în scopuri de marketing direct.</li>
              <li><strong>Dreptul de retragere a consimțământului</strong> — Acolo unde prelucrarea se bazează pe consimțământ, îl poți retrage oricând.</li>
            </ul>
            <p>Pentru a-ți exercita oricare dintre aceste drepturi, contactează-ne la <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a>. Vom răspunde în termen de 30 de zile calendaristice.</p>
          </div>

          <div className="legal-section" id="cookies">
            <span className="legal-section-num">Secțiunea 6</span>
            <h2>Cookies</h2>
            <p>Folosim cookies și tehnologii similare pentru a îmbunătăți experiența ta pe platforma noastră. Tipurile de cookies utilizate:</p>
            <ul>
              <li><strong>Cookies esențiale:</strong> Necesare pentru funcționarea de bază a site-ului (autentificare, sesiune). Nu pot fi dezactivate.</li>
              <li><strong>Cookies de performanță:</strong> Colectează informații anonime despre modul de utilizare a site-ului pentru a ne ajuta să îl îmbunătățim.</li>
              <li><strong>Cookies de funcționalitate:</strong> Rețin preferințele tale (limbă, regiune) pentru a personaliza experiența.</li>
              <li><strong>Cookies de marketing:</strong> Utilizate pentru a afișa anunțuri relevante. Activarea lor necesită consimțământul tău.</li>
            </ul>
            <p>Poți gestiona preferințele tale de cookies din setările browser-ului sau prin bannerul de cookies afișat la prima vizită.</p>
          </div>

          <div className="legal-section" id="retentie">
            <span className="legal-section-num">Secțiunea 7</span>
            <h2>Retenția datelor</h2>
            <p>Păstrăm datele tale personale atât timp cât este necesar pentru scopurile descrise în această politică sau cât impun obligațiile legale. Mai specific:</p>
            <ul>
              <li>Datele contului activ — pe durata relației contractuale și 3 ani după închiderea contului</li>
              <li>Datele de facturare — 10 ani, conform legislației fiscale românești</li>
              <li>Jurnalele de activitate — 12 luni</li>
              <li>Corespondența de suport — 2 ani de la ultima interacțiune</li>
            </ul>
            <p>La expirarea perioadei de retenție, datele sunt șterse securizat sau anonimizate.</p>
          </div>

          <div className="legal-section" id="securitate">
            <span className="legal-section-num">Secțiunea 8</span>
            <h2>Securitate</h2>
            <p>Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele tale împotriva accesului neautorizat, pierderii sau distrugerii, inclusiv:</p>
            <ul>
              <li>Criptarea datelor în tranzit (HTTPS/TLS) și la repaus</li>
              <li>Autentificare cu doi factori pentru accesul la date sensibile</li>
              <li>Audituri de securitate periodice</li>
              <li>Accesul la date limitat la personalul autorizat, pe baza principiului necesității</li>
              <li>Backup-uri regulate și planuri de recuperare în caz de incident</li>
            </ul>
            <p>În cazul unei breșe de securitate care afectează datele tale, te vom notifica în conformitate cu cerințele GDPR (în termen de 72 de ore față de autoritate, respectiv fără întârzieri nejustificate față de persoanele vizate).</p>
          </div>

          <div className="legal-section" id="copii">
            <span className="legal-section-num">Secțiunea 9</span>
            <h2>Minori</h2>
            <p>Serviciile RSistems sunt destinate exclusiv persoanelor cu vârsta de cel puțin 18 ani sau reprezentanților legali ai companiilor. Nu colectăm intenționat date personale de la minori.</p>
            <p>Dacă ești părintele sau tutorele unui minor și crezi că acesta ne-a furnizat date personale, te rugăm să ne contactezi pentru a le șterge.</p>
          </div>

          <div className="legal-section" id="contact-privacy">
            <span className="legal-section-num">Secțiunea 10</span>
            <h2>Contact DPO</h2>
            <p>Pentru orice întrebări, solicitări sau plângeri legate de prelucrarea datelor tale personale, poți contacta responsabilul nostru cu protecția datelor:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:welcome@rsistems.ro">welcome@rsistems.ro</a></li>
              <li><strong>Telefon:</strong> <a href="tel:+40751088772">+40 751 088 772</a></li>
            </ul>
            <p>Ai, de asemenea, dreptul de a depune o plângere la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPage
