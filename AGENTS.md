# AGENTS.md — `exelearning-style-spectrum128k`

Context and operating notes for future coding agents (Claude Code, Codex, etc.) that pick up work on this repository.

## 1. What this repository is

Two things coexist in the same repo, by design:

1. **The Spectrum 128K style** for eXeLearning, living in `theme/`. This is what gets zipped on every release and uploaded as `spectrum128k.zip`, which the user can import from the eXeLearning app (*Utilidades → Importar estilo*).
2. **An example unit** about *el ciclo del agua*, in the form of an **ELPX extracted at the repository root** (`index.html`, `content.xml`, `html/`, `idevices/`, `libs/`, `content/`, `search_index.js`). Serving this root with any static HTTP server is enough to preview the style in action.
   - The packaged counterpart is `sample/el-ciclo-del-agua-spectrum128k.elpx`, so the link `https://static.exelearning.dev/?url=<raw-github>/sample/…elpx` can load it directly in the live eXeLearning viewer.

## 2. Repository layout

```
/
├── theme/                       ← canonical source of truth for the style
│   ├── config.xml
│   ├── style.css                ← main stylesheet (see §5)
│   ├── style.js                 ← dark-mode + tweaks panel
│   ├── screenshot.png
│   ├── fonts/                   ← VT323 + JetBrains Mono (self-hosted)
│   ├── icons/                   ← pixel-art iDevice icons (SVG, 16×16 grid)
│   └── img/                     ← licenses.gif, home.png, icons.png sprite
├── sample/
│   └── el-ciclo-del-agua-spectrum128k.elpx
├── imagenes-generadas/          ← source PNG illustrations (1–11)
├── content/, html/, idevices/,
│   libs/, content.xml, ...      ← unzipped ELPX for static browser preview
├── LICENSE                      ← CC0 for repo infrastructure
├── README.md                    ← user-facing README (short)
└── AGENTS.md                    ← this file
```

`theme/*` is the only thing that ends up in the distributable zip. Everything else exists to support preview and example.

## 3. How the theme is wired to eXeLearning

eXeLearning reads themes from `public/files/perm/themes/base/<name>/`. During local development:

```
eXe repo   public/files/perm/themes/base/spectrum128k
              ⇣ symlink
style repo theme/
```

Because `theme/` here is the canonical source, editing `style.css`, `style.js` or any icon in the style repo is reflected in the eXe app immediately (`make up-local`) and in the previewable ELPX at the repo root (via browser reload).

**Creating the symlink after cloning (developer setup):**

```bash
ln -s "$PWD/theme" \
  /path/to/exelearning/public/files/perm/themes/base/spectrum128k
```

The real files stay in this style repo; eXeLearning just follows the symlink. **Never commit a symlink into eXeLearning's repo**; that decouples the style version from the style repo.

## 4. How eXeLearning looks for a theme

Minimum contract (enforced by `src/shared/parsers/theme-parser.ts` in the eXe repo):

| File / folder           | Required | Purpose                                                       |
| ----------------------- | -------- | ------------------------------------------------------------- |
| `theme/config.xml`      | yes      | Name, title, version, author, license, description, `<downloadable>1</downloadable>`. |
| `theme/style.css`       | yes      | Stylesheet. Must target eXeLearning's DOM classes (`.exe-content`, `.box`, `.box-head`, `.box-content`, `.exe-web-site`, `#siteNav`, `#siteBreadcrumbs`, `.nav-buttons`, `.page-counter`, …). |
| `theme/style.js`        | optional | jQuery script that runs on the exported page. Typical use: wire the `#darkModeToggler`, build breadcrumbs, insert togglers. |
| `theme/screenshot.png`  | yes      | Preview shown in the theme picker. ~800×500 px works. |
| `theme/icons/*.svg`     | optional | iDevice block icons. File name without extension is what goes in `<iconName>`. |
| `theme/img/icons.png`   | optional | Sprite used for toggler/nav buttons (menu, search, dark-mode, box-toggle, accordion arrow). The spectrum128k theme largely replaces this with inline SVG data URIs; keep the PNG as a fallback. |
| `theme/img/home.png`    | optional | Icon for the breadcrumb root link. |
| `theme/img/licenses.gif`| optional | Sprite with the CC license badges. |
| `theme/fonts/*`         | optional | Self-hosted font files (`.woff2` preferred). |

A theme is discovered automatically when the folder lives at `public/files/perm/themes/base/<name>/` and `config.xml` is parseable.

## 5. What the Spectrum 128K style does

Highlights that should be preserved by any refactor:

- **Rainbow border stripes** on every surface (page top, page header underline, box header ribbon, top bar underline) driven by the CSS custom property `--stripe-gradient`. Three presets toggled by body classes: default = 128K (repeating diagonal), `body.spectrum-stripes-48k` (horizontal 4-colour), `body.spectrum-stripes-mono` (greys).
- **Paper ⇄ Dark mode** via `html.exe-dark-mode` (toggled by `#darkModeToggler`). Dark mode adds a subtle CRT vignette when scanlines are on.
- **Scanlines CRT overlay** independent of dark mode, controlled by `body.spectrum-scanlines` (default on).
- **Pixel font scope** controlled by `body.spectrum-pixel-all` (chrome-only by default, or body-wide when the tweak is on).
- **Tweaks panel** (`#spectrumTweaks`) built at runtime by `style.js` with state persisted in `localStorage.exeSpectrumTweaks`. The gear toggler lives at the far right of the top bar in site mode, or inside `.package-header` in single-page mode.
- **Top-bar togglers** render as coloured "cassette keys" (menu = yellow, search = cyan, dark-mode = yellow with sun→moon swap, tweaks = magenta) with 2 px black border and a 2 px black drop shadow that collapses on `:active`.
- **Box headers** use `.box-head::after` as a 60 px rainbow ribbon with `var(--stripe-gradient)`. Icons float left, boxed on a black background.
- **Prev/Next cassette arrows**: on desktop (≥ 768 px) the `.nav-buttons` become text-and-chevron buttons (`◀ anterior` / `siguiente ▶`). On mobile the icons.png sprite kicks in.

CSS variables (top of `style.css`):

```
--sp-*          Spectrum BRIGHT palette, 8 colours.
--bg / --ink / --border / --link / --accent / --accent-2   Semantic roles.
--font-pixel    VT323 family stack.
--font-mono     JetBrains Mono family stack.
--stripe-h      Stripe height (default 6 px).
--stripe-gradient  Base gradient; body classes override it for presets.
```

## 6. The example unit and the builder script

The sample ELPX at `sample/el-ciclo-del-agua-spectrum128k.elpx` is generated from a Python script kept out of the repo on purpose (it references the eXe repo's CLI). The working copy lives at `/tmp/build_water_cycle.py`.

Pipeline to regenerate it:

```bash
# 1. Build the .elp source
python3 /tmp/build_water_cycle.py           # → /tmp/water-cycle.elp

# 2. Export to .elpx using eXeLearning's CLI and the spectrum theme
make -C /path/to/exelearning export-elpx \
  FORMAT=elpx \
  INPUT=/tmp/water-cycle.elp \
  OUTPUT=/tmp/water-cycle.elpx \
  THEME=spectrum128k                         # → /tmp/water-cycle.elpx

# 3. Refresh the workspace (keep theme/, sample/, imagenes-generadas/)
cd /Users/ernesto/Downloads/git/exelearning-style-spectrum128k
rm -rf content content.dtd content.xml html idevices index.html libs search_index.js
unzip -q -o /tmp/water-cycle.elpx -x "theme/*"
cp /tmp/water-cycle.elpx sample/el-ciclo-del-agua-spectrum128k.elpx
```

What the builder produces:

- 11 pages with descriptive titles (`Bienvenida`, `¿Qué es el ciclo del agua?`, `El Sol pone el agua en marcha`, …) and pixel-art block icons.
- Each text iDevice embeds one of the 11 PNG illustrations from `imagenes-generadas/` via `content/resources/<n>-*.png`.
- Two interactive iDevices: `scrambled-list` for ordering the phases, `trueorfalse` for four statements.
- A `download-source-file` iDevice on the last page (download the .elp).
- Two action buttons on intro and credits: **Abrir en eXeLearning** (`static.exelearning.dev/?url=<raw-github-url>/sample/…elpx`) and **Descargar estilo** (GitHub latest release `spectrum128k.zip`).
- `pp_addSearchBox=true`, `pp_addPagination=true`, `pp_theme=spectrum128k`, `pp_exportElp=true`.

## 7. Critical gotchas

1. **Bash tool resets `cwd` between calls.** A previous session wiped `/Users/ernesto/Downloads/git/exelearning_4` because `find . -maxdepth 1 ... -exec rm -rf {} +` ran from the wrong directory. **Always use absolute paths** in `find`, `rm`, `unzip`, and friends. Never rely on `cd` persisting.
2. **Preserve the theme symlink.** When extracting a fresh ELPX into this repo, always pass `-x "theme/*"` to `unzip` so the canonical style files are not overwritten by the ELPX's copy. Confirm with `test -L theme || test -d theme` before and after.
3. **Icon file names go into `<iconName>` without extension.** The renderer resolves `<iconName>book` → `theme/icons/book.svg` (or `.png`). Renaming an icon file is a breaking change.
4. **`localStorage` keys to know:** `exeDarkMode` (value `on` if enabled), `exeSpectrumTweaks` (JSON with `scanlines`, `stripes`, `pixelAll`). Default stripes preset is `128k` — tests/screenshots should clear the key before asserting visual state.
5. **Biome lints `style.js` loudly** (`var`, `$`, etc.). Every eXeLearning theme script is in this legacy style; this is expected and is not a CI blocker.
6. **The extracted ELPX duplicates eXeLearning libs** (`libs/`, `idevices/`, `content/`). Regenerating the sample refreshes those — they are intentionally committed so `git clone && python3 -m http.server` gives a live preview without a build step.
7. **CC0 `LICENSE` is for the repository infrastructure** (README, CI configs, example prose). The **theme itself and the example illustrations are CC BY-SA 4.0** per `theme/config.xml` and the credits page — do not conflate the two.

## 8. Open work items (as of the session that produced this file)

- **Mobile layout tweaks.** On narrow viewports the prev/next buttons should collapse to icon-only and the `.page-counter` needs to fit without overlapping the togglers. A responsive pass for `@media (max-width: 767.98px)` in `theme/style.css` is still pending.
- **Intro two-column layout.** The builder already emits a flex two-column intro (image left, text right, buttons at bottom) but the ELPX committed on the current `HEAD` was exported with an earlier version; it needs a fresh `make export-elpx` run.
- **Release pipeline.** Add a GitHub Actions workflow that, on tag push, zips `theme/` into `spectrum128k.zip` and uploads it as a release asset. The `Descargar estilo` link in README and the intro page already points at `/releases/latest/download/spectrum128k.zip`.
- **eXelearning gitarchive filter.** Exclude `public/files/perm/themes/base/spectrum128k/` from the upstream eXeLearning release archive, since this style lives in its own repo now.

## 9. How to land changes

1. Work only inside `/Users/ernesto/Downloads/git/exelearning-style-spectrum128k/`, using absolute paths.
2. Style changes? Edit `theme/style.css` or `theme/style.js`. Reload the live preview; no rebuild needed.
3. Example-unit changes? Edit `/tmp/build_water_cycle.py` and re-run the pipeline in §6. Commit the regenerated `content.xml`, `index.html`, `html/`, `content/resources/`, and `sample/…elpx`.
4. README or AGENTS.md changes? Keep them short. The `README.md` is the user-facing landing page on GitHub.
5. `git commit -m "…" && git push`. The remote is `git@github.com:ateeducacion/exelearning-style-spectrum128k.git`.

## 10. Attribution

Author: Área de Tecnología Educativa · Consejería de Educación, Formación Profesional, Actividad Física y Deportes del Gobierno de Canarias.

Fonts: VT323 (Peter Hull), JetBrains Mono (JetBrains) — both SIL OFL 1.1.

eXeLearning: maintained by [CEDEC](https://cedec.intef.es/) and the State education administrations.
