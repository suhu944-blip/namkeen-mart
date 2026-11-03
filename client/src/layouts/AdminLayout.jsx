import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  LogOut,
  ShoppingBag,
  Menu,
  X,
  Shield,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Manage Categories', path: '/admin/categories', icon: Layers },
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-800">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-stone-900 text-stone-300 border-r border-stone-800 shrink-0">
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-stone-800">
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">
                Namkeen<span className="text-orange-500">Admin</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 mt-6 border-t border-stone-800">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
              External
            </p>
            <Link
              to="/"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span>Customer Storefront</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/40">
          <div className="flex items-center space-x-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-white bg-red-950/30 hover:bg-red-600 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-500">
              <Link to="/admin/dashboard" className="hover:text-orange-600">
                Admin
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-stone-800 capitalize">
                {location.pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>

            <div className="flex items-center space-x-2 border-l border-stone-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="text-xs font-bold text-stone-800 hidden md:inline">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-stone-900 text-stone-300 flex flex-col z-50">
            <div className="h-20 px-6 flex items-center justify-between border-b border-stone-800">
              <span className="text-lg font-black text-white">
                Namkeen<span className="text-orange-500">Admin</span>
              </span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrent(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold ${
                      active ? 'bg-orange-600 text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-stone-800 mt-4">
                <Link
                  to="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-amber-400 hover:text-white"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customer Store</span>
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-stone-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-bold text-red-400 bg-red-950/30 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
