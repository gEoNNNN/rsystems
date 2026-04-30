import RestaurantPage from './RestaurantPage'

function Catering() {
  const stats = [
    { value: '+75%', label: 'evenimente gestionate' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Catering & Evenimente"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 9.svg"
      category="catering"
    />
  )
}

export default Catering
