const Toggle = ({
  checked = false,
  onChange,
  label,
  onDark = false,
  style
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      ...style
    }}>
      {label && (
        <label style={{
          fontSize: 'var(--text-13)',
          fontWeight: 'var(--weight-medium)',
          color: onDark ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)',
          cursor: 'pointer',
          order: -1
        }}>
          {label}
        </label>
      )}
      <button
        onClick={() => onChange?.(!checked)}
        style={{
          width: '44px',
          height: '22px',
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          background: checked ? 'var(--success)' : 'var(--gray-300)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background var(--duration-base) var(--ease-standard)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '24px' : '2px',
            width: '18px',
            height: '18px',
            borderRadius: 'var(--radius-round)',
            background: 'white',
            transition: 'left var(--duration-base) var(--ease-standard)'
          }}
        />
      </button>
    </div>
  );
};

Object.assign(window, { Toggle });
