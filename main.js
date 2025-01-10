const { Plugin } = require("obsidian");
const { SearchCursor } = require("@codemirror/search");
const { RangeSetBuilder } = require("@codemirror/state");
const { Decoration, ViewPlugin } = require("@codemirror/view");

const KeywordHighlighterPlugin = {
  settings: {
    keywords: [
      { keyword: "MUST", style: { color: "#ff4500", fontWeight: "bold" } },
      { keyword: "REQUIRED", style: { color: "#ff4500", fontWeight: "bold" } },
      { keyword: "SHALL", style: { color: "#ff4500", fontWeight: "bold" } },
      { keyword: "MUST NOT", style: { color: "#ff4500", fontWeight: "bold" } },
      { keyword: "SHOULD", style: { color: "#ffa500", fontWeight: "bold" } },
      { keyword: "RECOMMENDED", style: { color: "#ffa500", fontWeight: "bold" } },
      { keyword: "SHOULD NOT", style: { color: "#ffa500", fontWeight: "bold" } },
      { keyword: "NOT RECOMMEDED", style: { color: "#ffa500", fontWeight: "bold" } },
      { keyword: "MAY", style: { color: "#008000", fontWeight: "bold" } },
      { keyword: "OPTIONAL", style: { color: "#008000", fontWeight: "bold" } },
    ],
  },
};

function highlightMark(keyword) {
  return Decoration.mark({
    attributes: {
      style: `color: ${keyword.style.color}; font-weight: ${keyword.style.fontWeight};`,
    },
  });
}

class EditorHighlighter {
  constructor(view) {
    this.decorations = this.buildDecorations(view);
  }

  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  buildDecorations(view) {
    const builder = new RangeSetBuilder();
    const newDecorations = [];

    KeywordHighlighterPlugin.settings.keywords
      .filter((keyword) => !!keyword.keyword)
      .forEach((k) =>
        newDecorations.push(...this.buildDecorationsForKeyword(view, k))
      );
    newDecorations.sort((a, b) => a.from - b.from);
    newDecorations.forEach((d) => builder.add(d.from, d.to, d.decoration));

    return builder.finish();
  }

  buildDecorationsForKeyword(view, keyword) {
    const newDecorations = [];
    const cursor = new SearchCursor(view.state.doc, `${keyword.keyword}`);
    cursor.next();
    while (!cursor.done) {
      newDecorations.push({
        from: cursor.value.from,
        to: cursor.value.to,
        decoration: highlightMark(keyword),
      });
      cursor.next();
    }
    return newDecorations;
  }
}

const editorHighlighter = ViewPlugin.fromClass(EditorHighlighter, {
  decorations: (value) => value.decorations,
});

module.exports = class RFC2119Highlighter extends Plugin {
  async onload() {
    console.log("Loading RFC 2119 Highlighter plugin...");

    this.registerEditorExtension(editorHighlighter);
  }

  onunload() {
    console.log("Unloading RFC 2119 Highlighter plugin...");
  }
};
