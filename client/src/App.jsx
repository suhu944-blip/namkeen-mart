import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Server, CheckCircle2, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

function App() {
  const [healthStatus, setHealthStatus] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  const checkHealth = async () => {
    setHealthStatus({ status: 'loading', data: null, error: null });
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    try {
      const response = await axios.get(`${apiUrl}/health`);
      setHealthStatus({
        status: 'success',
        data: response.data,
        error: null,
      });
    } catch (err) {
      setHealthStatus({
        status: 'error',
        data: null,
        error: err.message || 'Failed to connect to backend API',
      });
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
        {/* Header */}
        <div className="bg-amber-600 px-8 py-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-700/50 rounded-lg">
              <ShoppingBag className="w-8 h-8 text-amber-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Namkeen Mart</h1>
              <p className="text-amber-100 text-sm">E-Commerce Platform • Initial Setup</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/50 text-amber-100 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Phase 1
          </span>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">MERN Stack Initialized Successfully</h2>
            <p className="text-sm text-gray-600">
              The foundational project structure for both Customer Website and Admin Panel has been established.
            </p>
          </div>

          {/* Setup Verification Checklist */}
          <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Stack Verification</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>React + Vite</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>React Router & Axios</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Lucide Icons</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Express & Node.js</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>MongoDB & Mongoose</span>
              </div>
            </div>
          </div>

          {/* Backend Connectivity Status */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-800">Backend Health Endpoint</span>
              </div>
              <button
                onClick={checkHealth}
                disabled={healthStatus.status === 'loading'}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${healthStatus.status === 'loading' ? 'animate-spin' : ''}`} />
                Test API
              </button>
            </div>

            {healthStatus.status === 'loading' && (
              <p className="text-xs text-gray-500 italic">Connecting to /api/health...</p>
            )}

            {healthStatus.status === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  API Connected Successfully
                </div>
                <div className="font-mono text-gray-700 bg-emerald-100/50 p-2 rounded">
                  {JSON.stringify(healthStatus.data, null, 2)}
                </div>
              </div>
            )}

            {healthStatus.status === 'error' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Backend Offline or Not Running
                </div>
                <p className="text-amber-700">
                  Start the server using <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">npm run dev</code> inside <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">server/</code>.
                </p>
                <p className="text-gray-500 text-[11px] font-mono mt-1">({healthStatus.error})</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-3 text-center border-t border-gray-100 text-xs text-gray-500">
          Ready for Phase 2: User and Admin feature modules
        </div>
      </div>
    </div>
  );
}

export default App;
