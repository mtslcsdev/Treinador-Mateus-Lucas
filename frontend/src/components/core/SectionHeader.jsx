const SectionHeader = ({
  title,
  subtitle,
  actions,
  style
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
        marginBottom: '20px',
        ...style
      }}
    >
      <div style={{ flex: 1 }}>
        <h2 style={{
          fontSize: 'var(--text-16)',
          fontWeight: 'var(--weight-bold)',
          margin: '0 0 6px 0',
          letterSpacing: 'var(--tracking-title)'
        }}>
          {title}
        </h2>
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
      {actions && (
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {actions}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { SectionHeader });
