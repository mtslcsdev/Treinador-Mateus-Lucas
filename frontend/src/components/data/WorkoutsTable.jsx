const WorkoutsTable = ({
  columns = [],
  rows = [],
  style
}) => {
  return (
    <div style={{
      overflowX: 'auto',
      ...style
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--text-13)'
      }}>
        <thead>
          <tr style={{
            background: 'linear-gradient(90deg, var(--header-gradient-from) 0%, var(--header-gradient-to) 100%)',
            color: 'white',
            borderLeft: '3px solid var(--header-rule)'
          }}>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 'var(--weight-semibold)',
                  fontSize: 'var(--text-12)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-eyebrow)'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: '1px solid var(--border)',
                transition: 'all var(--duration-base) var(--ease-standard)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                e.currentTarget.style.boxShadow = 'inset 0 0 8px rgba(15,58,125,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '12px 16px',
                    color: 'var(--text-primary)'
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Object.assign(window, { WorkoutsTable });
