'use strict';

const fs = require('fs');
const path = require('path');
const catalog = require('./catalog');
const { generatePalette } = require('./palette-generator');
const curatedPalettes = require('./curated-palettes');
const generateDarkWorkbench = require('./templates/workbench-dark');
const generateLightWorkbench = require('./templates/workbench-light');
const generateTokenColors = require('./templates/token-colors');
const { contrastRatio } = require('./utils/color');

const THEMES_DIR = path.join(__dirname, '..', 'themes');
const PKG_PATH = path.join(__dirname, '..', 'package.json');

if (!fs.existsSync(THEMES_DIR)) {
  fs.mkdirSync(THEMES_DIR, { recursive: true });
}

// Clean old theme files
for (const f of fs.readdirSync(THEMES_DIR)) {
  if (f.endsWith('-color-theme.json')) {
    fs.unlinkSync(path.join(THEMES_DIR, f));
  }
}

/**
 * Resolve syntax colors for a given mode.
 *
 * ALL colors are real Pantone — no lighten/darken mutation.
 * Dark mode uses the curated Pantone colors directly.
 * Light mode uses Pantone-to-Pantone counterparts from the palette.
 */
function resolveSyntaxColors(palette, mode) {
  if (mode === 'dark') {
    return {
      keyword:     palette.keyword,
      comment:     palette.comment,
      string:      palette.string,
      number:      palette.number,
      type:        palette.type,
      function:    palette.function,
      variable:    palette.variable,
      constant:    palette.constant,
      className:   palette.className,
      tag:         palette.keyword,
      attribute:   palette.function,
      operator:    palette.operator,
      punctuation: palette.punctuation,
    };
  }

  // Light mode: use Pantone-to-Pantone light counterparts for structural colors
  return {
    keyword:     palette.keyword,
    comment:     palette.lightComment,
    string:      palette.string,
    number:      palette.number,
    type:        palette.type,
    function:    palette.function,
    variable:    palette.lightVariable,
    constant:    palette.constant,
    className:   palette.className,
    tag:         palette.keyword,
    attribute:   palette.function,
    operator:    palette.lightOperator,
    punctuation: palette.lightPunctuation,
  };
}

function validateContrast(syntax, bgColor, themeName) {
  let warnings = 0;
  for (const [name, color] of Object.entries(syntax)) {
    if (name === 'punctuation' || name === 'comment') continue;
    const ratio = contrastRatio(color, bgColor);
    if (ratio < 4.5) {
      warnings++;
    }
  }
  return warnings;
}

function buildTheme(palette, mode) {
  const syntax = resolveSyntaxColors(palette, mode);
  const bg = palette[mode].bg;
  const themeName = `Pantone ${palette.name} (${mode === 'dark' ? 'Dark' : 'Light'})`;

  const warnings = validateContrast(syntax, bg, themeName);

  const workbench = mode === 'dark'
    ? generateDarkWorkbench(palette)
    : generateLightWorkbench(palette);

  const tokenColors = generateTokenColors(syntax);

  const semanticTokenColors = {
    "variable.declaration": { "foreground": syntax.variable },
    "variable.readonly": { "foreground": syntax.constant, "bold": true },
    "parameter.declaration": { "foreground": syntax.variable, "italic": true },
    "function.declaration": { "foreground": syntax.function, "bold": true },
    "function.defaultLibrary": { "foreground": syntax.function },
    "type": { "foreground": syntax.type, "italic": true },
    "type.defaultLibrary": { "foreground": syntax.type, "italic": true },
    "class": { "foreground": syntax.className, "bold": true, "italic": true },
    "interface": { "foreground": syntax.type, "italic": true },
    "enum": { "foreground": syntax.type, "italic": true },
    "enumMember": { "foreground": syntax.constant, "bold": true },
    "namespace": { "foreground": syntax.type },
    "property.readonly": { "foreground": syntax.constant, "bold": true },
  };

  const theme = {
    name: themeName,
    type: mode,
    semanticHighlighting: true,
    semanticTokenColors,
    colors: workbench,
    tokenColors,
  };

  const filename = `pantone-${palette.slug}-${mode}-color-theme.json`;
  const filepath = path.join(THEMES_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(theme, null, 2));

  return { filename, warnings };
}

// Generate all palettes from the catalog
console.log('Building Pantone themes...\n');

const themeEntries = [];
let totalThemes = 0;
let totalWarnings = 0;

for (const color of catalog) {
  // Skip utility colors that aren't theme primaries (no curated palette)
  if (!curatedPalettes[color.name]) continue;

  const palette = generatePalette(color, catalog);

  const darkResult = buildTheme(palette, 'dark');
  const lightResult = buildTheme(palette, 'light');

  themeEntries.push(
    { label: `Pantone ${color.name} (Dark)`, uiTheme: "vs-dark", path: `./themes/${darkResult.filename}` },
    { label: `Pantone ${color.name} (Light)`, uiTheme: "vs", path: `./themes/${lightResult.filename}` }
  );

  const w = darkResult.warnings + lightResult.warnings;
  const status = w > 0 ? ` (${w} warnings)` : '';
  console.log(`  ${color.name}${status}`);
  totalThemes += 2;
  totalWarnings += w;
}

// Update package.json with all theme entries
const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf-8'));
pkg.contributes.themes = themeEntries;
fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');

console.log(`\nDone! Generated ${totalThemes} themes.`);
if (totalWarnings > 0) {
  console.log(`${totalWarnings} contrast warnings total.`);
}
console.log(`Updated package.json with ${themeEntries.length} theme entries.`);
