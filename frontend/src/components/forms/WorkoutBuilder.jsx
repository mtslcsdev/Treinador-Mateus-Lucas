const WorkoutBuilder = ({
  zones,
  athlete,
  value = { tipo: null, fase: 'Base', data: null, obs: '', blocos: [] },
  onChange,
  onSave,
  onSaveToLibrary,
  onCancel,
  style
}) => {
  const [draft, setDraft] = React.useState(value);
  const [novoBloco, setNovoBloco] = React.useState({
    repeticoes: 1,
    distancia: 0,
    zona: 'Z4',
    intervalo: ''
  });

  const handleAddBloco = () => {
    if (novoBloco.distancia > 0 || novoBloco.duracao > 0) {
      setDraft({
        ...draft,
        blocos: [...draft.blocos, novoBloco]
      });
      setNovoBloco({ repeticoes: 1, distancia: 0, zona: 'Z4', intervalo: '' });
    }
  };

  const handleRemoveBloco = (idx) => {
    setDraft({
      ...draft,
      blocos: draft.blocos.filter((_, i) => i !== idx)
    });
  };

  const est = estimate(draft.blocos, zones);

  return (
    <div style={{ ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '6px' }}>
            Tipo
          </label>
          <Select
            value={draft.tipo || ''}
            onChange={(v) => setDraft({ ...draft, tipo: v })}
            options={[
              'leve', 'fartlek', 'progressivo', 'intervalado', 'repeticoes',
              'bloco', 'longao', 'ritmado', 'trt'
            ]}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '6px' }}>
            Fase
          </label>
          <Select
            value={draft.fase}
            onChange={(v) => setDraft({ ...draft, fase: v })}
            options={['Base', 'Específico', 'Polimento']}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-12)', fontWeight: 'var(--weight-semibold)', marginBottom: '6px' }}>
          Observações
        </label>
        <textarea
          value={draft.obs}
          onChange={(e) => setDraft({ ...draft, obs: e.target.value })}
          placeholder="Digite observações sobre o treino..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-13)',
            resize: 'vertical'
          }}
        />
      </div>

      <Card style={{ marginBottom: '20px', background: 'var(--bg-muted)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 'var(--text-14)', fontWeight: 'var(--weight-semibold)' }}>
          Blocos de treino
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)' }}>Repetições</label>
            <Input
              type="number"
              value={novoBloco.repeticoes}
              onChange={(e) => setNovoBloco({ ...novoBloco, repeticoes: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>
          <div>
            <label style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)' }}>Distância (km)</label>
            <Input
              type="number"
              value={novoBloco.distancia}
              onChange={(e) => setNovoBloco({ ...novoBloco, distancia: parseFloat(e.target.value) || 0 })}
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)' }}>Zona</label>
            <Select
              value={novoBloco.zona}
              onChange={(v) => setNovoBloco({ ...novoBloco, zona: v })}
              options={['Z1', 'Z2', 'Z3', 'Z4', 'Z5']}
            />
          </div>
          <div>
            <label style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)' }}>Intervalo</label>
            <Input
              value={novoBloco.intervalo}
              onChange={(e) => setNovoBloco({ ...novoBloco, intervalo: e.target.value })}
              placeholder="Ex: 2min trote"
            />
          </div>
        </div>

        <Button onClick={handleAddBloco} style={{ width: '100%' }}>
          <Icon name="plus" size={16} /> Adicionar bloco
        </Button>
      </Card>

      {draft.blocos.length > 0 && (
        <>
          <div style={{ marginBottom: '20px' }}>
            {draft.blocos.map((bloco, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '8px'
              }}>
                <div>
                  <div style={{ fontWeight: 'var(--weight-semibold)' }}>
                    {bloco.repeticoes}x{(bloco.distancia * 1000).toFixed(0)}m {bloco.zona}
                  </div>
                  {bloco.intervalo && (
                    <div style={{ fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>
                      Intervalo: {bloco.intervalo}
                    </div>
                  )}
                </div>
                <IconButton
                  icon="trash-2"
                  tone="danger"
                  size={28}
                  onClick={() => handleRemoveBloco(i)}
                  title="Remover"
                />
              </div>
            ))}
          </div>

          <Card style={{ background: 'var(--bg-muted)', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              <div>
                <div style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  DISTÂNCIA
                </div>
                <div style={{ fontSize: 'var(--text-16)', fontWeight: 'var(--weight-bold)' }}>
                  {est.dist} km
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  TEMPO MÍNIMO
                </div>
                <div style={{ fontSize: 'var(--text-16)', fontWeight: 'var(--weight-bold)', fontFamily: 'var(--font-mono)' }}>
                  {est.minTxt}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-10)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  TEMPO MÁXIMO
                </div>
                <div style={{ fontSize: 'var(--text-16)', fontWeight: 'var(--weight-bold)', fontFamily: 'var(--font-mono)' }}>
                  {est.maxTxt}
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        {onSaveToLibrary && (
          <Button variant="template" onClick={() => onSaveToLibrary?.(draft, est)}>
            <Icon name="save" size={16} /> Salvar na biblioteca
          </Button>
        )}
        <Button variant="success" onClick={() => onSave?.(draft, est)}>
          <Icon name="check-circle" size={16} /> Salvar treino
        </Button>
      </div>
    </div>
  );
};

Object.assign(window, { WorkoutBuilder });
