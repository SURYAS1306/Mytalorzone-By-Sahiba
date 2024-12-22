const mongoose = require('mongoose');
const Product = require('../models/product');
require('dotenv').config();

const products = [
  {
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print summer dress perfect for casual outings. Made with breathable cotton fabric.',
    price: 2499,
    category: 'western',
    imageUrl: '/images/product1.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Traditional Embroidered Suit',
    description: 'Elegant traditional suit with intricate embroidery work. Perfect for festivals and special occasions.',
    price: 3999,
    category: 'traditional',
    imageUrl: '/images/product2.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Designer Party Gown',
    description: 'Stunning designer gown with modern silhouette. Ideal for parties and evening events.',
    price: 4999,
    category: 'trendy',
    imageUrl: '/images/product3.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    name: 'Casual Denim Dress',
    description: 'Stylish denim dress for a casual yet chic look. Features comfortable stretch fabric.',
    price: 1999,
    category: 'western',
    imageUrl: '/images/product4.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Embroidered Lehenga Set',
    description: 'Beautiful traditional lehenga set with heavy embroidery work. Perfect for weddings and festivities.',
    price: 8999,
    category: 'traditional',
    imageUrl: '/images/product5.jpg',
    sizes: ['S', 'M', 'L'],
    inStock: true
  },
  {
    name: 'Crop Top & Skirt Set',
    description: 'Trendy crop top and skirt set in contemporary design. Great for parties and social gatherings.',
    price: 3499,
    category: 'trendy',
    imageUrl: '/images/product6.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    name: 'Printed Palazzo Set',
    description: 'Comfortable and stylish palazzo set with beautiful prints. Perfect for both casual and semi-formal occasions.',
    price: 2799,
    category: 'traditional',
    imageUrl: '/images/product7.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    name: 'Designer Evening Dress',
    description: 'Elegant evening dress with modern design elements. Perfect for special occasions.',
    price: 5999,
    category: 'trendy',
    imageUrl: '/images/product8.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Added ${result.length} products to the database`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
