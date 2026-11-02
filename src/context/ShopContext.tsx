import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, PageView } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // User / Auth
  user: User | null;
  login: (email: string, name?: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, phone?: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderDetails: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: string;
    discountAmount: number;
  }) => Order;

  // Toasts / Feedback
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Project Info Modal (for college evaluation)
  isProjectGuideOpen: boolean;
  setIsProjectGuideOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dhand_stationery_cart_v1';
const USER_STORAGE_KEY = 'dhand_stationery_user_v1';
const ORDERS_STORAGE_KEY = 'dhand_stationery_orders_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Filtering
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProjectGuideOpen, setIsProjectGuideOpen] = useState<boolean>(false);

  // Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Auth with localStorage persistence
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Unable to persist cart to localStorage', err);
    }
  }, [cart]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Unable to persist user to localStorage', err);
    }
  }, [user]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.warn('Unable to persist orders to localStorage', err);
    }
  }, [orders]);

  // Toast dispatch
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart handlers
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.name.split(' ').slice(0, 3).join(' ')}..." to cart!`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Authentication Handlers (Frontend / localStorage based)
  const login = (email: string, name?: string): boolean => {
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address', 'error');
      return false;
    }
    const cleanName = name || email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: formattedName,
      email: email.trim().toLowerCase(),
      role: 'student',
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone?: string): boolean => {
    if (!name.trim()) {
      addToast('Please enter your full name', 'error');
      return false;
    }
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return false;
    }
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      role: 'student',
    };
    setUser(newUser);
    addToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('You have been signed out successfully.', 'info');
  };

  // Order Placement
  const createOrder = ({
    customerName,
    customerPhone,
    deliveryAddress,
    paymentMethod,
    discountAmount,
  }: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: string;
    discountAmount: number;
  }): Order => {
    const subtotal = cartSubtotal;
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const deliveryFee = subtotal > 499 ? 0 : 40;
    const total = Math.max(0, subtotal + tax + deliveryFee - discountAmount);

    const newOrder: Order = {
      id: `DS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      discount: discountAmount,
      tax,
      deliveryFee,
      total,
      customerName,
      customerPhone,
      deliveryAddress,
      paymentMethod,
      status: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products: PRODUCTS,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        user,
        login,
        logout,
        register,
        orders,
        createOrder,
        toasts,
        addToast,
        removeToast,
        isProjectGuideOpen,
        setIsProjectGuideOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
