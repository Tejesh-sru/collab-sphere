import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input, Button, Alert } from '../../components/common';

/**
 * Signup Page
 * User registration with email, password, and profile info
 */
function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    clearError();
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const result = await signup(formData.email, formData.password, formData.fullName.trim());
    setIsSubmitting(false);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    const levels = [
      { label: 'Very Weak', color: 'danger' },
      { label: 'Weak', color: 'danger' },
      { label: 'Fair', color: 'warning' },
      { label: 'Good', color: 'info' },
      { label: 'Strong', color: 'success' },
    ];
    
    return { strength, ...levels[Math.min(strength - 1, 4)] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-vh-100 d-flex">
      {/* Left Side - Image/Gradient */}
      <div 
        className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          width: '45%',
          background: 'linear-gradient(135deg, var(--cs-secondary) 0%, var(--cs-primary) 100%)',
        }}
      >
        <div className="text-center" style={{ maxWidth: '400px' }}>
          <i className="bi bi-rocket-takeoff-fill mb-4" style={{ fontSize: '80px', opacity: 0.9 }}></i>
          <h3 className="fw-bold mb-3">Start Your Journey Today</h3>
          <p className="opacity-75">
            Join thousands of students who are already building their professional 
            network and finding amazing opportunities.
          </p>
          
          {/* Testimonial */}
          <div className="card bg-white bg-opacity-10 border-0 p-4 mt-5 text-start">
            <p className="mb-3" style={{ fontStyle: 'italic' }}>
              "CollabSphere helped me connect with my mentor who guided me to land 
              my dream internship at Google!"
            </p>
            <div className="d-flex align-items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="User"
                className="rounded-circle"
              />
              <div>
                <p className="mb-0 fw-medium">Alex Thompson</p>
                <p className="mb-0 small opacity-75">Stanford University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-5">
            <div className="icon-box" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-globe2"></i>
            </div>
            <span className="text-gradient fw-bold fs-4">CollabSphere</span>
          </Link>

          <h2 className="fw-bold mb-2">Create Your Account</h2>
          <p className="text-muted mb-4">
            Join the community and start building your network.
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <Alert type="error" message={error} className="mb-4" />
            )}

            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              error={formErrors.fullName}
              icon="person"
              required
            />

            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              icon="envelope"
              helperText="We'll never share your email with anyone."
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              icon="lock"
              required
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mb-3">
                <div className="d-flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`flex-grow-1 rounded-pill`}
                      style={{
                        height: '4px',
                        backgroundColor: level <= passwordStrength.strength
                          ? `var(--bs-${passwordStrength.color})`
                          : 'var(--cs-border)',
                      }}
                    ></div>
                  ))}
                </div>
                <small className={`text-${passwordStrength.color}`}>
                  {passwordStrength.label}
                </small>
              </div>
            )}

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              icon="shield-lock"
              required
            />

            {/* Terms Checkbox */}
            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${formErrors.agreeToTerms ? 'is-invalid' : ''}`}
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label text-muted small" htmlFor="agreeToTerms">
                  I agree to the{' '}
                  <Link to="/terms" className="link-custom">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="link-custom">Privacy Policy</Link>
                </label>
                {formErrors.agreeToTerms && (
                  <div className="invalid-feedback d-block">
                    {formErrors.agreeToTerms}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting || loading}
              className="mb-4"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="d-flex align-items-center mb-4">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small">or sign up with</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Social Signup Buttons */}
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
              Already have an account?{' '}
              <Link to="/login" className="link-custom">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
