import RestaurantPage from './RestaurantPage'

function Casual() {
  const stats = [
    { value: '+42%', label: 'satisfacție clienți' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Restaurant Casual"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 6.svg"
      category="casual"
    />
  )
}

export default Casual
