const DayCard = ({
  weekday,
  day,
  status = 'prescrito',
  summary,
  selected = false,
  onClick,
  style
}) => {
  const statusConfig = {
    feito: { bg: '#dcfce7', fg: '#15803d', icon: '✓' },
    parcial: { bg: '#fef3c7', fg: '#92400e', icon: '◐' },
    perdido: { bg: '#fee2e2', fg: '#991b1b', icon: '✗' },
    prescrito: { bg: 'var(--bg-muted)', fg: 'var(--text-secondary)', icon: '◦' },
    descanso: { bg: '#e5e7eb', fg: '#6b7280', icon: '—' }
  };

  const s = statusConfig[status] || statusConfig.prescrito;

  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? s.bg : 'var(--card-bg)',
        borderRadius: 'var(--radius-card)',
        border: `1px solid ${selected ? s.fg : 'var(--border)'}`,
        padding: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--duration-base) var(--ease-standard)',
        textAlign: 'center',
        ...style
      }}
    >
      <div style={{
        fontSize: 'var(--text-20)',
        fontWeight: 'var(--weight-bold)',
        color: s.fg,
        marginBottom: '4px'
      }}>
        {s.icon}
      </div>
      <div style={{
        fontSize: 'var(--text-11)',
        fontWeight: 'var(--weight-semibold)',
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        marginBottom: '2px'
      }}>
        {weekday}
      </div>
      {day && (
        <div style={{
          fontSize: 'var(--text-12)',
          color: 'var(--text-secondary)'
        }}>
          {day}
        </div>
      )}
      {summary && (
        <div style={{
          fontSize: 'var(--text-10)',
          color: 'var(--text-muted)',
          marginTop: '4px'
        }}>
          {summary}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { DayCard });
