const IconButton = ({
  icon,
  tone = 'neutral',
  size = 32,
  title,
  disabled = false,
  onClick,
  style
}) => {
  const toneStyles = {
    neutral: { color: 'var(--text-secondary)', hoverColor: 'var(--primary)' },
    danger: { color: 'var(--danger)', hoverColor: '#b91c1c' },
    primary: { color: 'var(--primary)', hoverColor: 'var(--primary-dark)' },
    success: { color: 'var(--success)', hoverColor: '#059669' },
    onDark: { color: 'rgba(255,255,255,0.8)', hoverColor: 'rgba(255,255,255,1)' }
  };

  const baseStyle = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    borderRadius: 'var(--radius-round)',
    border: 'none',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: toneStyles[tone].color,
    transition: 'all var(--duration-base) var(--ease-standard)',
    opacity: disabled ? 0.45 : 1,
    ...style
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.currentTarget.style.color = toneStyles[tone].hoverColor;
      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = toneStyles[tone].color;
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled}
      onClick={onClick}
      title={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon name={icon} size={20} strokeWidth={1.75} />
    </button>
  );
};

Object.assign(window, { IconButton });
