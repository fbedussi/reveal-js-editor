const fs = require('fs-extra');
const path = require('path');

const {app, Menu, shell} = require('electron');

const file = require('./file');
const configuration = require('./configuration');
const theme = require('./theme');
const language = require('./language');
const _ = language.getText;

var mainWindow = null;

//Wrap template in a function to evaluate menu item status at runtime
function getTemplate() {
    //Get languages list and buid language menu items
    const languageList = fs.readdirSync(path.resolve('./lib/locale')).filter(function(file) {
                return fs.statSync(path.join(path.resolve('./lib/locale'), file)).isDirectory();
            });
    if (languageList.indexOf('en') === -1) {
        languageList.push('en');
    }
    
    languageList.sort();
    
    const languageMenuItems = languageList.map(iso => ({
        label: iso,
        type: 'checkbox',
        checked: Boolean(language.getLanguageIso() === iso),
        click: changeLanguage
    }));
    
    const themes = ['Black', 'White', 'League', 'Beige', 'Sky', 'Night', 'Serif', 'Simple' ];
    const customThemes = fs.readdirSync(path.resolve('./customThemes'))
        .filter(file => fs.statSync(path.join(path.resolve('./customThemes'), file)).isFile())
        .map(fileName => path.basename(fileName, '.css'))
    ;
    
    const themeMenuItems = themes
        .map(themeName => ({
            label: _(themeName),
            type: 'radio',
            checked: Boolean(theme.get() === themeName.toLowerCase()),
            click: () => theme.set(themeName.toLowerCase())
        }))
        .concat([{
            type: 'separator'
        }, {
            label: _('Custom themes'),
            enabled: Boolean(customThemes.length),
            submenu: customThemes
                .map(themeName => ({
                    label: _(themeName),
                    type: 'radio',
                    checked: Boolean(theme.get() === themeName.toLowerCase()),
                    click: () => theme.set(themeName.toLowerCase())
        }))
        },{
            label: _('Load custom theme'),
            checked: Boolean(theme.get() === theme.custom.getName()),
            click: () => theme.openCustomWin()
        }, {
            label: _('Delete custom theme'),
            click: () => theme.openDeleteCustomWin(customThemes)
        }])
    ;
        
    const template = [{
        label: _('File'),
        submenu: [{
            label: _('Open a markdown file...'),
            accelerator: 'CmdOrCtrl+O',
            click: file.open
        }, {
            label: _('Save presentation...'),
            accelerator: 'CmdOrCtrl+S',
            click: () => mainWindow.webContents.send('saveProject')
        }, {
            label: _('Save markdown only...'),
            click: () => mainWindow.webContents.send('saveMD')
        }, {
            label: _('Save HTML only...'),
            click: () => mainWindow.webContents.send('saveHTML')
        }, {
            label: _('Copy HTML to clipboard'),
            click: () => mainWindow.webContents.send('copyHTML')
        }, {
            label: _('Show in file system'),
            enabled: Boolean(file.getCurrentFile()),
            click: () => shell.showItemInFolder(file.getCurrentFile())
        }, {
            label: _('Open in default editor'),
            enabled: Boolean(file.getCurrentFile()),
            click: () => shell.openItem(file.getCurrentFile())
        }]
    }, {
        label: _('Edit'),
        submenu: [{
            label: _('Undo'),
            accelerator: 'CmdOrCtrl+Z',
            //role: 'undo'
            click: () => {
                mainWindow.webContents.send('undo')
            }
        }, {
            label: _('Redo'),
            accelerator: 'Shift+CmdOrCtrl+Z',
            //role: 'redo'
            click: () => {
                mainWindow.webContents.send('redo')
            }
        }, {
            type: 'separator'
        }, {
            label: _('Find'),
            accelerator: 'CmdOrCtrl+F',
            role: 'find'
        }, {
            label: _('Replace'),
            accelerator: 'CmdOrCtrl+R',
            role: 'replace'
        }, {
            type: 'separator'
        }, {
            label: _('Cut'),
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: _('Copy'),
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: _('Paste'),
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: _('Select All'),
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    }, {
        label: _('Insert'),
        submenu: [{
            label: _('Presentation slide'),
            accelerator: 'CommandOrControl+Shift+S',
            click() {
                insert('::::slide\n\n::::');
            }
        }, {
            label: _('Nested slide'),
            accelerator: 'CommandOrControl+Shift+N',
            click() {
                insert(':::slide\n\n:::');
            }
        }, {
            type: 'separator'
        }, {
            label: _('Image'),
            accelerator: 'CommandOrControl+Shift+I',
            click: () => file.openImg(mainWindow)
        }, {
            type: 'separator'
        }, {
            label: _('Fragment fade in'),
            accelerator: 'CommandOrControl+Shift+F',
            click() {
                insert('{fragment}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment grow'),
            click() {
                insert('{fragment grow}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment shrink'),
            click() {
                insert('{fragment shrink}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment fade-out'),
            click() {
                insert('{fragment fade-out}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment fade-up'),
            click() {
                insert('{fragment fade-up'), '{fragment[^}]*}';
            }
        }, {
            label: _('Fragment current-visible'),
            click() {
                insert('{fragment current-visible}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment highlight-current-blue'),
            click() {
                insert('{fragment highlight-current-blue}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment highlight-red'),
            click() {
                insert('{fragment highlight-red}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment highlight-green'),
            click() {
                insert('{fragment highlight-green}', '{fragment[^}]*}');
            }
        }, {
            label: _('Fragment highlight-blue'),
            click() {
                insert('{fragment highlight-blue}', '{fragment[^}]*}');
            }
        }, {
            type: 'separator'
        }, {
            label: _('Speakers note'),
            click() {
                insert(':::speakerNote\n\n:::');
            }
        }, {
            type: 'separator'
        }, {
            label: _('Individual slide transition'),
            submenu: [{
                label: _('Slide'),
                click: () => insert('transition="slide"', 'transition="[^"]+"')
            }, {
                label: _('Fade'),
                click: () => insert('transition="fade"', 'transition="[^"]+"')

            }, {
                label: _('Convex'),
                click: () => insert(' transition="convex"', 'transition="[^"]+"')

            }, {
                label: _('Concave'),
                click: () => insert(' transition="concave"', 'transition="[^"]+"')
            }, {
                label: _('Zoom'),
                click: () => insert(' transition="zoom"', 'transition="[^"]+"')
            }]
        }, {
            type: 'separator'
        }, {
            label: _('Slide class'),
            click: () => insert('class=""', 'class="[^"]*"')
        }, {
            label: _('Slide id'),
            click: () => insert('id=""', 'id="[^"]*"')
        }, {
            label: _('Slide background...'),
            accelerator: 'CommandOrControl+Shift+B',
            click: () => {
                mainWindow.webContents.send('getCurrentSlideBackgrounSettings')
            }
        }]
    }, {
        label: _('Preview'),
        submenu: [{
            label: _('Show preview in this window'),
            accelerator: 'CmdOrCtrl+P',
            type: 'checkbox',
            click: (menuItem) => mainWindow.webContents.send('togglePreview', Boolean(menuItem.checked), configuration.get(), theme.get())
        }, {
            label: _('Open preview in a new window'),
            accelerator: 'CommandOrControl+Shift+P',
            click: openPreview
        }]
    }, {
        label: _('Theme'),
        submenu: themeMenuItems
    }, {
        label: _('Transition'),
        submenu: [{
            label: _('None'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'none'),
            click: (menuItem) => configuration.set({
                transition: 'none'
            })
        }, {
            label: _('Slide'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'slide'),
            click: (menuItem) => configuration.set({
                transition: 'slide'
            })
        }, {
            label: _('Fade'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'fade'),
            click: (menuItem) => configuration.set({
                transition: 'fade'
            })
        }, {
            label: _('Convex'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'convex'),
            click: (menuItem) => configuration.set({
                transition: 'convex'
            })
        }, {
            label: _('Concave'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'concave'),
            click: (menuItem) => configuration.set({
                transition: 'concave'
            })
        }, {
            label: _('Zoom'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'zoom'),
            click: (menuItem) => configuration.set({
                transition: 'zoom'
            })
        }, {
            label: _('Tranisiton speed'),
            submenu: [{
                label: _('Default'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'default'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'default'
                })
            }, {
                label: _('Fast'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'fast'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'fast'
                })
            }, {
                label: _('Slow'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'slow'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'slow'
                })
            }]
        }, {
            label: _('Background tranisiton'),
            submenu: [{
                label: _('None'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'none'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: _('Slide'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'slide'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: _('Fade'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'fade'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: _('Convex'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'convex'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: _('Concave'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'concave'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: _('Zoom'),
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'zoom'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }]
        }]
    }, {
        label: _('Configuration'),
        submenu: [{
            label: _('Display controls in the bottom right corner'),
            type: 'checkbox',
            checked: configuration.get()
                .controls,
            click: (menuItem) => configuration.set({
                controls: menuItem.checked
            })
        }, {
            label: _('Show progress'),
            type: 'checkbox',
            checked: configuration.get()
                .progress,
            click: (menuItem) => configuration.set({
                progress: menuItem.checked
            })
        }, {
            label: _('Show slide number'),
            type: 'checkbox',
            checked: configuration.get()
                .slideNumber,
            click: (menuItem) => configuration.set({
                slideNumber: menuItem.checked
            })
        }, {
            label: _('Push each slide to the browser history'),
            type: 'checkbox',
            checked: configuration.get()
                .history,
            click: (menuItem) => configuration.set({
                history: menuItem.checked
            })
        }, {
            label: _('Keyboard navigation'),
            type: 'checkbox',
            checked: configuration.get()
                .keyboard,
            click: (menuItem) => configuration.set({
                keyboard: menuItem.checked
            })
        }, {
            label: _('Enable the slide overview mode'),
            type: 'checkbox',
            checked: configuration.get()
                .overview,
            click: (menuItem) => configuration.set({
                overview: menuItem.checked
            })

        }, {
            label: _('Vertical centering of slides'),
            type: 'checkbox',
            checked: configuration.get()
                .center,
            click: (menuItem) => configuration.set({
                center: menuItem.checked
            })
        }, {
            label: _('Enables touch navigation'),
            type: 'checkbox',
            checked: configuration.get()
                .touch,
            click: (menuItem) => configuration.set({
                touch: menuItem.checked
            })
        }, {
            label: _('Loop the presentation'),
            type: 'checkbox',
            checked: configuration.get()
                .loop,
            click: (menuItem) => configuration.set({
                loop: menuItem.checked
            })
        }, {
            label: _('Change the presentation direction to be RTL'),
            type: 'checkbox',
            checked: configuration.get()
                .rtl,
            click: (menuItem) => configuration.set({
                rtl: menuItem.checked
            })
        }, {
            label: _('Randomizes the slide order at presentation load'),
            type: 'checkbox',
            checked: configuration.get()
                .shuffle,
            click: (menuItem) => configuration.set({
                shuffle: menuItem.checked
            })
        }, {
            label: _('Turn fragments on'),
            type: 'checkbox',
            checked: configuration.get()
                .fragments,
            click: (menuItem) => configuration.set({
                fragments: menuItem.checked
            })
        }, {
            label: _('Embedded'),
            type: 'checkbox',
            checked: configuration.get()
                .embedded,
            click: (menuItem) => configuration.set({
                embedded: menuItem.checked
            })
        }, {
            label: _('Show a help overlay when ? is pressed'),
            type: 'checkbox',
            checked: configuration.get()
                .help,
            click: (menuItem) => configuration.set({
                help: menuItem.checked
            })
        }, {
            label: _('Show speaker notes'),
            type: 'checkbox',
            checked: configuration.get()
                .showNotes,
            click: (menuItem) => configuration.set({
                showNotes: menuItem.checked
            })
        }, {
            label: _('Stop auto-sliding after user input'),
            type: 'checkbox',
            checked: configuration.get()
                .autoSlideStoppable,
            click: (menuItem) => configuration.set({
                autoSlideStoppable: menuItem.checked
            })
        }, {
            label: _('Enable slide navigation via mouse wheel'),
            type: 'checkbox',
            checked: configuration.get()
                .mouseWheel,
            click: (menuItem) => configuration.set({
                mouseWheel: menuItem.checked
            })
        }, {
            label: _('Hides the address bar on mobile devices'),
            type: 'checkbox',
            checked: configuration.get()
                .hideAddressBar,
            click: (menuItem) => configuration.set({
                hideAddressBar: menuItem.checked
            })
        }, {
            label: _('Opens links in an iframe preview overlay'),
            type: 'checkbox',
            checked: configuration.get()
                .previewLinks,
            click: (menuItem) => configuration.set({
                previewLinks: menuItem.checked
            })
        }, {
            label: _('Other configuration...'),
            click: configuration.openConfWin
        }, {
            label: _('Set language'),
            submenu: languageMenuItems
        }]
    }, {
        label: 'Developer',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'F12',
            click() {
                mainWindow.webContents.toggleDevTools()
            }
        }]
    }];

    if (process.platform === 'darwin') {
        const name = app.getName()
        template.unshift({
            label: name,
            submenu: [{
                label: 'About ' + name,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: _('Services'),
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit()
                }
            }]
        })
    }
    return template;
}

function insert(content, pattern = null) {
    mainWindow.webContents.send('insert', content, pattern);
}

function changeLanguage(menuItem) {
    language.loadTranslations(menuItem.label, () => {
        update();
        mainWindow.webContents.send('languageChanged');    
    });
}

function openPreview() {
    mainWindow.webContents.send('openPreview');
}

function update() {
    const menu = Menu.buildFromTemplate(getTemplate());

    mainWindow.setMenu(menu);
}

function init(mainWin) {
    mainWindow = mainWin;   

    update();
}

module.exports = {
    init,
    openPreview,
    insert,
    update
}