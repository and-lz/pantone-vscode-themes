'use strict';

const { alpha, lighten, darken, mix, contrastRatio } = require('../utils/color');

// Pantone functional colors (darker variants for light backgrounds)
const PANTONE_FOREST      = "#4e9a2f";  // Pantone 369 — git added
const PANTONE_AMBER       = "#d4a017";  // Pantone 1245 — warnings
const PANTONE_TRUE_RED    = "#bf1932";  // Pantone 2002 — errors
const PANTONE_WINE        = "#8c3359";  // Pantone 209 — terminal magenta
const PANTONE_TEAL        = "#006e7f";  // Pantone 7706 — terminal cyan
const PANTONE_CLASSIC_BLUE = "#0f4c81"; // Pantone 2020 — terminal blue
const PANTONE_TANGO       = "#dd4132";  // Pantone 2012 — bright red
const PANTONE_GREENERY    = "#88b04b";  // Pantone 2017 — bright green
const PANTONE_MIMOSA      = "#efc050";  // Pantone 2009 — bright yellow
const PANTONE_SKY_BLUE    = "#2c9fd9";  // Pantone 2925 — bright blue
const PANTONE_ORCHID      = "#b163a3";  // Pantone 2014 — bright magenta
const PANTONE_TURQUOISE   = "#45b5aa";  // Pantone 2010 — bright cyan

module.exports = function generateLightWorkbench(palette) {
  const l = palette.light;
  const p = palette;

  // Ensure primary has enough contrast on light bg
  const primaryOnLight = contrastRatio(p.primary, l.bg) < 3
    ? darken(p.primary, 20)
    : p.primary;

  // Adaptive foreground: use pantoneWhite on dark primaries, dark fg on bright primaries
  const onPrimary = contrastRatio(p.pantoneWhite, primaryOnLight) >= 4.5
    ? p.pantoneWhite
    : l.fg;

  // Shadow derived from primary Pantone color
  const shadow = alpha(darken(p.primary, 90), 0.08);

  return {
    // Editor
    "editor.background": l.bg,
    "editor.foreground": l.fg,
    "editorCursor.foreground": primaryOnLight,
    "editor.selectionBackground": alpha(primaryOnLight, 0.20),
    "editor.inactiveSelectionBackground": alpha(primaryOnLight, 0.10),
    "editor.lineHighlightBackground": alpha(primaryOnLight, 0.08),
    "editor.lineHighlightBorder": alpha(primaryOnLight, 0),
    "editor.findMatchBackground": alpha(p.number, 0.35),
    "editor.findMatchHighlightBackground": alpha(p.number, 0.15),
    "editor.wordHighlightBackground": alpha(primaryOnLight, 0.15),
    "editorBracketMatch.background": alpha(primaryOnLight, 0.20),
    "editorBracketMatch.border": alpha(primaryOnLight, 0.50),
    "editorIndentGuide.background": alpha(l.fg, 0.08),
    "editorIndentGuide.activeBackground": alpha(l.fg, 0.18),
    "editorWhitespace.foreground": alpha(l.fg, 0.10),
    "editorRuler.foreground": alpha(l.fg, 0.08),
    "editorLineNumber.foreground": l.fgDimmed,
    "editorLineNumber.activeForeground": l.fg,
    "editorGutter.addedBackground": PANTONE_FOREST,
    "editorGutter.modifiedBackground": PANTONE_AMBER,
    "editorGutter.deletedBackground": PANTONE_TRUE_RED,
    "editorError.foreground": PANTONE_TRUE_RED,
    "editorWarning.foreground": PANTONE_AMBER,
    "editorInfo.foreground": darken(p.string, 10),

    // Sidebar
    "sideBar.background": l.bgSecondary,
    "sideBar.foreground": l.fg,
    "sideBar.border": l.border,
    "sideBarTitle.foreground": l.fg,
    "sideBarSectionHeader.background": alpha(primaryOnLight, 0.10),
    "sideBarSectionHeader.foreground": l.fg,

    // Activity Bar
    "activityBar.background": l.bgTertiary,
    "activityBar.foreground": primaryOnLight,
    "activityBar.inactiveForeground": l.fgDimmed,
    "activityBar.border": l.border,
    "activityBarBadge.background": darken(p.string, 10),
    "activityBarBadge.foreground": p.pantoneWhite,

    // Title Bar
    "titleBar.activeBackground": l.bgSecondary,
    "titleBar.activeForeground": l.fg,
    "titleBar.inactiveBackground": l.bgSecondary,
    "titleBar.inactiveForeground": l.fgDimmed,
    "titleBar.border": l.border,

    // Tabs
    "tab.activeBackground": l.bg,
    "tab.activeForeground": l.fg,
    "tab.inactiveBackground": l.bgSecondary,
    "tab.inactiveForeground": l.fgDimmed,
    "tab.activeBorder": primaryOnLight,
    "tab.activeBorderTop": alpha(primaryOnLight, 0),
    "tab.border": l.border,
    "editorGroupHeader.tabsBackground": l.bgSecondary,
    "editorGroupHeader.tabsBorder": l.border,
    "editorGroup.border": l.border,

    // Status Bar
    "statusBar.background": primaryOnLight,
    "statusBar.foreground": onPrimary,
    "statusBar.border": l.border,
    "statusBar.debuggingBackground": darken(p.string, 10),
    "statusBar.debuggingForeground": p.pantoneWhite,
    "statusBar.noFolderBackground": l.bgTertiary,
    "statusBarItem.hoverBackground": alpha(p.pantoneWhite, 0.20),
    "statusBarItem.remoteBackground": darken(primaryOnLight, 15),
    "statusBarItem.remoteForeground": onPrimary,

    // Input
    "input.background": l.bg,
    "input.foreground": l.fg,
    "input.border": l.border,
    "input.placeholderForeground": l.fgDimmed,
    "inputOption.activeBorder": primaryOnLight,
    "inputValidation.errorBorder": PANTONE_TRUE_RED,
    "inputValidation.warningBorder": PANTONE_AMBER,
    "inputValidation.infoBorder": darken(p.string, 10),

    // Dropdown
    "dropdown.background": l.bg,
    "dropdown.foreground": l.fg,
    "dropdown.border": l.border,

    // Lists
    "list.activeSelectionBackground": alpha(primaryOnLight, 0.20),
    "list.activeSelectionForeground": l.fg,
    "list.hoverBackground": alpha(primaryOnLight, 0.10),
    "list.inactiveSelectionBackground": alpha(primaryOnLight, 0.10),
    "list.focusBackground": alpha(primaryOnLight, 0.15),
    "list.highlightForeground": primaryOnLight,

    // Buttons
    "button.background": primaryOnLight,
    "button.foreground": onPrimary,
    "button.hoverBackground": darken(primaryOnLight, 10),
    "button.secondaryBackground": l.bgTertiary,
    "button.secondaryForeground": l.fg,

    // Badges
    "badge.background": primaryOnLight,
    "badge.foreground": onPrimary,

    // Scrollbar
    "scrollbar.shadow": shadow,
    "scrollbarSlider.background": alpha(l.fg, 0.10),
    "scrollbarSlider.hoverBackground": alpha(l.fg, 0.20),
    "scrollbarSlider.activeBackground": alpha(l.fg, 0.30),

    // Minimap
    "minimap.background": l.bg,
    "minimap.findMatchHighlight": alpha(p.number, 0.50),
    "minimap.selectionHighlight": alpha(primaryOnLight, 0.30),

    // Panel
    "panel.background": l.bgSecondary,
    "panel.border": l.border,
    "panelTitle.activeBorder": primaryOnLight,
    "panelTitle.activeForeground": l.fg,
    "panelTitle.inactiveForeground": l.fgDimmed,

    // Terminal — all Pantone colors
    "terminal.background": l.bgSecondary,
    "terminal.foreground": l.fg,
    "terminalCursor.foreground": primaryOnLight,
    "terminal.ansiBlack": l.fg,
    "terminal.ansiRed": PANTONE_TRUE_RED,
    "terminal.ansiGreen": PANTONE_FOREST,
    "terminal.ansiYellow": PANTONE_AMBER,
    "terminal.ansiBlue": PANTONE_CLASSIC_BLUE,
    "terminal.ansiMagenta": PANTONE_WINE,
    "terminal.ansiCyan": PANTONE_TEAL,
    "terminal.ansiWhite": l.bg,
    "terminal.ansiBrightBlack": l.fgDimmed,
    "terminal.ansiBrightRed": PANTONE_TANGO,
    "terminal.ansiBrightGreen": PANTONE_GREENERY,
    "terminal.ansiBrightYellow": PANTONE_MIMOSA,
    "terminal.ansiBrightBlue": PANTONE_SKY_BLUE,
    "terminal.ansiBrightMagenta": PANTONE_ORCHID,
    "terminal.ansiBrightCyan": PANTONE_TURQUOISE,
    "terminal.ansiBrightWhite": p.pantoneWhite,

    // Git Decorations — all Pantone colors
    "gitDecoration.addedResourceForeground": PANTONE_FOREST,
    "gitDecoration.modifiedResourceForeground": PANTONE_AMBER,
    "gitDecoration.deletedResourceForeground": PANTONE_TRUE_RED,
    "gitDecoration.untrackedResourceForeground": PANTONE_FOREST,
    "gitDecoration.conflictingResourceForeground": PANTONE_TANGO,
    "gitDecoration.ignoredResourceForeground": l.fgDimmed,

    // Breadcrumbs
    "breadcrumb.foreground": l.fgDimmed,
    "breadcrumb.focusForeground": l.fg,
    "breadcrumb.activeSelectionForeground": l.fg,

    // Notifications
    "notifications.background": l.bg,
    "notifications.foreground": l.fg,
    "notificationLink.foreground": primaryOnLight,

    // Peek View
    "peekView.border": primaryOnLight,
    "peekViewEditor.background": l.bgSecondary,
    "peekViewResult.background": l.bgTertiary,
    "peekViewTitle.background": l.bgSecondary,

    // Widget
    "editorWidget.background": l.bg,
    "editorWidget.border": l.border,
    "editorSuggestWidget.selectedBackground": alpha(primaryOnLight, 0.15),

    // Focus & Misc
    "focusBorder": alpha(primaryOnLight, 0.50),
    "selection.background": alpha(primaryOnLight, 0.20),
    "textLink.foreground": darken(p.string, 10),
    "textLink.activeForeground": darken(p.string, 20),
    "progressBar.background": primaryOnLight,
    "icon.foreground": l.fgDimmed,
    "descriptionForeground": l.fgDimmed,
  };
};
