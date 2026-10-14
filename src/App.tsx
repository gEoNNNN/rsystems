import { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SEO from './components/SEO'
import { NomenclatorUI as NomenclatorPreview, BasicIndicatorsUI as BasicIndicatorsPreview, ProfitLossUI as ProfitLossPreview } from './components/PosModal'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const cookieTranslations: Record<string, {
  primary: string
  secondaryBefore: string
  termsLabel: string
  andBetween1: string
  privacyLabel: string
  andBetween2: string
  cookieLabel: string
  secondaryAfter: string
  accept: string
  decline: string
}> = {
  ro: {
    primary: 'Acest site utilizează cookie-uri pentru a îmbunătăți experiența ta de navigare. Folosim aceste informații pentru a personaliza conținutul și pentru analiză.',
    secondaryBefore: 'Prin apăsarea butonului „Acceptă”, confirmi că ai citit și ești de acord cu ',
    termsLabel: 'Termenii și Condițiile',
    andBetween1: ', ',
    privacyLabel: 'Politica de Confidențialitate',
    andBetween2: ' și ',
    cookieLabel: 'Politica de cookieuri',
    secondaryAfter: '. Dacă refuzi, informațiile tale nu vor fi urmărite când vizitezi acest site. Un singur cookie va fi folosit în browser-ul tău pentru a reține preferința ta de a nu fi urmărit.',
    accept: 'Acceptă',
    decline: 'Refuză',
  },
  en: {
    primary: 'This website uses cookies to improve your browsing experience. We use this information to personalize content and for analytics.',
    secondaryBefore: 'By clicking "Accept", you confirm that you have read and agree to our ',
    termsLabel: 'Terms & Conditions',
    andBetween1: ', ',
    privacyLabel: 'Privacy Policy',
    andBetween2: ', and ',
    cookieLabel: 'Cookie Policy',
    secondaryAfter: '. If you decline, your information will not be tracked when visiting this site. A single cookie will be used in your browser to remember your preference not to be tracked.',
    accept: 'Accept',
    decline: 'Decline',
  },
  ru: {
    primary: 'Этот сайт использует файлы cookie для улучшения вашего опыта навигации. Мы используем эту информацию для персонализации контента и аналитики.',
    secondaryBefore: 'Нажимая «Принять», вы подтверждаете, что прочитали и согласны с ',
    termsLabel: 'Условиями использования',
    andBetween1: ', ',
    privacyLabel: 'Политикой конфиденциальности',
    andBetween2: ' и ',
    cookieLabel: 'Политикой использования файлов cookie',
    secondaryAfter: '. Если вы откажетесь, ваша информация не будет отслеживаться при посещении этого сайта. В вашем браузере будет использоваться только один файл cookie для сохранения вашего выбора.',
    accept: 'Принять',
    decline: 'Отклонить',
  },
  de: {
    primary: 'Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern. Wir nutzen diese Informationen zur Personalisierung von Inhalten und zur Analyse.',
    secondaryBefore: 'Mit Klick auf „Akzeptieren“ bestätigen Sie, dass Sie unsere ',
    termsLabel: 'Allgemeinen Geschäftsbedingungen',
    andBetween1: ', die ',
    privacyLabel: 'Datenschutzerklärung',
    andBetween2: ' und die ',
    cookieLabel: 'Cookie-Richtlinie',
    secondaryAfter: ' gelesen haben und akzeptieren. Wenn Sie ablehnen, werden Ihre Daten beim Besuch dieser Website nicht nachverfolgt. Es wird lediglich ein einzelnes Cookie in Ihrem Browser gespeichert, um Ihre Präferenz zu speichern.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  fr: {
    primary: 'Ce site utilise des cookies pour améliorer votre expérience de navigation. Nous utilisons ces informations pour personnaliser le contenu et à des fins d\'analyse.',
    secondaryBefore: 'En cliquant sur « Accepter », vous confirmez avoir lu et accepté nos ',
    termsLabel: 'Conditions générales',
    andBetween1: ', notre ',
    privacyLabel: 'Politique de confidentialité',
    andBetween2: ' et notre ',
    cookieLabel: 'Politique de cookies',
    secondaryAfter: '. Si vous refusez, vos informations ne seront pas suivies lors de votre visite sur ce site. Un seul cookie sera utilisé dans votre navigateur pour mémoriser votre préférence.',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  es: {
    primary: 'Este sitio web utiliza cookies para mejorar su experiencia de navegación. Utilizamos esta información para personalizar el contenido y para análisis.',
    secondaryBefore: 'Al hacer clic en «Aceptar», confirma que ha leído y acepta nuestros ',
    termsLabel: 'Términos y Condiciones',
    andBetween1: ', la ',
    privacyLabel: 'Política de Privacidad',
    andBetween2: ' y la ',
    cookieLabel: 'Política de Cookies',
    secondaryAfter: '. Si rechaza, su información no será rastreada cuando visite este sitio. Se utilizará una única cookie en su navegador para recordar su preferencia.',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  it: {
    primary: 'Questo sito utilizza i cookie per migliorare la tua esperienza di navigazione. Utilizziamo queste informazioni per personalizzare i contenuti e per l\'analisi.',
    secondaryBefore: 'Cliccando su "Accetta", confermi di aver letto e accettato i nostri ',
    termsLabel: 'Termini e Condizioni',
    andBetween1: ', l\'',
    privacyLabel: 'Informativa sulla Privacy',
    andBetween2: ' e la ',
    cookieLabel: 'Politica sui Cookie',
    secondaryAfter: '. Se rifiuti, le tue informazioni non verranno tracciate quando visiti questo sito. Verrà utilizzato un solo cookie nel tuo browser per ricordare la tua preferenza.',
    accept: 'Accetta',
    decline: 'Rifiuta',
  },
  hu: {
    primary: 'Ez a weboldal sütiket (cookie-kat) használ a böngészési élmény javítása érdekében. Ezeket az információkat a tartalom személyre szabására és elemzésre használjuk.',
    secondaryBefore: 'Az „Elfogadom” gombra kattintva megerősíti, hogy elolvasta és elfogadja az ',
    termsLabel: 'Általános Szerződési Feltételeket',
    andBetween1: ', az ',
    privacyLabel: 'Adatvédelmi irányelveket',
    andBetween2: ' és a ',
    cookieLabel: 'Süti szabályzatot',
    secondaryAfter: '. Ha elutasítja, adatait nem követjük nyomon az oldal látogatásakor. Egyetlen süti kerül elhelyezésre a böngészőjében a választása megjegyzéséhez.',
    accept: 'Elfogadom',
    decline: 'Elutasítom',
  },
  uk: {
    primary: 'Цей сайт використовує файли cookie для покращення вашого досвіду навігації. Ми використовуємо цю інформацію для персоналізації контенту та аналітики.',
    secondaryBefore: 'Натискаючи «Прийняти», ви підтверджуєте, що прочитали та погоджуєтеся з ',
    termsLabel: 'Умовами використання',
    andBetween1: ', ',
    privacyLabel: 'Політикою конфіденційності',
    andBetween2: ' та ',
    cookieLabel: 'Політикою щодо файлів cookie',
    secondaryAfter: '. Якщо ви відмовитеся, ваша інформація не відстежуватиметься під час відвідування цього сайту. У вашому браузері буде використано лише один файл cookie для збереження вашого вибору.',
    accept: 'Прийняти',
    decline: 'Відхилити',
  },
  bg: {
    primary: 'Този сайт използва бисквитки, за да подобри вашето сърфиране. Използваме тази информация за персонализиране на съдържанието и за анализ.',
    secondaryBefore: 'С натискането на „Приемам“ потвърждавате, че сте прочели и се съгласявате с нашите ',
    termsLabel: 'Общи условия',
    andBetween1: ', ',
    privacyLabel: 'Политика за поверителност',
    andBetween2: ' и ',
    cookieLabel: 'Политика за бисквитките',
    secondaryAfter: '. Ако откажете, вашата информация няма да бъде проследявана при посещение на този сайт. Само една бисквитка ще бъде използвана във вашия браузър, за да запомни предпочитанието ви.',
    accept: 'Приемам',
    decline: 'Отказвам',
  },
  pl: {
    primary: 'Ta strona używa plików cookie, aby poprawić komfort przeglądania. Wykorzystujemy te informacje do personalizacji treści i analizy.',
    secondaryBefore: 'Klikając „Akceptuję”, potwierdzasz przeczytanie i akceptację ',
    termsLabel: 'Regulaminu',
    andBetween1: ', ',
    privacyLabel: 'Polityki prywatności',
    andBetween2: ' oraz ',
    cookieLabel: 'Polityki plików cookie',
    secondaryAfter: '. Jeśli odrzucisz, Twoje dane nie będą śledzone podczas wizyty na tej stronie. W przeglądarce zostanie zapisany tylko jeden plik cookie, aby zapamiętać Twój wybór.',
    accept: 'Akceptuję',
    decline: 'Odrzuć',
  },
  tr: {
    primary: 'Bu web sitesi gezinme deneyiminizi geliştirmek için çerezleri kullanır. Bu bilgileri içeriği kişiselleştirmek ve analiz için kullanıyoruz.',
    secondaryBefore: '"Kabul Et" düğmesine tıklayarak ',
    termsLabel: 'Şartlar ve Koşulları',
    andBetween1: ', ',
    privacyLabel: 'Gizlilik Politikasını',
    andBetween2: ' ve ',
    cookieLabel: 'Çerez Politikasını',
    secondaryAfter: ' okuduğunuzu ve kabul ettiğinizi onaylarsınız. Reddederseniz, bu siteyi ziyaret ettiğinizde bilgileriniz izlenmeyecektir. Tercihinizi hatırlamak için tarayıcınızda tek bir çerez kullanılacaktır.',
    accept: 'Kabul Et',
    decline: 'Reddet',
  },
  pt: {
    primary: 'Este site utiliza cookies para melhorar a sua experiência de navegação. Usamos essas informações para personalizar o conteúdo e para análise.',
    secondaryBefore: 'Ao clicar em "Aceitar", confirma que leu e concorda com os nossos ',
    termsLabel: 'Termos e Condições',
    andBetween1: ', a ',
    privacyLabel: 'Política de Privacidade',
    andBetween2: ' e a ',
    cookieLabel: 'Política de Cookies',
    secondaryAfter: '. Se recusar, as suas informações não serão rastreadas ao visitar este site. Apenas um único cookie será utilizado no seu navegador para memorizar a sua preferência.',
    accept: 'Aceitar',
    decline: 'Recusar',
  },
  nl: {
    primary: 'Deze website gebruikt cookies om uw surfervaring te verbeteren. We gebruiken deze informatie om inhoud te personaliseren en voor analyse.',
    secondaryBefore: 'Door op "Accepteren" te klikken, bevestigt u dat u onze ',
    termsLabel: 'Algemene Voorwaarden',
    andBetween1: ', het ',
    privacyLabel: 'Privacybeleid',
    andBetween2: ' en het ',
    cookieLabel: 'Cookiebeleid',
    secondaryAfter: ' hebt gelezen en hiermee akkoord gaat. Als u weigert, worden uw gegevens niet gevolgd wanneer u deze site bezoekt. Er wordt slechts één cookie in uw browser gebruikt om uw voorkeur te onthouden.',
    accept: 'Accepteren',
    decline: 'Weigeren',
  },
}

function detectCookieLang(): string {
  if (typeof document === 'undefined') return 'ro'
  const htmlLang = (document.documentElement.lang || 'ro').slice(0, 2).toLowerCase()
  if (htmlLang && cookieTranslations[htmlLang]) {
    return htmlLang
  }
  return 'ro'
}

export function CookieConsent() {
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    const saved = localStorage.getItem('cookieConsent')
    return saved === null
  })
  const [cookieLang, setCookieLang] = useState<string>('ro')

  useEffect(() => {
    setCookieLang(detectCookieLang())
    const observer = new MutationObserver(() => {
      setCookieLang(detectCookieLang())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    })
    return () => observer.disconnect()
  }, [])

  const cookieT = cookieTranslations[cookieLang] || cookieTranslations.ro

  const handleCookieConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined')
    setShowCookieConsent(false)
  }

  if (!showCookieConsent) return null

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent">
        <div className="cookie-content">
          <p className="cookie-text">
            {cookieT.primary}
          </p>
          <p className="cookie-text-secondary">
            {cookieT.secondaryBefore}
            <a href="/termeni">{cookieT.termsLabel}</a>
            {cookieT.andBetween1}
            <a href="/confidentialitate">{cookieT.privacyLabel}</a>
            {cookieT.andBetween2}
            <a href="/politica-cookieuri">{cookieT.cookieLabel}</a>
            {cookieT.secondaryAfter}
          </p>
        </div>
        <div className="cookie-actions">
          <button
            className="cookie-btn cookie-accept"
            onClick={() => handleCookieConsent(true)}
          >
            {cookieT.accept}
          </button>
          <button
            className="cookie-btn cookie-decline"
            onClick={() => handleCookieConsent(false)}
          >
            {cookieT.decline}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [posModal, setPosModal] = useState<'pos' | 'rapoarte' | 'management' | null>('pos')
  const [demoFullscreen, setDemoFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.99
  }, [])

  const getItemWidthPercent = () => {
    if (window.innerWidth <= 700) return 20
    return 12.5
  }
  const [itemWidthPercent, setItemWidthPercent] = useState(getItemWidthPercent)

  useEffect(() => {
    const handleResize = () => setItemWidthPercent(getItemWidthPercent())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const partnerLogos = [
    '/img/logodesktop-1.svg',
    '/img/logodesktop-2.svg',
    '/img/logodesktop-3.svg',
    '/img/logodesktop-4.svg',
    '/img/logodesktop-5.svg',
    '/img/logodesktop-6.svg',
    '/img/logodesktop-7.svg',
    '/img/logodesktop-8.svg',
    '/img/logodesktop-9.svg',
    '/img/logodesktop-10.svg',
    '/img/logodesktop-11.svg',
    '/img/logodesktop-12.svg',
    '/img/logodesktop-13.svg',
    '/img/logodesktop-14.svg',
    '/img/logodesktop-15.svg',
    '/img/logodesktop-16.svg',
    '/img/logodesktop-17.svg',
    '/img/logodesktop-18.svg',
  ]

  // Date pentru graficul de vânzări
  const salesData = [
    { time: '00:00', value: 12500 },
    { time: '06:00', value: 14200 },
    { time: '06:00', value: 15800 },
    { time: '12:00', value: 19500 },
    { time: '18:00', value: 24300 },
    { time: '24:00', value: 28542 },
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

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate], [data-stagger]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RSistems',
    alternateName: 'R Sistems',
    description: 'RSistems oferă sisteme POS profesionale și soluții complete de automatizare pentru restaurante, cafenele, baruri, fast-food și industria HoReCa din România. Gestiune stocuri, comenzi digitale, rapoarte în timp real, KDS, kiosk autoservire și integrare delivery.',
    url: 'https://rsistems.ro',
    telephone: '+40751088772',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'București',
      addressCountry: 'RO',
    },
    sameAs: [
      'https://wa.me/40751088772',
      'https://www.facebook.com/rusivsistems/',
      'https://www.instagram.com/rsistemsro/',
      'https://www.linkedin.com/company/rsistems/',
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    serviceArea: { '@type': 'Country', name: 'Romania' },
    knowsAbout: [
      'Sisteme POS', 'Automatizare restaurante', 'Software gestiune HoReCa',
      'Kitchen Display System', 'Kiosk autoservire', 'Meniu QR',
      'Digital signage', 'Integrare delivery', 'Fiscalizare ANAF',
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ce este un sistem POS pentru restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un sistem POS (Point of Sale) pentru restaurant este un software profesional care gestionează comenzile, plățile, stocurile și operațiunile zilnice. RSistems oferă sisteme POS complete pentru restaurante, cafenele, baruri și fast-food din România, cu funcționalități precum Kitchen Display System (KDS), meniu QR, kiosk autoservire și integrare cu platformele de delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ce înseamnă automatizare restaurant și de ce este importantă?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Automatizarea restaurantului presupune digitalizarea tuturor proceselor operaționale: preluarea comenzilor prin POS sau tabletă, transmiterea automată către bucătărie prin KDS, gestiunea stocurilor în timp real, emiterea bonurilor fiscale și generarea de rapoarte. Automatizarea reduce erorile umane, accelerează servirea, scade pierderile de stoc cu până la 30% și crește profitabilitatea afacerii.',
        },
      },
      {
        '@type': 'Question',
        name: 'Cât costă un sistem POS pentru restaurant în România?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RSistems oferă 3 pachete de preț: Basic la 39€/lună pentru cafenele și restaurante mici, Professional la 59€/lună pentru restaurante medii cu funcționalități avansate, și Enterprise la 99€/lună pentru lanțuri HoReCa cu multiple locații. Toate pachetele includ suport tehnic și actualizări.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ce este un software de gestiune restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un software de gestiune restaurant controlează stocurile, costurile, rețetele, comenzile și fluxul operațional complet. RSistems oferă gestiune integrată cu POS, rapoarte în timp real, management angajați și inventar automat, reducând pierderile și optimizând activitatea zilnică.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funcționează sistemul POS RSistems fără internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da, partea de vânzare (POS) funcționează complet offline. Comenzile, plățile și bonurile fiscale se procesează normal fără conexiune la internet. Rapoartele și managementul centralizat necesită conexiune pentru sincronizare.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ce este un Kitchen Display System (KDS)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kitchen Display System (KDS) este un ecran digital montat în bucătăria restaurantului care afișează comenzile în timp real, organizate pe stații de preparare. Elimină biletele pe hârtie și comunicarea verbală, reducând erorile și timpul de preparare. RSistems oferă KDS integrat cu sistemul POS.',
        },
      },
      {
        '@type': 'Question',
        name: 'Cum pot integra comenzile Glovo, Tazz și Bolt Food?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RSistems permite integrarea completă a platformelor de delivery (Glovo, Tazz, Bolt Food) direct în sistemul POS. Toate comenzile de livrare ajung automat în KDS-ul bucătăriei și sunt gestionate centralizat, eliminând comenzile duplicate și simplificând operarea.',
        },
      },
      {
        '@type': 'Question',
        name: 'RSistems se potrivește pentru cafenea sau bar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da. RSistems oferă soluții personalizate pentru cafenele, baruri și pub-uri, cu funcționalități specifice: servire rapidă, programe de fidelizare, gestiune băuturi și ingrediente, rapoarte per categorie și integrare cu echipamentele existente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Există o demonstrație gratuită a sistemului POS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da, poți rezerva o demonstrație gratuită a sistemului RSistems direct pe site-ul rsistems.ro la pagina /demo, sau contactând echipa la +40751088772 prin telefon sau WhatsApp.',
        },
      },
      {
        '@type': 'Question',
        name: 'În cât timp se implementează sistemul POS în restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Implementarea sistemului RSistems durează între 2 și 4 zile, în funcție de complexitatea afacerii. Include instalare, configurare, transfer de date și training complet pentru personal, fără întreruperea activității restaurantului.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ce echipamente POS sunt necesare pentru un restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pentru un restaurant sunt necesare: terminal POS (PC sau tabletă), imprimantă de bonuri fiscale, și opțional Kitchen Display System (KDS), terminal mobil pentru ospătari, kiosk de autoservire și scanner de coduri de bare. RSistems oferă toate echipamentele necesare cu instalare și configurare incluse.',
        },
      },
    ],
  }

  return (
    <>
      <SEO
        title="RSistems – Sisteme POS și Automatizare Restaurant, Cafenea, Bar, Fast-Food România"
        description="RSistems oferă sisteme POS profesionale și automatizare completă pentru restaurante, cafenele, baruri și fast-food din România. Gestiune stocuri, comenzi digitale, KDS, kiosk, rapoarte în timp real și integrare delivery Glovo, Tazz, Bolt Food. Demo gratuit!"
        canonical="/"
        keywords="sisteme POS, sistem POS restaurant, automatizare restaurant, automatizare HoReCa, software restaurant, software gestiune restaurant, POS cafenea, POS bar, POS fast-food, digitalizare HoReCa, casa de marcat restaurant, gestiune stocuri restaurant, KDS, kitchen display system, kiosk autoservire, meniu QR, integrare delivery, POS Romania, comenzi online restaurant, rapoarte vanzari"
        breadcrumbs={[{ name: 'Acasă', url: '/' }]}
        jsonLd={[localBusinessJsonLd, faqJsonLd]}
      />
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <video
          ref={videoRef}
          className="hero-video-bg"
          src="/img/main.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-video-overlay" />
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="hero-title-dark">Controlează.</span><br />
              <span className="hero-title-dark">Optimizează.</span><br />
              <span className="hero-title-accent">Crește profitul.</span>
            </h1>
            <p className="hero-description">
              Soluția completă pentru afacerea ta în HoReCa. Comenzi, stocuri și rapoarte în timp real, într-o singură platformă.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me/40751088772?text=Bună! Vreau să încep să folosesc RSistems." className="hero-cta-primary" target="_blank" rel="noopener noreferrer">
                Începe acum
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/demo" className="hero-cta-secondary">
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
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section" data-animate>
        <h2 className="partners-title">Parteneri care folosesc RSistem</h2>
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * itemWidthPercent}%)`
            }}
          >
            {/* Double the logos for seamless infinite loop */}
            {[...partnerLogos, ...partnerLogos].map((logo, index) => {
              const realIndex = index % partnerLogos.length
              const isLarge = realIndex >= 9 && realIndex <= 12
              return (
                <div key={index} className={`carousel-item${isLarge ? ' carousel-item-large' : ''}`}>
                  <img src={logo} alt={`Partner ${realIndex + 1}`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" data-animate>
        <div className="features-container" data-stagger>
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

      {/* Challenges vs Solutions + Dashboard Section */}
      <section className="cdash-section" data-animate>
        <div className="cdash-grid">

          {/* Challenges Column */}
          <div className="cdash-col cdash-dark">
            <div className="cdash-content">
              <h2 className="cdash-heading cdash-heading-white">Provocările tale zilnice</h2>
              <ul className="cdash-list">
                <li className="cdash-item"><span className="cdash-icon-x">✕</span><span>Pierderi din stocuri și inventar incorect</span></li>
                <li className="cdash-item"><span className="cdash-icon-x">✕</span><span>Lipsă de control asupra operațiunilor</span></li>
                <li className="cdash-item"><span className="cdash-icon-x">✕</span><span>Decizii luate fără date reale</span></li>
                <li className="cdash-item"><span className="cdash-icon-x">✕</span><span>Timp pierdut cu rapoarte manuale</span></li>
                <li className="cdash-item"><span className="cdash-icon-x">✕</span><span>Erori de comunicare între echipe</span></li>
              </ul>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="cdash-col cdash-light">
            <div className="cdash-content">
              <h2 className="cdash-heading cdash-heading-dark">Soluția RSistems</h2>
              <ul className="cdash-list">
                <li className="cdash-item cdash-item-light"><span className="cdash-icon-check">✓</span><span>Transformă datele în profit, automat.</span></li>
                <li className="cdash-item cdash-item-light"><span className="cdash-icon-check">✓</span><span>Control total asupra afacerii tale</span></li>
                <li className="cdash-item cdash-item-light"><span className="cdash-icon-check">✓</span><span>Rapoarte și analize în timp real</span></li>
                <li className="cdash-item cdash-item-light"><span className="cdash-icon-check">✓</span><span>Reducerea pierderilor și costurilor</span></li>
                <li className="cdash-item cdash-item-light"><span className="cdash-icon-check">✓</span><span>Decizii bazate pe date reale</span></li>
              </ul>
            </div>
          </div>

          {/* Dashboard Column */}
          <div className="cdash-col cdash-white">
            <div className="cdash-chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1FB6B2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1FB6B2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="time" stroke="#666" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#666" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} width={35} />
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                    formatter={(value) => [`${Number(value).toLocaleString()} RON`, 'Vânzări']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#1FB6B2" strokeWidth={2} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="cdash-stats">
              <div className="cdash-stat">
                <div className="cdash-stat-label">Comenzi</div>
                <div className="cdash-stat-value">356</div>
                <div className="cdash-stat-change">↑ 12.5%</div>
              </div>
              <div className="cdash-stat">
                <div className="cdash-stat-label">Clienți</div>
                <div className="cdash-stat-value">248</div>
                <div className="cdash-stat-change">↑ 8.1%</div>
              </div>
              <div className="cdash-stat">
                <div className="cdash-stat-label">Bon mediu</div>
                <div className="cdash-stat-value">81 RON</div>
                <div className="cdash-stat-change">↑ 16.3%</div>
              </div>
            </div>
          </div>

        </div>
      </section>

       {/* All-in-One System Section */}
      <section className="allinone-section" data-animate>
        <h2 className="allinone-title">Tot ce ai nevoie, într-un singur sistem</h2>
        <div className="allinone-container">
          <div className="feature-card" style={{cursor:'pointer'}} onClick={() => setPosModal('pos')}>
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

          <div className="feature-card" style={{cursor:'pointer'}} onClick={() => setPosModal('rapoarte')}>
            <div className="feature-icon">
              <img src="/img/stocuri.svg" alt="Rapoarte" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Rapoarte avansate</h3>
              <p className="feature-description">
                Analiză detaliată despre vânzări, produse, clienți și angajați!
              </p>
            </div>
          </div>

          <div className="feature-card" style={{cursor:'pointer'}} onClick={() => setPosModal('management')}>
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

      {/* Interactive Demo Section */}
      <section className="demo-section" data-animate>
        <h2 className="demo-section-title">Vezi sistemul în acțiune</h2>
        <p className="demo-section-sub">Descoperă cât de ușor este să îți gestionezi afacerea.</p>
        <div className="demo-tabs">
          {([
            { id: 'pos',        label: 'POS inteligent',    icon: '/img/pos.svg' },
            { id: 'rapoarte',   label: 'Rapoarte avansate', icon: '/img/stocuri.svg' },
            { id: 'management',label: 'Management complet', icon: '/img/clienti.svg' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              className={`demo-tab${posModal === tab.id ? ' active' : ''}`}
              onClick={() => setPosModal(tab.id)}
            >
              <img src={tab.icon} alt="" className="demo-tab-icon" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="demo-preview" onClick={() => setDemoFullscreen(true)} title="Click pentru fullscreen">
          <div className="demo-preview-frame">
            {posModal === 'pos'        && <NomenclatorPreview />}
            {posModal === 'rapoarte'   && <BasicIndicatorsPreview />}
            {posModal === 'management' && <ProfitLossPreview />}
          </div>
          <div className="demo-preview-hint">🔍 Click pentru fullscreen</div>
        </div>
      </section>

      {/* Why Choose RSistems Section */}
      <section className="why-choose-section" data-animate>
        <div className="why-choose-container">
          <h2 className="why-choose-title">De ce să alegi RSistems?</h2>
          <div className="why-choose-grid" data-stagger>
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
      <section className="stats-section" data-animate>
        <div className="stats-container" data-stagger>
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
      <section className="cta-section" data-animate>
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Vrei să vezi cât profit pierzi acum?</h2>
            <p className="cta-description">
              Programează o demonstrație gratuită și descoperă cum te putem ajuta.
            </p>
          </div>
          <a href="https://wa.me/40751088772?text=Bună! Vreau să programez un demo gratuit." className="cta-button-large" target="_blank" rel="noopener noreferrer">
            Programează demo gratuit
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" data-animate>
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

      {/* Demo Fullscreen Modal */}
      {demoFullscreen && (
        <div className="demo-fs-overlay" onClick={() => setDemoFullscreen(false)}>
          <button className="demo-fs-close" onClick={() => setDemoFullscreen(false)}>✕</button>
          <div className="demo-fs-window" onClick={e => e.stopPropagation()}>
            {posModal === 'pos'        && <NomenclatorPreview />}
            {posModal === 'rapoarte'   && <BasicIndicatorsPreview />}
            {posModal === 'management' && <ProfitLossPreview />}
          </div>
        </div>
      )}

    </>
  )
}

export default App
