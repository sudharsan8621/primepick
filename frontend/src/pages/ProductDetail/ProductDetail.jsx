import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, clearProduct } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistProducts.some((item) => item._id === id);

  useEffect(() => {
    dispatch(fetchProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: id, quantity }));
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: id, quantity }));
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }
  };

  if (loading) return <Loader size="large" />;
  if (error) return <div className="error-message container">{error}</div>;
  if (!product) return <div className="error-message container">Product not found</div>;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = `/src/assets/images/products/${product.image}`;
  const placeholderImage = 'https://via.placeholder.com/500x500?text=Product+Image';

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img
                src={imageUrl}
                alt={product.title}
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
              {discount > 0 && (
                <span className="discount-badge">-{discount}%</span>
              )}
            </div>
          </div>

          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.title}</h1>

            <div className="product-rating">
              <Rating value={product.rating} showValue />
              <span className="review-count">({product.numReviews} reviews)</span>
            </div>

            <div className="product-price-section">
              <span className="current-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="discount-text">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
              {product.brand && (
                <div className="meta-item">
                  <span className="meta-label">Brand:</span>
                  <span className="meta-value">{product.brand}</span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className={`meta-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                ⚡ Buy Now
              </button>
              <button
                className={`btn btn-outline wishlist-toggle ${isInWishlist ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free Delivery on orders above ₹999</span>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <span>7 Days Easy Return</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>100% Genuine Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;