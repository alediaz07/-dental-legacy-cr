(() => {
  'use strict';

  const languageStorageKey = 'dentalLegacyLanguage';
  const homeTranslations = {
    es: {
      skip: 'Saltar al contenido', navLabel: 'Navegación principal', nav: ['Filosofía', 'Servicios', 'La clínica', 'Ubicación'], booking: 'Agenda tu valoración', menu: 'Menú', close: 'Cerrar', mobileNavLabel: 'Navegación móvil', mobileNav: ['Inicio', 'Filosofía', 'Servicios', 'La clínica', 'Ubicación'], languageLabel: 'Idioma',
      hero: ['Precisión', 'que se siente', 'natural.'], heroDescription: ['Una mirada a la función, la estética', ' y a lo que hace única tu sonrisa.'], philosophyLink: 'Conoce nuestra filosofía',
      beyondEyebrow: 'La mirada completa', beyond: ['Más allá', 'de una ', 'sonrisa.'], beyondCopy: 'Una valoración es el punto de partida para conversar sobre función, proporción y lo que esperas de tu tratamiento.',
      precisionEyebrow: 'Cada componente importa', precision: ['Precisión,', 'capa por ', 'capa.'], precisionCopy: ['Corona, conexión e implante.', 'Tres partes de un conjunto que merece comprenderse con claridad.'], precisionNote: 'Representación ilustrativa. El diseño de cada tratamiento se determina en la valoración.', precisionAlt: 'Despiece ilustrativo: corona, tornillo de fijación, pilar y cuerpo del implante',
      functionEyebrow: 'Pensado como un conjunto', functionWords: ['Función.', 'Estabilidad.', 'Naturalidad.'], functionCopy: ['Masticar. Hablar. Sonreír.', 'Lo cotidiano también forma parte de la conversación sobre tu salud dental.'], functionAlt: 'Ilustración de un diente y un implante en contexto anatómico',
      naturalEyebrow: 'Volver a lo esencial', natural: ['Estética', 'natural.'], naturalCopy: ['Forma, proporción y color.', 'Una conversación que comienza con tu sonrisa.'], scrollCue: 'Desliza para descubrir',
      storySummaryTitle: 'Comprender el conjunto', storySummary: 'El recorrido visual muestra una corona, una conexión y un implante. Sus componentes se separan y vuelven a ensamblarse para ilustrar su relación. Es una representación ilustrativa; el diseño de cada tratamiento se determina en una valoración.',
      reelsTitle: ['Una mirada', 'más ', 'cercana.'], reelsIntro: ['Conoce la clínica a través de sus explicaciones,', ' sus procesos y las experiencias compartidas.'], videoError: 'No se pudo cargar el video.', openVideo: 'Abrir video', play: 'Reproducir', pause: 'Pausar', soundOn: 'Activar sonido', soundOff: 'Silenciar', reels: [
        { title: 'Comprender los implantes', caption: 'Una explicación, paso a paso.' },
        { title: 'La experiencia de blanqueamiento', caption: 'Una mirada al proceso, desde la clínica.' },
        { title: 'Más allá de una pieza', caption: 'Una conversación sobre la función dental.' }
      ],
      servicesTitle: ['El cuidado empieza', 'por ', 'comprenderte.'], servicesIntro: 'Consulta con la clínica las opciones para tu caso.', services: [
        { aria: 'Agendar valoración dental', title: ['Valoración', 'dental'], subtitle: 'El punto de partida', description: 'Conversa con Dental Legacy sobre lo que necesitas y consulta los siguientes pasos de tu atención.', alt: 'Paciente sonriendo en una consulta dental; la imagen incluye el texto Escuchar, evaluar, planificar, avanzar.' },
        { aria: 'Consultar sobre implantes dentales', title: ['Implantes', 'dentales'], subtitle: 'Estructura y función', description: 'Conoce cómo se relacionan corona, conexión e implante. Una valoración permite conversar sobre las alternativas para tu caso.', alt: 'Implante dental ilustrado entre piezas dentales; la imagen incluye el texto Estructura que devuelve naturalidad.' },
        { aria: 'Consultar sobre blanqueamiento dental', title: ['Blanqueamiento', 'dental'], subtitle: 'Una mirada a la estética', description: 'Explora el proceso presentado en nuestro material audiovisual y consulta con la clínica si esta opción es adecuada para ti.', alt: 'Sonrisa y pieza de muestra para comparar el color dental.' }
      ],
      clinicEyebrow: 'Un lugar para conversar', clinicTitle: ['Tu sonrisa.', 'Tu historia.', 'Dental Legacy.'], clinicCopy: 'Estamos en San Vicente de Moravia. Acércate para conversar sobre tu atención dental y coordinar una valoración.', clinicLink: 'Conoce dónde encontrarnos', clinicAlt: 'Dos personas en Dental Legacy observando una imagen dental en una tablet',
      locationEyebrow: 'Encuéntranos', locationTitle: ['Nos vemos', 'en ', 'Moravia.'], contact: 'Contacto', call: 'Llamar a Dental Legacy CR', directions: 'Cómo llegar', directionsExtra: ' (abre Google Maps en otra pestaña)', mapAria: 'Mapa interactivo de Dental Legacy CR', openMaps: 'Abrir en Google Maps',
      contactEyebrow: 'El siguiente paso es tuyo', contactTitle: ['Comienza', 'aquí.'], contactCopy: ['Habla con Dental Legacy CR para consultar', ' disponibilidad y coordinar tu valoración.'], backTop: 'Volver al inicio ↑', facebook: 'Facebook de Dental Legacy CR', instagram: 'Instagram de Dental Legacy CR'
    },
    en: {
      skip: 'Skip to content', navLabel: 'Main navigation', nav: ['Philosophy', 'Services', 'The clinic', 'Location'], booking: 'Book your assessment', menu: 'Menu', close: 'Close', mobileNavLabel: 'Mobile navigation', mobileNav: ['Home', 'Philosophy', 'Services', 'The clinic', 'Location'], languageLabel: 'Language',
      hero: ['Precision', 'that feels', 'natural.'], heroDescription: ['A closer look at function, aesthetics,', ' and what makes your smile unique.'], philosophyLink: 'Discover our philosophy',
      beyondEyebrow: 'The complete perspective', beyond: ['Beyond', 'a ', 'smile.'], beyondCopy: 'An assessment is the starting point for a conversation about function, proportion, and what you expect from your treatment.',
      precisionEyebrow: 'Every component matters', precision: ['Precision,', 'layer by ', 'layer.'], precisionCopy: ['Crown, connection, and implant.', 'Three parts of a whole that deserves to be understood clearly.'], precisionNote: 'Illustrative representation. Every treatment is designed after a personal assessment.', precisionAlt: 'Illustrated exploded view of a crown, fixing screw, abutment, and implant body',
      functionEyebrow: 'Designed as a whole', functionWords: ['Function.', 'Stability.', 'Naturalness.'], functionCopy: ['Chew. Speak. Smile.', 'Everyday life is also part of the conversation about your dental health.'], functionAlt: 'Illustration of a tooth and an implant in their anatomical context',
      naturalEyebrow: 'Returning to what matters', natural: ['Natural', 'aesthetics.'], naturalCopy: ['Shape, proportion, and color.', 'A conversation that begins with your smile.'], scrollCue: 'Scroll to discover',
      storySummaryTitle: 'Understanding the whole', storySummary: 'This visual journey shows a crown, a connection, and an implant. The components separate and come together again to illustrate how they relate. This is an illustrative representation; every treatment is designed after an assessment.',
      reelsTitle: ['A closer', '', 'look.'], reelsIntro: ['Discover the clinic through clear explanations,', ' its processes, and shared experiences.'], videoError: 'The video could not be loaded.', openVideo: 'Open video', play: 'Play', pause: 'Pause', soundOn: 'Turn sound on', soundOff: 'Mute', reels: [
        { title: 'Understanding dental implants', caption: 'A clear, step-by-step explanation.' },
        { title: 'The whitening experience', caption: 'A closer look at the process, from the clinic.' },
        { title: 'Beyond a single tooth', caption: 'A conversation about dental function.' }
      ],
      servicesTitle: ['Care begins', 'with ', 'understanding you.'], servicesIntro: 'Talk with the clinic about the options that may suit your case.', services: [
        { aria: 'Book a dental assessment', title: ['Dental', 'assessment'], subtitle: 'The starting point', description: 'Talk with Dental Legacy about what you need and explore the next steps in your care.', alt: 'A patient smiling during a dental consultation; the image includes the words Listen, assess, plan, move forward.' },
        { aria: 'Ask about dental implants', title: ['Dental', 'implants'], subtitle: 'Structure and function', description: 'Learn how the crown, connection, and implant work together. An assessment opens the conversation about the options for your case.', alt: 'A dental implant illustrated between natural teeth; the image includes the words Structure that restores naturalness.' },
        { aria: 'Ask about teeth whitening', title: ['Teeth', 'whitening'], subtitle: 'A closer look at aesthetics', description: 'Explore the process shown in our video and ask the clinic whether this option is right for you.', alt: 'A smile beside a dental shade guide.' }
      ],
      clinicEyebrow: 'A place to talk', clinicTitle: ['Your smile.', 'Your story.', 'Dental Legacy.'], clinicCopy: 'We are in San Vicente de Moravia. Visit us to talk about your dental care and arrange an assessment.', clinicLink: 'See where to find us', clinicAlt: 'Two people at Dental Legacy viewing a dental image on a tablet',
      locationEyebrow: 'Find us', locationTitle: ['See you', 'in ', 'Moravia.'], contact: 'Contact', call: 'Call Dental Legacy CR', directions: 'Get directions', directionsExtra: ' (opens Google Maps in a new tab)', mapAria: 'Interactive map of Dental Legacy CR', openMaps: 'Open in Google Maps',
      contactEyebrow: 'Your next step', contactTitle: ['Start', 'here.'], contactCopy: ['Talk with Dental Legacy CR to check availability', ' and arrange your assessment.'], backTop: 'Back to top ↑', facebook: 'Dental Legacy CR on Facebook', instagram: 'Dental Legacy CR on Instagram'
    }
  };

  const directTextNodes = (element) => [...element.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
  const setOwnText = (element, value, trailingSpace = true) => {
    const textNode = directTextNodes(element)[0];
    if (textNode) textNode.nodeValue = trailingSpace ? `${value} ` : value;
  };
  const setTextParts = (element, values) => {
    directTextNodes(element).forEach((node, index) => {
      if (values[index] !== undefined) node.nodeValue = values[index];
    });
  };
  const setHeading = (selector, lines, emphasis) => {
    const element = document.querySelector(selector);
    setTextParts(element, lines);
    const em = element.querySelector('em');
    if (em) em.textContent = emphasis;
  };
  const readStoredLanguage = () => {
    try {
      const language = localStorage.getItem(languageStorageKey);
      return language === 'es' || language === 'en' ? language : null;
    } catch {
      return null;
    }
  };
  const storeLanguage = (language) => {
    try { localStorage.setItem(languageStorageKey, language); } catch {}
  };

  let currentLanguage = readStoredLanguage() || 'es';
  let experienceInitialized = false;

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

  const applyHomeLanguage = (language, announce = true) => {
    currentLanguage = language;
    const copy = homeTranslations[language];
    document.documentElement.lang = language;

    document.querySelector('.skip-link').textContent = copy.skip;
    document.querySelector('.wordmark').setAttribute('aria-label', language === 'en' ? 'Dental Legacy CR, home' : 'Dental Legacy CR, inicio');
    const desktopNav = document.querySelector('.desktop-nav');
    desktopNav.setAttribute('aria-label', copy.navLabel);
    [...desktopNav.querySelectorAll('a')].forEach((link, index) => { link.textContent = copy.nav[index]; });
    document.querySelector('.header-booking').textContent = copy.booking;
    setOwnText(document.querySelector('.menu-toggle'), copy.menu);
    document.querySelector('.header-language-switch').setAttribute('aria-label', copy.languageLabel);
    document.querySelectorAll('[data-language-switch]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.languageSwitch === language));
    });

    const mobileMenu = document.querySelector('#mobile-menu');
    mobileMenu.setAttribute('aria-label', language === 'en' ? 'Navigation' : 'Navegación');
    setOwnText(mobileMenu.querySelector('.menu-close'), copy.close);
    const mobileNav = mobileMenu.querySelector('nav');
    mobileNav.setAttribute('aria-label', copy.mobileNavLabel);
    [...mobileNav.querySelectorAll('a')].forEach((link, index) => { link.textContent = copy.mobileNav[index]; });

    const heroWords = document.querySelectorAll('.scene-hero h1 .line>*');
    copy.hero.forEach((word, index) => { heroWords[index].textContent = word; });
    setTextParts(document.querySelector('.hero-description'), copy.heroDescription);
    document.querySelector('.hero-actions .button span').textContent = copy.booking;
    setOwnText(document.querySelector('.hero-actions .text-link'), copy.philosophyLink);

    document.querySelector('.scene-beyond .eyebrow').textContent = copy.beyondEyebrow;
    setHeading('#beyond-title', copy.beyond.slice(0, 2), copy.beyond[2]);
    document.querySelector('.scene-beyond .scene-copy>p:last-child').textContent = copy.beyondCopy;
    document.querySelector('.scene-precision .eyebrow').textContent = copy.precisionEyebrow;
    setHeading('#precision-title', copy.precision.slice(0, 2), copy.precision[2]);
    setTextParts(document.querySelector('.scene-precision .scene-copy>p:not(.eyebrow):not(.fine-print)'), copy.precisionCopy);
    document.querySelector('.scene-precision .fine-print').textContent = copy.precisionNote;
    document.querySelector('.scene-precision img').alt = copy.precisionAlt;
    document.querySelector('.scene-function .eyebrow').textContent = copy.functionEyebrow;
    document.querySelectorAll('.function-word').forEach((word, index) => { word.textContent = copy.functionWords[index]; });
    setTextParts(document.querySelector('.scene-function .scene-copy>p:last-child'), copy.functionCopy);
    document.querySelector('.scene-function img').alt = copy.functionAlt;
    document.querySelector('.scene-natural .eyebrow').textContent = copy.naturalEyebrow;
    setHeading('#natural-title', [copy.natural[0]], copy.natural[1]);
    setTextParts(document.querySelector('.scene-natural .scene-copy>p:last-child'), copy.naturalCopy);
    setOwnText(document.querySelector('.scroll-cue'), copy.scrollCue);

    const storySummary = document.querySelector('.journey+.sr-only');
    storySummary.querySelector('h2').textContent = copy.storySummaryTitle;
    storySummary.querySelector('p').textContent = copy.storySummary;
    setHeading('#reels-title', copy.reelsTitle.slice(0, 2), copy.reelsTitle[2]);
    setTextParts(document.querySelector('.editorial-reels .section-intro'), copy.reelsIntro);
    document.querySelectorAll('.reel').forEach((card, index) => {
      const reel = copy.reels[index];
      const video = card.querySelector('video');
      const play = card.querySelector('.reel-play');
      const sound = card.querySelector('.reel-sound');
      video.setAttribute('aria-label', reel.title);
      play.setAttribute('aria-label', `${video.paused ? copy.play : copy.pause}: ${reel.title}`);
      sound.setAttribute('aria-label', video.muted ? copy.soundOn : copy.soundOff);
      card.querySelector('h3').textContent = reel.title;
      card.querySelector('.reel-caption p').textContent = reel.caption;
      const error = card.querySelector('.video-error');
      setOwnText(error, copy.videoError);
      error.querySelector('a').textContent = copy.openVideo;
    });

    setHeading('#services-title', copy.servicesTitle.slice(0, 2), copy.servicesTitle[2]);
    document.querySelector('.services .section-intro').textContent = copy.servicesIntro;
    document.querySelectorAll('.service-panel').forEach((panel, index) => {
      const service = copy.services[index];
      panel.setAttribute('aria-label', service.aria);
      setTextParts(panel.querySelector('h3'), service.title);
      panel.querySelector('.service-panel-subtitle').textContent = service.subtitle;
      panel.querySelector('.service-panel-description').textContent = service.description;
      panel.querySelector('img').alt = service.alt;
    });

    document.querySelector('.clinic-copy .eyebrow').textContent = copy.clinicEyebrow;
    setHeading('#clinic-title', copy.clinicTitle.slice(0, 2), copy.clinicTitle[2]);
    document.querySelector('.clinic-copy>p:not(.eyebrow)').textContent = copy.clinicCopy;
    setOwnText(document.querySelector('.clinic-copy .text-link'), copy.clinicLink);
    document.querySelector('.clinic-photo img').alt = copy.clinicAlt;
    document.querySelector('.location-main>.eyebrow:first-child').textContent = copy.locationEyebrow;
    setHeading('#location-title', copy.locationTitle.slice(0, 2), copy.locationTitle[2]);
    document.querySelector('.location-contact-label').textContent = copy.contact;
    document.querySelector('.location-phone').setAttribute('aria-label', copy.call);
    const directions = document.querySelector('.location-directions');
    setOwnText(directions, copy.directions);
    directions.querySelector('.sr-only').textContent = copy.directionsExtra;
    document.querySelector('#legacy-map').setAttribute('aria-label', copy.mapAria);
    document.querySelector('.map-caption a').textContent = copy.openMaps;

    document.querySelector('.contact>.eyebrow').textContent = copy.contactEyebrow;
    setHeading('#contact-title', [copy.contactTitle[0]], copy.contactTitle[1]);
    setTextParts(document.querySelector('.contact-bottom>p'), copy.contactCopy);
    document.querySelector('.contact-bottom .button span').textContent = copy.booking;
    document.querySelector('.footer-social-link[href^="tel:"]').setAttribute('aria-label', copy.call);
    document.querySelector('.footer-social-link[href*="facebook"]').setAttribute('aria-label', copy.facebook);
    document.querySelector('.footer-social-link[href*="instagram"]').setAttribute('aria-label', copy.instagram);
    document.querySelector('.back-top').textContent = copy.backTop;
    document.querySelector('.mobile-booking span').textContent = copy.booking;

    if (announce) document.dispatchEvent(new CustomEvent('dental-language-change', { detail: { language } }));
  };

  window.DentalLanguage = {
    get: () => currentLanguage,
    reelControls: () => {
      const copy = homeTranslations[currentLanguage];
      return { play: copy.play, pause: copy.pause, soundOn: copy.soundOn, soundOff: copy.soundOff };
    },
    map: () => currentLanguage === 'en'
      ? { toggle: 'Toggle map attribution', zoomIn: 'Zoom in', zoomOut: 'Zoom out', close: 'Close map information', windowsHelp: 'Hold Ctrl and scroll to zoom the map', macHelp: 'Hold ⌘ and scroll to zoom the map', mobileHelp: 'Use two fingers to move the map', marker: 'Dental Legacy CR, San Vicente de Moravia. Show information', directions: 'Get directions', directionsAria: 'Get directions to Dental Legacy CR in Google Maps' }
      : { toggle: 'Alternar atribución del mapa', zoomIn: 'Acercar mapa', zoomOut: 'Alejar mapa', close: 'Cerrar información del mapa', windowsHelp: 'Mantén Ctrl y desplaza para ampliar el mapa', macHelp: 'Mantén ⌘ y desplaza para ampliar el mapa', mobileHelp: 'Usa dos dedos para mover el mapa', marker: 'Dental Legacy CR, San Vicente de Moravia. Mostrar información', directions: 'Cómo llegar', directionsAria: 'Cómo llegar a Dental Legacy CR en Google Maps' }
  };

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

  const initializeExperience = () => {
    if (experienceInitialized) return;
    experienceInitialized = true;
    window.DentalStory?.init();
    if ('IntersectionObserver' in window) window.DentalReels?.init();
    document.querySelectorAll('[data-story-link]').forEach((link) => link.addEventListener('click', (event) => {
      if (window.DentalStory?.goTo(link.dataset.storyLink)) {
        event.preventDefault();
        history.pushState(null, '', link.getAttribute('href'));
      }
    }));
    if (location.hash === '#filosofia') requestAnimationFrame(() => window.DentalStory?.goTo('beyond'));
  };

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
          : loadScript('assets/js/location-map.js?v=3');
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

  const languageGate = document.querySelector('[data-language-gate]');
  const languageContent = [...document.querySelectorAll('[data-language-content]')];
  const unlockLanguageContent = () => languageContent.forEach((element) => element.removeAttribute('inert'));
  const refreshStorySafely = () => {
    const scrollPosition = window.scrollY;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!window.ScrollTrigger) return;
      window.ScrollTrigger.refresh();
      if (Math.abs(window.scrollY - scrollPosition) > 1) {
        window.scrollTo({ top: scrollPosition, left: 0, behavior: 'auto' });
      }
      window.ScrollTrigger.update();
    }));
  };
  const updateStoryWithoutRefresh = () => {
    const scrollPosition = window.scrollY;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - scrollPosition) > 1) {
        window.scrollTo({ top: scrollPosition, left: 0, behavior: 'auto' });
      }
      window.ScrollTrigger?.update();
    }));
  };
  const finishLanguageGate = (moveFocus) => {
    languageGate.hidden = true;
    languageGate.classList.remove('is-closing');
    document.documentElement.classList.remove('language-gate-open', 'has-language-preference');
    unlockLanguageContent();
    refreshStorySafely();
    if (moveFocus) document.querySelector('.wordmark').focus({ preventScroll: true });
  };
  const selectLanguage = (language, fromGate = false) => {
    if (language !== 'es' && language !== 'en') return;
    storeLanguage(language);
    applyHomeLanguage(language);
    if (!fromGate) {
      updateStoryWithoutRefresh();
      return;
    }
    languageGate.classList.add('is-closing');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finishLanguageGate(true);
    else setTimeout(() => finishLanguageGate(true), 400);
  };

  document.querySelectorAll('[data-language-choice]').forEach((button) => {
    button.addEventListener('click', () => selectLanguage(button.dataset.languageChoice, true));
  });
  document.querySelectorAll('[data-language-switch]').forEach((button) => {
    button.addEventListener('click', () => selectLanguage(button.dataset.languageSwitch));
  });
  languageGate.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const options = [...languageGate.querySelectorAll('button:not([disabled])')];
    const first = options[0];
    const last = options[options.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const storedLanguage = readStoredLanguage();
  applyHomeLanguage(storedLanguage || 'es', false);
  initializeExperience();
  if (storedLanguage) finishLanguageGate(false);
  else {
    document.documentElement.classList.add('language-gate-open');
    requestAnimationFrame(() => languageGate.querySelector('button').focus());
  }
})();
