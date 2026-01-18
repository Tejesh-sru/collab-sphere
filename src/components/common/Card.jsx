/**
 * Card Component
 * Reusable card with multiple variants
 */
function Card({
  children,
  header,
  footer,
  variant = 'default',
  hoverable = false,
  className = '',
  bodyClassName = '',
  ...props
}) {
  const variantClasses = {
    default: 'card-custom',
    bordered: 'border',
    flat: 'border-0',
    elevated: 'card-custom shadow-lg',
  };

  return (
    <div
      className={`
        card ${variantClasses[variant]}
        ${hoverable ? 'hover-scale' : ''}
        ${className}
      `}
      {...props}
    >
      {header && (
        <div className="card-header bg-transparent border-bottom">
          {header}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className="card-footer bg-transparent border-top">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
