import { useState, useEffect } from 'react'
import './RestaurantPage.css'
import Header from './Header'
import Footer from './Footer'

interface StatItem {
  value: string
  label: string
}

interface FaqItem {
  question: string
  answer: string
}

interface RestaurantPageProps {
  preTitle: string
  midTitle: string
  mainTitle: string
  description: string
  stats: StatItem[]
  backgroundImage: string
  category: string
  infoTitle?: string
  infoDescription?: string
  benefitsTitle?: string
  benefits?: string[]
  faqs?: FaqItem[]
  faqImage?: string
}

function RestaurantPage({ 
  preTitle, 
  midTitle, 
  mainTitle, 
  description, 
  stats, 
  backgroundImage,
  category,
  infoTitle,
  infoDescription,
  benefitsTitle,
  benefits,
  faqs,
  faqImage
}: RestaurantPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const getItemWidthPercent = () => {
    if (window.innerWidth <= 768) return 25
    if (window.innerWidth <= 1024) return 33.333
    return 16.6667
  }
  const [itemWidthPercent, setItemWidthPercent] = useState(getItemWidthPercent)

  const partnerLogos = [
    '/img/LogoDesktop 1.svg',
    '/img/LogoDesktop 2.svg',
    '/img/LogoDesktop 3.svg',
    '/img/LogoDesktop 4.svg',
    '/img/LogoDesktop 5.svg',
    '/img/LogoDesktop 6.svg',
    '/img/LogoDesktop 7.svg',
    '/img/LogoDesktop 8.svg',
    '/img/LogoDesktop 9.svg',
    '/img/LogoDesktop 10.svg',
    '/img/LogoDesktop 11.svg',
    '/img/LogoDesktop 12.svg',
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleResize = () => setItemWidthPercent(getItemWidthPercent())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide effect with seamless loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Reset position seamlessly when reaching the end
  useEffect(() => {
    if (currentSlide === partnerLogos.length) {
      setTimeout(() => {
        const track = document.querySelector('.carousel-track') as HTMLElement
        if (track) {
          track.style.transition = 'none'
          setCurrentSlide(0)
          setTimeout(() => {
            track.style.transition = 'transform 1s ease-in-out'
          }, 50)
        }
      }, 1000)
    }
  }, [currentSlide, partnerLogos.length])

  return (
    <div className={`restaurant-page ${category}-page`}>
      <Header />
      
      <section className="restaurant-hero">
        <img src={backgroundImage} alt="" className="restaurant-hero-bg" />
        <div className="restaurant-hero-container">
          <div className="restaurant-hero-left">
            <p className="restaurant-pre-title">{preTitle}</p>
            <p className="restaurant-mid-title">{midTitle}</p>
            <h1 className="restaurant-main-title">{mainTitle}</h1>
            <p className="restaurant-description">{description}</p>
            
            <a href="/demo" className="restaurant-demo-button">
              Vezi demo
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM8 14.5V5.5L14 10L8 14.5Z"/>
              </svg>
            </a>

            <div className="restaurant-stats">
              {stats.map((stat, index) => (
                <div key={index} className="restaurant-stat">
                  <div className="restaurant-stat-value">{stat.value}</div>
                  <div className="restaurant-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="restaurant-partners-section">
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * itemWidthPercent}%)`
            }}
          >
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="carousel-item">
                <img src={logo} alt={`Partner ${(index % partnerLogos.length) + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info & Benefits Section */}
      <section className="restaurant-info-section">
        <div className="restaurant-info-container">
          <div className="restaurant-info-left">
            <h2 className="restaurant-info-title">{infoTitle}</h2>
            <p className="restaurant-info-description">{infoDescription}</p>
          </div>
          <div className="restaurant-info-right">
            <h3 className="restaurant-benefits-title">{benefitsTitle}</h3>
            <ul className="restaurant-benefits-list">
              {benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

     {/* Call to Action Section */}
      <section className="restaurant-cta-section">
        <h2 className="restaurant-cta-heading">
          Restaurant EPOS și soluții de management pentru fiecare tip de afacere
        </h2>
        <a href="https://wa.me/40517508772?text=Bună! Vreau să rezerv un apel." className="restaurant-cta-button" target="_blank" rel="noopener noreferrer">
          Rezervați un apel
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="restaurant-faq-section">
          <div className="restaurant-faq-container">
            <div className="restaurant-faq-left">
              {faqs.map((faq, index) => (
                <div key={index} className="restaurant-faq-item">
                  <button 
                    className={`restaurant-faq-question ${openFaq === index ? 'active' : ''}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="restaurant-faq-number">{index + 1}</span>
                    <span className="restaurant-faq-question-text">{faq.question}</span>
                    <svg 
                      className="restaurant-faq-arrow" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="restaurant-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="restaurant-faq-right">
              {faqImage && <img src={faqImage} alt="FAQ" className="restaurant-faq-image" />}
            </div>
          </div>
        </section>
      )}


        {/* Why RSistems Section */}
      <section className="restaurant-why-section">
        <div className="restaurant-why-container">
          <h2 className="restaurant-why-title">De ce RSistems ?</h2>
          <p className="restaurant-why-description">
            RSistems este mai mult decât un simplu sistem POS este o soluție completă, concepută pentru a transforma operațiunile restaurantului tău.
          </p>
          <a href="https://wa.me/40517508772?text=Bună! Vreau să rezerv un apel." className="restaurant-why-button" target="_blank" rel="noopener noreferrer">
            Rezervați un apel
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <div className="restaurant-why-cards">
            <div className="restaurant-why-card">
              <img src="/img/dece1.svg" alt="Sistem autonom" className="restaurant-why-card-image" />
              <h3 className="restaurant-why-card-title">Sistem autonom all-in-one</h3>
            </div>
            <div className="restaurant-why-card">
              <img src="/img/dece2.svg" alt="Ușor de utilizat" className="restaurant-why-card-image" />
              <h3 className="restaurant-why-card-title">Avansat și ușor de utilizat</h3>
            </div>
            <div className="restaurant-why-card">
              <img src="/img/dece3.svg" alt="Asistență reală" className="restaurant-why-card-image" />
              <h3 className="restaurant-why-card-title">Oameni reali, asistență reală</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="restaurant-contact-section">
        <div className="restaurant-contact-container">
          <div className="restaurant-contact-left">
            <img src="/img/optim.svg" alt="Background" className="restaurant-contact-bg" />
            <div className="restaurant-contact-left-content">
              <h2 className="restaurant-contact-left-title">
                Optimizează dinamica echipei tale pentru o performanță mai bună.
              </h2>
              <p className="restaurant-contact-left-description">
                RSistems este o platformă puternică de tip POS și de gestionare a restaurantelor, care utilizează analiza datelor pentru a ajuta afacerile să devină mai eficiente și mai performante.
              </p>
            </div>
          </div>
          <div className="restaurant-contact-right">
            <h3 className="restaurant-contact-form-title">Află mai multe</h3>
            <form className="restaurant-contact-form">
              <div className="restaurant-contact-form-group">
                <label htmlFor="phone">Telefon de serviciu</label>
                <input type="tel" id="phone" placeholder="" />
              </div>
              <div className="restaurant-contact-form-row">
                <div className="restaurant-contact-form-group">
                  <label htmlFor="firstname">Nume</label>
                  <input type="text" id="firstname" placeholder="" />
                </div>
                <div className="restaurant-contact-form-group">
                  <label htmlFor="lastname">Prenume</label>
                  <input type="text" id="lastname" placeholder="" />
                </div>
              </div>
              <div className="restaurant-contact-form-group">
                <label htmlFor="email">Adresă de e-mail de serviciu</label>
                <input type="email" id="email" placeholder="" />
              </div>
              <button type="submit" className="restaurant-contact-form-submit">
                Trimite
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="restaurant-blog-section">
        <div className="restaurant-blog-container">
          <h2 className="restaurant-blog-title">Blog</h2>
          <div className="restaurant-blog-cards">
            <div className="restaurant-blog-card">
              <img src="/img/blog1.svg" alt="Blog 1" className="restaurant-blog-card-image" />
              <div className="restaurant-blog-card-content">
                <h3 className="restaurant-blog-card-title">Cum funcționează RSystems – partea 10: call center</h3>
                <p className="restaurant-blog-card-description">A zecea ediție din seria „Cum funcționează RSystems" a apărut, abordând comentele externe...</p>
                <p className="restaurant-blog-card-date">20 februarie 2026</p>
              </div>
            </div>
            <div className="restaurant-blog-card">
              <img src="/img/blog2.svg" alt="Blog 2" className="restaurant-blog-card-image" />
              <div className="restaurant-blog-card-content">
                <h3 className="restaurant-blog-card-title">Cum să-ți pregătești restaurantul pentru 2026</h3>
                <p className="restaurant-blog-card-description">Un sector al restaurantelor aflat în criză. Trebuie pentru afaceri să crească vânzările...</p>
                <p className="restaurant-blog-card-date">20 ianuarie 2026</p>
              </div>
            </div>
            <div className="restaurant-blog-card">
              <img src="/img/blog3.svg" alt="Blog 3" className="restaurant-blog-card-image" />
              <div className="restaurant-blog-card-content">
                <h3 className="restaurant-blog-card-title">Lansare de noi funcționalități RSistems – Iarna 2025/2026</h3>
                <p className="restaurant-blog-card-description">Clienții vă vorbesc, iar noi am ascultat. Iată actualizarea curentă funcționalității mature...</p>
                <p className="restaurant-blog-card-date">02 aprilie 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default RestaurantPage
