// Suppress transitions while `data-theme` flips so the toggle is instant and
// uniform instead of flickering, then restore them so hovers still animate.
if (typeof document !== 'undefined') {
  const root = document.documentElement;
  const observer = new MutationObserver(() => {
    root.classList.add('theme-switching');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.remove('theme-switching');
      });
    });
  });
  observer.observe(root, {attributes: true, attributeFilter: ['data-theme']});
}
