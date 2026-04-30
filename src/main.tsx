import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Demo from './components/Demo.tsx'
import FastFood from './components/FastFood.tsx'
import Pizzerie from './components/Pizzerie.tsx'
import Cafenea from './components/Cafenea.tsx'
import Bar from './components/Bar.tsx'
import Finedining from './components/Finedining.tsx'
import Casual from './components/Casual.tsx'
import Bistrou from './components/Bistrou.tsx'
import FoodTruck from './components/FoodTruck.tsx'
import Catering from './components/Catering.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/fastfood" element={<FastFood />} />
        <Route path="/pizzerie" element={<Pizzerie />} />
        <Route path="/cafenea" element={<Cafenea />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/finedining" element={<Finedining />} />
        <Route path="/casual" element={<Casual />} />
        <Route path="/bistrou" element={<Bistrou />} />
        <Route path="/foodtruck" element={<FoodTruck />} />
        <Route path="/catering" element={<Catering />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
