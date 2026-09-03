const ExecutionStats = ({
  data = {},
  source,
  style
}) => {
  const stats = [
    { label: 'Distância', value: data.dist, icon: 'ruler' },
    { label: 'Tempo', value: data.tempo, icon: 'timer' },
    { label: 'Pace', value: data.pace, icon: 'activity' },
    { label: 'FC', value: data.fc, icon: 'heart-pulse' },
    { label: 'Cadência', value: data.cadencia, icon: 'watch' }
  ].filter(s => s.value);

  return (
    <div style={{ ...style }}>
      {source && (
        <div style={{
          fontSize: 'var(--text-11)',
          color: 'var(--text-secondary)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Icon name="watch" size={14} />
          {source}
        </div>
      )}
      <div style={{
        background: 'var(--bg-muted)',
        borderRadius: 'var(--radius-card)',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '12px'
      }}>
        {stats.map((stat, i) => (
          <div key={i}>
            <div style={{
              fontSize: 'var(--text-10)',
              color: 'var(--text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: 'var(--weight-semibold)'
            }}>
              {stat.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-13)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)'
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ExecutionStats });
