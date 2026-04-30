import RestaurantPage from './RestaurantPage'

function Cafenea() {
  const stats = [
    { value: '+50%', label: 'creștere a veniturilor' }
  ]

  const benefits = [
    'Reduceți erorile și asigurați-vă că fiecare client primește exact ceea ce își dorește',
    'Gestionați modificările complexe cu ușurință și încredere',
    'Simplificați procesele de business pentru a obține rezultate mai bune'
  ]

  const faqs = [
    {
      question: 'Ce este un sistem POS pentru cafenele?',
      answer: 'Un sistem POS (Point of Sale) pentru cafenele este o platformă all-in-one care gestionează comenzile, plățile, stocurile și rapoartele în timp real, optimizând eficiența operațională.'
    },
    {
      question: 'Cum îmbunătățește sistemul POS experiența clienților?',
      answer: 'Sistemul reduce timpul de așteptare, elimină erorile în comenzi, permite personalizarea avansată a produselor și oferă multiple opțiuni de plată pentru o experiență mai fluidă.'
    },
    {
      question: 'Este dificil de implementat sistemul?',
      answer: 'Nu, sistemul nostru este ușor de implementat și oferă training complet pentru personalul tău. Echipa noastră te susține pe tot parcursul procesului de tranziție.'
    },
    {
      question: 'Pot gestiona mai multe locații din același sistem?',
      answer: 'Da, sistemul permite gestionarea centralizată a mai multor locații, cu rapoarte consolidate și control în timp real asupra tuturor cafenelelor din lanț.'
    },
    {
      question: 'Ce tipuri de rapoarte pot genera?',
      answer: 'Poți genera rapoarte detaliate despre vânzări, stocuri, performanța angajaților, produsele cele mai vândute și multe altele, toate în timp real.'
    },
    {
      question: 'Sistemul funcționează offline?',
      answer: 'Da, sistemul poate funcționa offline și se sincronizează automat când conexiunea la internet este restabilită, asigurând continuitatea operațiunilor.'
    }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Cafenele"
      description="Sistemul POS all-in-one de la Syrve pentru cafenele îi ajută pe operatori să-și crească eficiența, să încânte clienții și să fie pregătiți pentru viitor."
      stats={stats}
      backgroundImage="/img/tip 1.svg"
      category="cafenea"
      infoTitle="POS pentru cafenele"
      infoDescription="Crește eficiența cafenelei tale și îmbunătățește experiența clienților cu un POS de top pentru cafenele și coffee shop-uri. Indiferent dacă ești o afacere locală mică sau un lanț la nivel național, sistemul nostru POS pentru cafenele oferă o platformă all-in-one pentru gestionarea operațiunilor zilnice."
      benefitsTitle="Operați cu ușurință"
      benefits={benefits}
      faqs={faqs}
      faqImage="/img/tip 1q.svg"
    />
  )
}

export default Cafenea
