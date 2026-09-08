# Propuesta 05 — App React (dinámica)

Versión del sitio construida como aplicación React de una sola página (SPA), a partir de la propuesta-04. Visualmente es el mismo diseño (celeste, gris, azul, verde; Manrope + Source Sans 3), pero ahora todo el sitio corre como una app dinámica en el navegador.

## Cómo abrirla

Abrir `index.html` con doble clic. Funciona sin instalar Node, sin correr `npm install` ni ningún paso de compilación: React, ReactDOM y Babel se cargan desde internet (necesita conexión) y el código de la app (JSX incluido) se compila en el propio navegador al abrir la página. Copiar siempre la carpeta completa (incluida `assets/`).

Nota: como usa Babel en el navegador para compilar el JSX, la primera carga es un poco más lenta que la versión de archivos planos (propuesta-04). Para una versión de producción optimizada, lo recomendable sería pasar esto a un proyecto con paso de compilación (Vite/Next), pero para efectos de propuesta/demostración esta versión funciona igual de bien y sigue sin requerir instalación.

## Qué cambia frente a la propuesta-04 (estática)

Misma estructura de contenido (Inicio, Nosotros, Contacto) pero reconstruida con componentes de React y más interactividad:

- Navegación por "hash" (`#/inicio`, `#/nosotros`, `#/contacto`, `#/inicio/productos`, `#/inicio/sostenibilidad`) que actualiza la vista sin recargar la página, con transición suave (fundido) entre secciones.
- El encabezado se resalta automáticamente según la sección visible mientras se hace scroll (Inicio/Productos/Sostenibilidad), calculado en tiempo real.
- El encabezado se encoge sutilmente al hacer scroll hacia abajo.
- Nuevo botón flotante "volver arriba" que aparece después de bajar en la página.
- El contador "+50 años de operación" del inicio se anima contando desde 0 cuando aparece en pantalla.
- El formulario de contacto ahora valida en tiempo real mientras se escribe (no solo al enviar) y muestra un contador de caracteres en el mensaje.
- Los chequesitos interactivos de la sección de compromiso (clic para marcar/desmarcar) y el carrusel del hero se manejan igual que antes, pero ahora con estado de React en vez de manipular el DOM directamente.
- El año del pie de página (© ...) se calcula automáticamente con la fecha del sistema.

## Assets reutilizados

Mismo logotipo y fotografías reales (Valle de Jiboa, volcán de San Vicente) que la propuesta-04; el mapa de Contacto sigue siendo una ilustración estilizada, no a escala.

## Nota técnica

Para verificar que no había errores de sintaxis ni de ejecución antes de entregarla, el código se compiló y se renderizó de prueba en un entorno de Node (con las mismas versiones de React/Babel), navegando las 5 rutas del sitio sin errores, antes de guardar esta versión en la carpeta del proyecto.
