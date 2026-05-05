import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Demo from './components/Demo.tsx'
import RestaurantPage from './components/RestaurantPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/cafenea"         element={<RestaurantPage />} />
        <Route path="/bar"             element={<RestaurantPage />} />
        <Route path="/fast-food"       element={<RestaurantPage />} />
        <Route path="/livrare"         element={<RestaurantPage />} />
        <Route path="/restaurant"      element={<RestaurantPage />} />
        <Route path="/sala-evenimente" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
