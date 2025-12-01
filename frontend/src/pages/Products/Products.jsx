import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { fetchProducts, fetchCategories } from '../../redux/slices/productSlice';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, loading, page, pages, total } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page')) || 1
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: currentPage,
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
    if (currentPage > 1) newSearchParams.set('page', currentPage);
    setSearchParams(newSearchParams);
  }, [dispatch, search, category, sort, currentPage, setSearchParams]);

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
        {loading ? (
          <Loader size="large" />
        ) : products.length === 0 ? (
          <div className="no-products">
            <span className="no-products-icon">🔍</span>
            <h2>No products found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="pagination-numbers">
                  {[...Array(pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-number ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === pages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;