const CycleGrid = ({
  weeks = [],
  onCellClick,
  onWorkoutClick,
  onWorkoutMove,
  onWeekAction,
  style
}) => {
  const [draggedItem, setDraggedItem] = React.useState(null);

  const diasSemana = [
    { id: 'seg', label: 'Seg' },
    { id: 'ter', label: 'Ter' },
    { id: 'qua', label: 'Qua' },
    { id: 'qui', label: 'Qui' },
    { id: 'sex', label: 'Sex' },
    { id: 'sab', label: 'Sab' },
    { id: 'dom', label: 'Dom' }
  ];

  const handleDragStart = (e, week, day, workout, idx) => {
    setDraggedItem({ weekId: week.id, day, workout, index: idx });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetWeek, targetDay) => {
    e.preventDefault();
    if (draggedItem) {
      onWorkoutMove?.({
        from: { weekId: draggedItem.weekId, day: draggedItem.day, index: draggedItem.index },
        to: { weekId: targetWeek.id, day: targetDay },
        workout: draggedItem.workout
      });
      setDraggedItem(null);
    }
  };

  const totalVolume = weeks.reduce((sum, week) => {
    const weekVolume = diasSemana.reduce((daySum, dia) => {
      const treinos = week.dias[dia.id] || [];
      return daySum + treinos.reduce((t, w) => t + (w.dist || 0), 0);
    }, 0);
    return sum + weekVolume;
  }, 0);

  return (
    <div style={{ ...style, overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--text-12)',
        minWidth: '900px'
      }}>
        <thead>
          <tr style={{ background: 'var(--bg-muted)', borderBottom: '2px solid var(--border)' }}>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'var(--weight-semibold)' }}>
              Semana
            </th>
            {diasSemana.map(dia => (
              <th key={dia.id} style={{
                padding: '12px',
                textAlign: 'center',
                fontWeight: 'var(--weight-semibold)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-eyebrow)'
              }}>
                {dia.label}
              </th>
            ))}
            <th style={{ padding: '12px', textAlign: 'right', fontWeight: 'var(--weight-semibold)' }}>
              Volume
            </th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIdx) => {
            const weekVolume = diasSemana.reduce((sum, dia) => {
              const treinos = week.dias[dia.id] || [];
              return sum + treinos.reduce((t, w) => t + (w.dist || 0), 0);
            }, 0);

            const isWeekEmpty = diasSemana.every(dia => !week.dias[dia.id] || week.dias[dia.id].length === 0);

            return (
              <tr
                key={week.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  borderLeft: `4px solid ${isWeekEmpty ? 'var(--warning)' : 'var(--accent)'}`,
                  background: isWeekEmpty ? 'rgba(245,158,11,0.04)' : 'transparent'
                }}
              >
                <td style={{ padding: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 'var(--weight-semibold)', marginBottom: '2px' }}>
                      {week.nome}
                    </div>
                    <div style={{ fontSize: 'var(--text-10)', color: 'var(--text-secondary)' }}>
                      {week.sub}
                    </div>
                    <div style={{ fontSize: 'var(--text-10)', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {diasSemana.reduce((cnt, d) => cnt + (week.dias[d.id]?.length || 0), 0)} treinos
                    </div>
                  </div>
                </td>
                {diasSemana.map(dia => {
                  const treinos = week.dias[dia.id] || [];
                  return (
                    <td
                      key={dia.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, week, dia.id)}
                      onClick={() => onCellClick?.(week, dia.id)}
                      style={{
                        padding: '8px',
                        borderRight: '1px solid var(--border)',
                        cursor: 'pointer',
                        minHeight: '100px',
                        verticalAlign: 'top',
                        background: draggedItem?.weekId === week.id && draggedItem?.day === dia.id
                          ? 'rgba(24, 115, 212, 0.1)' : 'transparent',
                        border: draggedItem?.weekId === week.id && draggedItem?.day === dia.id
                          ? '2px dashed var(--accent)' : 'inherit'
                      }}
                    >
                      {treinos.length === 0 ? (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '80px',
                          color: 'var(--text-muted)',
                          fontSize: 'var(--text-20)',
                          opacity: 0.4
                        }}>
                          +
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {treinos.map((treino, idx) => (
                            <div
                              key={idx}
                              draggable
                              onDragStart={(e) => handleDragStart(e, week, dia.id, treino, idx)}
                              onClick={(e) => {
                                e.stopPropagation();
                                onWorkoutClick?.(week, dia.id, treino, idx);
                              }}
                              style={{
                                padding: '6px 8px',
                                borderRadius: 'var(--radius-xs)',
                                background: 'var(--primary-light)',
                                border: '1px solid var(--primary-border)',
                                cursor: 'grab',
                                fontSize: 'var(--text-10)',
                                fontWeight: 'var(--weight-semibold)',
                                color: 'var(--primary-on-tint)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {treino.resumo || treino.tipo}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontWeight: 'var(--weight-semibold)',
                  color: weekVolume > 0 ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {weekVolume.toFixed(1)} km
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{
        padding: '12px',
        background: 'var(--bg-muted)',
        borderTop: '2px solid var(--border)',
        borderRadius: '0 0 var(--radius-card) var(--radius-card)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 'var(--text-12)',
        color: 'var(--text-secondary)'
      }}>
        <div>
          <Icon name="move" size={14} /> Arraste o treino entre dias e semanas
          <span style={{ marginLeft: '12px' }}>·</span>
          <Icon name="copy" size={14} style={{ marginLeft: '12px' }} /> Clique no treino para copiar em vários dias
        </div>
        <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--primary)' }}>
          Total: {totalVolume.toFixed(1)} km
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CycleGrid });
