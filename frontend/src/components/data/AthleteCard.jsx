const AthleteCard = ({
  name,
  cycles,
  workouts,
  hasNotes = false,
  selected = false,
  onClick,
  actions,
  adherence = 0,
  trend = [],
  nextWorkout,
  testPace,
  style
}) => {
  const adherenceColor = adherence >= 80 ? 'var(--success)' : adherence >= 50 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-card-athlete)',
        border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--duration-slow) var(--ease-standard)',
        boxShadow: selected ? 'var(--shadow-card-athlete-hover)' : 'var(--shadow-card-athlete)',
        position: 'relative',
        ...style
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
        borderRadius: 'var(--radius-card-athlete) var(--radius-card-athlete) 0 0'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 'var(--text-16)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>
            {name}
          </h3>
          {nextWorkout && (
            <p style={{ margin: '6px 0 0 0', fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>
              📅 {nextWorkout}
            </p>
          )}
        </div>
        {actions && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {actions}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: 'var(--text-11)', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)' }}>
            Aderência
          </div>
          <ProgressRing value={adherence} size={40} thickness={3} />
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-11)', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)' }}>
            Teste 3km
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-16)', fontWeight: 'var(--weight-bold)', color: 'var(--primary)' }}>
            {testPace || '—'}
          </div>
        </div>
      </div>

      {trend && trend.length > 0 && (
        <div>
          <div style={{ fontSize: 'var(--text-11)', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)' }}>
            Tendência (8 semanas)
          </div>
          <Sparkline data={trend} width={86} height={26} color={adherenceColor} fill />
        </div>
      )}
    </div>
  );
};

Object.assign(window, { AthleteCard });
