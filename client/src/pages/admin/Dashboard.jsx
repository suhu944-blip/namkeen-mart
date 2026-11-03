import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import * as productService from '../../services/productService.js';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAdminDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-stone-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-32 bg-stone-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 space-y-3">
        <p className="font-bold">Error loading dashboard statistics</p>
        <p className="text-xs">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title & Quick Action Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Admin Overview</h1>
          <p className="text-xs text-stone-500">
            Live catalog statistics, inventory alerts, and quick management links.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            to="/admin/products?action=add"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/categories?action=add"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Products
            </span>
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900">{stats?.totalProducts || 0}</p>
          <p className="text-[11px] text-stone-400">Products across all categories</p>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Categories
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900">{stats?.totalCategories || 0}</p>
          <p className="text-[11px] text-stone-400">Active and draft categories</p>
        </div>

        {/* Active Products */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Products
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900">{stats?.activeProducts || 0}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">Visible to customers</p>
        </div>

        {/* Inactive Products */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Inactive Products
            </span>
            <div className="p-2 rounded-xl bg-stone-100 text-stone-600">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-stone-900">{stats?.inactiveProducts || 0}</p>
          <p className="text-[11px] text-stone-400">Hidden from customer store</p>
        </div>
      </div>

      {/* Low Stock Alert if any */}
      {stats?.lowStockProducts > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between text-amber-900 text-xs">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Inventory Notice: </span>
              <span>
                {stats.lowStockProducts} product(s) have low stock (5 or fewer units remaining).
              </span>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-amber-950 transition-colors"
          >
            Review Stock
          </Link>
        </div>
      )}

      {/* Recent Products Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">Recently Added Snacks</h2>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
          >
            <span>Manage All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentProducts && stats.recentProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {stats.recentProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-stone-50/50">
                    <td className="py-3 flex items-center space-x-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 rounded-lg object-cover bg-stone-100"
                      />
                      <span className="font-bold text-stone-900">{p.name}</span>
                    </td>
                    <td className="py-3 text-stone-600">{p.category?.name || '—'}</td>
                    <td className="py-3 font-bold text-stone-900">₹{p.price}</td>
                    <td className="py-3">
                      <span
                        className={`font-semibold ${
                          p.stock <= 5 ? 'text-amber-600 font-bold' : 'text-stone-700'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-stone-400 py-4">No products recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
