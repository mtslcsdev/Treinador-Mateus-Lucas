const TrainingTypeBadge = ({
  type = 'default',
  children,
  style
}) => {
  const typeStyles = {
    leve: { bg: '#dcfce7', fg: '#15803d' },
    fartlek: { bg: '#dbeafe', fg: '#0369a1' },
    progressivo: { bg: '#fef3c7', fg: '#92400e' },
    intervalado: { bg: '#fecaca', fg: '#991b1b' },
    repeticoes: { bg: '#e9d5ff', fg: '#6b21a8' },
    bloco: { bg: '#c7d2fe', fg: '#3730a3' },
    longao: { bg: '#bbf7d0', fg: '#065f46' },
    ritmado: { bg: '#fbcfe8', fg: '#9d174d' },
    trt: { bg: '#bfdbfe', fg: '#1e40af' },
    default: { bg: '#f3f4f6', fg: '#374151' }
  };

  const t = typeStyles[type] || typeStyles.default;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-10)',
        fontWeight: 'var(--weight-semibold)',
        backgroundColor: t.bg,
        color: t.fg,
        whiteSpace: 'nowrap',
        ...style
      }}
    >
      {children || type}
    </span>
  );
};

Object.assign(window, { TrainingTypeBadge });
