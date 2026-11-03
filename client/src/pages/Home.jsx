import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  ShieldCheck,
  Truck,
  Heart,
  Clock,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import * as categoryService from '../services/categoryService.js';
import * as productService from '../services/productService.js';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Categories
      try {
        setLoadingCategories(true);
        const cats = await categoryService.getActiveCategories();
        setCategories(cats);
      } catch (err) {
        setErrorCategories(err.message);
      } finally {
        setLoadingCategories(false);
      }

      // Fetch Featured Products
      try {
        setLoadingProducts(true);
        const prods = await productService.getFeaturedProducts();
        setFeaturedProducts(prods);
      } catch (err) {
        setErrorProducts(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* A. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 via-orange-50/40 to-[#faf7f2] pt-12 pb-24 md:py-28 border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>Handcrafted with Traditional Malwi & Rajasthani Heritage</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
                Bringing the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
                  Taste of Tradition
                </span>{' '}
                to Your Home
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Relish authentic Indian namkeen, crispy clove sev, crunchy farari mixtures, and healthy
                roasted munchies. Prepared fresh daily using pure cold-pressed oils and time-honored family spices.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </Link>

                <a
                  href="#categories"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-amber-50 text-stone-800 font-bold text-sm border border-amber-200 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Categories</span>
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </a>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-amber-200/60 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl font-black text-stone-900">100%</p>
                  <p className="text-xs font-semibold text-stone-500">Pure Veg & Hygienic</p>
                </div>
                <div>
                  <p className="text-xl font-black text-stone-900">35+ Yrs</p>
                  <p className="text-xs font-semibold text-stone-500">Heritage Recipe</p>
                </div>
                <div>
                  <p className="text-xl font-black text-stone-900">Fresh</p>
                  <p className="text-xs font-semibold text-stone-500">Packed Daily</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-4/3 relative">
                  <img
                    src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop&q=85"
                    alt="Authentic Indian Namkeen Platter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wider mb-1 inline-block">
                      Master Chef Special
                    </span>
                    <h3 className="text-lg font-bold">Royal Ratlami Clove Sev</h3>
                    <p className="text-xs text-stone-300">Spicy, crunchy, and freshly prepared</p>
                  </div>
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-amber-100 flex items-center space-x-3 hidden sm:flex">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Zero Adulteration</h4>
                    <p className="text-[11px] text-stone-500">Prepared in cold-pressed groundnut oil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Category Section */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Curated Flavors
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Explore Our Snack Categories
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Handpicked categories for tea-time, fasting days, and guilt-free munching.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loadingCategories && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 bg-amber-100/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {errorCategories && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700 text-sm">
            Failed to load categories: {errorCategories}
          </div>
        )}

        {/* Dynamic Category Cards */}
        {!loadingCategories && !errorCategories && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loadingCategories && !errorCategories && categories.length === 0 && (
          <div className="bg-amber-50 rounded-2xl p-12 text-center text-stone-600">
            <p className="text-base font-semibold">No active categories found.</p>
            <p className="text-xs text-stone-400 mt-1">
              Categories added by admin will automatically appear here.
            </p>
          </div>
        )}
      </section>

      {/* C. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Customer Favorites
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Featured Traditional Snacks
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Our most celebrated namkeens, freshly packed and delivered crisp.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Loading State */}
        {loadingProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-amber-100/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {errorProducts && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700 text-sm">
            Failed to load products: {errorProducts}
          </div>
        )}

        {/* Dynamic Product Cards */}
        {!loadingProducts && !errorProducts && featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loadingProducts && !errorProducts && featuredProducts.length === 0 && (
          <div className="bg-amber-50 rounded-2xl p-12 text-center text-stone-600">
            <p className="text-base font-semibold">No featured products currently available.</p>
            <p className="text-xs text-stone-400 mt-1">
              Products marked as featured in the Admin panel will appear here.
            </p>
          </div>
        )}
      </section>

      {/* D. Why Choose Us Section */}
      <section className="bg-amber-100/50 border-y border-amber-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              The Namkeen Mart Promise
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Why Snack Lovers Choose Us
            </h2>
            <p className="text-sm text-stone-600">
              We uphold the sacred standard of traditional Indian hospitality and taste.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-shadow text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Fresh Quality Products</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Small-batch batches roasted and fried fresh daily for maximum crispness.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-shadow text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Traditional Taste</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Authentic spice blends perfected through four decades of culinary mastery.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-shadow text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Quality Ingredients</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Sendha namak, pure besan, aromatic cloves, and zero artificial colors.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-shadow text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Secure Shopping</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Verified customer authentication and protected ordering infrastructure.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-shadow text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Convenient Delivery</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Airtight nitrogen-flushed pouch packaging dispatched right to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E. About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-3xl border border-amber-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Our Heritage & Roots
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Crafting Authentic Indian Flavors with Passion & Purity
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Started in the bustling streets of heritage snack capitals, Namkeen Mart was born out
                of a deep reverence for authentic, uncompromised taste. While mass-produced commercial
                snacks cut corners with palm oils and synthetic flavor enhancers, we stay devoted to
                the traditional recipe craft.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                From our spicy clove-punched Ratlami Sev and flaky layered butter kharis to our pure
                rock-salt Farari chevdo and roasted fox nuts, every batch is prepared under strict
                hygienic standards so you can share joy with your family with total peace of mind.
              </p>

              <div className="pt-2 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-stone-800">100% Vegetarian</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-stone-800">Artisanal Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-stone-800">Heritage Recipes</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
                  alt="Traditional Namkeen Preparation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
