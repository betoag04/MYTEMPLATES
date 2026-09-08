(() => {
  const allowed = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  document.querySelectorAll('.header nav a:not(.nav-contact)').forEach(link => {
    let frame = 0;
    let x = 0;
    let y = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      link.style.removeProperty('--menu-x');
      link.style.removeProperty('--menu-y');
    };
    link.addEventListener('pointermove', event => {
      if (!allowed.matches || event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = link.getBoundingClientRect();
        link.style.setProperty('--menu-x', `${x - rect.left + 10}px`);
        link.style.setProperty('--menu-y', `${y - rect.top - 2}px`);
      });
    });
    link.addEventListener('pointerleave', reset);
    link.addEventListener('pointercancel', reset);
    allowed.addEventListener('change', reset);
    window.addEventListener('blur', reset);
  });
})();
(() => {
  const header = document.querySelector('.header');
  if (!header) return;
  const allowed = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let frame = 0;
  let x = 0;
  let y = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    header.classList.remove('bar-glass-active');
    header.style.removeProperty('--bar-x');
    header.style.removeProperty('--bar-y');
  };
  header.addEventListener('pointermove', event => {
    if (!allowed.matches || event.pointerType !== 'mouse') return;
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = header.getBoundingClientRect();
      header.style.setProperty('--bar-x', `${x - rect.left}px`);
      header.style.setProperty('--bar-y', `${y - rect.top}px`);
      header.classList.add('bar-glass-active');
    });
  });
  header.addEventListener('pointerleave', reset);
  header.addEventListener('pointercancel', reset);
  allowed.addEventListener('change', reset);
  window.addEventListener('blur', reset);
})();
