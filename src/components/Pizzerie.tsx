import RestaurantPage from './RestaurantPage'

function Pizzerie() {
  const stats = [
    { value: '+55%', label: 'livrări eficiente' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Pizzerie"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 3.svg"
      category="pizzerie"
    />
  )
}

export default Pizzerie
