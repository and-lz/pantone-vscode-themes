'use strict';

const { hexToHsl, darken, lighten, mix } = require('./utils/color');
const curatedPalettes = require('./curated-palettes');

/**
 * Generate a full palette for a given primary Pantone color.
 *
 * ALL syntax colors are real Pantone colors looked up from curated palettes.
 * Workbench colors (bg, fg, border) are derived from primary + neutral
 * via brightness adjustments — unavoidable for extreme dark/light values.
 */
function generatePalette(primary, catalog) {
  const curated = curatedPalettes[primary.name];

  if (!curated) {
    throw new Error(`No curated palette found for "${primary.name}"`);
  }

  // Look up a Pantone color name → hex from the catalog
  const lookup = (name) => {
    const entry = catalog.find(c => c.name === name);
    if (!entry) {
      throw new Error(`Pantone color "${name}" not found in catalog (referenced by "${primary.name}")`);
    }
    return entry.hex;
  };

  const P = primary.hex;
  const N = lookup(curated.neutral);
  const pHsl = hexToHsl(P);
  const pLightness = pHsl.l;

  // Adaptive darkening for dark mode background
  const darkPct = pLightness > 0.6 ? 88 : pLightness > 0.3 ? 84 : 75;

  const slug = primary.name.toLowerCase().replace(/\s+/g, '-');

  // Pantone-to-Pantone mapping for light mode structural colors.
  // Dark mode uses lighter Pantone colors; light mode swaps to darker ones.
  // Both sides are real Pantone catalog entries.
  const LIGHT_COUNTERPART = {
    // Light Pantone          → Darker Pantone (both real catalog entries)
    "Dusty Blue":   "Steel Blue",     // #7ba0b4 → #5b7b8d
    "Steel Blue":   "Graphite",       // #5b7b8d → #4e5358
    "Khaki":        "Mocha Mousse",   // #b9a384 → #a47864
    "Sand Dollar":  "Khaki",          // #decdbe → #b9a384
    "Rose Quartz":  "Mauve",          // #f7cac9 → #7e4d61
    "Silver":       "Steel Blue",     // #8a8d8f → #5b7b8d
    "Pewter":       "Graphite",       // #9a9e9d → #4e5358
    "Slate Blue":   "Slate Blue",     // #4a6fa5 — already dark enough
    "Bright White": "Jet Black",      // #f4f5f0 → #212322
  };

  const lightStructural = (name) => {
    const darkName = LIGHT_COUNTERPART[name];
    return darkName ? lookup(darkName) : lookup(name);
  };

  return {
    name: primary.name,
    slug,
    code: primary.code,

    // Curated syntax colors — every one a real Pantone color
    primary:       P,
    keyword:       P,
    string:        lookup(curated.string),
    type:          lookup(curated.type),
    function:      lookup(curated.function),
    constant:      lookup(curated.constant),
    className:     lookup(curated.className),
    number:        lookup(curated.number),
    neutral:       N,

    // Structural syntax colors — all real Pantone colors
    comment:       lookup(curated.comment),
    variable:      lookup(curated.variable),
    operator:      lookup(curated.operator),
    punctuation:   lookup(curated.punctuation),

    // Real Pantone white (not derived)
    pantoneWhite:  lookup("Bright White"),
    pantoneBlack:  lookup("Jet Black"),

    // Light mode structural counterparts (Pantone-to-Pantone swaps)
    lightComment:     lightStructural(curated.comment),
    lightVariable:    lightStructural(curated.variable),
    lightOperator:    lightStructural(curated.operator),
    lightPunctuation: lightStructural(curated.punctuation),

    // Workbench colors — derived from primary + neutral
    // (unavoidable: dark themes need #1a-#2a, light themes need #f0-#ff)
    dark: {
      bg:          darken(P, darkPct),
      bgSecondary: darken(P, darkPct - 5),
      bgTertiary:  darken(P, darkPct - 10),
      fg:          lighten(mix(N, P, 0.25), 72),
      fgDimmed:    mix(N, P, 0.3),
      border:      darken(P, darkPct - 18),
    },

    light: {
      bg:          lighten(mix(N, P, 0.1), 94),
      bgSecondary: lighten(mix(N, P, 0.1), 88),
      bgTertiary:  lighten(mix(N, P, 0.1), 82),
      fg:          darken(P, pLightness > 0.5 ? 85 : 78),
      fgDimmed:    mix(N, P, 0.4),
      border:      lighten(mix(N, P, 0.2), 55),
    },
  };
}

module.exports = { generatePalette };
