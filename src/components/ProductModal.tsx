import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setCurrentPage } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      handleClose();
    }, 700);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    handleClose();
    setCurrentPage('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-slate-100 overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>{selectedProduct.category}</span>
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400">({selectedProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium ml-2">In Stock</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Specs Table */}
              {selectedProduct.specs && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                    Item Specifications
                  </h4>
                  <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key}>
                        <dt className="text-slate-400 font-medium">{key}</dt>
                        <dd className="text-slate-800 font-semibold">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Local store perks */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-slate-500 py-2.5 border-y border-slate-100">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Same-Day Pickup</span>
                </div>
                <div className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Easy Exchange</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Buy Now */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors text-sm font-bold cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors text-sm font-bold cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (₹{(selectedProduct.price * quantity).toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>⚡ Buy Now with Instant Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
