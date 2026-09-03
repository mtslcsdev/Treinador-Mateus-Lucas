const RaceTargetBanner = ({
  name,
  detail,
  days,
  actions,
  style
}) => {
  const textColor = days > 30 ? 'var(--success)' : days > 14 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fef9c3 0%, #fefce8 100%)',
        borderLeft: `4px solid var(--warning)`,
        padding: '16px',
        borderRadius: 'var(--radius-card)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        ...style
      }}
    >
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px'
        }}>
          <Icon name="target" size={18} color="var(--warning)" />
          <span style={{
            fontSize: 'var(--text-13)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)'
          }}>
            {name}
          </span>
        </div>
        {detail && (
          <p style={{
            fontSize: 'var(--text-12)',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            {detail}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {days !== undefined && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'var(--text-20)',
              fontWeight: 'var(--weight-black)',
              color: textColor
            }}>
              {days}
            </div>
            <div style={{
              fontSize: 'var(--text-10)',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-eyebrow)'
            }}>
              dias restantes
            </div>
          </div>
        )}
        {actions && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { RaceTargetBanner });
