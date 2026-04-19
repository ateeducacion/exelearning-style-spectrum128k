# eXeLearning Spectrum 128K

Estilo retro para eXeLearning inspirado en la estética del Sinclair ZX Spectrum 128K: franjas multicolor, paleta BRIGHT, tipografía pixel y un sutil efecto CRT.

Creado por el **Área de Tecnología Educativa** de la Consejería de Educación, FP y Actividad Física del Gobierno de Canarias.

Licencia: Creative Commons BY-SA 4.0.

## Estructura del repositorio

Este repositorio contiene el ELPX descomprimido del recurso de ejemplo, de modo que puedas previsualizarlo directamente en el navegador abriendo `index.html`. La carpeta `theme/` contiene el estilo completo; es lo que se empaqueta como `spectrum128k.zip` en cada release.

```
/
├── index.html                 # Página inicial del recurso de ejemplo
├── html/                      # Resto de páginas del recurso
├── content.xml                # Proyecto eXeLearning reimportable (ODE 2.0)
├── content.dtd
├── content/                   # Recursos (CSS, imágenes…)
├── idevices/                  # Assets de cada iDevice usado
├── libs/                      # Librerías compartidas de eXeLearning
├── search_index.js            # Índice para la caja de búsqueda
├── theme/                     # ← El estilo Spectrum 128K
│   ├── config.xml
│   ├── style.css
│   ├── style.js
│   ├── fonts/                 # VT323 + JetBrains Mono
│   ├── icons/                 # Iconos de iDevice en pixel art
│   └── img/
├── sample/
│   └── el-ciclo-del-agua-spectrum128k.elpx   # Recurso de ejemplo listo para importar
└── README.md
```

## Cómo previsualizar

Clona el repositorio y abre `index.html` con un servidor local (el `file://` tiene restricciones):

```bash
git clone https://github.com/ateeducacion/exelearning-style-spectrum128k.git
cd exelearning-style-spectrum128k
python3 -m http.server 8000
```

Abre `http://localhost:8000/` en el navegador.

También puedes cargar el recurso directamente desde GitHub con el visor de eXeLearning:

```
https://static.exelearning.dev/?url=https://raw.githubusercontent.com/ateeducacion/exelearning-style-spectrum128k/main/sample/el-ciclo-del-agua-spectrum128k.elpx
```

## Cómo instalar el estilo en eXeLearning

1. Descarga `spectrum128k.zip` desde la última release.
2. En eXeLearning, abre *Utilidades → Importar estilo* y selecciona el zip.
3. En tu proyecto, selecciona *Spectrum 128K* en el selector de estilo.

## Personalización vía panel de tweaks

El estilo expone un panel de ajustes (botón del engranaje 🪛 en la barra superior) con estas opciones:

| Ajuste              | Valores                        | Descripción                                         |
| ------------------- | ------------------------------ | --------------------------------------------------- |
| **scanlines crt**   | `on` / `off`                   | Superposición de líneas horizontales tipo monitor CRT. |
| **franjas**         | `128k` / `48k` / `mono`        | Preset de franjas multicolor (diagonal por defecto). |
| **fuente pixel**    | `solo titulares` / `todo el texto` | Aplica VT323 solo a la chrome o también al cuerpo. |

Las preferencias se guardan en `localStorage` y persisten entre recargas.

## Créditos

- Tipografía [VT323](https://fonts.google.com/specimen/VT323), por Peter Hull (SIL Open Font License 1.1).
- Tipografía [JetBrains Mono](https://www.jetbrains.com/lp/mono/), por JetBrains (SIL Open Font License 1.1).
- [eXeLearning](https://exelearning.net/), herramienta de autoría libre mantenida por el [CEDEC](https://cedec.intef.es/) y por las distintas administraciones educativas del Estado.
