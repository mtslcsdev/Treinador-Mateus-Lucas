const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  style
}) => {
  const variantStyles = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--text-on-primary)',
      border: 'none',
      boxShadow: '0 0 0 0 transparent'
    },
    success: {
      background: 'var(--success)',
      color: 'var(--text-on-primary)',
      border: 'none'
    },
    danger: {
      background: 'var(--danger)',
      color: 'var(--text-on-primary)',
      border: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--border)'
    },
    back: {
      background: 'var(--fill-neutral)',
      color: 'var(--text-on-primary)',
      border: 'none'
    },
    export: {
      background: '#0284c7',
      color: 'var(--text-on-primary)',
      border: 'none'
    },
    header: {
      background: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.95)',
      border: 'none'
    },
    template: {
      background: 'var(--accent)',
      color: 'var(--text-on-primary)',
      border: 'none'
    }
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: 'var(--text-12)' },
    md: { padding: '8px 16px', fontSize: 'var(--text-13)' },
    lg: { padding: '10px 20px', fontSize: 'var(--text-13)' }
  };

  const baseStyle = {
    borderRadius: 'var(--radius-sm)',
    fontWeight: 'var(--weight-semibold)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--duration-base) var(--ease-standard)',
    display: fullWidth ? 'block' : 'inline-block',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.45 : 1,
    transform: disabled ? 'none' : 'translateY(0)',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(var(--lift-hover))';
      if (variant !== 'ghost') {
        e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
      }
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none';
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

Object.assign(window, { Button });
