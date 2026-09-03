const WorkoutLibrary = ({
  items = [],
  onPick,
  onRemove,
  query = '',
  onQuery,
  style
}) => {
  const filtered = items.filter(item =>
    item.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ ...style }}>
      <Input
        value={query}
        onChange={(e) => onQuery?.(e.target.value)}
        placeholder="Buscar treino..."
        style={{ marginBottom: '16px' }}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="🏃"
          title={query ? 'Nenhum treino encontrado' : 'Biblioteca vazia'}
          subtitle={query ? 'Tente outra busca' : 'Salve treinos para reutilizá-los'}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => onPick?.(item)}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all var(--duration-base) var(--ease-standard)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: 'var(--text-13)', fontWeight: 'var(--weight-semibold)' }}>
                  {item.nome}
                </h4>
                <div style={{ display: 'flex', gap: '12px', fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>
                  {item.tipo && <TrainingTypeBadge type={item.tipo}>{item.tipo}</TrainingTypeBadge>}
                  <span>📏 {item.dist} km</span>
                  <span>📊 {item.usos} usos</span>
                </div>
              </div>
              <IconButton
                icon="trash-2"
                tone="danger"
                size={28}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.(i);
                }}
                title="Remover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { WorkoutLibrary });
