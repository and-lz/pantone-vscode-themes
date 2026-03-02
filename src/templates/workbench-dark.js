'use strict';

const { alpha, contrastRatio } = require('../utils/color');

// Pantone functional colors — all from Pantone catalog
const PANTONE_GREENERY     = "#88b04b";  // Pantone 2017 — git added, diff inserted
const PANTONE_MIMOSA       = "#efc050";  // Pantone 2009 — warnings, diff changed
const PANTONE_TANGO        = "#dd4132";  // Pantone 2012 — errors, diff deleted
const PANTONE_ORCHID       = "#b163a3";  // Pantone 2014 — terminal magenta
const PANTONE_TURQUOISE    = "#45b5aa";  // Pantone 2010 — terminal cyan
const PANTONE_CLASSIC_BLUE = "#0f4c81";  // Pantone 2020 — terminal blue
const PANTONE_CORAL        = "#ff6f61";  // Pantone 2019 — conflicts

// Terminal bright variants — real Pantone catalog colors (not lighten() derivatives)
const PANTONE_WARM_RED     = "#f9423a";  // Pantone 032 — bright red
const PANTONE_SKY_BLUE     = "#2c9fd9";  // Pantone 2925 — bright blue
const PANTONE_FUCHSIA_ROSE = "#c74375";  // Pantone 2001 — bright magenta
const PANTONE_AQUA_SKY     = "#7bc4e2";  // Pantone 2003 — bright cyan
const PANTONE_JET_BLACK    = "#212322";  // Pantone 419 — shadows

module.exports = function generateDarkWorkbench(palette) {
  const d = palette.dark;
  const p = palette;

  // Adaptive foreground: use pantoneWhite on dark primaries, pantoneBlack on bright primaries
  const onPrimary = contrastRatio(p.pantoneWhite, p.primary) >= 4.5
    ? p.pantoneWhite
    : p.pantoneBlack;

  // Shadow from real Pantone black
  const shadow = alpha(PANTONE_JET_BLACK, 0.27);

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
    "editorIndentGuide.background": alpha(p.punctuation, 0.20),
    "editorIndentGuide.activeBackground": alpha(p.punctuation, 0.45),
    "editorWhitespace.foreground": alpha(p.punctuation, 0.20),
    "editorRuler.foreground": alpha(p.punctuation, 0.15),
    "editorLineNumber.foreground": p.punctuation,
    "editorLineNumber.activeForeground": p.variable,
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
    "activityBar.inactiveForeground": p.comment,
    "activityBar.border": d.border,
    "activityBarBadge.background": p.string,
    "activityBarBadge.foreground": p.pantoneWhite,

    // Title Bar
    "titleBar.activeBackground": d.bgSecondary,
    "titleBar.activeForeground": d.fg,
    "titleBar.inactiveBackground": d.bgSecondary,
    "titleBar.inactiveForeground": p.comment,
    "titleBar.border": d.border,

    // Tabs
    "tab.activeBackground": d.bg,
    "tab.activeForeground": d.fg,
    "tab.inactiveBackground": d.bgSecondary,
    "tab.inactiveForeground": p.comment,
    "tab.activeBorder": p.primary,
    "tab.activeBorderTop": alpha(p.primary, 0),
    "tab.border": d.border,
    "editorGroupHeader.tabsBackground": d.bgSecondary,
    "editorGroupHeader.tabsBorder": d.border,
    "editorGroup.border": d.border,

    // Status Bar
    "statusBar.background": p.primary,
    "statusBar.foreground": onPrimary,
    "statusBar.border": d.border,
    "statusBar.debuggingBackground": p.string,
    "statusBar.debuggingForeground": p.pantoneWhite,
    "statusBar.noFolderBackground": d.bgSecondary,
    "statusBarItem.hoverBackground": alpha(p.pantoneWhite, 0.20),
    "statusBarItem.remoteBackground": p.primary,
    "statusBarItem.remoteForeground": onPrimary,

    // Input
    "input.background": d.bgSecondary,
    "input.foreground": d.fg,
    "input.border": d.border,
    "input.placeholderForeground": p.comment,
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
    "button.hoverBackground": alpha(p.primary, 0.85),
    "button.secondaryBackground": d.bgTertiary,
    "button.secondaryForeground": d.fg,

    // Badges
    "badge.background": p.primary,
    "badge.foreground": onPrimary,

    // Scrollbar
    "scrollbar.shadow": shadow,
    "scrollbarSlider.background": alpha(p.punctuation, 0.25),
    "scrollbarSlider.hoverBackground": alpha(p.punctuation, 0.40),
    "scrollbarSlider.activeBackground": alpha(p.punctuation, 0.55),

    // Minimap
    "minimap.background": d.bg,
    "minimap.findMatchHighlight": alpha(p.number, 0.60),
    "minimap.selectionHighlight": alpha(p.primary, 0.40),

    // Panel
    "panel.background": d.bgSecondary,
    "panel.border": d.border,
    "panelTitle.activeBorder": p.primary,
    "panelTitle.activeForeground": d.fg,
    "panelTitle.inactiveForeground": p.comment,

    // Terminal — all real Pantone colors
    "terminal.background": d.bgSecondary,
    "terminal.foreground": d.fg,
    "terminalCursor.foreground": p.primary,
    "terminal.ansiBlack": d.bg,
    "terminal.ansiRed": PANTONE_TANGO,
    "terminal.ansiGreen": PANTONE_GREENERY,
    "terminal.ansiYellow": PANTONE_MIMOSA,
    "terminal.ansiBlue": PANTONE_CLASSIC_BLUE,
    "terminal.ansiMagenta": PANTONE_ORCHID,
    "terminal.ansiCyan": PANTONE_TURQUOISE,
    "terminal.ansiWhite": p.variable,
    "terminal.ansiBrightBlack": p.comment,
    "terminal.ansiBrightRed": PANTONE_WARM_RED,
    "terminal.ansiBrightGreen": PANTONE_GREENERY,
    "terminal.ansiBrightYellow": PANTONE_MIMOSA,
    "terminal.ansiBrightBlue": PANTONE_SKY_BLUE,
    "terminal.ansiBrightMagenta": PANTONE_FUCHSIA_ROSE,
    "terminal.ansiBrightCyan": PANTONE_AQUA_SKY,
    "terminal.ansiBrightWhite": p.pantoneWhite,

    // Git Decorations — all Pantone colors
    "gitDecoration.addedResourceForeground": PANTONE_GREENERY,
    "gitDecoration.modifiedResourceForeground": PANTONE_MIMOSA,
    "gitDecoration.deletedResourceForeground": PANTONE_TANGO,
    "gitDecoration.untrackedResourceForeground": PANTONE_GREENERY,
    "gitDecoration.conflictingResourceForeground": PANTONE_CORAL,
    "gitDecoration.ignoredResourceForeground": p.comment,

    // Breadcrumbs
    "breadcrumb.foreground": p.comment,
    "breadcrumb.focusForeground": p.variable,
    "breadcrumb.activeSelectionForeground": p.variable,

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
    "textLink.activeForeground": p.string,
    "progressBar.background": p.primary,
    "icon.foreground": p.comment,
    "descriptionForeground": p.comment,
  };
};
