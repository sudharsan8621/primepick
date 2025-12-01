import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { fetchProducts } from '../../redux/slices/productSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const productsRef = useRef(null);
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { name: 'Electronics', icon: '📱', color: '#667eea' },
    { name: 'Clothing', icon: '👕', color: '#f093fb' },
    { name: 'Home & Kitchen', icon: '🏠', color: '#4facfe' },
    { name: 'Books', icon: '📚', color: '#43e97b' },
    { name: 'Sports', icon: '⚽', color: '#fa709a' },
    { name: 'Beauty', icon: '💄', color: '#a18cd1' },
  ];

  return (
    <div className="home">
      <Banner onShopNow={scrollToProducts} />

      {/* Categories Section */}
      <section className="categories-section section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className="featured-section section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="products-grid">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="view-all-container">
                <Link to="/products" className="btn btn-primary btn-lg">
                  View All Products →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🚚</span>
              <h3>Free Shipping</h3>
              <p>On orders above ₹999</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">↩️</span>
              <h3>Easy Returns</h3>
              <p>7-day return policy</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3>24/7 Support</h3>
              <p>Dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;