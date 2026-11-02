import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export const ShopPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useShop();
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All Products' || product.category === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(query)));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'rating-desc') return b.rating - a.rating;
        return 0; // Default
      });
  }, [products, selectedCategory, searchQuery, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setSortOption('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          All Products & Stationery Supplies
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore school essentials, notebooks, bags, pens, and toys with instant local delivery.
        </p>
      </div>

      {/* Search & Sort Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notebooks, pens, bags, toys, or brands..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer shadow-2xs"
          >
            <option value="default">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Category Filter Tabs (Segmented functional buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators & Product Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div>
          Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-slate-900 tabular-nums">{products.length}</span> items
          {selectedCategory !== 'All Products' && (
            <span className="ml-2 text-slate-700">
              in <span className="font-medium text-amber-700">"{selectedCategory}"</span>
            </span>
          )}
          {searchQuery && (
            <span className="ml-2 text-slate-700">
              matching <span className="font-medium text-amber-700">"{searchQuery}"</span>
            </span>
          )}
        </div>

        {(selectedCategory !== 'All Products' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any products matching your search criteria. Try checking for spelling or resetting your filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
