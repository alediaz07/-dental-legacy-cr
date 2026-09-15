# QA — fase final premium-v2

Fecha: 2026-09-15. Base: `b1b3939`. Sitio estático, sin build.

## Cobertura

| Viewport | Chromium | WebKit |
| --- | --- | --- |
| 360×800 | Pasa | Pasa |
| 375×812 | Pasa | Pasa |
| 390×844 | Pasa | Pasa |
| 430×932 | Pasa | Pasa |
| 768×1024 | Pasa | Pasa |
| 834×1194 | Pasa | Pasa |
| 1024×1366 | Pasa | Pasa |
| 1440×900 | Pasa | Pasa |
| 1920×1080 | Pasa | Pasa |

«Pasa»: recorrido por inicio, reels, servicios, clínica, resultados, turismo, ubicación y contacto sin overflow horizontal ni excepciones JavaScript; anclas válidas y menú/cierre/restauración de foco en los tamaños que lo muestran. WebKit es una ejecución Linux, no Safari en dispositivos físicos.

- Axe (WCAG 2 A/AA y 2.1 AA): cero infracciones detectadas en 390×844 y 1440×900, en ambos motores. No equivale a una certificación WCAG; subtítulos/transcripciones revisados de los reels siguen pendientes.
- Interacciones Chromium: skip link, foco modal, Escape, retorno al botón, servicios con teclado y apertura exclusiva, evento `dental:cta`, CTA oculto con `inert`, giro 390×844 ↔ 844×390: pasan.
- Comparación: fixture temporal con assets de marca en el DOM de prueba, sin publicación como caso clínico; activación tras cargar ambas imágenes y teclas Home/End 0–100: pasan. El HTML sin JS conserva ambas imágenes en columnas.
- Reels reales Chromium: reproducción efectiva, máximo un video activo, pausa fuera del viewport: pasan.
- Sin JS, reduced motion y Save-Data: sin overflow; no se asigna `src` a los reels automáticamente. Los enlaces directos sin JS se conservan.
- Sintaxis: `node --check` para los cuatro scripts propios; `git diff --check`: pasan.
- Auditoría estática: IDs únicos, anclas existentes, assets locales existentes, nueve WhatsApp correctos con mensaje decodificado exacto, Dentist JSON-LD y sitemap XML válidos.
- Inspección de capturas: hero, composición general, resultados y turismo en móvil/escritorio.

## Carga inicial local

Una muestra por versión, Chromium 390×844, sin throttling; baseline servido desde Git y versión actual desde disco. Mediciones orientativas, sin inferir mejoras de campo.

| Medida | Base | Actual |
| --- | --- | --- |
| Recursos (sin documento HTML) | 17 | 18 |
| Bytes de recursos | 1,196,622 | 1,204,930 |
| LCP local | 416 ms | 256 ms |
| CLS local | 0.00060 | 0.00061 |
| Fuentes de video asignadas al entrar | 0 | 0 |

La diferencia de recursos es +8,308 bytes; el HTML también crece para alojar contenido y templates. No se añaden dependencias de producción, fuentes, videos ni imágenes. Se mantienen GSAP local, WebP, lazy loading y fuentes locales.

## Límites y pendientes

- El mapa externo se bloqueó deliberadamente en el QA automatizado de layout. Su disponibilidad real y el destino final de redes/WhatsApp no se certificaron; las URLs se contrastaron con los datos facilitados.
- Las pruebas de layout aislaron descargas MP4; la reproducción se verificó por separado con los videos reales en Chromium.
- Verificar en iPhone/iPad físicos: barras dinámicas de Safari, notch/safe areas, cambio de aplicación a WhatsApp y reproducción con interacción real. No hay hardware físico en este entorno.
- No se ejecutó Lighthouse ni medición de campo; no se promete una puntuación o ausencia absoluta de regresiones.
- Material real y autorizaciones de publicación: `CONTENT.md`.
- El workflow sigue escuchando `main`; push a `premium-v2` no implica despliegue automático.

## Archivos de entrega

`index.html`, `assets/css/styles.css`, `assets/js/main.js`, `assets/js/story.js`, `assets/js/reels.js`, `assets/js/content.js`, `sitemap.xml`, `README.txt`, `CONTENT.md`, `QA.md`.
