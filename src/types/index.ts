/**
 * Dhand Stationery - TypeScript Type Definitions
 * Designed for college Cloud Computing project evaluation
 */

export interface Product {
  id: string;
  name: string;
  category: 'Notebooks & Registers' | 'Pens & Writing' | 'School Bags & Pouches' | 'Art Supplies' | 'Kids Toys & Keyrings' | 'Desk Essentials';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: 'student' | 'teacher' | 'customer';
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

export type PageView = 'home' | 'shop' | 'cart' | 'auth';
