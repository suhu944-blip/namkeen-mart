import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  X,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';
import * as productService from '../../services/productService.js';
import * as categoryService from '../../services/categoryService.js';

const ManageProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Table Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    price: '',
    stock: '',
    availabilityStatus: 'in_stock',
    isFeatured: false,
    isActive: true,
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete Target Dialog
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const cats = await categoryService.getAdminCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (filterCategory && filterCategory !== 'all') params.category = filterCategory;

      const data = await productService.getAdminProducts(params);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  // Handle URL query trigger: ?action=add
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      openAddModal();
      setSearchParams({});
    }
  }, [searchParams, categories]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: categories.length > 0 ? categories[0]._id : '',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
      price: '',
      stock: 50,
      availabilityStatus: 'in_stock',
      isFeatured: false,
      isActive: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category?._id || product.category || '',
      image: product.image || '',
      price: product.price,
      stock: product.stock,
      availabilityStatus: product.availabilityStatus || 'in_stock',
      isFeatured: Boolean(product.isFeatured),
      isActive: product.isActive !== undefined ? product.isActive : true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!formData.category) {
      setFormError('Please select a category.');
      return;
    }
    if (formData.price === '' || Number(formData.price) < 0) {
      setFormError('Please enter a valid price.');
      return;
    }
    if (formData.stock === '' || Number(formData.stock) < 0) {
      setFormError('Please enter a valid stock quantity.');
      return;
    }

    try {
      setSubmitting(true);
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData);
        setSuccessMessage(`Product "${formData.name}" updated successfully.`);
      } else {
        await productService.createProduct(formData);
        setSuccessMessage(`Product "${formData.name}" created successfully.`);
      }
      closeModal();
      fetchProducts();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isActive: !product.isActive,
      });
      fetchProducts();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isFeatured: !product.isFeatured,
      });
      fetchProducts();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);
      setError(null);
      await productService.deleteProduct(deleteTarget._id);
      setSuccessMessage(`Product "${deleteTarget.name}" deleted successfully.`);
      setDeleteTarget(null);
      fetchProducts();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setError(err.message);
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Manage Products</h1>
          <p className="text-xs text-stone-500">
            Add new snack items, adjust pricing, stock quantities, and feature favorites on the home page.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Global Banners */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 text-xs font-semibold flex items-start space-x-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters & Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  fetchProducts();
                }}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="md:col-span-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="all">Filter: All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex space-x-2 justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Apply Filter
            </button>
            {(searchQuery || filterCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('all');
                }}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product Table Container */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-14 bg-stone-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Image</th>
                  <th className="py-3.5 px-6">Product Name</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Stock</th>
                  <th className="py-3.5 px-6">Featured</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-6">
                      <img
                        src={p.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-amber-50 border border-stone-200"
                      />
                    </td>
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-stone-900 text-sm">{p.name}</p>
                      <p className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                        {p.description}
                      </p>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
                        {p.category?.name || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-black text-stone-900 text-sm">
                      ₹{p.price}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`font-semibold ${
                          p.stock <= 5 ? 'text-amber-600 font-bold' : 'text-stone-700'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                        }`}
                        title="Click to toggle featured spotlight"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{p.isFeatured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          p.isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                        title="Click to toggle active visibility"
                      >
                        {p.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{p.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-stone-500">
            <p className="font-semibold text-stone-700">No products found matching your filter.</p>
            <p className="text-xs mt-1">Add a new product or reset your search criteria.</p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
            >
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative my-8 animate-in zoom-in-95">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-stone-900">
                {editingProduct ? 'Edit Namkeen Product' : 'Add New Namkeen Product'}
              </h2>
              <p className="text-xs text-stone-500">
                Configure snack details, pricing, and category assignments.
              </p>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Ratlami Clove Sev"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Availability *</label>
                  <select
                    value={formData.availabilityStatus}
                    onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="limited">Limited Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="150"
                    required
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Stock Quantity *</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="50"
                    required
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Description *</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingredients, taste profile, and preparation style..."
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Product Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-bold text-stone-800 cursor-pointer">
                    Feature on Home Page
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="productActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                  />
                  <label htmlFor="productActive" className="text-xs font-bold text-stone-800 cursor-pointer">
                    Product Active
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900">
                Delete "{deleteTarget.name}"?
              </h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to delete this product? It will be permanently removed from the catalog.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
