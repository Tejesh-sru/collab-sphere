import { useState, useEffect } from 'react';

/**
 * Alert Component
 * Dismissible alert messages
 */
function Alert({
  type = 'info',
  message,
  title,
  dismissible = true,
  autoClose = false,
  autoCloseDelay = 5000,
  onClose,
  icon,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto close functionality
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  // Map type to Bootstrap classes and icons
  const typeConfig = {
    success: { class: 'alert-success', icon: 'check-circle-fill' },
    error: { class: 'alert-danger', icon: 'exclamation-triangle-fill' },
    warning: { class: 'alert-warning', icon: 'exclamation-circle-fill' },
    info: { class: 'alert-info', icon: 'info-circle-fill' },
  };

  const config = typeConfig[type] || typeConfig.info;
  const displayIcon = icon || config.icon;

  return (
    <div
      className={`alert ${config.class} ${dismissible ? 'alert-dismissible' : ''} fade show d-flex align-items-center ${className}`}
      role="alert"
    >
      <i className={`bi bi-${displayIcon} me-2 flex-shrink-0`}></i>
      <div className="flex-grow-1">
        {title && <strong className="me-2">{title}</strong>}
        {message}
      </div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}

export default Alert;
