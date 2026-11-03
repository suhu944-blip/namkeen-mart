import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                Namkeen<span className="text-orange-600">Mart</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-amber-700/80 -mt-1">
                Authentic Indian Snacks
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-amber-50/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/products')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-amber-50/50'
              }`}
            >
              All Products
            </Link>
            <a
              href="/#categories"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-amber-50/50 transition-colors"
            >
              Categories
            </a>
            <a
              href="/#about"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-amber-50/50 transition-colors"
            >
              About Us
            </a>
            <a
              href="/#contact"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-amber-50/50 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Input / Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sev, khari, bhujia..."
                    autoFocus
                    className="w-56 pl-3 pr-8 py-1.5 text-xs rounded-full border border-orange-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-600 hover:text-orange-600 hover:bg-amber-100/50 rounded-full transition-colors"
                  title="Search snacks"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart Icon UI Placeholder */}
            <div className="relative group">
              <button
                className="p-2 text-stone-600 hover:text-orange-600 hover:bg-amber-100/50 rounded-full transition-colors relative"
                title="Cart (Phase 3)"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              {/* Tooltip */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-stone-900 text-white text-[11px] rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg text-center">
                Cart & Checkout will be enabled in Phase 3
              </div>
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-100/70 hover:bg-amber-100 text-stone-800 transition-colors border border-amber-200"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-amber-100 py-1.5 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-xs font-bold text-gray-900 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-100 text-amber-800">
                        {user?.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-amber-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-b border-amber-200 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sev, khari, bhujia..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-1 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
            >
              All Products
            </Link>
            <a
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Categories
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
            >
              About Us
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Contact
            </a>
          </div>

          {/* Mobile Auth */}
          <div className="pt-3 border-t border-amber-200/80">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2 bg-amber-100/60 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{user?.name}</p>
                    <p className="text-xs text-stone-500">{user?.email}</p>
                  </div>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Go to Admin Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-4 rounded-xl text-sm font-semibold text-stone-700 bg-amber-100/70 hover:bg-amber-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-4 rounded-xl text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
