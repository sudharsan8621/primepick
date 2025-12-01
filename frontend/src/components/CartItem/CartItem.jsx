import { useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../../redux/slices/cartSlice';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ 
      productId: item.product._id, 
      quantity: newQuantity 
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product._id));
  };

  const imageUrl = `/src/assets/images/products/${item.product.image}`;
  const placeholderImage = 'https://via.placeholder.com/100x100?text=Product';

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={imageUrl}
          alt={item.product.title}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.product.title}</h3>
        <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal</span>
        <span className="subtotal-value">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </span>
      </div>

      <button className="cart-item-remove" onClick={handleRemove}>
        🗑️
      </button>
    </div>
  );
};

export default CartItem;