import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../redux/slices/orderSlice';
import { fetchWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Loader from '../../components/Loader/Loader';
import Rating from '../../components/Rating/Rating';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { products: wishlist, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const [activeTab, setActiveTab] = useState('orders');
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCartFromWishlist = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'status-processing';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        {showSuccessMessage && (
          <div className="success-message">
            ✅ Order placed successfully! Thank you for your purchase.
          </div>
        )}

        <div className="profile-header">
          <div className="profile-avatar">
            👤
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🧾 My Orders ({orders.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            ❤️ Wishlist ({wishlist.length})
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'orders' && (
            <div className="orders-section">
              {ordersLoading ? (
                <Loader />
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">🧾</span>
                  <h3>No orders yet</h3>
                  <p>When you place orders, they will appear here.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/products')}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card">
                      <div 
                        className="order-header"
                        onClick={() => toggleOrderExpand(order._id)}
                      >
                        <div className="order-info">
                          <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                          <span className="order-date">{formatDate(order.orderedAt)}</span>
                        </div>
                        <div className="order-meta">
                          <span className={`order-status ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                          <span className="order-total">
                            ₹{order.totalAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="expand-icon">
                            {expandedOrders[order._id] ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {expandedOrders[order._id] && (
                        <div className="order-details">
                          <div className="order-items">
                            {order.items.map((item, index) => (
                              <div key={index} className="order-detail-item">
                                <img
                                  src={`/src/assets/images/products/${item.image}`}
                                  alt={item.title}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/50x50?text=Product';
                                  }}
                                />
                                <div className="item-info">
                                  <h4>{item.title}</h4>
                                  <p>Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                                </div>
                                <span className="item-total">
                                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="shipping-details">
                            <h4>📍 Shipping Address</h4>
                            <p>
                              {order.shippingAddress.fullName}<br />
                              {order.shippingAddress.address}<br />
                              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                              Phone: {order.shippingAddress.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              {wishlistLoading ? (
                <Loader />
              ) : wishlist.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">❤️</span>
                  <h3>Your wishlist is empty</h3>
                  <p>Save items you love by clicking the heart icon.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/products')}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map((product) => (
                    <div key={product._id} className="wishlist-card">
                      <img
                        src={`/src/assets/images/products/${product.image}`}
                        alt={product.title}
                        onClick={() => navigate(`/products/${product._id}`)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                        }}
                      />
                      <div className="wishlist-card-info">
                        <span className="wishlist-category">{product.category}</span>
                        <h4 onClick={() => navigate(`/products/${product._id}`)}>
                          {product.title}
                        </h4>
                        <Rating value={product.rating} />
                        <p className="wishlist-price">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <div className="wishlist-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddToCartFromWishlist(product._id)}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleRemoveFromWishlist(product._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;