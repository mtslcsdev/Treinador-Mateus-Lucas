const { useState, useEffect } = React;

function App() {
  const [view, setView] = useState('dashboard');
  const [atletaId, setAtletaId] = useState(null);
  const [cicloId, setCicloId] = useState(null);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesAtleta, setNotesAtleta] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  const addToast = (kind, message) => {
    const id = Date.now();
    setToasts(t => [...t, { id, kind, message }]);
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id));
    }, 3200);
  };

  const handleNavigation = (newView, id1, id2) => {
    setView(newView);
    setAtletaId(id1 || null);
    setCicloId(id2 || null);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, -40%); opacity: 0; } to { transform: translate(-50%, -50%); opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      <AppHeader
        title="Treinador Mateus Lucas"
        showMenu={window.innerWidth < 1024}
        onMenu={() => setSidebarOpen(!sidebarOpen)}
        actions={
          <>
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--text-12)',
              fontWeight: 'var(--weight-semibold)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Icon name="circle-check" size={14} color="rgba(255,255,255,0.8)" />
              Salvo agora
            </span>
            <IconButton icon="undo-2" tone="onDark" onClick={() => addToast('info', 'Desfeito')} title="Desfazer" />
            <IconButton icon="redo-2" tone="onDark" onClick={() => addToast('info', 'Refeito')} title="Refazer" />
            <IconButton icon={dark ? 'sun' : 'moon'} tone="onDark" onClick={() => setDark(!dark)} title="Alternar tema" />
            <Button
              variant="header"
              onClick={() => addToast('sucesso', 'Backup exportado com sucesso!')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Icon name="save" size={14} color="rgba(255,255,255,0.9)" />
              Backup
            </Button>
          </>
        }
      />

      {view !== 'dashboard' && view !== 'roster' && (
        <Breadcrumb
          items={
            view === 'athlete' ? [
              'Atletas',
              KIT2.atletas.find(a => a.id === atletaId)?.nome
            ] : view === 'cycle' ? [
              'Atletas',
              KIT2.atletas.find(a => a.id === atletaId)?.nome,
              'Ciclos'
            ] : []
          }
          onNavigate={(idx) => {
            if (idx === 0) handleNavigation('roster');
            else if (idx === 1) handleNavigation('athlete', atletaId);
          }}
        />
      )}

      <div style={{
        maxWidth: 'var(--max-width-desktop)',
        margin: '0 auto',
        padding: 'var(--gap-sections) var(--padding-desktop) 4rem',
        minHeight: 'calc(100vh - 78px)'
      }}>
        {view === 'dashboard' && (
          <DashboardScreen
            atletas={KIT2.atletas}
            ciclos={KIT2.atletas.flatMap(a => a.ciclos)}
            volume={KIT2.volume}
            onSelectAtleta={(id) => handleNavigation('athlete', id)}
            onAddAtleta={() => addToast('info', 'Novo atleta criado')}
          />
        )}

        {view === 'roster' && (
          <RosterScreen
            atletas={KIT2.atletas}
            onSelectAtleta={(id) => handleNavigation('athlete', id)}
            onNotesAtleta={(id) => {
              setNotesAtleta(id);
              setNotesOpen(true);
            }}
            onAddAtleta={() => addToast('info', 'Novo atleta criado')}
          />
        )}

        {view === 'athlete' && (
          <AthleteScreen
            atleta={KIT2.atletas.find(a => a.id === atletaId)}
            onSelectCiclo={(id) => handleNavigation('cycle', atletaId, id)}
            onNotasClick={() => {
              setNotesAtleta(atletaId);
              setNotesOpen(true);
            }}
          />
        )}

        {view === 'library' && (
          <LibraryScreen
            biblioteca={KIT2.biblioteca}
          />
        )}

        {view === 'cycle' && typeof CycleScreen !== 'undefined' && (
          <CycleScreen
            ciclo={KIT2.atletas.find(a => a.id === atletaId)?.ciclos.find(c => c.id === cicloId)}
            atleta={KIT2.atletas.find(a => a.id === atletaId)}
            onBackClick={() => handleNavigation('athlete', atletaId)}
            onAddToast={addToast}
            biblioteca={KIT2.biblioteca}
          />
        )}
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sections={[
          {
            title: 'Navegação',
            items: [
              { id: 'dashboard', icon: 'bar-chart-3', label: 'Visão geral' },
              { id: 'roster', icon: 'users', label: 'Atletas' },
              { id: 'library', icon: 'library', label: 'Biblioteca' }
            ]
          },
          {
            title: 'Configurações',
            items: [
              { id: 'export', icon: 'download', label: 'Exportar backup' },
              { id: 'import', icon: 'upload', label: 'Importar backup' },
              { id: 'validate', icon: 'shield-check', label: 'Validar dados' }
            ]
          },
          {
            title: 'Ajuda',
            items: [
              { id: 'guide', icon: 'circle-help', label: 'Guia rápido' },
              { id: 'about', icon: 'info', label: 'Sobre' }
            ]
          }
        ]}
        activeId={view}
        onSelect={(id) => {
          if (['dashboard', 'roster', 'library'].includes(id)) {
            handleNavigation(id);
          } else {
            addToast('info', `${id} selecionado`);
          }
        }}
      />

      <Drawer
        open={notesOpen}
        tone="success"
        title={`Notas — ${KIT2.atletas.find(a => a.id === notesAtleta)?.nome}`}
        subtitle="Histórico, lesões, objetivos, características"
        onClose={() => setNotesOpen(false)}
        width={520}
        footer={
          <>
            <Button variant="ghost" onClick={() => setNotesOpen(false)}>Cancelar</Button>
            <Button variant="success" onClick={() => {
              setNotesOpen(false);
              addToast('sucesso', 'Notas salvas!');
            }}>Salvar notas</Button>
          </>
        }
      >
        <textarea
          placeholder="Digite suas notas aqui..."
          style={{
            width: '100%',
            minHeight: '300px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-13)',
            resize: 'vertical',
            fontColor: 'var(--text-primary)'
          }}
        />
      </Drawer>

      <div style={{
        position: 'fixed',
        top: '78px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {toasts.map(toast => (
          <Toast key={toast.id} kind={toast.kind}>
            {toast.message}
          </Toast>
        ))}
      </div>
    </>
  );
}

// Placeholder screens
function DashboardScreen({ atletas, ciclos, volume, onSelectAtleta, onAddAtleta }) {
  const mediaAderencia = Math.round(
    atletas.reduce((sum, a) => sum + a.aderencia, 0) / atletas.length
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
        <div>
          <p style={{ margin: '0 0 4px 0', fontSize: 'var(--text-11)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Semana de 03 a 09 de agosto</p>
          <h1 style={{ margin: 0, fontSize: 'var(--text-27)', fontWeight: 'var(--weight-black)' }}>Visão geral</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 'var(--text-13)', color: 'var(--text-secondary)' }}>
            {atletas.length} atletas · {ciclos.length} ciclos ativos
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost"><Icon name="download" size={16} /> Exportar</Button>
          <Button variant="success" onClick={onAddAtleta}><Icon name="plus" size={16} /> Novo atleta</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <DashboardStatCard icon="gauge" label="Aderência média" value={`${mediaAderencia}%`} />
        <DashboardStatCard icon="route" label="Volume da semana" value={`${KIT2.volume.reduce((s, v) => s + v.value, 0).toFixed(1)} km`} />
        <DashboardStatCard icon="calendar-check" label="Treinos prescritos" value={KIT2.semanas.reduce((s, sem) => s + sem.treinos.length, 0)} meta="12 feitos · 4 pendentes" />
        <DashboardStatCard icon="triangle-alert" label="Semanas vazias" value="2" meta="Semanas 3 e 4" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px' }}>
        <Card>
          <SectionHeader
            title="Atletas"
            subtitle="Ordenado por aderência — quem precisa de atenção aparece primeiro"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {atletas.sort((a, b) => a.aderencia - b.aderencia).map(atleta => (
              <div
                key={atleta.id}
                onClick={() => onSelectAtleta(atleta.id)}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) var(--ease-standard)'
                }}
              >
                <ProgressRing value={atleta.aderencia} size={40} thickness={3} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'var(--weight-semibold)' }}>{atleta.nome}</div>
                  <div style={{ fontSize: 'var(--text-12)', color: 'var(--text-secondary)' }}>📅 {atleta.proximo}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-13)', fontWeight: 'var(--weight-bold)' }}>
                  {atleta.teste}
                </div>
                <Sparkline data={atleta.trend} width={86} height={26} />
                <Icon name="chevron-right" size={20} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Volume por semana" subtitle={`Ciclo ativo · ${volume.reduce((s, v) => s + v.value, 0).toFixed(1)} km`} />
          <VolumeChart data={volume} />
        </Card>
      </div>
    </>
  );
}

function RosterScreen({ atletas, onSelectAtleta, onNotesAtleta, onAddAtleta }) {
  return (
    <>
      <Card>
        <SectionHeader
          title="Atletas"
          subtitle={`${atletas.length} atletas cadastrados`}
          actions={<Button variant="success" onClick={onAddAtleta}><Icon name="plus" size={16} /> Novo atleta</Button>}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {atletas.map(atleta => (
            <AthleteCard
              key={atleta.id}
              name={atleta.nome}
              adherence={atleta.aderencia}
              trend={atleta.trend}
              testPace={atleta.teste}
              nextWorkout={atleta.proximo}
              onClick={() => onSelectAtleta(atleta.id)}
              actions={
                <>
                  <IconButton
                    icon="sticky-note"
                    tone="success"
                    size={28}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNotesAtleta(atleta.id);
                    }}
                    title="Notas"
                  />
                  <IconButton
                    icon="pencil"
                    size={28}
                    onClick={(e) => e.stopPropagation()}
                    title="Editar"
                  />
                  <IconButton
                    icon="trash-2"
                    tone="danger"
                    size={28}
                    onClick={(e) => e.stopPropagation()}
                    title="Remover"
                  />
                </>
              }
            />
          ))}
        </div>
      </Card>
    </>
  );
}

function AthleteScreen({ atleta, onSelectCiclo, onNotasClick }) {
  const [testPace, setTestPace] = useState(atleta?.teste || '');
  const zones = testPace ? zoneTable(testPace) : null;

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: 'var(--text-11)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Atleta</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 style={{ margin: 0, fontSize: 'var(--text-27)', fontWeight: 'var(--weight-black)' }}>
            {atleta?.nome}
          </h1>
          <Button variant="ghost" onClick={onNotasClick}><Icon name="sticky-note" size={16} /> Notas</Button>
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--text-13)', color: 'var(--text-secondary)' }}>
          {atleta?.ciclos.length} ciclos · aderência {atleta?.aderencia}% · próximo: {atleta?.proximo}
        </p>
      </div>

      <Card variant="navy" style={{ marginBottom: '24px' }}>
        <SectionHeader
          title={<div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
            <Icon name="zap" size={20} /> Zonas de treino
          </div>}
          subtitle="Incrementos de 20s · Z4 = pace do teste de 3km"
          style={{ color: 'white' }}
        />
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <Input
            value={testPace}
            onChange={(e) => setTestPace(e.target.value)}
            placeholder="MM:SS"
            label="Teste 3km"
            onDark
            mono
            style={{ maxWidth: '200px' }}
          />
          <Button variant="header" onClick={() => {
            if (testPace && /^\d{1,2}:\d{2}$/.test(testPace)) {
              // Toast success
            }
          }}>Calcular</Button>
        </div>

        {zones ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {['Z5', 'Z4', 'Z3', 'Z2', 'Z1'].map(zone => {
              const z = zones[zone];
              return (
                <ZoneCard
                  key={zone}
                  zone={zone}
                  pace={`${fmtPace(z.min)} a ${fmtPace(z.max)}/km`}
                  speed={`${fmtSpeed(z.max)} a ${fmtSpeed(z.min)} km/h`}
                />
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '40px 20px' }}>
            Digite o pace acima e clique Calcular
          </div>
        )}
      </Card>

      <Card>
        <SectionHeader
          title="Ciclos"
          subtitle="Selecione um ciclo para editar as semanas"
          actions={
            <>
              <Button variant="ghost"><Icon name="copy" size={16} /> Copiar existente</Button>
              <Button><Icon name="plus" size={16} /> Novo ciclo</Button>
            </>
          }
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {atleta?.ciclos.map(ciclo => (
            <CycleCard
              key={ciclo.id}
              name={ciclo.nome}
              weeks={ciclo.semanas}
              workouts={ciclo.treinos}
              onClick={() => onSelectCiclo(ciclo.id)}
              actions={<Button variant="success" fullWidth onClick={() => onSelectCiclo(ciclo.id)}>Abrir ciclo</Button>}
            />
          ))}
        </div>
      </Card>
    </>
  );
}

function LibraryScreen({ biblioteca }) {
  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: 'var(--text-11)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reaproveitar</p>
        <h1 style={{ margin: 0, fontSize: 'var(--text-27)', fontWeight: 'var(--weight-black)' }}>Biblioteca de treinos</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--text-13)', color: 'var(--text-secondary)' }}>
          Treinos salvos, prontos para inserir em qualquer semana
        </p>
      </div>

      <Card style={{ padding: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
          {biblioteca.map((treino, i) => (
            <div key={i} style={{
              padding: '12px',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 'var(--text-14)', fontWeight: 'var(--weight-semibold)' }}>
                    {treino.nome}
                  </h4>
                  <div style={{ fontSize: 'var(--text-12)', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', gap: '12px' }}>
                    <TrainingTypeBadge type={treino.tipo}>{treino.tipo}</TrainingTypeBadge>
                    <span>📏 {treino.dist} km</span>
                    <span>📊 {treino.usos} usos</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
