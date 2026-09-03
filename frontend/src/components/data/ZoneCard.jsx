const ZoneCard = ({
  zone = 'Z1',
  pace,
  speed,
  name,
  style
}) => {
  const zoneColors = {
    Z1: 'var(--z1-on-dark)',
    Z2: 'var(--z2-on-dark)',
    Z3: 'var(--z3-on-dark)',
    Z4: 'var(--z4-on-dark)',
    Z5: 'var(--z5-on-dark)'
  };

  const zoneEmoji = {
    Z1: '🟢',
    Z2: '🔵',
    Z3: '🟡',
    Z4: '🟠',
    Z5: '🔴'
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-card)',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.15)',
        cursor: 'pointer',
        transition: 'all var(--duration-base) var(--ease-standard)',
        borderLeft: `3px solid ${zoneColors[zone]}`,
        ...style
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <span style={{ fontSize: '20px' }}>{zoneEmoji[zone]}</span>
        <span style={{
          fontWeight: 'var(--weight-semibold)',
          fontSize: 'var(--text-13)',
          color: 'rgba(255,255,255,0.9)'
        }}>
          {zone}
        </span>
      </div>
      {pace && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-22)',
          fontWeight: 'var(--weight-black)',
          color: zoneColors[zone],
          marginBottom: '6px',
          letterSpacing: '1px'
        }}>
          {pace}
        </div>
      )}
      {speed && (
        <div style={{
          fontSize: 'var(--text-12)',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'var(--font-mono)'
        }}>
          {speed}
        </div>
      )}
      {name && (
        <div style={{
          fontSize: 'var(--text-12)',
          color: 'rgba(255,255,255,0.7)',
          marginTop: '8px'
        }}>
          {name}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ZoneCard });
