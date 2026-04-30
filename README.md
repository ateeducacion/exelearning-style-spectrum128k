# eXeLearning Spectrum 128K

Estilo retro para eXeLearning inspirado en el Sinclair ZX Spectrum 128K: franjas multicolor, paleta BRIGHT, tipografía pixel y efecto CRT opcional.

<a href="https://static.exelearning.dev/?url=https://github-proxy.exelearning.dev/?repo=ateeducacion/exelearning-style-spectrum128k&amp;branch=main" target="_blank" rel="noopener">▶ Abrir el ejemplo en eXeLearning</a> · <a href="https://github.com/ateeducacion/exelearning-style-spectrum128k/releases/latest/download/spectrum128k.zip" target="_blank" rel="noopener">↓ Descargar estilo (última release)</a>

Creado por el **Área de Tecnología Educativa** de la Consejería de Educación, Formación Profesional, Actividad Física y Deportes del Gobierno de Canarias.

Licencia del contenido propio del repositorio: [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Esto incluye el estilo Spectrum 128K, el ejemplo didáctico y las ilustraciones generadas. Los componentes de terceros mantienen sus licencias propias.

## Estructura

- **`theme/`** — el estilo Spectrum 128K (lo que se empaqueta como `spectrum128k.zip` en cada release).
- **Raíz** — ELPX descomprimido con el ejemplo *el ciclo del agua*, previsualizable con cualquier servidor estático (`python3 -m http.server`) y servido en directo por `github-proxy.exelearning.dev` al abrir el enlace de arriba.

## Panel de tweaks

El estilo expone un panel (botón de engranaje de la barra superior) con tres ajustes persistentes en `localStorage`:

- **franjas** — `128k` (diagonal, por defecto) · `48k` (vertical) · `mono`.
- **fuente pixel** — VT323 solo en titulares o en todo el texto.
- **scanlines CRT** — on/off.

## Créditos

Tipografías [VT323](https://fonts.google.com/specimen/VT323) y [JetBrains Mono](https://www.jetbrains.com/lp/mono/), ambas bajo SIL Open Font License 1.1. Comunidad de [eXeLearning](https://exelearning.net/), mantenida por el [CEDEC](https://cedec.intef.es/) y las distintas administraciones educativas del Estado.
