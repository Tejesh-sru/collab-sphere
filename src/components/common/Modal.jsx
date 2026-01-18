/**
 * Modal Component
 * Reusable Bootstrap modal wrapper
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = true,
  closeOnBackdrop = true,
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 'var(--cs-z-modal-backdrop)' }}
      ></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        onClick={handleBackdropClick}
        style={{ zIndex: 'var(--cs-z-modal)' }}
      >
        <div
          className={`modal-dialog ${sizeClasses[size]} ${centered ? 'modal-dialog-centered' : ''}`}
          role="document"
        >
          <div className="modal-content card-custom border-0">
            {/* Header */}
            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="modal-footer border-top">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
