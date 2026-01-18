/**
 * Input Component
 * Reusable form input with label and validation
 */
function Input({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label fw-medium">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <div className={icon ? 'input-group' : ''}>
        {icon && (
          <span className="input-group-text bg-transparent">
            <i className={`bi bi-${icon} text-muted`}></i>
          </span>
        )}
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`form-control form-control-custom ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
      </div>
      {helperText && !error && (
        <div className="form-text text-muted small">
          {helperText}
        </div>
      )}
    </div>
  );
}

export default Input;
