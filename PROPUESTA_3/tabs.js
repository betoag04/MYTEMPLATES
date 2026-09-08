const tabs = [...document.querySelectorAll('.tab-list [role="tab"]')];
const panels = [...document.querySelectorAll('main > .tab-panel')];
function activate(id, focus = false) {
  const active = tabs.find(tab => tab.getAttribute('aria-controls') === id);
  if (!active) return;
  tabs.forEach(tab => { const selected = tab === active; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  panels.forEach(panel => { panel.hidden = panel.id !== id; });
  if (focus) active.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { activate(tab.getAttribute('aria-controls')); history.replaceState(null, '', '#' + tab.getAttribute('aria-controls')); window.scrollTo({ top: 0, behavior: 'instant' }); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].click(); tabs[next].focus(); }
  });
});
function resolveHash() {
  const target = document.getElementById(location.hash.slice(1));
  const panel = target?.closest('.tab-panel');
  if (panel) { activate(panel.id); if (target !== panel) requestAnimationFrame(() => target.scrollIntoView()); }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.getElementById(link.hash.slice(1));
  const panel = target?.closest('.tab-panel');
  if (panel) activate(panel.id);
});
window.addEventListener('hashchange', resolveHash);
activate('empresa');
resolveHash();
document.querySelector('#year').textContent = new Date().getFullYear();
