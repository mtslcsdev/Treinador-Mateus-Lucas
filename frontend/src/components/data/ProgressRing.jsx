const ProgressRing = ({
  value = 0,
  size = 52,
  thickness = 4,
  label,
  style
}) => {
  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / 100) * circumference;

  let color = 'var(--danger)';
  if (value >= 80) color = 'var(--success)';
  else if (value >= 60) color = 'var(--warning)';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      ...style
    }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--gray-200)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset var(--duration-slow) var(--ease-standard)' }}
        />
      </svg>
      {label && (
        <span style={{
          fontSize: 'var(--text-12)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-secondary)'
        }}>
          {label}
        </span>
      )}
    </div>
  );
};

Object.assign(window, { ProgressRing });
