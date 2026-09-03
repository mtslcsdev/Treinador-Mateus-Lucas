const Input = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  invalid = false,
  mono = false,
  onDark = false,
  type = 'text',
  style
}) => {
  const baseStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: 'var(--text-13-5)',
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
    letterSpacing: mono ? '1px' : '0',
    border: `1.5px solid ${invalid ? 'var(--danger)' : 'var(--input-border)'}`,
    borderRadius: 'var(--radius-sm)',
    backgroundColor: onDark ? 'rgba(255,255,255,0.08)' : 'var(--input-bg)',
    color: onDark ? 'rgba(255,255,255,0.95)' : 'var(--text-primary)',
    transition: 'all var(--duration-base) var(--ease-standard)',
    boxSizing: 'border-box',
    outline: 'none',
    ...style
  };

  const handleFocus = (e) => {
    if (!disabled) {
      e.currentTarget.style.borderColor = 'var(--border-focus)';
      e.currentTarget.style.boxShadow = 'var(--focus-ring)';
      if (onDark) {
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.15)';
      }
    }
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = invalid ? 'var(--danger)' : 'var(--input-border)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '6px',
          fontSize: 'var(--text-12)',
          fontWeight: 'var(--weight-semibold)',
          color: onDark ? 'rgba(255,255,255,0.8)' : 'var(--text-primary)'
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={baseStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && (
        <div style={{
          color: 'var(--danger)',
          fontSize: 'var(--text-12)',
          marginTop: '4px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { Input });
