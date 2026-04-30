import RestaurantPage from './RestaurantPage'

function Finedining() {
  const stats = [
    { value: '+80%', label: 'experiență client' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Fine Dining"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 5.svg"
      category="finedining"
    />
  )
}

export default Finedining
