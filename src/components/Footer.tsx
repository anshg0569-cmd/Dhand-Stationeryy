import React from 'react';
import { useShop } from '../context/ShopContext';
import { BookOpen, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setIsProjectGuideOpen } = useShop();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Store Intro */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-display">
                Dhand Stationery
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted neighborhood store for all school & college essentials, registers, luxury pens, craft supplies, sturdy school bags, and cute keychains.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Shop No. 12, Main Market, Model Town Road</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:983212349" className="hover:text-amber-400 transition-colors">
                  +91 983212349
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:shivamdhand@gmail.com" className="hover:text-amber-400 transition-colors">
                  shivamdhand@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mon – Sun: 9:00 AM – 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  All Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Shopping Bag & Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('auth')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Student Account / Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Key Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {['Notebooks & Registers', 'Pens & Writing', 'School Bags & Pouches', 'Art Supplies', 'Kids Toys & Keyrings'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: College Project Details & Netlify Ready */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              College Cloud Computing Project
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Developed as a static frontend Cloud Computing project demonstration. Built with HTML, CSS, JavaScript/TypeScript, and client-side <code className="text-amber-300">localStorage</code>.
            </p>
            <button
              onClick={() => setIsProjectGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              <span>Netlify Deployment Guide</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dhand Stationery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Local Neighborhood Retail Shop</span>
            <span aria-hidden="true">·</span>
            <span>Netlify Static Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
