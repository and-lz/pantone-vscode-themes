'use strict';

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lighten(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const factor = percent / 100;
  return rgbToHex({
    r: r + (255 - r) * factor,
    g: g + (255 - g) * factor,
    b: b + (255 - b) * factor,
  });
}

function darken(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - percent / 100;
  return rgbToHex({
    r: r * factor,
    g: g * factor,
    b: b * factor,
  });
}

function alpha(hex, a) {
  const h = hex.replace('#', '');
  const alphaHex = Math.max(0, Math.min(255, Math.round(a * 255))).toString(16).padStart(2, '0');
  return `#${h.substring(0, 6)}${alphaHex}`;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function mix(hex1, hex2, ratio) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return rgbToHex({
    r: c1.r * (1 - ratio) + c2.r * ratio,
    g: c1.g * (1 - ratio) + c2.g * ratio,
    b: c1.b * (1 - ratio) + c2.b * ratio,
  });
}

function hexToHsl(hex) {
  const { r: r255, g: g255, b: b255 } = hexToRgb(hex);
  const r = r255 / 255, g = g255 / 255, b = b255 / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function hueDist(h1, h2) {
  const d = Math.abs(h1 - h2);
  return d > 180 ? 360 - d : d;
}

module.exports = { hexToRgb, rgbToHex, lighten, darken, alpha, luminance, contrastRatio, mix, hexToHsl, hueDist };
