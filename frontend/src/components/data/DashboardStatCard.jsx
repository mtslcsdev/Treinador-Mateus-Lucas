const DashboardStatCard = ({
  icon,
  label,
  value,
  meta,
  style
}) => {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
        ...style
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        {icon && (
          <Icon name={icon} size={24} color="var(--primary)" />
        )}
        <div>
          <div style={{
            fontSize: 'var(--text-11)',
            color: 'var(--text-muted)',
            fontWeight: 'var(--weight-semibold)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-eyebrow)',
            marginBottom: '4px'
          }}>
            {label}
          </div>
          <div style={{
            fontSize: 'var(--text-27)',
            fontWeight: 'var(--weight-black)',
            color: 'var(--primary)',
            lineHeight: '1'
          }}>
            {value}
          </div>
        </div>
      </div>
      {meta && (
        <p style={{
          fontSize: 'var(--text-12)',
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          {meta}
        </p>
      )}
    </div>
  );
};

Object.assign(window, { DashboardStatCard });
