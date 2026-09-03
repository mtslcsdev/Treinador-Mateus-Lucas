const WorkoutCard = ({
  weekday = 'TER',
  day,
  month = 'AGO',
  badge,
  phase,
  description,
  chips = [],
  actions,
  style
}) => {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-card)',
        border: '1.5px solid var(--border)',
        padding: '16px',
        ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              fontSize: 'var(--text-11)',
              fontWeight: 'var(--weight-bold)',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              minWidth: '60px'
            }}>
              {weekday}
              {day && ` ${day}/${month}`}
            </div>
            {badge && <div>{badge}</div>}
            {phase && <PhaseBadge phase={phase} />}
          </div>
          {description && (
            <p style={{
              margin: 0,
              fontSize: 'var(--text-13)',
              color: 'var(--text-primary)',
              lineHeight: 'var(--leading-relaxed)',
              whiteSpace: 'pre-wrap'
            }}>
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {actions}
          </div>
        )}
      </div>
      {chips && chips.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {chips}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { WorkoutCard });
