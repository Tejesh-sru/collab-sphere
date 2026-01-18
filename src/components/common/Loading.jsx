/**
 * Loading Component
 * Reusable loading spinner
 */
function Loading({ 
  size = 'md', 
  fullScreen = false, 
  text = 'Loading...',
  variant = 'primary' 
}) {
  const sizeClasses = {
    sm: { spinner: 'spinner-border-sm', container: 'py-3' },
    md: { spinner: '', container: 'py-5' },
    lg: { spinner: 'spinner-lg', container: 'py-5' },
  };

  const content = (
    <div className={`text-center ${sizeClasses[size].container}`}>
      <div 
        className={`spinner-border text-${variant} ${sizeClasses[size].spinner}`} 
        role="status"
      >
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ 
          backgroundColor: 'var(--cs-bg-primary)', 
          zIndex: 'var(--cs-z-modal)' 
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}

export default Loading;
