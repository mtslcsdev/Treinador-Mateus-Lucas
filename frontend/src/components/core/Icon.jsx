const Icon = ({
  name,
  size = 18,
  strokeWidth = 1.75,
  color,
  style
}) => {
  const iconName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-./g, x => x[1].toUpperCase());
  const IconComponent = lucide[iconName];

  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      style={style}
    />
  );
};

Object.assign(window, { Icon });
