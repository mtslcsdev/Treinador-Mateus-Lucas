const ValidationItem = ({
  level = 'info',
  title,
  description,
  action,
  style
}) => {
  const levelStyles = {
    erro: {
      bg: 'var(--danger-light)',
      fg: 'var(--danger)',
      icon: 'alert-circle',
      borderColor: 'var(--danger)'
    },
    aviso: {
      bg: 'var(--warning-light)',
      fg: 'var(--warning)',
      icon: 'triangle-alert',
      borderColor: 'var(--warning)'
    },
    info: {
      bg: 'var(--primary-light)',
      fg: 'var(--primary)',
      icon: 'info',
      borderColor: 'var(--primary)'
    }
  };

  const l = levelStyles[level] || levelStyles.info;

  return (
    <div
      style={{
        background: l.bg,
        borderLeft: `3px solid ${l.borderColor}`,
        padding: '16px',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        ...style
      }}
    >
      <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
        <Icon name={l.icon} size={18} color={l.fg} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{
            margin: 0,
            fontSize: 'var(--text-13)',
            fontWeight: 'var(--weight-semibold)',
            color: l.fg,
            marginBottom: '4px'
          }}>
            {title}
          </h4>
          {description && (
            <p style={{
              margin: 0,
              fontSize: 'var(--text-12)',
              color: 'inherit',
              opacity: 0.85
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {action && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ValidationItem });
