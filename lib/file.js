const fs = require('fs-extra');
const path = require('path');

const {dialog, app, BrowserWindow} = require('electron');

const configuration = require ('./configuration');
const theme = require('./theme');
const {getMediaFiles} = require('./pathHelpers');
const templatePath = path.join(__dirname, 'template.html');


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

    const readConf = new Promise((fullfill, reject) => {    
        fs.readFile(path.join(path.dirname(file), 'configuration.json'), 'utf8', (err, data) => {
            if (err) {
                fullfill({configuration: 'No configuration found'});
            } else {    
                fullfill({configuration: JSON.parse(data)});
            }
        });
    });
  
    const readFile = new Promise((fullfill, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                app.addRecentDocument(file);
                fullfill({fileName: file, content: data});
            } 
        });
    });
    
    return Promise.all([readConf, readFile]);
}

function save(html, md = null, withDependecies = false) {
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
        
        let filesToSave = [];
        
        //TODO: manage configuration in frontend
        const conf = configuration.get();
        
        if (withDependecies) {
            var mediaFiles = getMediaFiles(md);
            console.log('media files', mediaFiles);
            
            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                conf.parallaxBackgroundImage = conf.parallaxBackgroundImage.replace(/(?:.*[\\/])?([\w ]+\.\w+)/, 'media/$1');
            }
            
            //Save configuraton
            filesToSave.push(new Promise((fullfill, reject) => {
                fs.writeFile(path.join(path.dirname(fileName), 'configuration.json'), JSON.stringify(conf), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        fullfill();
                    }
                });
            }));
            
            console.log(filesToSave);

            
             //save dependecies
            filesToSave = filesToSave.concat(
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
                 'css'].map(function(file) {
                    return new Promise((fullfill, reject) => {
                        fs.copy(path.join('node_modules', 'reveal.js', file), path.join(path.dirname(fileName), file), (err)=>{
                            if (err) {
                                reject(err);
                            } else {
                                fullfill();
                            }
                        });
                    });
                })
            );

            console.log(filesToSave);

            
            //Save media files
            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                mediaFiles.push(conf.parallaxBackgroundImage);
            }
            if (mediaFiles.length) {
                filesToSave = filesToSave.concat(
                    mediaFiles.map(function(file) {
                        return new Promise((fullfill, reject) => {
                            fs.copy(file, path.join(path.dirname(fileName), 'media', path.basename(file)), (err)=>{
                                if (err) {
                                    reject(err);
                                } else {
                                    fullfill();
                                }
                            });                
                        })
                    })
                );
                
                            console.log(filesToSave);

            }
        }
        
        const templateHtml = data;
        const configurationToSave = JSON.stringify(conf);

        const finalHtml = templateHtml
            .replace('<!--[CONTENT]-->', html)
            .replace('<!--[CONFIGURATION]-->', configurationToSave)
            .replace('<!--[THEME]-->', theme.get());

        //save html
        filesToSave.push(
            new Promise((fullfill, reject) => {
                fs.writeFile(fileName, finalHtml, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        fullfill();
                    }
                });
            })
        );
        
        //save markdown
        if (md) {
            filesToSave.push(
                new Promise((fullfill, reject) => {
                    fs.writeFile(path.join(path.dirname(fileName), path.basename(fileName).replace(/\.\w{3,4}/,'.md')), md, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            fullfill();
                        }
                    });
                })
            );
            
                        console.log(filesToSave);

        }
        
        console.log(filesToSave);
        
        return Promise.all(filesToSave);
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

//function getCurrentFile() {
//    return currentFile;
//}

function addCssTheme(file) {
    fs.copy(file, path.join(__dirname, 'customThemes', path.basename(file)), function (err) {
        if (err) {
            return console.error(err);
        }
        
        BrowserWindow.getAllWindows()[0].webContents.send('updateMenu');
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
    //getCurrentFile,
    addCssTheme,
    deleteFiles
}