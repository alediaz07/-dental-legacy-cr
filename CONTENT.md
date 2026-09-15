# Contenido real pendiente

## Resultados (`index.html`, sección `#resultados`)

El estado publicado dice «Casos clínicos por incorporar». Los contornos son decoración, no resultados dentales. No hay fotografías clínicas pareadas confirmadas en los assets actuales.

Para publicar un caso:

1. Obtener autorización de publicación y dos fotos reales del mismo caso, con encuadre y dimensiones consistentes. No retocar resultados clínicos.
2. Guardar versiones optimizadas en `assets/results/`, por ejemplo `caso-01-antes.webp` y `caso-01-despues.webp`.
3. Copiar el contenido de `#clinical-case-template` al HTML en sustitución de `.result-placeholder`. No dejarlo dentro del template: así funciona sin JS.
4. Completar `src`, textos `alt` descriptivos, dimensiones reales y `figcaption` con tratamiento y contexto confirmados. No incorporar nombres sin autorización.
5. El script `assets/js/content.js` habilita el comparador sólo cuando ambas fotos cargan. El rango nativo admite teclado y touch. Sin JS se ven ambas imágenes lado a lado. Probar extremos 0/100, zoom y errores de imagen.
6. Ajustar el texto introductorio si procede. No prometer resultados generalizables.

## Testimonios (`#resultados`)

Dos espacios neutros están marcados `data-content-status="pending"`; no se presentan como reseñas. Para cada testimonio autorizado, copiar `#testimonial-template` al HTML y completar:

- `video src`, `poster` y dimensiones reales, en `assets/testimonials/`.
- `track src` con subtítulos WebVTT revisados y transcripción textual accesible.
- `[data-name]`: nombre autorizado.
- `[data-treatment]`: tratamiento confirmado.
- `[data-quote]`: extracto literal aprobado, sin alterar su sentido.

Sustituir los slots y el anuncio «Próximamente» sólo al disponer de contenido real. Mantener controles nativos y `preload="none"`; no reproducir automáticamente. Si se publican varios videos, integrarlos en la política de una sola reproducción y probarla con los reels existentes.

Los tres reels existentes no se han presentado como testimonios ni como antes/después. Sus subtítulos/transcripciones revisados siguen pendientes de material validado por la clínica.

## Conversión

Los enlaces `data-cta="whatsapp"` usan el número confirmado y el mensaje URL-encoded. Los enlaces telefónicos siguen disponibles. `content.js` emite `dental:cta` en `document`, con `detail.action` y `detail.placement`; no instala analytics ni envía datos. Para medir, conectar ese evento al proveedor autorizado. Mantener atributos de ubicación estables al editar.

## Publicación

Canonical, sitemap y robots apuntan a la URL existente de GitHub Pages. No se cambió el workflow: el push de `premium-v2` no despliega automáticamente porque el workflow escucha `main`. Publicar requiere una decisión posterior sobre despliegue, sin merge implícito.
