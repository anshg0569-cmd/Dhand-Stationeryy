import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Check, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useShop();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleCardClick = () => {
    // Open product view modal so anyone can inspect the item in detail
    setSelectedProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering card click modal
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer"
      title={`Click to view details for ${product.name}`}
    >
      {/* Product Image Slot with Zoom Effect on Cursor Over */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md tracking-wide shadow-xs">
            {discountPercent}% OFF
          </div>
        )}

        {/* Cursor Hover "View Details" Overlay */}
        <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white/95 rounded-full shadow-lg backdrop-blur-xs group-hover:translate-y-0 translate-y-1 transition-transform">
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Click to View Details</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="truncate font-medium">{product.category}</span>
            <div className="flex items-center gap-1 text-slate-700 font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-[15px] font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          {/* Short description preview */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Direct Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
