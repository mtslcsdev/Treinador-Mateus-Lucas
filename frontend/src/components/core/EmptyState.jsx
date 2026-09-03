const EmptyState = ({
  icon,
  title,
  subtitle,
  style
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        ...style
      }}
    >
      {icon && (
        <div style={{
          fontSize: '40px',
          marginBottom: '16px'
        }}>
          {icon}
        </div>
      )}
      <h3 style={{
        fontSize: 'var(--text-16)',
        fontWeight: 'var(--weight-semibold)',
        margin: '0 0 8px 0',
        color: 'var(--text-primary)'
      }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{
          fontSize: 'var(--text-13)',
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

Object.assign(window, { EmptyState });
