const VolumeChart = ({
  title,
  note,
  data = [],
  style
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ ...style }}>
        {title && <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>}
        <p style={{ color: 'var(--text-muted)' }}>Sem dados</p>
      </div>
    );
  }

  const max = Math.max(...data.map(d => d.value || 0));

  return (
    <div style={{ ...style }}>
      {title && <h3 style={{ margin: '0 0 12px 0', fontSize: 'var(--text-16)', fontWeight: 'var(--weight-semibold)' }}>{title}</h3>}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '120px' }}>
        {data.map((item, i) => {
          const height = max > 0 ? (item.value / max) * 100 : 10;
          const isEmpty = item.value === 0;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '100%',
                height: `${height}%`,
                background: isEmpty ? '#e5e7eb' : 'linear-gradient(180deg, var(--accent) 0%, var(--primary) 100%)',
                borderRadius: 'var(--radius-xs)',
                minHeight: '4px',
                transition: 'all var(--duration-base) var(--ease-standard)'
              }} />
              <span style={{
                fontSize: 'var(--text-9)',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      {note && (
        <p style={{
          fontSize: 'var(--text-12)',
          color: 'var(--text-secondary)',
          margin: '12px 0 0 0'
        }}>
          {note}
        </p>
      )}
    </div>
  );
};

Object.assign(window, { VolumeChart });
