import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { fetchProducts, fetchCategories } from '../../redux/slices/productSlice';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, loading, pages, total } = useSelector(
    (state) => state.products
  );

  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, isLoadingMore, hasMore]
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Initial load and filter changes
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);

    const params = {
      page: 1,
      limit: 12,
    };

    if (search) params.search = search;
    if (category && category !== 'All') params.category = category;
    if (sort) params.sort = sort;

    dispatch(fetchProducts(params));

    // Update URL params
    const newSearchParams = new URLSearchParams();
    if (search) newSearchParams.set('search', search);
    if (category && category !== 'All') newSearchParams.set('category', category);
    if (sort) newSearchParams.set('sort', sort);
    setSearchParams(newSearchParams);
  }, [dispatch, search, category, sort, setSearchParams]);

  // Update allProducts when products change
  useEffect(() => {
    if (currentPage === 1) {
      setAllProducts(products);
    } else {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newProducts = products.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newProducts];
      });
    }
    setHasMore(currentPage < pages);
    setIsLoadingMore(false);
  }, [products, currentPage, pages]);

  const loadMore = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const params = {
      page: nextPage,
      limit: 12,
    };

    if (search) params.search = search;
    if (category && category !== 'All') params.category = category;
    if (sort) params.sort = sort;

    dispatch(fetchProducts(params));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="page-title">Our Products</h1>
          <p className="products-count">{total} products found</p>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input form-input"
            />
            <button type="submit" className="search-btn btn btn-primary">
              🔍
            </button>
          </form>

          <div className="filter-controls">
            <div className="category-filter">
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-input"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-filter">
              <label>Sort by:</label>
              <select
                value={sort}
                onChange={handleSortChange}
                className="form-input"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="category-tags">
          <button
            className={`category-tag ${category === 'All' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tag ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading && allProducts.length === 0 ? (
          <Loader size="large" />
        ) : allProducts.length === 0 ? (
          <div className="no-products">
            <span className="no-products-icon">🔍</span>
            <h2>No products found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {allProducts.map((product, index) => {
                if (index === allProducts.length - 1) {
                  return (
                    <div ref={lastProductRef} key={product._id}>
                      <ProductCard product={product} />
                    </div>
                  );
                }
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="loading-more">
                <Loader size="small" />
                <p>Loading more products...</p>
              </div>
            )}

            {/* End of Products */}
            {!hasMore && allProducts.length > 0 && (
              <div className="end-of-products">
                <p>You've reached the end! 🎉</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;