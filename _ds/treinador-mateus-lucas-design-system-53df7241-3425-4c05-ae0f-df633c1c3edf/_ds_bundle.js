/* @ds-bundle: {"format":4,"namespace":"TreinadorMateusLucasDesignSystem_53df72","components":[{"name":"ButtonVariants","sourcePath":"components/core/Button.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"},{"name":"AthleteCard","sourcePath":"components/data/AthleteCard.jsx"},{"name":"CycleCard","sourcePath":"components/data/CycleCard.jsx"},{"name":"CycleGrid","sourcePath":"components/data/CycleGrid.jsx"},{"name":"DashboardStatCard","sourcePath":"components/data/DashboardStatCard.jsx"},{"name":"DayCard","sourcePath":"components/data/DayCard.jsx"},{"name":"ExecutionStats","sourcePath":"components/data/ExecutionStats.jsx"},{"name":"ProgressRing","sourcePath":"components/data/ProgressRing.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"StatItem","sourcePath":"components/data/StatItem.jsx"},{"name":"VolumeChart","sourcePath":"components/data/VolumeChart.jsx"},{"name":"WorkoutCard","sourcePath":"components/data/WorkoutCard.jsx"},{"name":"WorkoutsTable","sourcePath":"components/data/WorkoutsTable.jsx"},{"name":"ZoneCard","sourcePath":"components/data/ZoneCard.jsx"},{"name":"ConfirmModal","sourcePath":"components/feedback/ConfirmModal.jsx"},{"name":"FeedbackChip","sourcePath":"components/feedback/FeedbackChip.jsx"},{"name":"PhaseBadge","sourcePath":"components/feedback/PhaseBadge.jsx"},{"name":"RaceTargetBanner","sourcePath":"components/feedback/RaceTargetBanner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"TrainingTypeBadge","sourcePath":"components/feedback/TrainingTypeBadge.jsx"},{"name":"ValidationItem","sourcePath":"components/feedback/ValidationItem.jsx"},{"name":"CopyWorkoutDialog","sourcePath":"components/forms/CopyWorkoutDialog.jsx"},{"name":"QuickAdd","sourcePath":"components/forms/QuickAdd.jsx"},{"name":"WorkoutBuilder","sourcePath":"components/forms/WorkoutBuilder.jsx"},{"name":"WorkoutFeedbackForm","sourcePath":"components/forms/WorkoutFeedbackForm.jsx"},{"name":"WorkoutLibrary","sourcePath":"components/forms/WorkoutLibrary.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Drawer","sourcePath":"components/navigation/Drawer.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"WeekNav","sourcePath":"components/navigation/WeekNav.jsx"}],"sourceHashes":{"components/core/Button.jsx":"18ef3f676b94","components/core/Card.jsx":"b25a30c3a601","components/core/EmptyState.jsx":"5ada8e4418d1","components/core/Icon.jsx":"945cc51574d3","components/core/IconButton.jsx":"4cc2080ba54d","components/core/Input.jsx":"816c066b8027","components/core/SectionHeader.jsx":"c624d554c9d3","components/core/Select.jsx":"4fce0da94586","components/core/Toggle.jsx":"8c441f8ab01b","components/data/AthleteCard.jsx":"56f5efb2ec98","components/data/CycleCard.jsx":"ce7b9a547ab9","components/data/CycleGrid.jsx":"8eb2d994e67e","components/data/DashboardStatCard.jsx":"2e9ebcf0f4ef","components/data/DayCard.jsx":"474241f17437","components/data/ExecutionStats.jsx":"0144d4d15672","components/data/ProgressRing.jsx":"866b924bf260","components/data/Sparkline.jsx":"0bb2fd1d52ae","components/data/StatItem.jsx":"a05438589189","components/data/VolumeChart.jsx":"90e54ad692b6","components/data/WorkoutCard.jsx":"650712c59f74","components/data/WorkoutsTable.jsx":"ef19afd89537","components/data/ZoneCard.jsx":"48cac6c83078","components/feedback/ConfirmModal.jsx":"acfd33c7cdbf","components/feedback/FeedbackChip.jsx":"90b0101591a7","components/feedback/PhaseBadge.jsx":"1474db118d9a","components/feedback/RaceTargetBanner.jsx":"2c9d67624eba","components/feedback/Toast.jsx":"3ac8cb5ce60d","components/feedback/TrainingTypeBadge.jsx":"4b9d782e1182","components/feedback/ValidationItem.jsx":"d082746ef91d","components/forms/CopyWorkoutDialog.jsx":"9973006a5fbc","components/forms/QuickAdd.jsx":"564409c13b8a","components/forms/WorkoutBuilder.jsx":"8948bcd143a7","components/forms/WorkoutFeedbackForm.jsx":"dffa420b5ff0","components/forms/WorkoutLibrary.jsx":"1264d2fcf905","components/navigation/AppHeader.jsx":"664594a05e5f","components/navigation/Breadcrumb.jsx":"9c4803896dcf","components/navigation/Drawer.jsx":"132149d0820f","components/navigation/Sidebar.jsx":"1df48cb5c0bd","components/navigation/WeekNav.jsx":"3a284c80e1b2","ui_kits/painel-treinador-v2/app.jsx":"7df2fa990ca2","ui_kits/painel-treinador-v2/cycle.jsx":"82a016f4a43e","ui_kits/painel-treinador-v2/data.js":"f837558472ef","ui_kits/painel-treinador-v2/planilha.jsx":"1038f6e45851","ui_kits/painel-treinador-v2/screens.jsx":"8c4ecb8967b1","ui_kits/painel-treinador/app.jsx":"3f3a52a05c36","ui_kits/painel-treinador/data.js":"77b236709b6f","ui_kits/painel-treinador/screens.jsx":"7a80db4f1e63"},"inlinedExternals":[],"unexposedExports":[{"name":"blockEstimate","sourcePath":"components/forms/WorkoutBuilder.jsx"},{"name":"blockLine","sourcePath":"components/forms/WorkoutBuilder.jsx"},{"name":"estimate","sourcePath":"components/forms/WorkoutBuilder.jsx"},{"name":"hms","sourcePath":"components/forms/WorkoutBuilder.jsx"},{"name":"parseWorkout","sourcePath":"components/forms/QuickAdd.jsx"}]} */

(() => {

const __ds_ns = (window.TreinadorMateusLucasDesignSystem_53df72 = window.TreinadorMateusLucasDesignSystem_53df72 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
const ButtonVariants = {
  primary: {
    bg: 'var(--primary)',
    fg: '#fff',
    hover: 'var(--primary-dark)',
    shadow: 'var(--shadow-button-hover)'
  },
  success: {
    bg: 'var(--success)',
    fg: 'var(--success-on-fill)',
    hover: '#34d399',
    shadow: '0 3px 8px rgba(22,163,74,0.3)'
  },
  danger: {
    bg: 'var(--danger)',
    fg: 'var(--danger-on-fill)',
    hover: '#f87171',
    shadow: '0 3px 8px rgba(220,38,38,0.3)'
  },
  ghost: {
    bg: 'var(--gray-200)',
    fg: 'var(--text-primary)',
    hover: 'var(--gray-300)',
    shadow: 'none'
  },
  back: {
    bg: 'var(--fill-neutral)',
    fg: '#fff',
    hover: 'var(--fill-neutral-hover)',
    shadow: 'none'
  },
  export: {
    bg: 'var(--accent)',
    fg: '#fff',
    hover: '#145fa8',
    shadow: 'none'
  },
  header: {
    bg: 'rgba(255,255,255,0.15)',
    fg: '#fff',
    hover: 'rgba(255,255,255,0.25)',
    shadow: 'none'
  },
  template: {
    bg: '#db2777',
    fg: '#fff',
    hover: '#be185d',
    shadow: '0 4px 12px rgba(219,39,119,0.3)'
  }
};
const SIZES = {
  sm: {
    padding: '5px 10px',
    fontSize: 'var(--text-12)'
  },
  md: {
    padding: '8px 16px',
    fontSize: 'var(--text-13)'
  },
  lg: {
    padding: '10px 16px',
    fontSize: 'var(--text-13)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const v = ButtonVariants[variant] || ButtonVariants.primary;
  const s = SIZES[size] || SIZES.md;
  const active = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: variant === 'header' ? '1px solid rgba(255,255,255,0.3)' : 'none',
      borderRadius: 'var(--radius-sm)',
      background: disabled ? 'var(--gray-200)' : active ? v.hover : v.bg,
      color: disabled ? 'var(--gray-400)' : v.fg,
      opacity: disabled ? 0.45 : 1,
      width: fullWidth ? '100%' : 'auto',
      transform: active && variant !== 'header' ? 'translateY(var(--lift-hover))' : 'none',
      boxShadow: active && variant !== 'header' ? v.shadow : 'none',
      transition: 'background var(--duration-fast),transform 0.1s,box-shadow var(--duration-fast)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ButtonVariants, Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = '2rem',
  variant = 'surface',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const navy = variant === 'navy';
  return /*#__PURE__*/React.createElement("section", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: navy ? 'linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%)' : 'var(--card-bg)',
      color: navy ? '#fff' : 'var(--text-primary)',
      padding,
      borderRadius: 'var(--radius-card)',
      border: navy ? 'none' : '1px solid var(--border)',
      boxShadow: navy ? 'none' : hover ? 'var(--shadow-md)' : 'var(--shadow-card)',
      transition: 'box-shadow var(--duration-base)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
function EmptyState({
  icon = '👟',
  title,
  subtitle,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 20px',
      color: 'var(--text-secondary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 'var(--space-12)'
    }
  }, icon), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-4)',
      fontSize: '15px',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-secondary)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-13)',
      color: 'var(--text-muted)'
    }
  }, subtitle));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/** Renders a Lucide line icon. Requires the lucide UMD script on the page. */
function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  color = 'currentColor',
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = '';
    const ph = document.createElement('i');
    ph.setAttribute('data-lucide', name);
    host.appendChild(ph);
    const draw = () => {
      if (window.lucide && window.lucide.createIcons) {
        try {
          window.lucide.createIcons({
            attrs: {
              width: size,
              height: size,
              'stroke-width': strokeWidth
            }
          });
        } catch (e) {}
      }
    };
    draw();
    if (!window.lucide) {
      const t = setInterval(() => {
        if (window.lucide) {
          draw();
          clearInterval(t);
        }
      }, 120);
      setTimeout(() => clearInterval(t), 4000);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      color,
      flexShrink: 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  tone = 'neutral',
  size = 28,
  title,
  disabled = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    neutral: {
      bg: 'var(--bg-muted)',
      fg: 'var(--text-secondary)',
      border: '1px solid var(--border)',
      hoverBg: 'var(--gray-200)',
      hoverFg: 'var(--text-primary)'
    },
    danger: {
      bg: 'var(--bg-muted)',
      fg: 'var(--text-secondary)',
      border: '1px solid var(--border)',
      hoverBg: 'var(--danger-light)',
      hoverFg: 'var(--danger)'
    },
    primary: {
      bg: 'var(--primary-light)',
      fg: 'var(--primary-on-tint)',
      border: '1px solid rgba(15,58,125,0.2)',
      hoverBg: 'var(--primary)',
      hoverFg: '#fff'
    },
    success: {
      bg: 'rgba(22,163,74,0.12)',
      fg: 'var(--success)',
      border: '1px solid rgba(22,163,74,0.3)',
      hoverBg: 'var(--success)',
      hoverFg: '#fff'
    },
    onDark: {
      bg: 'rgba(255,255,255,0.15)',
      fg: '#fff',
      border: '1px solid rgba(255,255,255,0.25)',
      hoverBg: 'rgba(255,255,255,0.28)',
      hoverFg: '#fff'
    }
  };
  const t = tones[tone] || tones.neutral;
  const on = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    "aria-label": title,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      fontSize: size > 30 ? '14px' : '13px',
      fontFamily: 'var(--font-sans)',
      background: on ? t.hoverBg : t.bg,
      color: on ? t.hoverFg : t.fg,
      border: t.border,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--duration-fast),color var(--duration-fast)',
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  invalid = false,
  mono = false,
  onDark = false,
  type = 'text',
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const bad = invalid || !!error;
  const base = {
    padding: onDark ? '10px 14px' : '9px 12px',
    width: '100%',
    border: onDark ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid var(--input-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: onDark ? '15px' : 'var(--text-13-5)',
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
    fontWeight: mono ? 'var(--weight-semibold)' : 'var(--weight-regular)',
    letterSpacing: mono ? '1px' : 'normal',
    background: onDark ? 'rgba(255,255,255,0.15)' : disabled ? 'var(--bg-muted)' : 'var(--input-bg)',
    color: onDark ? '#fff' : disabled ? 'var(--text-muted)' : 'var(--text-primary)',
    transition: 'border-color var(--duration-fast),box-shadow var(--duration-fast)',
    outline: 'none',
    boxSizing: 'border-box'
  };
  if (bad) {
    base.borderColor = 'var(--danger)';
    base.boxShadow = '0 0 0 3px rgba(220,38,38,0.12)';
  } else if (focus) {
    base.borderColor = onDark ? '#fff' : 'var(--border-focus)';
    base.boxShadow = onDark ? '0 0 0 3px rgba(255,255,255,0.15)' : 'var(--focus-ring)';
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: onDark ? 'var(--text-13)' : '11.5px',
      fontWeight: 'var(--weight-semibold)',
      color: onDark ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)',
      textTransform: onDark ? 'none' : 'uppercase',
      letterSpacing: onDark ? 'normal' : '0.4px'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: base
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)',
      fontSize: '11.5px',
      fontWeight: 'var(--weight-medium)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
function SectionHeader({
  title,
  subtitle,
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--space-20)',
      gap: 'var(--space-12)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      lineHeight: 'var(--leading-tight)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 'var(--text-13)',
      color: 'var(--text-secondary)'
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, actions));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      padding: '9px 12px',
      width: '100%',
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid var(--input-border)',
      borderColor: focus ? 'var(--border-focus)' : 'var(--input-border)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      fontSize: 'var(--text-13-5)',
      fontFamily: 'var(--font-sans)',
      background: disabled ? 'var(--bg-muted)' : 'var(--input-bg)',
      color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function Toggle({
  checked = false,
  onChange,
  label,
  onDark = false
}) {
  const track = {
    position: 'relative',
    width: 44,
    height: 22,
    borderRadius: 11,
    cursor: 'pointer',
    flexShrink: 0,
    background: checked ? '#22c55e' : onDark ? 'rgba(255,255,255,0.3)' : 'var(--gray-300)',
    border: checked ? '1px solid #16a34a' : onDark ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--border)',
    transition: 'background 0.25s'
  };
  const knob = {
    position: 'absolute',
    width: 16,
    height: 16,
    background: '#fff',
    borderRadius: 'var(--radius-round)',
    top: 2,
    left: checked ? 24 : 2,
    transition: 'left 0.25s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: () => onChange && onChange(!checked),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      cursor: 'pointer',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      color: onDark ? 'rgba(255,255,255,0.85)' : 'var(--text-primary)'
    }
  }, label && /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("div", {
    style: track
  }, /*#__PURE__*/React.createElement("div", {
    style: knob
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/data/CycleCard.jsx
try { (() => {
function CycleCard({
  name,
  weeks,
  workouts,
  race,
  isTemplate = false,
  onClick,
  actions,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--bg-surface)',
      border: '1.5px solid',
      borderColor: hover ? 'var(--primary)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-16)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-12)',
      boxShadow: hover ? 'var(--shadow-md)' : 'none',
      transform: hover ? 'translateY(var(--lift-card-hover))' : 'none',
      transition: 'border-color var(--duration-fast),box-shadow var(--duration-fast),transform var(--duration-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      background: 'linear-gradient(135deg,var(--primary-dark),var(--primary))'
    }
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      fontSize: '0.875rem',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-tight)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-10)',
      marginTop: 3
    }
  }, weeks != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      gap: 3
    }
  }, "\uD83D\uDDD3 ", weeks, " sem."), workouts != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      gap: 3
    }
  }, "\uD83C\uDFC3 ", workouts, " trei.")), isTemplate && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-10)',
      fontWeight: 'var(--weight-bold)',
      background: 'rgba(234,179,8,0.15)',
      color: '#92400e',
      border: '1px solid rgba(234,179,8,0.35)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      marginTop: 'var(--space-4)'
    }
  }, "\uD83D\uDCCB Template"), race && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: '10.5px',
      fontWeight: 'var(--weight-semibold)',
      background: 'rgba(251,191,36,0.15)',
      color: '#92400e',
      borderRadius: 'var(--radius-pill)',
      padding: '2px 8px',
      marginTop: 'var(--space-4)'
    }
  }, "\uD83C\uDFAF ", race))), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderTop: '1px solid var(--border)',
      paddingTop: 'var(--space-10)'
    }
  }, actions));
}
Object.assign(__ds_scope, { CycleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CycleCard.jsx", error: String((e && e.message) || e) }); }

// components/data/CycleGrid.jsx
try { (() => {
const DAYS = [['seg', 'SEG'], ['ter', 'TER'], ['qua', 'QUA'], ['qui', 'QUI'], ['sex', 'SEX'], ['sab', 'SÁB'], ['dom', 'DOM']];
const TYPE_COLOR = {
  leve: '#15803d',
  fartlek: '#0369a1',
  progressivo: '#92400e',
  intervalado: '#9d174d',
  repeticoes: '#7e22ce',
  bloco: '#9a3412',
  longao: '#1d4ed8',
  ritmado: '#b45309',
  trt: '#b91c1c'
};
const PHASE_TINT = {
  'Base': 'rgba(22,163,74,0.06)',
  'Específico': 'rgba(234,179,8,0.07)',
  'Polimento': 'rgba(220,38,38,0.06)'
};
function CycleGrid({
  weeks = [],
  onCellClick,
  onWorkoutClick,
  onWorkoutMove,
  onWeekAction,
  style
}) {
  const [menu, setMenu] = React.useState(null);
  const [drag, setDrag] = React.useState(null);
  const maxKm = Math.max(1, ...weeks.map(w => weekKm(w)));
  const drop = (weekId, day) => {
    if (!drag) return;
    if (!(drag.weekId === weekId && drag.day === day) && onWorkoutMove) onWorkoutMove({
      weekId: drag.weekId,
      day: drag.day,
      index: drag.index
    }, {
      weekId,
      day
    }, drag.workout);
    setDrag(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 900
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '190px repeat(7,1fr) 96px',
      gap: 6,
      padding: '0 0 8px',
      borderBottom: '2px solid var(--border)',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color: 'var(--text-secondary)'
    }
  }, "Semana"), DAYS.map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color: 'var(--text-secondary)',
      textAlign: 'center'
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color: 'var(--text-secondary)',
      textAlign: 'right'
    }
  }, "Volume")), weeks.map(w => {
    const km = weekKm(w);
    const empty = !hasAny(w);
    return /*#__PURE__*/React.createElement("div", {
      key: w.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '190px repeat(7,1fr) 96px',
        gap: 6,
        marginBottom: 6,
        alignItems: 'stretch',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        background: PHASE_TINT[w.fase] || 'var(--bg-muted)',
        borderLeft: '3px solid ' + (empty ? 'var(--warning)' : 'var(--accent)')
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-13)',
        fontWeight: 'var(--weight-bold)'
      }
    }, w.nome), /*#__PURE__*/React.createElement("button", {
      onClick: () => setMenu(menu === w.id ? null : w.id),
      title: "A\xE7\xF5es da semana",
      style: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 2,
        color: 'var(--text-muted)',
        display: 'flex',
        borderRadius: 4
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "ellipsis-vertical",
      size: 15
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-10)',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, w.sub), menu === w.id && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '100%',
        left: 8,
        zIndex: 20,
        minWidth: 210,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: 6
      }
    }, [['duplicar', 'copy', 'Duplicar semana'], ['template', 'library', 'Aplicar template…'], ['repetir', 'repeat', 'Repetir em N semanas…'], ['mover', 'calendar-days', 'Deslocar datas…'], ['limpar', 'eraser', 'Limpar semana']].map(([a, ic, l]) => /*#__PURE__*/React.createElement("button", {
      key: a,
      onClick: () => {
        setMenu(null);
        onWeekAction && onWeekAction(w, a);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '8px 10px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-13)',
        color: a === 'limpar' ? 'var(--danger)' : 'var(--text-primary)',
        borderRadius: 'var(--radius-xs)'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-muted)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: ic,
      size: 14
    }), l)))), DAYS.map(([k]) => /*#__PURE__*/React.createElement(Cell, {
      key: k,
      items: w.dias && w.dias[k] || [],
      dragging: drag,
      onAdd: () => onCellClick && onCellClick(w, k),
      onOpen: (t, i) => onWorkoutClick && onWorkoutClick(w, k, t, i),
      onDragStart: (t, i) => setDrag({
        weekId: w.id,
        day: k,
        index: i,
        workout: t
      }),
      onDragEnd: () => setDrag(null),
      onDrop: () => drop(w.id, k)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 4,
        padding: '6px 4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-13)',
        fontWeight: 'var(--weight-black)',
        fontFamily: 'var(--font-mono)',
        color: empty ? 'var(--text-muted)' : 'var(--primary)'
      }
    }, km.toFixed(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: '100%',
        height: 4,
        borderRadius: 2,
        background: 'var(--border)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: '100%',
        width: km / maxKm * 100 + '%',
        background: 'linear-gradient(90deg,var(--accent),var(--primary))'
      }
    }))));
  })), drag && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 'var(--text-12)',
      color: 'var(--primary-on-tint)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--primary-light)',
      border: '1px solid var(--primary-border)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 12px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "move",
    size: 13
  }), "Arrastando ", drag.workout.resumo || drag.workout.tipo, " \u2014 solte em qualquer dia"));
}
function Cell({
  items,
  onAdd,
  onOpen,
  onDragStart,
  onDragEnd,
  onDrop,
  dragging
}) {
  const [hover, setHover] = React.useState(false);
  const [over, setOver] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
      onDrop();
    },
    style: {
      minHeight: 58,
      borderRadius: 'var(--radius-sm)',
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      border: '1px ' + (over ? 'dashed' : 'solid') + ' ' + (over ? 'var(--accent)' : hover ? 'var(--primary)' : 'var(--border)'),
      background: over ? 'var(--primary-light)' : items.length ? 'var(--bg-surface)' : 'var(--bg-muted)',
      outline: over ? '2px solid rgba(24,115,212,0.25)' : 'none',
      transition: 'border-color var(--duration-fast),background var(--duration-fast)'
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    draggable: true,
    onClick: () => onOpen(t, i),
    onDragStart: e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', t.resumo || t.tipo);
      onDragStart(t, i);
    },
    onDragEnd: onDragEnd,
    title: (t.resumo || t.tipo) + ' — clique para copiar/mover, ou arraste',
    style: {
      textAlign: 'left',
      border: 'none',
      cursor: 'grab',
      padding: '4px 6px',
      borderRadius: 3,
      background: 'var(--primary-light)',
      borderLeft: '3px solid ' + (TYPE_COLOR[t.tipo] || 'var(--primary)'),
      fontFamily: 'var(--font-sans)',
      width: '100%',
      minWidth: 0,
      opacity: dragging && dragging.workout === t ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: '10.5px',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--primary-dark)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t.dist ? t.dist + ' km' : t.tipo), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: '9.5px',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t.zona || t.tipo))), hover && !dragging && /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    title: "Adicionar treino",
    style: {
      marginTop: 'auto',
      border: '1px dashed var(--primary-border)',
      background: 'transparent',
      color: 'var(--primary)',
      borderRadius: 3,
      cursor: 'pointer',
      padding: '2px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 13
  })));
}
function weekKm(w) {
  return Object.values(w.dias || {}).flat().reduce((s, t) => s + (t.dist || 0), 0);
}
function hasAny(w) {
  return Object.values(w.dias || {}).flat().length > 0;
}
Object.assign(__ds_scope, { CycleGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CycleGrid.jsx", error: String((e && e.message) || e) }); }

// components/data/DashboardStatCard.jsx
try { (() => {
function DashboardStatCard({
  icon,
  label,
  value,
  meta,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      padding: 'var(--space-12)',
      background: 'var(--bg-surface)',
      border: '1px solid',
      borderColor: hover ? 'var(--primary)' : 'var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: hover ? 'var(--shadow-sm)' : 'none',
      transition: 'all var(--duration-base) ease',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      fontWeight: 'var(--weight-semibold)',
      marginBottom: 'var(--space-4)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-black)',
      color: 'var(--primary)',
      marginBottom: 'var(--space-4)'
    }
  }, value), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-muted)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { DashboardStatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DashboardStatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/DayCard.jsx
try { (() => {
const DOT = {
  feito: 'var(--success)',
  parcial: 'var(--warning)',
  perdido: 'var(--danger)',
  prescrito: 'var(--accent)',
  descanso: 'var(--gray-300)'
};
function DayCard({
  weekday,
  day,
  status = 'prescrito',
  summary,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const rest = status === 'descanso';
  const on = selected || hover;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '10px 8px 12px',
      borderRadius: 'var(--radius-md)',
      cursor: rest ? 'default' : 'pointer',
      minWidth: 0,
      flex: 1,
      border: '1.5px solid ' + (selected ? 'var(--primary)' : hover && !rest ? 'var(--primary)' : 'var(--border)'),
      background: selected ? 'var(--primary-light)' : rest ? 'var(--bg-muted)' : 'var(--bg-surface)',
      fontFamily: 'var(--font-sans)',
      boxShadow: on && !rest ? 'var(--shadow-sm)' : 'none',
      transition: 'all var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      fontWeight: 'var(--weight-bold)',
      color: selected ? 'var(--primary)' : 'var(--text-muted)'
    }
  }, weekday), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.35rem',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1,
      color: rest ? 'var(--text-muted)' : 'var(--text-primary)'
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-10)',
      color: 'var(--text-secondary)',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: DOT[status] || DOT.prescrito,
      flexShrink: 0
    }
  }), summary || (rest ? 'Descanso' : '')));
}
Object.assign(__ds_scope, { DayCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DayCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ExecutionStats.jsx
try { (() => {
const FIELDS = [['dist', 'ruler', 'Distância'], ['tempo', 'timer', 'Tempo'], ['pace', 'gauge', 'Pace real'], ['fc', 'heart-pulse', 'FC média'], ['cadencia', 'footprints', 'Cadência'], ['calorias', 'flame', 'Calorias'], ['elevacao', 'mountain', 'Elevação']];
function ExecutionStats({
  data = {},
  source,
  style
}) {
  const items = FIELDS.filter(([k]) => data[k] != null && data[k] !== '');
  if (!items.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, source && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)',
      marginBottom: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "watch",
    size: 12
  }), source), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(96px,1fr))',
      gap: 8,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px'
    }
  }, items.map(([k, ic, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 11
  }), l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-bold)',
      marginTop: 2,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.3px'
    }
  }, data[k])))));
}
Object.assign(__ds_scope, { ExecutionStats });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ExecutionStats.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressRing.jsx
try { (() => {
function ProgressRing({
  value = 0,
  size = 44,
  thickness = 4,
  label,
  style
}) {
  const r = (size - thickness) / 2,
    c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const color = pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--border)",
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct / 100),
    style: {
      transition: 'stroke-dashoffset 0.5s var(--ease-standard)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size > 40 ? '12px' : '10px',
      fontWeight: 'var(--weight-bold)',
      color
    }
  }, label || Math.round(pct) + '%'));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
function Sparkline({
  data = [],
  width = 104,
  height = 28,
  color = 'var(--accent)',
  fill = true,
  style
}) {
  if (!data.length) return null;
  const max = Math.max(...data, 1),
    min = Math.min(...data, 0),
    span = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const pts = data.map((v, i) => [i * step, height - (v - min) / span * (height - 4) - 2]);
  const line = pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = '0,' + height + ' ' + line + ' ' + width + ',' + height;
  const last = pts[pts.length - 1];
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: '0 0 ' + width + ' ' + height,
    style: {
      display: 'block',
      ...style
    }
  }, fill && /*#__PURE__*/React.createElement("polygon", {
    points: area,
    fill: color,
    opacity: "0.12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: color,
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: last[0],
    cy: last[1],
    r: "2.4",
    fill: color
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/data/AthleteCard.jsx
try { (() => {
function initials(name = '') {
  return name.trim().split(/\s+/).filter(w => w.length > 2 || /^[A-ZÀ-Ú]/.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase() || name.slice(0, 1).toUpperCase();
}
function AthleteCard({
  name,
  cycles = 0,
  workouts = 0,
  hasNotes = false,
  selected = false,
  onClick,
  actions,
  adherence,
  trend,
  nextWorkout,
  testPace,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const rich = adherence != null || trend && trend.length || nextWorkout;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    title: 'Abrir ciclos de ' + name,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: selected ? 'var(--primary-light)' : 'var(--bg-surface)',
      border: '2px solid',
      borderColor: hover || selected ? 'var(--primary)' : '#e5e7eb',
      borderRadius: 'var(--radius-card-athlete)',
      padding: rich ? '1.6rem 1.5rem 1.4rem' : '2.2rem',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: rich ? '1.1rem' : '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-card-athlete-hover)' : 'var(--shadow-card-athlete)',
      transform: hover ? 'translateY(var(--lift-card-hover-lg))' : 'none',
      transition: 'all var(--duration-slow) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 5,
      background: 'linear-gradient(90deg,#0f3a7d 0%,#1873d4 100%)'
    }
  }), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      display: 'flex',
      gap: 'var(--space-4)',
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--duration-fast)'
    }
  }, actions), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-card)',
      background: 'linear-gradient(135deg,var(--primary) 0%,var(--accent) 100%)',
      color: '#fff',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      letterSpacing: 'var(--tracking-title)'
    }
  }, initials(name)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      fontSize: '0.95rem',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginTop: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clipboard-list",
    size: 13
  }), cycles, " ciclo", cycles !== 1 ? 's' : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "activity",
    size: 13
  }), workouts, " treino", workouts !== 1 ? 's' : ''), hasNotes && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sticky-note",
    size: 13
  }), "notas"))), adherence != null && /*#__PURE__*/React.createElement(__ds_scope.ProgressRing, {
    value: adherence
  })), rich && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)'
    }
  }, "Volume 8 semanas"), trend && trend.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.Sparkline, {
    data: trend,
    width: 116,
    height: 30
  })), testPace && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)'
    }
  }, "Teste 3km"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '14px',
      letterSpacing: '0.5px',
      color: 'var(--text-primary)'
    }
  }, testPace))), nextWorkout && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 10px',
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar-days",
    size: 14,
    color: "var(--primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, nextWorkout)));
}
Object.assign(__ds_scope, { AthleteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AthleteCard.jsx", error: String((e && e.message) || e) }); }

// components/data/StatItem.jsx
try { (() => {
function StatItem({
  label,
  value,
  tone,
  style
}) {
  const tones = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 80,
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 10px',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: '0.68rem',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      marginBottom: 'var(--space-4)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-27)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1,
      color: tones[tone] || 'var(--primary)'
    }
  }, value));
}
Object.assign(__ds_scope, { StatItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatItem.jsx", error: String((e && e.message) || e) }); }

// components/data/VolumeChart.jsx
try { (() => {
function VolumeChart({
  title = 'Volume por semana',
  note,
  data = [],
  style
}) {
  const max = Math.max(1, ...data.map(d => d.value || 0));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '18px 20px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("span", null, title), note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-muted)'
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'var(--space-6)',
      height: 130,
      overflowX: 'auto'
    }
  }, data.map((d, i) => {
    const empty = !d.value;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-4)',
        minWidth: 40,
        flex: 1,
        maxWidth: 72,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-10)',
        fontWeight: 'var(--weight-bold)',
        color: 'var(--text-secondary)',
        height: 14,
        lineHeight: '14px'
      }
    }, empty ? '' : d.value), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        minHeight: 3,
        height: Math.max(3, d.value / max * 82) + '%',
        borderRadius: '4px 4px 0 0',
        opacity: empty ? 0.6 : 1,
        background: empty ? 'var(--border)' : 'linear-gradient(180deg,var(--accent) 0%,var(--primary) 100%)',
        transition: 'height 0.5s var(--ease-overshoot)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-9)',
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        paddingTop: 'var(--space-4)',
        borderTop: '1px solid var(--border)',
        width: '100%'
      }
    }, d.label));
  })));
}
Object.assign(__ds_scope, { VolumeChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/VolumeChart.jsx", error: String((e && e.message) || e) }); }

// components/data/WorkoutCard.jsx
try { (() => {
function WorkoutCard({
  weekday,
  day,
  month,
  badge,
  phase,
  description,
  chips = [],
  actions,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--bg-surface)',
      border: '1.5px solid',
      borderColor: hover ? 'var(--primary)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      marginBottom: 'var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-10)',
      boxShadow: hover ? '0 0 0 3px rgba(15,58,125,0.06),var(--shadow-sm)' : 'none',
      transition: 'border-color var(--duration-fast),box-shadow var(--duration-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      paddingBottom: 'var(--space-8)',
      borderBottom: '1px solid var(--border)'
    }
  }, day ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      fontWeight: 'var(--weight-semibold)'
    }
  }, weekday), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-black)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-secondary)',
      fontWeight: 'var(--weight-medium)',
      textTransform: 'uppercase'
    }
  }, month)) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-muted)'
    }
  }, "Sem data")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 5
    }
  }, badge, phase), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-13)',
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-relaxed)',
      whiteSpace: 'pre-line'
    }
  }, description), chips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      padding: '5px 10px',
      borderRadius: 'var(--radius-xs)',
      fontWeight: 'var(--weight-medium)',
      width: 'fit-content'
    }
  }, c)))), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      justifyContent: 'flex-end',
      paddingTop: 'var(--space-6)',
      borderTop: '1px solid var(--border)'
    }
  }, actions));
}
Object.assign(__ds_scope, { WorkoutCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/WorkoutCard.jsx", error: String((e && e.message) || e) }); }

// components/data/WorkoutsTable.jsx
try { (() => {
function WorkoutsTable({
  columns = [],
  rows = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      background: 'linear-gradient(90deg,#0f3a7d 0%,#051b2f 100%)',
      borderBottom: '3px solid var(--header-rule)'
    }
  }, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: '1rem',
      textAlign: 'left',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color: '#fff'
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    cells: r,
    last: i === rows.length - 1
  })))));
}
function Row({
  cells,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'rgba(15,58,125,0.03)' : 'transparent',
      boxShadow: hover ? 'inset 0 0 8px rgba(15,58,125,0.06)' : 'none'
    }
  }, cells.map((c, i) => /*#__PURE__*/React.createElement("td", {
    key: i,
    style: {
      padding: '1rem',
      fontSize: '0.9rem',
      borderBottom: last ? 'none' : '1px solid var(--border-color)'
    }
  }, c)));
}
Object.assign(__ds_scope, { WorkoutsTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/WorkoutsTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ZoneCard.jsx
try { (() => {
const ZONES = {
  Z1: {
    emoji: '🟢',
    name: 'Recuperação',
    color: 'var(--z1-on-dark)'
  },
  Z2: {
    emoji: '🔵',
    name: 'Leve / Fundo',
    color: 'var(--z2-on-dark)'
  },
  Z3: {
    emoji: '🟡',
    name: 'Aeróbio',
    color: 'var(--z3-on-dark)'
  },
  Z4: {
    emoji: '🟠',
    name: 'Limiar',
    color: 'var(--z4-on-dark)'
  },
  Z5: {
    emoji: '🔴',
    name: 'Máxima',
    color: 'var(--z5-on-dark)'
  }
};
function ZoneCard({
  zone = 'Z4',
  pace,
  speed,
  name,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const z = ZONES[zone] || ZONES.Z4;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderTop: '3px solid ' + z.color,
      borderRadius: 'var(--radius-md)',
      padding: '14px 12px',
      textAlign: 'center',
      transform: hover ? 'translateY(-3px)' : 'none',
      transition: 'transform var(--duration-base),background var(--duration-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-13)',
      marginBottom: 'var(--space-6)',
      color: 'rgba(255,255,255,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, z.emoji, " ", zone), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-22)',
      fontWeight: 'var(--weight-black)',
      color: '#fff',
      marginBottom: 'var(--space-6)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '1px'
    }
  }, pace), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'rgba(255,255,255,0.7)'
    }
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      margin: '2px 0',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("strong", null, name || z.name)), speed && /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      margin: '2px 0',
      lineHeight: 1.4
    }
  }, speed)));
}
Object.assign(__ds_scope, { ZoneCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ZoneCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ConfirmModal.jsx
try { (() => {
const ICONS = {
  perigo: '🗑️',
  atencao: '⚠️',
  confirmar: '❓'
};
function ConfirmModal({
  kind = 'perigo',
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-20)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px 22px',
      maxWidth: 420,
      width: '100%',
      boxShadow: 'var(--shadow-modal)',
      textAlign: 'center',
      border: '1px solid rgba(15,58,125,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 'var(--space-12)'
    }
  }, ICONS[kind] || '❓'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-17)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-8)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)',
      marginBottom: '22px',
      whiteSpace: 'pre-line'
    }
  }, message), children, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-10)',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onCancel,
    style: {
      padding: '9px 22px',
      fontWeight: 'var(--weight-bold)',
      fontSize: '13.5px'
    }
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: kind === 'perigo' ? 'danger' : 'primary',
    onClick: onConfirm,
    style: {
      padding: '9px 22px',
      fontWeight: 'var(--weight-bold)',
      fontSize: '13.5px'
    }
  }, confirmLabel))));
}
Object.assign(__ds_scope, { ConfirmModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ConfirmModal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FeedbackChip.jsx
try { (() => {
const LEVELS = {
  'muito-facil': {
    bg: '#dcfce7',
    fg: '#15803d',
    label: 'Muito fácil'
  },
  'facil': {
    bg: '#cffafe',
    fg: '#0c4a6e',
    label: 'Fácil'
  },
  'normal': {
    bg: '#fef3c7',
    fg: '#92400e',
    label: 'Normal'
  },
  'dificil': {
    bg: '#fed7aa',
    fg: '#92400e',
    label: 'Difícil'
  },
  'muito-dificil': {
    bg: '#fee2e2',
    fg: '#991b1b',
    label: 'Muito difícil'
  }
};
function FeedbackChip({
  level = 'normal',
  children,
  style
}) {
  const l = LEVELS[level] || LEVELS.normal;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 'var(--radius-xs)',
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-semibold)',
      whiteSpace: 'nowrap',
      background: l.bg,
      color: l.fg,
      ...style
    }
  }, children || l.label);
}
Object.assign(__ds_scope, { FeedbackChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FeedbackChip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/PhaseBadge.jsx
try { (() => {
const PHASES = {
  'Base': {
    bg: '#dcfce7',
    fg: '#15803d'
  },
  'Específico': {
    bg: '#fef9c3',
    fg: '#92400e'
  },
  'Polimento': {
    bg: '#fee2e2',
    fg: '#991b1b'
  }
};
function PhaseBadge({
  phase = 'Base',
  style
}) {
  const p = PHASES[phase] || PHASES.Base;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '3px 9px',
      borderRadius: 'var(--radius-xs)',
      fontSize: '11.5px',
      fontWeight: 'var(--weight-semibold)',
      whiteSpace: 'nowrap',
      background: p.bg,
      color: p.fg,
      ...style
    }
  }, phase);
}
Object.assign(__ds_scope, { PhaseBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/PhaseBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/RaceTargetBanner.jsx
try { (() => {
function RaceTargetBanner({
  name,
  detail,
  days,
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg,#fef9c3,#fefce8)',
      border: '1.5px solid #fbbf24',
      borderRadius: 'var(--radius-md)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-14)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-bold)',
      color: '#92400e'
    }
  }, "\uD83C\uDFAF ", name), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      color: '#a16207',
      marginTop: 2
    }
  }, detail)), days != null && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 'var(--weight-black)',
      color: '#d97706',
      lineHeight: 1
    }
  }, days), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      color: '#92400e',
      fontWeight: 'var(--weight-semibold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)'
    }
  }, "dias")), actions);
}
Object.assign(__ds_scope, { RaceTargetBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/RaceTargetBanner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const KINDS = {
  sucesso: {
    bg: '#15803d',
    icon: '✅'
  },
  erro: {
    bg: '#b91c1c',
    icon: '❌'
  },
  aviso: {
    bg: '#b45309',
    icon: '⚠️'
  },
  info: {
    bg: '#0369a1',
    icon: 'ℹ️'
  }
};
function Toast({
  kind = 'info',
  children,
  style
}) {
  const k = KINDS[kind] || KINDS.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      color: '#fff',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-13-5)',
      boxShadow: 'var(--shadow-lg)',
      maxWidth: 340,
      lineHeight: 'var(--leading-body)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-10)',
      border: '1px solid rgba(255,255,255,0.15)',
      background: k.bg,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, k.icon), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/TrainingTypeBadge.jsx
try { (() => {
const TYPES = {
  leve: {
    bg: '#dcfce7',
    fg: '#15803d',
    label: 'Leve'
  },
  fartlek: {
    bg: '#e0f2fe',
    fg: '#0369a1',
    label: 'Fartlek'
  },
  progressivo: {
    bg: '#fef9c3',
    fg: '#92400e',
    label: 'Progressivo'
  },
  intervalado: {
    bg: '#fce7f3',
    fg: '#9d174d',
    label: 'Intervalado'
  },
  repeticoes: {
    bg: '#f3e8ff',
    fg: '#7e22ce',
    label: 'Repetições'
  },
  bloco: {
    bg: '#ffedd5',
    fg: '#9a3412',
    label: 'Bloco'
  },
  longao: {
    bg: '#dbeafe',
    fg: '#1d4ed8',
    label: 'Longão'
  },
  ritmado: {
    bg: '#fef3c7',
    fg: '#b45309',
    label: 'Ritmado'
  },
  trt: {
    bg: '#fee2e2',
    fg: '#b91c1c',
    label: 'TRT'
  },
  default: {
    bg: 'var(--bg-muted)',
    fg: 'var(--text-secondary)',
    label: 'Treino'
  }
};
function TrainingTypeBadge({
  type = 'default',
  children,
  style
}) {
  const t = TYPES[type] || TYPES.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-bold)',
      whiteSpace: 'nowrap',
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, children || t.label);
}
Object.assign(__ds_scope, { TrainingTypeBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/TrainingTypeBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ValidationItem.jsx
try { (() => {
const LEVELS = {
  erro: {
    bg: 'rgba(220,38,38,0.05)',
    border: 'var(--danger)',
    icon: '⛔'
  },
  aviso: {
    bg: 'rgba(217,119,6,0.05)',
    border: 'var(--warning)',
    icon: '⚠️'
  },
  info: {
    bg: 'rgba(8,145,178,0.05)',
    border: 'var(--info)',
    icon: 'ℹ️'
  }
};
function ValidationItem({
  level = 'aviso',
  title,
  description,
  action,
  style
}) {
  const l = LEVELS[level] || LEVELS.aviso;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-10)',
      padding: 'var(--space-10)',
      background: l.bg,
      borderLeft: '3px solid ' + l.border,
      borderRadius: 'var(--radius-xs)',
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      flexShrink: 0,
      marginTop: 2
    }
  }, l.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      marginBottom: 2
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-secondary)',
      lineHeight: 1.4
    }
  }, description)), action);
}
Object.assign(__ds_scope, { ValidationItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ValidationItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/CopyWorkoutDialog.jsx
try { (() => {
const DAYS = [['seg', 'Seg'], ['ter', 'Ter'], ['qua', 'Qua'], ['qui', 'Qui'], ['sex', 'Sex'], ['sab', 'Sáb'], ['dom', 'Dom']];
function CopyWorkoutDialog({
  workout = {},
  origin,
  weeks = [],
  onConfirm,
  onEdit,
  onRemove,
  onCancel,
  style
}) {
  const [mode, setMode] = React.useState('copiar');
  const [weekId, setWeekId] = React.useState(origin ? origin.weekId : weeks[0] && weeks[0].id);
  const [days, setDays] = React.useState([]);
  const single = mode === 'mover';
  const toggle = d => setDays(ds => single ? [d] : ds.includes(d) ? ds.filter(x => x !== d) : [...ds, d]);
  const ready = days.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      zIndex: 99990,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      background: 'var(--bg-surface)',
      width: '100%',
      maxWidth: 460,
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-modal)',
      overflow: 'hidden',
      border: '1px solid rgba(15,58,125,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%)',
      color: '#fff',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.02rem',
      fontWeight: 'var(--weight-bold)'
    }
  }, "Copiar ou mover treino"), origin && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      opacity: 0.78,
      marginTop: 2
    }
  }, "de ", origin.weekNome, " \xB7 ", origin.dayLabel)), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    "aria-label": "Fechar",
    style: {
      background: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.25)',
      color: '#fff',
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TrainingTypeBadge, {
    type: workout.tipo
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      minWidth: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, workout.resumo || workout.tipo), workout.dist != null && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 'var(--text-12)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-secondary)'
    }
  }, workout.dist, " km")), /*#__PURE__*/React.createElement(Field, {
    label: "A\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: 4
    }
  }, [['copiar', 'copy', 'Copiar'], ['mover', 'move', 'Mover']].map(([k, ic, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => {
      setMode(k);
      setDays(d => d.slice(0, 1));
    },
    style: {
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '8px 10px',
      border: 'none',
      borderRadius: 'var(--radius-xs)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      background: mode === k ? 'var(--bg-surface)' : 'transparent',
      color: mode === k ? 'var(--primary)' : 'var(--text-secondary)',
      boxShadow: mode === k ? 'var(--shadow-xs)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 15
  }), l)))), /*#__PURE__*/React.createElement(Field, {
    label: "Semana de destino"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    value: weekId,
    onChange: e => setWeekId(e.target.value),
    options: weeks.map(w => ({
      value: w.id,
      label: w.nome + (w.sub ? ' — ' + w.sub : '')
    }))
  })), /*#__PURE__*/React.createElement(Field, {
    label: single ? 'Dia de destino' : 'Dias de destino',
    note: single ? 'Mover aceita um dia' : 'Marque quantos quiser'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 6
    }
  }, DAYS.map(([k, l]) => {
    const on = days.includes(k);
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => toggle(k),
      style: {
        minHeight: 44,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-12)',
        fontWeight: 'var(--weight-bold)',
        border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--border)'),
        background: on ? 'var(--primary-light)' : 'var(--bg-surface)',
        color: on ? 'var(--primary-on-tint)' : 'var(--text-secondary)'
      }
    }, l);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, onEdit && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onEdit,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "pencil",
    size: 15
  }), "Editar"), onRemove && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "danger",
    onClick: onRemove,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "trash-2",
    size: 15
  }), "Remover"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onCancel
  }, "Cancelar"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    disabled: !ready,
    onClick: () => onConfirm && onConfirm({
      mode,
      weekId,
      days
    }),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15
  }), mode === 'mover' ? 'Mover' : 'Copiar' + (days.length > 1 ? ' (' + days.length + ')' : '')))))));
}
function Field({
  label,
  note,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, label, note && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-muted)'
    }
  }, note)), children);
}
Object.assign(__ds_scope, { CopyWorkoutDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CopyWorkoutDialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuickAdd.jsx
try { (() => {
const TYPE_WORDS = {
  leve: 'leve',
  regenerativo: 'leve',
  reg: 'leve',
  fartlek: 'fartlek',
  progressivo: 'progressivo',
  prog: 'progressivo',
  intervalado: 'intervalado',
  int: 'intervalado',
  tiros: 'intervalado',
  repeticoes: 'repeticoes',
  'repetições': 'repeticoes',
  rep: 'repeticoes',
  bloco: 'bloco',
  blocos: 'bloco',
  longao: 'longao',
  'longão': 'longao',
  long: 'longao',
  ritmado: 'ritmado',
  ritmo: 'ritmado',
  trt: 'trt'
};
const pad = n => String(Math.round(n)).padStart(2, '0');
const hhmm = s => s >= 3600 ? pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60) : pad(Math.floor(s / 60)) + ':' + pad(s % 60);

/** Parses coach shorthand into a workout draft. */
function parseWorkout(text, zones) {
  const raw = (text || '').toLowerCase().trim();
  if (!raw) return null;
  const blocos = [];
  let tipo = null,
    fase = null;
  for (const w of raw.split(/\s+/)) {
    if (TYPE_WORDS[w]) tipo = TYPE_WORDS[w];
    if (w === 'base' || w === 'específico' || w === 'especifico' || w === 'polimento') fase = w === 'base' ? 'Base' : w === 'polimento' ? 'Polimento' : 'Específico';
  }
  const interval = (raw.match(/int(?:ervalo)?\s*([0-9]+\s*(?:min|s|')?(?:\s*\w+)?)/) || [])[1] || '';

  // repetition form: 6x800, 6x800m, 6x0.8k, 10x1min
  const repRe = /(\d+)\s*x\s*(\d+(?:[.,]\d+)?)\s*(km|k|m|min)?/g;
  let m,
    found = false;
  while (m = repRe.exec(raw)) {
    found = true;
    const reps = Number(m[1]);
    const val = Number(m[2].replace(',', '.'));
    const unit = m[3] || 'm';
    const km = unit === 'm' ? val / 1000 : unit === 'min' ? val / 6 : val; // 1min ≈ 0.167km placeholder
    blocos.push({
      repeticoes: reps,
      distancia: Math.round(km * 1000) / 1000,
      zona: zoneIn(raw) || 'Z4',
      intervalo: interval
    });
    if (!tipo) tipo = reps >= 8 ? 'repeticoes' : 'intervalado';
  }
  if (!found) {
    const dm = raw.match(/(\d+(?:[.,]\d+)?)\s*(km|k)\b/);
    const tm = raw.match(/(\d+)\s*min\b/);
    if (dm) blocos.push({
      repeticoes: 1,
      distancia: Number(dm[1].replace(',', '.')),
      zona: zoneIn(raw) || 'Z2',
      intervalo: ''
    });else if (tm) blocos.push({
      repeticoes: 1,
      distancia: 0,
      duracao: Number(tm[1]),
      zona: zoneIn(raw) || 'Z1',
      intervalo: ''
    });else return null;
  }
  if (!tipo) {
    const z = blocos[0].zona;
    tipo = z === 'Z1' ? 'leve' : z === 'Z2' ? 'longao' : z === 'Z3' ? 'progressivo' : z === 'Z4' ? 'ritmado' : 'intervalado';
  }
  const dist = Math.round(blocos.reduce((s, b) => s + (b.distancia || 0) * (b.repeticoes || 1), 0) * 10) / 10;
  let min = 0,
    max = 0;
  blocos.forEach(b => {
    const km = (b.distancia || 0) * (b.repeticoes || 1);
    const z = zones && zones[b.zona];
    if (z) {
      min += km * z.min;
      max += km * z.max;
    }
    if (b.duracao) {
      min += b.duracao * 60;
      max += b.duracao * 60;
    }
  });
  return {
    tipo,
    fase: fase || 'Base',
    blocos,
    dist,
    minTxt: hhmm(min),
    maxTxt: hhmm(max),
    resumo: blocos.map(b => (b.repeticoes > 1 ? b.repeticoes + 'x ' + b.distancia * 1000 + 'm' : b.duracao ? b.duracao + 'min' : b.distancia + 'km') + ' ' + b.zona + (b.intervalo ? ' int ' + b.intervalo : '')).join(' + ')
  };
}
function zoneIn(s) {
  const m = s.match(/\bz([1-5])\b/);
  return m ? 'Z' + m[1] : null;
}
function QuickAdd({
  zones,
  placeholder = '8k z2 · 6x800 z4 int 2min · 40min z1',
  onAdd,
  autoFocus,
  style
}) {
  const [text, setText] = React.useState('');
  const parsed = parseWorkout(text, zones);
  const submit = () => {
    if (parsed) {
      onAdd && onAdd(parsed, text);
      setText('');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--accent)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "wand-sparkles",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    value: text,
    autoFocus: autoFocus,
    placeholder: placeholder,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') submit();
    },
    style: {
      width: '100%',
      padding: '9px 12px 9px 33px',
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid ' + (parsed ? 'var(--accent)' : 'var(--input-border)'),
      fontSize: 'var(--text-13-5)',
      fontFamily: 'var(--font-sans)',
      background: 'var(--input-bg)',
      color: 'var(--text-primary)',
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: !parsed,
    style: {
      minHeight: 38,
      padding: '0 14px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      cursor: parsed ? 'pointer' : 'not-allowed',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      background: parsed ? 'var(--primary)' : 'var(--gray-200)',
      color: parsed ? '#fff' : 'var(--gray-400)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 15
  }), "Adicionar")), parsed && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
      flexWrap: 'wrap',
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TrainingTypeBadge, {
    type: parsed.tipo
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, parsed.resumo), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ruler",
    size: 12
  }), parsed.dist, " km"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "timer",
    size: 12
  }), parsed.minTxt, "\u2013", parsed.maxTxt)));
}
Object.assign(__ds_scope, { parseWorkout, QuickAdd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuickAdd.jsx", error: String((e && e.message) || e) }); }

// components/forms/WorkoutBuilder.jsx
try { (() => {
const TYPES = ['leve', 'fartlek', 'progressivo', 'intervalado', 'repeticoes', 'bloco', 'longao', 'ritmado', 'trt'];
const LABELS = {
  leve: 'Leve',
  fartlek: 'Fartlek',
  progressivo: 'Progressivo',
  intervalado: 'Intervalado',
  repeticoes: 'Repetições',
  bloco: 'Bloco',
  longao: 'Longão',
  ritmado: 'Ritmado',
  trt: 'TRT'
};
const ZONES = ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'];
const ZONE_NAME = {
  Z1: 'Recuperação',
  Z2: 'Leve / Fundo',
  Z3: 'Aeróbio',
  Z4: 'Limiar',
  Z5: 'Máxima'
};
const ZONE_COLOR = {
  Z1: 'var(--z1)',
  Z2: 'var(--z2)',
  Z3: 'var(--z3)',
  Z4: 'var(--z4)',
  Z5: 'var(--z5)'
};
const pad = n => String(Math.round(n)).padStart(2, '0');
const fmt = s => pad(Math.floor(s / 60)) + ':' + pad(s % 60);
const hms = s => s >= 3600 ? pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(Math.round(s % 60)) : pad(Math.floor(s / 60)) + ':' + pad(Math.round(s % 60));
function blockLine(b, i) {
  const km = Number(b.distancia) || 0;
  const reps = Number(b.repeticoes) || 1;
  const head = reps > 1 ? reps + 'x ' + km + 'km' : 'Correr por ' + km + 'km';
  return i + 1 + '. ' + head + ' — Intensidade ' + b.zona + (b.intervalo ? ' · Intervalo: ' + b.intervalo : '');
}

/** Total distance and the min/max duration of a block list against a zone table. */
function estimate(blocks, zones) {
  let min = 0,
    max = 0,
    dist = 0;
  (blocks || []).forEach(b => {
    const km = (Number(b.distancia) || 0) * (Number(b.repeticoes) || 1);
    const z = zones && zones[b.zona];
    dist += km;
    if (z) {
      min += km * z.min;
      max += km * z.max;
    }
  });
  return {
    dist: Math.round(dist * 10) / 10,
    min,
    max,
    minTxt: hms(min),
    maxTxt: hms(max)
  };
}

/** Distance and duration window of a single block. */
function blockEstimate(b, zones) {
  const km = (Number(b.distancia) || 0) * (Number(b.repeticoes) || 1);
  const z = zones && zones[b.zona];
  return {
    km: Math.round(km * 100) / 100,
    paceMin: z ? fmt(z.min) : null,
    paceMax: z ? fmt(z.max) : null,
    min: z ? km * z.min : 0,
    max: z ? km * z.max : 0,
    minTxt: z ? hms(km * z.min) : '—',
    maxTxt: z ? hms(km * z.max) : '—'
  };
}
function WorkoutBuilder({
  zones,
  athlete,
  value,
  onChange,
  onSave,
  onSaveToLibrary,
  onCancel,
  style
}) {
  const [w, setW] = React.useState(value || {
    tipo: 'progressivo',
    fase: 'Base',
    data: '',
    obs: '',
    blocos: [{
      repeticoes: 1,
      distancia: 8,
      zona: 'Z2',
      intervalo: ''
    }]
  });
  const set = patch => {
    const next = {
      ...w,
      ...patch
    };
    setW(next);
    onChange && onChange(next);
  };
  const setBlock = (i, patch) => {
    const bl = w.blocos.map((b, j) => j === i ? {
      ...b,
      ...patch
    } : b);
    set({
      blocos: bl
    });
  };
  const est = estimate(w.blocos, zones);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, athlete && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 24px',
      background: 'var(--primary-light)',
      borderBottom: '1px solid var(--border)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "zap",
    size: 15,
    color: "var(--primary-on-tint)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--primary-on-tint)'
    }
  }, "Paces calculados pelas zonas de ", /*#__PURE__*/React.createElement("strong", null, athlete.nome), athlete.teste ? /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 teste 3km ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-bold)'
    }
  }, athlete.teste, "/km")) : null)), /*#__PURE__*/React.createElement(Section, {
    title: "Defini\xE7\xE3o",
    icon: "clipboard-list"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Tipo"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    value: w.tipo,
    onChange: e => set({
      tipo: e.target.value
    }),
    options: TYPES.map(t => ({
      value: t,
      label: LABELS[t]
    }))
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Fase"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    value: w.fase,
    onChange: e => set({
      fase: e.target.value
    }),
    options: ['Base', 'Específico', 'Polimento']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Data"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    type: "date",
    value: w.data,
    onChange: e => set({
      data: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Pr\xE9via"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TrainingTypeBadge, {
    type: w.tipo
  }))))), /*#__PURE__*/React.createElement(Section, {
    title: "Blocos",
    icon: "layers",
    badge: w.blocos.length
  }, w.blocos.map((b, i) => {
    const be = blockEstimate(b, zones);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid ' + (ZONE_COLOR[b.zona] || 'var(--primary)'),
        borderRadius: 'var(--radius-sm)',
        marginBottom: 10,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'rgba(15,58,125,0.04)',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-11)',
        fontWeight: 'var(--weight-bold)',
        color: 'var(--primary)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)'
      }
    }, "Bloco ", i + 1), w.blocos.length > 1 && /*#__PURE__*/React.createElement("button", {
      onClick: () => set({
        blocos: w.blocos.filter((_, j) => j !== i)
      }),
      style: {
        background: 'transparent',
        border: '1px solid rgba(220,38,38,0.25)',
        color: 'var(--danger)',
        padding: '3px 8px',
        borderRadius: 'var(--radius-xs)',
        cursor: 'pointer',
        fontSize: 'var(--text-11)',
        fontWeight: 'var(--weight-semibold)',
        fontFamily: 'var(--font-sans)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "trash-2",
      size: 12
    }), "Remover")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 12px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '78px 1fr 1.2fr',
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Reps"
    }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
      value: String(b.repeticoes),
      onChange: e => setBlock(i, {
        repeticoes: e.target.value
      })
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Km por rep"
    }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
      value: String(b.distancia),
      onChange: e => setBlock(i, {
        distancia: e.target.value
      })
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Intervalo"
    }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
      value: b.intervalo,
      placeholder: "2min trote",
      onChange: e => setBlock(i, {
        intervalo: e.target.value
      })
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Zona \xB7 pace do atleta"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gap: 6
      }
    }, ZONES.map(z => {
      const zd = zones && zones[z];
      const on = b.zona === z;
      return /*#__PURE__*/React.createElement("button", {
        key: z,
        onClick: () => setBlock(i, {
          zona: z
        }),
        title: ZONE_NAME[z],
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '7px 4px',
          minHeight: 52,
          cursor: 'pointer',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-sans)',
          border: '1.5px solid ' + (on ? ZONE_COLOR[z] : 'var(--border)'),
          background: on ? 'var(--bg-surface)' : 'transparent',
          boxShadow: on ? 'inset 0 -3px 0 ' + ZONE_COLOR[z] : 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 'var(--text-12)',
          fontWeight: 'var(--weight-bold)',
          color: on ? ZONE_COLOR[z] : 'var(--text-secondary)'
        }
      }, z), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '9.5px',
          fontFamily: 'var(--font-mono)',
          color: on ? 'var(--text-primary)' : 'var(--text-muted)',
          whiteSpace: 'nowrap'
        }
      }, zd ? fmt(zd.min) + '–' + fmt(zd.max) : '—'));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginTop: 10,
        flexWrap: 'wrap',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xs)',
        padding: '8px 10px'
      }
    }, /*#__PURE__*/React.createElement(Fact, {
      icon: "gauge",
      label: b.zona + ' · ' + ZONE_NAME[b.zona],
      value: be.paceMin ? be.paceMin + ' a ' + be.paceMax + '/km' : '—'
    }), /*#__PURE__*/React.createElement(Fact, {
      icon: "ruler",
      label: "Dist\xE2ncia do bloco",
      value: be.km + ' km'
    }), /*#__PURE__*/React.createElement(Fact, {
      icon: "timer",
      label: "Tempo do bloco",
      value: be.minTxt + ' a ' + be.maxTxt
    }))));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => set({
      blocos: [...w.blocos, {
        repeticoes: 1,
        distancia: 1,
        zona: 'Z4',
        intervalo: ''
      }]
    }),
    style: {
      width: '100%',
      background: 'transparent',
      color: 'var(--primary)',
      border: '1.5px dashed rgba(15,58,125,0.35)',
      padding: 11,
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 15
  }), "Adicionar bloco")), /*#__PURE__*/React.createElement(Section, {
    title: "Estruturado",
    icon: "wand-sparkles",
    note: "Gerado automaticamente"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 14px',
      fontSize: 'var(--text-13)',
      color: 'var(--text-primary)',
      lineHeight: 1.7,
      whiteSpace: 'pre-line'
    }
  }, w.blocos.map(blockLine).join('\n')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    icon: "ruler",
    label: "Dist\xE2ncia total",
    value: est.dist + ' km'
  }), /*#__PURE__*/React.createElement(Metric, {
    icon: "timer",
    label: "Tempo m\xEDnimo",
    value: est.minTxt,
    mono: true
  }), /*#__PURE__*/React.createElement(Metric, {
    icon: "timer",
    label: "Tempo m\xE1ximo",
    value: est.maxTxt,
    mono: true
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 'var(--text-11)',
      color: 'var(--text-muted)',
      lineHeight: 1.6
    }
  }, "Faixa calculada com as zonas do atleta (incrementos de 20s a partir do teste de 3km). Ao salvar na biblioteca, o treino guarda ", /*#__PURE__*/React.createElement("strong", null, "zonas"), ", n\xE3o paces \u2014 ao aplicar em outro atleta, o tempo \xE9 recalculado com as zonas dele.")), /*#__PURE__*/React.createElement(Section, {
    title: "Observa\xE7\xF5es",
    icon: "message-square"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    value: w.obs,
    onChange: e => set({
      obs: e.target.value
    }),
    placeholder: "Ex: hidratar bem, terreno plano"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderTop: '1px solid var(--border)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: () => onSaveToLibrary && onSaveToLibrary(w),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "library",
    size: 15
  }), "Salvar na biblioteca"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, onCancel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onCancel
  }, "Cancelar"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => onSave && onSave({
      ...w,
      ...est
    }),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15
  }), "Salvar treino"))));
}
function Section({
  title,
  icon,
  badge,
  note,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      color: 'var(--primary)',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), title, badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary)',
      color: '#fff',
      fontSize: 'var(--text-10)',
      fontWeight: 'var(--weight-bold)',
      padding: '1px 7px',
      borderRadius: 'var(--radius-pill)',
      letterSpacing: 0
    }
  }, badge), note && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-muted)'
    }
  }, note)), children);
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '11.5px',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.4px'
    }
  }, label), children);
}
function Fact({
  icon,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 11
  }), label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-bold)',
      marginTop: 2,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.3px',
      whiteSpace: 'nowrap'
    }
  }, value));
}
function Metric({
  icon,
  label,
  value,
  mono
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 12
  }), label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-black)',
      color: 'var(--primary)',
      marginTop: 3,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      letterSpacing: mono ? '0.5px' : 'normal'
    }
  }, value));
}
Object.assign(__ds_scope, { hms, blockLine, estimate, blockEstimate, WorkoutBuilder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/WorkoutBuilder.jsx", error: String((e && e.message) || e) }); }

// components/forms/WorkoutFeedbackForm.jsx
try { (() => {
const EFFORT = [{
  level: 'muito-facil',
  label: 'Muito fácil',
  icon: 'smile',
  bg: '#dcfce7',
  fg: '#15803d'
}, {
  level: 'facil',
  label: 'Fácil',
  icon: 'smile',
  bg: '#cffafe',
  fg: '#0c4a6e'
}, {
  level: 'normal',
  label: 'Normal',
  icon: 'meh',
  bg: '#fef3c7',
  fg: '#92400e'
}, {
  level: 'dificil',
  label: 'Difícil',
  icon: 'frown',
  bg: '#fed7aa',
  fg: '#92400e'
}, {
  level: 'muito-dificil',
  label: 'Muito difícil',
  icon: 'frown',
  bg: '#fee2e2',
  fg: '#991b1b'
}];
function WorkoutFeedbackForm({
  value = {},
  onSubmit,
  onSync,
  synced = false,
  style
}) {
  const [v, setV] = React.useState({
    status: value.status || 'feito',
    esforco: value.esforco || '',
    dist: value.dist || '',
    tempo: value.tempo || '',
    comentario: value.comentario || ''
  });
  const set = p => setV({
    ...v,
    ...p
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Group, {
    label: "Fiz o treino?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, [['feito', 'Fiz', 'circle-check'], ['parcial', 'Fiz em parte', 'circle-dashed'], ['perdido', 'Não fiz', 'circle-x']].map(([k, l, ic]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => set({
      status: k
    }),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '9px 14px',
      minHeight: 44,
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      border: '1.5px solid ' + (v.status === k ? 'var(--primary)' : 'var(--border)'),
      background: v.status === k ? 'var(--primary-light)' : 'var(--bg-surface)',
      color: v.status === k ? 'var(--primary-on-tint)' : 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 16
  }), l)))), v.status !== 'perdido' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Group, {
    label: "Como foi o esfor\xE7o?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, EFFORT.map(e => {
    const on = v.esforco === e.level;
    return /*#__PURE__*/React.createElement("button", {
      key: e.level,
      onClick: () => set({
        esforco: e.level
      }),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '9px 12px',
        minHeight: 44,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-12)',
        fontWeight: 'var(--weight-bold)',
        border: '1.5px solid ' + (on ? e.fg : 'var(--border)'),
        background: on ? e.bg : 'var(--bg-surface)',
        color: on ? e.fg : 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: e.icon,
      size: 15
    }), e.label);
  }))), /*#__PURE__*/React.createElement(Group, {
    label: "Dados da corrida",
    note: synced ? 'Importado do relógio' : null
  }, synced ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--text-12)',
      color: 'var(--success)',
      background: 'rgba(22,163,74,0.08)',
      border: '1px solid rgba(22,163,74,0.25)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "watch",
    size: 15
  }), "Dados sincronizados automaticamente \u2014 nada a digitar.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 10,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Dist\xE2ncia (km)",
    value: v.dist,
    onChange: e => set({
      dist: e.target.value
    }),
    placeholder: "8,00"
  }), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Tempo",
    mono: true,
    value: v.tempo,
    onChange: e => set({
      tempo: e.target.value
    }),
    placeholder: "00:42:21"
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onSync,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "refresh-cw",
    size: 15
  }), "Importar")))), /*#__PURE__*/React.createElement(Group, {
    label: "Coment\xE1rio para o treinador"
  }, /*#__PURE__*/React.createElement("textarea", {
    value: v.comentario,
    onChange: e => set({
      comentario: e.target.value
    }),
    placeholder: "Ex: senti a perna pesada nos \xFAltimos 2km, calor forte",
    style: {
      width: '100%',
      minHeight: 96,
      resize: 'vertical',
      padding: '10px 12px',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13-5)',
      lineHeight: 1.6,
      color: 'var(--text-primary)',
      background: 'var(--bg-muted)',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    onClick: () => onSubmit && onSubmit(v),
    style: {
      minHeight: 48,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 'var(--text-13-5)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "send",
    size: 16
  }), "Enviar feedback"));
}
function Group({
  label,
  note,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, label, note && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-muted)'
    }
  }, note)), children);
}
Object.assign(__ds_scope, { WorkoutFeedbackForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/WorkoutFeedbackForm.jsx", error: String((e && e.message) || e) }); }

// components/forms/WorkoutLibrary.jsx
try { (() => {
function WorkoutLibrary({
  items = [],
  onPick,
  onRemove,
  query,
  onQuery,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    value: query || '',
    onChange: e => onQuery && onQuery(e.target.value),
    placeholder: "Buscar na biblioteca...",
    style: {
      width: '100%',
      padding: '9px 12px 9px 32px',
      border: '1.5px solid var(--input-border)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-13-5)',
      fontFamily: 'var(--font-sans)',
      background: 'var(--input-bg)',
      color: 'var(--text-primary)',
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), items.length === 0 ? /*#__PURE__*/React.createElement(__ds_scope.EmptyState, {
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "library",
      size: 32,
      color: "var(--text-muted)"
    }),
    title: "Biblioteca vazia",
    subtitle: "Salve um treino para reutiliz\xE1-lo em qualquer semana"
  }) : items.map((it, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    item: it,
    onPick: onPick,
    onRemove: onRemove
  })));
}
function Row({
  item,
  onPick,
  onRemove
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onPick && onPick(item),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      border: '1.5px solid',
      borderColor: hover ? 'var(--info)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: hover ? '#f0f9ff' : 'var(--bg-surface)',
      transition: 'border-color var(--duration-fast),background var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TrainingTypeBadge, {
    type: item.tipo
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.nome)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      color: 'var(--text-muted)',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ruler",
    size: 12
  }), item.dist, " km"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "layers",
    size: 12
  }), (item.blocos || []).length, " bloco", (item.blocos || []).length !== 1 ? 's' : ''), item.usos != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "repeat",
    size: 12
  }), item.usos, " usos"))), onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove(item);
    },
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      padding: 4,
      borderRadius: 4,
      display: 'flex'
    },
    title: "Remover da biblioteca"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "trash-2",
    size: 15
  })));
}
Object.assign(__ds_scope, { WorkoutLibrary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/WorkoutLibrary.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function AppHeader({
  title = 'Treinador Mateus Lucas',
  logo = '🏃',
  actions,
  onMenu,
  showMenu = false,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem var(--padding-desktop)',
      background: 'linear-gradient(135deg,var(--header-gradient-from) 0%,var(--header-gradient-to) 100%)',
      boxShadow: 'var(--shadow-header)',
      gap: '2rem',
      flexWrap: 'wrap',
      borderBottom: '3px solid var(--header-rule)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-20)',
      fontWeight: 'var(--weight-semibold)',
      color: '#fff',
      letterSpacing: 'var(--tracking-title)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: '0 1 auto',
      minWidth: 250
    }
  }, showMenu && /*#__PURE__*/React.createElement("button", {
    onClick: onMenu,
    "aria-label": "Abrir menu de navega\xE7\xE3o",
    style: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: 24,
      cursor: 'pointer',
      padding: 'var(--space-8)',
      borderRadius: 'var(--radius-sm)'
    }
  }, "\u2630"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2rem',
      fontWeight: 'var(--weight-bold)',
      flexShrink: 0
    }
  }, logo), title), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, actions));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items = [],
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": "Navega\xE7\xE3o",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      padding: '10px 24px',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      fontSize: 'var(--text-13)',
      color: 'var(--text-secondary)',
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        userSelect: 'none'
      }
    }, "\u203A"), /*#__PURE__*/React.createElement("span", {
      onClick: () => !last && onNavigate && onNavigate(i),
      style: {
        color: last ? 'var(--text-primary)' : 'var(--primary)',
        fontWeight: last ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        cursor: last ? 'default' : 'pointer'
      }
    }, it));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Drawer.jsx
try { (() => {
const TONES = {
  primary: 'linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%)',
  info: 'linear-gradient(135deg,#0891b2,#0e7490)',
  success: 'linear-gradient(135deg,#16a34a,#15803d)'
};
function Drawer({
  open = true,
  tone = 'primary',
  title,
  subtitle,
  onClose,
  footer,
  children,
  width = 600,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-scrim-light)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      pointerEvents: open ? 'auto' : 'none',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--duration-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      width: '100%',
      maxWidth: width,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-drawer)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--duration-drawer) var(--ease-drawer)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: TONES[tone] || TONES.primary,
      color: '#fff',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-12)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 'var(--weight-bold)',
      display: 'block',
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-12)',
      opacity: 0.75,
      marginTop: 3,
      display: 'block'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.25)',
      color: '#fff',
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontSize: 16,
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 'var(--space-10)',
      justifyContent: 'flex-end',
      background: 'var(--bg-surface)',
      flexShrink: 0
    }
  }, footer)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function Sidebar({
  open = false,
  sections = [],
  activeId,
  onSelect,
  onClose,
  footer = 'v1.0.0 • Treinador Mateus Lucas',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: open ? 'auto' : 'none',
      zIndex: 9999,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: open ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
      transition: 'background var(--duration-slow) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'var(--sidebar-width)',
      height: '100%',
      background: 'var(--bg-surface)',
      borderRight: '2px solid var(--border)',
      boxShadow: '2px 0 16px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform var(--duration-slow) var(--ease-standard)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-16)',
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(135deg,var(--header-gradient-from) 0%,var(--header-gradient-to) 100%)',
      color: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-bold)'
    }
  }, "\u2699\uFE0F Menu"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar menu",
    style: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: 20,
      cursor: 'pointer',
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: '12px 8px',
      margin: 0,
      flex: 1
    }
  }, sections.map((s, si) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: si
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      padding: '12px 16px',
      margin: si ? '20px 0 8px' : '8px 0',
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      color: 'var(--primary)'
    }
  }, s.title), (s.items || []).map(it => /*#__PURE__*/React.createElement("li", {
    key: it.id,
    style: {
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelect && onSelect(it.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      width: '100%',
      padding: '12px 16px',
      border: 'none',
      borderLeft: '4px solid ' + (activeId === it.id ? 'var(--primary)' : 'transparent'),
      background: activeId === it.id ? 'rgba(15,58,125,0.1)' : 'transparent',
      color: activeId === it.id ? 'var(--primary)' : 'var(--text-primary)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      textAlign: 'left',
      borderRadius: '0 8px 8px 0',
      transition: 'all var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      minWidth: 24,
      display: 'flex',
      justifyContent: 'center'
    }
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-16)',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
      background: 'var(--bg-muted)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, footer))));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/WeekNav.jsx
try { (() => {
function WeekNav({
  label,
  sub,
  onPrev,
  onNext,
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '10px 12px',
      boxShadow: 'var(--shadow-card)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    icon: "chevron-left",
    onClick: onPrev,
    label: "Semana anterior"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-16)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      letterSpacing: '-0.2px'
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement(Arrow, {
    icon: "chevron-right",
    onClick: onNext,
    label: "Pr\xF3xima semana"
  }), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      borderLeft: '1px solid var(--border)',
      paddingLeft: 'var(--space-12)'
    }
  }, actions));
}
function Arrow({
  icon,
  onClick,
  label
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      flexShrink: 0,
      border: '1px solid ' + (hover ? 'var(--primary)' : 'var(--border)'),
      background: hover ? 'var(--primary)' : 'var(--bg-muted)',
      color: hover ? '#fff' : 'var(--text-secondary)',
      transition: 'all var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }));
}
Object.assign(__ds_scope, { WeekNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/WeekNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador-v2/app.jsx
try { (() => {
const {
  Button,
  IconButton,
  Toggle,
  Icon,
  Toast,
  ConfirmModal,
  AppHeader,
  Breadcrumb,
  Sidebar,
  Drawer,
  Card,
  WorkoutLibrary
} = window.TreinadorMateusLucasDesignSystem_53df72;
const K2 = window.KIT2;
const NAV = [{
  title: 'Navegação',
  items: [{
    id: 'dashboard',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bar-chart-3",
      size: 17
    }),
    label: 'Visão geral'
  }, {
    id: 'roster',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 17
    }),
    label: 'Atletas'
  }, {
    id: 'library',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "library",
      size: 17
    }),
    label: 'Biblioteca'
  }]
}, {
  title: 'Configurações',
  items: [{
    id: 'export',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 17
    }),
    label: 'Exportar backup'
  }, {
    id: 'import',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "upload",
      size: 17
    }),
    label: 'Importar backup'
  }, {
    id: 'validate',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 17
    }),
    label: 'Validar dados'
  }]
}, {
  title: 'Ajuda',
  items: [{
    id: 'guide',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "circle-help",
      size: 17
    }),
    label: 'Guia rápido'
  }, {
    id: 'about',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 17
    }),
    label: 'Sobre'
  }]
}];
function App() {
  const [view, setView] = React.useState('dashboard');
  const [atletaId, setAtletaId] = React.useState(null);
  const [ciclo, setCiclo] = React.useState(null);
  const [dark, setDark] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [notes, setNotes] = React.useState(null);
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);
  const toast = (msg, kind = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, {
      id,
      msg,
      kind
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };
  const atleta = K2.atletas.find(a => a.id === atletaId);
  const zonas = atleta ? zoneTable(atleta.teste) : null;
  const crumbs = ['Atletas', atleta && atleta.nome, ciclo && ciclo.nome].filter(Boolean);
  const openAthlete = id => {
    setAtletaId(id);
    setCiclo(null);
    setView('athlete');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-app)'
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    showMenu: true,
    onMenu: () => setMenu(true),
    logo: /*#__PURE__*/React.createElement(Icon, {
      name: "footprints",
      size: 26
    }),
    style: {
      padding: '1rem var(--padding-desktop)'
    },
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 'var(--text-12)',
        fontWeight: 'var(--weight-semibold)',
        color: 'rgba(255,255,255,0.8)',
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 'var(--radius-pill)',
        padding: '5px 11px',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "circle-check",
      size: 14
    }), "Salvo agora"), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "undo-2",
        size: 16
      }),
      tone: "onDark",
      size: 32,
      title: "Desfazer"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "redo-2",
        size: 16
      }),
      tone: "onDark",
      size: 32,
      title: "Refazer"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: dark ? 'sun' : 'moon',
        size: 16
      }),
      tone: "onDark",
      size: 32,
      title: "Alternar tema",
      onClick: () => setDark(!dark)
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "header",
      onClick: () => toast('Backup exportado com sucesso!', 'sucesso'),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 15
    }), "Backup"))
  }), crumbs.length > 1 && view !== 'dashboard' && /*#__PURE__*/React.createElement(Breadcrumb, {
    items: crumbs,
    onNavigate: i => {
      if (i === 0) {
        setAtletaId(null);
        setCiclo(null);
        setView('roster');
      }
      if (i === 1) {
        setCiclo(null);
        setView('athlete');
      }
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-width-desktop)',
      margin: '0 auto',
      padding: '2.5rem var(--padding-desktop) 4rem'
    }
  }, view === 'dashboard' && /*#__PURE__*/React.createElement(DashboardScreen, {
    onOpenAthlete: openAthlete
  }), view === 'roster' && /*#__PURE__*/React.createElement(RosterScreen, {
    onOpenAthlete: openAthlete,
    selectedId: atletaId,
    editMode: true,
    onNotes: setNotes
  }), view === 'athlete' && atleta && !ciclo && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageTitle, {
    eyebrow: "Atleta",
    title: atleta.nome,
    sub: atleta.ciclos.length + ' ciclos · aderência ' + atleta.aderencia + '% · próximo: ' + atleta.proximo,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setNotes(atleta),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sticky-note",
      size: 15
    }), "Notas")
  }), /*#__PURE__*/React.createElement(AthleteScreen, {
    atleta: atleta,
    editMode: true,
    onOpenCycle: c => {
      setCiclo(c);
      setView('cycle');
    },
    onToast: toast
  })), view === 'cycle' && atleta && ciclo && /*#__PURE__*/React.createElement(CycleScreen, {
    atleta: atleta,
    ciclo: ciclo,
    zonas: zonas,
    onToast: toast,
    onBack: () => {
      setCiclo(null);
      setView('athlete');
    }
  }), view === 'library' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    eyebrow: "Reaproveitar",
    title: "Biblioteca de treinos",
    sub: "Treinos salvos, prontos para inserir em qualquer semana"
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "0.5rem"
  }, /*#__PURE__*/React.createElement(WorkoutLibraryPage, null)))), /*#__PURE__*/React.createElement(Sidebar, {
    open: menu,
    activeId: view,
    sections: NAV,
    onClose: () => setMenu(false),
    style: {
      position: 'fixed'
    },
    onSelect: id => {
      if (['dashboard', 'roster', 'library'].includes(id)) setView(id);else toast('Ação de configuração — não implementada no kit', 'info');
      setMenu(false);
    }
  }), notes && /*#__PURE__*/React.createElement(Drawer, {
    open: true,
    tone: "success",
    width: 520,
    style: {
      position: 'fixed'
    },
    title: 'Notas — ' + notes.nome,
    subtitle: "Hist\xF3rico, les\xF5es, objetivos, caracter\xEDsticas",
    onClose: () => setNotes(null),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setNotes(null)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setNotes(null);
        toast('Notas salvas!', 'sucesso');
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 15
    }), "Salvar notas"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    defaultValue: notes.notas ? '• PRs: 5km 22min, 10km 48min\n• Lesão no joelho direito em 2024 — evitar impacto excessivo\n• Treina 5x por semana, prefere manhãs' : '',
    placeholder: 'Ex:\n• PRs: 5km 22min, 10km 48min\n• Objetivo: primeira meia maratona em 2026',
    style: {
      width: '100%',
      minHeight: 300,
      resize: 'vertical',
      fontSize: 14,
      lineHeight: 1.7,
      padding: 14,
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      background: 'var(--bg-muted)',
      boxSizing: 'border-box'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 78,
      right: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 99999
    }
  }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, {
    key: t.id,
    kind: t.kind
  }, t.msg))));
}
function WorkoutLibraryPage() {
  const [q, setQ] = React.useState('');
  const [items, setItems] = React.useState(K2.biblioteca);
  return /*#__PURE__*/React.createElement(WorkoutLibrary, {
    items: items.filter(i => !q || i.nome.toLowerCase().includes(q.toLowerCase())),
    query: q,
    onQuery: setQ,
    onRemove: it => setItems(b => b.filter(x => x !== it))
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador-v2/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador-v2/cycle.jsx
try { (() => {
const {
  Card,
  SectionHeader,
  Button,
  IconButton,
  Input,
  Select,
  Icon,
  EmptyState,
  WorkoutCard,
  StatItem,
  VolumeChart,
  TrainingTypeBadge,
  PhaseBadge,
  FeedbackChip,
  RaceTargetBanner,
  ValidationItem,
  Drawer,
  WorkoutBuilder,
  WorkoutLibrary,
  estimate,
  DashboardStatCard
} = window.TreinadorMateusLucasDesignSystem_53df72;
const K2 = window.KIT2;
const STATUS = {
  feito: {
    label: 'Feito',
    icon: 'circle-check',
    bg: '#dcfce7',
    fg: '#15803d'
  },
  parcial: {
    label: 'Parcial',
    icon: 'circle-dashed',
    bg: '#fef3c7',
    fg: '#92400e'
  },
  prescrito: {
    label: 'Prescrito',
    icon: 'circle',
    bg: 'var(--bg-muted)',
    fg: 'var(--text-secondary)'
  },
  perdido: {
    label: 'Não feito',
    icon: 'circle-x',
    bg: '#fee2e2',
    fg: '#991b1b'
  }
};
function StatusChip({
  status = 'prescrito'
}) {
  const s = STATUS[status] || STATUS.prescrito;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      background: s.bg,
      color: s.fg,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 12
  }), s.label);
}
function ExecutionStrip({
  exec
}) {
  if (!exec) return null;
  const items = [['ruler', 'Distância', exec.dist], ['timer', 'Tempo', exec.tempo], ['gauge', 'Pace real', exec.pace], ['heart-pulse', 'FC média', exec.fc], ['footprints', 'Cadência', exec.cad]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(104px,1fr))',
      gap: 8,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px'
    }
  }, items.map(([ic, l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 11
  }), l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-bold)',
      marginTop: 2,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.3px'
    }
  }, v))));
}
function CycleScreen({
  atleta,
  ciclo,
  zonas,
  onToast,
  onBack
}) {
  const [semanas, setSemanas] = React.useState(K2.semanas);
  const [biblioteca, setBiblioteca] = React.useState(K2.biblioteca);
  const [builder, setBuilder] = React.useState(null); // {semanaId}
  const [library, setLibrary] = React.useState(null); // {semanaId}
  const [query, setQuery] = React.useState('');
  const [fase, setFase] = React.useState('');
  const [tab, setTab] = React.useState('planilha');
  const [grid, setGrid] = React.useState(() => K2.grade.map(w => ({
    ...w,
    dias: {
      ...w.dias
    }
  })));
  const addToGrid = (weekId, day, w) => setGrid(gs => gs.map(g => g.id === weekId ? {
    ...g,
    dias: {
      ...g.dias,
      [day]: [...(g.dias[day] || []), {
        tipo: w.tipo,
        dist: w.dist,
        zona: w.blocos && w.blocos[0] && w.blocos[0].zona || w.zona,
        resumo: w.resumo
      }]
    }
  } : g));
  const removeAt = (gs, weekId, day, index) => gs.map(g => g.id === weekId ? {
    ...g,
    dias: {
      ...g.dias,
      [day]: (g.dias[day] || []).filter((_, i) => i !== index)
    }
  } : g);
  const insert = (gs, weekId, day, item) => gs.map(g => g.id === weekId ? {
    ...g,
    dias: {
      ...g.dias,
      [day]: [...(g.dias[day] || []), item]
    }
  } : g);
  const moveWorkout = (from, to) => setGrid(gs => {
    const src = ((gs.find(g => g.id === from.weekId) || {}).dias || {})[from.day] || [];
    const item = src[from.index];
    if (!item) return gs;
    return insert(removeAt(gs, from.weekId, from.day, from.index), to.weekId, to.day, item);
  });
  const copyWorkout = ({
    from,
    workout,
    mode,
    weekId,
    days
  }) => setGrid(gs => {
    let next = gs;
    if (mode === 'mover') next = removeAt(next, from.weekId, from.day, from.index);
    days.forEach(d => {
      next = insert(next, weekId, d, {
        ...workout
      });
    });
    return next;
  });
  const removeWorkout = ({
    weekId,
    day,
    index
  }) => setGrid(gs => removeAt(gs, weekId, day, index));
  const weekAction = (w, action, value) => {
    if (action === 'limpar') {
      setGrid(gs => gs.map(g => g.id === w.id ? {
        ...g,
        dias: {}
      } : g));
      onToast(w.nome + ' limpa', 'info');
      return;
    }
    if (action === 'duplicar') {
      setGrid(gs => {
        const i = gs.findIndex(g => g.id === w.id);
        const copy = {
          ...gs[i],
          id: w.id + '-c' + Date.now(),
          nome: 'Semana ' + (gs.length + 1),
          dias: JSON.parse(JSON.stringify(gs[i].dias || {}))
        };
        return [...gs.slice(0, i + 1), copy, ...gs.slice(i + 1)];
      });
      onToast(w.nome + ' duplicada', 'sucesso');
      return;
    }
    if (action === 'repetir') {
      const n = Math.max(1, Number(value) || 1);
      setGrid(gs => {
        const i = gs.findIndex(g => g.id === w.id);
        const src = gs[i];
        const next = gs.map((g, j) => j > i && j <= i + n ? {
          ...g,
          dias: JSON.parse(JSON.stringify(src.dias || {}))
        } : g);
        return next;
      });
      onToast('Semana repetida nas próximas ' + n, 'sucesso');
      return;
    }
    if (action === 'template') {
      const item = K2.biblioteca.find(b => b.nome === value) || K2.biblioteca[0];
      setGrid(gs => gs.map(g => g.id === w.id ? {
        ...g,
        dias: {
          ...g.dias,
          ter: [...(g.dias.ter || []), {
            tipo: item.tipo,
            dist: item.dist,
            zona: 'Z2',
            resumo: item.nome
          }],
          sab: [...(g.dias.sab || []), {
            tipo: 'longao',
            dist: 14,
            zona: 'Z2',
            resumo: 'Longão 14km'
          }]
        }
      } : g));
      onToast('Template aplicado em ' + w.nome, 'sucesso');
      return;
    }
    if (action === 'mover') {
      onToast('Datas deslocadas em ' + (value || 0) + ' dia(s)', 'sucesso');
    }
  };
  const total = semanas.reduce((s, w) => s + w.treinos.length, 0);
  const vazias = semanas.filter(w => w.treinos.length === 0).length;
  const km = semanas.reduce((s, w) => s + w.treinos.reduce((a, t) => a + (t.dist || 0), 0), 0);
  const addWorkout = (semanaId, treino) => {
    setSemanas(ws => ws.map(w => w.id === semanaId ? {
      ...w,
      treinos: [...w.treinos, treino]
    } : w));
    onToast('Treino adicionado à ' + semanas.find(w => w.id === semanaId).nome + '!', 'sucesso');
  };
  const fromBuilder = w => {
    const t = {
      weekday: '—',
      day: w.data ? w.data.slice(8, 10) : '',
      month: w.data ? 'AGO' : '',
      tipo: w.tipo,
      fase: w.fase,
      status: 'prescrito',
      desc: (w.blocos || []).map((b, i) => {
        const reps = Number(b.repeticoes) || 1,
          d = Number(b.distancia) || 0;
        return i + 1 + '. ' + (reps > 1 ? reps + 'x ' + d + 'km' : 'Correr por ' + d + 'km') + ' — Intensidade ' + b.zona + (b.intervalo ? ' · Intervalo: ' + b.intervalo : '');
      }).join('\n'),
      dist: w.dist,
      tempo: w.minTxt + ' a ' + w.maxTxt
    };
    addWorkout(builder.semanaId, t);
    setBuilder(null);
  };
  const fromLibrary = item => {
    const est = estimate(item.blocos, zonas);
    addWorkout(library.semanaId, {
      weekday: '—',
      day: '',
      month: '',
      tipo: item.tipo,
      fase: 'Base',
      status: 'prescrito',
      desc: item.nome,
      dist: est.dist,
      tempo: est.minTxt + ' a ' + est.maxTxt
    });
    setBiblioteca(b => b.map(x => x === item ? {
      ...x,
      usos: (x.usos || 0) + 1
    } : x));
    setLibrary(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      color: 'var(--primary)',
      fontSize: 'var(--text-12)',
      fontWeight: 'var(--weight-semibold)',
      fontFamily: 'var(--font-sans)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 13
  }), atleta.nome), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: '1.35rem',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '-0.5px'
    }
  }, ciclo.nome), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '5px 0 0',
      fontSize: 'var(--text-13)',
      color: 'var(--text-secondary)'
    }
  }, ciclo.semanas, " semanas \xB7 ", total, " treinos \xB7 ", km.toFixed(1), " km prescritos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "target",
    size: 15
  }), "Prova alvo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-days",
    size: 15
  }), "Calend\xE1rio"), /*#__PURE__*/React.createElement(Button, {
    variant: "export",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    },
    onClick: () => onToast('Gerando PDF do ciclo...', 'info')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 15
  }), "Relat\xF3rio"))), ciclo.prova && /*#__PURE__*/React.createElement(RaceTargetBanner, {
    name: ciclo.prova,
    detail: "21 km \xB7 12/10/2026",
    days: 48,
    style: {
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "route",
      size: 20,
      color: "var(--primary)"
    }),
    label: "Volume prescrito",
    value: km.toFixed(1) + ' km',
    meta: total + ' treinos'
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle-2",
      size: 20,
      color: "var(--success)"
    }),
    label: "Executados",
    value: "2 de " + total,
    meta: "ader\xEAncia 67%"
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "triangle-alert",
      size: 20,
      color: "var(--warning)"
    }),
    label: "Semanas vazias",
    value: String(vazias),
    meta: vazias ? 'precisa preencher' : 'ciclo completo'
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "target",
      size: 20,
      color: "var(--primary)"
    }),
    label: "Prova alvo",
    value: ciclo.prova || 'Não definida'
  })), /*#__PURE__*/React.createElement(VolumeChart, {
    title: "Volume por semana",
    note: km.toFixed(1) + ' km no ciclo',
    data: K2.volume
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 4,
      width: 'fit-content'
    }
  }, [['planilha', 'table-2', 'Planilha'], ['semanas', 'list', 'Semanas']].map(([k, ic, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      background: tab === k ? 'var(--bg-surface)' : 'transparent',
      color: tab === k ? 'var(--primary)' : 'var(--text-secondary)',
      boxShadow: tab === k ? 'var(--shadow-xs)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 15
  }), l))), tab === 'planilha' && /*#__PURE__*/React.createElement(PlanilhaView, {
    weeks: grid,
    zonas: zonas,
    biblioteca: biblioteca,
    onToast: onToast,
    onAdd: addToGrid,
    onWeekAction: weekAction,
    onMove: moveWorkout,
    onCopy: copyWorkout,
    onRemove: removeWorkout
  }), tab === 'semanas' && /*#__PURE__*/React.createElement(Card, {
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-days",
      size: 18,
      color: "var(--primary)"
    }), "Semanas"),
    subtitle: "Clique em Adicionar treino ou puxe um da biblioteca",
    actions: /*#__PURE__*/React.createElement(Select, {
      value: fase,
      onChange: e => setFase(e.target.value),
      placeholder: "Todas as fases",
      options: ['Base', 'Específico', 'Polimento'],
      style: {
        width: 190
      }
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, semanas.map(w => {
    const treinos = w.treinos.filter(t => !fase || t.fase === fase);
    const wkm = treinos.reduce((a, t) => a + (t.dist || 0), 0);
    const vazia = w.treinos.length === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: w.id,
      style: {
        border: '1px solid var(--border)',
        borderLeft: '4px solid ' + (vazia ? 'var(--warning)' : 'var(--accent)'),
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: vazia ? 'rgba(245,158,11,0.04)' : 'var(--bg-surface)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: vazia ? 'rgba(245,158,11,0.07)' : 'var(--bg-muted)',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-13-5)',
        fontWeight: 'var(--weight-bold)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, w.nome, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-12)'
      }
    }, w.sub)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-11)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, treinos.length, " treino", treinos.length !== 1 ? 's' : '', " \xB7 ", wkm.toFixed(1), " km")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setLibrary({
        semanaId: w.id
      }),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "library",
      size: 14
    }), "Biblioteca"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "success",
      onClick: () => setBuilder({
        semanaId: w.id,
        nome: w.nome,
        sub: w.sub
      }),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), "Adicionar treino"))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 16px'
      }
    }, treinos.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '18px 12px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-plus",
      size: 26,
      color: "var(--text-muted)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-13)',
        color: 'var(--text-secondary)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Semana sem treinos"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-12)',
        color: 'var(--text-muted)',
        maxWidth: 340
      }
    }, "Monte um treino estruturado ou reaproveite um da biblioteca \u2014 dois cliques."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setLibrary({
        semanaId: w.id
      }),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "library",
      size: 14
    }), "Da biblioteca"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setBuilder({
        semanaId: w.id,
        nome: w.nome,
        sub: w.sub
      }),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "wand-sparkles",
      size: 14
    }), "Montar treino"))) : treinos.map((t, i) => /*#__PURE__*/React.createElement(WorkoutCard, {
      key: i,
      weekday: t.weekday,
      day: t.day,
      month: t.month,
      badge: /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          gap: 6,
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement(TrainingTypeBadge, {
        type: t.tipo
      }), /*#__PURE__*/React.createElement(StatusChip, {
        status: t.status
      })),
      phase: /*#__PURE__*/React.createElement(PhaseBadge, {
        phase: t.fase
      }),
      description: t.desc,
      chips: [/*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "ruler",
        size: 12
      }), t.dist, " km"), /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "timer",
        size: 12
      }), t.tempo), ...(t.feedback ? [/*#__PURE__*/React.createElement(FeedbackChip, {
        level: t.feedback
      })] : [])],
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, t.exec && /*#__PURE__*/React.createElement("span", {
        style: {
          marginRight: 'auto',
          width: '100%'
        }
      }), /*#__PURE__*/React.createElement(IconButton, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "pencil",
          size: 15
        }),
        tone: "primary",
        size: 32,
        title: "Editar treino"
      }), /*#__PURE__*/React.createElement(IconButton, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "trash-2",
          size: 15
        }),
        tone: "danger",
        size: 32,
        title: "Remover treino"
      }))
    })), treinos.filter(t => t.exec).map((t, i) => /*#__PURE__*/React.createElement("div", {
      key: 'e' + i,
      style: {
        marginTop: -4,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-10)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow-wide)',
        fontWeight: 'var(--weight-bold)',
        color: 'var(--text-muted)',
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "watch",
      size: 12
    }), "Realizado \xB7 ", t.weekday, " ", t.day, " \xB7 sincronizado do rel\xF3gio"), /*#__PURE__*/React.createElement(ExecutionStrip, {
      exec: t.exec
    })))));
  }))), builder && /*#__PURE__*/React.createElement(Drawer, {
    open: true,
    tone: "primary",
    width: 620,
    style: {
      position: 'fixed'
    },
    title: "Montar treino",
    subtitle: builder.nome + ' · ' + builder.sub,
    onClose: () => setBuilder(null)
  }, /*#__PURE__*/React.createElement(WorkoutBuilder, {
    zones: zonas,
    onCancel: () => setBuilder(null),
    onSave: fromBuilder,
    onSaveToLibrary: w => {
      const est = estimate(w.blocos, zonas);
      setBiblioteca(b => [{
        nome: 'Treino ' + (b.length + 1) + ' · ' + est.dist + 'km',
        tipo: w.tipo,
        dist: est.dist,
        blocos: w.blocos,
        usos: 0
      }, ...b]);
      onToast('Treino salvo na biblioteca!', 'sucesso');
    }
  })), library && /*#__PURE__*/React.createElement(Drawer, {
    open: true,
    tone: "info",
    width: 480,
    style: {
      position: 'fixed'
    },
    title: "Biblioteca de treinos",
    subtitle: "Clique para inserir na semana",
    onClose: () => setLibrary(null)
  }, /*#__PURE__*/React.createElement(WorkoutLibrary, {
    items: biblioteca.filter(i => !query || i.nome.toLowerCase().includes(query.toLowerCase())),
    query: query,
    onQuery: setQuery,
    onPick: fromLibrary,
    onRemove: it => setBiblioteca(b => b.filter(x => x !== it))
  })));
}
Object.assign(window, {
  CycleScreen,
  StatusChip,
  ExecutionStrip
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador-v2/cycle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador-v2/data.js
try { (() => {
window.KIT2 = {
  atletas: [{
    id: 1,
    nome: 'Allan e Pedro Henrique',
    notas: true,
    teste: '05:00',
    aderencia: 78,
    trend: [22, 28, 31, 18, 0, 26, 34, 24],
    proximo: 'Ter 04/08 · Progressivo 8 km',
    ciclos: [{
      id: 11,
      nome: 'Ciclo 21km - Maratona Piauí Crono',
      semanas: 10,
      treinos: 23
    }, {
      id: 12,
      nome: '21km - Meia Maratona da PF',
      semanas: 14,
      treinos: 3,
      template: true,
      prova: 'Meia Maratona da PF'
    }]
  }, {
    id: 2,
    nome: 'Jessyka Carvalho',
    teste: '05:40',
    aderencia: 92,
    trend: [30, 32, 35, 38, 34, 40, 42, 44],
    proximo: 'Qua 05/08 · Intervalado 10 km',
    ciclos: [{
      id: 21,
      nome: 'Base 2026',
      semanas: 8,
      treinos: 44
    }, {
      id: 22,
      nome: 'Específico 10km',
      semanas: 6,
      treinos: 36
    }]
  }, {
    id: 3,
    nome: 'Suzy',
    teste: '06:10',
    aderencia: 45,
    trend: [12, 14, 8, 0, 0, 10, 12, 9],
    proximo: 'Sáb 08/08 · Longão 12 km',
    ciclos: [{
      id: 31,
      nome: 'Primeiros 5km',
      semanas: 4,
      treinos: 22
    }]
  }, {
    id: 4,
    nome: 'Amanda Sousa',
    notas: true,
    teste: '04:50',
    aderencia: 86,
    trend: [38, 42, 45, 40, 48, 52, 46, 50],
    proximo: 'Ter 04/08 · Ritmado 12 km',
    ciclos: [{
      id: 41,
      nome: 'Maratona Piauí',
      semanas: 16,
      treinos: 30
    }, {
      id: 42,
      nome: 'Base Inverno',
      semanas: 6,
      treinos: 14
    }, {
      id: 43,
      nome: 'Específico Meia',
      semanas: 8,
      treinos: 12
    }, {
      id: 44,
      nome: 'Polimento 21km',
      semanas: 3,
      treinos: 10
    }]
  }, {
    id: 5,
    nome: 'Eugênio Gabriel',
    teste: '05:25',
    aderencia: 61,
    trend: [16, 18, 0, 20, 22, 18, 24, 20],
    proximo: 'Qui 06/08 · Fartlek 9 km',
    ciclos: [{
      id: 51,
      nome: 'Retomada',
      semanas: 4,
      treinos: 8
    }]
  }],
  biblioteca: [{
    nome: '6x800m no limiar',
    tipo: 'intervalado',
    dist: 9.8,
    usos: 14,
    blocos: [{
      repeticoes: 1,
      distancia: 2,
      zona: 'Z2',
      intervalo: ''
    }, {
      repeticoes: 6,
      distancia: 0.8,
      zona: 'Z4',
      intervalo: '2min trote'
    }, {
      repeticoes: 1,
      distancia: 3,
      zona: 'Z1',
      intervalo: ''
    }]
  }, {
    nome: 'Longão conversável 16km',
    tipo: 'longao',
    dist: 16,
    usos: 22,
    blocos: [{
      repeticoes: 1,
      distancia: 16,
      zona: 'Z2',
      intervalo: ''
    }]
  }, {
    nome: 'Fartlek 10x1min',
    tipo: 'fartlek',
    dist: 9,
    usos: 8,
    blocos: [{
      repeticoes: 1,
      distancia: 2,
      zona: 'Z2',
      intervalo: ''
    }, {
      repeticoes: 10,
      distancia: 0.3,
      zona: 'Z5',
      intervalo: '1min leve'
    }, {
      repeticoes: 1,
      distancia: 4,
      zona: 'Z1',
      intervalo: ''
    }]
  }, {
    nome: 'Regenerativo 6km',
    tipo: 'leve',
    dist: 6,
    usos: 31,
    blocos: [{
      repeticoes: 1,
      distancia: 6,
      zona: 'Z1',
      intervalo: ''
    }]
  }],
  semanas: [{
    id: 's1',
    nome: 'Semana 1',
    sub: 'Ordinária · Base',
    treinos: [{
      weekday: 'TER',
      day: '04',
      month: 'AGO',
      tipo: 'progressivo',
      fase: 'Base',
      status: 'feito',
      desc: '1. Correr por 8km — Intensidade Z2',
      dist: 8,
      tempo: '53:20 a 56:00',
      feedback: 'normal',
      exec: {
        dist: '8,003 km',
        tempo: '00:42:21',
        pace: '05:18/km',
        fc: '155 bpm',
        cad: '176 rpm'
      }
    }, {
      weekday: 'QUI',
      day: '06',
      month: 'AGO',
      tipo: 'intervalado',
      fase: 'Base',
      status: 'feito',
      desc: '1. Correr por 2km — Intensidade Z2\n2. 6x 0.8km — Intensidade Z4 · Intervalo: 2min trote\n3. Correr por 3km — Intensidade Z1',
      dist: 9.8,
      tempo: '52:10 a 57:40',
      feedback: 'dificil',
      exec: {
        dist: '9,84 km',
        tempo: '00:55:02',
        pace: '05:35/km',
        fc: '168 bpm',
        cad: '181 rpm'
      }
    }, {
      weekday: 'SÁB',
      day: '09',
      month: 'AGO',
      tipo: 'longao',
      fase: 'Base',
      status: 'prescrito',
      desc: '1. Correr por 16km — Intensidade Z2',
      dist: 16,
      tempo: '01:46:40 a 01:52:00'
    }]
  }, {
    id: 's2',
    nome: 'Semana 2',
    sub: 'Recuperação · Base',
    treinos: [{
      weekday: 'TER',
      day: '11',
      month: 'AGO',
      tipo: 'leve',
      fase: 'Base',
      status: 'prescrito',
      desc: '1. Correr por 6km — Intensidade Z1',
      dist: 6,
      tempo: '42:00 a 44:00'
    }]
  }, {
    id: 's3',
    nome: 'Semana 3',
    sub: 'Ordinária · Base',
    treinos: []
  }, {
    id: 's4',
    nome: 'Semana 4',
    sub: 'Choque · Específico',
    treinos: []
  }],
  grade: [{
    id: 'g1',
    nome: 'Semana 1',
    sub: 'Ordinária · Base',
    fase: 'Base',
    dias: {
      ter: [{
        tipo: 'progressivo',
        dist: 8,
        zona: 'Z2',
        resumo: '8km Z2'
      }],
      qui: [{
        tipo: 'intervalado',
        dist: 9.8,
        zona: 'Z4',
        resumo: '6x800m Z4 int 2min'
      }],
      sab: [{
        tipo: 'longao',
        dist: 16,
        zona: 'Z2',
        resumo: '16km Z2'
      }]
    }
  }, {
    id: 'g2',
    nome: 'Semana 2',
    sub: 'Recuperação · Base',
    fase: 'Base',
    dias: {
      ter: [{
        tipo: 'leve',
        dist: 6,
        zona: 'Z1',
        resumo: '6km Z1'
      }],
      sex: [{
        tipo: 'fartlek',
        dist: 9,
        zona: 'Z3',
        resumo: '10x1min Z5'
      }]
    }
  }, {
    id: 'g3',
    nome: 'Semana 3',
    sub: 'Ordinária · Base',
    fase: 'Base',
    dias: {}
  }, {
    id: 'g4',
    nome: 'Semana 4',
    sub: 'Choque · Específico',
    fase: 'Específico',
    dias: {}
  }, {
    id: 'g5',
    nome: 'Semana 5',
    sub: 'Ordinária · Específico',
    fase: 'Específico',
    dias: {
      ter: [{
        tipo: 'ritmado',
        dist: 12,
        zona: 'Z4',
        resumo: '12km Z4'
      }],
      qui: [{
        tipo: 'repeticoes',
        dist: 8,
        zona: 'Z5',
        resumo: '10x400m Z5'
      }],
      dom: [{
        tipo: 'longao',
        dist: 18,
        zona: 'Z2',
        resumo: '18km Z2'
      }]
    }
  }, {
    id: 'g6',
    nome: 'Semana 6',
    sub: 'Polimento',
    fase: 'Polimento',
    dias: {
      qua: [{
        tipo: 'leve',
        dist: 5,
        zona: 'Z1',
        resumo: '5km Z1'
      }]
    }
  }],
  volume: [{
    label: 'S1',
    value: 33.8
  }, {
    label: 'S2',
    value: 6
  }, {
    label: 'S3',
    value: 0
  }, {
    label: 'S4',
    value: 0
  }, {
    label: 'S5',
    value: 28
  }, {
    label: 'S6',
    value: 31
  }, {
    label: 'S7',
    value: 38
  }, {
    label: 'S8',
    value: 12
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador-v2/data.js", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador-v2/planilha.jsx
try { (() => {
const {
  Card,
  SectionHeader,
  Button,
  IconButton,
  Icon,
  Input,
  Select,
  Drawer,
  CycleGrid,
  QuickAdd,
  WorkoutBuilder,
  WorkoutLibrary,
  CopyWorkoutDialog,
  ConfirmModal,
  estimate
} = window.TreinadorMateusLucasDesignSystem_53df72;
const DAY_LABEL = {
  seg: 'Segunda',
  ter: 'Terça',
  qua: 'Quarta',
  qui: 'Quinta',
  sex: 'Sexta',
  sab: 'Sábado',
  dom: 'Domingo'
};
function PlanilhaView({
  weeks,
  zonas,
  biblioteca,
  onAdd,
  onWeekAction,
  onMove,
  onCopy,
  onRemove,
  onToast
}) {
  const [add, setAdd] = React.useState(null); // {week,day}
  const [addTab, setAddTab] = React.useState('rapida');
  const [copy, setCopy] = React.useState(null); // {week,day,workout,index}
  const [prompt, setPrompt] = React.useState(null);
  const totalKm = weeks.reduce((s, w) => s + Object.values(w.dias || {}).flat().reduce((a, t) => a + (t.dist || 0), 0), 0);
  const vazias = weeks.filter(w => Object.values(w.dias || {}).flat().length === 0).length;
  const openAdd = (week, day) => {
    setAddTab('rapida');
    setAdd({
      week,
      day
    });
  };
  const handleAction = (w, action) => {
    if (action === 'duplicar' || action === 'limpar') {
      onWeekAction(w, action);
      return;
    }
    setPrompt({
      week: w,
      action,
      value: action === 'repetir' ? '3' : action === 'mover' ? '7' : ''
    });
  };
  return /*#__PURE__*/React.createElement(Card, {
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "table-2",
      size: 18,
      color: "var(--primary)"
    }), "Planilha do ciclo"),
    subtitle: weeks.length + ' semanas · ' + totalKm.toFixed(1) + ' km' + (vazias ? ' · ' + vazias + ' semana(s) vazia(s)' : ''),
    style: {
      marginBottom: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(QuickAdd, {
    zones: zonas,
    placeholder: "Adi\xE7\xE3o r\xE1pida na 1\xAA semana vazia: 8k z2",
    onAdd: parsed => {
      const alvo = weeks.find(w => Object.values(w.dias || {}).flat().length === 0) || weeks[0];
      onAdd(alvo.id, 'ter', parsed);
      onToast('Treino adicionado em ' + alvo.nome, 'sucesso');
    }
  })), /*#__PURE__*/React.createElement(CycleGrid, {
    weeks: weeks,
    onWeekAction: handleAction,
    onCellClick: (w, day) => openAdd(w, day),
    onWorkoutClick: (w, day, t, i) => setCopy({
      week: w,
      day,
      workout: t,
      index: i
    }),
    onWorkoutMove: (from, to, t) => {
      onMove(from, to);
      onToast('Movido para ' + (weeks.find(w => w.id === to.weekId) || {}).nome + ' · ' + DAY_LABEL[to.day], 'sucesso');
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 16,
      flexWrap: 'wrap',
      fontSize: 'var(--text-11)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--accent)",
    label: "Semana com treinos"
  }), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--warning)",
    label: "Semana vazia"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "move",
    size: 12
  }), "Arraste o treino entre dias e semanas"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy",
    size: 12
  }), "Clique no treino para copiar em v\xE1rios dias")), add && /*#__PURE__*/React.createElement(Drawer, {
    open: true,
    tone: "primary",
    width: 620,
    style: {
      position: 'fixed'
    },
    title: 'Adicionar treino · ' + add.week.nome,
    subtitle: DAY_LABEL[add.day] + ' · ' + add.week.sub,
    onClose: () => setAdd(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 4
    }
  }, [['rapida', 'wand-sparkles', 'Adição rápida'], ['completo', 'clipboard-list', 'Treino completo'], ['biblioteca', 'library', 'Biblioteca']].map(([k, ic, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setAddTab(k),
    style: {
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '9px 10px',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-13)',
      fontWeight: 'var(--weight-semibold)',
      background: addTab === k ? 'var(--bg-surface)' : 'transparent',
      color: addTab === k ? 'var(--primary)' : 'var(--text-secondary)',
      boxShadow: addTab === k ? 'var(--shadow-xs)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 15
  }), l)))), addTab === 'rapida' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement(QuickAdd, {
    zones: zonas,
    autoFocus: true,
    onAdd: p => {
      onAdd(add.week.id, add.day, p);
      setAdd(null);
      onToast('Treino adicionado em ' + add.week.nome + ' · ' + DAY_LABEL[add.day], 'sucesso');
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      lineHeight: 1.7
    }
  }, "Aceita ", /*#__PURE__*/React.createElement("code", null, "8k z2"), ", ", /*#__PURE__*/React.createElement("code", null, "6x800 z4 int 2min"), ", ", /*#__PURE__*/React.createElement("code", null, "40min z1"), ", al\xE9m de palavras como ", /*#__PURE__*/React.createElement("code", null, "long\xE3o"), ", ", /*#__PURE__*/React.createElement("code", null, "fartlek"), ", ", /*#__PURE__*/React.createElement("code", null, "polimento"), ".", /*#__PURE__*/React.createElement("br", null), "Precisa de blocos, observa\xE7\xF5es ou data? Use ", /*#__PURE__*/React.createElement("strong", null, "Treino completo"), ".")), addTab === 'completo' && /*#__PURE__*/React.createElement(WorkoutBuilder, {
    zones: zonas,
    onCancel: () => setAdd(null),
    onSave: w => {
      onAdd(add.week.id, add.day, {
        ...w,
        resumo: (w.blocos || []).map(b => (Number(b.repeticoes) > 1 ? b.repeticoes + 'x ' + b.distancia + 'km' : b.distancia + 'km') + ' ' + b.zona).join(' + '),
        zona: w.blocos && w.blocos[0] && w.blocos[0].zona
      });
      setAdd(null);
      onToast('Treino salvo em ' + add.week.nome + ' · ' + DAY_LABEL[add.day], 'sucesso');
    },
    onSaveToLibrary: () => onToast('Treino salvo na biblioteca!', 'sucesso')
  }), addTab === 'biblioteca' && /*#__PURE__*/React.createElement(WorkoutLibrary, {
    items: biblioteca,
    onPick: it => {
      onAdd(add.week.id, add.day, {
        tipo: it.tipo,
        dist: it.dist,
        zona: 'Z2',
        resumo: it.nome
      });
      setAdd(null);
      onToast('"' + it.nome + '" inserido em ' + DAY_LABEL[add.day], 'sucesso');
    }
  })), copy && /*#__PURE__*/React.createElement(CopyWorkoutDialog, {
    workout: copy.workout,
    origin: {
      weekId: copy.week.id,
      weekNome: copy.week.nome,
      dayLabel: DAY_LABEL[copy.day]
    },
    weeks: weeks.map(w => ({
      id: w.id,
      nome: w.nome,
      sub: w.sub
    })),
    onCancel: () => setCopy(null),
    onRemove: () => {
      onRemove({
        weekId: copy.week.id,
        day: copy.day,
        index: copy.index
      });
      setCopy(null);
      onToast('Treino removido', 'info');
    },
    onEdit: () => {
      setCopy(null);
      openAdd(copy.week, copy.day);
      setAddTab('completo');
    },
    onConfirm: ({
      mode,
      weekId,
      days
    }) => {
      onCopy({
        from: {
          weekId: copy.week.id,
          day: copy.day,
          index: copy.index
        },
        workout: copy.workout,
        mode,
        weekId,
        days
      });
      setCopy(null);
      const nome = (weeks.find(w => w.id === weekId) || {}).nome;
      onToast((mode === 'mover' ? 'Movido para ' : 'Copiado para ') + nome + ' · ' + days.map(d => DAY_LABEL[d]).join(', '), 'sucesso');
    }
  }), prompt && /*#__PURE__*/React.createElement(ConfirmModal, {
    kind: "confirmar",
    style: {
      position: 'fixed'
    },
    title: prompt.action === 'template' ? 'Aplicar template' : prompt.action === 'repetir' ? 'Repetir esta semana' : 'Deslocar datas',
    message: prompt.action === 'template' ? 'Escolha um treino base para preencher ' + prompt.week.nome + '.' : prompt.action === 'repetir' ? 'Copiar ' + prompt.week.nome + ' para as próximas N semanas.' : 'Mover todos os treinos de ' + prompt.week.nome + ' em N dias.',
    confirmLabel: "Aplicar",
    onCancel: () => setPrompt(null),
    onConfirm: () => {
      onWeekAction(prompt.week, prompt.action, prompt.value);
      setPrompt(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18,
      textAlign: 'left'
    }
  }, prompt.action === 'template' ? /*#__PURE__*/React.createElement(Select, {
    value: prompt.value,
    onChange: e => setPrompt({
      ...prompt,
      value: e.target.value
    }),
    placeholder: "Selecione um treino",
    options: biblioteca.map(b => b.nome)
  }) : /*#__PURE__*/React.createElement(Input, {
    value: prompt.value,
    onChange: e => setPrompt({
      ...prompt,
      value: e.target.value
    }),
    label: prompt.action === 'repetir' ? 'Quantas semanas' : 'Quantos dias'
  }))));
}
function Legend({
  color,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 13,
      background: color,
      borderRadius: 2
    }
  }), label);
}
Object.assign(window, {
  PlanilhaView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador-v2/planilha.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador-v2/screens.jsx
try { (() => {
const {
  Card,
  SectionHeader,
  Button,
  IconButton,
  Input,
  Select,
  Toggle,
  EmptyState,
  Icon,
  AthleteCard,
  CycleCard,
  ZoneCard,
  WorkoutCard,
  StatItem,
  DashboardStatCard,
  VolumeChart,
  WorkoutsTable,
  Sparkline,
  ProgressRing,
  TrainingTypeBadge,
  PhaseBadge,
  FeedbackChip,
  RaceTargetBanner,
  ValidationItem,
  WorkoutBuilder,
  WorkoutLibrary,
  estimate
} = window.TreinadorMateusLucasDesignSystem_53df72;
const K = window.KIT2;

/* zone table in seconds/km from a MM:SS test pace */
function zoneTable(test) {
  if (!test) return null;
  const [m, s] = test.split(':').map(Number);
  const t = m * 60 + s;
  return {
    Z5: {
      min: t - 20,
      max: t
    },
    Z4: {
      min: t,
      max: t + 20
    },
    Z3: {
      min: t + 20,
      max: t + 40
    },
    Z2: {
      min: t + 40,
      max: t + 60
    },
    Z1: {
      min: t + 60,
      max: t + 80
    }
  };
}
const fmtPace = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

/* ---------- Eyebrow + refined section title ---------- */
function PageTitle({
  eyebrow,
  title,
  sub,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 20,
      flexWrap: 'wrap',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      color: 'var(--accent)',
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: '1.6rem',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '-0.6px',
      lineHeight: 1.15,
      color: 'var(--text-primary)'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-13-5)',
      color: 'var(--text-secondary)'
    }
  }, sub)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, actions));
}

/* ---------- 1. Coach dashboard, redesigned ---------- */
function DashboardScreen({
  onOpenAthlete
}) {
  const atletas = K.atletas;
  const media = Math.round(atletas.reduce((s, a) => s + a.aderencia, 0) / atletas.length);
  const emRisco = atletas.filter(a => a.aderencia < 60);
  const volumeSemana = atletas.reduce((s, a) => s + (a.trend[a.trend.length - 1] || 0), 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    eyebrow: "Semana de 03 a 09 de agosto",
    title: "Vis\xE3o geral",
    sub: atletas.length + ' atletas · ' + atletas.reduce((s, a) => s + a.ciclos.length, 0) + ' ciclos ativos',
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    }), "Exportar"), /*#__PURE__*/React.createElement(Button, {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), "Novo atleta"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(BigMetric, {
    icon: "gauge",
    label: "Ader\xEAncia m\xE9dia",
    value: media + '%',
    meta: emRisco.length ? emRisco.length + ' atleta(s) abaixo de 60%' : 'todos acima de 60%',
    tone: media >= 80 ? 'success' : media >= 60 ? 'warning' : 'danger',
    extra: /*#__PURE__*/React.createElement(ProgressRing, {
      value: media,
      size: 52,
      thickness: 5
    })
  }), /*#__PURE__*/React.createElement(BigMetric, {
    icon: "route",
    label: "Volume da semana",
    value: volumeSemana.toFixed(1) + ' km',
    meta: "somando todos os atletas",
    extra: /*#__PURE__*/React.createElement(Sparkline, {
      data: K.volume.map(v => v.value),
      width: 96,
      height: 34
    })
  }), /*#__PURE__*/React.createElement(BigMetric, {
    icon: "calendar-check",
    label: "Treinos prescritos",
    value: "14",
    meta: "9 feitos \xB7 5 pendentes"
  }), /*#__PURE__*/React.createElement(BigMetric, {
    icon: "triangle-alert",
    label: "Semanas vazias",
    value: "2",
    meta: "Semana 3 e 4 do ciclo ativo",
    tone: "warning"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "1.5rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 17,
      color: "var(--primary)"
    }), "Atletas"),
    subtitle: "Ordenado por ader\xEAncia \u2014 quem precisa de aten\xE7\xE3o aparece primeiro"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [...atletas].sort((a, b) => a.aderencia - b.aderencia).map(a => /*#__PURE__*/React.createElement(AthleteRow, {
    key: a.id,
    a: a,
    onClick: () => onOpenAthlete(a.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "1.5rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bar-chart-3",
      size: 17,
      color: "var(--primary)"
    }), "Volume por semana"),
    subtitle: "Ciclo ativo \xB7 100.8 km",
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement(VolumeChart, {
    title: "",
    note: "",
    data: K.volume,
    style: {
      background: 'transparent',
      border: 'none',
      padding: 0
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "1.5rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clipboard-check",
      size: 17,
      color: "var(--primary)"
    }), "Pend\xEAncias"),
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(ValidationItem, {
    level: "erro",
    title: "Semana 3 e 4 sem treinos",
    description: "Ciclo 21km - Maratona Piau\xED Crono",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Preencher")
  }), /*#__PURE__*/React.createElement(ValidationItem, {
    level: "aviso",
    title: "Suzy com 45% de ader\xEAncia",
    description: "3 treinos n\xE3o realizados nas \xFAltimas 2 semanas",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Ver")
  }), /*#__PURE__*/React.createElement(ValidationItem, {
    level: "info",
    title: "Teste de 3km vencido",
    description: "Eug\xEAnio Gabriel \u2014 \xFAltimo teste h\xE1 9 semanas"
  }))))));
}
function BigMetric({
  icon,
  label,
  value,
  meta,
  tone,
  extra
}) {
  const tones = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '1.15rem 1.25rem',
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-11)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }), label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.75rem',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1.1,
      marginTop: 8,
      color: tones[tone] || 'var(--primary)'
    }
  }, value), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      marginTop: 5
    }
  }, meta)), extra);
}
function AthleteRow({
  a,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 14px',
      cursor: 'pointer',
      border: '1px solid',
      borderColor: hover ? 'var(--primary)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      background: hover ? 'var(--bg-muted)' : 'var(--bg-surface)',
      transition: 'all var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: a.aderencia,
    size: 40,
    thickness: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, a.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-12)',
      color: 'var(--text-secondary)',
      marginTop: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-days",
    size: 12
  }), a.proximo)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-10)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)'
    }
  }, "Teste 3km"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '13px'
    }
  }, a.teste, "/km")), /*#__PURE__*/React.createElement(Sparkline, {
    data: a.trend,
    width: 86,
    height: 26,
    color: a.aderencia >= 80 ? 'var(--success)' : a.aderencia >= 60 ? 'var(--accent)' : 'var(--danger)'
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  }));
}

/* ---------- 2. Roster with the richer athlete card ---------- */
function RosterScreen({
  onOpenAthlete,
  selectedId,
  editMode,
  onNotes
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18,
      color: "var(--primary)"
    }), "Atletas"),
    subtitle: K.atletas.length + ' atletas cadastrados',
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "success",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), "Novo atleta")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))',
      gap: 20
    }
  }, K.atletas.map(a => /*#__PURE__*/React.createElement(AthleteCard, {
    key: a.id,
    name: a.nome,
    cycles: a.ciclos.length,
    workouts: a.ciclos.reduce((s, c) => s + c.treinos, 0),
    hasNotes: !!a.notas,
    adherence: a.aderencia,
    trend: a.trend,
    nextWorkout: a.proximo,
    testPace: a.teste + '/km',
    selected: selectedId === a.id,
    onClick: () => onOpenAthlete(a.id),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sticky-note",
        size: 15
      }),
      tone: "success",
      size: 30,
      title: "Notas do atleta",
      onClick: e => {
        e.stopPropagation();
        onNotes(a);
      }
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 15
      }),
      size: 30,
      title: "Editar nome",
      disabled: !editMode,
      onClick: e => e.stopPropagation()
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2",
        size: 15
      }),
      tone: "danger",
      size: 30,
      title: "Remover atleta",
      disabled: !editMode,
      onClick: e => e.stopPropagation()
    }))
  }))));
}

/* ---------- 3. Athlete: zones + cycles ---------- */
function AthleteScreen({
  atleta,
  editMode,
  onOpenCycle,
  onToast
}) {
  const [pace, setPace] = React.useState(atleta.teste || '');
  const [zonas, setZonas] = React.useState(() => zoneTable(atleta.teste));
  const [invalid, setInvalid] = React.useState(false);
  const calcular = () => {
    if (!/^\d{1,2}:\d{2}$/.test(pace)) {
      setInvalid(true);
      onToast('Formato inválido! Use MM:SS (ex: 05:00)', 'erro');
      return;
    }
    setInvalid(false);
    setZonas(zoneTable(pace));
    onToast('Zonas calculadas com sucesso!', 'sucesso');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "navy",
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px',
      fontSize: '1.05rem',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 18
  }), "Zonas de treino"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.7)',
      fontSize: '12.5px'
    }
  }, "Incrementos de 20s \xB7 Z4 = pace do teste de 3km")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Input, {
    onDark: true,
    mono: true,
    label: "Teste 3km (MM:SS)",
    value: pace,
    invalid: invalid,
    onChange: e => setPace(e.target.value),
    placeholder: "05:00"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      padding: '10px 22px',
      background: '#fff',
      color: 'var(--primary)',
      fontWeight: 700,
      fontSize: 13,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calculator",
    size: 15
  }), "Calcular"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
      gap: 10
    }
  }, zonas ? ['Z5', 'Z4', 'Z3', 'Z2', 'Z1'].map(z => /*#__PURE__*/React.createElement(ZoneCard, {
    key: z,
    zone: z,
    pace: fmtPace(zonas[z].min) + ' a ' + fmtPace(zonas[z].max) + '/km',
    speed: (3600 / zonas[z].max).toFixed(2) + ' a ' + (3600 / zonas[z].min).toFixed(2) + ' km/h'
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 13,
      padding: '10px 0'
    }
  }, "Digite o pace acima e clique Calcular"))), /*#__PURE__*/React.createElement(Card, {
    padding: "1.75rem"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clipboard-list",
      size: 18,
      color: "var(--primary)"
    }), "Ciclos"),
    subtitle: "Selecione um ciclo para editar as semanas",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      disabled: !editMode,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 15
    }), "Copiar existente"), /*#__PURE__*/React.createElement(Button, {
      disabled: !editMode,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), "Novo ciclo"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
      gap: 14
    }
  }, atleta.ciclos.map(c => /*#__PURE__*/React.createElement(CycleCard, {
    key: c.id,
    name: c.nome,
    weeks: c.semanas,
    workouts: c.treinos,
    isTemplate: c.template,
    race: c.prova,
    onClick: () => onOpenCycle(c),
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "success",
      fullWidth: true,
      onClick: e => {
        e.stopPropagation();
        onOpenCycle(c);
      }
    }, "Abrir ciclo")
  })))));
}
Object.assign(window, {
  DashboardScreen,
  RosterScreen,
  AthleteScreen,
  PageTitle,
  zoneTable,
  fmtPace
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador-v2/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador/app.jsx
try { (() => {
const {
  Button,
  IconButton,
  Toggle,
  Input,
  Toast,
  ConfirmModal,
  AppHeader,
  Breadcrumb,
  Sidebar,
  Drawer
} = window.TreinadorMateusLucasDesignSystem_53df72;
const D = window.KIT_DATA;
const NAV = [{
  title: 'Navegação',
  items: [{
    id: 'athletes',
    icon: '👥',
    label: 'Atletas'
  }, {
    id: 'dashboard',
    icon: '📊',
    label: 'Dashboard'
  }, {
    id: 'analytics',
    icon: '📈',
    label: 'Análises'
  }]
}, {
  title: 'Configurações',
  items: [{
    id: 'export',
    icon: '💾',
    label: 'Exportar Backup'
  }, {
    id: 'import',
    icon: '📥',
    label: 'Importar Backup'
  }, {
    id: 'validate',
    icon: '✔️',
    label: 'Validar Dados'
  }]
}, {
  title: 'Ajuda',
  items: [{
    id: 'guide',
    icon: '❓',
    label: 'Guia Rápido'
  }, {
    id: 'about',
    icon: 'ℹ️',
    label: 'Sobre'
  }]
}];
function App() {
  const [view, setView] = React.useState('athletes');
  const [atletaId, setAtletaId] = React.useState(null);
  const [ciclo, setCiclo] = React.useState(null);
  const [editMode, setEdit] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [notes, setNotes] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);
  const toast = (msg, kind = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, {
      id,
      msg,
      kind
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };
  const atleta = D.atletas.find(a => a.id === atletaId);
  const crumbs = ['Atletas', atleta && atleta.nome, ciclo && ciclo.nome].filter(Boolean);
  const selectAthlete = id => {
    setAtletaId(id);
    setCiclo(null);
    setView('athletes');
  };
  const navigate = i => {
    if (i === 0) {
      setAtletaId(null);
      setCiclo(null);
    }
    if (i === 1) {
      setCiclo(null);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--bg-app)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    showMenu: true,
    onMenu: () => setMenu(true),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Toggle, {
      checked: editMode,
      onChange: v => {
        setEdit(v);
        toast(v ? 'Modo edição ativado' : 'Modo visualização', 'info');
      },
      label: editMode ? '✏️ Edição' : '🔒 Visualização',
      onDark: true
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\u21A9",
      tone: "onDark",
      size: 32,
      title: "Desfazer"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\u21AA",
      tone: "onDark",
      size: 32,
      title: "Refazer"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: dark ? '☀️' : '🌙',
      tone: "onDark",
      size: 32,
      title: "Alternar tema",
      onClick: () => setDark(!dark)
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "header",
      onClick: () => toast('Backup exportado com sucesso!', 'sucesso')
    }, "\uD83D\uDCBE Backup"), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\uD83D\uDCE5",
      tone: "onDark",
      size: 32,
      title: "Importar Backup"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(90deg,#fffbeb 0%,#fef3c7 100%)',
      padding: '12px 24px',
      color: '#92400e',
      borderBottom: '2px solid #fcd34d',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 600
    }
  }, "\u26A0\uFE0F \xDAltimo backup: h\xE1 3 dia(s)"), crumbs.length > 1 && /*#__PURE__*/React.createElement(Breadcrumb, {
    items: crumbs,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-width-desktop)',
      margin: '0 auto',
      padding: 'var(--padding-desktop)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-sections)'
    }
  }, view === 'dashboard' && /*#__PURE__*/React.createElement(DashboardScreen, null), view === 'athletes' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AthletesScreen, {
    selectedId: atletaId,
    editMode: editMode,
    creating: creating,
    setCreating: setCreating,
    onSelect: selectAthlete,
    onNotes: setNotes,
    onRemove: a => setConfirm(a),
    onCreate: nome => {
      const id = Date.now();
      D.atletas.push({
        id,
        nome,
        teste: '',
        ciclos: []
      });
      setCreating(false);
      toast('Atleta ' + nome + ' criado!', 'sucesso');
      setAtletaId(id);
    }
  }), atleta && !ciclo && /*#__PURE__*/React.createElement(AthleteScreen, {
    atleta: atleta,
    editMode: editMode,
    onOpenCycle: setCiclo,
    onToast: toast
  }), atleta && ciclo && /*#__PURE__*/React.createElement(CycleScreen, {
    atleta: atleta,
    ciclo: ciclo,
    editMode: editMode,
    onToast: toast,
    onBackAthletes: () => {
      setAtletaId(null);
      setCiclo(null);
    },
    onBackCycles: () => setCiclo(null)
  }))), /*#__PURE__*/React.createElement(Sidebar, {
    open: menu,
    activeId: view,
    sections: NAV,
    onClose: () => setMenu(false),
    onSelect: id => {
      if (id === 'athletes' || id === 'dashboard') {
        setView(id);
      } else if (id === 'analytics') {
        setView('dashboard');
        toast('Análises usam o mesmo painel neste kit', 'info');
      } else {
        toast('Ação de configuração — não implementada no kit', 'info');
      }
      setMenu(false);
    },
    style: {
      position: 'fixed'
    }
  }), notes && /*#__PURE__*/React.createElement(Drawer, {
    open: true,
    tone: "success",
    width: 520,
    title: '📋 Notas — ' + notes.nome,
    subtitle: "Hist\xF3rico, les\xF5es, objetivos, caracter\xEDsticas",
    onClose: () => setNotes(null),
    style: {
      position: 'fixed'
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setNotes(null)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setNotes(null);
        toast('Notas salvas!', 'sucesso');
      }
    }, "\uD83D\uDCBE Salvar Notas"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '11.5px'
    }
  }, "Use este espa\xE7o para anotar qualquer informa\xE7\xE3o relevante sobre o atleta."), /*#__PURE__*/React.createElement("textarea", {
    defaultValue: notes.notas ? '• PRs: 5km 22min, 10km 48min\n• Lesão no joelho direito em 2024 — evitar impacto excessivo\n• Treina 5x por semana, prefere manhãs' : '',
    placeholder: 'Ex:\n• PRs: 5km 22min, 10km 48min\n• Objetivo: primeira meia maratona em 2026',
    style: {
      minHeight: 280,
      resize: 'vertical',
      fontSize: 14,
      lineHeight: 1.7,
      padding: 14,
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      background: 'var(--bg-muted)'
    }
  }))), confirm && /*#__PURE__*/React.createElement(ConfirmModal, {
    kind: "perigo",
    title: 'Remover ' + confirm.nome + '?',
    style: {
      position: 'fixed'
    },
    message: '📋 ' + confirm.ciclos.length + ' ciclos\n🏃 ' + confirm.ciclos.reduce((s, c) => s + c.treinos, 0) + ' treinos\n\nTodos os dados serão perdidos! Um backup foi criado automaticamente.',
    onCancel: () => setConfirm(null),
    onConfirm: () => {
      const i = D.atletas.findIndex(a => a.id === confirm.id);
      if (i > -1) D.atletas.splice(i, 1);
      if (atletaId === confirm.id) {
        setAtletaId(null);
        setCiclo(null);
      }
      toast('✅ ' + confirm.nome + ' removido com segurança (backup criado).', 'sucesso');
      setConfirm(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 70,
      right: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 99999
    }
  }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, {
    key: t.id,
    kind: t.kind
  }, t.msg))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador/data.js
try { (() => {
window.KIT_DATA = {
  atletas: [{
    id: 1,
    nome: 'Allan e Pedro Henrique',
    notas: true,
    teste: '05:00',
    ciclos: [{
      id: 11,
      nome: 'Ciclo 21km - Maratona Piauí Crono',
      semanas: 10,
      treinos: 23
    }, {
      id: 12,
      nome: '21km - Meia Maratona da PF',
      semanas: 14,
      treinos: 3,
      template: true,
      prova: 'Meia Maratona da PF'
    }]
  }, {
    id: 2,
    nome: 'Jessyka Carvalho',
    teste: '05:40',
    ciclos: [{
      id: 21,
      nome: 'Base 2026',
      semanas: 8,
      treinos: 44
    }, {
      id: 22,
      nome: 'Específico 10km',
      semanas: 6,
      treinos: 36
    }]
  }, {
    id: 3,
    nome: 'Suzy',
    teste: '06:10',
    ciclos: [{
      id: 31,
      nome: 'Primeiros 5km',
      semanas: 4,
      treinos: 22
    }]
  }, {
    id: 4,
    nome: 'Amanda Sousa',
    notas: true,
    teste: '04:50',
    ciclos: [{
      id: 41,
      nome: 'Maratona Piauí',
      semanas: 16,
      treinos: 30
    }, {
      id: 42,
      nome: 'Base Inverno',
      semanas: 6,
      treinos: 14
    }, {
      id: 43,
      nome: 'Específico Meia',
      semanas: 8,
      treinos: 12
    }, {
      id: 44,
      nome: 'Polimento 21km',
      semanas: 3,
      treinos: 10
    }]
  }, {
    id: 5,
    nome: 'Eugênio Gabriel',
    teste: '05:25',
    ciclos: [{
      id: 51,
      nome: 'Retomada',
      semanas: 4,
      treinos: 8
    }]
  }],
  semanas: [{
    nome: 'Semana 1',
    sub: 'Semana Ordinária · Período Base',
    treinos: [{
      weekday: 'TER',
      day: '04',
      month: 'AGO',
      tipo: 'progressivo',
      fase: 'Base',
      desc: 'Pace: 06:40 a 07:00 min/km',
      chips: ['📏 8.0 km', '⏱ 32 - Corrida Leve/Moderada']
    }, {
      weekday: 'QUI',
      day: '06',
      month: 'AGO',
      tipo: 'intervalado',
      fase: 'Base',
      desc: '6x 800m\nIntervalo: 2min trote',
      chips: ['📏 10.0 km', '⏱ 04:55/km nos tiros'],
      feedback: 'dificil'
    }, {
      weekday: 'SÁB',
      day: '09',
      month: 'AGO',
      tipo: 'longao',
      fase: 'Base',
      desc: 'Ritmo conversável do início ao fim',
      chips: ['📏 16.0 km', '⏱ 07:10/km']
    }]
  }, {
    nome: 'Semana 2',
    sub: 'Semana de Recuperação · Período Base',
    treinos: [{
      weekday: 'TER',
      day: '11',
      month: 'AGO',
      tipo: 'leve',
      fase: 'Base',
      desc: 'Recuperação ativa, frequência baixa',
      chips: ['📏 6.0 km'],
      feedback: 'facil'
    }, {
      weekday: 'SEX',
      day: '14',
      month: 'AGO',
      tipo: 'fartlek',
      fase: 'Específico',
      desc: '10x (1min forte / 1min leve)',
      chips: ['📏 9.0 km']
    }]
  }, {
    nome: 'Semana 3',
    sub: 'Semana Ordinária · Período Base',
    treinos: []
  }],
  volume: [{
    label: 'Sem. 1',
    value: 34
  }, {
    label: 'Sem. 2',
    value: 15
  }, {
    label: 'Sem. 3',
    value: 0
  }, {
    label: 'Sem. 4',
    value: 28
  }, {
    label: 'Sem. 5',
    value: 31
  }, {
    label: 'Sem. 6',
    value: 22
  }, {
    label: 'Sem. 7',
    value: 38
  }, {
    label: 'Sem. 8',
    value: 12
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador/data.js", error: String((e && e.message) || e) }); }

// ui_kits/painel-treinador/screens.jsx
try { (() => {
const {
  Card,
  SectionHeader,
  Button,
  IconButton,
  Input,
  Select,
  Toggle,
  EmptyState,
  AthleteCard,
  CycleCard,
  ZoneCard,
  WorkoutCard,
  StatItem,
  DashboardStatCard,
  VolumeChart,
  WorkoutsTable,
  TrainingTypeBadge,
  PhaseBadge,
  FeedbackChip,
  Toast,
  ConfirmModal,
  RaceTargetBanner,
  ValidationItem,
  AppHeader,
  Breadcrumb,
  Sidebar,
  Drawer
} = window.TreinadorMateusLucasDesignSystem_53df72;
const D = window.KIT_DATA;
function paceZones(base) {
  const [m, s] = base.split(':').map(Number);
  const t = m * 60 + s;
  const fmt = x => String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0') + '/km';
  const kmh = x => (3600 / x).toFixed(2);
  const mk = min => ({
    pace: fmt(min) + ' a ' + fmt(min + 20),
    speed: kmh(min + 20) + ' a ' + kmh(min) + ' km/h'
  });
  return {
    Z5: mk(t - 20),
    Z4: mk(t),
    Z3: mk(t + 20),
    Z2: mk(t + 40),
    Z1: mk(t + 60)
  };
}

/* ---------- Roster ---------- */
function AthletesScreen({
  onSelect,
  selectedId,
  editMode,
  onNotes,
  onRemove,
  creating,
  setCreating,
  onCreate
}) {
  const [nome, setNome] = React.useState('');
  const [erro, setErro] = React.useState('');
  const submit = () => {
    if (!nome.trim()) {
      setErro('Digite o nome do atleta.');
      return;
    }
    setErro('');
    onCreate(nome.trim());
    setNome('');
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uD83D\uDC65 Atletas",
    subtitle: D.atletas.length + ' atletas cadastrados',
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "success",
      onClick: () => setCreating(!creating)
    }, "+ Novo Atleta")
  }), creating && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginBottom: 16,
      padding: 14,
      background: 'var(--bg-muted)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    style: {
      flex: 1,
      minWidth: 200
    },
    value: nome,
    error: erro,
    onChange: e => setNome(e.target.value),
    placeholder: "Nome completo do atleta"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "success",
    onClick: submit
  }, "Criar"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => {
      setCreating(false);
      setErro('');
    }
  }, "Cancelar"))), D.atletas.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "\uD83D\uDC5F",
    title: "Nenhum atleta cadastrado ainda",
    subtitle: 'Clique em "+ Novo Atleta" para começar'
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))',
      gap: '2rem'
    }
  }, D.atletas.map(a => /*#__PURE__*/React.createElement(AthleteCard, {
    key: a.id,
    name: a.nome,
    cycles: a.ciclos.length,
    workouts: a.ciclos.reduce((s, c) => s + c.treinos, 0),
    hasNotes: !!a.notas,
    selected: selectedId === a.id,
    onClick: () => onSelect(a.id),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: a.notas ? '📋' : '📝',
      tone: "success",
      size: 30,
      title: "Notas do atleta",
      onClick: e => {
        e.stopPropagation();
        onNotes(a);
      }
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\u270F\uFE0F",
      title: "Editar nome",
      disabled: !editMode,
      onClick: e => e.stopPropagation()
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\uD83D\uDDD1\uFE0F",
      tone: "danger",
      title: "Remover atleta",
      disabled: !editMode,
      onClick: e => {
        e.stopPropagation();
        onRemove(a);
      }
    }))
  }))));
}

/* ---------- Athlete: zones + cycles ---------- */
function AthleteScreen({
  atleta,
  editMode,
  onOpenCycle,
  onToast
}) {
  const [pace, setPace] = React.useState(atleta.teste || '');
  const [zonas, setZonas] = React.useState(() => atleta.teste ? paceZones(atleta.teste) : null);
  const [invalid, setInvalid] = React.useState(false);
  const calcular = () => {
    if (!/^\d{1,2}:\d{2}$/.test(pace)) {
      setInvalid(true);
      onToast('Formato inválido! Use MM:SS (ex: 05:00)', 'erro');
      return;
    }
    setInvalid(false);
    setZonas(paceZones(pace));
    onToast('Zonas calculadas com sucesso!', 'sucesso');
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: '📋 ' + atleta.nome,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "navy",
    padding: "2rem",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px',
      fontSize: '0.95rem',
      color: '#fff'
    }
  }, "\u26A1 Zonas de Treino"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.7)',
      fontSize: '12.5px'
    }
  }, "Incrementos de 20s \u2022 Z4 = pace do teste")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    onDark: true,
    mono: true,
    label: "Teste 3km (MM:SS)",
    value: pace,
    invalid: invalid,
    onChange: e => setPace(e.target.value),
    placeholder: "05:00"
  }), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '11.5px',
      color: 'rgba(255,255,255,0.65)',
      marginTop: 4,
      display: 'block'
    }
  }, "Ex: 3:50 \xB7 4:15 \xB7 5:00")), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      padding: '10px 22px',
      background: '#fff',
      color: 'var(--primary)',
      fontWeight: 700,
      fontSize: 13,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, "Calcular"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, zonas ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
      gap: 10
    }
  }, ['Z5', 'Z4', 'Z3', 'Z2', 'Z1'].map(z => /*#__PURE__*/React.createElement(ZoneCard, {
    key: z,
    zone: z,
    pace: zonas[z].pace,
    speed: zonas[z].speed
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 13,
      padding: '10px 0'
    }
  }, "Digite o pace acima e clique Calcular para ver suas zonas"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      gap: 12,
      marginBottom: 16,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nome do ciclo (Ex: Espec\xEDfico 2025)",
    disabled: !editMode
  }), /*#__PURE__*/React.createElement(Select, {
    placeholder: "Qtd. de semanas",
    disabled: !editMode,
    options: ['4 semanas', '6 semanas', '8 semanas', '12 semanas', '14 semanas', '16 semanas']
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: !editMode
  }, "Criar Ciclo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "template",
    size: "lg",
    fullWidth: true,
    disabled: !editMode
  }, "\uD83D\uDD0D Copiar de Ciclo Existente")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
      gap: 14
    }
  }, atleta.ciclos.map(c => /*#__PURE__*/React.createElement(CycleCard, {
    key: c.id,
    name: c.nome,
    weeks: c.semanas,
    workouts: c.treinos,
    isTemplate: c.template,
    race: c.prova,
    onClick: () => onOpenCycle(c),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "success",
      onClick: e => {
        e.stopPropagation();
        onOpenCycle(c);
      }
    }, "Abrir"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      disabled: !editMode,
      onClick: e => e.stopPropagation()
    }, "\uD83D\uDDD1\uFE0F"))
  }))));
}

/* ---------- Cycle detail ---------- */
function CycleScreen({
  atleta,
  ciclo,
  editMode,
  onBackAthletes,
  onBackCycles,
  onToast
}) {
  const [fase, setFase] = React.useState('');
  const [busca, setBusca] = React.useState('');
  const semanas = D.semanas.map(s => ({
    ...s,
    treinos: s.treinos.filter(t => (!fase || t.fase === fase) && (!busca || t.tipo.includes(busca.toLowerCase())))
  }));
  const totalTreinos = D.semanas.reduce((s, w) => s + w.treinos.length, 0);
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: ciclo.nome,
    style: {
      marginBottom: 16
    },
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "export",
      size: "sm",
      style: {
        background: 'rgba(251,191,36,0.15)',
        color: '#92400e',
        border: '1px solid rgba(251,191,36,0.5)'
      }
    }, "\uD83C\uDFAF Prova Alvo"), /*#__PURE__*/React.createElement(Button, {
      variant: "export",
      size: "sm",
      style: {
        background: 'rgba(14,165,233,0.12)',
        color: '#0369a1',
        border: '1px solid rgba(14,165,233,0.35)'
      }
    }, "\uD83D\uDCC6 Calend\xE1rio"))
  }), ciclo.prova && /*#__PURE__*/React.createElement(RaceTargetBanner, {
    name: ciclo.prova,
    detail: "21 km \xB7 12/10/2026",
    days: 48,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "back",
    onClick: onBackAthletes
  }, "\u2190 Atletas"), /*#__PURE__*/React.createElement(Button, {
    variant: "back",
    onClick: onBackCycles
  }, "\u2190 Ciclos"), /*#__PURE__*/React.createElement(Button, {
    variant: "export",
    style: {
      marginLeft: 'auto',
      background: '#1a56db'
    },
    onClick: () => onToast('Gerando PDF...', 'info')
  }, "\uD83D\uDCC4 Exportar Relat\xF3rio")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 12,
      borderBottom: '2px solid var(--border)',
      paddingBottom: 8
    }
  }, "Dashboard do Ciclo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: "\uD83C\uDFC3",
    label: "Volume Total",
    value: "180.0 km",
    meta: totalTreinos + ' treinos'
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: "\uD83D\uDCCA",
    label: "Distribui\xE7\xE3o Fases",
    value: "3",
    meta: "Base 3 \xB7 Esp. 1 \xB7 Pol. 0"
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: "\uD83D\uDCAC",
    label: "Feedback M\xE9dio",
    value: "Normal",
    meta: "2 feedbacks registrados"
  }), /*#__PURE__*/React.createElement(DashboardStatCard, {
    icon: "\uD83C\uDFAF",
    label: "Prova Alvo",
    value: ciclo.prova || 'Não definida'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: 14,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24
    }
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "2 Problemas Encontrados"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)'
    }
  }, "Revise os itens abaixo para melhorar a qualidade do seu ciclo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(ValidationItem, {
    level: "erro",
    title: "Prova alvo n\xE3o definida",
    description: "Configure a prova alvo do ciclo para acompanhamento",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Ir")
  }), /*#__PURE__*/React.createElement(ValidationItem, {
    level: "aviso",
    title: "Semana 3 sem treinos",
    description: "Nenhum treino cadastrado para esta semana (Semana Ordin\xE1ria \xB7 Per\xEDodo Base)",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Ir")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      margin: '16px 0',
      padding: 16,
      background: 'var(--bg-muted)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Semanas",
    value: ciclo.semanas
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Treinos",
    value: totalTreinos
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Espec\xEDfico",
    value: "1",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Polimento",
    value: "0",
    tone: "danger"
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Volume",
    value: "180.0",
    tone: "success"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    style: {
      flex: 1,
      minWidth: 150
    },
    value: fase,
    onChange: e => setFase(e.target.value),
    placeholder: "Todas as fases",
    options: ['Base', 'Específico', 'Polimento']
  }), /*#__PURE__*/React.createElement(Input, {
    style: {
      flex: 1,
      minWidth: 150
    },
    value: busca,
    onChange: e => setBusca(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar por tipo de treino..."
  })), /*#__PURE__*/React.createElement(VolumeChart, {
    title: "\uD83D\uDCCA Volume por Semana",
    note: "180.0 km no ciclo",
    data: D.volume,
    style: {
      marginBottom: 20
    }
  }), semanas.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.nome,
    style: {
      border: '1.5px solid var(--border)',
      borderLeft: '4px solid var(--accent)',
      padding: 18,
      marginBottom: 16,
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
      background: 'var(--bg-muted)',
      padding: '12px 18px',
      margin: '-18px -18px 14px',
      borderRadius: 'var(--radius-md) var(--radius-md) 0 0'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '0.9rem',
      fontWeight: 700
    }
  }, s.nome, " \xB7 ", s.sub), editMode && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "success"
  }, "+ Adicionar Treino"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "export"
  }, "\uD83D\uDCDA Da Biblioteca"))), s.treinos.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontStyle: 'italic',
      fontSize: 13
    }
  }, "Nenhum treino corresponde ao filtro") : s.treinos.map((t, i) => /*#__PURE__*/React.createElement(WorkoutCard, {
    key: i,
    weekday: t.weekday,
    day: t.day,
    month: t.month,
    badge: /*#__PURE__*/React.createElement(TrainingTypeBadge, {
      type: t.tipo
    }),
    phase: /*#__PURE__*/React.createElement(PhaseBadge, {
      phase: t.fase
    }),
    description: t.desc,
    chips: t.feedback ? [...t.chips, /*#__PURE__*/React.createElement(FeedbackChip, {
      level: t.feedback
    })] : t.chips,
    actions: editMode ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "\u270F\uFE0F",
      tone: "primary",
      size: 34,
      title: "Editar treino"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "\uD83D\uDDD1\uFE0F",
      tone: "danger",
      size: 34,
      title: "Remover treino"
    })) : null
  })))));
}

/* ---------- Dashboard ---------- */
function DashboardScreen() {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uD83D\uDCCA Dashboard de Progresso",
    subtitle: "Acompanhamento de volume e pace dos atletas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(VolumeChart, {
    title: "\uD83D\uDCCA Volume por Semana \u2014 todos os atletas",
    note: "288.0 km no m\xEAs",
    data: D.volume
  }), /*#__PURE__*/React.createElement(VolumeChart, {
    title: "\u23F1 Evolu\xE7\xE3o do Teste de 3km",
    note: "segundos por km",
    data: D.atletas.map(a => ({
      label: a.nome.split(' ')[0],
      value: Number(a.teste.split(':')[0]) * 60 + Number(a.teste.split(':')[1])
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(WorkoutsTable, {
    columns: ['Atleta', 'Ciclos', 'Treinos', 'Teste 3km', 'Zona limiar (Z4)'],
    rows: D.atletas.map(a => [a.nome, a.ciclos.length, a.ciclos.reduce((s, c) => s + c.treinos, 0), a.teste + '/km', paceZones(a.teste).Z4.pace])
  })));
}
Object.assign(window, {
  AthletesScreen,
  AthleteScreen,
  CycleScreen,
  DashboardScreen,
  paceZones
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel-treinador/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ButtonVariants = __ds_scope.ButtonVariants;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.AthleteCard = __ds_scope.AthleteCard;

__ds_ns.CycleCard = __ds_scope.CycleCard;

__ds_ns.CycleGrid = __ds_scope.CycleGrid;

__ds_ns.DashboardStatCard = __ds_scope.DashboardStatCard;

__ds_ns.DayCard = __ds_scope.DayCard;

__ds_ns.ExecutionStats = __ds_scope.ExecutionStats;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.StatItem = __ds_scope.StatItem;

__ds_ns.VolumeChart = __ds_scope.VolumeChart;

__ds_ns.WorkoutCard = __ds_scope.WorkoutCard;

__ds_ns.WorkoutsTable = __ds_scope.WorkoutsTable;

__ds_ns.ZoneCard = __ds_scope.ZoneCard;

__ds_ns.ConfirmModal = __ds_scope.ConfirmModal;

__ds_ns.FeedbackChip = __ds_scope.FeedbackChip;

__ds_ns.PhaseBadge = __ds_scope.PhaseBadge;

__ds_ns.RaceTargetBanner = __ds_scope.RaceTargetBanner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.TrainingTypeBadge = __ds_scope.TrainingTypeBadge;

__ds_ns.ValidationItem = __ds_scope.ValidationItem;

__ds_ns.CopyWorkoutDialog = __ds_scope.CopyWorkoutDialog;

__ds_ns.QuickAdd = __ds_scope.QuickAdd;

__ds_ns.WorkoutBuilder = __ds_scope.WorkoutBuilder;

__ds_ns.WorkoutFeedbackForm = __ds_scope.WorkoutFeedbackForm;

__ds_ns.WorkoutLibrary = __ds_scope.WorkoutLibrary;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.WeekNav = __ds_scope.WeekNav;

})();
