import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both admin email and password.');
      return;
    }

    try {
      setLoading(true);
      const user = await login(email, password);

      if (user.role !== 'admin') {
        setError('Access denied. This account does not possess administrator privileges.');
        return;
      }

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin@namkeenmart.com');
    setPassword('AdminPassword123!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-stone-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/30">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs text-stone-400">
            Secure management console for Namkeen Mart staff & operators.
          </p>
        </div>

        {/* Demo Credentials Quick Fill */}
        <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-amber-400">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="font-medium">Preset Admin Credentials</span>
          </div>
          <button
            type="button"
            onClick={fillAdminDemo}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-[11px] transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 rounded-xl p-3.5 flex items-start space-x-3 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-400 block">Administrator Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@namkeenmart.com"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-700 bg-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-400 block">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-700 bg-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In as Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-4 border-t border-stone-800 text-center">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
            <span>Return to Customer Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
