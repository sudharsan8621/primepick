import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import Rating from '../Rating/Rating';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistProducts.some(
    (item) => item._id === product._id
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Use placeholder image if product image is not available
  const imageUrl = `/src/assets/images/products/${product.image}`;
  const placeholderImage = 'https://via.placeholder.com/300x300?text=Product+Image';

  return (
    <div className="product-card card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={imageUrl}
            alt={product.title}
            className="product-image"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
          {discount > 0 && (
            <span className="product-discount">-{discount}%</span>
          )}
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-rating">
            <Rating value={product.rating} />
            <span className="rating-count">({product.numReviews})</span>
          </div>

          <div className="product-price">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button className="add-to-cart-btn btn btn-primary" onClick={handleAddToCart}>
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default ProductCard;