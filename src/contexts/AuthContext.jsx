import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create Auth Context
const AuthContext = createContext();

// Check if demo mode is enabled
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// Demo users for testing
const DEMO_USERS = [
  { email: 'demo@test.com', password: 'demo123', name: 'Demo User', uid: 'demo-user-1' },
  { email: 'john@test.com', password: 'john123', name: 'John Doe', uid: 'demo-user-2' },
  { email: 'jane@test.com', password: 'jane123', name: 'Jane Smith', uid: 'demo-user-3' },
];

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    if (DEMO_MODE) {
      // In demo mode, check localStorage for saved user
      const savedUser = localStorage.getItem('demoUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('demoUser');
        }
      }
      setLoading(false);
      return;
    }

    // For backend auth, check if token exists and get user info
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set token in axios header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Get current user from backend
          const response = await api.get('/users/me');
          if (response.data.success) {
            setUser(response.data.data);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
          }
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Sign up with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} displayName - User display name
   */
  const signup = async (email, password, displayName) => {
    try {
      setError(null);

      if (DEMO_MODE) {
        // Demo mode: simulate signup
        await new Promise(resolve => setTimeout(resolve, 500));
        const existingUser = DEMO_USERS.find(u => u.email === email);
        if (existingUser) {
          throw new Error('Email already in use');
        }
        const newUser = {
          uid: `demo-user-${Date.now()}`,
          email,
          displayName: displayName || email.split('@')[0],
          photoURL: null,
          emailVerified: true,
        };
        localStorage.setItem('demoUser', JSON.stringify(newUser));
        setUser(newUser);
        return { success: true, user: newUser };
      }

      // Call backend register endpoint
      const response = await api.post('/auth/register', {
        email,
        password,
        displayName,
      });

      if (response.data.success) {
        const { token, user: newUser } = response.data.data;
        // Store token
        localStorage.setItem('token', token);
        // Set axios default header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(newUser);
        return { success: true, user: newUser };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    try {
      setError(null);

      if (DEMO_MODE) {
        // Demo mode: check against demo users
        await new Promise(resolve => setTimeout(resolve, 500));
        const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (!demoUser) {
          throw new Error('Invalid email or password');
        }
        const userObj = {
          uid: demoUser.uid,
          email: demoUser.email,
          displayName: demoUser.name,
          photoURL: null,
          emailVerified: true,
        };
        localStorage.setItem('demoUser', JSON.stringify(userObj));
        setUser(userObj);
        return { success: true, user: userObj };
      }

      // Call backend login endpoint
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user: loggedInUser } = response.data.data;
        // Store token
        localStorage.setItem('token', token);
        // Set axios default header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(loggedInUser);
        return { success: true, user: loggedInUser };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign out the current user
   */
  const logout = async () => {
    try {
      setError(null);

      if (DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, 300));
        localStorage.removeItem('demoUser');
        setUser(null);
        return { success: true };
      }

      // Clear token and user state
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Send password reset email
   * @param {string} email - User email
   */
  const resetPassword = async (email) => {
    try {
      setError(null);

      if (DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[DEMO] Password reset email sent to ${email}`);
        return { success: true };
      }

      // Note: Backend doesn't have password reset endpoint yet
      // This would need to be implemented on the backend
      console.warn('Password reset not implemented on backend yet');
      return { success: false, error: 'Password reset not available' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   */
  const updateUserProfile = async (profileData) => {
    try {
      setError(null);

      if (DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('demoUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }

      // Call backend update profile endpoint
      const response = await api.put('/users/me', profileData);
      
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true, user: response.data.data };
      } else {
        throw new Error(response.data.message || 'Profile update failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);

      if (DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('[DEMO] Password changed successfully');
        return { success: true };
      }

      // Call backend change password endpoint
      const response = await api.post('/users/me/password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Password change failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Clear any auth errors
   */
  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    changePassword,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
