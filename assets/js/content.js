/* Progressive enhancement for approved real cases only. See CONTENT.md. */
(() => {
  'use strict';
  document.querySelectorAll('[data-comparison]').forEach(figure => {
    const images = [...figure.querySelectorAll('img')];
    const control = figure.querySelector('.comparison-control');
    const range = control?.querySelector('input');
    if (!range || images.length !== 2) return;
    function ready() {
      if (!images.every(img => img.complete && img.naturalWidth > 0)) return;
      figure.classList.add('comparison-ready');
      control.hidden = false;
    }
    images.forEach(img => img.addEventListener('load', ready));
    range.addEventListener('input', () => {
      figure.style.setProperty('--reveal', `${range.value}%`);
      control.querySelector('output').value = `${range.value}%`;
      range.setAttribute('aria-valuetext', `${range.value}% de la fotografía después`);
    });
    ready();
  });
  // Neutral event contract; no tracker or personal data is added.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-cta]');
    if (!link) return;
    document.dispatchEvent(new CustomEvent('dental:cta', { detail: {
      action: link.dataset.cta,
      placement: link.dataset.placement || link.closest('section,header,footer,dialog')?.id || link.className || 'navigation'
    } }));
  });
})();
