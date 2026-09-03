const Card = ({
  children,
  padding = '2rem',
  variant = 'surface',
  style
}) => {
  const variantStyles = {
    surface: {
      background: 'var(--card-bg)',
      borderColor: 'var(--border)',
      gradientStart: null,
      gradientEnd: null
    },
    navy: {
      background: 'linear-gradient(135deg, var(--header-gradient-from) 0%, var(--header-gradient-to) 100%)',
      borderColor: 'transparent',
      color: 'white'
    }
  };

  const v = variantStyles[variant];

  return (
    <div
      style={{
        background: v.background,
        borderRadius: 'var(--radius-card)',
        border: `1px solid ${v.borderColor}`,
        padding,
        boxShadow: 'var(--shadow-card)',
        color: v.color || 'inherit',
        ...style
      }}
    >
      {children}
    </div>
  );
};

Object.assign(window, { Card });
