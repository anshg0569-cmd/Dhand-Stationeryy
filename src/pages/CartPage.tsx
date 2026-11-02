import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COUPONS } from '../data/products';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, MapPin, Phone, User as UserIcon, Check } from 'lucide-react';
import { Order } from '../types';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    createOrder,
    setCurrentPage,
    user,
    addToast,
  } = useShop();

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Checkout Form State
  const [customerName, setCustomerName] = useState(user ? user.name : '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [city, setCity] = useState('New Delhi');
  const [pinCode, setPinCode] = useState('110009');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI on Delivery' | 'Pay at Store Counter'>('Cash on Delivery');

  // Completed Order Modal
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculation Math
  const tax = Math.round(cartSubtotal * 0.05); // 5% GST on stationery
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, cartSubtotal + tax + deliveryFee - discountAmount);

  // Apply Coupon Handler
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) return;

    const coupon = COUPONS[code];
    if (!coupon) {
      addToast('Invalid coupon code. Try STUDENT10 or DHAND50', 'error');
      return;
    }

    if (cartSubtotal < coupon.minOrder) {
      addToast(`Minimum cart total of ₹${coupon.minOrder} required for code ${code}`, 'error');
      return;
    }

    const calculatedDiscount = Math.round((cartSubtotal * coupon.discountPercent) / 100);
    setAppliedCoupon(code);
    setDiscountAmount(calculatedDiscount);
    setCouponInput('');
    addToast(`Coupon "${code}" applied! You saved ₹${calculatedDiscount}`, 'success');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    addToast('Coupon removed', 'info');
  };

  // Form Validation & Place Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.name = 'Full name is required';
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!deliveryAddress.trim()) {
      errors.address = 'Delivery address is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast('Please complete all delivery details', 'error');
      return;
    }

    setFormErrors({});
    const fullAddress = `${deliveryAddress.trim()}, ${city.trim()} - ${pinCode.trim()}`;

    const order = createOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: fullAddress,
      paymentMethod,
      discountAmount,
    });

    setCompletedOrder(order);
  };

  // If cart is empty and no order completed
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You don't have any stationery items in your basket. Check out our latest notebooks, school bags, pens, and toys!
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all cursor-pointer shadow-sm"
        >
          <span>Explore Stationery Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Shopping Cart & Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your order items, apply student coupons, and provide local delivery details.
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Order Items ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-slate-200/80 rounded-xl p-4 flex gap-4 items-center justify-between hover:border-slate-300 transition-colors shadow-2xs"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/public/') && item.product.image.startsWith('/assets/')) {
                        target.src = '/public' + item.product.image;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[11px] text-slate-400 block truncate">
                    {item.product.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 tabular-nums">
                      each
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Form */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mt-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-amber-600" />
              Delivery & Contact Details
            </h2>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Customer Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Phone / Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Delivery Address / Hostel / House No. <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Flat / Room No, Street Name, Landmark"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                {formErrors.address && (
                  <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.address}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">City / Town</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Pin Code</label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="pt-2">
                <label className="block font-medium text-slate-700 mb-2">
                  Select Payment Option:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Cash on Delivery', label: 'Cash on Delivery (COD)' },
                    { id: 'UPI on Delivery', label: 'UPI / QR on Delivery' },
                    { id: 'Pay at Store Counter', label: 'Pick & Pay at Shop' },
                  ].map((mode) => (
                    <label
                      key={mode.id}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === mode.id
                          ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === mode.id}
                        onChange={() => setPaymentMethod(mode.id as any)}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-xs">{mode.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-4 sticky top-24">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Order Summary
            </h2>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-slate-600 pb-4 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>GST (5% Tax)</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ₹{tax.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Local Neighborhood Delivery</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {deliveryFee > 0 && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-md">
                  Add ₹{(499 - cartSubtotal).toLocaleString('en-IN')} more to qualify for FREE Delivery!
                </p>
              )}

              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-800 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon Discount ({appliedCoupon})
                  </span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-1 text-slate-900">
              <span className="text-sm font-semibold">Total Payable</span>
              <div className="text-right">
                <span className="text-2xl font-bold font-display text-slate-950 tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-slate-400">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Have a Student Coupon?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Code <strong>{appliedCoupon}</strong> Applied
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-emerald-700 hover:text-emerald-900 underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. STUDENT10"
                    className="flex-1 uppercase font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Quick Coupon Chips */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyCoupon('STUDENT10')}
                  className="text-[11px] font-mono bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  STUDENT10 (10% off)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyCoupon('DHAND50')}
                  className="text-[11px] font-mono bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  DHAND50 (15% off)
                </button>
              </div>
            </div>

            {/* Primary Place Order Button */}
            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Guaranteed by Dhand Stationery Local Store
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => {
          setCompletedOrder(null);
          setCurrentPage('home');
        }}
      />
    </div>
  );
};
