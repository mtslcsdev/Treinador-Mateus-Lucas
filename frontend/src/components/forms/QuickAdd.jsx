const QuickAdd = ({
  zones,
  placeholder = 'Ex: 8k z2 ou 6x800 z4 int 2min',
  onAdd,
  autoFocus = false,
  style
}) => {
  const [value, setValue] = React.useState('');
  const [preview, setPreview] = React.useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);

    if (text.trim()) {
      const parsed = parseWorkout(text, zones);
      setPreview(parsed);
    } else {
      setPreview(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && preview) {
      onAdd?.(preview, value);
      setValue('');
      setPreview(null);
      inputRef.current?.focus();
    }
  };

  return (
    <div style={{ ...style }}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{ marginBottom: preview ? '12px' : '0' }}
      />
      {preview && (
        <div style={{
          background: 'var(--bg-muted)',
          borderRadius: 'var(--radius-card)',
          padding: '12px',
          fontSize: 'var(--text-12)',
          color: 'var(--text-secondary)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
              {preview.resumo || '—'}
            </div>
            <div style={{ fontSize: 'var(--text-11)' }}>Prescrição</div>
          </div>
          <div>
            <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
              {preview.dist} km
            </div>
            <div style={{ fontSize: 'var(--text-11)' }}>Distância</div>
          </div>
          <div>
            <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
              {preview.minTxt} a {preview.maxTxt}
            </div>
            <div style={{ fontSize: 'var(--text-11)' }}>Tempo</div>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { QuickAdd });
