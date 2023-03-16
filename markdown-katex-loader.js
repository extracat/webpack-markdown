const { marked } = require('marked');
const katex = require("katex");

module.exports = function (markdown) {
    const options = this.getOptions();
    this.cacheable();

    marked.setOptions(options);

    // Process LaTeX
    markdown = markdown.replace(/\$\$[^\$]*\$\$/gm, (match) => { // Block LaTeX
        return katex.renderToString(match.replace(/\$\$/g, ''), {displayMode: true});
    }).replace(/\$[^\$]*\$/gm, (match) => {                      // Inline LaTeX
        return katex.renderToString(match.replace(/\$/g, ''), {displayMode: false});
    })

    // Process Markdown
    markdown = marked(markdown);

    if (options.div){
        markdown = `<div>${markdown}</div>`;
    }

    return markdown;
};
