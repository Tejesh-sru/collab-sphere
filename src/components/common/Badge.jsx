/**
 * Badge Component
 * Reusable badge/tag component
 */
function Badge({
  children,
  variant = 'primary',
  size = 'md',
  pill = true,
  removable = false,
  onRemove,
  onClick,
  icon,
  className = '',
  style = {},
}) {
  const variantClasses = {
    primary: 'bg-primary-subtle text-primary',
    secondary: 'bg-secondary-subtle text-secondary',
    success: 'bg-success-subtle text-success',
    danger: 'bg-danger-subtle text-danger',
    warning: 'bg-warning-subtle text-warning',
    info: 'bg-info-subtle text-info',
    light: 'bg-light text-dark',
    dark: 'bg-dark text-white',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 small',
    md: 'px-2 py-1',
    lg: 'px-3 py-2',
  };

  return (
    <span
      className={`
        badge ${variantClasses[variant]} ${sizeClasses[size]}
        ${pill ? 'rounded-pill' : 'rounded'}
        ${removable ? 'd-inline-flex align-items-center gap-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <i className={`bi bi-${icon} me-1`}></i>}
      {children}
      {removable && (
        <button
          type="button"
          className="btn-close btn-close-sm ms-1"
          onClick={onRemove}
          aria-label="Remove"
          style={{ fontSize: '0.5rem' }}
        ></button>
      )}
    </span>
  );
}

export default Badge;
