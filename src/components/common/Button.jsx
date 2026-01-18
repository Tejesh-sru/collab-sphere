/**
 * Button Component
 * Reusable button with multiple variants
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  // Map variant to classes
  const variantClasses = {
    primary: 'btn-primary-custom',
    secondary: 'btn-secondary',
    outline: 'btn-outline-custom',
    ghost: 'btn btn-link',
    danger: 'btn btn-danger',
    success: 'btn btn-success',
    light: 'btn btn-light',
  };

  // Map size to classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const buttonClass = `
    btn ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-100' : ''}
    ${disabled || loading ? 'disabled' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <i className={`bi bi-${icon} me-2`}></i>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <i className={`bi bi-${icon} ms-2`}></i>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
