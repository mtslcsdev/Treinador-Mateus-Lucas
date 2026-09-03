const WeekNav = ({
  label,
  sub,
  onPrev,
  onNext,
  actions,
  style
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        marginBottom: '20px',
        ...style
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
        <button
          onClick={onPrev}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          title="Semana anterior"
        >
          <Icon name="chevron-left" size={20} color="var(--primary)" />
        </button>
        <div>
          <div style={{
            fontSize: 'var(--text-13)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)'
          }}>
            {label}
          </div>
          {sub && (
            <div style={{
              fontSize: 'var(--text-12)',
              color: 'var(--text-secondary)'
            }}>
              {sub}
            </div>
          )}
        </div>
        <button
          onClick={onNext}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          title="Próxima semana"
        >
          <Icon name="chevron-right" size={20} color="var(--primary)" />
        </button>
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {actions}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { WeekNav });
