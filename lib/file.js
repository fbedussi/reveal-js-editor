const fs = require('fs-extra');
const path = require('path');

const {dialog, app, BrowserWindow} = require('electron');

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
                fullfill({configuration: null});
            } else {
                fullfill({configuration: JSON.parse(data)});
            }
        });
    });

	const readRemedi = new Promise((fullfill, reject) => {
        fs.readFile(path.join(path.dirname(file), 'remedi.json'), 'utf8', (err, data) => {
            if (err) {
                fullfill({remedi: null});
            } else {
                fullfill({remedi: JSON.parse(data)});
            }
        });
    });

	const readCustomCss = new Promise((fullfill, reject) => {
        fs.readFile(path.join(path.dirname(file), 'css', 'custom.css'), 'utf8', (err, data) => {
            if (err) {
                fullfill({customCss: ''});
            } else {
                fullfill({customCss: data});
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

    return Promise.all([readRemedi, readConf, readCustomCss, readFile]);
}

function writeFilePromise(filePath, content) {
    return new Promise((fullfill, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err);
            } else {
                fullfill();
            }
        });
    })
}

function copyFilePromise(oldPath, newPath) {
    return new Promise((fullfill, reject) => {
        fs.copy(oldPath, newPath, (err)=>{
            if (err) {
                reject(err);
            } else {
                fullfill({filePath: newPath, fileName: path.basename(newPath, '.css')});
            }
        });
    });
}

function save(options) {
	const html = options.html;
	const md = options.md || null;
	const withDependecies = options.withDependencies;
	const conf = options.conf;
	const theme = options.theme;
	const isCustomTheme = options.isCustomTheme;
	const customCss = options.customCss || '';

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

    return new Promise((fullfill, reject) => {
        fs.readFile(templatePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                fullfill(data);
            }
        });
    }).then(data => {
        let filesToSave = [];

        if (withDependecies) {
            var mediaFiles = getMediaFiles(md);

            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                conf.parallaxBackgroundImage = conf.parallaxBackgroundImage.replace(/(?:.*[\\/])?([\w ]+\.\w+)/, 'media/$1');
            }

            //Save configuraton
            filesToSave.push(writeFilePromise(path.join(path.dirname(fileName), 'configuration.json'), JSON.stringify(conf)));

			//Save custom css
			filesToSave.push(writeFilePromise(path.join(path.dirname(fileName), 'css', 'custom.css'), customCss));

			//Copy custom themes
			filesToSave.push(copyFilePromise(path.join('lib', 'customThemes'), path.join(path.dirname(fileName), 'css/customThemes')))

			//Save REMEDI info file
			filesToSave.push(writeFilePromise(path.join(path.dirname(fileName), 'remedi.json'), JSON.stringify({"theme": theme, "isCustomTheme": isCustomTheme})));

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
                    return copyFilePromise(path.join('node_modules', 'reveal.js', file), path.join(path.dirname(fileName), file));
                })
            );

            //Save media files
            if (conf.parallaxBackgroundImage && conf.parallaxBackgroundImage.length) {
                mediaFiles.push(conf.parallaxBackgroundImage);
            }
            if (mediaFiles.length) {
                filesToSave = filesToSave.concat(
                    mediaFiles.map(function(file) {
                        return copyFilePromise(file, path.join(path.dirname(fileName), 'media', path.basename(file)));
                    })
                );
            }
        }

        const templateHtml = data;
        const configurationToSave = JSON.stringify(conf);
		const themePath = isCustomTheme? 'customThemes' : 'theme';

        const finalHtml = templateHtml
            .replace('<!--[CONTENT]-->', html)
            .replace('<!--[CONFIGURATION]-->', configurationToSave)
            .replace('<!--[THEME_PATH]-->', themePath)
            .replace('<!--[THEME]-->', theme);

        //save html
        filesToSave.push(writeFilePromise(fileName, finalHtml));

        //save markdown
        if (md) {
            filesToSave.push(writeFilePromise(path.join(path.dirname(fileName), path.basename(fileName).replace(/\.\w{3,4}/,'.md')), md));
        }

        return Promise.all(filesToSave);
    })
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

    return writeFilePromise(fileName, content);
}

// function copyFile(oldPos, newPos) {
//     fs.copy(file, path.join(__dirname, 'customThemes', path.basename(file)), function (err) {
//         if (err) {
//             return console.error(err);
//         }

//         BrowserWindow.getAllWindows()[0].webContents.send('updateMenu');
//     });
// }

function deleteFiles(files) {
	var deletePromises = files.map(file => new Promise((fullfill, reject) => {
		fs.remove(file, function(err) {
			if (err) {
				reject(err);
			} else {
				fullfill();
			}
		});
	}));

	return Promise.all(deletePromises);
}

function getFilesList(options) {
	return new Promise((fullfill, reject) => {
		fs.readdir(path.join(__dirname, options.path), (err, files) => {
			if (err) {
				reject(err);
			} else {
				fullfill(
					files
						.filter(file => {
            				return fs.statSync(path.join(__dirname, options.path, file)).isFile();
        				})
						.map(fileName => path.basename(fileName, options.extension))
				);
			}
		});
	});
}

module.exports = {
    open,
    save,
    saveMd,
    deleteFiles,
	copyFile: copyFilePromise,
	getFilesList
}
