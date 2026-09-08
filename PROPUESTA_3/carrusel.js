(() => {
 const root = document.querySelector('.valley-carousel');
 const slides = [...root.querySelectorAll('.valley-slide')];
 const dots = [...root.querySelectorAll('.dot')];
 const pause = root.querySelector('.pause');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 let index = 0, timer, stopped = reduced.matches, hovering = false;
 function schedule() { clearInterval(timer); if (!stopped && !hovering && !document.hidden && !root.contains(document.activeElement)) timer = setInterval(() => show(index + 1), 7000); }
 function show(next) { index = (next + slides.length) % slides.length; slides.forEach((slide, i) => { slide.classList.toggle('current', i === index); slide.setAttribute('aria-hidden', String(i !== index)); slide.inert = i !== index; }); dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index))); }
 function state() { pause.textContent = stopped ? 'Reproducir' : 'Pausar'; root.classList.toggle('paused', stopped); schedule(); }
 pause.addEventListener('click', () => { stopped = !stopped; state(); });
 dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); schedule(); }));
 root.querySelector('.previous').addEventListener('click', () => { show(index - 1); schedule(); });
 root.querySelector('.next').addEventListener('click', () => { show(index + 1); schedule(); });
 root.addEventListener('mouseenter', () => { hovering = true; schedule(); });
 root.addEventListener('mouseleave', () => { hovering = false; schedule(); });
 root.addEventListener('focusin', schedule);
 root.addEventListener('focusout', () => setTimeout(schedule, 0));
 document.addEventListener('visibilitychange', schedule);
 reduced.addEventListener('change', () => { stopped = reduced.matches; state(); });
 show(0); state();
})();
