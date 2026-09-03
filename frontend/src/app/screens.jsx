const { useState, useEffect } = React;

function CycleScreen({ ciclo, atleta, onBackClick, onAddToast, biblioteca }) {
  const [tab, setTab] = useState('planilha');
  const [showWorkoutDrawer, setShowWorkoutDrawer] = useState(false);
  const [showLibraryDrawer, setShowLibraryDrawer] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  if (!ciclo || !atleta) {
    return <EmptyState icon="🏃" title="Ciclo não encontrado" />;
  }

  const zones = atleta.teste ? zoneTable(atleta.teste) : null;

  const handleAddWorkout = (draft, estimate) => {
    onAddToast('sucesso', `Treino adicionado ao ${selectedWeek?.nome}!`);
    setShowWorkoutDrawer(false);
  };

  const handlePickFromLibrary = (workout) => {
    onAddToast('sucesso', `"${workout.nome}" inserido em ${selectedDay}!`);
    setShowLibraryDrawer(false);
  };

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={onBackClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--primary)',
            fontSize: 'var(--text-13)',
            fontWeight: 'var(--weight-semibold)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px'
          }}
        >
          <Icon name="arrow-left" size={16} />
          {atleta.nome}
        </button>
        <h1 style={{ margin: '0 0 12px 0', fontSize: 'var(--text-27)', fontWeight: 'var(--weight-black)' }}>
          {ciclo.nome}
        </h1>
        <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-secondary)' }}>
          {ciclo.semanas} semanas · {ciclo.treinos} treinos · {(ciclo.volume || 0).toFixed(1)} km prescritos
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost">
            <Icon name="target" size={16} /> Prova alvo
          </Button>
          <Button variant="ghost">
            <Icon name="calendar-days" size={16} /> Calendário
          </Button>
        </div>
        <Button variant="export" onClick={() => onAddToast('info', 'Gerando PDF do ciclo...')}>
          <Icon name="file-text" size={16} /> Relatório
        </Button>
      </div>

      {ciclo.prova && (
        <RaceTargetBanner
          name={ciclo.prova.nome}
          detail={ciclo.prova.detalhe}
          days={30}
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <DashboardStatCard icon="route" label="Volume prescrito" value={`${(ciclo.volume || 76.8).toFixed(1)} km`} />
        <DashboardStatCard icon="check-circle-2" label="Executados" value="48.2 km" meta="63% do planejado" />
        <DashboardStatCard icon="triangle-alert" label="Semanas vazias" value="2" meta="Precisa preencher" />
        <DashboardStatCard icon="target" label="Prova alvo" value={ciclo.prova?.nome || 'Não definida'} />
      </div>

      <Card style={{ marginBottom: '24px' }}>
        <VolumeChart
          title="Volume do ciclo"
          data={[
            { label: 'S1', value: 33.8 },
            { label: 'S2', value: 43 },
            { label: 'S3', value: 0 },
            { label: 'S4', value: 0 }
          ]}
        />
      </Card>

      <Card style={{ padding: 0, marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '16px', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border)' }}>
          {['Planilha', 'Semanas'].map((name, i) => (
            <button
              key={i}
              onClick={() => setTab(name.toLowerCase())}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: tab === name.toLowerCase() ? 'none' : '1px solid var(--border)',
                background: tab === name.toLowerCase() ? 'white' : 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--text-13)',
                fontWeight: 'var(--weight-semibold)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Icon name={name === 'Planilha' ? 'table-2' : 'list'} size={16} />
              {name}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          {tab === 'planilha' && (
            <>
              <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: 'var(--radius-card)', marginBottom: '20px' }}>
                <QuickAdd
                  zones={zones}
                  placeholder="Adição rápida na 1ª semana vazia: 8k z2"
                  onAdd={(parsed) => onAddToast('sucesso', `Treino adicionado!`)}
                  autoFocus
                />
              </div>

              <CycleGrid
                weeks={[
                  {
                    id: 'g1',
                    nome: 'Semana 1',
                    sub: 'Ordinária · Base',
                    dias: {
                      seg: [],
                      ter: [{ tipo: 'progressivo', dist: 8, zona: 'Z2', resumo: '8km Z2' }],
                      qua: [],
                      qui: [],
                      sex: [],
                      sab: [{ tipo: 'longao', dist: 14, zona: 'Z2', resumo: '14km Z2' }],
                      dom: []
                    }
                  },
                  {
                    id: 'g2',
                    nome: 'Semana 2',
                    sub: 'Ordinária · Base',
                    dias: {
                      seg: [{ tipo: 'intervalado', dist: 6.2, zona: 'Z4', resumo: '8x400m Z4' }],
                      ter: [],
                      qua: [{ tipo: 'leve', dist: 5, zona: 'Z1', resumo: '5km Z1' }],
                      qui: [],
                      sex: [{ tipo: 'fartlek', dist: 6, zona: 'Z3', resumo: 'Fartlek 6km' }],
                      sab: [{ tipo: 'longao', dist: 16, zona: 'Z2', resumo: '16km Z2' }],
                      dom: []
                    }
                  },
                  {
                    id: 'g3',
                    nome: 'Semana 3',
                    sub: 'Ordinária · Base',
                    dias: { seg: [], ter: [], qua: [], qui: [], sex: [], sab: [], dom: [] }
                  },
                  {
                    id: 'g4',
                    nome: 'Semana 4',
                    sub: 'Ordinária · Base',
                    dias: { seg: [], ter: [], qua: [], qui: [], sex: [], sab: [], dom: [] }
                  }
                ]}
                onCellClick={(week, day) => {
                  setSelectedWeek(week);
                  setSelectedDay(day);
                  setShowWorkoutDrawer(true);
                }}
                onWorkoutClick={(week, day, workout) => {
                  onAddToast('info', `${workout.resumo || workout.tipo} - Clique para copiar ou editar`);
                }}
              />
            </>
          )}

          {tab === 'semanas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'].map((semana, i) => (
                <div key={i} style={{
                  borderLeft: i < 2 ? '4px solid var(--accent)' : '4px solid var(--warning)',
                  background: i >= 2 ? 'rgba(245,158,11,0.04)' : 'transparent',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontWeight: 'var(--weight-semibold)' }}>
                        {semana}
                      </h3>
                      <p style={{ margin: 0, fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>
                        {i < 2 ? `${i === 0 ? 3 : 4} treinos · ${i === 0 ? 33.8 : 43} km` : 'Nenhum treino'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button variant="ghost" size="sm">
                        <Icon name="library" size={14} /> Biblioteca
                      </Button>
                      <Button variant="success" size="sm" onClick={() => setShowWorkoutDrawer(true)}>
                        <Icon name="plus" size={14} />
                      </Button>
                    </div>
                  </div>

                  {i >= 2 && (
                    <EmptyState
                      icon="📅"
                      title="Semana sem treinos"
                      subtitle="Monte um treino estruturado ou reaproveite um da biblioteca"
                      style={{ padding: '20px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Drawer
        open={showWorkoutDrawer}
        tone="primary"
        title={`Adicionar treino · ${selectedWeek?.nome}`}
        subtitle={selectedDay ? `${selectedDay} · ${selectedWeek?.sub}` : ''}
        onClose={() => setShowWorkoutDrawer(false)}
        width={620}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowWorkoutDrawer(false)}>Cancelar</Button>
            <Button variant="success" onClick={() => handleAddWorkout()}>
              <Icon name="check-circle" size={16} /> Adicionar
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['Adição rápida', 'Treino completo', 'Biblioteca'].map((name, i) => (
            <button
              key={i}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: i === 0 ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--text-12)',
                fontWeight: 'var(--weight-semibold)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Icon name={i === 0 ? 'wand-sparkles' : i === 1 ? 'clipboard-list' : 'library'} size={14} />
              {name}
            </button>
          ))}
        </div>

        <QuickAdd
          zones={zones}
          placeholder="Ex: 8k z2, 6x800 z4 int 2min, 40min z1"
          onAdd={handleAddWorkout}
          autoFocus
        />
      </Drawer>
    </>
  );
}

Object.assign(window, { CycleScreen });
