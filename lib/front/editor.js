const md = require('./mdConverter');

const markdownViewEl = document.querySelector('.raw-markdown');
const htmlViewEl = document.querySelector('.rendered-html');
const previewEl = document.querySelector('.preview .slides');

function getCurrentEditLine() {
    var caretPos = markdownViewEl.selectionStart;
    var start;
    var end;

    for (start = caretPos - 1; start >= 0 && markdownViewEl.value[start - 1] != "\n"; --start);
    for (end = caretPos; end < markdownViewEl.value.length && markdownViewEl.value[end] != "\n"; ++end);

    return {
        start,
        end,
        text: markdownViewEl.value.substring(start, end)
    };
}

function pad(value, sorroundingText, start, end) {
    var padValue = value;

    if (sorroundingText[end] !== ' ') {
        padValue = padValue + ' ';
    }
    if (sorroundingText[start] !== ' ') {
        padValue = ' ' + padValue;
    }

    return padValue;
}

function replace(value, pattern) {
    var line = getCurrentEditLine();
    var re = new RegExp(pattern);
    var newLine;

    if (line.text.match(re)) {
        newLine = line.text.replace(re, value);
    } else {
        newLine = line.text + pad(value, line.text, line.text.length - 1, line.text.length - 1);
    }

    return {
        start: line.start,
        end: line.end,
        text: newLine
    }
}

function insertReplaceAtCursor(value, pattern) {
    if (markdownViewEl.selectionStart || markdownViewEl.selectionStart == '0') {
        let start;
        let end;
        let valueToInsert;
        let trimValue = value.trim();
        let finalPosition;

        if (pattern) {
            let line = replace(trimValue, pattern);
            start = line.start;
            end = line.end;
            valueToInsert = line.text;
        } else {
            start = markdownViewEl.selectionStart;
            end = markdownViewEl.selectionEnd;
            valueToInsert = value.match(/:::slide/)? value : pad(value, markdownViewEl.value, start - 1, end);
        }

        markdownViewEl.value = markdownViewEl.value.substring(0, start) + valueToInsert + markdownViewEl.value.substring(end, markdownViewEl.value.length);
        
        finalPosition = Boolean(valueToInsert.match(/::::?slide/))? start + valueToInsert.match(/::::?slide[^\n]*(\n|$)/)[0].length : start + valueToInsert.length;
        markdownViewEl.selectionStart = markdownViewEl.selectionEnd = finalPosition;
    } else {
        markdownViewEl.value += value;
    }
}

function renderMarkdownToHtml(markdown) {
    const html = md.render(markdown);

    htmlViewEl.innerHTML = html;
    previewEl.innerHTML = html;
}

function insert(content, pattern) {
    insertReplaceAtCursor(content, pattern);
    renderMarkdownToHtml(markdownViewEl.value);
}

function getHtml() {
    return htmlViewEl.innerHTML;
}

function getMd() {
    return markdownViewEl.value;
}

function setMdContent(content) {
    markdownViewEl.value = content;
    renderMarkdownToHtml(content);    
}

function resetPreview() {
    previewEl.innerHTML = '';
    
    return this
}

function renderMd() {
    renderMarkdownToHtml(markdownViewEl.value);
    
    return this;
}

markdownViewEl.addEventListener('keyup', (event) => {
    const content = event.target.value;

    renderMarkdownToHtml(content);
});

module.exports = {
    insert,
    getHtml,
    getMd,
    setMdContent,
    resetPreview,
    renderMd,
    getCurrentEditLine
}