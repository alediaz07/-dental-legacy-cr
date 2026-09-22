(() => {
  const container = document.getElementById('legacy-map');
  if (!container || !window.maplibregl) return;

  // Public location: Avenida 65 / Calle 59A, Coragua, San Vicente de Moravia.
  const clinicCoordinates = [-84.0559, 9.9633];
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Dental+Legacy+CR%2C+Av.+65+59A%2C+Coragua%2C+San+Vicente+de+Moravia%2C+Costa+Rica';

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
      'AttributionControl.ToggleAttribution': 'Alternar atribución del mapa',
      'NavigationControl.ZoomIn': 'Acercar mapa',
      'NavigationControl.ZoomOut': 'Alejar mapa',
      'Popup.Close': 'Cerrar información del mapa',
      'CooperativeGesturesHandler.WindowsHelpText': 'Mantén Ctrl y desplaza para ampliar el mapa',
      'CooperativeGesturesHandler.MacHelpText': 'Mantén ⌘ y desplaza para ampliar el mapa',
      'CooperativeGesturesHandler.MobileHelpText': 'Usa dos dedos para mover el mapa'
    }
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  map.addControl(new maplibregl.AttributionControl({
    compact: false,
    customAttribution: '<a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · © <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
  }), 'bottom-right');

  map.once('load', () => {
    const markerElement = document.createElement('button');
    markerElement.type = 'button';
    markerElement.className = 'legacy-map-marker';
    markerElement.setAttribute('aria-label', 'Dental Legacy CR, San Vicente de Moravia. Mostrar información');

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
    directions.textContent = 'Cómo llegar';
    directions.setAttribute('aria-label', 'Cómo llegar a Dental Legacy CR en Google Maps');
    popupContent.append(title, address, directions);

    const popup = new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: false })
      .setDOMContent(popupContent);

    new maplibregl.Marker({ element: markerElement, anchor: 'center' })
      .setLngLat(clinicCoordinates)
      .setPopup(popup)
      .addTo(map);
  });
})();
