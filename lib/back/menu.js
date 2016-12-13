const fs = require('fs-extra');
const path = require('path');

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;

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
    
    console.log('iso', language.getLanguageIso());

    const languageMenuItems = languageList.map(iso => ({
        label: iso,
        type: 'checkbox',
        checked: Boolean(language.getLanguageIso() === iso),
        click: changeLanguage
    }));
    
    const template = [{
        label: _('File'),
        submenu: [{
            label: _('Open a markdown file...'),
            accelerator: 'CmdOrCtrl+O',
            click: file.open
        }, {
            label: _('Save presentation...'),
            accelerator: 'CmdOrCtrl+S',
            click: () => mainWindow.webContents.send('exportProject')
        }, {
            label: _('Save markdown only...'),
            click: () => mainWindow.webContents.send('saveMD')
        }, {
            label: _('Save HTML only...'),
            click: () => mainWindow.webContents.send('saveHTML')
        }]
    }, {
        label: _('Edit'),
        submenu: [{
            label: _('Undo'),
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: _('Redo'),
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
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
            label: _('Slide'),
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
            label: _('Insert image'),
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
        label: _('Presentation'),
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
        submenu: [{
            label: 'Black',
            type: 'radio',
            checked: Boolean(theme.get() === 'black'),
            click: changeTheme
        }, {
            label: 'White',
            type: 'radio',
            checked: Boolean(theme.get() === 'white'),
            click: changeTheme
        }, {
            label: 'League',
            type: 'radio',
            checked: Boolean(theme.get() === 'league'),
            click: changeTheme
        }, {
            label: 'Beige',
            type: 'radio',
            checked: Boolean(theme.get() === 'beige'),
            click: changeTheme
        }, {
            label: 'Sky',
            type: 'radio',
            checked: Boolean(theme.get() === 'sky'),
            click: changeTheme
        }, {
            label: 'Night',
            type: 'radio',
            checked: Boolean(theme.get() === 'night'),
            click: changeTheme
        }, {
            label: 'Serif',
            type: 'radio',
            checked: Boolean(theme.get() === 'serif'),
            click: changeTheme
        }, {
            label: 'Simple',
            type: 'radio',
            checked: Boolean(theme.get() === 'simple'),
            click: changeTheme
        }, {
            label: 'Solarized',
            type: 'radio',
            checked: Boolean(theme.get() === 'solarized'),
            click: changeTheme
        }, {
            label: 'Custom',
            type: 'radio',
            checked: Boolean(theme.get() === theme.custom.getName()),
            click: () => theme.openCustomWin()
        }]
    }, {
        label: _('Transition'),
        submenu: [{
            label: _('None'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'none'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: _('Slide'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'slide'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: _('Fade'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'fade'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: _('Convex'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'convex'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: _('Concave'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'concave'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: _('Zoom'),
            type: 'radio',
            checked: Boolean(configuration.get()
                .transition === 'zoom'),
            click: (menuItem) => configuration.set({
                transition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Tranisiton speed',
            submenu: [{
                label: 'Default',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'default'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'default'
                })
            }, {
                label: 'Fast',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'fast'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'fast'
                })
            }, {
                label: 'Slow',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .transitionSpeed === 'slow'),
                click: (menuItem) => configuration.set({
                    transitionSpeed: 'slow'
                })
            }]
        }, {
            label: 'Background tranisiton',
            submenu: [{
                label: 'None',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'none'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: 'Slide',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'slide'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: 'Fade',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'fade'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: 'Convex',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'convex'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: 'Concave',
                type: 'radio',
                checked: Boolean(configuration.get()
                    .backgroundTransition === 'concave'),
                click: (menuItem) => configuration.set({
                    backgroundTransition: menuItem.label.toLowerCase()
                })
            }, {
                label: 'Zoom',
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
            label: 'Display controls in the bottom right corner',
            type: 'checkbox',
            checked: configuration.get()
                .controls,
            click: (menuItem) => configuration.set({
                controls: menuItem.checked
            })
        }, {
            label: 'Show progress',
            type: 'checkbox',
            checked: configuration.get()
                .progress,
            click: (menuItem) => configuration.set({
                progress: menuItem.checked
            })
        }, {
            label: 'Show slide number',
            type: 'checkbox',
            checked: configuration.get()
                .slideNumber,
            click: (menuItem) => configuration.set({
                slideNumber: menuItem.checked
            })
        }, {
            label: 'Push each slide to the browser history',
            type: 'checkbox',
            checked: configuration.get()
                .history,
            click: (menuItem) => configuration.set({
                history: menuItem.checked
            })
        }, {
            label: 'Keyboard navigation',
            type: 'checkbox',
            checked: configuration.get()
                .keyboard,
            click: (menuItem) => configuration.set({
                keyboard: menuItem.checked
            })
        }, {
            label: 'Enable the slide overview mode',
            type: 'checkbox',
            checked: configuration.get()
                .overview,
            click: (menuItem) => configuration.set({
                overview: menuItem.checked
            })

        }, {
            label: 'Vertical centering of slides',
            type: 'checkbox',
            checked: configuration.get()
                .center,
            click: (menuItem) => configuration.set({
                center: menuItem.checked
            })
        }, {
            label: 'Enables touch navigation',
            type: 'checkbox',
            checked: configuration.get()
                .touch,
            click: (menuItem) => configuration.set({
                touch: menuItem.checked
            })
        }, {
            label: 'Loop the presentation',
            type: 'checkbox',
            checked: configuration.get()
                .loop,
            click: (menuItem) => configuration.set({
                loop: menuItem.checked
            })
        }, {
            label: 'Change the presentation direction to be RTL',
            type: 'checkbox',
            checked: configuration.get()
                .rtl,
            click: (menuItem) => configuration.set({
                rtl: menuItem.checked
            })
        }, {
            label: 'Randomizes the slide order at presentation load',
            type: 'checkbox',
            checked: configuration.get()
                .shuffle,
            click: (menuItem) => configuration.set({
                shuffle: menuItem.checked
            })
        }, {
            label: 'Turn fragments on',
            type: 'checkbox',
            checked: configuration.get()
                .fragments,
            click: (menuItem) => configuration.set({
                fragments: menuItem.checked
            })
        }, {
            label: 'Embedded',
            type: 'checkbox',
            checked: configuration.get()
                .embedded,
            click: (menuItem) => configuration.set({
                embedded: menuItem.checked
            })
        }, {
            label: 'Show a help overlay when ? is pressed',
            type: 'checkbox',
            checked: configuration.get()
                .help,
            click: (menuItem) => configuration.set({
                help: menuItem.checked
            })
        }, {
            label: 'Show speaker notes',
            type: 'checkbox',
            checked: configuration.get()
                .showNotes,
            click: (menuItem) => configuration.set({
                showNotes: menuItem.checked
            })
        }, {
            label: 'Stop auto-sliding after user input',
            type: 'checkbox',
            checked: configuration.get()
                .autoSlideStoppable,
            click: (menuItem) => configuration.set({
                autoSlideStoppable: menuItem.checked
            })
        }, {
            label: 'Enable slide navigation via mouse wheel',
            type: 'checkbox',
            checked: configuration.get()
                .mouseWheel,
            click: (menuItem) => configuration.set({
                mouseWheel: menuItem.checked
            })
        }, {
            label: 'Hides the address bar on mobile devices',
            type: 'checkbox',
            checked: configuration.get()
                .hideAddressBar,
            click: (menuItem) => configuration.set({
                hideAddressBar: menuItem.checked
            })
        }, {
            label: 'Opens links in an iframe preview overlay',
            type: 'checkbox',
            checked: configuration.get()
                .previewLinks,
            click: (menuItem) => configuration.set({
                previewLinks: menuItem.checked
            })
        }, {
            label: 'Other configuration...',
            click: configuration.openConfWin
        }, {
            label: 'Set language',
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
                label: 'Services',
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

function changeTheme(menuItem) {
    theme.set(menuItem.label.toLowerCase());
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
    //const menu = Menu.buildFromTemplate(getTemplate());
    //
    //Menu.setApplicationMenu(menu);
}

module.exports = {
    init,
    openPreview,
    insert,
    update
}