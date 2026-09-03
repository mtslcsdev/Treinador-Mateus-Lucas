const PhaseBadge = ({
  phase = 'Base',
  style
}) => {
  const phaseStyles = {
    Base: { bg: '#dbeafe', fg: '#0c4a6e' },
    Específico: { bg: '#fed7aa', fg: '#7c2d12' },
    Polimento: { bg: '#fce7f3', fg: '#831843' }
  };

  const p = phaseStyles[phase] || phaseStyles.Base;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: 'var(--radius-xs)',
        fontSize: 'var(--text-10)',
        fontWeight: 'var(--weight-semibold)',
        backgroundColor: p.bg,
        color: p.fg,
        ...style
      }}
    >
      {phase}
    </span>
  );
};

Object.assign(window, { PhaseBadge });
