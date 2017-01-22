const md = require('./mdConverter');

const markdownViewEl = document.querySelector('.raw-markdown');
const htmlViewEl = document.querySelector('.rendered-html');
const previewEl = document.querySelector('.preview .slides');



function renderMarkdownToHtml(markdown) {
    return md.render(markdown);
}

function insert(content, pattern) {
    insertReplaceAtCursor(content, pattern);
}

module.exports = {
    insert,
    renderMarkdownToHtml,
    getCurrentEditLine
}