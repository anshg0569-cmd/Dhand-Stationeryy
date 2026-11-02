import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, LogIn, UserPlus, LogOut, Package, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { user, login, register, logout, orders, setCurrentPage } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Quick Demo fill buttons for project viva
  const fillDemoStudent = () => {
    setEmail('aarav.sharma@college.edu');
    setPassword('student123');
    setName('Aarav Sharma');
    setPhone('9876543210');
  };

  const fillDemoTeacher = () => {
    setEmail('dr.meenakshi@school.ac.in');
    setPassword('teacher123');
    setName('Dr. Meenakshi Sundaram');
    setPhone('9811223344');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email, name);
    } else {
      register(name, email, phone);
    }
  };

  // If user is already logged in, show User Profile & Past Orders
  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* User Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white font-bold text-2xl flex items-center justify-center font-display shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-display">{user.name}</h1>
                <span className="text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded capitalize">
                  {user.role || 'Student Member'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
              {user.phone && <p className="text-xs text-slate-400 mt-0.5">+91 {user.phone}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Shop More
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Local Orders History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              Your Order History ({orders.length})
            </h2>
            <span className="text-xs text-slate-400">Saved in browser localStorage</span>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs">
                    <div>
                      <span className="font-semibold text-slate-900 mr-2">Order ID: {order.id}</span>
                      <span className="text-slate-400">· {order.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {order.status}
                      </span>
                      <span className="font-bold text-slate-900 text-sm tabular-nums">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="text-xs text-slate-600 space-y-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="tabular-nums font-medium text-slate-800">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Payment: {order.paymentMethod}</span>
                    <span>Address: {order.deliveryAddress}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No Past Orders Found</p>
              <p className="text-xs text-slate-400">
                You haven't placed any orders yet. Add items to your cart and experience our simulated checkout!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not logged in: Show Login / Register form
  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* College Project Helper Notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950">
        <div className="flex items-center justify-between mb-1.5 font-semibold">
          <span>College Evaluation Quick-Fill:</span>
          <span className="text-[10px] text-amber-800">1-Click Test</span>
        </div>
        <p className="text-[11px] text-amber-900/80 mb-2">
          This is a frontend-only authentication demo with persistent localStorage state.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fillDemoStudent}
            className="flex-1 py-1.5 px-2 bg-amber-200/70 hover:bg-amber-200 rounded text-[11px] font-medium text-amber-900 transition-colors cursor-pointer"
          >
            Demo Student
          </button>
          <button
            type="button"
            onClick={fillDemoTeacher}
            className="flex-1 py-1.5 px-2 bg-amber-200/70 hover:bg-amber-200 rounded text-[11px] font-medium text-amber-900 transition-colors cursor-pointer"
          >
            Demo Teacher
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Toggle Login / Register Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            {mode === 'login' ? 'Welcome to Dhand Stationery' : 'Register for Student Perks'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login'
              ? 'Access saved cart items, track orders, and get student discounts.'
              : 'Sign up to unlock special school semester discounts and instant checkout.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@college.edu"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-medium text-slate-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Demo project mode: You can enter any password!')}
                  className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Student Account</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            {mode === 'login' ? "Don't have an account? " : 'Already registered? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="font-semibold text-amber-700 hover:underline cursor-pointer"
            >
              {mode === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
