const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;

const file = require('./file');
const configuration = require('./configuration');
const theme = require('./theme');

var mainWindow = null;

const template = [{
    label: 'File',
    submenu: [{
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: file.open
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: file.save
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'Insert',
    submenu: [{
        label: 'Slide',
        click() {
            insert('::::slide\n\n::::');
        }
    },{
        label: 'Nested slide',
        click() {
            insert(':::slide\n\n:::');
        }
    }, {
        type: 'separator'
    }, {
        label: 'Fragment fade in',
        click() {
            insert('{fragment}');
        }
    }, {
        label: 'Fragment grow',
        click() {
            insert('{fragment grow}');
        }
    }, {
        label: 'Fragment shrink',
        click() {
            insert('{fragment shrink}');
        }
    }, {
        label: 'Fragment fade-out',
        click() {
            insert('{fragment fade-out}');
        }
    }, {
        label: 'Fragment fade-up',
        click() {
            insert('{fragment fade-up');
        }
    }, {
        label: 'Fragment current-visible',
        click() {
            insert('{fragment current-visible}');
        }
    }, {
        label: 'Fragment highlight-current-blue',
        click() {
            insert('{fragment highlight-current-blue}');
        }
    }, {
        label: 'Fragment highlight-red',
        click() {
            insert('{fragment highlight-red}');
        }
    }, {
        label: 'Fragment highlight-green',
        click() {
            insert('{fragment highlight-green}');
        }
    }, {
        label: 'Fragment highlight-blue',
        click() {
            insert('{fragment highlight-blue}');
        }
    }, {
        type: 'separator'
    }, {
        label: 'Speakers note',
        click() {
            insert(':::speakerNote\n\n:::');
        }
    }, {
        type: 'separator'
    }, {
        label: 'Individual slide transition',
        submenu: [{
            label: 'Slide',
            click: () => insert(' transition="slide"')
        }, {
            label: 'Fade',
            click: () => insert(' transition="fade"')
    
        }, {
            label: 'Convex',
            click: () => insert(' transition="convex"')
    
        }, {
            label: 'Concave',
            click: () => insert(' transition="concave"')
        }, {
            label: 'Zoom',
            click: () => insert(' transition="zoom"')
        }]
    }], {
        type: 'separator',
        click: () => insert(' class=""')
    },
    {
        label: 'Slide class'
    }
}, {
    label: 'Presentation',
    submenu: [{
        label: 'Export presentation',
        accelerator: 'CmdOrCtrl+E',
        click: () => mainWindow.webContents.send('exportProject')
    }, {
        label: 'Show preview in this window',
        accelerator: 'CmdOrCtrl+P',
        type: 'checkbox',
        click: (menuItem)=>mainWindow.webContents.send('togglePreview', Boolean(menuItem.checked), configuration.get(), theme.get())
    }, {
        label: 'Open preview in a new window',
        click: openPreview
    }]
}, {
    label: 'Theme',
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
    label: 'Transition',
    submenu: [{
        label: 'None',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'none'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Slide',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'slide'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Fade',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'fade'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Convex',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'convex'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Concave',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'concave'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Zoom',
        type: 'radio',
        checked: Boolean(configuration.get().transition === 'zoom'),
        click: (menuItem) => configuration.set({
            transition: menuItem.label.toLowerCase()
        })
    }, {
        label: 'Tranisiton speed',
        submenu: [{
            label: 'Default',
            type: 'radio',
            checked: Boolean(configuration.get().transitionSpeed === 'default'),
            click: (menuItem) => configuration.set({
                transitionSpeed: 'default'
            })
        }, {
            label: 'Fast',
            type: 'radio',
            checked: Boolean(configuration.get().transitionSpeed === 'fast'),
            click: (menuItem) => configuration.set({
                transitionSpeed: 'fast'
            })
        }, {
            label: 'Slow',
            type: 'radio',
            checked: Boolean(configuration.get().transitionSpeed === 'slow'),
            click: (menuItem) => configuration.set({
                transitionSpeed: 'slow'
            })
        }]
    }, {
        label: 'Background tranisiton',
        submenu: [{
            label: 'None',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'none'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Slide',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'slide'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Fade',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'fade'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Convex',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'convex'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Concave',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'concave'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }, {
            label: 'Zoom',
            type: 'radio',
            checked: Boolean(configuration.get().backgroundTransition === 'zoom'),
            click: (menuItem) => configuration.set({
                backgroundTransition: menuItem.label.toLowerCase()
            })
        }]
    }]
}, {
    label: 'Configuration',
    submenu: [{
        label: 'Display controls in the bottom right corner',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            controls: menuItem.checked
        })
    }, {
        label: 'Show progress',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            progress: menuItem.checked
        })
    }, {
        label: 'Show slide number',
        type: 'checkbox',
        checked: configuration.get().slideNumber,
        click: (menuItem) => configuration.set({
            slideNumber: menuItem.checked
        })
    }, {
        label: 'Push each slide to the browser history',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            history: menuItem.checked
        })
    }, {
        label: 'Keyboard navigation',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            keyboard: menuItem.checked
        })
    }, {
        label: 'Enable the slide overview mode',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            overview: menuItem.checked
        })

    }, {
        label: 'Vertical centering of slides',
        type: 'checkbox',
        checked: configuration.get().controls,
        click: (menuItem) => configuration.set({
            center: menuItem.checked
        })
    }, {
        label: 'Enables touch navigation',
        type: 'checkbox',
        checked: configuration.get().touch,
        click: (menuItem) => configuration.set({
            touch: menuItem.checked
        })
    }, {
        label: 'Loop the presentation',
        type: 'checkbox',
        checked: configuration.get().loop,
        click: (menuItem) => configuration.set({
            loop: menuItem.checked
        })
    }, {
        label: 'Change the presentation direction to be RTL',
        type: 'checkbox',
        checked: configuration.get().rtl,
        click: (menuItem) => configuration.set({
            rtl: menuItem.checked
        })
    }, {
        label: 'Randomizes the slide order at presentation load',
        type: 'checkbox',
        checked: configuration.get().shuffle,
        click: (menuItem) => configuration.set({
            shuffle: menuItem.checked
        })
    }, {
        label: 'Turn fragments on',
        type: 'checkbox',
        checked: configuration.get().fragments,
        click: (menuItem) => configuration.set({
            fragments: menuItem.checked
        })
    }, {
        label: 'Embedded',
        type: 'checkbox',
        checked: configuration.get().embedded,
        click: (menuItem) => configuration.set({
            embedded: menuItem.checked
        })
    }, {
        label: 'Show a help overlay when ? is pressed',
        type: 'checkbox',
        checked: configuration.get().help,
        click: (menuItem) => configuration.set({
            help: menuItem.checked
        })
    }, {
        label: 'Show speaker notes',
        type: 'checkbox',
        checked: configuration.get().showNotes,
        click: (menuItem) => configuration.set({
            showNotes: menuItem.checked
        })
    }, {
        label: 'Stop auto-sliding after user input',
        type: 'checkbox',
        checked: configuration.get().autoSlideStoppable,
        click: (menuItem) => configuration.set({
            autoSlideStoppable: menuItem.checked
        })
    }, {
        label: 'Enable slide navigation via mouse wheel',
        type: 'checkbox',
        checked: configuration.get().mouseWheel,
        click: (menuItem) => configuration.set({
            mouseWheel: menuItem.checked
        })
    }, {
        label: 'Hides the address bar on mobile devices',
        type: 'checkbox',
        checked: configuration.get().hideAddressBar,
        click: (menuItem) => configuration.set({
            hideAddressBar: menuItem.checked
        })
    }, {
        label: 'Opens links in an iframe preview overlay',
        type: 'checkbox',
        checked: configuration.get().previewLinks,
        click: (menuItem) => configuration.set({
            previewLinks: menuItem.checked
        })
    }, {
        label: 'Other configuration...',
        click: configuration.openConfWin
    }]
}, {
    label: 'Developer',
    submenu: [{
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
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

function insert(content) {
    mainWindow.webContents.send('insert', content);
}

function changeTheme(menuItem) {
    theme.set(menuItem.label.toLowerCase());    
}

function openPreview() {
    mainWindow.webContents.send('openPreview');
}

function init(mainWin) {
    mainWindow = mainWin;
    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);    
}

module.exports = {
    init,
    openPreview
}