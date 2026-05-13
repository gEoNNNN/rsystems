import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import ChatBot from './components/ChatBot.tsx'

const Demo               = lazy(() => import('./components/Demo.tsx'))
const RestaurantPage     = lazy(() => import('./components/RestaurantPage.tsx'))
const FrontOfHousePage   = lazy(() => import('./components/FrontOfHousePage.tsx'))
const IntegrationsPage   = lazy(() => import('./components/IntegrationsPage.tsx'))
const PricingPage        = lazy(() => import('./components/PricingPage.tsx'))
const BlogPage           = lazy(() => import('./components/BlogPage.tsx'))
const BlogArticlePage    = lazy(() => import('./components/BlogArticlePage.tsx'))
const AboutPage          = lazy(() => import('./components/AboutPage.tsx'))
const ProductCategoryPage = lazy(() => import('./components/ProductCategoryPage.tsx'))
const ProductDetailPage  = lazy(() => import('./components/ProductDetailPage.tsx'))
const TermsPage          = lazy(() => import('./components/TermsPage.tsx'))
const PrivacyPage        = lazy(() => import('./components/PrivacyPage.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
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
      </Suspense>
      <ChatBot />
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
