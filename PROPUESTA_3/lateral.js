(() => {
 const items = [...document.querySelectorAll('.access-item')];
 const hover = matchMedia('(hover:hover) and (pointer:fine)');
 function close(item) { item.classList.remove('open'); item.querySelector('button').setAttribute('aria-expanded','false'); item.querySelector('.access-panel').inert = true; item.querySelector('.access-panel').setAttribute('aria-hidden','true'); }
 function open(item) { items.forEach(other => { if(other !== item) close(other); }); item.classList.add('open'); item.querySelector('button').setAttribute('aria-expanded','true'); item.querySelector('.access-panel').inert = false; item.querySelector('.access-panel').setAttribute('aria-hidden','false'); }
 items.forEach(item => { item.querySelector('.access-panel').hidden = false; close(item);
   item.querySelector('button').addEventListener('click', () => item.classList.contains('open') ? close(item) : open(item));
   item.addEventListener('mouseenter', () => { if(hover.matches) open(item); });
   item.addEventListener('mouseleave', () => { if(!item.contains(document.activeElement)) close(item); });
   item.addEventListener('focusout', () => setTimeout(() => { if(!item.contains(document.activeElement)) close(item); },0));
   item.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(item)));
 });
 document.addEventListener('keydown', e => { if(e.key === 'Escape') items.forEach(item => { item.querySelector('.access-panel').hidden = false; close(item); if(item.classList.contains('open')) {item.querySelector('button').focus();close(item);} }); });
 document.addEventListener('click', e => { if(!e.target.closest('.side-access')) items.forEach(close); });
})();
(() => {
 const nav = document.querySelector('.side-access');
 const menu = document.querySelector('.tab-bar');
 if (!nav || !menu) return;
 let queued = false;
 function place() {
   queued = false;
   
   const top = Math.max(0, menu.getBoundingClientRect().bottom) + 14;
   const space = Math.max(0, innerHeight - top - 14);
   const height = Math.max(40, Math.min(82, (space - 20) / 3));
   const group = height * 3 + 20;
   nav.style.setProperty('--access-top', `${top + Math.max(0, (space - group) / 2)}px`);
   nav.style.setProperty('--access-height', `${height}px`);
   nav.style.setProperty('--access-space', `${Math.max(100, space)}px`);
 }
 function schedule() { if (!queued) { queued = true; requestAnimationFrame(place); } }
 addEventListener('scroll', schedule, { passive: true });
 addEventListener('resize', schedule);
 new ResizeObserver(schedule).observe(menu);
 place();
})();
