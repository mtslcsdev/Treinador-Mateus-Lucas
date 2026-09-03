const Sidebar = ({
  open = false,
  sections = [],
  activeId,
  onSelect,
  onClose,
  footer,
  style
}) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--overlay-scrim)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'var(--sidebar-width)',
          height: '100vh',
          background: 'linear-gradient(135deg, var(--header-gradient-from) 0%, var(--header-gradient-to) 100%)',
          color: 'white',
          zIndex: 1000,
          overflow: 'auto',
          animation: 'slideInLeft 0.25s ease-out',
          ...style
        }}
      >
        <div style={{ padding: '16px' }}>
          {sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: 'var(--text-11)',
                fontWeight: 'var(--weight-bold)',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                margin: '0 0 12px 0',
                letterSpacing: 'var(--tracking-eyebrow)'
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.items.map((item, j) => (
                  <li key={j}>
                    <button
                      onClick={() => {
                        onSelect?.(item.id);
                        onClose?.();
                      }}
                      style={{
                        background: activeId === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                        color: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderLeft: activeId === item.id ? '4px solid #1873d4' : '4px solid transparent',
                        padding: '10px 12px',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 'var(--text-13)',
                        fontWeight: activeId === item.id ? 'var(--weight-semibold)' : 'var(--weight-regular)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all var(--duration-base) var(--ease-standard)'
                      }}
                    >
                      <Icon name={item.icon} size={18} color="rgba(255,255,255,0.8)" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {footer && (
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: 'auto'
          }}>
            {footer}
          </div>
        )}
      </nav>
      <style>{`
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
};

Object.assign(window, { Sidebar });
