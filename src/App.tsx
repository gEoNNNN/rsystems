import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const partnerLogos = [
    '/img/LogoDesktop 1.svg',
    '/img/LogoDesktop 2.svg',
    '/img/LogoDesktop 3.svg',
    '/img/LogoDesktop 4.svg',
    '/img/LogoDesktop 5.svg',
    '/img/LogoDesktop 6.svg',
  ]

  // Auto-slide effect with seamless loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Reset position seamlessly when reaching the end
  useEffect(() => {
    if (currentSlide === partnerLogos.length) {
      // Wait for transition to complete, then reset instantly
      setTimeout(() => {
        const track = document.querySelector('.carousel-track') as HTMLElement;
        if (track) {
          track.style.transition = 'none';
          setCurrentSlide(0);
          // Re-enable transition after a brief moment
          setTimeout(() => {
            track.style.transition = 'transform 1s ease-in-out';
          }, 50);
        }
      }, 1000);
    }
  }, [currentSlide, partnerLogos.length]);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <p className="hero-label">SOFTWARE MANAGEMENT</p>
            <h1 className="hero-title">
              <span className="hero-title-dark">Controlează.</span><br />
              <span className="hero-title-dark">Optimizează.</span><br />
              <span className="hero-title-accent">Crește profitul.</span>
            </h1>
            <p className="hero-description">
              Soluția completă pentru afacerea ta în HoReCa. Comenzi, stocuri şi rapoarte în timp real, într-o singură platformă.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me/40517508772?text=Bună! Vreau să încep să folosesc RSistems." className="hero-cta-primary" target="_blank" rel="noopener noreferrer">
                Începe acum
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://wa.me/40517508772?text=Bună! Aș dori să văd o demonstrație a sistemului RSistems." className="hero-cta-secondary" target="_blank" rel="noopener noreferrer">
                Vezi demo
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM8 14.5V5.5L14 10L8 14.5Z"/>
                </svg>
              </a>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-icon">
                <img src="/img/men.svg" alt="People" />
              </div>
              <p className="hero-trust-text">
                Peste de <strong>500+ business-uri</strong><br />
                au încredere în RSistems
              </p>
            </div>
          </div>
          <div className="hero-right">
            <img src="/img/Hero-right.svg" alt="Hero" className="hero-illustration" />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2 className="partners-title">Parteneri care folosesc RSistem</h2>
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 25}%)`
            }}
          >
            {/* Double the logos for seamless infinite loop */}
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="carousel-item">
                <img src={logo} alt={`Partner ${(index % partnerLogos.length) + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/comenzi.svg" alt="Comenzi" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Comenzi mai rapide</h3>
              <p className="feature-description">
                Procesează comenzile fără erori și întârziere.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/rapoarte.svg" alt="Rapoarte" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Rapoarte în timp real</h3>
              <p className="feature-description">
                Urmărește vânzările și performanța live.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/stocuri.svg" alt="Stocuri" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Stocuri optimizate</h3>
              <p className="feature-description">
                Evită pierderile și ții stocurile sub control.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/clienti.svg" alt="Clienți" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Clienți mai mulțumiți</h3>
              <p className="feature-description">
                Experiențe mai bune, clienți care revin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges vs Solutions Section */}
      <section className="comparison-section">
        <div className="comparison-container">
          {/* Challenges Column */}
          <div className="comparison-column challenges-column">
            <h2 className="comparison-title1">Provocările tale zilnice</h2>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span className="icon-x">✕</span>
                <span>Pierderi din stocuri și inventar incorect</span>
              </li>
              <li className="comparison-item">
                <span className="icon-x">✕</span>
                <span>Lipsă de control asupra operațiunilor</span>
              </li>
              <li className="comparison-item">
                <span className="icon-x">✕</span>
                <span>Decizii luate fără date reale</span>
              </li>
              <li className="comparison-item">
                <span className="icon-x">✕</span>
                <span>Timp pierdut cu rapoarte manuale</span>
              </li>
              <li className="comparison-item">
                <span className="icon-x">✕</span>
                <span>Erori de comunicare între echipe</span>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="comparison-column solutions-column">
            <h2 className="comparison-title">Provocările tale zilnice</h2>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span className="icon-check">✓</span>
                <span>Transformă datele în profit, automat.</span>
              </li>
              <li className="comparison-item">
                <span className="icon-check">✓</span>
                <span>Control total asupra afacerii tale</span>
              </li>
              <li className="comparison-item">
                <span className="icon-check">✓</span>
                <span>Rapoarte și analize in timp real</span>
              </li>
              <li className="comparison-item">
                <span className="icon-check">✓</span>
                <span>Reducerea pierderilor și optimizarea costurilor</span>
              </li>
              <li className="comparison-item">
                <span className="icon-check">✓</span>
                <span>Decizii bazate pe date reale</span>
              </li>
            </ul>
          </div>

          {/* Graph Column */}
          <div className="comparison-column graph-column">
            <img src="/img/graph.svg" alt="Growth Graph" className="graph-image" />
          </div>
        </div>
      </section>

       {/* All-in-One System Section */}
      <section className="allinone-section">
        <h2 className="allinone-title">Tot ce ai nevoie, într-un singur sistem</h2>
        <div className="allinone-container">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/pos.svg" alt="POS" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">POS inteligent</h3>
              <p className="feature-description">
                Interfață intuitivă, rapidă și ușor de folosit de către oricine.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/stocuri.svg" alt="Rapoarte" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Rapoarte avansate</h3>
              <p className="feature-description">
                Analiza detaliată despre vânzări, produsele, clienți și angajați!
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/img/clienti.svg" alt="Management" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Management complet</h3>
              <p className="feature-description">
                Controlezi stocurile, rețetele, angajații, clienți și furnizorii dintr-un singur loc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POS Screens Section */}
      <section className="pos-screens-section">
        <div className="pos-screens-container">
          <div className="pos-screen">
            <img src="/img/POS 1.svg" alt="POS Screen 1" />
          </div>
          <div className="pos-screen">
            <img src="/img/POS 2.svg" alt="POS Screen 2" />
          </div>
          <div className="pos-screen">
            <img src="/img/POS 3.svg" alt="POS Screen 3" />
          </div>
        </div>
      </section>

      {/* Why Choose RSistems Section */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <h2 className="why-choose-title">De ce să alegi RSistems?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <img src="/img/implementare.svg" alt="Implementare" />
              </div>
              <div className="why-choose-content">
                <h3 className="why-choose-card-title">Implementare rapidă</h3>
                <p className="why-choose-description">
                  Sistemul este operațional fără întreruperea activității tale.
                </p>
              </div>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon">
                <img src="/img/suport.svg" alt="Suport" />
              </div>
              <div className="why-choose-content">
                <h3 className="why-choose-card-title">Suport dedicat în România</h3>
                <p className="why-choose-description">
                  Echipă locală, disponibilă când ai nevoie.
                </p>
              </div>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon">
                <img src="/img/optimizare.svg" alt="Optimizare" />
              </div>
              <div className="why-choose-content">
                <h3 className="why-choose-card-title">Optimizat pentru HoReCa</h3>
                <p className="why-choose-description">
                  Funcționalități create special pentru afacerea ta.
                </p>
              </div>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon">
                <img src="/img/integrare.svg" alt="Integrare" />
              </div>
              <div className="why-choose-content">
                <h3 className="why-choose-card-title">Integrare cu echipamente</h3>
                <p className="why-choose-description">
                  Funcționează cu case de marcat, imprimante, cântare și altele.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <img src="/img/case.svg" alt="Business-uri" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Business-uri partenere</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <img src="/img/set.svg" alt="Support" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">24/7 h</h3>
              <p className="stat-label">Consultație rapidă</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <img src="/img/medalie.svg" alt="Uptime" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">99.9%</h3>
              <p className="stat-label">Uptime & stabilitate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Vrei să vezi cât profit pierzi acum?</h2>
            <p className="cta-description">
              Programează o demonstrație gratuită și descoperă cum te putem ajuta.
            </p>
          </div>
          <a href="https://wa.me/40517508772?text=Bună! Vreau să programez o demonstrație gratuită a sistemului RSistems." className="cta-button-large" target="_blank" rel="noopener noreferrer">
            Programează demo gratuit
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="faq-title">Întrebări frecvente</h2>
        <div className="faq-container">
          <div className="faq-grid">
            <div className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              >
                <span>Ce este un sistem POS pentru restaurant?</span>
                <span className={`faq-icon ${openFaq === 0 ? 'open' : ''}`}>+</span>
              </button>
              {openFaq === 0 && (
                <div className="faq-answer">
                  <p>
                    Un sistem POS pentru restaurant este un software care gestionează comenzile, plățile și operațiunile zilnice. Acesta ajută la reducerea erorilor și oferă control în timp real asupra vânzărilor și încasărilor.
                  </p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              >
                <span>Ce este un software de gestiune restaurant?</span>
                <span className={`faq-icon ${openFaq === 1 ? 'open' : ''}`}>+</span>
              </button>
              {openFaq === 1 && (
                <div className="faq-answer">
                  <p>
                    Un software de gestiune restaurant controlează stocurile, costurile și fluxul operațional. Acesta reduce pierderile și ajută la optimizarea activității zilnice.
                  </p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              >
                <span>Funcționează sistemul fără internet?</span>
                <span className={`faq-icon ${openFaq === 2 ? 'open' : ''}`}>+</span>
              </button>
              {openFaq === 2 && (
                <div className="faq-answer">
                  <p>
                    Da, partea de vânzare (POS) funcționează offline. Pentru rapoarte și management este necesară conexiune la internet.
                  </p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              >
                <span>În cât timp se implementează?</span>
                <span className={`faq-icon ${openFaq === 3 ? 'open' : ''}`}>+</span>
              </button>
              {openFaq === 3 && (
                <div className="faq-answer">
                  <p>
                    Implementarea durează, în general, între 2 și 4 zile, în funcție de complexitatea businessului.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
