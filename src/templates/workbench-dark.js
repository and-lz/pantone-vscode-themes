'use strict';

const { alpha, lighten, darken, mix, contrastRatio } = require('../utils/color');

// Pantone functional colors (all from Pantone catalog)
const PANTONE_GREENERY    = "#88b04b";  // Pantone 2017 — git added, diff inserted
const PANTONE_MIMOSA      = "#efc050";  // Pantone 2009 — warnings, diff changed
const PANTONE_TANGO       = "#dd4132";  // Pantone 2012 — errors, diff deleted
const PANTONE_ORCHID      = "#b163a3";  // Pantone 2014 — terminal magenta
const PANTONE_TURQUOISE   = "#45b5aa";  // Pantone 2010 — terminal cyan
const PANTONE_CLASSIC_BLUE = "#0f4c81"; // Pantone 2020 — terminal blue
const PANTONE_CORAL       = "#ff6f61";  // Pantone 2019 — conflicts

module.exports = function generateDarkWorkbench(palette) {
  const d = palette.dark;
  const p = palette;

  // Adaptive foreground: use pantoneWhite on dark primaries, dark bg on bright primaries
  const onPrimary = contrastRatio(p.pantoneWhite, p.primary) >= 4.5
    ? p.pantoneWhite
    : darken(p.primary, 85);

  // Shadow derived from primary Pantone color
  const shadow = alpha(darken(p.primary, 90), 0.27);

  return {
    // Editor
    "editor.background": d.bg,
    "editor.foreground": d.fg,
    "editorCursor.foreground": p.primary,
    "editor.selectionBackground": alpha(p.primary, 0.30),
    "editor.inactiveSelectionBackground": alpha(p.primary, 0.15),
    "editor.lineHighlightBackground": alpha(p.primary, 0.10),
    "editor.lineHighlightBorder": alpha(p.primary, 0),
    "editor.findMatchBackground": alpha(p.number, 0.40),
    "editor.findMatchHighlightBackground": alpha(p.number, 0.20),
    "editor.wordHighlightBackground": alpha(p.primary, 0.20),
    "editorBracketMatch.background": alpha(p.primary, 0.25),
    "editorBracketMatch.border": alpha(p.primary, 0.60),
    "editorIndentGuide.background": alpha(d.fg, 0.08),
    "editorIndentGuide.activeBackground": alpha(d.fg, 0.20),
    "editorWhitespace.foreground": alpha(d.fg, 0.10),
    "editorRuler.foreground": alpha(d.fg, 0.08),
    "editorLineNumber.foreground": d.fgDimmed,
    "editorLineNumber.activeForeground": d.fg,
    "editorGutter.addedBackground": PANTONE_GREENERY,
    "editorGutter.modifiedBackground": PANTONE_MIMOSA,
    "editorGutter.deletedBackground": PANTONE_TANGO,
    "editorError.foreground": PANTONE_TANGO,
    "editorWarning.foreground": PANTONE_MIMOSA,
    "editorInfo.foreground": p.string,

    // Sidebar
    "sideBar.background": d.bgTertiary,
    "sideBar.foreground": d.fg,
    "sideBar.border": d.border,
    "sideBarTitle.foreground": d.fg,
    "sideBarSectionHeader.background": alpha(p.primary, 0.15),
    "sideBarSectionHeader.foreground": d.fg,

    // Activity Bar
    "activityBar.background": d.bgSecondary,
    "activityBar.foreground": p.primary,
    "activityBar.inactiveForeground": d.fgDimmed,
    "activityBar.border": d.border,
    "activityBarBadge.background": p.string,
    "activityBarBadge.foreground": p.pantoneWhite,

    // Title Bar
    "titleBar.activeBackground": d.bgSecondary,
    "titleBar.activeForeground": d.fg,
    "titleBar.inactiveBackground": d.bgSecondary,
    "titleBar.inactiveForeground": d.fgDimmed,
    "titleBar.border": d.border,

    // Tabs
    "tab.activeBackground": d.bg,
    "tab.activeForeground": d.fg,
    "tab.inactiveBackground": d.bgSecondary,
    "tab.inactiveForeground": d.fgDimmed,
    "tab.activeBorder": p.primary,
    "tab.activeBorderTop": alpha(p.primary, 0),
    "tab.border": d.border,
    "editorGroupHeader.tabsBackground": d.bgSecondary,
    "editorGroupHeader.tabsBorder": d.border,
    "editorGroup.border": d.border,

    // Status Bar
    "statusBar.background": darken(p.primary, 40),
    "statusBar.foreground": lighten(p.primary, 40),
    "statusBar.border": d.border,
    "statusBar.debuggingBackground": p.string,
    "statusBar.debuggingForeground": p.pantoneWhite,
    "statusBar.noFolderBackground": d.bgSecondary,
    "statusBarItem.hoverBackground": alpha(p.primary, 0.30),
    "statusBarItem.remoteBackground": p.primary,
    "statusBarItem.remoteForeground": onPrimary,

    // Input
    "input.background": d.bgSecondary,
    "input.foreground": d.fg,
    "input.border": d.border,
    "input.placeholderForeground": d.fgDimmed,
    "inputOption.activeBorder": p.primary,
    "inputValidation.errorBorder": PANTONE_TANGO,
    "inputValidation.warningBorder": PANTONE_MIMOSA,
    "inputValidation.infoBorder": p.string,

    // Dropdown
    "dropdown.background": d.bgSecondary,
    "dropdown.foreground": d.fg,
    "dropdown.border": d.border,

    // Lists
    "list.activeSelectionBackground": alpha(p.primary, 0.30),
    "list.activeSelectionForeground": d.fg,
    "list.hoverBackground": alpha(p.primary, 0.15),
    "list.inactiveSelectionBackground": alpha(p.primary, 0.15),
    "list.focusBackground": alpha(p.primary, 0.20),
    "list.highlightForeground": p.primary,

    // Buttons
    "button.background": p.primary,
    "button.foreground": onPrimary,
    "button.hoverBackground": lighten(p.primary, 10),
    "button.secondaryBackground": d.bgTertiary,
    "button.secondaryForeground": d.fg,

    // Badges
    "badge.background": p.primary,
    "badge.foreground": onPrimary,

    // Scrollbar
    "scrollbar.shadow": shadow,
    "scrollbarSlider.background": alpha(d.fg, 0.12),
    "scrollbarSlider.hoverBackground": alpha(d.fg, 0.25),
    "scrollbarSlider.activeBackground": alpha(d.fg, 0.35),

    // Minimap
    "minimap.background": d.bg,
    "minimap.findMatchHighlight": alpha(p.number, 0.60),
    "minimap.selectionHighlight": alpha(p.primary, 0.40),

    // Panel
    "panel.background": d.bgSecondary,
    "panel.border": d.border,
    "panelTitle.activeBorder": p.primary,
    "panelTitle.activeForeground": d.fg,
    "panelTitle.inactiveForeground": d.fgDimmed,

    // Terminal — all Pantone colors
    "terminal.background": d.bgSecondary,
    "terminal.foreground": d.fg,
    "terminalCursor.foreground": p.primary,
    "terminal.ansiBlack": d.bg,
    "terminal.ansiRed": PANTONE_TANGO,
    "terminal.ansiGreen": PANTONE_GREENERY,
    "terminal.ansiYellow": PANTONE_MIMOSA,
    "terminal.ansiBlue": mix(p.primary, PANTONE_CLASSIC_BLUE, 0.5),
    "terminal.ansiMagenta": PANTONE_ORCHID,
    "terminal.ansiCyan": PANTONE_TURQUOISE,
    "terminal.ansiWhite": d.fg,
    "terminal.ansiBrightBlack": d.fgDimmed,
    "terminal.ansiBrightRed": lighten(PANTONE_TANGO, 15),
    "terminal.ansiBrightGreen": lighten(PANTONE_GREENERY, 15),
    "terminal.ansiBrightYellow": lighten(PANTONE_MIMOSA, 15),
    "terminal.ansiBrightBlue": lighten(PANTONE_CLASSIC_BLUE, 25),
    "terminal.ansiBrightMagenta": lighten(PANTONE_ORCHID, 15),
    "terminal.ansiBrightCyan": lighten(PANTONE_TURQUOISE, 15),
    "terminal.ansiBrightWhite": p.pantoneWhite,

    // Git Decorations — all Pantone colors
    "gitDecoration.addedResourceForeground": PANTONE_GREENERY,
    "gitDecoration.modifiedResourceForeground": PANTONE_MIMOSA,
    "gitDecoration.deletedResourceForeground": PANTONE_TANGO,
    "gitDecoration.untrackedResourceForeground": PANTONE_GREENERY,
    "gitDecoration.conflictingResourceForeground": PANTONE_CORAL,
    "gitDecoration.ignoredResourceForeground": d.fgDimmed,

    // Breadcrumbs
    "breadcrumb.foreground": d.fgDimmed,
    "breadcrumb.focusForeground": d.fg,
    "breadcrumb.activeSelectionForeground": d.fg,

    // Notifications
    "notifications.background": d.bgTertiary,
    "notifications.foreground": d.fg,
    "notificationLink.foreground": p.primary,

    // Peek View
    "peekView.border": p.primary,
    "peekViewEditor.background": d.bgSecondary,
    "peekViewResult.background": d.bgTertiary,
    "peekViewTitle.background": d.bgSecondary,

    // Widget
    "editorWidget.background": d.bgSecondary,
    "editorWidget.border": d.border,
    "editorSuggestWidget.selectedBackground": alpha(p.primary, 0.25),

    // Focus & Misc
    "focusBorder": alpha(p.primary, 0.60),
    "selection.background": alpha(p.primary, 0.30),
    "textLink.foreground": p.string,
    "textLink.activeForeground": lighten(p.string, 15),
    "progressBar.background": p.primary,
    "icon.foreground": d.fgDimmed,
    "descriptionForeground": d.fgDimmed,
  };
};
