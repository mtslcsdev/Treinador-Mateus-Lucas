const FeedbackChip = ({
  level = 'normal',
  children,
  style
}) => {
  const levelStyles = {
    'muito-facil': { bg: '#dcfce7', fg: '#15803d', icon: '😄' },
    facil: { bg: '#bbf7d0', fg: '#065f46', icon: '🙂' },
    normal: { bg: '#fef3c7', fg: '#92400e', icon: '😐' },
    dificil: { bg: '#fed7aa', fg: '#7c2d12', icon: '😓' },
    'muito-dificil': { bg: '#fecaca', fg: '#991b1b', icon: '😤' }
  };

  const l = levelStyles[level] || levelStyles.normal;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-10)',
        fontWeight: 'var(--weight-semibold)',
        backgroundColor: l.bg,
        color: l.fg,
        ...style
      }}
    >
      <span>{l.icon}</span>
      {children}
    </span>
  );
};

Object.assign(window, { FeedbackChip });
