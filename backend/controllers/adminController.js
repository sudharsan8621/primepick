const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// ===== PRODUCT MANAGEMENT =====

// @desc    Create product
// @route   POST /api/admin/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      category,
      image,
      stock,
      brand
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      originalPrice: originalPrice || price,
      category,
      image: image || 'headphones.jpg',
      stock: stock || 10,
      brand: brand || 'Generic',
      rating: 0,
      numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      category,
      image,
      stock,
      brand
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.originalPrice = originalPrice || product.originalPrice;
    product.category = category || product.category;
    product.image = image || product.image;
    product.stock = stock !== undefined ? stock : product.stock;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

// ===== ORDER MANAGEMENT =====

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'username email')
      .populate('items.product', 'title image')
      .sort({ orderedAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get All Orders Error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    const updatedOrder = await order.save();
    
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('user', 'username email')
      .populate('items.product', 'title image');

    res.json(populatedOrder);
  } catch (error) {
    console.error('Update Order Error:', error);
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete Order Error:', error);
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

// ===== USER MANAGEMENT =====

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

// ===== DASHBOARD STATS =====

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const recentOrders = await Order.find({})
      .populate('user', 'username email')
      .sort({ orderedAt: -1 })
      .limit(5);

    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(5);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
      lowStockProducts
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllUsers,
  deleteUser,
  getDashboardStats
};