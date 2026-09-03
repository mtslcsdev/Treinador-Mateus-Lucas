const CycleCard = ({
  name,
  weeks,
  workouts,
  race,
  isTemplate = false,
  onClick,
  actions,
  style
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-card)',
        border: '1.5px solid var(--border)',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--duration-base) var(--ease-standard)',
        boxShadow: 'var(--shadow-card)',
        ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <h4 style={{ margin: 0, fontSize: 'var(--text-14)', fontWeight: 'var(--weight-semibold)' }}>
          {name}
        </h4>
        {isTemplate && (
          <span style={{
            fontSize: 'var(--text-10)',
            padding: '2px 6px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-xs)',
            fontWeight: 'var(--weight-semibold)'
          }}>
            TEMPLATE
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', fontSize: 'var(--text-12)', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        {weeks && <span>📅 {weeks} semanas</span>}
        {workouts && <span>🏃 {workouts} treinos</span>}
        {race && <span>🎯 {race}</span>}
      </div>

      {actions && (
        <div style={{ display: 'flex', gap: '4px' }}>
          {actions}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { CycleCard });
