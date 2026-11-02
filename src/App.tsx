/**
 * Dhand Stationery - College Cloud Computing Project
 * 
 * Architecture:
 * - Pure Frontend Single Page Application (SPA)
 * - Zero backend / server database dependency
 * - LocalStorage client-side persistence for Cart, Auth, and Orders
 * - Optimized for static cloud deployment on Netlify, Vercel, or AWS S3 CDN
 * 
 * Key Pages (Max 4 Pages as requested):
 * 1. Home Page (Storefront banner, featured categories, bestsellers)
 * 2. Shop Page (Product catalog, search, category filters, price sorting)
 * 3. Cart & Checkout Page (Cart item controls, coupons, delivery details, invoice)
 * 4. Auth Page (Frontend Login/Register & Order History)
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { AuthPage } from './pages/AuthPage';
import { ProductModal } from './components/ProductModal';
import { ProjectGuideModal } from './components/ProjectGuideModal';
import { ToastContainer } from './components/Toast';

const MainContent: React.FC = () => {
  const { currentPage } = useShop();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'auth' && <AuthPage />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E293B]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Views (4 pages total) */}
        <MainContent />

        {/* Global Modals & Feedback Overlays */}
        <ProductModal />
        <ProjectGuideModal />
        <ToastContainer />

        {/* Local Store Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
}
