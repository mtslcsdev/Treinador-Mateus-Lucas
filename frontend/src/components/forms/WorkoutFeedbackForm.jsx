const WorkoutFeedbackForm = ({
  value = { status: 'feito', esforco: 'normal', dist: '', tempo: '', comentario: '' },
  onSubmit,
  onSync,
  synced = false,
  style
}) => {
  const [feedback, setFeedback] = React.useState(value);

  const statusOptions = [
    { value: 'feito', label: 'Feito', icon: '✓' },
    { value: 'parcial', label: 'Parcial', icon: '◐' },
    { value: 'perdido', label: 'Não feito', icon: '✗' }
  ];

  const esforcoOptions = [
    { value: 'muito-facil', label: 'Muito fácil', icon: '😄' },
    { value: 'facil', label: 'Fácil', icon: '🙂' },
    { value: 'normal', label: 'Normal', icon: '😐' },
    { value: 'dificil', label: 'Difícil', icon: '😓' },
    { value: 'muito-dificil', label: 'Muito difícil', icon: '😤' }
  ];

  return (
    <div style={{ ...style }}>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '12px' }}>
          Status do treino
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFeedback({ ...feedback, status: opt.value })}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: feedback.status === opt.value ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: feedback.status === opt.value ? 'var(--primary-light)' : 'var(--card-bg)',
                cursor: 'pointer',
                fontSize: 'var(--text-13)',
                fontWeight: feedback.status === opt.value ? 'var(--weight-semibold)' : 'var(--weight-regular)',
                transition: 'all var(--duration-base) var(--ease-standard)',
                minHeight: '44px'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{opt.icon}</div>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '12px' }}>
          Esforço percebido
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
          {esforcoOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFeedback({ ...feedback, esforco: opt.value })}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: feedback.esforco === opt.value ? '2px solid var(--warning)' : '1px solid var(--border)',
                background: feedback.esforco === opt.value ? 'var(--warning-light)' : 'var(--card-bg)',
                cursor: 'pointer',
                fontSize: 'var(--text-12)',
                fontWeight: feedback.esforco === opt.value ? 'var(--weight-semibold)' : 'var(--weight-regular)',
                transition: 'all var(--duration-base) var(--ease-standard)',
                minHeight: '44px'
              }}
            >
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>{opt.icon}</div>
              {opt.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <Input
          type="text"
          value={feedback.dist}
          onChange={(e) => setFeedback({ ...feedback, dist: e.target.value })}
          placeholder="8.5 km"
          label="Distância real"
        />
        <Input
          type="text"
          value={feedback.tempo}
          onChange={(e) => setFeedback({ ...feedback, tempo: e.target.value })}
          placeholder="00:45:20"
          label="Tempo real"
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '6px' }}>
          Comentário
        </label>
        <textarea
          value={feedback.comentario}
          onChange={(e) => setFeedback({ ...feedback, comentario: e.target.value })}
          placeholder="Como foi o treino?"
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-13)',
            resize: 'vertical',
            minHeight: '44px'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {onSync && (
            <Button variant="template" onClick={onSync}>
              <Icon name="watch" size={16} /> {synced ? 'Sincronizado' : 'Sincronizar'}
            </Button>
          )}
        </div>
        <Button variant="success" onClick={() => onSubmit?.(feedback)}>
          <Icon name="check-circle" size={16} /> Salvar feedback
        </Button>
      </div>
    </div>
  );
};

Object.assign(window, { WorkoutFeedbackForm });
