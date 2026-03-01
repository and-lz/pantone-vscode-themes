'use strict';

const { hexToHsl, hueDist, darken, lighten, mix } = require('./utils/color');

// Neutral Pantone colors (low saturation, good for bg/fg derivation)
const NEUTRALS = [
  { name: "Ultimate Gray",  hex: "#939597" },
  { name: "Pewter",         hex: "#9a9e9d" },
  { name: "Silver",         hex: "#8a8d8f" },
  { name: "Warm Gray",      hex: "#d7d2cb" },
  { name: "Graphite",       hex: "#4e5358" },
  { name: "Steel Blue",     hex: "#5b7b8d" },
  { name: "Khaki",          hex: "#b9a384" },
  { name: "Mauve",          hex: "#7e4d61" },
  { name: "Sand Dollar",    hex: "#decdbe" },
  { name: "Gold",           hex: "#84754e" },
];

/**
 * Generate a full palette for a given primary color using the Pantone catalog.
 * Uses color theory: analogous (nearby hues), complementary (opposite hue).
 */
function generatePalette(primary, catalog) {
  const pHsl = hexToHsl(primary.hex);
  const pSat = pHsl.s;

  // All other colors with their hue distances from primary
  const others = catalog
    .filter(c => c.hex !== primary.hex)
    .map(c => {
      const hsl = hexToHsl(c.hex);
      return { ...c, hsl, dist: hueDist(pHsl.h, hsl.h) };
    });

  // Sort candidates by saturation (prefer saturated colors for syntax)
  const saturated = others.filter(c => c.hsl.s > 0.15);

  // Find analogous: hue distance 20-80°, sorted by distance
  const analogousCandidates = saturated
    .filter(c => c.dist >= 15 && c.dist <= 80)
    .sort((a, b) => a.dist - b.dist);

  // Find wider analogous: 40-120°
  const wideAnalogous = saturated
    .filter(c => c.dist >= 40 && c.dist <= 120)
    .sort((a, b) => a.dist - b.dist);

  // Find complementary: hue distance 140-220° (opposite side)
  const complementaryCandidates = saturated
    .filter(c => c.dist >= 130 && c.dist <= 230)
    .sort((a, b) => Math.abs(a.dist - 180) - Math.abs(b.dist - 180));

  // Find triadic neighbors: 90-150°
  const triadicCandidates = saturated
    .filter(c => c.dist >= 80 && c.dist <= 150)
    .sort((a, b) => a.dist - b.dist);

  // Pick unique colors ensuring hue diversity
  const used = new Set([primary.hex]);

  function pick(candidates, fallback) {
    for (const c of candidates) {
      if (!used.has(c.hex)) {
        // Ensure at least 20° hue separation from all used colors
        const tooClose = [...used].some(usedHex => {
          if (usedHex === primary.hex && hueDist(hexToHsl(usedHex).h, c.hsl.h) < 15) return true;
          if (usedHex !== primary.hex && hueDist(hexToHsl(usedHex).h, c.hsl.h) < 20) return true;
          return false;
        });
        if (!tooClose) {
          used.add(c.hex);
          return c;
        }
      }
    }
    // Relaxed: just pick first unused
    for (const c of candidates) {
      if (!used.has(c.hex)) {
        used.add(c.hex);
        return c;
      }
    }
    // Absolute fallback
    if (fallback) {
      for (const c of fallback) {
        if (!used.has(c.hex)) {
          used.add(c.hex);
          return c;
        }
      }
    }
    return saturated.find(c => !used.has(c.hex)) || others[0];
  }

  const analogous1 = pick(analogousCandidates, wideAnalogous);
  const analogous2 = pick(wideAnalogous, triadicCandidates);
  const complementary = pick(complementaryCandidates, [...saturated].sort((a, b) => b.dist - a.dist));
  const analogous3 = pick(triadicCandidates, analogousCandidates);
  const accent1 = pick(
    saturated.filter(c => c.dist >= 30 && c.dist <= 150 && c.hsl.l > 0.3).sort((a, b) => b.hsl.l - a.hsl.l),
    saturated
  );
  const accent2 = pick(
    saturated.filter(c => c.dist >= 80).sort((a, b) => a.dist - b.dist),
    saturated
  );

  // Pick best neutral: closest hue to primary among neutral candidates
  const neutral = NEUTRALS
    .map(n => ({ ...n, hsl: hexToHsl(n.hex), dist: hueDist(pHsl.h, hexToHsl(n.hex).h) }))
    .sort((a, b) => a.dist - b.dist)[0];

  const P = primary.hex;
  const N = neutral.hex;

  // Determine darkening percentage based on primary brightness
  const pLightness = pHsl.l;
  const darkPct = pLightness > 0.6 ? 88 : pLightness > 0.3 ? 84 : 75;

  const slug = primary.name.toLowerCase().replace(/\s+/g, '-');

  return {
    name: primary.name,
    slug,
    code: primary.code,

    primary:       P,
    analogous1:    analogous1.hex,
    analogous2:    analogous2.hex,
    analogous3:    analogous3.hex,
    complementary: complementary.hex,
    accent1:       accent1.hex,
    accent2:       accent2.hex,
    neutral:       N,

    pantoneWhite: lighten(N, 92),

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
