import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
  Award,
  Truck,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Features Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-stone-800 text-stone-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-orange-600/20 text-orange-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Traditional Heritage</h4>
              <p className="text-xs text-stone-400">Authentic recipes since 1985</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Pure & Hygienic</h4>
              <p className="text-xs text-stone-400">FSSAI certified clean prep</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fast Fresh Delivery</h4>
              <p className="text-xs text-stone-400">Packed crisp upon dispatch</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-500">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Preservatives</h4>
              <p className="text-xs text-stone-400">Pure oils & native spices</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Namkeen<span className="text-orange-500">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed pr-6">
              Bringing authentic Indian snacks, crispy sev, crunchy farari mixtures, and wholesome
              diet munchies directly from our heritage kitchen to your doorstep. Every bite tells a
              story of tradition and crunch.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-400 transition-colors">
                  All Snacks Catalog
                </Link>
              </li>
              <li>
                <a href="/#categories" className="hover:text-orange-400 transition-colors">
                  Category Showcase
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-orange-400 transition-colors">
                  Our Heritage Story
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition-colors">
                  Customer Login
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-orange-400 transition-colors text-xs text-amber-500/80">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Categories</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/products?category=Bakery" className="hover:text-orange-400 transition-colors">
                  Bakery & Puffs
                </Link>
              </li>
              <li>
                <Link to="/products?category=Farari" className="hover:text-orange-400 transition-colors">
                  Farari (Fasting Special)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Diet" className="hover:text-orange-400 transition-colors">
                  Diet & Low-Oil Munchies
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-400 transition-colors">
                  Signature Sev & Bhujia
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-400 transition-colors">
                  Roasted Makhanas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div id="contact" className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Shop 12-14, Heritage Sweet & Namkeen Bazar, Ratlam, MP - 457001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 (07412) 234567 / +91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@namkeenmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Namkeen Mart Inc. All Rights Reserved. Crafted with pure spices.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>FSSAI Lic. #10018021003456</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
