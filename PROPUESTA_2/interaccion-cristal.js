(() => {
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const panels = [...document.querySelectorAll('.history, .product, .commitments article, .map-card, .footer-top')];
  const resets = [];
  panels.forEach(panel => {
    panel.classList.add('crystal-interactive');
    let frame = 0;
    let position;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      panel.classList.remove('glass-active');
      ['--glass-x', '--glass-y', '--glass-rx', '--glass-ry'].forEach(name => panel.style.removeProperty(name));
    };
    resets.push(reset);
    panel.addEventListener('pointermove', event => {
      if (!pointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return;
      position = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = panel.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (position.x - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (position.y - rect.top) / rect.height));
        panel.style.setProperty('--glass-x', `${x * 100}%`);
        panel.style.setProperty('--glass-y', `${y * 100}%`);
        panel.style.setProperty('--glass-rx', `${(0.5 - y) * 0.7}deg`);
        panel.style.setProperty('--glass-ry', `${(x - 0.5) * 0.7}deg`);
        panel.classList.add('glass-active');
      });
    });
    panel.addEventListener('pointerleave', reset);
    panel.addEventListener('pointercancel', reset);
  });
  const resetAll = () => resets.forEach(reset => reset());
  pointer.addEventListener('change', resetAll);
  reducedMotion.addEventListener('change', resetAll);
  window.addEventListener('blur', resetAll);
})();
