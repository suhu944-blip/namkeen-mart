import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, X, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import * as productService from '../services/productService.js';
import * as categoryService from '../services/categoryService.js';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state from URL or default
  const selectedCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  // Fetch Categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await categoryService.getActiveCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch Products whenever searchParams change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (selectedCategory && selectedCategory !== 'all') {
          params.category = selectedCategory;
        }
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }
        if (sortBy) {
          params.sort = sortBy;
        }

        const data = await productService.getActiveProducts(params);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const handleCategoryChange = (catId) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      nextParams.set('search', val);
    } else {
      nextParams.delete('search');
    }
    setSearchParams(nextParams);
  };

  const handleSortChange = (e) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', e.target.value);
    setSearchParams(nextParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 md:p-12 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
            Authentic Indian Snack Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Explore All Traditional Snacks
          </h1>
          <p className="text-sm text-amber-100">
            Browse our complete catalog of freshly fried and roasted namkeen, savories, and diet munchies.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-amber-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by snack name or flavor..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            {searchTerm && (
              <button
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete('search');
                  setSearchParams(next);
                }}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-stone-500 shrink-0" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-3 flex justify-end">
            {(selectedCategory !== 'all' || searchTerm || sortBy !== 'newest') && (
              <button
                onClick={handleClearFilters}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 border-t border-stone-100 flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-orange-600" /> Categories:
          </span>

          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat._id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === cat._id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-80 bg-amber-100/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700">
          <p className="font-bold">Failed to load products</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div>
          <p className="text-xs font-bold text-stone-500 mb-4">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-amber-200 space-y-3">
          <p className="text-lg font-bold text-stone-800">No snacks found matching your criteria</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing your category filter, or exploring our popular categories.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
