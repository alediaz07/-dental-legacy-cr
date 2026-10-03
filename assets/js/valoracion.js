(() => {
  'use strict';

  const form = document.querySelector('#valuation-form');
  const views = [...document.querySelectorAll('[data-view]')];
  const nameInput = document.querySelector('#patient-name');
  const reasonInputs = [...document.querySelectorAll('input[name="reason"]')];
  const dateInput = document.querySelector('#preferred-date');
  const timeInput = document.querySelector('#preferred-time');
  const commentInput = document.querySelector('#patient-comment');
  const progressLabel = document.querySelector('[data-progress-label]');
  const progressCount = document.querySelector('[data-progress-count]');
  const progressBar = document.querySelector('[data-progress-bar]');
  const dateValue = document.querySelector('[data-date-value]');
  const timeValue = document.querySelector('[data-time-value]');
  const timeTriggerLabel = document.querySelector('[data-time-trigger-label]');
  const timePicker = document.querySelector('[data-time-picker]');
  const timeWheels = Object.fromEntries([...document.querySelectorAll('[data-time-wheel]')]
    .map((wheel) => [wheel.dataset.timeWheel, wheel]));
  const timeTrigger = document.querySelector('[data-picker-trigger="time"]');
  const whatsappLink = document.querySelector('[data-whatsapp]');
  const languageGate = document.querySelector('[data-language-gate]');
  const gatedElements = [document.querySelector('.skip-link'), document.querySelector('.valuation-header'), document.querySelector('.valuation-main')];

  const translations = {
    es: {
      title: 'Agenda tu valoración | Dental Legacy CR',
      description: 'Solicita tu valoración en Dental Legacy CR. Indica el motivo de tu consulta, fecha y hora preferidas y envía tu solicitud directamente por WhatsApp.',
      skip: 'Saltar al formulario', backHome: 'Volver a Dental Legacy', progress: 'Progreso de la solicitud', start: 'Inicio', step: 'Paso', complete: 'Completo',
      introLead: 'Agenda tu', introEmphasis: 'valoración', introCopy: 'Cuéntanos brevemente qué necesitas.<br>Te tomará menos de un minuto.', begin: 'Comenzar',
      q1: '¿Cómo te llamas?', nameLabel: 'Tu nombre', namePlaceholder: 'Tu nombre', continue: 'Continuar',
      q2: '¿Qué te gustaría consultar?', reasonLegend: 'Selecciona el motivo de tu consulta', back: 'Atrás',
      reasons: { general: 'Valoración general', implantes: 'Implantes dentales', blanqueamiento: 'Estética / blanqueamiento', molestia: 'Tengo una molestia', otro: 'Otro motivo' },
      q3: '¿Qué tan pronto te gustaría visitarnos?', selectDate: 'Selecciona una fecha', dateNote: 'La fecha es una preferencia y está sujeta a coordinación con la clínica.',
      q4: '¿A qué hora te funciona mejor?', selectTime: 'Seleccionar hora', preferredTime: 'Hora preferida', timeFormat: 'Formato de 12 horas · a. m. / p. m.', enterPreferredTime: 'Digitar hora de preferencia', timePickerTitle: 'Selecciona tu hora de preferencia', timePickerAria: 'Selector de hora en formato de 12 horas', hour: 'Hora', minutes: 'Minutos', period: 'Período', useTime: 'Usar esta hora', timeNote: 'Selecciona tu preferencia en formato de 12 horas. La hora está sujeta a coordinación con la clínica.', am: 'a. m.', pm: 'p. m.',
      q5: '¿Hay algo que quieras contarnos?', optionalComment: 'Comentario opcional', commentPlaceholder: 'Escribe aquí si deseas agregar algún detalle...', reviewRequest: 'Revisar solicitud',
      request: 'Solicitud de valoración', ready: 'Todo listo.', reviewIntro: 'Revisa tu solicitud antes de enviarla.', requestSummary: 'Resumen de la solicitud', name: 'Nombre', consultation: 'Consulta', preferredDate: 'Fecha preferida', preferredTimeLabel: 'Hora preferida', comment: 'Comentario', generated: 'Solicitud generada desde Dental Legacy CR', sendWhatsapp: 'Enviar por WhatsApp', edit: 'Editar respuestas',
      errors: { name: 'Escribe tu nombre para continuar.', reason: 'Selecciona una opción para continuar.', date: 'Selecciona una fecha para continuar.', pastDate: 'Selecciona una fecha a partir de hoy.', time: 'Selecciona una hora para continuar.' },
      message: { hello: 'Hola, Dental Legacy CR.', intro: 'Quisiera solicitar una valoración.', title: 'SOLICITUD DE VALORACIÓN', name: 'Nombre', reason: 'Motivo', date: 'Fecha preferida', time: 'Hora preferida', comment: 'Comentario', sent: 'Enviado desde Dental Legacy CR' }
    },
    en: {
      title: 'Book your assessment | Dental Legacy CR',
      description: 'Request an assessment at Dental Legacy CR. Share the reason for your visit and your preferred date and time, then send your request through WhatsApp.',
      skip: 'Skip to the form', backHome: 'Back to Dental Legacy', progress: 'Request progress', start: 'Start', step: 'Step', complete: 'Complete',
      introLead: 'Book your', introEmphasis: 'assessment', introCopy: 'Tell us briefly what you need.<br>It will take less than a minute.', begin: 'Begin',
      q1: 'What is your name?', nameLabel: 'Your name', namePlaceholder: 'Your name', continue: 'Continue',
      q2: 'What would you like to discuss?', reasonLegend: 'Select the reason for your visit', back: 'Back',
      reasons: { general: 'General assessment', implantes: 'Dental implants', blanqueamiento: 'Aesthetics / whitening', molestia: 'I have discomfort', otro: 'Another reason' },
      q3: 'How soon would you like to visit us?', selectDate: 'Select a date', dateNote: 'The date is a preference and is subject to coordination with the clinic.',
      q4: 'What time works best for you?', selectTime: 'Select a time', preferredTime: 'Preferred time', timeFormat: '12-hour format · a.m. / p.m.', enterPreferredTime: 'Enter preferred time', timePickerTitle: 'Select your preferred time', timePickerAria: '12-hour time selector', hour: 'Hour', minutes: 'Minutes', period: 'Period', useTime: 'Use this time', timeNote: 'Select your preference in 12-hour format. The time is subject to coordination with the clinic.', am: 'a.m.', pm: 'p.m.',
      q5: 'Is there anything you would like to tell us?', optionalComment: 'Optional comment', commentPlaceholder: 'Add any details you would like us to know...', reviewRequest: 'Review request',
      request: 'Assessment request', ready: 'All set.', reviewIntro: 'Review your request before sending it.', requestSummary: 'Request summary', name: 'Name', consultation: 'Consultation', preferredDate: 'Preferred date', preferredTimeLabel: 'Preferred time', comment: 'Comment', generated: 'Request generated from Dental Legacy CR', sendWhatsapp: 'Send via WhatsApp', edit: 'Edit answers',
      errors: { name: 'Enter your name to continue.', reason: 'Select an option to continue.', date: 'Select a date to continue.', pastDate: 'Select today or a future date.', time: 'Select a time to continue.' },
      message: { hello: 'Hello, Dental Legacy CR.', intro: 'I would like to request an assessment.', title: 'ASSESSMENT REQUEST', name: 'Name', reason: 'Reason', date: 'Preferred date', time: 'Preferred time', comment: 'Comment', sent: 'Sent from Dental Legacy CR' }
    }
  };

  const state = {
    name: '',
    reason: '',
    date: '',
    time: '',
    comment: ''
  };

  let currentView = 'intro';
  let currentLanguage = 'es';
  const timeSelection = { hour: '1', minute: '00', period: 'AM' };

  const pad = (value) => String(value).padStart(2, '0');
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  dateInput.min = today;

  const reasonFromQuery = {
    valoracion: 'general',
    implantes: 'implantes',
    blanqueamiento: 'blanqueamiento'
  }[new URLSearchParams(window.location.search).get('motivo')];

  if (reasonFromQuery) {
    const matchingReason = reasonInputs.find((input) => input.value === reasonFromQuery);
    if (matchingReason) {
      matchingReason.checked = true;
      state.reason = matchingReason.value;
    }
  }

  const capitalize = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '';

  const formatDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return '';
    const calendarDate = new Date(year, month - 1, day);
    return capitalize(new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-CR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(calendarDate));
  };

  const formatTime = (value) => {
    const [hour, minute] = value.split(':').map(Number);
    if (!Number.isInteger(hour) || !Number.isInteger(minute)) return '';
    const clockTime = new Date(2000, 0, 1, hour, minute);
    return new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-CR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(clockTime);
  };

  const updateProgress = (viewName) => {
    const copy = translations[currentLanguage];
    const step = Number.parseInt(viewName, 10);
    if (viewName === 'review') {
      progressLabel.textContent = copy.complete;
      progressCount.textContent = '05 / 05';
      progressBar.style.transform = 'scaleX(1)';
      return;
    }
    if (Number.isInteger(step)) {
      progressLabel.textContent = `${copy.step} ${pad(step)}`;
      progressCount.textContent = `${pad(step)} / 05`;
      progressBar.style.transform = `scaleX(${step / 5})`;
      return;
    }
    progressLabel.textContent = copy.start;
    progressCount.textContent = '00 / 05';
    progressBar.style.transform = 'scaleX(0)';
  };

  const showView = (viewName) => {
    const nextView = views.find((view) => view.dataset.view === String(viewName));
    if (!nextView) return;

    views.forEach((view) => {
      view.classList.remove('is-active');
      view.hidden = true;
    });

    nextView.hidden = false;
    currentView = String(viewName);
    updateProgress(currentView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    requestAnimationFrame(() => {
      nextView.classList.add('is-active');
      const heading = nextView.querySelector('h1, h2');
      if (heading && currentView !== 'intro') heading.focus({ preventScroll: true });
    });
  };

  const setError = (step, message) => {
    const error = document.querySelector(`#error-${step}`);
    if (error) error.textContent = message;
  };

  const clearError = (step) => setError(step, '');

  const syncState = () => {
    state.name = nameInput.value.trim();
    state.reason = reasonInputs.find((input) => input.checked)?.value || '';
    state.date = dateInput.value;
    state.time = timeInput.value;
    state.comment = commentInput.value.trim();
  };

  const validateStep = (step) => {
    const errors = translations[currentLanguage].errors;
    syncState();
    clearError(step);

    if (step === 1 && !state.name) {
      setError(1, errors.name);
      nameInput.focus();
      return false;
    }
    if (step === 2 && !state.reason) {
      setError(2, errors.reason);
      reasonInputs[0].focus();
      return false;
    }
    if (step === 3 && (!state.date || state.date < today)) {
      setError(3, state.date ? errors.pastDate : errors.date);
      dateInput.focus();
      return false;
    }
    if (step === 4 && !state.time) {
      setError(4, errors.time);
      timeInput.focus();
      return false;
    }
    return true;
  };

  const updatePicker = (type) => {
    const copy = translations[currentLanguage];
    if (type === 'date') {
      state.date = dateInput.value;
      dateValue.textContent = state.date ? formatDate(state.date) : copy.selectDate;
      clearError(3);
    } else {
      state.time = timeInput.value;
      timeValue.textContent = state.time ? formatTime(state.time) : copy.selectTime;
      timeTriggerLabel.textContent = state.time ? copy.enterPreferredTime : copy.timeFormat;
      clearError(4);
    }
  };

  const timeOptions = {
    hour: Array.from({ length: 12 }, (_, index) => String(index + 1)),
    minute: Array.from({ length: 60 }, (_, index) => pad(index)),
    period: ['AM', 'PM']
  };

  const updateTimeWheel = (type, value, shouldScroll = false) => {
    timeSelection[type] = value;
    const wheel = timeWheels[type];
    const options = [...wheel.querySelectorAll('[data-time-option]')];
    const selectedOption = options.find((option) => option.dataset.timeOption === value);
    options.forEach((option) => option.setAttribute('aria-selected', String(option === selectedOption)));
    if (shouldScroll && selectedOption) {
      wheel.scrollTop = selectedOption.offsetTop - ((wheel.clientHeight - selectedOption.offsetHeight) / 2);
    }
  };

  const buildTimeWheels = () => {
    Object.entries(timeOptions).forEach(([type, options]) => {
      const wheel = timeWheels[type];
      let scrollFrame = 0;
      wheel.replaceChildren(...options.map((value) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'time-wheel-option';
        option.dataset.timeOption = value;
        option.setAttribute('aria-selected', String(value === timeSelection[type]));
        option.textContent = type === 'period'
          ? translations[currentLanguage][value === 'AM' ? 'am' : 'pm']
          : value;
        option.addEventListener('click', () => updateTimeWheel(type, value, true));
        return option;
      }));
      wheel.addEventListener('scroll', () => {
        if (scrollFrame) cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
          const wheelCenter = wheel.scrollTop + (wheel.clientHeight / 2);
          const closest = [...wheel.querySelectorAll('[data-time-option]')].reduce((best, option) => {
            const optionCenter = option.offsetTop + (option.offsetHeight / 2);
            return Math.abs(optionCenter - wheelCenter) < Math.abs(best.offsetTop + (best.offsetHeight / 2) - wheelCenter)
              ? option
              : best;
          });
          updateTimeWheel(type, closest.dataset.timeOption);
          scrollFrame = 0;
        });
      }, { passive: true });
    });
  };

  const populateTimePicker = () => {
    if (timeInput.value) {
      const [hourValue, minuteValue] = timeInput.value.split(':').map(Number);
      updateTimeWheel('hour', String(hourValue % 12 || 12));
      updateTimeWheel('minute', pad(minuteValue));
      updateTimeWheel('period', hourValue >= 12 ? 'PM' : 'AM');
    }
    Object.entries(timeSelection).forEach(([type, value]) => updateTimeWheel(type, value, true));
  };

  const setTimePickerOpen = (isOpen) => {
    timePicker.hidden = !isOpen;
    timeTrigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      populateTimePicker();
      timeWheels.hour.querySelector('[aria-selected="true"]').focus();
    }
  };

  const buildMessage = () => {
    const copy = translations[currentLanguage].message;
    const lines = [
      copy.hello,
      '',
      copy.intro,
      '',
      copy.title,
      '────────────────────',
      '',
      `${copy.name}: ${state.name}`,
      `${copy.reason}: ${translations[currentLanguage].reasons[state.reason]}`,
      `${copy.date}: ${formatDate(state.date)}`,
      `${copy.time}: ${formatTime(state.time)}`
    ];

    if (state.comment) lines.push('', `${copy.comment}:`, state.comment);

    lines.push('', '────────────────────', copy.sent);
    return lines.join('\n');
  };

  const renderReview = () => {
    syncState();
    document.querySelector('[data-review-name]').textContent = state.name;
    document.querySelector('[data-review-reason]').textContent = translations[currentLanguage].reasons[state.reason];
    document.querySelector('[data-review-date]').textContent = formatDate(state.date);
    document.querySelector('[data-review-time]').textContent = formatTime(state.time);

    const commentRow = document.querySelector('[data-review-comment-row]');
    commentRow.hidden = !state.comment;
    document.querySelector('[data-review-comment]').textContent = state.comment;

    whatsappLink.href = `https://wa.me/50687855335?text=${encodeURIComponent(buildMessage())}`;
  };

  const setLeadingText = (element, value) => {
    const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = `${value} `;
  };

  const applyLanguage = (language) => {
    currentLanguage = language;
    const copy = translations[language];
    document.documentElement.lang = language;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelector('meta[property="og:title"]').content = copy.title;
    document.querySelector('meta[property="og:description"]').content = language === 'en'
      ? 'Complete a short request and send it directly to Dental Legacy CR through WhatsApp.'
      : 'Completa una solicitud breve y envíala directamente a Dental Legacy CR por WhatsApp.';

    document.querySelector('.skip-link').textContent = copy.skip;
    setLeadingText(document.querySelector('.home-link'), copy.backHome);
    document.querySelector('.progress').setAttribute('aria-label', copy.progress);

    const introTitle = document.querySelector('#valuation-title');
    [...introTitle.childNodes].find((node) => node.nodeType === Node.TEXT_NODE).nodeValue = `${copy.introLead} `;
    introTitle.querySelector('em').textContent = copy.introEmphasis;
    document.querySelector('.intro-copy').innerHTML = copy.introCopy;
    setLeadingText(document.querySelector('[data-start]'), copy.begin);

    document.querySelector('#question-1').textContent = copy.q1;
    document.querySelector('label[for="patient-name"]').textContent = copy.nameLabel;
    nameInput.placeholder = copy.namePlaceholder;
    document.querySelector('#question-2').textContent = copy.q2;
    document.querySelector('.reason-options legend').textContent = copy.reasonLegend;
    Object.entries(copy.reasons).forEach(([reason, label]) => {
      document.querySelector(`input[name="reason"][value="${reason}"]+label span`).textContent = label;
    });
    document.querySelector('#question-3').textContent = copy.q3;
    document.querySelector('label[for="preferred-date"]').textContent = copy.selectDate;
    document.querySelector('#date-note').textContent = copy.dateNote;
    document.querySelector('#question-4').textContent = copy.q4;
    document.querySelector('label[for="preferred-time"]').textContent = copy.selectTime;
    timeInput.setAttribute('aria-label', copy.preferredTime);
    document.querySelector('.time-picker-title').textContent = copy.timePickerTitle;
    document.querySelector('.time-wheels').setAttribute('aria-label', copy.timePickerAria);
    timeWheels.hour.setAttribute('aria-label', copy.hour);
    timeWheels.minute.setAttribute('aria-label', copy.minutes);
    timeWheels.period.setAttribute('aria-label', copy.period);
    timeWheels.period.querySelector('[data-time-option="AM"]').textContent = copy.am;
    timeWheels.period.querySelector('[data-time-option="PM"]').textContent = copy.pm;
    setLeadingText(document.querySelector('[data-time-confirm]'), copy.useTime);
    document.querySelector('#time-note').textContent = copy.timeNote;
    document.querySelector('#question-5').textContent = copy.q5;
    document.querySelector('label[for="patient-comment"]').textContent = copy.optionalComment;
    commentInput.placeholder = copy.commentPlaceholder;

    document.querySelectorAll('[data-next]').forEach((button) => setLeadingText(button, copy.continue));
    document.querySelectorAll('[data-back]').forEach((button) => {
      const textNode = [...button.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.nodeValue = ` ${copy.back}`;
    });
    setLeadingText(document.querySelector('button[type="submit"]'), copy.reviewRequest);

    document.querySelector('.review-view>.eyebrow').textContent = copy.request;
    document.querySelector('#review-title').textContent = copy.ready;
    document.querySelector('.review-intro').textContent = copy.reviewIntro;
    document.querySelector('.request-ticket').setAttribute('aria-label', copy.requestSummary);
    document.querySelector('.ticket-heading span').textContent = copy.request;
    const ticketTerms = document.querySelectorAll('.ticket-details dt');
    [copy.name, copy.consultation, copy.preferredDate, copy.preferredTimeLabel, copy.comment]
      .forEach((label, index) => { ticketTerms[index].textContent = label; });
    document.querySelector('.ticket-footer').textContent = copy.generated;
    setLeadingText(whatsappLink, copy.sendWhatsapp);
    document.querySelector('[data-edit]').textContent = copy.edit;

    updatePicker('date');
    updatePicker('time');
    updateProgress(currentView);
  };

  const closeLanguageGate = (language) => {
    applyLanguage(language);
    gatedElements.forEach((element) => element.removeAttribute('inert'));
    document.body.classList.remove('language-open');
    languageGate.classList.add('is-closing');
    const finish = () => {
      languageGate.hidden = true;
      document.querySelector('[data-start]').focus();
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else setTimeout(finish, 380);
  };

  document.querySelector('[data-start]').addEventListener('click', () => showView('1'));

  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.next);
      if (validateStep(step)) showView(String(step + 1));
    });
  });

  document.querySelectorAll('[data-back]').forEach((button) => {
    button.addEventListener('click', () => {
      syncState();
      const step = Number(button.dataset.back);
      showView(String(step - 1));
    });
  });

  nameInput.addEventListener('input', () => clearError(1));
  reasonInputs.forEach((input) => input.addEventListener('change', () => {
    state.reason = input.value;
    clearError(2);
  }));
  dateInput.addEventListener('change', () => updatePicker('date'));
  timeInput.addEventListener('change', () => updatePicker('time'));

  document.querySelector('[data-time-confirm]').addEventListener('click', () => {
    const hour12 = Number(timeSelection.hour);
    const minute = Number(timeSelection.minute);
    const hour24 = timeSelection.period === 'PM' ? (hour12 % 12) + 12 : hour12 % 12;
    timeInput.value = `${pad(hour24)}:${pad(minute)}`;
    timeInput.dispatchEvent(new Event('change', { bubbles: true }));
    setTimePickerOpen(false);
    timeTrigger.focus();
  });

  document.querySelectorAll('[data-picker-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.pickerTrigger === 'time') {
        setTimePickerOpen(timePicker.hidden);
        return;
      }
      if (typeof dateInput.showPicker === 'function') dateInput.showPicker();
      else dateInput.click();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !timePicker.hidden) {
      setTimePickerOpen(false);
      timeTrigger.focus();
    }
  });

  buildTimeWheels();
  Object.entries(timeSelection).forEach(([type, value]) => updateTimeWheel(type, value, true));
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => closeLanguageGate(button.dataset.language));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const step = Number(currentView);
    if (step < 5) {
      if (validateStep(step)) showView(String(step + 1));
      return;
    }
    syncState();
    renderReview();
    showView('review');
  });

  document.querySelector('[data-edit]').addEventListener('click', () => showView('1'));
})();
