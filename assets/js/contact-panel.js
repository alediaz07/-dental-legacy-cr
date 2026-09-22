(() => {
  'use strict';

  const dialog = document.getElementById('contact-panel');
  if (!dialog) return;

  const title = dialog.querySelector('#contact-panel-title');
  const intro = dialog.querySelector('#contact-panel-intro');
  const content = dialog.querySelector('#contact-panel-content');
  const closeButton = dialog.querySelector('.contact-panel-close');
  const phoneNumber = '50687855335';
  const clinicPhone = '+50687855335';
  const mapsUrl = document.querySelector('.location-directions')?.href || '#ubicacion';
  let opener = null;
  let closeTimer = null;

  const services = {
    valoracion: {
      title: 'Agenda tu valoración',
      intro: 'Coordina una valoración con Dental Legacy.',
      reason: 'Valoración dental'
    },
    implantes: {
      title: 'Consulta sobre implantes dentales',
      intro: 'Consulta con la clínica sobre opciones de implantes dentales para tu caso.',
      reason: 'Implantes dentales'
    },
    blanqueamiento: {
      title: 'Consulta sobre blanqueamiento dental',
      intro: 'Consulta sobre el proceso y disponibilidad para blanqueamiento dental.',
      reason: 'Blanqueamiento dental'
    },
    general: {
      title: 'Consulta general',
      intro: 'Escríbenos si deseas orientación sobre tu atención dental.',
      reason: 'Consulta general'
    }
  };

  const options = [
    ['appointment', 'Valoración dental', 'Coordina una valoración con Dental Legacy.'],
    ['implantes', 'Implantes dentales', 'Consulta opciones de implantes dentales para tu caso.'],
    ['blanqueamiento', 'Blanqueamiento dental', 'Consulta sobre el proceso y disponibilidad.'],
    ['general', 'Consulta general', 'Escríbenos si deseas orientación sobre tu atención dental.'],
    ['location', 'Cómo llegar', 'Consulta nuestra ubicación en San Vicente de Moravia.'],
    ['call', 'Llamar a la clínica', 'Comunícate directamente con Dental Legacy.']
  ];

  function focusTitle() {
    requestAnimationFrame(() => title.focus({ preventScroll: true }));
  }

  function localDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatSpanishDate(value, includeYear = false) {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12);
    const parts = new Intl.DateTimeFormat('es-CR', {
      weekday: 'long', day: 'numeric', month: 'long', ...(includeYear ? { year: 'numeric' } : {})
    }).formatToParts(date);
    const get = (type) => parts.find((part) => part.type === type)?.value || '';
    return `${get('weekday')} ${get('day')} de ${get('month')}${includeYear ? ` de ${get('year')}` : ''}`;
  }

  function formatTime(value) {
    const [hour, minute] = value.split(':').map(Number);
    const suffix = hour < 12 ? 'a. m.' : 'p. m.';
    return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${suffix}`;
  }

  function renderHub() {
    title.textContent = '¿Cómo podemos ayudarte?';
    intro.textContent = '';
    content.innerHTML = `<div class="contact-options">${options.slice(0, 4).map(([key, label, description]) => `
      <button class="contact-option" type="button" data-contact-choice="${key}">
        <span><strong>${label}</strong><small>${description}</small></span>
        <span class="contact-option-arrow" aria-hidden="true"></span>
      </button>`).join('')}
    </div>
    <p class="contact-option-group-label">Ubicación y contacto</p>
    <div class="contact-options">${options.slice(4).map(([key, label, description]) => `
      <button class="contact-option" type="button" data-contact-choice="${key}">
        <span><strong>${label}</strong><small>${description}</small></span>
        <span class="contact-option-arrow" aria-hidden="true"></span>
      </button>`).join('')}
    </div>`;
    focusTitle();
  }

  function renderForm(serviceKey) {
    const service = services[serviceKey] || services.general;
    title.textContent = service.title;
    intro.textContent = service.intro;
    content.innerHTML = `
      <button class="contact-panel-back contact-panel-back-top" type="button" data-contact-back="hub">← Volver</button>
      <form class="contact-form" novalidate>
        <label class="contact-field">Nombre
          <input name="name" type="text" autocomplete="name" required maxlength="80" aria-describedby="contact-form-error">
        </label>
        <label class="contact-field">Motivo
          <select name="reason" required aria-describedby="contact-form-error">
            <option value="">Selecciona un motivo</option>
            <option value="Valoración dental">Valoración dental</option>
            <option value="Implantes dentales">Implantes dentales</option>
            <option value="Blanqueamiento dental">Blanqueamiento dental</option>
            <option value="Consulta general">Consulta general</option>
          </select>
        </label>
        <div class="contact-field">
          <label class="contact-field-label" for="contact-preferred-date">Preferencia de día <span>(opcional)</span></label>
          <span class="contact-date-control">
            <input class="contact-date-input" id="contact-preferred-date" name="day" type="date" aria-describedby="contact-form-error">
            <span class="contact-date-display" aria-hidden="true">Seleccionar fecha</span>
            <svg class="contact-field-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="16" rx="1"/><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17"/></svg>
          </span>
        </div>
        <div class="contact-field">
          <label class="contact-field-label" for="contact-preferred-time">Preferencia de horario <span>(opcional)</span></label>
          <span class="contact-time-control">
            <input class="contact-time-input" id="contact-preferred-time" name="time" type="time" min="09:00" max="17:30" step="1800" aria-describedby="contact-form-error">
            <span class="contact-time-display" aria-hidden="true">Seleccionar hora</span>
            <svg class="contact-field-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>
          </span>
        </div>
        <label class="contact-field">Mensaje o comentario <span>(opcional)</span>
          <textarea name="comment" rows="3" maxlength="300"></textarea>
        </label>
        <p class="contact-form-error" id="contact-form-error" aria-live="polite"></p>
        <button class="contact-whatsapp-button" type="submit">Enviar por WhatsApp <span aria-hidden="true"></span></button>
      </form>`;
    const form = content.querySelector('.contact-form');
    form.elements.reason.value = service.reason;
    const dateInput = form.elements.day;
    const dateDisplay = content.querySelector('.contact-date-display');
    dateInput.min = localDateISO();
    dateInput.addEventListener('focus', () => { dateInput.min = localDateISO(); });
    dateInput.addEventListener('change', () => {
      dateDisplay.textContent = dateInput.value ? formatSpanishDate(dateInput.value) : 'Seleccionar fecha';
    });

    const timeInput = form.elements.time;
    const timeDisplay = content.querySelector('.contact-time-display');
    const updateTimeDisplay = () => {
      timeDisplay.textContent = timeInput.value ? formatTime(timeInput.value) : 'Seleccionar hora';
    };
    timeInput.addEventListener('input', updateTimeDisplay);
    timeInput.addEventListener('change', updateTimeDisplay);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = form.elements.name;
      const reasonInput = form.elements.reason;
      const error = form.querySelector('.contact-form-error');
      if (!nameInput.value.trim()) {
        error.textContent = 'Escribe tu nombre para continuar.';
        nameInput.focus();
        return;
      }
      if (!reasonInput.value) {
        error.textContent = 'Selecciona el motivo de tu consulta.';
        reasonInput.focus();
        return;
      }
      if (dateInput.value && dateInput.value < dateInput.min) {
        error.textContent = 'Selecciona hoy o una fecha posterior.';
        dateInput.focus();
        return;
      }
      error.textContent = '';
      openWhatsApp(new FormData(form));
    });
    focusTitle();
  }

  function buildWhatsAppMessage(formData) {
    const name = String(formData.get('name') || '').trim();
    const reason = String(formData.get('reason') || '').trim();
    const day = String(formData.get('day') || '').trim();
    const time = String(formData.get('time') || '').trim();
    const comment = String(formData.get('comment') || '').trim();
    const lines = ['Hola, Dental Legacy CR.', '', `Mi nombre es ${name}.`, '', 'Me gustaría consultar sobre:', `${reason}.`];
    if (day) lines.push('', 'Preferencia de fecha:', `${formatSpanishDate(day, true)}.`);
    if (time) lines.push('', 'Hora preferida:', `${formatTime(time)}.`);
    if (comment) lines.push('', 'Comentario:', comment);
    lines.push('', 'Gracias.');
    return lines.join('\n');
  }

  function openWhatsApp(formData) {
    const message = encodeURIComponent(buildWhatsAppMessage(formData));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  }

  function renderLocation() {
    title.textContent = 'Ubicación y cómo llegar';
    intro.textContent = 'Estamos en San Vicente de Moravia.';
    content.innerHTML = `
      <div class="contact-location-view">
        <p class="contact-clinic-name">Dental Legacy CR</p>
        <address>Centro Comercial MC, Coragua<br>San Vicente de Moravia<br>San José, Costa Rica</address>
        <a class="contact-panel-primary" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
        <a class="contact-panel-back contact-site-location" href="#ubicacion">Ver ubicación en el sitio</a>
        <button class="contact-panel-back" type="button" data-contact-back="hub">Volver a opciones</button>
      </div>`;
  }

  function renderCall() {
    title.textContent = 'Llamar a Dental Legacy CR';
    intro.textContent = 'Comunícate directamente con la clínica.';
    content.innerHTML = `
      <div class="contact-call-view">
        <a class="contact-call-link" href="tel:${clinicPhone}" aria-label="Llamar a Dental Legacy CR">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>+506 8785 5335</span>
        </a>
        <button class="contact-panel-back" type="button" data-contact-back="hub">Volver a opciones</button>
      </div>`;
  }

  function openContactPanel(context = {}) {
    opener = context.trigger || document.activeElement;
    dialog.classList.remove('is-closing', 'is-visible');
    if (closeTimer) window.clearTimeout(closeTimer);

    const servicePanelEntry = context.trigger?.classList.contains('service-panel');
    if (context.type === 'hub' || (context.type === 'appointment' && !servicePanelEntry)) renderHub();
    else renderForm(context.service || 'valoracion');

    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add('is-visible'));
  }

  function closeContactPanel() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.remove('is-visible');
    dialog.classList.add('is-closing');
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 340;
    closeTimer = window.setTimeout(() => {
      if (dialog.open) dialog.close();
      dialog.classList.remove('is-closing');
      closeTimer = null;
    }, delay);
  }

  document.querySelectorAll('[data-contact-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openContactPanel({
        trigger,
        type: trigger.dataset.contactType,
        service: trigger.dataset.service
      });
    });
  });

  closeButton.addEventListener('click', closeContactPanel);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeContactPanel();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeContactPanel();
    const choice = event.target.closest('[data-contact-choice]');
    if (choice) {
      const selected = choice.dataset.contactChoice;
      if (selected === 'location') renderLocation();
      else if (selected === 'call') renderCall();
      else renderForm(selected === 'appointment' ? 'valoracion' : selected);
      return;
    }
    const back = event.target.closest('[data-contact-back="hub"]');
    if (back) renderHub();
    const siteLocation = event.target.closest('.contact-site-location');
    if (siteLocation) {
      event.preventDefault();
      closeContactPanel();
      window.setTimeout(() => { window.location.hash = 'ubicacion'; }, 340);
    }
  });
  dialog.addEventListener('close', () => {
    dialog.classList.remove('is-visible', 'is-closing');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
})();
