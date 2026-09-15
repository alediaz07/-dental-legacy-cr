DENTAL LEGACY CR

Sitio estático HTML/CSS/JavaScript. Sin proceso de compilación.
Publicación: https://alediaz07.github.io/-dental-legacy-cr/

ESTRUCTURA
index.html: contenido semántico, navegación, cinco escenas, reels, servicios y contacto.
assets/css/styles.css: tokens, layout, capas, responsive y movimiento reducido.
assets/js/story.js: una timeline GSAP/ScrollTrigger sobre un escenario sticky compartido.
assets/js/reels.js: carga cercana al viewport, un video activo, controles y pausas.
assets/js/main.js: menú nativo dialog, enlaces de escenas y barra de progreso.
assets/brand/: identidad transparente proporcionada por el cliente.
assets/fonts/: Playfair Display y Manrope alojadas localmente; licencias OFL incluidas.
assets/vendor/: GSAP y ScrollTrigger 3.13.0; avisos de licencia conservados en los archivos.
assets/posters/: fotogramas de los videos originales.

RECURSOS TÉCNICOS
Las capas del implante son ventanas CSS de la infografía original. Las coordenadas están en crops, al comienzo de story.js. No son un modelo 3D ni especificaciones de un producto médico. El contexto anatómico procede de la segunda infografía.
Los tres videos originales se conservan íntegros. No se controlan con currentTime ni con scroll. El botón de sonido requiere una acción explícita. En movimiento reducido y ahorro de datos no hay reproducción automática.
Sin GSAP o con prefers-reduced-motion, el contenido se presenta en flujo normal con las referencias técnicas. Sin JavaScript, cada video tiene un enlace directo y los servicios permanecen operativos mediante details/summary.

CONTENIDO
Teléfono confirmado: +506 8785 5335.
Dirección: Centro Comercial MC, Coragua, San Vicente de Moravia, San José, Costa Rica.
Horario confirmado: lunes a viernes, 9:00 a. m. – 6:00 p. m.; sábados y domingos cerrado.
Servicios confirmados: implantes, blanqueamiento, valoración dental y turismo médico.
No se publican ratings, reseñas, profesionales ni servicios sin respaldo.
WhatsApp primario: https://wa.me/50687855335.
Resultados y testimonios: consultar CONTENT.md para sustituir espacios pendientes con material real.
Implantes y blanqueamiento están documentados en los videos proporcionados.
El mapa realiza una búsqueda por el nombre y dirección; no se inventan coordenadas.

ACTUALIZACIÓN
Para sustituir un reel, reemplazar assets/reel-01.mp4, reel-02.mp4 o reel-03.mp4 y actualizar su poster, título, duración visible si se añade y dimensiones reales.
Si cambia el dominio, actualizar canonical, metadatos sociales, schema, robots.txt y sitemap.xml.
El workflow existente de GitHub Pages continúa publicando la raíz al actualizar main.

VERIFICACIÓN
Comprobar foco, navegación, menú, servicios, reproducción/sonido, pausa fuera de pantalla, cambios de orientación y movimiento reducido. Viewports previstos: 360x800, 375x812, 390x844, 430x932, 768x1024, 834x1194, 1024x1366, 1440x900 y 1920x1080. No confundir emulación con pruebas en dispositivos Safari/iOS/Android reales.
