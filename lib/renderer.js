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

const $markdownView = $('.raw-markdown')
const $htmlView = $('.rendered-html')
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $saveMdButton = $('#save-md')
const $copyHtmlButton = $('#copy-html')
const $showInFileSystemButton = $('#show-in-file-system')
const $openInDefaultEditorButton = $('#open-in-default-editor')

let currentFile = null

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
;

function renderMarkdownToHtml(markdown) {
    const html = md.render(markdown)
    $htmlView.html(html)
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