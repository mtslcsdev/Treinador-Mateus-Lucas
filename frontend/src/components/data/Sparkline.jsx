const Sparkline = ({
  data = [],
  width = 96,
  height = 34,
  color = 'var(--primary)',
  fill = false,
  style
}) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const padding = 2;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * graphWidth;
    const y = padding + graphHeight - ((val - min) / range) * graphHeight;
    return [x, y];
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');

  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox={`0 0 ${width} ${height}`}
    >
      {fill && (
        <path
          d={`${pathData} L ${points[points.length - 1][0]} ${height} L ${points[0][0]} ${height} Z`}
          fill={color}
          opacity="0.1"
        />
      )}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Object.assign(window, { Sparkline });
