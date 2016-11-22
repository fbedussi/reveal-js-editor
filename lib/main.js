const electron = require('electron');
const fs = require('fs');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const Menu = electron.Menu;
const templatePath = './template.html';
var theme = 'black';
var mainWindow = null;

var configuration = {
    controls: true,
    progress: true,
    slideNumber: false,
    history: false,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoSlide: 0,
    autoSlideStoppable: true,
    //autoSlideMethod: Reveal.navigateNext,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false,
    transition: 'default', 
    transitionSpeed: 'default', 
    backgroundTransition: 'default', 
    viewDistance: 3,
    parallaxBackgroundImage: '', 
    parallaxBackgroundSize: '',
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null  
};

const template = [{
    label: 'File',
    submenu: [{
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: openFile
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: saveFile
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
        label: 'Vertical slide container',
        click() {
            insert('::::slide\n\n::::');
        }
    }, {
        label: 'Slide',
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
    }]
}, {
    label: 'Presentation',
    submenu: [{
        label: 'Create project',
        click() {
            
        }
    }, {
        label: 'Preview',
        accelerator: 'CmdOrCtrl+P',
        type: 'checkbox',
        click: togglePreview
    }]
}, {
    label: 'Theme',
    submenu: [{
        label: 'Black',
        type: 'radio',
        checked: Boolean(theme === 'black'),
        click: changeTheme
    }, {
        label: 'White',
        type: 'radio',
        checked: Boolean(theme === 'white'),
        click: changeTheme
    }, {
        label: 'League',
        type: 'radio',
        checked: Boolean(theme === 'league'),
        click: changeTheme
    }, {
        label: 'Beige',
        type: 'radio',
        checked: Boolean(theme === 'beige'),
        click: changeTheme
    }, {
        label: 'Sky',
        type: 'radio',
        checked: Boolean(theme === 'sky'),
        click: changeTheme
    }, {
        label: 'Night',
        type: 'radio',
        checked: Boolean(theme === 'night'),
        click: changeTheme
    }, {
        label: 'Serif',
        type: 'radio',
        checked: Boolean(theme === 'serif'),
        click: changeTheme
    }, {
        label: 'Simple',
        type: 'radio',
        checked: Boolean(theme === 'simple'),
        click: changeTheme
    }, {
        label: 'Solarized',
        type: 'radio',
        checked: Boolean(theme === 'solarized'),
        click: changeTheme
    }
    ]
}, {
    label: 'Transition',
    submenu: [{
        label: 'None',
        type: 'radio',
        checked: Boolean(configuration.transition === 'none'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }, {
        label: 'Slide',
        type: 'radio',
        checked: Boolean(configuration.transition === 'slide'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }, {
        label: 'Fade',
        type: 'radio',
        checked: Boolean(configuration.transition === 'fade'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }, {
        label: 'Convex',
        type: 'radio',
        checked: Boolean(configuration.transition === 'convex'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }, {
        label: 'Concave',
        type: 'radio',
        checked: Boolean(configuration.transition === 'concave'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }, {
        label: 'Zoom',
        type: 'radio',
        checked: Boolean(configuration.transition === 'zoom'),
        click: (menuItem)=>updateConfiguration({transition: menuItem.label.toLowerCase()})
    }]
}, {
   label: 'Configuration',
   submenu: [{
        label: 'Display controls in the bottom right corner',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({controls: menuItem.checked})
   },{
        label: 'Show progress',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({progress: menuItem.checked})
   },{
        label: 'Show slide number',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({slideNumber: menuItem.checked})
   },{
        label: 'Push each slide to the browser history',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({history: menuItem.checked})        
   },{
        label: 'Keyboard navigation',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({keyboard: menuItem.checked})
   },{
        label: 'Enable the slide overview mode',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({overview: menuItem.checked})

   },{
        label: 'Vertical centering of slides',
        type: 'checkbox',
        checked: configuration.controls,
        click: (menuItem)=>updateConfiguration({center: menuItem.checked})
   },{
        label: 'Enables touch navigation',
        type: 'checkbox',
        checked: configuration.touch,
        click: (menuItem)=>updateConfiguration({touch: menuItem.checked})
   },{
        label: 'Loop the presentation',
        type: 'checkbox',
        checked: configuration.loop,
        click: (menuItem)=>updateConfiguration({loop: menuItem.checked})
   },{
        label: 'Change the presentation direction to be RTL',
        type: 'checkbox',
        checked: configuration.rtl,
        click: (menuItem)=>updateConfiguration({rtl: menuItem.checked})
   },{
        label: 'Randomizes the slide order at presentation load',
        type: 'checkbox',
        checked: configuration.shuffle,
        click: (menuItem)=>updateConfiguration({shuffle: menuItem.checked})
   },{
        label: 'Turn fragments on',
        type: 'checkbox',
        checked: configuration.fragments,
        click: (menuItem)=>updateConfiguration({fragments: menuItem.checked})
   },{
        label: 'Embedded',
        type: 'checkbox',
        checked: configuration.embedded,
        click: (menuItem)=>updateConfiguration({embedded: menuItem.checked})
   },{
        label: 'Show a help overlay when ? is pressed',
        type: 'checkbox',
        checked: configuration.help,
        click: (menuItem)=>updateConfiguration({help: menuItem.checked})
   },{
        label: 'Show speaker notes',
        type: 'checkbox',
        checked: configuration.showNotes,
        click: (menuItem)=>updateConfiguration({showNotes: menuItem.checked})
   },{
        label: 'Stop auto-sliding after user input',
        type: 'checkbox',
        checked: configuration.autoSlideStoppable,
        click: (menuItem)=>updateConfiguration({autoSlideStoppable: menuItem.checked})
   },{
        label: 'Enable slide navigation via mouse wheel',
        type: 'checkbox',
        checked: configuration.mouseWheel,
        click: (menuItem)=>updateConfiguration({mouseWheel: menuItem.checked})
   },{
        label: 'Hides the address bar on mobile devices',
        type: 'checkbox',
        checked: configuration.hideAddressBar,
        click: (menuItem)=>updateConfiguration({hideAddressBar: menuItem.checked})
   },{
        label: 'Opens links in an iframe preview overlay',
        type: 'checkbox',
        checked: configuration.previewLinks,
        click: (menuItem)=>updateConfiguration({previewLinks: menuItem.checked})
   },{
        label: 'Other configuration...',
        click: setMiscConfiguration
   }]
   
   
    //autoSlide: 0,
    //autoSlideMethod: Reveal.navigateNext,
    //transitionSpeed: 'default', 
    //backgroundTransition: 'default', 
    //viewDistance: 3,
    //parallaxBackgroundImage: '', 
    //parallaxBackgroundSize: '',
    //parallaxBackgroundHorizontal: null,
    //parallaxBackgroundVertical: null  
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

function changeTheme(menuItem) {
    theme = menuItem.label.toLowerCase();
    mainWindow.webContents.send('themeChange', theme);
}

function updateConfiguration(newConfiguration) {
    configuration = Object.assign(configuration, newConfiguration);
    console.log('NEW CONF: ', configuration);
    mainWindow.webContents.send('configurationChange', configuration);    
}

function getConfiguration() {
    return configuration;   
}

app.on('open-file', (event, file) => {
    const content = fs.readFileSync(file).toString();
    mainWindow.webContents.send('fileOpened', file, content);
});

app.on('ready', () => {
    console.log('The application is ready.');

    mainWindow = new BrowserWindow();

    mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

function togglePreview(menuItem)  {
    mainWindow.webContents.send('togglePreview', Boolean(menuItem.checked), configuration, theme);
}

function insert(content) {
    mainWindow.webContents.send('insert', content);
}

function openFile() {
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
    const content = fs.readFileSync(file).toString();

    app.addRecentDocument(file);

    mainWindow.webContents.send('fileOpened', file, content);
}

function setMiscConfiguration() {
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent: mainWindow,
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {devTools: true}
    });
    
    child.setMenuBarVisibility(false);
    child.webContents.openDevTools()
    child.loadURL('file://' + path.join(__dirname, 'options.html'));

    child.once('ready-to-show', () => {
        child.show()
    });
}

function saveFile(content) {
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

        const templateHtml = data;

        const finalHtml = templateHtml
            .replace('<!--[CONTENT]-->', content)
            .replace('<!--[TRANSITION]-->', transitionEffect)
            .replace('<!--[THEME]-->', theme)
        ;

        fs.writeFileSync(fileName, finalHtml);
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

    fs.writeFileSync(fileName, content);
}

exports.openFile = openFile;
exports.saveFile = saveFile;
exports.saveMd = saveMd;
exports.updateConfiguration = updateConfiguration;
exports.getConfiguration = getConfiguration;