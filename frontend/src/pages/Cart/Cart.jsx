import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../../redux/slices/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import Loader from '../../components/Loader/Loader';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <Loader size="large" />;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">🛒 Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <span>{items.length} item(s) in your cart</span>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  🗑️ Clear Cart
                </button>
              </div>

              <div className="cart-items-list">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span className={totalAmount >= 999 ? 'free' : ''}>
                  {totalAmount >= 999 ? 'FREE' : '₹99'}
                </span>
              </div>
              
              {totalAmount < 999 && (
                <div className="free-shipping-info">
                  Add ₹{(999 - totalAmount).toLocaleString('en-IN')} more for free shipping!
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  ₹{(totalAmount + (totalAmount >= 999 ? 0 : 99)).toLocaleString('en-IN')}
                </span>
              </div>
              
              <button 
                className="checkout-btn btn btn-primary btn-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout →
              </button>
              
              <Link to="/products" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;