'use strict';

const { hexToHsl, darken, lighten, mix } = require('./utils/color');
const curatedPalettes = require('./curated-palettes');

/**
 * Generate a full palette for a given primary Pantone color.
 *
 * Syntax colors are looked up from hand-curated palette definitions.
 * Workbench colors (bg, fg, border) are still derived mechanically
 * from the primary + neutral via brightness adjustments.
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

  return {
    name: primary.name,
    slug,
    code: primary.code,

    // Curated syntax colors — every pairing intentional
    primary:       P,
    keyword:       P,
    string:        lookup(curated.string),
    type:          lookup(curated.type),
    function:      lookup(curated.function),
    constant:      lookup(curated.constant),
    className:     lookup(curated.className),
    number:        lookup(curated.number),
    neutral:       N,

    pantoneWhite: lighten(N, 92),

    // Workbench colors — derived from primary + neutral
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
