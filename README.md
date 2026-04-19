# eXeLearning Spectrum 128K

Estilo retro para eXeLearning inspirado en el Sinclair ZX Spectrum 128K: franjas multicolor, paleta BRIGHT, tipografía pixel y efecto CRT opcional.

<a href="https://static.exelearning.dev/?url=https://raw.githubusercontent.com/ateeducacion/exelearning-style-spectrum128k/main/sample/el-ciclo-del-agua-spectrum128k.elpx" target="_blank" rel="noopener">▶ Abrir el ejemplo en eXeLearning</a> · <a href="https://github.com/ateeducacion/exelearning-style-spectrum128k/releases/latest/download/spectrum128k.zip" target="_blank" rel="noopener">↓ Descargar estilo (última release)</a>

Creado por el **Área de Tecnología Educativa** de la Consejería de Educación, Formación Profesional, Actividad Física y Deportes del Gobierno de Canarias. Licencia CC BY-SA 4.0.

## Estructura

- **`theme/`** — el estilo Spectrum 128K (lo que se empaqueta como `spectrum128k.zip` en cada release).
- **`sample/el-ciclo-del-agua-spectrum128k.elpx`** — recurso de ejemplo sobre el ciclo del agua.
- **Raíz** — ELPX descomprimido, previsualizable con cualquier servidor estático (`python3 -m http.server`).

## Panel de tweaks

El estilo expone un panel (botón de engranaje de la barra superior) con tres ajustes persistentes en `localStorage`:

- **franjas** — `128k` (diagonal, por defecto) · `48k` (vertical) · `mono`.
- **fuente pixel** — VT323 solo en titulares o en todo el texto.
- **scanlines CRT** — on/off.

## Créditos

Tipografías [VT323](https://fonts.google.com/specimen/VT323) y [JetBrains Mono](https://www.jetbrains.com/lp/mono/), ambas bajo SIL Open Font License 1.1. Comunidad de [eXeLearning](https://exelearning.net/), mantenida por el [CEDEC](https://cedec.intef.es/) y las distintas administraciones educativas del Estado.
