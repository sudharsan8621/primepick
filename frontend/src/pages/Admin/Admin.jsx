import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
  createProduct,
  updateProduct,
  deleteProduct,
  clearSuccess
} from '../../redux/slices/adminSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import Loader from '../../components/Loader/Loader';
import './Admin.css';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { stats, orders, loading, error, success } = useSelector((state) => state.admin);
  const { products } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    image: 'headphones.jpg',
    stock: '',
    brand: ''
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      return;
    }
    
    dispatch(fetchDashboardStats());
    dispatch(fetchAllOrders());
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (success) {
      setShowProductModal(false);
      setEditingProduct(null);
      resetProductForm();
      dispatch(clearSuccess());
      dispatch(fetchProducts({ limit: 100 }));
      dispatch(fetchDashboardStats());
    }
  }, [success, dispatch]);

  const resetProductForm = () => {
    setProductForm({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Electronics',
      image: 'headphones.jpg',
      stock: '',
      brand: ''
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice) || Number(productForm.price),
      stock: Number(productForm.stock)
    };

    if (editingProduct) {
      dispatch(updateProduct({ productId: editingProduct._id, productData: data }));
    } else {
      dispatch(createProduct(data));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      image: product.image,
      stock: product.stock,
      brand: product.brand
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  if (loading && !stats) {
    return <Loader size="large" />;
  }

  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Beauty'];
  const imageOptions = [
    'headphones.jpg', 'smartwatch.jpg', 'gaming-mouse.jpg', 'speaker.jpg',
    'shirt.jpg', 'kurti.jpg', 'jeans.jpg', 'dress.jpg',
    'water-bottle.jpg', 'cookware.jpg', 'yoga-mat.jpg', 'dumbbells.jpg',
    'js-book.jpg', 'face-serum.jpg', 'perfume.jpg'
  ];

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>🛠️ Admin Dashboard</h1>
          <p>Welcome, {user?.username}!</p>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products ({products?.length || 0})
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🧾 Orders ({orders?.length || 0})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📦</span>
                <div className="stat-info">
                  <h3>{stats.totalProducts}</h3>
                  <p>Total Products</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🧾</span>
                <div className="stat-info">
                  <h3>{stats.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card revenue">
                <span className="stat-icon">💰</span>
                <div className="stat-info">
                  <h3>₹{stats.totalRevenue?.toLocaleString('en-IN')}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section-card">
                <h3>📋 Recent Orders</h3>
                {stats.recentOrders?.length > 0 ? (
                  <ul className="recent-list">
                    {stats.recentOrders.map((order) => (
                      <li key={order._id}>
                        <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
                        <span className="order-user">{order.user?.username}</span>
                        <span className="order-amount">₹{order.totalAmount}</span>
                        <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                          {order.orderStatus}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-data">No recent orders</p>
                )}
              </div>

              <div className="section-card">
                <h3>⚠️ Low Stock Products</h3>
                {stats.lowStockProducts?.length > 0 ? (
                  <ul className="recent-list">
                    {stats.lowStockProducts.map((product) => (
                      <li key={product._id}>
                        <span className="product-name">{product.title}</span>
                        <span className={`stock-count ${product.stock < 5 ? 'critical' : 'warning'}`}>
                          {product.stock} left
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-data">All products are well stocked!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="products-content">
            <div className="content-header">
              <h2>📦 Manage Products</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  resetProductForm();
                  setEditingProduct(null);
                  setShowProductModal(true);
                }}
              >
                + Add Product
              </button>
            </div>

            <div className="products-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="product-thumb">📦</div>
                      </td>
                      <td className="product-title-cell">{product.title}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>
                        <span className={`stock-badge ${product.stock < 10 ? 'low' : 'ok'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditProduct(product)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-content">
            <h2>🧾 Manage Orders</h2>

            <div className="orders-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">#{order._id.slice(-6).toUpperCase()}</td>
                      <td>{order.user?.username || 'N/A'}</td>
                      <td>{formatDate(order.orderedAt)}</td>
                      <td>₹{order.totalAmount?.toLocaleString('en-IN')}</td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                          className={`status-select ${order.orderStatus.toLowerCase()}`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProduct ? '✏️ Edit Product' : '➕ Add Product'}</h2>
                <button className="modal-close" onClick={() => setShowProductModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="product-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    required
                    className="form-input"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Original Price (₹)</label>
                    <input
                      type="number"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="form-input"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Image</label>
                    <select
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="form-input"
                    >
                      {imageOptions.map((img) => (
                        <option key={img} value={img}>{img}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock *</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowProductModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Admin;