# Plan: Make ALL colors Pantone

## Step 1: Add utility Pantone colors to catalog.js

Add real Pantone colors needed for roles that currently use `darken()`/`lighten()`:

- **Near-white:** Pantone Bright White (#f4f5f0) — for `onPrimary` foreground on dark primaries
- **Near-black:** Pantone Jet Black (#131517) — for `onPrimary` foreground on bright primaries, shadows

Terminal bright variants (currently `lighten(PANTONE_X, 15)` — NOT Pantone):
- Bright Red: Pantone Warm Red (#f9423a) — already in catalog as "Warm Red"
- Bright Green: Pantone 2017 Greenery is already bright enough, keep it
- Bright Yellow: Pantone Illuminating (#f5df4d) — already in catalog
- Bright Blue: Pantone Sky Blue (#2c9fd9) — already in catalog
- Bright Magenta: Pantone Fuchsia Rose (#c74375) — already in catalog
- Bright Cyan: Pantone Aqua Sky (#7bc4e2) — already in catalog

So for dark workbench, re-map terminal brights to existing catalog entries instead of `lighten()`.

For light workbench, the bright variants are already using catalog colors (PANTONE_TANGO, GREENERY, MIMOSA, SKY_BLUE, ORCHID, TURQUOISE) — already good.

## Step 2: Add 4 new syntax roles to ALL curated palettes

Currently each palette has 8 roles: keyword, string, type, function, constant, className, number, neutral.

Add 4 new roles, all mapping to real Pantone color names:
- **`comment`** — for comments (currently derived from `mix(neutral, primary)`)
- **`variable`** — for variables (currently derived from `lighten(mix(...))`)
- **`operator`** — for operators (currently derived from `lighten(keyword, 15)`)
- **`punctuation`** — for punctuation (currently same as derived comment)

Strategy per hue family:
- REDS: comment=Silver, variable=Warm Gray, operator=Salmon, punctuation=Pewter
- BLUES: comment=Pewter, variable=Silver, operator=Cerulean, punctuation=Warm Gray
- GREENS: comment=Silver, variable=Warm Gray, operator=Sage, punctuation=Pewter
- TEALS: comment=Pewter, variable=Silver, operator=Dusty Blue, punctuation=Warm Gray
- ORANGES: comment=Silver, variable=Warm Gray, operator=Peach, punctuation=Pewter
- PURPLES: comment=Pewter, variable=Silver, operator=Rose Quartz, punctuation=Warm Gray
- PINKS: comment=Silver, variable=Warm Gray, operator=Blush, punctuation=Pewter
- NEUTRALS: comment=Pewter, variable=Silver, operator=Dusty Blue, punctuation=Warm Gray
- NEONS: comment=Graphite, variable=Silver, operator=Pewter, punctuation=Graphite

These are deliberately muted/neutral Pantone colors that work for their structural roles.

## Step 3: Update palette-generator.js

- Look up `comment`, `variable`, `operator`, `punctuation` from curated palettes via `lookup()`
- Export them as first-class palette properties
- Replace `pantoneWhite: lighten(N, 92)` with `pantoneWhite: lookup("Bright White")` (new catalog entry)
- Keep bg/fg/border derivation (unavoidable for extreme values) but add clear comments

## Step 4: Update build.js — stop corrupting Pantone colors

- **Remove the lighten/darken loop** in `resolveSyntaxColors()` that mutates Pantone values
- Use the curated `comment`, `variable`, `operator`, `punctuation` directly from palette
- Keep `validateContrast()` as warnings only — don't modify the colors
- Trust the curated palette choices

## Step 5: Update workbench-dark.js

Replace all `darken()`/`lighten()`/`mix()` with Pantone palette references:

- `statusBar.background`: use `p.primary` directly (it's already Pantone)
- `statusBar.foreground`: use `p.pantoneWhite` (now a real Pantone) or `p.variable`
- `button.hoverBackground`: use `alpha(p.primary, 0.85)` over lighter bg (alpha on Pantone is OK)
- `textLink.activeForeground`: use `p.string` directly (no lighten)
- `onPrimary`: use `p.pantoneWhite` or catalog "Jet Black" based on contrast
- Shadow: use `alpha(PANTONE_JET_BLACK, 0.27)` (real Pantone + alpha)
- Terminal brights: replace `lighten(PANTONE_X, 15)` with actual catalog Pantone colors
- `terminal.ansiBlue`: use `PANTONE_CLASSIC_BLUE` directly (no mix)
- `statusBarItem.remoteBackground`: use `p.primary` directly

## Step 6: Update workbench-light.js

Same philosophy:
- `primaryOnLight` adaptive logic: instead of `darken(p.primary, 20)`, add a `primaryDark` role or accept lower contrast
- `activityBarBadge.background`: use `p.string` directly (no darken)
- `statusBar.debuggingBackground`: use `p.string` directly
- `editorInfo.foreground`: use `p.string` directly (no darken)
- `textLink.foreground/activeForeground`: use `p.string` directly
- `inputValidation.infoBorder`: use `p.string` directly
- `statusBarItem.remoteBackground`: use `p.primary` directly
- Terminal brights: already using catalog Pantone colors — keep as-is
- Shadow: use `alpha(PANTONE_JET_BLACK, 0.08)`

## Step 7: Update token-colors.js

No changes needed — it already uses `syntax.*` properties passed in from build.js. The fix is upstream in build.js (step 4).

## Step 8: Rebuild all themes

Run `node src/build.js` to regenerate all 200+ theme JSON files with pure Pantone colors.

## What stays derived (and why)

- **Backgrounds** (bg, bgSecondary, bgTertiary): Dark themes need #1a-#2a, light themes need #f0-#ff. No Pantone colors exist at these extremes. Derived from primary Pantone to preserve per-theme tinting.
- **Foreground/border in workbench**: Similarly extreme values derived from primary+neutral.
- **Alpha transparency**: `alpha(PANTONE_COLOR, 0.3)` is still a Pantone color — just semi-transparent. Used for selections, highlights, overlays.

## Files changed

1. `src/catalog.js` — add 2 colors (Bright White, Jet Black)
2. `src/curated-palettes.js` — add 4 roles to all 100+ entries
3. `src/palette-generator.js` — look up new roles, replace pantoneWhite
4. `src/build.js` — simplify resolveSyntaxColors, stop mutating Pantone values
5. `src/templates/workbench-dark.js` — replace all darken/lighten/mix with Pantone refs
6. `src/templates/workbench-light.js` — same
7. `themes/*.json` — regenerated (200+ files)
