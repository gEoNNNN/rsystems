import RestaurantPage from './RestaurantPage'

function Bar() {
  const stats = [
    { value: '+65%', label: 'viteză servire băuturi' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Bar & Pub"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 4.svg"
      category="bar"
    />
  )
}

export default Bar
