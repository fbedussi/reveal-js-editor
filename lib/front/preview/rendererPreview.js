const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const mainProcess = remote.require('./main');

slideWrapperEl = document.querySelector('.slides');
revealIntEl = document.querySelector('#revealInit');

function initContentAndTheme(content, theme) {
        document.querySelector('#theme').href = `../../../node_modules/reveal.js/css/theme/${theme}.css`;
        slideWrapperEl.innerHTML = content;    
}

ipc
    .on('init', (ev, content, configuration, theme) => {
        initContentAndTheme(content, theme);
        configuration.dependencies = [
					{ src: '../../../node_modules/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: '../../../node_modules/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: '../../../node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true },
					{ src: '../../../node_modules/reveal.js/plugin/notes/notes.js', async: true }
				]
        Reveal.initialize(configuration);
    })
    .on('refresh', (ev, content, configuration, theme) => {
        initContentAndTheme(content, theme);
        Reveal.configure(configuration);
        Reveal.slide(0)
    })
;

document.querySelector('#reloadButton').addEventListener('click', ()=>{
   mainProcess.refreshPreview(); 
});