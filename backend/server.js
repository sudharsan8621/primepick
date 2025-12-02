// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// // CORS Configuration
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://primepick.vercel.app',
//     'https://primepick-six.vercel.app/'  // Add your Vercel URL later
//   ],
//   credentials: true
// }));

// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/wishlist', require('./routes/wishlistRoutes'));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ message: 'PrimePick API is running!' });
// });

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is healthy' });
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });














// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load env variables
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // CORS Configuration
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:3000',
//     'https://primepick-six.vercel.app'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Parse JSON
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/wishlist', require('./routes/wishlistRoutes'));

// // Health check
// app.get('/', (req, res) => {
//   res.json({ message: 'PrimePick API is running!', status: 'ok' });
// });

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is healthy' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     message: 'Something went wrong!', 
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined 
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




































const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'PrimePick API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ===== SEED DATABASE ROUTE - 50 PRODUCTS =====
app.get('/api/seed', async (req, res) => {
  try {
    const Product = require('./models/Product');
    
    const products = [
      // ===== ELECTRONICS (12 Products) =====
      {
        title: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
        price: 2999,
        originalPrice: 4999,
        rating: 4.5,
        numReviews: 128,
        category: 'Electronics',
        image: 'headphones.jpg',
        stock: 50,
        brand: 'SoundMax'
      },
      {
        title: 'Smart Watch Pro',
        description: 'Feature-rich smartwatch with health monitoring, GPS tracking, and 7-day battery life. Water-resistant and stylish.',
        price: 4999,
        originalPrice: 7999,
        rating: 4.3,
        numReviews: 89,
        category: 'Electronics',
        image: 'smartwatch.jpg',
        stock: 35,
        brand: 'TechFit'
      },
      {
        title: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with RGB lighting, 16000 DPI sensor, and programmable buttons.',
        price: 1499,
        originalPrice: 2499,
        rating: 4.6,
        numReviews: 167,
        category: 'Electronics',
        image: 'gaming-mouse.jpg',
        stock: 45,
        brand: 'GamePro'
      },
      {
        title: 'Portable Bluetooth Speaker',
        description: 'Waterproof portable speaker with 360 degree sound, 12-hour battery life and built-in mic.',
        price: 1299,
        originalPrice: 1999,
        rating: 4.4,
        numReviews: 156,
        category: 'Electronics',
        image: 'speaker.jpg',
        stock: 55,
        brand: 'SoundWave'
      },
      {
        title: 'Wireless Earbuds Pro',
        description: 'True wireless earbuds with active noise cancellation, 24-hour battery with charging case.',
        price: 3499,
        originalPrice: 4999,
        rating: 4.5,
        numReviews: 234,
        category: 'Electronics',
        image: 'earbuds.jpg',
        stock: 80,
        brand: 'SoundMax'
      },
      {
        title: 'Adjustable Laptop Stand',
        description: 'Ergonomic aluminum laptop stand with adjustable height. Fits all laptops up to 17 inch.',
        price: 1299,
        originalPrice: 1799,
        rating: 4.3,
        numReviews: 98,
        category: 'Electronics',
        image: 'laptop-stand.jpg',
        stock: 60,
        brand: 'TechDesk'
      },
      {
        title: 'Power Bank 20000mAh',
        description: 'High capacity power bank with fast charging. Charges 3 devices simultaneously.',
        price: 1499,
        originalPrice: 2299,
        rating: 4.4,
        numReviews: 312,
        category: 'Electronics',
        image: 'power-bank.jpg',
        stock: 100,
        brand: 'PowerMax'
      },
      {
        title: 'Mechanical Gaming Keyboard',
        description: 'RGB mechanical keyboard with blue switches, programmable keys, and wrist rest included.',
        price: 2999,
        originalPrice: 3999,
        rating: 4.6,
        numReviews: 189,
        category: 'Electronics',
        image: 'keyboard.jpg',
        stock: 40,
        brand: 'GamePro'
      },
      {
        title: 'USB-C Hub Adapter',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging support.',
        price: 1999,
        originalPrice: 2999,
        rating: 4.4,
        numReviews: 145,
        category: 'Electronics',
        image: 'headphones.jpg',
        stock: 70,
        brand: 'TechDesk'
      },
      {
        title: 'Webcam HD 1080p',
        description: 'Full HD webcam with auto-focus, built-in microphone, and privacy cover.',
        price: 2499,
        originalPrice: 3499,
        rating: 4.3,
        numReviews: 178,
        category: 'Electronics',
        image: 'smartwatch.jpg',
        stock: 55,
        brand: 'TechVision'
      },
      {
        title: 'Tablet Stand Holder',
        description: 'Adjustable tablet stand for desk with 360 degree rotation. Compatible with all tablets.',
        price: 799,
        originalPrice: 1299,
        rating: 4.2,
        numReviews: 89,
        category: 'Electronics',
        image: 'laptop-stand.jpg',
        stock: 90,
        brand: 'TechDesk'
      },
      {
        title: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design.',
        price: 999,
        originalPrice: 1499,
        rating: 4.4,
        numReviews: 267,
        category: 'Electronics',
        image: 'power-bank.jpg',
        stock: 120,
        brand: 'PowerMax'
      },

      // ===== CLOTHING (12 Products) =====
      {
        title: 'Mens Cotton Casual Shirt',
        description: 'Premium quality 100% cotton casual shirt. Comfortable fit, breathable fabric for everyday wear.',
        price: 899,
        originalPrice: 1499,
        rating: 4.2,
        numReviews: 256,
        category: 'Clothing',
        image: 'shirt.jpg',
        stock: 100,
        brand: 'StyleCraft'
      },
      {
        title: 'Womens Ethnic Kurti',
        description: 'Beautiful hand-printed cotton kurti with traditional design. Perfect for festivals and casual wear.',
        price: 699,
        originalPrice: 1199,
        rating: 4.5,
        numReviews: 289,
        category: 'Clothing',
        image: 'kurti.jpg',
        stock: 120,
        brand: 'EthnicWear'
      },
      {
        title: 'Mens Denim Jeans',
        description: 'Classic fit denim jeans with stretch comfort. Durable construction for everyday use.',
        price: 1299,
        originalPrice: 1999,
        rating: 4.2,
        numReviews: 345,
        category: 'Clothing',
        image: 'jeans.jpg',
        stock: 85,
        brand: 'DenimCo'
      },
      {
        title: 'Womens Summer Dress',
        description: 'Flowy summer dress with floral print. Perfect for beach outings and casual events.',
        price: 1199,
        originalPrice: 1799,
        rating: 4.4,
        numReviews: 178,
        category: 'Clothing',
        image: 'dress.jpg',
        stock: 70,
        brand: 'StyleCraft'
      },
      {
        title: 'Mens Polo T-Shirt',
        description: 'Classic polo t-shirt in premium cotton. Available in multiple colors.',
        price: 599,
        originalPrice: 999,
        rating: 4.3,
        numReviews: 423,
        category: 'Clothing',
        image: 'polo.jpg',
        stock: 150,
        brand: 'UrbanStyle'
      },
      {
        title: 'Womens Leather Jacket',
        description: 'Genuine leather jacket with stylish design. Perfect for winter fashion.',
        price: 3999,
        originalPrice: 5999,
        rating: 4.6,
        numReviews: 134,
        category: 'Clothing',
        image: 'leather-jacket.jpg',
        stock: 30,
        brand: 'LeatherLux'
      },
      {
        title: 'Mens Formal Blazer',
        description: 'Slim fit formal blazer for office and special occasions. Premium fabric quality.',
        price: 2999,
        originalPrice: 4499,
        rating: 4.4,
        numReviews: 167,
        category: 'Clothing',
        image: 'blazer.jpg',
        stock: 45,
        brand: 'FormalX'
      },
      {
        title: 'Unisex Hoodie',
        description: 'Comfortable cotton blend hoodie with kangaroo pocket. Perfect for casual wear.',
        price: 999,
        originalPrice: 1499,
        rating: 4.5,
        numReviews: 567,
        category: 'Clothing',
        image: 'hoodie.jpg',
        stock: 200,
        brand: 'UrbanStyle'
      },
      {
        title: 'Mens Chino Pants',
        description: 'Slim fit chino pants in stretchable cotton. Perfect for smart casual look.',
        price: 1099,
        originalPrice: 1699,
        rating: 4.3,
        numReviews: 234,
        category: 'Clothing',
        image: 'jeans.jpg',
        stock: 90,
        brand: 'StyleCraft'
      },
      {
        title: 'Womens Palazzo Pants',
        description: 'Comfortable wide-leg palazzo pants. Breathable fabric perfect for summer.',
        price: 799,
        originalPrice: 1299,
        rating: 4.4,
        numReviews: 189,
        category: 'Clothing',
        image: 'kurti.jpg',
        stock: 110,
        brand: 'EthnicWear'
      },
      {
        title: 'Mens Printed T-Shirt',
        description: 'Trendy printed t-shirt with unique graphics. 100% cotton, comfortable fit.',
        price: 499,
        originalPrice: 799,
        rating: 4.2,
        numReviews: 345,
        category: 'Clothing',
        image: 'polo.jpg',
        stock: 180,
        brand: 'UrbanStyle'
      },
      {
        title: 'Womens Cardigan Sweater',
        description: 'Soft knit cardigan sweater for layering. Perfect for autumn and winter.',
        price: 1299,
        originalPrice: 1899,
        rating: 4.5,
        numReviews: 156,
        category: 'Clothing',
        image: 'hoodie.jpg',
        stock: 65,
        brand: 'WinterWear'
      },

      // ===== HOME & KITCHEN (8 Products) =====
      {
        title: 'Stainless Steel Water Bottle',
        description: 'Double-wall insulated water bottle. Keeps drinks cold 24 hours or hot 12 hours.',
        price: 599,
        originalPrice: 899,
        rating: 4.4,
        numReviews: 178,
        category: 'Home & Kitchen',
        image: 'water-bottle.jpg',
        stock: 200,
        brand: 'HydroLife'
      },
      {
        title: 'Non-Stick Cookware Set',
        description: '5-piece non-stick cookware set. PFOA-free coating, works on all stovetops.',
        price: 2499,
        originalPrice: 3999,
        rating: 4.4,
        numReviews: 198,
        category: 'Home & Kitchen',
        image: 'cookware.jpg',
        stock: 40,
        brand: 'ChefMaster'
      },
      {
        title: 'Coffee Maker Machine',
        description: 'Automatic drip coffee maker with programmable timer. Makes up to 12 cups.',
        price: 2999,
        originalPrice: 4499,
        rating: 4.3,
        numReviews: 145,
        category: 'Home & Kitchen',
        image: 'coffee-maker.jpg',
        stock: 35,
        brand: 'BrewMaster'
      },
      {
        title: 'Digital Air Fryer',
        description: 'Healthy cooking with 95% less oil. 4.5L capacity with digital touch controls.',
        price: 3999,
        originalPrice: 5999,
        rating: 4.6,
        numReviews: 267,
        category: 'Home & Kitchen',
        image: 'air-fryer.jpg',
        stock: 50,
        brand: 'KitchenPro'
      },
      {
        title: 'Cotton Bedsheet Set',
        description: 'Premium 300 thread count cotton bedsheet set. Includes 1 bedsheet and 2 pillow covers.',
        price: 1299,
        originalPrice: 1999,
        rating: 4.5,
        numReviews: 312,
        category: 'Home & Kitchen',
        image: 'bedsheet.jpg',
        stock: 80,
        brand: 'HomeComfort'
      },
      {
        title: 'LED Table Lamp',
        description: 'Modern LED table lamp with touch dimmer. USB charging port included.',
        price: 899,
        originalPrice: 1299,
        rating: 4.2,
        numReviews: 156,
        category: 'Home & Kitchen',
        image: 'table-lamp.jpg',
        stock: 70,
        brand: 'BrightLife'
      },
      {
        title: 'Electric Kettle 1.5L',
        description: 'Fast boiling electric kettle with auto shut-off. Stainless steel body.',
        price: 799,
        originalPrice: 1199,
        rating: 4.4,
        numReviews: 234,
        category: 'Home & Kitchen',
        image: 'water-bottle.jpg',
        stock: 100,
        brand: 'KitchenPro'
      },
      {
        title: 'Mixing Bowl Set',
        description: 'Set of 5 stainless steel mixing bowls with lids. Stackable and space-saving.',
        price: 699,
        originalPrice: 999,
        rating: 4.3,
        numReviews: 178,
        category: 'Home & Kitchen',
        image: 'cookware.jpg',
        stock: 90,
        brand: 'ChefMaster'
      },

      // ===== SPORTS & FITNESS (8 Products) =====
      {
        title: 'Womens Running Shoes',
        description: 'Lightweight running shoes with cushioned sole and breathable mesh. Perfect for jogging.',
        price: 1999,
        originalPrice: 2999,
        rating: 4.6,
        numReviews: 312,
        category: 'Sports',
        image: 'running-shoes.jpg',
        stock: 75,
        brand: 'SpeedRun'
      },
      {
        title: 'Yoga Mat Premium',
        description: 'Extra thick 6mm yoga mat with non-slip surface. Includes carrying strap.',
        price: 699,
        originalPrice: 999,
        rating: 4.3,
        numReviews: 145,
        category: 'Sports',
        image: 'yoga-mat.jpg',
        stock: 90,
        brand: 'ZenFit'
      },
      {
        title: 'Dumbbell Set 10kg',
        description: 'Adjustable dumbbell set with 10kg total weight. Neoprene coated for comfortable grip.',
        price: 1299,
        originalPrice: 1799,
        rating: 4.5,
        numReviews: 134,
        category: 'Sports',
        image: 'dumbbells.jpg',
        stock: 60,
        brand: 'FitGear'
      },
      {
        title: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands with different strengths. Perfect for home workouts.',
        price: 499,
        originalPrice: 799,
        rating: 4.4,
        numReviews: 234,
        category: 'Sports',
        image: 'resistance-bands.jpg',
        stock: 150,
        brand: 'FitGear'
      },
      {
        title: 'Sports Gym Bag',
        description: 'Spacious gym bag with shoe compartment and water bottle pocket. Durable material.',
        price: 799,
        originalPrice: 1199,
        rating: 4.3,
        numReviews: 189,
        category: 'Sports',
        image: 'gym-bag.jpg',
        stock: 80,
        brand: 'SportsPro'
      },
      {
        title: 'Speed Skipping Rope',
        description: 'Adjustable speed rope with ball bearings. Great for cardio and CrossFit training.',
        price: 299,
        originalPrice: 499,
        rating: 4.2,
        numReviews: 267,
        category: 'Sports',
        image: 'skipping-rope.jpg',
        stock: 200,
        brand: 'FitGear'
      },
      {
        title: 'Mens Sports Shoes',
        description: 'Versatile sports shoes for gym and outdoor activities. Excellent cushioning.',
        price: 2499,
        originalPrice: 3499,
        rating: 4.5,
        numReviews: 278,
        category: 'Sports',
        image: 'running-shoes.jpg',
        stock: 65,
        brand: 'SpeedRun'
      },
      {
        title: 'Foam Roller',
        description: 'High-density foam roller for muscle recovery and massage. 45cm length.',
        price: 599,
        originalPrice: 899,
        rating: 4.4,
        numReviews: 156,
        category: 'Sports',
        image: 'yoga-mat.jpg',
        stock: 100,
        brand: 'ZenFit'
      },

      // ===== BOOKS (5 Products) =====
      {
        title: 'Programming in JavaScript',
        description: 'Comprehensive guide to modern JavaScript. Covers ES6+, async programming, and best practices.',
        price: 449,
        originalPrice: 699,
        rating: 4.7,
        numReviews: 89,
        category: 'Books',
        image: 'js-book.jpg',
        stock: 60,
        brand: 'TechBooks'
      },
      {
        title: 'The Art of Cooking',
        description: 'Master Indian cooking with 200+ traditional recipes and cooking techniques.',
        price: 549,
        originalPrice: 799,
        rating: 4.6,
        numReviews: 112,
        category: 'Books',
        image: 'cookbook.jpg',
        stock: 45,
        brand: 'CulinaryPress'
      },
      {
        title: 'Atomic Habits',
        description: 'Best-selling self-help book on building good habits and breaking bad ones.',
        price: 399,
        originalPrice: 599,
        rating: 4.8,
        numReviews: 534,
        category: 'Books',
        image: 'self-help-book.jpg',
        stock: 100,
        brand: 'MindPress'
      },
      {
        title: 'Python for Beginners',
        description: 'Learn Python programming from scratch. Includes practical projects and exercises.',
        price: 499,
        originalPrice: 749,
        rating: 4.6,
        numReviews: 234,
        category: 'Books',
        image: 'js-book.jpg',
        stock: 70,
        brand: 'TechBooks'
      },
      {
        title: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness. A must-read for everyone.',
        price: 349,
        originalPrice: 499,
        rating: 4.7,
        numReviews: 456,
        category: 'Books',
        image: 'self-help-book.jpg',
        stock: 85,
        brand: 'MindPress'
      },

      // ===== BEAUTY (5 Products) =====
      {
        title: 'Organic Face Serum',
        description: 'Natural vitamin C face serum with hyaluronic acid. Brightens and hydrates skin.',
        price: 799,
        originalPrice: 1299,
        rating: 4.5,
        numReviews: 234,
        category: 'Beauty',
        image: 'face-serum.jpg',
        stock: 80,
        brand: 'NaturGlow'
      },
      {
        title: 'Moisturizing Body Lotion',
        description: 'Luxurious body lotion with shea butter and vitamin E. 48-hour moisture.',
        price: 399,
        originalPrice: 599,
        rating: 4.3,
        numReviews: 267,
        category: 'Beauty',
        image: 'body-lotion.jpg',
        stock: 150,
        brand: 'SkinCare Plus'
      },
      {
        title: 'Perfume Gift Set',
        description: 'Premium perfume gift set with 3 long-lasting fragrances. Perfect for gifting.',
        price: 1999,
        originalPrice: 2999,
        rating: 4.4,
        numReviews: 145,
        category: 'Beauty',
        image: 'perfume.jpg',
        stock: 40,
        brand: 'FragranceLux'
      },
      {
        title: 'Hair Care Combo',
        description: 'Shampoo and conditioner combo for silky smooth hair. Sulfate-free formula.',
        price: 599,
        originalPrice: 899,
        rating: 4.4,
        numReviews: 312,
        category: 'Beauty',
        image: 'body-lotion.jpg',
        stock: 120,
        brand: 'HairCare Pro'
      },
      {
        title: 'Sunscreen SPF 50',
        description: 'Broad spectrum sunscreen with SPF 50. Water-resistant and non-greasy.',
        price: 449,
        originalPrice: 699,
        rating: 4.5,
        numReviews: 278,
        category: 'Beauty',
        image: 'face-serum.jpg',
        stock: 100,
        brand: 'SkinCare Plus'
      }
    ];

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new products
    await Product.insertMany(products);
    console.log('50 Products seeded successfully');
    
    res.json({ 
      success: true, 
      message: 'Database seeded successfully!', 
      count: products.length 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Seeding failed', 
      error: error.message 
    });
  }
});
// ===== END SEED ROUTE =====

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});