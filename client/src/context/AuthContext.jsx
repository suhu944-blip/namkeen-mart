import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('namkeen_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('namkeen_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync / verify auth on startup
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('namkeen_token');
      if (storedToken) {
        try {
          const res = await authService.getMe();
          setUser(res.data.user);
          localStorage.setItem('namkeen_user', JSON.stringify(res.data.user));
        } catch {
          // Token is expired or invalid
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const { user: loggedInUser, token: authToken } = data.data;

    setUser(loggedInUser);
    setToken(authToken);
    localStorage.setItem('namkeen_token', authToken);
    localStorage.setItem('namkeen_user', JSON.stringify(loggedInUser));

    return loggedInUser;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    const { user: registeredUser, token: authToken } = data.data;

    setUser(registeredUser);
    setToken(authToken);
    localStorage.setItem('namkeen_token', authToken);
    localStorage.setItem('namkeen_user', JSON.stringify(registeredUser));

    return registeredUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('namkeen_token');
    localStorage.removeItem('namkeen_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
