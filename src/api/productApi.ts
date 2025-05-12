import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  status?: 'active' | 'draft' | 'archived';
  sku: string;
  variants?: { live?: boolean; [key: string]: any }[];
}

export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data;
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (product: Omit<Product, '_id'>): Promise<Product> => {
    const response = await axios.post('http://localhost:5000/api/products', product);
    return response.data;
  },

  // Update product
  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`http://localhost:5000/api/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
  }
}; 