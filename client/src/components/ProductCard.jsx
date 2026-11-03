import React, { useState } from 'react';
import { Sparkles, Eye, ShoppingBag, CheckCircle, AlertTriangle, X, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const isAvailable = product.availabilityStatus === 'in_stock' && product.stock > 0;
  const isLimited = product.availabilityStatus === 'limited' || (product.stock > 0 && product.stock <= 5);

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
        {/* Product Image & Badges */}
        <div className="relative h-52 w-full overflow-hidden bg-amber-50">
          <img
            src={
              product.image ||
              'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Featured Ribbon */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-stone-900" /> Bestseller
            </div>
          )}

          {/* Availability Status Badge */}
          <div className="absolute top-3 right-3">
            {isLimited ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Limited Stock
              </span>
            ) : isAvailable ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> In Stock
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-300">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick View Button overlay on hover */}
          <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-white/95 hover:bg-white text-stone-900 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all"
            >
              <Eye className="w-4 h-4 text-orange-600" /> Quick View
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-1.5">
            {/* Category tag */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange-600">
              {product.category?.name || 'Traditional Snack'}
            </span>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-amber-100/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 block -mb-0.5">Price / 250g</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-black text-stone-900">₹{product.price}</span>
                <span className="text-xs text-stone-400 line-through">₹{Math.round(product.price * 1.25)}</span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-600 hover:text-white transition-colors duration-200 border border-orange-200 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Details
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200 relative animate-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="h-64 md:h-full bg-amber-50 relative">
                <img
                  src={
                    product.image ||
                    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isFeatured && (
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 uppercase tracking-wider shadow-md">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Details Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">
                      {product.category?.name || 'Namkeen'}
                    </span>
                    <span className="text-xs text-stone-400">• Standard Pack (250g)</span>
                  </div>

                  <h2 className="text-2xl font-black text-stone-900">{product.name}</h2>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-orange-600">₹{product.price}</span>
                    <span className="text-sm text-stone-400 line-through">₹{Math.round(product.price * 1.25)}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      20% OFF
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed pt-2">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Pure & Freshly Prepared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>
                        Availability:{' '}
                        <strong className="text-stone-900">
                          {isAvailable ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart Action Placeholder */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4 text-amber-600" />
                      <span>Shopping Cart & Checkout enable in Phase 3</span>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-3 py-1 bg-amber-200 text-amber-900 rounded-lg font-bold text-[11px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
