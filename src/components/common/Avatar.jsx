/**
 * Avatar Component
 * User avatar with fallback
 */
function Avatar({
  src,
  alt = 'User avatar',
  name,
  size = 'md',
  status,
  className = '',
}) {
  const sizeClasses = {
    xs: 'avatar-sm',
    sm: 'avatar-sm',
    md: 'avatar',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
    '2xl': 'avatar-2xl',
  };

  // Generate fallback URL from name
  const fallbackUrl = name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`
    : `https://ui-avatars.com/api/?name=U&background=6b7280&color=fff`;

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-secondary',
    busy: 'bg-danger',
    away: 'bg-warning',
  };

  return (
    <div className={`position-relative d-inline-block ${className}`}>
      <img
        src={src || fallbackUrl}
        alt={alt}
        className={`${sizeClasses[size]} rounded-circle object-fit-cover`}
        onError={(e) => {
          e.target.src = fallbackUrl;
        }}
      />
      {status && (
        <span
          className={`position-absolute bottom-0 end-0 ${statusColors[status]} rounded-circle border border-2 border-white`}
          style={{
            width: size === 'lg' || size === 'xl' ? '14px' : '10px',
            height: size === 'lg' || size === 'xl' ? '14px' : '10px',
          }}
        ></span>
      )}
    </div>
  );
}

export default Avatar;
