import RestaurantPage from './RestaurantPage'

function Bistrou() {
  const stats = [
    { value: '+48%', label: 'rotație mese' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Bistrou"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 7.svg"
      category="bistrou"
    />
  )
}

export default Bistrou
