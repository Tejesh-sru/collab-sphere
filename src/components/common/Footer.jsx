import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Responsive footer with links and social icons
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'FAQ', href: '#faq' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: 'bi-twitter-x', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'bi-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'bi-github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'bi-instagram', href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="py-5" style={{ backgroundColor: 'var(--cs-bg-tertiary)' }}>
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
              <div className="icon-box" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-globe2"></i>
              </div>
              <span className="text-gradient fw-bold fs-4">CollabSphere</span>
            </Link>
            <p className="text-muted mb-4">
              Empowering students to connect, collaborate, and grow together.
              Build your professional network and find mentors who can guide your journey.
            </p>
            {/* Social Links */}
            <div className="d-flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                  aria-label={social.label}
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3">Product</h6>
            <ul className="list-unstyled">
              {footerLinks.product.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="text-muted text-decoration-none hover-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              {footerLinks.company.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="text-muted text-decoration-none hover-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="text-muted text-decoration-none hover-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="text-muted text-decoration-none hover-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-4" style={{ borderColor: 'var(--cs-border)' }} />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted mb-0 small">
              © {currentYear} CollabSphere. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p className="text-muted mb-0 small">
              Made with <i className="bi bi-heart-fill text-danger"></i> for students worldwide
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hover-link:hover {
          color: var(--cs-primary) !important;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
