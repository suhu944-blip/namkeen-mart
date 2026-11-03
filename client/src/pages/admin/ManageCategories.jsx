import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import * as categoryService from '../../services/categoryService.js';

const ManageCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true,
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAdminCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle URL query trigger: ?action=add
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      openAddModal();
      setSearchParams({});
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
      isActive: category.isActive !== undefined ? category.isActive : true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Category name is required.');
      return;
    }

    try {
      setSubmitting(true);
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
        setSuccessMessage(`Category "${formData.name}" updated successfully.`);
      } else {
        await categoryService.createCategory(formData);
        setSuccessMessage(`Category "${formData.name}" added successfully.`);
      }
      closeModal();
      fetchCategories();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await categoryService.updateCategory(category._id, {
        isActive: !category.isActive,
      });
      fetchCategories();
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
      await categoryService.deleteCategory(deleteTarget._id);
      setSuccessMessage(`Category "${deleteTarget.name}" deleted successfully.`);
      setDeleteTarget(null);
      fetchCategories();
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Manage Categories</h1>
          <p className="text-xs text-stone-500">
            Create, update, and organize product categories. Categories appear on the customer home page.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchCategories}
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
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Global Success / Error Banners */}
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

      {/* Categories Table Container */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-stone-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Image</th>
                  <th className="py-3.5 px-6">Category Name</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Products</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-6">
                      <img
                        src={cat.image || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80'}
                        alt={cat.name}
                        className="w-12 h-12 rounded-xl object-cover bg-amber-50 border border-stone-200"
                      />
                    </td>
                    <td className="py-3.5 px-6 font-bold text-stone-900 text-sm">
                      {cat.name}
                    </td>
                    <td className="py-3.5 px-6 text-stone-500 max-w-xs truncate">
                      {cat.description || '—'}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        {cat.productCount || 0} Products
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          cat.isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                        title="Click to toggle active state"
                      >
                        {cat.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{cat.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete category"
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
            <p className="font-semibold text-stone-700">No categories found.</p>
            <p className="text-xs mt-1">Get started by creating your first category.</p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
            >
              Add Category
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative animate-in zoom-in-95">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-stone-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <p className="text-xs text-stone-500">
                Categories group your namkeen products on the customer website.
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
                <label className="text-xs font-bold text-stone-700 block">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bakery, Farari, Diet"
                  required
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short explanation of this snack category..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Category Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-[11px] text-stone-400">
                  Provide a high-quality Unsplash image link or product asset URL.
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="categoryActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                />
                <label htmlFor="categoryActive" className="text-xs font-bold text-stone-800 cursor-pointer">
                  Category is Active (Visible on customer store)
                </label>
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
                  {submitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
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
                Are you sure you want to delete this category? If any products are currently assigned to it, the system will block deletion.
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

export default ManageCategories;
