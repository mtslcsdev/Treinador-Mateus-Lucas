// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  const base = '../../_ds/treinador-mateus-lucas-design-system-53df7241-3425-4c05-ae0f-df633c1c3edf';
  // Fonte da marca primeiro: dispara em paralelo com o CSS, em vez de ficar
  // serializada atrás do @import aninhado em tokens/fonts.css.
  for (const [rel, href] of [
    ['preconnect', 'https://fonts.gstatic.com'],
    ['stylesheet', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap']
  ]) {
    const f = document.createElement('link');
    f.rel = rel; f.href = href;
    if (rel === 'preconnect') f.crossOrigin = 'anonymous';
    document.head.appendChild(f);
  }
  for (const p of ["tokens/fonts.css","tokens/colors.css","tokens/typography.css","tokens/spacing.css","tokens/radius.css","tokens/shadows.css","tokens/motion.css","tokens/zones.css","tokens/dark.css","styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
