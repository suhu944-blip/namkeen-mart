import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

import Home from '../pages/Home.jsx';
import Products from '../pages/Products.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

import AdminLogin from '../pages/admin/AdminLogin.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ManageProducts from '../pages/admin/ManageProducts.jsx';
import ManageCategories from '../pages/admin/ManageCategories.jsx';

import { useAuth } from '../context/AuthContext.jsx';

/**
 * Route Guard for Administrator routes
 */
const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 text-amber-500 font-bold text-sm">
        Verifying administrative authorization...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Website (MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Authentication (Standalone) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel (AdminLayout + Protected Guard) */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="categories" element={<ManageCategories />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
