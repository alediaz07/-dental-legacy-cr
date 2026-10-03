(() => {
  'use strict';

  let initialized = false;
  let mapInstance = null;
  let mapErrorReported = false;

  function init() {
    if (initialized) return mapInstance;

    const container = document.getElementById('legacy-map');
    if (!container || !window.maplibregl) return null;

    // Dental Legacy CR, Centro Comercial MC, San Vicente de Moravia.
    const clinicCoordinates = [-84.0474428, 9.9629681];
    const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Dental+Legacy+CR%2C+Av.+65+59A%2C+Coragua%2C+San+Vicente+de+Moravia%2C+Costa+Rica';
    const languageCopy = () => window.DentalLanguage?.map?.() || {
      toggle: 'Alternar atribución del mapa', zoomIn: 'Acercar mapa', zoomOut: 'Alejar mapa', close: 'Cerrar información del mapa',
      windowsHelp: 'Mantén Ctrl y desplaza para ampliar el mapa', macHelp: 'Mantén ⌘ y desplaza para ampliar el mapa', mobileHelp: 'Usa dos dedos para mover el mapa',
      marker: 'Dental Legacy CR, San Vicente de Moravia. Mostrar información', directions: 'Cómo llegar', directionsAria: 'Cómo llegar a Dental Legacy CR en Google Maps'
    };
    const initialCopy = languageCopy();

    try {
      const map = new maplibregl.Map({
        container,
        style: 'https://tiles.openfreemap.org/styles/positron',
        center: clinicCoordinates,
        zoom: 16,
        minZoom: 13,
        maxZoom: 19,
        scrollZoom: false,
        cooperativeGestures: true,
        dragRotate: false,
        pitchWithRotate: false,
        locale: {
          'AttributionControl.ToggleAttribution': initialCopy.toggle,
          'NavigationControl.ZoomIn': initialCopy.zoomIn,
          'NavigationControl.ZoomOut': initialCopy.zoomOut,
          'Popup.Close': initialCopy.close,
          'CooperativeGesturesHandler.WindowsHelpText': initialCopy.windowsHelp,
          'CooperativeGesturesHandler.MacHelpText': initialCopy.macHelp,
          'CooperativeGesturesHandler.MobileHelpText': initialCopy.mobileHelp
        }
      });

      const scheduleMapResize = () => {
        window.requestAnimationFrame(() => {
          if (map.loaded()) map.resize();
        });
      };

      if ('ResizeObserver' in window) {
        const mapResizeObserver = new ResizeObserver(scheduleMapResize);
        mapResizeObserver.observe(container);
      } else {
        window.addEventListener('resize', scheduleMapResize, { passive: true });
      }

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      map.addControl(new maplibregl.AttributionControl({
        compact: false,
        customAttribution: '<a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · © <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
      }), 'bottom-right');

      map.on('error', (event) => {
        if (mapErrorReported) return;
        mapErrorReported = true;
        console.error('[Dental Legacy] MapLibre no pudo cargar un recurso del mapa.', event.error || event);
      });

      map.once('load', () => {
        map.resize();

        const markerElement = document.createElement('button');
        markerElement.type = 'button';
        markerElement.className = 'legacy-map-marker';
        markerElement.setAttribute('aria-label', initialCopy.marker);

        const popupContent = document.createElement('div');
        const title = document.createElement('p');
        title.className = 'legacy-map-popup-title';
        title.textContent = 'Dental Legacy CR';
        const address = document.createElement('p');
        address.className = 'legacy-map-popup-address';
        address.textContent = 'San Vicente de Moravia';
        const directions = document.createElement('a');
        directions.className = 'legacy-map-popup-link';
        directions.href = directionsUrl;
        directions.target = '_blank';
        directions.rel = 'noopener noreferrer';
        directions.textContent = initialCopy.directions;
        directions.setAttribute('aria-label', initialCopy.directionsAria);
        popupContent.append(title, address, directions);

        const popup = new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: false })
          .setDOMContent(popupContent);

        new maplibregl.Marker({ element: markerElement, anchor: 'center' })
          .setLngLat(clinicCoordinates)
          .setPopup(popup)
          .addTo(map);

        document.addEventListener('dental-language-change', () => {
          const copy = languageCopy();
          markerElement.setAttribute('aria-label', copy.marker);
          directions.textContent = copy.directions;
          directions.setAttribute('aria-label', copy.directionsAria);
          const zoomIn = container.querySelector('.maplibregl-ctrl-zoom-in');
          const zoomOut = container.querySelector('.maplibregl-ctrl-zoom-out');
          const attribution = container.querySelector('.maplibregl-ctrl-attrib-button');
          const closeButton = container.querySelector('.maplibregl-popup-close-button');
          if (zoomIn) { zoomIn.title = copy.zoomIn; zoomIn.setAttribute('aria-label', copy.zoomIn); }
          if (zoomOut) { zoomOut.title = copy.zoomOut; zoomOut.setAttribute('aria-label', copy.zoomOut); }
          if (attribution) { attribution.title = copy.toggle; attribution.setAttribute('aria-label', copy.toggle); }
          if (closeButton) closeButton.setAttribute('aria-label', copy.close);
        });
      });

      mapInstance = map;
      initialized = true;
      return mapInstance;
    } catch (error) {
      mapInstance = null;
      initialized = false;
      console.error('[Dental Legacy] No se pudo inicializar #legacy-map.', error);
      return null;
    }
  }

  window.DentalLocationMap = { init };
})();
