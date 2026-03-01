'use strict';

module.exports = function generateTokenColors(syntax) {
  return [
    // COMMENTS
    {
      name: "Comments",
      scope: [
        "comment",
        "comment.line",
        "comment.block",
        "comment.block.documentation",
        "punctuation.definition.comment"
      ],
      settings: { foreground: syntax.comment, fontStyle: "italic" }
    },

    // KEYWORDS
    {
      name: "Keywords",
      scope: [
        "keyword",
        "keyword.control",
        "keyword.control.conditional",
        "keyword.control.loop",
        "keyword.control.flow",
        "keyword.control.import",
        "keyword.control.export",
        "keyword.control.from"
      ],
      settings: { foreground: syntax.keyword, fontStyle: "bold" }
    },
    {
      name: "Keyword operators",
      scope: [
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.instanceof",
        "keyword.operator.typeof",
        "keyword.operator.logical",
        "keyword.operator.delete"
      ],
      settings: { foreground: syntax.keyword, fontStyle: "bold" }
    },

    // STORAGE / LANGUAGE CONSTRUCTS
    {
      name: "Storage type (class, function, var, let, const)",
      scope: ["storage.type", "storage.modifier"],
      settings: { foreground: syntax.keyword, fontStyle: "bold" }
    },

    // STRINGS
    {
      name: "Strings",
      scope: [
        "string",
        "string.quoted",
        "string.quoted.single",
        "string.quoted.double",
        "string.quoted.triple",
        "string.template",
        "string.quoted.other"
      ],
      settings: { foreground: syntax.string, fontStyle: "" }
    },
    {
      name: "String interpolation",
      scope: [
        "string.interpolated",
        "punctuation.definition.template-expression",
        "punctuation.section.embedded"
      ],
      settings: { foreground: syntax.keyword, fontStyle: "" }
    },
    {
      name: "Regular expressions",
      scope: ["string.regexp"],
      settings: { foreground: syntax.string, fontStyle: "" }
    },

    // CONSTANTS / NUMBERS
    {
      name: "Numbers",
      scope: [
        "constant.numeric",
        "constant.numeric.integer",
        "constant.numeric.float",
        "constant.numeric.hex"
      ],
      settings: { foreground: syntax.number, fontStyle: "" }
    },
    {
      name: "Language constants (true, false, null)",
      scope: [
        "constant.language",
        "constant.language.boolean",
        "constant.language.null",
        "constant.language.undefined"
      ],
      settings: { foreground: syntax.constant, fontStyle: "bold" }
    },
    {
      name: "Other constants (ALL_CAPS, enums)",
      scope: ["variable.other.constant", "variable.other.enummember"],
      settings: { foreground: syntax.constant, fontStyle: "bold" }
    },
    {
      name: "Escape characters",
      scope: ["constant.character.escape"],
      settings: { foreground: syntax.operator, fontStyle: "" }
    },

    // TYPES / INTERFACES
    {
      name: "Type names and interfaces",
      scope: [
        "entity.name.type",
        "entity.name.type.class",
        "entity.name.type.interface",
        "entity.name.type.enum",
        "entity.name.type.alias",
        "entity.name.type.module",
        "support.type",
        "support.type.builtin"
      ],
      settings: { foreground: syntax.type, fontStyle: "italic" }
    },
    {
      name: "Type parameters (generics <T>)",
      scope: ["entity.name.type.parameter"],
      settings: { foreground: syntax.type, fontStyle: "italic" }
    },

    // FUNCTIONS
    {
      name: "Function declarations",
      scope: ["entity.name.function", "meta.function entity.name.function"],
      settings: { foreground: syntax.function, fontStyle: "bold" }
    },
    {
      name: "Function calls",
      scope: ["meta.function-call entity.name.function", "support.function"],
      settings: { foreground: syntax.function, fontStyle: "" }
    },
    {
      name: "Method calls",
      scope: ["meta.method-call entity.name.function", "entity.name.function.member"],
      settings: { foreground: syntax.function, fontStyle: "" }
    },

    // VARIABLES
    {
      name: "Variables",
      scope: ["variable", "variable.other", "variable.other.readwrite"],
      settings: { foreground: syntax.variable, fontStyle: "" }
    },
    {
      name: "Parameters",
      scope: ["variable.parameter"],
      settings: { foreground: syntax.variable, fontStyle: "italic" }
    },
    {
      name: "Language variables (this, self, super)",
      scope: ["variable.language", "variable.language.this", "variable.language.self", "variable.language.super"],
      settings: { foreground: syntax.keyword, fontStyle: "italic" }
    },
    {
      name: "Object properties",
      scope: ["variable.other.property", "variable.other.object.property", "meta.object-literal.key"],
      settings: { foreground: syntax.variable, fontStyle: "" }
    },

    // CLASSES
    {
      name: "Class names",
      scope: ["entity.name.class", "entity.name.type.class", "support.class"],
      settings: { foreground: syntax.className, fontStyle: "bold italic" }
    },
    {
      name: "Inherited classes",
      scope: ["entity.other.inherited-class"],
      settings: { foreground: syntax.className, fontStyle: "italic" }
    },

    // HTML / JSX / MARKUP TAGS
    {
      name: "HTML/XML tags",
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: { foreground: syntax.tag, fontStyle: "bold" }
    },
    {
      name: "HTML/XML attributes",
      scope: ["entity.other.attribute-name"],
      settings: { foreground: syntax.attribute, fontStyle: "italic" }
    },

    // OPERATORS & PUNCTUATION
    {
      name: "Operators",
      scope: [
        "keyword.operator",
        "keyword.operator.arithmetic",
        "keyword.operator.assignment",
        "keyword.operator.comparison",
        "keyword.operator.ternary"
      ],
      settings: { foreground: syntax.operator, fontStyle: "" }
    },
    {
      name: "Punctuation",
      scope: ["punctuation", "punctuation.separator", "punctuation.terminator", "meta.brace"],
      settings: { foreground: syntax.punctuation, fontStyle: "" }
    },

    // DECORATORS
    {
      name: "Decorators / Annotations",
      scope: ["meta.decorator", "meta.decorator entity.name.function", "punctuation.decorator"],
      settings: { foreground: syntax.type, fontStyle: "italic" }
    },

    // CSS
    {
      name: "CSS properties",
      scope: ["support.type.property-name.css", "support.type.vendored.property-name.css"],
      settings: { foreground: syntax.type, fontStyle: "" }
    },
    {
      name: "CSS selectors",
      scope: ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css"],
      settings: { foreground: syntax.className, fontStyle: "bold" }
    },
    {
      name: "CSS values",
      scope: ["support.constant.property-value.css", "support.constant.color.css"],
      settings: { foreground: syntax.constant, fontStyle: "" }
    },
    {
      name: "CSS units",
      scope: ["keyword.other.unit.css"],
      settings: { foreground: syntax.number, fontStyle: "" }
    },

    // JSON
    {
      name: "JSON keys",
      scope: ["support.type.property-name.json"],
      settings: { foreground: syntax.type, fontStyle: "" }
    },

    // MARKDOWN
    {
      name: "Markdown headings",
      scope: ["markup.heading", "markup.heading entity.name", "entity.name.section.markdown"],
      settings: { foreground: syntax.keyword, fontStyle: "bold" }
    },
    {
      name: "Markdown bold",
      scope: ["markup.bold"],
      settings: { foreground: syntax.constant, fontStyle: "bold" }
    },
    {
      name: "Markdown italic",
      scope: ["markup.italic"],
      settings: { foreground: syntax.type, fontStyle: "italic" }
    },
    {
      name: "Markdown inline code",
      scope: ["markup.inline.raw", "markup.raw"],
      settings: { foreground: syntax.string, fontStyle: "" }
    },
    {
      name: "Markdown links",
      scope: ["markup.underline.link"],
      settings: { foreground: syntax.function, fontStyle: "" }
    },
    {
      name: "Markdown quotes",
      scope: ["markup.quote"],
      settings: { foreground: syntax.comment, fontStyle: "italic" }
    },

    // DIFF
    {
      name: "Diff inserted",
      scope: ["markup.inserted"],
      settings: { foreground: "#88b04b" }
    },
    {
      name: "Diff deleted",
      scope: ["markup.deleted"],
      settings: { foreground: "#dd4132" }
    },
    {
      name: "Diff changed",
      scope: ["markup.changed"],
      settings: { foreground: "#efc050" }
    }
  ];
};
