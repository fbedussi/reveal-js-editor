const fs = require('fs-extra');
const path = require('path');

const {dialog, app, BrowserWindow} = require('electron');

const configuration = require ('./configuration');
const theme = require('./theme');

const templatePath = path.join(__dirname, 'template.html');

var currentFile;


function open() {
    const win = BrowserWindow.getFocusedWindow();
    
    const files = dialog.showOpenDialog(win, {
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
    
    fs.readFile(path.join(path.dirname(file), 'configuration.json'), (err, data) => {
        if (err) {
            console.log('No configuration found', err);
            return;
        }
        configuration.set(JSON.parse(data));
        win.webContents.send('updateMenu');
    })
    
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        
        app.addRecentDocument(file);
        currentFile = file;
        win.send('fileOpened', file, data.toString());
    });
}

function save(html, md = null, withDependecies = false, mediaFiles = []) {
    const fileName = dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
        title: withDependecies? 'Save project' : 'Save HTML Output',
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
            
            //Save configuraton
            fs.writeFile(path.join(path.dirname(fileName), 'configuration.json'), JSON.stringify(conf), (err) => {
                if (err) throw err;
            });  
            
             //save dependecies
            ['lib/js/classList.js',
             'plugin/highlight/highlight.js',
             'plugin/zoom-js/zoom.js',
             'plugin/notes/notes.js',
             'plugin/notes/notes.html',
             'lib/js/html5shiv.js',
             'lib/css/zenburn.css',
             'lib/js/head.min.js',
             'js/reveal.js',
             'lib/font',
             'css'].forEach((file)=>{
                fs.copy(path.join('node_modules', 'reveal.js', file), path.join(path.dirname(fileName), file), (err)=>{console.log(`${file} copied: ${err}`)});                
            });
            
            //Save media files
            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                mediaFiles.push(conf.parallaxBackgroundImage);
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
            .replace('<!--[CONTENT]-->', html)
            .replace('<!--[CONFIGURATION]-->', configurationToSave)
            .replace('<!--[THEME]-->', theme.get());

        //save html
        fs.writeFile(fileName, finalHtml, (err) => {
            if (err) throw err;
        });
        
        //save markdown
        if (md) {
            fs.writeFile(path.join(path.dirname(fileName), path.basename(fileName).replace(/\.\w{3,4}/,'.md')), md, (err) => {
                if (err) throw err;
            });            
        }
    });
}

function saveMd(content) {
    const fileName = dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
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

function getCurrentFile() {
    return currentFile;
}

function addCssTheme(file) {
    fs.copy(file, path.join(__dirname, 'customThemes', path.basename(file)), function (err) {
        if (err) {
            return console.error(err);
        }
        
        menu.update();
    });
}

function deleteFiles(files, cb) {
    var count = 0;
    
    //console.log('DELETING ', files);
    
    files.forEach(file => {
        fs.remove(file, function(err) {
            count++;
            if (count === files.length) {
                cb();
            }
        });
    });       
}

module.exports = {
    open,
    save,
    saveMd,
    getCurrentFile,
    addCssTheme,
    deleteFiles
}