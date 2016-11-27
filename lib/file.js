const fs = require('fs-extra');
const path = require('path');

const electron = require('electron');
const dialog = electron.dialog;
const app = electron.app;

const configuration = require ('./configuration');
const theme = require('./theme');

const templatePath = './template.html';
var mainWindow = null;

function open() {
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'Markdown Files',
            extensions: ['md', 'markdown', 'txt']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        
        app.addRecentDocument(file);
        mainWindow.webContents.send('fileOpened', file, data.toString());
    });
}

function save(content, withDependecies = false) {
    const fileName = dialog.showSaveDialog(mainWindow, {
        title: 'Save HTML Output',
        defaultPath: app.getPath('documents'),
        filters: [{
            name: 'HTML Files',
            extensions: ['html']
        }]
    });

    if (!fileName) {
        return;
    }

    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) throw err;
        
        const dependencies = [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true },
					{ src: 'plugin/notes/notes.js', async: true }
				];
        
        const configurationToSave = JSON.stringify(Object.assign({}, configuration.get(), {dependencies}));
        const templateHtml = data;

        const finalHtml = templateHtml
            .replace('<!--[CONTENT]-->', content)
            .replace('<!--[CONFIGURATION]-->', configurationToSave)
            .replace('<!--[THEME]-->', theme.get());

        fs.writeFile(fileName, finalHtml, (err) => {
            if (err) throw err;
            //console.log('It\'s saved!');
        });
        if (withDependecies) {
            //save dependecies
            ['lib/js/classList.js',
             'plugin/highlight/highlight.js',
             'plugin/zoom-js/zoom.js',
             'plugin/notes/notes.js',
             'lib/js/html5shiv.js',
             'lib/css/zenburn.css',
             'lib/js/head.min.js',
             'js/reveal.js',
             'css'].forEach((file)=>{
                fs.copy(path.join('node_modules', 'reveal.js', file), path.join(path.dirname(fileName), file), (err)=>{console.log(`${file} copied: ${err}`)});                
            });
        }
    });
}

function saveMd(content) {
    const fileName = dialog.showSaveDialog(mainWindow, {
        title: 'Save Markdown Source',
        defaultPath: app.getPath('documents'),
        filters: [{
            name: 'MD Files',
            extensions: ['md']
        }]
    });

    if (!fileName) {
        return;
    }

    fs.writeFile(fileName, content, (err) => {
        if (err) throw err;
        //console.log('It\'s saved!');
    });
}

module.exports = {
    open,
    save,
    saveMd,
    setMainWindow: (win)=>mainWindow = win
}