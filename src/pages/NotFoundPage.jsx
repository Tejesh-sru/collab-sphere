import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page
 */
function NotFoundPage() {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'var(--cs-bg-secondary)' }}
    >
      <div className="text-center">
        <div className="mb-4">
          <i 
            className="bi bi-exclamation-triangle text-warning"
            style={{ fontSize: '120px' }}
          ></i>
        </div>
        
        <h1 className="display-1 fw-bold mb-2">404</h1>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/" className="btn btn-primary-custom">
            <i className="bi bi-house me-2"></i>
            Go Home
          </Link>
          <Link to="/explore" className="btn btn-outline-custom">
            <i className="bi bi-search me-2"></i>
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
