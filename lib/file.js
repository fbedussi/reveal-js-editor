const fs = require('fs-extra');
const path = require('path');

const {dialog, app, BrowserWindow} = require('electron');

const {getMediaFiles, replaceAbsoluteMediaPathWithRelativeInHtml, replaceRelativeMediaPathWithAbsoluteInMd} = require('./pathHelpers');
const templatePath = path.join(__dirname, 'template.html');


function open(filePath) {
    var file = filePath;

    if (!file) {
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

        file = files[0];
    }

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
                let absolutePath = path.dirname(file);
                let dataWithReplacedPaths = replaceRelativeMediaPathWithAbsoluteInMd(data, absolutePath);
                fullfill({fileName: file, content: dataWithReplacedPaths});
            }
        });
    });

    return Promise.all([readRemedi, readConf, readCustomCss, readFile]);
}

function writeFilePromise(filePath, content) {
    //console.log('INIT WRITE FILE: ', filePath);
    return new Promise((fullfill, reject) => {
		fs.ensureDir(path.dirname(filePath), function (err) {
  			if (err) {
				//console.log(err)
				reject(err);
			}

			fs.writeFile(filePath, content, (err) => {
				if (err) {
					//console.log('WRITE FILE ERROR: ', err);
					reject(err);
				} else {
					fullfill(filePath);
				}
			});
		})
    })
}

function copyFilePromise(oldPath, newPath) {
	//console.log('INIT COPY FILE');
    return new Promise((fullfill, reject) => {
        fs.copy(oldPath, newPath, (err)=>{
            if (err) {
				//console.log('COPY FILE ERROR: ', err);
                reject(err);
            } else {
				//console.log('COPY FILE OK: ', newPath);
                fullfill({filePath: newPath, fileName: path.basename(newPath, '.css')});
            }
        });
    });
}

function save(options) {
	var html = options.html;
	var md = options.md || null;
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
			filesToSave.push(copyFilePromise(path.join(path.resolve(__dirname), 'customThemes'), path.join(path.dirname(fileName), 'css/customThemes')))

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
					return copyFilePromise(path.join(path.resolve(__dirname, '../node_modules'), 'reveal.js', file), path.join(path.dirname(fileName), file));
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

            html = replaceAbsoluteMediaPathWithRelativeInHtml(html);
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

function saveCurrentMd(content, fileName) {    
    if (!fileName) {
        return;
    }

    return writeFilePromise(fileName, content);
}

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

function getRemediConfig() {
	return new Promise((fullfill, reject) => {
        fs.readFile(path.join(path.resolve(__dirname), 'remedi-config.json'), 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                fullfill(JSON.parse(data));
            }
        });
    });
}

function saveRemediConfig(newConf) {
	return getRemediConfig()
		.then(oldConf =>{
			const updatedConf = JSON.stringify(Object.assign({}, oldConf, newConf));

			fs.writeFile(path.join(path.resolve(__dirname), 'remedi-config.json'), updatedConf, (err) => {
				if (err) {
					//console.log('WRITE FILE ERROR: ', err);
					return Promise.reject(err);
				} else {
					return Promise.resolve();
				}
			});
        })
	;
}


module.exports = {
    open,
    save,
    saveMd,
    saveCurrentMd,
    deleteFiles,
	copyFile: copyFilePromise,
	getFilesList,
	getRemediConfig,
	saveRemediConfig
}
