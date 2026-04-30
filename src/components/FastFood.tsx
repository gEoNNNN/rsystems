import RestaurantPage from './RestaurantPage'

function FastFood() {
  const stats = [
    { value: '+45%', label: 'viteză servire' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Fast Food"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 2.svg"
      category="fastfood"
    />
  )
}

export default FastFood
