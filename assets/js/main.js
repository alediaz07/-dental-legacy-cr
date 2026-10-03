(() => {
  'use strict';

  const loadScript = (src) => new Promise((resolve, reject) => {
    const url = new URL(src, document.baseURI).href;
    let existing = [...document.scripts].find((script) => script.src === url);
    if (existing?.dataset.loaderState === 'failed') {
      existing.remove();
      existing = null;
    }
    if (existing) {
      if (existing.dataset.loaderState === 'loaded') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.dataset.loaderState = 'loading';
    script.addEventListener('load', () => {
      script.dataset.loaderState = 'loaded';
      resolve();
    }, { once: true });
    script.addEventListener('error', (event) => {
      script.dataset.loaderState = 'failed';
      reject(event);
    }, { once: true });
    document.head.append(script);
  });

  const loadStyle = (href) => new Promise((resolve, reject) => {
    const url = new URL(href, document.baseURI).href;
    let existing = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .find((link) => link.href === url);
    if (existing?.dataset.loaderState === 'failed') {
      existing.remove();
      existing = null;
    }
    if (existing) {
      if (existing.sheet || existing.dataset.loaderState === 'loaded') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.dataset.loaderState = 'loading';
    link.addEventListener('load', () => {
      link.dataset.loaderState = 'loaded';
      resolve();
    }, { once: true });
    link.addEventListener('error', (event) => {
      link.dataset.loaderState = 'failed';
      reject(event);
    }, { once: true });
    document.head.append(link);
  });

  const menu = document.querySelector('#mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  let previousFocus;
  function closeMenu() { if (menu.open) menu.close(); }
  toggle.addEventListener('click', () => {
    previousFocus = document.activeElement;
    menu.showModal();
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    close.focus();
  });
  close.addEventListener('click', closeMenu);
  menu.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    previousFocus?.focus({ preventScroll: true });
  });
  menu.addEventListener('click', (event) => { if (event.target === menu) closeMenu(); });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  window.DentalStory?.init();
  if ('IntersectionObserver' in window) window.DentalReels?.init();
  document.querySelectorAll('[data-story-link]').forEach((link) => link.addEventListener('click', (event) => {
    if (window.DentalStory?.goTo(link.dataset.storyLink)) {
      event.preventDefault();
      history.pushState(null, '', link.getAttribute('href'));
    }
  }));
  if (location.hash === '#filosofia') requestAnimationFrame(() => window.DentalStory?.goTo('beyond'));

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.reading-progress i');
  let queued = false;
  function update() {
    queued = false;
    const range = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${range > 0 ? Math.min(1, scrollY / range) : 0})`;
    header.classList.toggle('scrolled', scrollY > 36);
  }
  addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();

  const booking = document.querySelector('.mobile-booking');
  const contactBottom = document.querySelector('#contacto .contact-bottom');
  const staticBooking = contactBottom?.querySelector('.button');
  if (booking && contactBottom && 'IntersectionObserver' in window) new IntersectionObserver((entries) => {
    const reached = entries[0].isIntersecting;
    if (reached && booking.parentElement !== contactBottom) {
      contactBottom.append(booking);
      booking.classList.add('is-static');
      staticBooking?.setAttribute('hidden', '');
    } else if (!reached && booking.parentElement === contactBottom) {
      document.body.append(booking);
      booking.classList.remove('is-static');
      staticBooking?.removeAttribute('hidden');
    }
  }, { threshold: 0.1 }).observe(contactBottom);

  let contactPanelPromise;
  const loadContactPanel = () => {
    if (window.DentalContactPanelReady) return Promise.resolve();
    if (!contactPanelPromise) contactPanelPromise = loadScript('assets/js/contact-panel.js');
    return contactPanelPromise;
  };
  const warmContactPanel = () => loadContactPanel().catch(() => {});
  document.querySelectorAll('[data-contact-open]').forEach((trigger) => {
    trigger.addEventListener('pointerenter', warmContactPanel, { once: true, passive: true });
    trigger.addEventListener('focus', warmContactPanel, { once: true });
    trigger.addEventListener('touchstart', warmContactPanel, { once: true, passive: true });
  });
  document.addEventListener('click', async (event) => {
    const trigger = event.target.closest?.('[data-contact-open]');
    if (!trigger || window.DentalContactPanelReady) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    try {
      await loadContactPanel();
      trigger.click();
    } catch {
      window.location.href = trigger.href;
    }
  }, true);

  let mapPromise;
  const loadMap = () => {
    if (mapPromise) return mapPromise;
    mapPromise = loadStyle('https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css')
      .then(() => window.maplibregl
        ? undefined
        : loadScript('https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js'))
      .then(() => {
        if (!window.maplibregl) throw new Error('MapLibre terminó de cargar, pero window.maplibregl no está disponible.');
        return window.DentalLocationMap
          ? undefined
          : loadScript('assets/js/location-map.js?v=2');
      })
      .then(() => {
        const map = window.DentalLocationMap?.init();
        if (!map) throw new Error('El módulo del mapa cargó, pero no pudo inicializar #legacy-map.');
        return map;
      })
      .catch((error) => {
        mapPromise = null;
        console.error('[Dental Legacy] No se pudo cargar el mapa interactivo.', error);
        throw error;
      });
    return mapPromise;
  };
  const locationSection = document.querySelector('#ubicacion');
  if (locationSection) {
    if ('IntersectionObserver' in window) {
      const mapObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        loadMap().then(() => observer.disconnect()).catch(() => {});
      }, { rootMargin: '800px 0px' });
      mapObserver.observe(locationSection);
    } else {
      loadMap().catch(() => {});
    }
    if (location.hash === '#ubicacion') loadMap().catch(() => {});
    addEventListener('hashchange', () => {
      if (location.hash === '#ubicacion') loadMap().catch(() => {});
    });
  }

  // Native details keep the service index usable without JavaScript.
  document.querySelectorAll('.service-item').forEach((item) => item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.service-item').forEach((other) => {
      if (other !== item) other.open = false;
    });
  }));
})();
