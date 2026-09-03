const AppHeader = ({
  title = 'Treinador Mateus Lucas',
  logo = 'footprints',
  actions,
  onMenu,
  showMenu = false,
  style
}) => {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, var(--header-gradient-from) 0%, var(--header-gradient-to) 100%)',
        color: 'white',
        padding: '16px var(--padding-desktop)',
        boxShadow: 'var(--shadow-header)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        ...style
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'var(--max-width-desktop)',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showMenu && (
            <IconButton
              icon="menu"
              tone="onDark"
              size={32}
              onClick={onMenu}
              title="Menu"
            />
          )}
          <Icon name={logo} size={20} color="rgba(255,255,255,0.9)" />
          <h1 style={{
            fontSize: 'var(--text-20)',
            fontWeight: 'var(--weight-bold)',
            margin: 0,
            letterSpacing: 'var(--tracking-title)'
          }}>
            {title}
          </h1>
        </div>
        {actions && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};

Object.assign(window, { AppHeader });
