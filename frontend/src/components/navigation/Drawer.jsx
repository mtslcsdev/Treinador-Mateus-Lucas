const Drawer = ({
  open = false,
  tone = 'primary',
  title,
  subtitle,
  onClose,
  footer,
  children,
  width = 600,
  style
}) => {
  if (!open) return null;

  const toneStyles = {
    primary: { bg: 'var(--primary)', fg: 'white' },
    info: { bg: 'var(--accent)', fg: 'white' },
    success: { bg: 'var(--success)', fg: 'white' }
  };

  const t = toneStyles[tone] || toneStyles.primary;

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
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: `${width}px`,
          height: '100vh',
          background: 'var(--card-bg)',
          boxShadow: 'var(--shadow-drawer)',
          zIndex: 1000,
          animation: 'slideInRight 0.25s ease-out',
          display: 'flex',
          flexDirection: 'column',
          ...style
        }}
      >
        <div style={{
          background: t.bg,
          color: t.fg,
          padding: '20px 24px',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: 'var(--text-15)',
                fontWeight: 'var(--weight-bold)',
                margin: '0 0 4px 0'
              }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{
                  fontSize: 'var(--text-12)',
                  opacity: 0.85,
                  margin: 0
                }}>
                  {subtitle}
                </p>
              )}
            </div>
            <IconButton
              icon="x"
              tone="onDark"
              size={32}
              onClick={onClose}
              title="Fechar"
            />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>
        {footer && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
};

Object.assign(window, { Drawer });
