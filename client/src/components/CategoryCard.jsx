import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Category Image with Zoom Effect */}
      <div className="relative h-48 w-full overflow-hidden bg-amber-100">
        <img
          src={
            category.image ||
            'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80'
          }
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />

        {/* Category Name Overlay Badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight drop-shadow-md">
            {category.name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Special
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {category.description || 'Authentic traditional savory snacks prepared with premium ingredients.'}
        </p>

        <Link
          to={`/products?category=${category._id}`}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-amber-50 group-hover:bg-orange-600 text-orange-700 group-hover:text-white font-semibold text-xs transition-colors duration-200 shadow-2xs"
        >
          <span>Explore {category.name}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
