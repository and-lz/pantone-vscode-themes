'use strict';

const { alpha, contrastRatio } = require('../utils/color');

// Pantone functional colors — darker variants for light backgrounds (all real Pantone)
const PANTONE_FOREST         = "#4e9a2f";  // Pantone 369 — git added
const PANTONE_AMBER          = "#d4a017";  // Pantone 1245 — warnings
const PANTONE_TRUE_RED       = "#bf1932";  // Pantone 2002 — errors
const PANTONE_WINE           = "#8c3359";  // Pantone 209 — terminal magenta
const PANTONE_TEAL           = "#006e7f";  // Pantone 7706 — terminal cyan
const PANTONE_CLASSIC_BLUE   = "#0f4c81";  // Pantone 2020 — terminal blue

// Terminal bright variants — real Pantone catalog colors
const PANTONE_TANGO          = "#dd4132";  // Pantone 2012 — bright red
const PANTONE_GREENERY       = "#88b04b";  // Pantone 2017 — bright green
const PANTONE_MIMOSA         = "#efc050";  // Pantone 2009 — bright yellow
const PANTONE_SKY_BLUE       = "#2c9fd9";  // Pantone 2925 — bright blue
const PANTONE_ORCHID         = "#b163a3";  // Pantone 2014 — bright magenta
const PANTONE_TURQUOISE      = "#45b5aa";  // Pantone 2010 — bright cyan
const PANTONE_JET_BLACK      = "#212322";  // Pantone 419 — shadows

module.exports = function generateLightWorkbench(palette) {
  const l = palette.light;
  const p = palette;

  // Use primary directly — it's a real Pantone color
  const primaryOnLight = p.primary;

  // Adaptive foreground: use pantoneWhite on dark primaries, pantoneBlack on bright primaries
  const onPrimary = contrastRatio(p.pantoneWhite, primaryOnLight) >= 4.5
    ? p.pantoneWhite
    : p.pantoneBlack;

  // Shadow from real Pantone black
  const shadow = alpha(PANTONE_JET_BLACK, 0.08);

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
    "editorIndentGuide.background": alpha(p.lightPunctuation, 0.20),
    "editorIndentGuide.activeBackground": alpha(p.lightPunctuation, 0.45),
    "editorWhitespace.foreground": alpha(p.lightPunctuation, 0.20),
    "editorRuler.foreground": alpha(p.lightPunctuation, 0.15),
    "editorLineNumber.foreground": p.lightPunctuation,
    "editorLineNumber.activeForeground": p.lightVariable,
    "editorGutter.addedBackground": PANTONE_FOREST,
    "editorGutter.modifiedBackground": PANTONE_AMBER,
    "editorGutter.deletedBackground": PANTONE_TRUE_RED,
    "editorError.foreground": PANTONE_TRUE_RED,
    "editorWarning.foreground": PANTONE_AMBER,
    "editorInfo.foreground": p.string,

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
    "activityBar.inactiveForeground": p.lightComment,
    "activityBar.border": l.border,
    "activityBarBadge.background": p.string,
    "activityBarBadge.foreground": p.pantoneWhite,

    // Title Bar
    "titleBar.activeBackground": l.bgSecondary,
    "titleBar.activeForeground": l.fg,
    "titleBar.inactiveBackground": l.bgSecondary,
    "titleBar.inactiveForeground": p.lightComment,
    "titleBar.border": l.border,

    // Tabs
    "tab.activeBackground": l.bg,
    "tab.activeForeground": l.fg,
    "tab.inactiveBackground": l.bgSecondary,
    "tab.inactiveForeground": p.lightComment,
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
    "statusBar.debuggingBackground": p.string,
    "statusBar.debuggingForeground": p.pantoneWhite,
    "statusBar.noFolderBackground": l.bgTertiary,
    "statusBarItem.hoverBackground": alpha(p.pantoneWhite, 0.20),
    "statusBarItem.remoteBackground": primaryOnLight,
    "statusBarItem.remoteForeground": onPrimary,

    // Input
    "input.background": l.bg,
    "input.foreground": l.fg,
    "input.border": l.border,
    "input.placeholderForeground": p.lightComment,
    "inputOption.activeBorder": primaryOnLight,
    "inputValidation.errorBorder": PANTONE_TRUE_RED,
    "inputValidation.warningBorder": PANTONE_AMBER,
    "inputValidation.infoBorder": p.string,

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
    "button.hoverBackground": alpha(primaryOnLight, 0.85),
    "button.secondaryBackground": l.bgTertiary,
    "button.secondaryForeground": l.fg,

    // Badges
    "badge.background": primaryOnLight,
    "badge.foreground": onPrimary,

    // Scrollbar
    "scrollbar.shadow": shadow,
    "scrollbarSlider.background": alpha(p.lightPunctuation, 0.20),
    "scrollbarSlider.hoverBackground": alpha(p.lightPunctuation, 0.35),
    "scrollbarSlider.activeBackground": alpha(p.lightPunctuation, 0.50),

    // Minimap
    "minimap.background": l.bg,
    "minimap.findMatchHighlight": alpha(p.number, 0.50),
    "minimap.selectionHighlight": alpha(primaryOnLight, 0.30),

    // Panel
    "panel.background": l.bgSecondary,
    "panel.border": l.border,
    "panelTitle.activeBorder": primaryOnLight,
    "panelTitle.activeForeground": l.fg,
    "panelTitle.inactiveForeground": p.lightComment,

    // Terminal — all real Pantone colors
    "terminal.background": l.bgSecondary,
    "terminal.foreground": l.fg,
    "terminalCursor.foreground": primaryOnLight,
    "terminal.ansiBlack": p.lightVariable,
    "terminal.ansiRed": PANTONE_TRUE_RED,
    "terminal.ansiGreen": PANTONE_FOREST,
    "terminal.ansiYellow": PANTONE_AMBER,
    "terminal.ansiBlue": PANTONE_CLASSIC_BLUE,
    "terminal.ansiMagenta": PANTONE_WINE,
    "terminal.ansiCyan": PANTONE_TEAL,
    "terminal.ansiWhite": l.bg,
    "terminal.ansiBrightBlack": p.lightComment,
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
    "gitDecoration.ignoredResourceForeground": p.lightComment,

    // Breadcrumbs
    "breadcrumb.foreground": p.lightComment,
    "breadcrumb.focusForeground": p.lightVariable,
    "breadcrumb.activeSelectionForeground": p.lightVariable,

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
    "textLink.foreground": p.string,
    "textLink.activeForeground": p.string,
    "progressBar.background": primaryOnLight,
    "icon.foreground": p.lightComment,
    "descriptionForeground": p.lightComment,
  };
};
