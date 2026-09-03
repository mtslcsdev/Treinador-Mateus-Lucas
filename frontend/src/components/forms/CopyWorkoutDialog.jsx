const CopyWorkoutDialog = ({
  workout,
  origin = {},
  weeks = [],
  onConfirm,
  onEdit,
  onRemove,
  onCancel,
  style
}) => {
  const [mode, setMode] = React.useState('copiar');
  const [selectedWeeks, setSelectedWeeks] = React.useState([]);
  const [selectedDays, setSelectedDays] = React.useState([]);

  const handleDayToggle = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleConfirm = () => {
    onConfirm?.({
      mode,
      weekIds: selectedWeeks,
      days: selectedDays
    });
  };

  const diasSemana = [
    { id: 'seg', label: 'Segunda' },
    { id: 'ter', label: 'Terça' },
    { id: 'qua', label: 'Quarta' },
    { id: 'qui', label: 'Quinta' },
    { id: 'sex', label: 'Sexta' },
    { id: 'sab', label: 'Sábado' },
    { id: 'dom', label: 'Domingo' }
  ];

  return (
    <div style={{ ...style }}>
      <Card style={{ marginBottom: '20px', background: 'var(--bg-muted)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 'var(--text-13)', fontWeight: 'var(--weight-semibold)' }}>
          {workout?.nome || 'Treino'}
        </h3>
        <div style={{ fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>
          {origin.dayLabel && <p style={{ margin: 0 }}>De: {origin.weekNome} · {origin.dayLabel}</p>}
        </div>
      </Card>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '12px' }}>
          Modo
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={mode === 'copiar'}
              onChange={() => setMode('copiar')}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: 'var(--text-13)' }}>Copiar para vários dias</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={mode === 'mover'}
              onChange={() => setMode('mover')}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: 'var(--text-13)' }}>Mover para um dia</span>
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '12px' }}>
          Semanas
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {weeks.map(week => (
            <label key={week.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type={mode === 'mover' ? 'radio' : 'checkbox'}
                name="weeks"
                checked={selectedWeeks.includes(week.id)}
                onChange={(e) => {
                  if (mode === 'mover') {
                    setSelectedWeeks([week.id]);
                  } else {
                    setSelectedWeeks(prev =>
                      prev.includes(week.id) ? prev.filter(w => w !== week.id) : [...prev, week.id]
                    );
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: 'var(--text-13)' }}>{week.nome}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '12px' }}>
          Dias
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
          {diasSemana.map(dia => (
            <label
              key={dia.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: selectedDays.includes(dia.id) ? 'var(--primary-light)' : 'transparent'
              }}
            >
              <input
                type={mode === 'mover' ? 'radio' : 'checkbox'}
                name="days"
                checked={selectedDays.includes(dia.id)}
                onChange={() => {
                  if (mode === 'mover') {
                    setSelectedDays([dia.id]);
                  } else {
                    handleDayToggle(dia.id);
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: 'var(--text-12)' }}>{dia.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        {onEdit && <Button variant="template" onClick={onEdit}><Icon name="pencil" size={16} /> Editar</Button>}
        {onRemove && <Button variant="danger" onClick={onRemove}><Icon name="trash-2" size={16} /> Remover</Button>}
        <Button
          onClick={handleConfirm}
          disabled={selectedWeeks.length === 0 || selectedDays.length === 0}
        >
          {mode === 'copiar' ? 'Copiar' : 'Mover'}
        </Button>
      </div>
    </div>
  );
};

Object.assign(window, { CopyWorkoutDialog });
