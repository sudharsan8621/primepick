const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const products = [
  {
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    numReviews: 128,
    category: 'Electronics',
    image: 'headphones.jpg',
    images: ['headphones.jpg', 'headphones-2.jpg'],
    stock: 50,
    brand: 'SoundMax'
  },
  {
    title: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with health monitoring, GPS tracking, and 7-day battery life. Water-resistant and compatible with Android & iOS.',
    price: 4999,
    originalPrice: 7999,
    rating: 4.3,
    numReviews: 89,
    category: 'Electronics',
    image: 'smartwatch.jpg',
    images: ['smartwatch.jpg', 'smartwatch-2.jpg'],
    stock: 35,
    brand: 'TechFit'
  },
  {
    title: 'Men\'s Cotton Casual Shirt',
    description: 'Premium quality 100% cotton casual shirt. Comfortable fit, breathable fabric, perfect for everyday wear.',
    price: 899,
    originalPrice: 1499,
    rating: 4.2,
    numReviews: 256,
    category: 'Clothing',
    image: 'shirt.jpg',
    images: ['shirt.jpg', 'shirt-2.jpg'],
    stock: 100,
    brand: 'StyleCraft'
  },
  {
    title: 'Women\'s Running Shoes',
    description: 'Lightweight and comfortable running shoes with cushioned sole and breathable mesh upper. Ideal for jogging and gym workouts.',
    price: 1999,
    originalPrice: 2999,
    rating: 4.6,
    numReviews: 312,
    category: 'Sports',
    image: 'running-shoes.jpg',
    images: ['running-shoes.jpg', 'running-shoes-2.jpg'],
    stock: 75,
    brand: 'SpeedRun'
  },
  {
    title: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    price: 599,
    originalPrice: 899,
    rating: 4.4,
    numReviews: 178,
    category: 'Home & Kitchen',
    image: 'water-bottle.jpg',
    images: ['water-bottle.jpg'],
    stock: 200,
    brand: 'HydroLife'
  },
  {
    title: 'Programming in JavaScript',
    description: 'Comprehensive guide to modern JavaScript programming. Covers ES6+, async programming, and best practices for web development.',
    price: 449,
    originalPrice: 699,
    rating: 4.7,
    numReviews: 89,
    category: 'Books',
    image: 'js-book.jpg',
    images: ['js-book.jpg'],
    stock: 60,
    brand: 'TechBooks'
  },
  {
    title: 'Organic Face Serum',
    description: 'Natural vitamin C face serum with hyaluronic acid. Brightens skin, reduces dark spots, and provides deep hydration.',
    price: 799,
    originalPrice: 1299,
    rating: 4.5,
    numReviews: 234,
    category: 'Beauty',
    image: 'face-serum.jpg',
    images: ['face-serum.jpg', 'face-serum-2.jpg'],
    stock: 80,
    brand: 'NaturGlow'
  },
  {
    title: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting, 16000 DPI sensor, and programmable buttons. Ultra-low latency wireless connection.',
    price: 1499,
    originalPrice: 2499,
    rating: 4.6,
    numReviews: 167,
    category: 'Electronics',
    image: 'gaming-mouse.jpg',
    images: ['gaming-mouse.jpg', 'gaming-mouse-2.jpg'],
    stock: 45,
    brand: 'GamePro'
  },
  {
    title: 'Yoga Mat Premium',
    description: 'Extra thick 6mm yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises. Includes carrying strap.',
    price: 699,
    originalPrice: 999,
    rating: 4.3,
    numReviews: 145,
    category: 'Sports',
    image: 'yoga-mat.jpg',
    images: ['yoga-mat.jpg'],
    stock: 90,
    brand: 'ZenFit'
  },
  {
    title: 'Non-Stick Cookware Set',
    description: '5-piece non-stick cookware set including frying pan, saucepan, and kadai. PFOA-free coating, works on all stovetops.',
    price: 2499,
    originalPrice: 3999,
    rating: 4.4,
    numReviews: 198,
    category: 'Home & Kitchen',
    image: 'cookware.jpg',
    images: ['cookware.jpg', 'cookware-2.jpg'],
    stock: 40,
    brand: 'ChefMaster'
  },
  {
    title: 'Women\'s Ethnic Kurti',
    description: 'Beautiful hand-printed cotton kurti with traditional design. Perfect for casual and festive occasions.',
    price: 699,
    originalPrice: 1199,
    rating: 4.5,
    numReviews: 289,
    category: 'Clothing',
    image: 'kurti.jpg',
    images: ['kurti.jpg', 'kurti-2.jpg'],
    stock: 120,
    brand: 'EthnicWear'
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360° sound, 12-hour battery life, and built-in microphone for calls.',
    price: 1299,
    originalPrice: 1999,
    rating: 4.4,
    numReviews: 156,
    category: 'Electronics',
    image: 'speaker.jpg',
    images: ['speaker.jpg', 'speaker-2.jpg'],
    stock: 55,
    brand: 'SoundWave'
  },
  {
    title: 'The Art of Cooking',
    description: 'Master the art of Indian cooking with this comprehensive cookbook featuring 200+ traditional recipes.',
    price: 549,
    originalPrice: 799,
    rating: 4.6,
    numReviews: 112,
    category: 'Books',
    image: 'cookbook.jpg',
    images: ['cookbook.jpg'],
    stock: 45,
    brand: 'CulinaryPress'
  },
  {
    title: 'Moisturizing Body Lotion',
    description: 'Luxurious body lotion with shea butter and vitamin E. Provides 48-hour moisture and soft, smooth skin.',
    price: 399,
    originalPrice: 599,
    rating: 4.3,
    numReviews: 267,
    category: 'Beauty',
    image: 'body-lotion.jpg',
    images: ['body-lotion.jpg'],
    stock: 150,
    brand: 'SkinCare Plus'
  },
  {
    title: 'Dumbbell Set 10kg',
    description: 'Adjustable dumbbell set with 10kg total weight. Neoprene coated for comfortable grip. Perfect for home workouts.',
    price: 1299,
    originalPrice: 1799,
    rating: 4.5,
    numReviews: 134,
    category: 'Sports',
    image: 'dumbbells.jpg',
    images: ['dumbbells.jpg'],
    stock: 60,
    brand: 'FitGear'
  },
  {
    title: 'Men\'s Denim Jeans',
    description: 'Classic fit denim jeans with stretch comfort. Durable construction and timeless style for everyday wear.',
    price: 1299,
    originalPrice: 1999,
    rating: 4.2,
    numReviews: 345,
    category: 'Clothing',
    image: 'jeans.jpg',
    images: ['jeans.jpg', 'jeans-2.jpg'],
    stock: 85,
    brand: 'DenimCo'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();