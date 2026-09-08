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
