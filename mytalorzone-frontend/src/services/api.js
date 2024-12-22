import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Mock data
const mockProducts = [
  {
    id: 1,
    name: 'Elegant Summer Dress',
    price: 2499,
    description: 'A beautiful and comfortable summer dress perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
    category: 'western'
  },
  {
    id: 2,
    name: 'Traditional Anarkali Suit',
    price: 3999,
    description: 'Stunning traditional Anarkali suit with intricate embroidery.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974',
    category: 'traditional'
  },
  {
    id: 3,
    name: 'Trendy Fusion Wear',
    price: 2999,
    description: 'Modern fusion wear combining traditional and western elements.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974',
    category: 'trendy'
  }
];

// Mock user for development
const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com'
};

export const auth = {
  signup: async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: { ...mockUser, ...userData } } };
  },
  login: async (credentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: mockUser } };
  },
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { success: true } };
  },
  checkAuth: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: mockUser } };
  }
};

export const cart = {
  addToCart: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { success: true } };
  },
  getCart: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { items: [] } };
  },
  updateQuantity: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { success: true } };
  },
  removeFromCart: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { success: true } };
  }
};

export const products = {
  getAllProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: mockProducts };
  },
  getProductById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const product = mockProducts.find(p => p.id === parseInt(id));
    return { data: product };
  },
  getProductsByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const filteredProducts = category === 'all' 
      ? mockProducts 
      : mockProducts.filter(p => p.category === category);
    return { data: filteredProducts };
  }
};

export default api;
