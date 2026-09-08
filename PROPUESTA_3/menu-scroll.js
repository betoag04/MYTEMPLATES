(() => {
  const bar = document.querySelector('.tab-bar');
  const header = document.querySelector('.header');
  if (!bar || !header) return;
  let pending = false;
  function update() {
    bar.classList.toggle('is-scrolled', header.getBoundingClientRect().bottom <= 0);
    pending = false;
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  update();
})();
