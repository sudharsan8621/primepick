// const Cart = require('../models/Cart');
// const Product = require('../models/Product');

// // @desc    Get user cart
// // @route   GET /api/cart
// // @access  Private
// const getCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user._id })
//       .populate('items.product', 'title image price stock');
    
//     if (!cart) {
//       cart = await Cart.create({ user: req.user._id, items: [] });
//     }
    
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Add item to cart
// // @route   POST /api/cart/add
// // @access  Private
// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
    
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
    
//     if (product.stock < quantity) {
//       return res.status(400).json({ message: 'Insufficient stock' });
//     }
    
//     let cart = await Cart.findOne({ user: req.user._id });
    
//     if (!cart) {
//       cart = new Cart({ user: req.user._id, items: [] });
//     }
    
//     const existingItemIndex = cart.items.findIndex(
//       item => item.product.toString() === productId
//     );
    
//     if (existingItemIndex > -1) {
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       cart.items.push({
//         product: productId,
//         quantity,
//         price: product.price
//       });
//     }
    
//     await cart.save();
    
//     cart = await Cart.findById(cart._id)
//       .populate('items.product', 'title image price stock');
    
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Update cart item quantity
// // @route   PUT /api/cart/update
// // @access  Private
// const updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
    
//     if (quantity < 1) {
//       return res.status(400).json({ message: 'Quantity must be at least 1' });
//     }
    
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
    
//     if (product.stock < quantity) {
//       return res.status(400).json({ message: 'Insufficient stock' });
//     }
    
//     let cart = await Cart.findOne({ user: req.user._id });
    
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
    
//     const itemIndex = cart.items.findIndex(
//       item => item.product.toString() === productId
//     );
    
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: 'Item not in cart' });
//     }
    
//     cart.items[itemIndex].quantity = quantity;
//     await cart.save();
    
//     cart = await Cart.findById(cart._id)
//       .populate('items.product', 'title image price stock');
    
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Remove item from cart
// // @route   DELETE /api/cart/remove/:productId
// // @access  Private
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;
    
//     let cart = await Cart.findOne({ user: req.user._id });
    
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
    
//     cart.items = cart.items.filter(
//       item => item.product.toString() !== productId
//     );
    
//     await cart.save();
    
//     cart = await Cart.findById(cart._id)
//       .populate('items.product', 'title image price stock');
    
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @desc    Clear cart
// // @route   DELETE /api/cart/clear
// // @access  Private
// const clearCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user._id });
    
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
    
//     cart.items = [];
//     await cart.save();
    
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = {
//   getCart,
//   addToCart,
//   updateCartItem,
//   removeFromCart,
//   clearCart
// };



















const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'title image price stock');
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    // Calculate total
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    // Populate and return
    cart = await Cart.findById(cart._id)
      .populate('items.product', 'title image price stock');
    
    res.json(cart);
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not in cart' });
    }
    
    cart.items[itemIndex].quantity = quantity;
    
    // Calculate total
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    cart = await Cart.findById(cart._id)
      .populate('items.product', 'title image price stock');
    
    res.json(cart);
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    // Calculate total
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    cart = await Cart.findById(cart._id)
      .populate('items.product', 'title image price stock');
    
    res.json(cart);
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
    } else {
      cart.items = [];
      cart.totalAmount = 0;
    }
    
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};