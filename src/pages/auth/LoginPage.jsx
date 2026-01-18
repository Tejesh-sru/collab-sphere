import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input, Button, Alert } from '../../components/common';

/**
 * Login Page
 * User authentication with email and password
 */
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resetPassword, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Get redirect path from location state
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    clearError();
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      setFormErrors({ resetEmail: 'Please enter a valid email' });
      return;
    }
    
    setIsSubmitting(true);
    const result = await resetPassword(resetEmail);
    setIsSubmitting(false);
    
    if (result.success) {
      setResetSuccess(true);
    }
  };

  return (
    <div className="min-vh-100 d-flex">
      {/* Left Side - Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-5">
            <div className="icon-box" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-globe2"></i>
            </div>
            <span className="text-gradient fw-bold fs-4">CollabSphere</span>
          </Link>

          {showForgotPassword ? (
            // Forgot Password Form
            <>
              <h2 className="fw-bold mb-2">Reset Password</h2>
              <p className="text-muted mb-4">
                Enter your email and we'll send you a reset link.
              </p>

              {resetSuccess ? (
                <Alert
                  type="success"
                  title="Email Sent!"
                  message="Check your inbox for the password reset link."
                />
              ) : (
                <form onSubmit={handleForgotPassword}>
                  {error && (
                    <Alert type="error" message={error} className="mb-4" />
                  )}

                  <Input
                    type="email"
                    name="resetEmail"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    error={formErrors.resetEmail}
                    icon="envelope"
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isSubmitting}
                    className="mb-3"
                  >
                    Send Reset Link
                  </Button>
                </form>
              )}

              <button
                className="btn btn-link p-0 text-muted"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSuccess(false);
                  clearError();
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Login
              </button>
            </>
          ) : (
            // Login Form
            <>
              <h2 className="fw-bold mb-2">Welcome Back!</h2>
              <p className="text-muted mb-4">
                Sign in to continue your journey on CollabSphere.
              </p>

              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert type="error" message={error} className="mb-4" />
                )}

                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  icon="envelope"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  icon="lock"
                  required
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label text-muted small" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link p-0 small"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting || loading}
                  className="mb-4"
                >
                  Sign In
                </Button>

                {/* Divider */}
                <div className="d-flex align-items-center mb-4">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted small">or continue with</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Social Login Buttons */}
                <div className="d-flex gap-3 mb-4">
                  <button type="button" className="btn btn-outline-secondary flex-grow-1">
                    <i className="bi bi-google me-2"></i>
                    Google
                  </button>
                  <button type="button" className="btn btn-outline-secondary flex-grow-1">
                    <i className="bi bi-github me-2"></i>
                    GitHub
                  </button>
                </div>

                <p className="text-center text-muted mb-0">
                  Don't have an account?{' '}
                  <Link to="/signup" className="link-custom">
                    Sign up for free
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div 
        className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          width: '45%',
          background: 'linear-gradient(135deg, var(--cs-primary) 0%, var(--cs-secondary) 100%)',
        }}
      >
        <div className="text-center" style={{ maxWidth: '400px' }}>
          <i className="bi bi-people-fill mb-4" style={{ fontSize: '80px', opacity: 0.9 }}></i>
          <h3 className="fw-bold mb-3">Connect with Peers & Mentors</h3>
          <p className="opacity-75">
            Join a community of ambitious students building their future together. 
            Find mentors, collaborate on projects, and grow your network.
          </p>
          
          {/* Feature List */}
          <div className="mt-5 text-start">
            {[
              'Smart networking with AI matching',
              'Expert mentorship programs',
              'Real-time project collaboration',
            ].map((feature, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-check-circle-fill text-white"></i>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
