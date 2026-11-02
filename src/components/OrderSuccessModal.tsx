import React from 'react';
import { Order } from '../types';
import { CheckCircle2, Printer, ArrowRight, Package, MapPin, Phone } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 transition-all p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Order Placed Successfully!
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Thank you for shopping at Dhand Stationery. Your order has been recorded.
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="font-semibold text-slate-900">Order Reference:</span>
            <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {order.id}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Order Date:</span>
            <span className="font-medium text-slate-900">{order.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Customer:</span>
            <span className="font-medium text-slate-900">{order.customerName}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              Delivery Address:
            </span>
            <span className="font-medium text-slate-900 text-right max-w-[200px] truncate">
              {order.deliveryAddress}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              Contact Phone:
            </span>
            <span className="font-medium text-slate-900">{order.customerPhone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Payment Mode:</span>
            <span className="font-medium text-slate-900">{order.paymentMethod}</span>
          </div>

          {/* Items Breakdown */}
          <div className="pt-2 border-t border-slate-200">
            <span className="font-semibold text-slate-800 block mb-1">Purchased Items:</span>
            <ul className="space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between text-slate-600">
                  <span className="truncate max-w-[240px]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="tabular-nums font-medium text-slate-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
            <span>Final Paid / Payable:</span>
            <span className="text-amber-800 text-base tabular-nums">
              ₹{order.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Local Shop Pickup Reminder */}
        <div className="mt-4 p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Package className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              Present this Order ID at Dhand Stationery counter for instant pickup, or await our local delivery within 2-4 hours.
            </p>
            <p className="text-[11px] text-amber-950 font-medium">
              Need assistance? Call/WhatsApp: <a href="tel:983212349" className="underline font-bold">983212349</a> or Email: <a href="mailto:shivamdhand@gmail.com" className="underline font-bold">shivamdhand@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Bill / Receipt
          </button>

          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
