import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@namkeenmart.com');
    setPassword('Customer123!');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-200/80 p-8 sm:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Customer Login</h1>
          <p className="text-xs text-stone-500">
            Sign in to explore your favorite namkeen snacks and order status.
          </p>
        </div>

        {/* Demo Credentials Quick Fill Button */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Need test credentials?</span>
          </div>
          <button
            type="button"
            onClick={fillDemoCustomer}
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-[11px] text-amber-950 transition-colors"
          >
            Fill Demo Customer
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start space-x-3 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Verifying...' : 'Sign In to Your Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Links */}
        <div className="pt-4 border-t border-stone-100 text-center space-y-3 text-xs">
          <p className="text-stone-600">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-orange-600 hover:underline">
              Register here
            </Link>
          </p>

          <p className="text-stone-400">
            Store Administrator?{' '}
            <Link to="/admin/login" className="font-semibold text-amber-700 hover:underline">
              Access Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
