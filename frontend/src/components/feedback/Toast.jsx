const Toast = ({
  kind = 'sucesso',
  children,
  style
}) => {
  const kindStyles = {
    sucesso: {
      bg: 'var(--success-light)',
      fg: 'var(--success)',
      icon: 'check-circle'
    },
    erro: {
      bg: 'var(--danger-light)',
      fg: 'var(--danger)',
      icon: 'alert-circle'
    },
    aviso: {
      bg: 'var(--warning-light)',
      fg: 'var(--warning)',
      icon: 'triangle-alert'
    },
    info: {
      bg: 'var(--primary-light)',
      fg: 'var(--primary)',
      icon: 'info'
    }
  };

  const k = kindStyles[kind] || kindStyles.sucesso;

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: k.bg,
        color: k.fg,
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-13-5)',
        fontWeight: 'var(--weight-medium)',
        boxShadow: 'var(--shadow-md)',
        animation: 'slideIn 0.2s ease-out',
        ...style
      }}
    >
      <Icon name={k.icon} size={18} color={k.fg} />
      {children}
    </div>
  );
};

Object.assign(window, { Toast });
