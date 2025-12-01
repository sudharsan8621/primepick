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



  
  // Use placeholder image for production
  const getImageUrl = (imageName) => {
    const placeholders = {
      'headphones.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      'smartwatch.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      'shirt.jpg': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop',
      'running-shoes.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      'water-bottle.jpg': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
      'js-book.jpg': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
      'face-serum.jpg': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
      'gaming-mouse.jpg': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      'yoga-mat.jpg': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
      'cookware.jpg': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      'kurti.jpg': 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop',
      'speaker.jpg': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      'cookbook.jpg': 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&h=300&fit=crop',
      'body-lotion.jpg': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop',
      'dumbbells.jpg': 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=300&h=300&fit=crop',
      'jeans.jpg': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
    };
    return placeholders[imageName] || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.title)}`;
  };




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