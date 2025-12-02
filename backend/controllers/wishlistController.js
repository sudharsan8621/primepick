// const Wishlist = require('../models/Wishlist');

// // @desc    Get user wishlist
// // @route   GET /api/wishlist
// // @access  Private
// const getWishlist = async (req, res) => {
//   try {
//     let wishlist = await Wishlist.findOne({ user: req.user._id })
//       .populate('products', 'title image price rating category');
    
//     if (!wishlist) {
//       wishlist = await Wishlist.create({ user: req.user._id, products: [] });
//     }
    
//     res.json(wishlist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Add product to wishlist
// // @route   POST /api/wishlist/add
// // @access  Private
// const addToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;
    
//     let wishlist = await Wishlist.findOne({ user: req.user._id });
    
//     if (!wishlist) {
//       wishlist = new Wishlist({ user: req.user._id, products: [] });
//     }
    
//     // Check if product already in wishlist
//     if (wishlist.products.includes(productId)) {
//       return res.status(400).json({ message: 'Product already in wishlist' });
//     }
    
//     wishlist.products.push(productId);
//     await wishlist.save();
    
//     wishlist = await Wishlist.findById(wishlist._id)
//       .populate('products', 'title image price rating category');
    
//     res.json(wishlist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Remove product from wishlist
// // @route   DELETE /api/wishlist/remove/:productId
// // @access  Private
// const removeFromWishlist = async (req, res) => {
//   try {
//     const { productId } = req.params;
    
//     let wishlist = await Wishlist.findOne({ user: req.user._id });
    
//     if (!wishlist) {
//       return res.status(404).json({ message: 'Wishlist not found' });
//     }
    
//     wishlist.products = wishlist.products.filter(
//       id => id.toString() !== productId
//     );
    
//     await wishlist.save();
    
//     wishlist = await Wishlist.findById(wishlist._id)
//       .populate('products', 'title image price rating category');
    
//     res.json(wishlist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = {
//   getWishlist,
//   addToWishlist,
//   removeFromWishlist
// };




























const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products', 'title image price rating category stock');
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }
    
    // Check if product already in wishlist
    const isAlreadyInWishlist = wishlist.products.some(
      id => id.toString() === productId
    );

    if (isAlreadyInWishlist) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    wishlist.products.push(productId);
    await wishlist.save();
    
    wishlist = await Wishlist.findById(wishlist._id)
      .populate('products', 'title image price rating category stock');
    
    res.json(wishlist);
  } catch (error) {
    console.error('Add to Wishlist Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.products = wishlist.products.filter(
      id => id.toString() !== productId
    );
    
    await wishlist.save();
    
    wishlist = await Wishlist.findById(wishlist._id)
      .populate('products', 'title image price rating category stock');
    
    res.json(wishlist);
  } catch (error) {
    console.error('Remove from Wishlist Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};