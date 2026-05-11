import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Demo from './components/Demo.tsx'
import RestaurantPage from './components/RestaurantPage.tsx'
import FrontOfHousePage from './components/FrontOfHousePage.tsx'
import IntegrationsPage from './components/IntegrationsPage.tsx'
import PricingPage from './components/PricingPage.tsx'
import BlogPage from './components/BlogPage.tsx'
import BlogArticlePage from './components/BlogArticlePage.tsx'
import AboutPage from './components/AboutPage.tsx'
import ProductCategoryPage from './components/ProductCategoryPage.tsx'
import ProductDetailPage from './components/ProductDetailPage.tsx'
import TermsPage from './components/TermsPage.tsx'
import PrivacyPage from './components/PrivacyPage.tsx'

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
        <Route path="/front-of-house" element={<FrontOfHousePage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/preturi" element={<PricingPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/despre" element={<AboutPage />} />
        <Route path="/produse/:categorySlug/:productSlug" element={<ProductDetailPage />} />
        <Route path="/produse/:slug" element={<ProductCategoryPage />} />
        <Route path="/termeni" element={<TermsPage />} />
        <Route path="/confidentialitate" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
