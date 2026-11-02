import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, User as UserIcon, BookOpen, Menu, X, Cloud } from 'lucide-react';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, cartCount, user, setIsProjectGuideOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Products', page: 'shop' },
    { label: 'Shopping Cart', page: 'cart' },
    { label: user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In', page: 'auth' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Contact & Project Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <span className="text-amber-400 font-semibold">Dhand Stationery:</span>
          <a href="tel:983212349" className="text-slate-200 hover:text-white transition-colors">
            📞 983212349
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a href="mailto:shivamdhand@gmail.com" className="text-slate-200 hover:text-white transition-colors hidden sm:inline">
            ✉️ shivamdhand@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={() => setIsProjectGuideOpen(true)}
            className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            <Cloud className="w-3 h-3" />
            <span>Netlify Deployment Guide</span>
          </button>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-amber-600 transition-colors">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 font-display block whitespace-nowrap">
                  Dhand Stationery
                </span>
                <span className="text-[11px] text-slate-500 block -mt-1 font-medium">
                  School & College Essentials
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Cart CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('cart')}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-slate-900 bg-amber-400 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setIsProjectGuideOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2"
            >
              <Cloud className="w-3.5 h-3.5 text-amber-500" />
              <span>Cloud Computing Project Info & Netlify Deployment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
