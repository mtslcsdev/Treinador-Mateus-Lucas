const StatItem = ({
  label,
  value,
  tone = 'success',
  style
}) => {
  const toneColors = {
    success: { bg: 'var(--success-light)', fg: 'var(--success)' },
    warning: { bg: 'var(--warning-light)', fg: 'var(--warning)' },
    danger: { bg: 'var(--danger-light)', fg: 'var(--danger)' }
  };

  const t = toneColors[tone] || toneColors.success;

  return (
    <div
      style={{
        background: t.bg,
        borderRadius: 'var(--radius-card)',
        padding: '16px',
        ...style
      }}
    >
      <div style={{
        fontSize: 'var(--text-12)',
        color: t.fg,
        fontWeight: 'var(--weight-semibold)',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 'var(--text-27)',
        fontWeight: 'var(--weight-black)',
        color: t.fg
      }}>
        {value}
      </div>
    </div>
  );
};

Object.assign(window, { StatItem });
