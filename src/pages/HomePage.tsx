import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  STORE_HERO_IMAGE,
  BACKPACK_IMAGE,
  VINTAGE_NOTEBOOKS_IMAGE,
  DOMS_INXIFY_PENS_IMAGE,
  DOMS_BRUSH_PENS_IMAGE,
  S10_GAMEPAD_IMAGE,
  FINGER_COUNTER_IMAGE,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, BookOpen, PenTool, Backpack, Palette, Smile, Calculator, ShieldCheck, Clock, BadgePercent, MapPin } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, products } = useShop();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  const handleShopCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      name: 'Notebooks & Registers',
      count: 'Vintage & Spiral Diaries',
      icon: BookOpen,
      image: VINTAGE_NOTEBOOKS_IMAGE,
      tag: 'From ₹130',
    },
    {
      name: 'Pens & Writing',
      count: 'DOMS Inxify, Gel & Ball Pens',
      icon: PenTool,
      image: DOMS_INXIFY_PENS_IMAGE,
      tag: 'From ₹45',
    },
    {
      name: 'Art Supplies',
      count: 'DOMS Brush Pens, 3D Pen, Clay',
      icon: Palette,
      image: DOMS_BRUSH_PENS_IMAGE,
      tag: 'From ₹80',
    },
    {
      name: 'Kids Toys & Keyrings',
      count: 'S10 Console, RC Cars, Toys',
      icon: Smile,
      image: S10_GAMEPAD_IMAGE,
      tag: 'From ₹95',
    },
    {
      name: 'School Bags & Pouches',
      count: 'Backpacks & Organizers',
      icon: Backpack,
      image: BACKPACK_IMAGE,
      tag: 'From ₹220',
    },
    {
      name: 'Desk Essentials',
      count: 'Finger Counters & Tools',
      icon: Calculator,
      image: FINGER_COUNTER_IMAGE,
      tag: 'From ₹60',
    },
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* 1. Hero Campaign Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[480px] lg:min-h-[520px] flex items-center">
          {/* Hero background image with measured scrim */}
          <div className="absolute inset-0">
            <img
              src={STORE_HERO_IMAGE}
              alt="Dhand Stationery store interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Trusted Local Neighborhood Stationery Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight text-white">
              Everything for School, College & Creative Minds.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              From hardbound registers and Parker pens to ergonomic school backpacks, artistic supplies, cute cartoon keyrings, and fun kids' toys — find it all at Dhand Stationery with local student discounts.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleShopCategory('Kids Toys & Keyrings')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20 backdrop-blur-xs cursor-pointer"
              >
                Kids Toys & Keyrings
              </button>
            </div>

            {/* Quick stats / Local Trust Strip */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-300 border-t border-white/10">
              <div>
                <span className="font-bold text-white text-sm block">1,500+</span>
                <span className="text-slate-400">Items in Store</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div>
                <span className="font-bold text-white text-sm block">Same Day</span>
                <span className="text-slate-400">Local Delivery</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div>
                <span className="font-bold text-white text-sm block">10% Off</span>
                <span className="text-slate-400">Student Coupon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Store Trust Highlights (Paced rhythm) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">100% Original Brands</h4>
            <p className="text-xs text-slate-500">
              Authorized retailer for Classmate, Navneet, Reynolds, and Staedtler.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">Instant Counter Pickup</h4>
            <p className="text-xs text-slate-500">
              Place your order online and pick up ready-packed packets in 15 minutes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <BadgePercent className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">Special Student Deals</h4>
            <p className="text-xs text-slate-500">
              Special wholesale bundle discounts on project stationery and registers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">Local Neighborhood Store</h4>
            <p className="text-xs text-slate-500">
              Serving school students, parents, and teachers for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Explore By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
              Department Categories
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Shop by What You Need
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => handleShopCategory(cat.name)}
                className="group relative bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer text-left"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{cat.count}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700 tabular-nums">{cat.tag}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Bestsellers Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
              Top Picks For The Semester
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Trending Store Essentials
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-slate-900 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>See full catalog ({products.length} items)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Special Promotional Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
              College & School Discount Offer
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
              Get Flat 10% Off on Your Semester Stationery
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
              Stock up on project files, exam writing pens, spiral notebooks, and school bags. Apply code at checkout!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="bg-slate-900/40 backdrop-blur-xs border border-white/30 rounded-xl px-4 py-2.5 text-center">
              <span className="text-[10px] text-amber-200 block uppercase font-medium">Coupon Code</span>
              <span className="font-mono text-base font-bold text-white tracking-wider">STUDENT10</span>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Shop & Apply Code
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
