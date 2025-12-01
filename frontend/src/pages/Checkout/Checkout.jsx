import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";
import { createOrder, clearOrderSuccess } from "../../redux/slices/orderSlice";
import Loader from "../../components/Loader/Loader";
import "./Checkout.css";
import { getProductImage } from "../../assets/images/products";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    totalAmount,
    loading: cartLoading,
  } = useSelector((state) => state.cart);
  const {
    loading: orderLoading,
    success,
    error,
  } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearOrderSuccess());
      navigate("/profile", { state: { orderSuccess: true } });
    }
  }, [success, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Invalid pincode (6 digits required)";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(createOrder({ shippingAddress: formData }));
  };

  if (cartLoading) return <Loader size="large" />;

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <span className="empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checkout</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = totalAmount >= 999 ? 0 : 99;
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">💳 Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? "error" : ""}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="form-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-input ${errors.address ? "error" : ""}`}
                  placeholder="Enter your complete address"
                  rows="3"
                />
                {errors.address && (
                  <span className="form-error">{errors.address}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${errors.city ? "error" : ""}`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <span className="form-error">{errors.city}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`form-input ${errors.state ? "error" : ""}`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <span className="form-error">{errors.state}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`form-input ${errors.pincode ? "error" : ""}`}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && (
                    <span className="form-error">{errors.pincode}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="10-digit phone number"
                    maxLength="10"
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary btn-lg place-order-btn"
                disabled={orderLoading}
              >
                {orderLoading
                  ? "Processing..."
                  : `Place Order - ₹${finalTotal.toLocaleString("en-IN")}`}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <h2>Order Summary</h2>

            <div className="order-items">
              {items.map((item) => (
                <div key={item.product._id} className="order-item">
                  <img
                    src={getProductImage(item.product.image)}
                    alt={item.product.title}
                  />
                  <div className="order-item-details">
                    <h4>{item.product.title}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              {/* {items.map((item) => (
                <div key={item.product._id} className="order-item">
                  <img
                    src={`/src/assets/images/products/${item.product.image}`}
                    alt={item.product.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=Product';
                    }}
                  />
                  <div className="order-item-details">
                    <h4>{item.product.title}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))} */}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? "free" : ""}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div className="total-row final">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="payment-info">
              <h3>💳 Payment Method</h3>
              <p>Dummy Payment (Demo Mode)</p>
              <small>No actual payment will be processed</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
