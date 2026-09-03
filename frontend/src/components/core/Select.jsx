const Select = ({
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  style
}) => {
  const processedOptions = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '8px 12px',
        fontSize: 'var(--text-13-5)',
        border: `1.5px solid var(--input-border)`,
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--input-bg)',
        color: 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-sans)',
        ...style
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {processedOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

Object.assign(window, { Select });
