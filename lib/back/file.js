const fs = require('fs-extra');
const path = require('path');

const electron = require('electron');
const dialog = electron.dialog;
const app = electron.app;

const configuration = require ('./configuration');
const theme = require('./theme');

const templatePath = path.join(path.resolve(), 'template.html');
var mainWindow = null;


/**
 * @desc opens a dialog box to select an image file and sends the file path to the callingWindow
 * @param {string} callingWindow the window that is requesting the file path
 * @returns {string} image file path
 */
function openImg(callingWindow) {
    const files = dialog.showOpenDialog(bgWin, {
        properties: ['openFile'],
        filters: [{
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'svg', 'gif']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    callingWindow.webContents.send('imgPath', file);
}

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

function save(content, withDependecies = false, mediaFiles = []) {
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
        
        const conf = configuration.get();
        
        if (withDependecies) {
            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                conf.parallaxBackgroundImage = conf.parallaxBackgroundImage.replace(/(?:.*[\\/])?([\w ]+\.\w+)/, 'media/$1');
            }
            
             //save dependecies
            ['lib/js/classList.js',
             'plugin/highlight/highlight.js',
             'plugin/zoom-js/zoom.js',
             'plugin/notes/notes.js',
             'lib/js/html5shiv.js',
             'lib/css/zenburn.css',
             'lib/js/head.min.js',
             'js/reveal.js',
             'lib/font',
             'css'].forEach((file)=>{
                fs.copy(path.join('node_modules', 'reveal.js', file), path.join(path.dirname(fileName), file), (err)=>{console.log(`${file} copied: ${err}`)});                
            });
            
            if (configuration.get().parallaxBackgroundImage.length) {
                mediaFiles.push(configuration.get().parallaxBackgroundImage);
            }
            
            if (mediaFiles.length) {
                mediaFiles.forEach((file)=>{
                    fs.copy(file, path.join(path.dirname(fileName), 'media', path.basename(file)), (err)=>{console.log(`${file} copied: ${err}`)});                
                });
            }
        }
        
        const templateHtml = data;
        const configurationToSave = JSON.stringify(conf);


        const finalHtml = templateHtml
            .replace('<!--[CONTENT]-->', content)
            .replace('<!--[CONFIGURATION]-->', configurationToSave)
            .replace('<!--[THEME]-->', theme.get());

        fs.writeFile(fileName, finalHtml, (err) => {
            if (err) throw err;
            //console.log('It\'s saved!');
        });
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
    openImg,
    open,
    save,
    saveMd,
    setMainWindow: (win)=>mainWindow = win
}