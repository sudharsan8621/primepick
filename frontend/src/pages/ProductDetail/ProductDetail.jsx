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