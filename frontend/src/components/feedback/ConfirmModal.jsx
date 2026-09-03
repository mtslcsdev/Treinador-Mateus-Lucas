const ConfirmModal = ({
  kind = 'confirmar',
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  children,
  style
}) => {
  const kindStyles = {
    perigo: { bg: 'var(--danger-light)', border: 'var(--danger)', btnBg: 'var(--danger)' },
    atencao: { bg: 'var(--warning-light)', border: 'var(--warning)', btnBg: 'var(--warning)' },
    confirmar: { bg: 'var(--primary-light)', border: 'var(--primary)', btnBg: 'var(--primary)' }
  };

  const k = kindStyles[kind] || kindStyles.confirmar;

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--overlay-scrim)',
        zIndex: 99998,
        animation: 'fadeIn 0.2s ease-out'
      }} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          minWidth: '340px',
          maxWidth: '480px',
          boxShadow: 'var(--shadow-modal)',
          zIndex: 99999,
          animation: 'slideUp 0.3s ease-out',
          ...style
        }}
      >
        <h2 style={{
          fontSize: 'var(--text-17)',
          fontWeight: 'var(--weight-bold)',
          margin: '0 0 12px 0',
          color: 'var(--text-primary)'
        }}>
          {title}
        </h2>
        {message && (
          <p style={{
            fontSize: 'var(--text-13)',
            color: 'var(--text-secondary)',
            margin: '0 0 16px 0',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            {message}
          </p>
        )}
        {children && (
          <div style={{ marginBottom: '16px' }}>
            {children}
          </div>
        )}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={kind} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, -40%); opacity: 0; } to { transform: translate(-50%, -50%); opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
};

Object.assign(window, { ConfirmModal });
