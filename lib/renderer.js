const electron = require('electron')

const ipc = electron.ipcRenderer
const remote = electron.remote
const clipboard = remote.clipboard
const shell = electron.shell

const $ = require('jquery')
const mainProcess = remote.require('./main')

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
                .use(require('markdown-it-container'), 'slide', {
                        render: function (tokens, idx) {
                                //var m = tokens[idx].info.trim().match(/^slide\s+(.*)$/);
                                
                                if (tokens[idx].nesting === 1) {
                                  // opening tag
                                  return '<section>\n';
                                } else {
                                  // closing tag
                                  return '</section>\n';
                                }
                          }
                        })
                .use(require('markdown-it-container'), 'slide2', {
                        render: function (tokens, idx) {
                                if (!tokens[idx].markup.length) {
                                        return;
                                }
                                //var m = tokens[idx].info.trim().match(/^slide\s+(.*)$/);
                                
                                if (tokens[idx].nesting === 1) {
                                  // opening tag
                                  return '<section>\n';
                                } else {
                                  // closing tag
                                  return '</section>\n';
                                }
                            
                          }
                        })
                .use(require('markdown-it-classy'))
        ;

const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');
const previewEl = document.querySelector('.preview .slides');
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $saveMdButton = $('#save-md')
const $copyHtmlButton = $('#copy-html')
const $showInFileSystemButton = $('#show-in-file-system')
const $openInDefaultEditorButton = $('#open-in-default-editor')

let currentFile = null
var previewOn = false;


function insertAtCursor(myValue) {
        var myField = document.querySelector('.raw-markdown');
    if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

function initReveal(options) {
        // More info https://github.com/hakimel/reveal.js#configuration
        if (!Reveal.isReady()) {
                Reveal.initialize({
                        controls: true,
                        progress: true,
                        history: true,
                        center: true,
                
                        transition: options.transition,
                
                        // More info https://github.com/hakimel/reveal.js#dependencies
                        dependencies: [
                                { src: '../node_modules/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
                                { src: '../node_modules/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
                                { src: '../node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true },
                                { src: '../node_modules/reveal.js/plugin/notes/notes.js', async: true }
                        ]
                });        
        } else {
                Reveal.configure(options);
        }
        
        Reveal.slide(0);
}

function updateThemeCss(theme) {
        document.getElementById('themeCss').href = `../node_modules/reveal.js/css/theme/${theme}.css`;
}

function addRevealCss(options) {
        var revealCss = document.createElement('link');
        var themeCss = document.createElement('link');
        var zenBurnCss = document.createElement('link');
        var printCss = document.createElement( 'link' );
        revealCss.rel = themeCss.rel = zenBurnCss.rel = printCss.rel = 'stylesheet';
        revealCss.type = themeCss.type = zenBurnCss.type = printCss.type = 'text/css';
        revealCss.href = '../node_modules/reveal.js/css/reveal.css';
        revealCss.id = 'revealCss';
        themeCss.id = 'themeCss';
        zenBurnCss.href = '../node_modules/reveal.js/lib/css/zenburn.css';
        zenBurnCss.id = 'zenBurnCss';
	printCss.href = window.location.search.match( /print-pdf/gi ) ? '../node_modules/reveal.js/css/print/pdf.css' : '../node_modules/reveal.js/css/print/paper.css';
        printCss.id = 'printCss';
			
        document.head.appendChild(revealCss);
        document.head.appendChild(themeCss);
        document.head.appendChild(zenBurnCss);
        document.head.appendChild(printCss);
        updateThemeCss(options.theme);
}

function removeRevealCss() {
        var revealCss = document.getElementById('revealCss');
        var themeCss = document.getElementById('theme');
        var zenBurnCss = document.getElementById('zenBurnCss');
        var printCss = document.getElementById( 'printCss' );
        
        document.head.removeChild(revealCss);
        document.head.removeChild(themeCss);
        document.head.removeChild(zenBurnCss);
        document.head.removeChild(printCss);
}

ipc
        .on('file-opened', (event, file, content) => {
            currentFile = file
        
            $showInFileSystemButton.attr('disabled', false)
            $openInDefaultEditorButton.attr('disabled', false)
        
            $markdownView.val(content)
            renderMarkdownToHtml(content)
        })
        .on('insert', (event, content)=>{
                insertAtCursor(`:::${content}\n:::\n`);
        })
        .on('togglePreview', (event, showPreview, options)=>{                
                if (showPreview) {
                        previewOn = true;
                        document.body.classList.add('previewOn');
                        initReveal(options);
			addRevealCss(options);
                } else {
                        previewOn = false;
                        document.body.classList.remove('previewOn');
                        removeRevealCss();
                }
        })
        .on('themeChange', (event, theme) => {
                if (previewOn) {
                        updateThemeCss(theme);
                }
        })
        .on('transitionEffectChange', (event, transition) => {
                if (previewOn) {
                        Reveal.configure({transition})
                }
        })
;

function renderMarkdownToHtml(markdown) {
    const html = md.render(markdown)
    $htmlView.html(html)
    previewEl.innerHTML = html
}

$markdownView.on('keyup', (event) => {
    const content = $(event.target)
        .val()
    renderMarkdownToHtml(content)
})

$openFileButton.on('click', () => {
    mainProcess.openFile()
})

$copyHtmlButton.on('click', () => {
    const html = $htmlView.html()
    clipboard.writeText(html)
})

$saveFileButton.on('click', () => {
    const html = $htmlView.html()
    mainProcess.saveFile(html)
});

$saveMdButton.on('click', () => {
    const md = $markdownView.val();
    mainProcess.saveMd(md);
});

$(document)
    .on('click', 'a[href^="http"]', (event) => {
        event.preventDefault()
        shell.openExternal(event.target.href)
    })

$showInFileSystemButton.on('click', () => {
    shell.showItemInFolder(currentFile)
})

$openInDefaultEditorButton.on('click', () => {
    shell.openItem(currentFile)
})