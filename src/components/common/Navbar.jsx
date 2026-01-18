import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

/**
 * Navbar Component
 * Responsive navigation bar with theme toggle and auth state
 */
function Navbar({ variant = 'default' }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom fixed-top ${
      variant === 'transparent' ? 'bg-transparent' : ''
    }`}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="icon-box" style={{ width: '36px', height: '36px' }}>
            <i className="bi bi-globe2"></i>
          </div>
          <span className="text-gradient fw-bold">CollabSphere</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? (
            // Authenticated Navigation
            <>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/dashboard') ? 'active text-primary' : ''}`} 
                    to="/dashboard"
                  >
                    <i className="bi bi-house-door me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/explore') ? 'active text-primary' : ''}`} 
                    to="/explore"
                  >
                    <i className="bi bi-search me-1"></i>
                    Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/teams') ? 'active text-primary' : ''}`} 
                    to="/teams"
                  >
                    <i className="bi bi-people me-1"></i>
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/connections') ? 'active text-primary' : ''}`} 
                    to="/connections"
                  >
                    <i className="bi bi-people-fill me-1"></i>
                    Connections
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/profile') ? 'active text-primary' : ''}`} 
                    to="/profile"
                  >
                    <i className="bi bi-person me-1"></i>
                    Profile
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3">
                {/* Theme Toggle */}
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'} fs-5`}></i>
                </button>

                {/* Notifications */}
                <NotificationDropdown />

                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-link p-0 d-flex align-items-center gap-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=4f46e5&color=fff`}
                      alt="Avatar"
                      className="avatar avatar-sm"
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text">
                        <strong>{user?.displayName || 'User'}</strong>
                        <br />
                        <small className="text-muted">{user?.email}</small>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        <i className="bi bi-gear me-2"></i>
                        Settings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            // Public Navigation
            <>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#features">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#how-it-works">How It Works</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testimonials">Testimonials</a>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3">
                {/* Theme Toggle */}
                <button
                  className="btn btn-link text-secondary p-0"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'} fs-5`}></i>
                </button>

                {/* Auth Buttons */}
                <Link to="/login" className="btn btn-outline-custom btn-sm">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary-custom btn-sm">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
