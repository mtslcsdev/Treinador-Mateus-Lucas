const Breadcrumb = ({
  items = [],
  onNavigate,
  style
}) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '12px var(--padding-desktop)',
        fontSize: 'var(--text-13)',
        ...style
      }}
    >
      <div style={{
        maxWidth: 'var(--max-width-desktop)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && (
              <span style={{ color: 'var(--text-muted)' }}>›</span>
            )}
            {i < items.length - 1 ? (
              <button
                onClick={() => onNavigate?.(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 'var(--weight-medium)',
                  padding: 0,
                  font: 'inherit'
                }}
              >
                {item}
              </button>
            ) : (
              <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--weight-medium)' }}>
                {item}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

Object.assign(window, { Breadcrumb });
