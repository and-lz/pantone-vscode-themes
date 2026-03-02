'use strict';

const vscode = require('vscode');

// Pantone catalog embedded for runtime color matching (name + hex only)
const CATALOG = [
  { name: "Mocha Mousse", hex: "#a47864" },
  { name: "Peach Fuzz", hex: "#ffbe98" },
  { name: "Viva Magenta", hex: "#bb2649" },
  { name: "Very Peri", hex: "#6667ab" },
  { name: "Illuminating", hex: "#f5df4d" },
  { name: "Ultimate Gray", hex: "#939597" },
  { name: "Classic Blue", hex: "#0f4c81" },
  { name: "Living Coral", hex: "#ff6f61" },
  { name: "Ultra Violet", hex: "#5f4b8b" },
  { name: "Greenery", hex: "#88b04b" },
  { name: "Rose Quartz", hex: "#f7cac9" },
  { name: "Serenity", hex: "#92a8d1" },
  { name: "Marsala", hex: "#955251" },
  { name: "Radiant Orchid", hex: "#b163a3" },
  { name: "Emerald", hex: "#009473" },
  { name: "Tangerine Tango", hex: "#dd4132" },
  { name: "Honeysuckle", hex: "#d94f70" },
  { name: "Turquoise", hex: "#45b5aa" },
  { name: "Mimosa", hex: "#efc050" },
  { name: "Blue Iris", hex: "#5a5b9f" },
  { name: "Chili Pepper", hex: "#9b1b30" },
  { name: "Sand Dollar", hex: "#decdbe" },
  { name: "Blue Turquoise", hex: "#53b0ae" },
  { name: "Tigerlily", hex: "#e2583e" },
  { name: "Aqua Sky", hex: "#7bc4e2" },
  { name: "True Red", hex: "#bf1932" },
  { name: "Fuchsia Rose", hex: "#c74375" },
  { name: "Cerulean", hex: "#9bb7d4" },
  { name: "Classic Red", hex: "#da291c" },
  { name: "Royal Blue", hex: "#003da5" },
  { name: "Green", hex: "#78be20" },
  { name: "Yellow", hex: "#ffc72c" },
  { name: "Orange", hex: "#fe5000" },
  { name: "Purple", hex: "#5c068c" },
  { name: "Silver", hex: "#8a8d8f" },
  { name: "Gold", hex: "#84754e" },
  { name: "Process Blue", hex: "#0085ca" },
  { name: "Warm Red", hex: "#f9423a" },
  { name: "Saffron", hex: "#ffaa4d" },
  { name: "Dark Red", hex: "#9e1b32" },
  { name: "Bright Green", hex: "#00b140" },
  { name: "Lavender", hex: "#9063cd" },
  { name: "Turquoise Classic", hex: "#00a499" },
  { name: "Peach", hex: "#f5a26f" },
  { name: "Sky Blue", hex: "#2c9fd9" },
  { name: "Burgundy", hex: "#9e1b2e" },
  { name: "Poppy", hex: "#ce3732" },
  { name: "Lime Green", hex: "#97d700" },
  { name: "Cornflower Blue", hex: "#4d88e1" },
  { name: "Aqua", hex: "#00b5cc" },
  { name: "Warm Gray", hex: "#d7d2cb" },
  { name: "Steel Blue", hex: "#5b7b8d" },
  { name: "Dark Brown", hex: "#4c2a2b" },
  { name: "Yellow Green", hex: "#c8d800" },
  { name: "Hot Pink", hex: "#e83e6c" },
  { name: "Baby Blue", hex: "#b0d7e1" },
  { name: "Blush Pink", hex: "#f5b5c8" },
  { name: "Cobalt Blue", hex: "#1464a0" },
  { name: "Khaki", hex: "#b9a384" },
  { name: "Flame Orange", hex: "#ff7b43" },
  { name: "Indigo", hex: "#1b368c" },
  { name: "Deep Pink", hex: "#d4145a" },
  { name: "Olive Green", hex: "#8a8d28" },
  { name: "Mauve", hex: "#7e4d61" },
  { name: "Sage", hex: "#a3af86" },
  { name: "Salmon", hex: "#f7a08b" },
  { name: "Dusty Blue", hex: "#7ba0b4" },
  { name: "Amber", hex: "#d4a017" },
  { name: "Mint Green", hex: "#86d0bf" },
  { name: "Wine", hex: "#8c3359" },
  { name: "Ice Blue", hex: "#99d6ea" },
  { name: "Burnt Orange", hex: "#ff6b00" },
  { name: "Forest Green", hex: "#4e9a2f" },
  { name: "Violet", hex: "#9e4fa5" },
  { name: "Golden Yellow", hex: "#e8ae4e" },
  { name: "Dark Maroon", hex: "#7c2029" },
  { name: "Pewter", hex: "#9a9e9d" },
  { name: "Teal", hex: "#006e7f" },
  { name: "Blush", hex: "#f3aeb0" },
  { name: "Navy", hex: "#1b2a6b" },
  { name: "Tan", hex: "#c9b99a" },
  { name: "Neon Pink", hex: "#ff3ca0" },
  { name: "Neon Green", hex: "#76ff7b" },
  { name: "Neon Orange", hex: "#ff6b54" },
  { name: "Neon Yellow", hex: "#e8e835" },
  { name: "Neon Blue", hex: "#00b4e1" },
  { name: "Wheat", hex: "#c5ac7d" },
  { name: "Peacock Green", hex: "#2e6f6b" },
  { name: "Coral", hex: "#ff8272" },
  { name: "Chocolate", hex: "#5c3317" },
  { name: "Ruby", hex: "#7c1c32" },
  { name: "Graphite", hex: "#4e5358" },
  { name: "Sand", hex: "#d4c19c" },
  { name: "Chartreuse", hex: "#dddd00" },
  { name: "Brick Red", hex: "#a0342b" },
  { name: "Cyan", hex: "#00b2c9" },
  { name: "Sienna", hex: "#7a3b2e" },
  { name: "Lilac", hex: "#e8d4e2" },
  { name: "Plum", hex: "#5e2b4e" },
  { name: "Slate Blue", hex: "#4a6fa5" },
];

// ---------------------------------------------------------------------------
// Color utilities (minimal set for runtime matching)
// ---------------------------------------------------------------------------

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
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

/**
 * Euclidean RGB distance — simple and effective for finding the nearest color.
 */
function colorDistance(hex1, hex2) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  return Math.sqrt(
    (a.r - b.r) ** 2 +
    (a.g - b.g) ** 2 +
    (a.b - b.b) ** 2
  );
}

// ---------------------------------------------------------------------------
// Pantone matching
// ---------------------------------------------------------------------------

/**
 * Find the closest Pantone color to an arbitrary hex value.
 */
function findNearestPantone(hex) {
  let best = null;
  let bestDist = Infinity;
  for (const color of CATALOG) {
    const dist = colorDistance(hex, color.hex);
    if (dist < bestDist) {
      bestDist = dist;
      best = color;
    }
  }
  return best;
}

/**
 * Find Pantone colors near the complementary hue (±180°).
 * Returns up to 2 results, excluding the source color.
 */
function findComplementary(pantoneColor) {
  const hsl = hexToHsl(pantoneColor.hex);
  const compHue = (hsl.h + 180) % 360;

  return CATALOG
    .filter(c => c.name !== pantoneColor.name)
    .map(c => ({ ...c, _dist: hueDist(hexToHsl(c.hex).h, compHue) }))
    .sort((a, b) => a._dist - b._dist)
    .slice(0, 2);
}

// ---------------------------------------------------------------------------
// Extension lifecycle
// ---------------------------------------------------------------------------

/** Track the last Peacock hex we reacted to, so we don't re-prompt on reload. */
let lastPeacockColor = null;

/** Output channel for diagnostics. */
let log;

function activate(context) {
  log = vscode.window.createOutputChannel('Pantone Theme');
  log.appendLine('Pantone Theme extension activated');

  // Visible confirmation that the extension is running
  const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
  statusItem.text = '$(paintcan) Pantone';
  statusItem.tooltip = 'Pantone Theme — Peacock integration active';
  statusItem.command = 'pantoneTheme.matchPeacock';
  statusItem.show();
  context.subscriptions.push(statusItem);

  // Read current Peacock color on activation (don't prompt — just record it)
  lastPeacockColor = vscode.workspace
    .getConfiguration('peacock')
    .get('color', null);
  log.appendLine(`Current Peacock color: ${lastPeacockColor || '(none)'}`);

  // ---- Listen for Peacock color changes ----
  const configWatcher = vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (!e.affectsConfiguration('peacock.color')) return;

    const newColor = vscode.workspace
      .getConfiguration('peacock')
      .get('color', null);

    log.appendLine(`Peacock color changed: ${newColor}`);

    // Ignore if unchanged, cleared, or not a valid hex
    if (!newColor || newColor === lastPeacockColor) return;
    if (!/^#[0-9a-fA-F]{6}$/.test(newColor)) return;

    lastPeacockColor = newColor;

    await promptThemeSwitch(newColor);
  });

  // ---- Manual command: match current Peacock color ----
  const matchCommand = vscode.commands.registerCommand(
    'pantoneTheme.matchPeacock',
    async () => {
      const peacockColor = vscode.workspace
        .getConfiguration('peacock')
        .get('color', null);

      if (!peacockColor || !/^#[0-9a-fA-F]{6}$/.test(peacockColor)) {
        vscode.window.showWarningMessage(
          'No Peacock color set. Use a Peacock command to set a workspace color first.'
        );
        return;
      }

      await promptThemeSwitch(peacockColor);
    }
  );

  context.subscriptions.push(configWatcher, matchCommand);
}

/**
 * Show a QuickPick with matching and complementary Pantone themes.
 */
async function promptThemeSwitch(hex) {
  const nearest = findNearestPantone(hex);
  if (!nearest) return;

  const complements = findComplementary(nearest);

  // Build items using only standard QuickPickItem fields.
  // Use `detail` to store the exact theme name (custom props may be stripped).
  const items = [
    {
      label: `Pantone ${nearest.name} (Dark)`,
      description: 'Best match',
      detail: nearest.hex,
    },
    {
      label: `Pantone ${nearest.name} (Light)`,
      description: 'Best match',
      detail: nearest.hex,
    },
  ];

  for (const comp of complements) {
    items.push(
      {
        label: `Pantone ${comp.name} (Dark)`,
        description: 'Complementary',
        detail: comp.hex,
      },
      {
        label: `Pantone ${comp.name} (Light)`,
        description: 'Complementary',
        detail: comp.hex,
      }
    );
  }

  const pick = await vscode.window.showQuickPick(items, {
    title: `Peacock ${hex} → Pantone ${nearest.name} (${nearest.hex})`,
    placeHolder: 'Pick a theme to apply',
  });

  if (!pick) return;

  // The label IS the theme name (e.g. "Pantone Classic Blue (Dark)")
  const themeName = pick.label;
  log.appendLine(`User picked: "${themeName}"`);

  try {
    const config = vscode.workspace.getConfiguration('workbench');
    const target = vscode.ConfigurationTarget.Workspace;
    const isDarkPick = themeName.endsWith('(Dark)');

    // When autoDetectColorScheme is on, VS Code ignores colorTheme and uses
    // preferredDarkColorTheme / preferredLightColorTheme instead.
    // Set the correct preferred setting so the switch works either way.
    if (isDarkPick) {
      await config.update('preferredDarkColorTheme', themeName, target);
    } else {
      await config.update('preferredLightColorTheme', themeName, target);
    }
    // Also set colorTheme for users without autoDetect
    await config.update('colorTheme', themeName, target);

    log.appendLine(`Theme applied: ${themeName} (workspace)`);
    vscode.window.showInformationMessage(`Pantone theme: ${themeName}`);
  } catch (err) {
    log.appendLine(`Error: ${err.message}`);
    vscode.window.showErrorMessage(`Failed to set theme: ${err.message}`);
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
