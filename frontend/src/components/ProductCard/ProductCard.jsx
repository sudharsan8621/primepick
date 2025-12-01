// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../redux/slices/cartSlice';
// import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
// import Rating from '../Rating/Rating';
// import './ProductCard.css';

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const { products: wishlistProducts } = useSelector((state) => state.wishlist);

//   const isInWishlist = wishlistProducts.some(
//     (item) => item._id === product._id
//   );

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     dispatch(addToCart({ productId: product._id, quantity: 1 }));
//   };

//   const handleWishlistToggle = (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     if (isInWishlist) {
//       dispatch(removeFromWishlist(product._id));
//     } else {
//       dispatch(addToWishlist(product._id));
//     }
//   };

//   const discount = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   // Use placeholder image if product image is not available
//   const imageUrl = `/src/assets/images/products/${product.image}`;
//   const placeholderImage = 'https://via.placeholder.com/300x300?text=Product+Image';

//   return (
//     <div className="product-card card">
//       <Link to={`/products/${product._id}`} className="product-link">
//         <div className="product-image-container">
//           <img
//             src={imageUrl}
//             alt={product.title}
//             className="product-image"
//             onError={(e) => {
//               e.target.src = placeholderImage;
//             }}
//           />
//           {discount > 0 && (
//             <span className="product-discount">-{discount}%</span>
//           )}
//           <button
//             className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
//             onClick={handleWishlistToggle}
//             aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             {isInWishlist ? '❤️' : '🤍'}
//           </button>
//         </div>

//         <div className="product-info">
//           <span className="product-category">{product.category}</span>
//           <h3 className="product-title">{product.title}</h3>
          
//           <div className="product-rating">
//             <Rating value={product.rating} />
//             <span className="rating-count">({product.numReviews})</span>
//           </div>

//           <div className="product-price">
//             <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
//             {product.originalPrice && (
//               <span className="original-price">
//                 ₹{product.originalPrice.toLocaleString('en-IN')}
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>

//       <button className="add-to-cart-btn btn btn-primary" onClick={handleAddToCart}>
//         Add to Cart 🛒
//       </button>
//     </div>
//   );
// };

// export default ProductCard;











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
    <div className="product-card card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={getImageUrl(product.image)}
            alt={product.title}
            className="product-image"
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