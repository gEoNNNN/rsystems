import RestaurantPage from './RestaurantPage'

function FoodTruck() {
  const stats = [
    { value: '+70%', label: 'comenzi procesate' }
  ]

  return (
    <RestaurantPage 
      preTitle="Sistem POS"
      midTitle="Conceput pentru"
      mainTitle="Food Truck"
      description="Conținut în lucru..."
      stats={stats}
      backgroundImage="/img/tip 8.svg"
      category="foodtruck"
    />
  )
}

export default FoodTruck
