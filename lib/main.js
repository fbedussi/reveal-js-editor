const electron = require('electron');
const fs = require('fs')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const Menu = electron.Menu
const templatePath = './template.html';
var transitionEffect = 'convex';
var theme = 'black';

let mainWindow = null

const template = [{
    label: 'File',
    submenu: [{
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click() {
            openFile()
        }
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
            saveFile()
        }
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
            insert('slide');
        }
    }, {
        label: 'Fragment',
        click() {
            insert('fragment');
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
        click() {
        }
    }]
}, {
    label: 'Theme',
    submenu: [{
        label: 'Black',
        type: 'radio',
        checked: Boolean(theme === 'black'),
        click() {
            theme = 'black';
        }
    }, {
        label: 'White',
        type: 'radio',
        checked: Boolean(theme === 'white'),
        click() {
            theme = 'white';
        }
    }, {
        label: 'League',
        type: 'radio',
        checked: Boolean(theme === 'league'),
        click() {
            theme = 'league';
        }
    }, {
        label: 'Beige',
        type: 'radio',
        checked: Boolean(theme === 'beige'),
        click() {
            theme = 'beige';
        }
    }, {
        label: 'Sky',
        type: 'radio',
        checked: Boolean(theme === 'sky'),
        click() {
            theme = 'sky';
        }
    }, {
        label: 'Night',
        type: 'radio',
        checked: Boolean(theme === 'night'),
        click() {
            theme = 'night';
        }
    }, {
        label: 'Serif',
        type: 'radio',
        checked: Boolean(theme === 'serif'),
        click() {
            theme = 'serif';
        }
    }, {
        label: 'Simple',
        type: 'radio',
        checked: Boolean(theme === 'simple'),
        click() {
            theme = 'simple';
        }
    }, {
        label: 'Solarized',
        type: 'radio',
        checked: Boolean(theme === 'solarized'),
        click() {
            theme = 'solarized';
        }
    }
    ]
}, {
    label: 'Transition',
    submenu: [{
        label: 'None',
        type: 'radio',
        checked: Boolean(transitionEffect === 'none'),
        click() {
            transitionEffect = 'none';
        }
    }, {
        label: 'Slide',
        type: 'radio',
        checked: Boolean(transitionEffect === 'slide'),
        click() {
            transitionEffect = 'slide';
        }
    }, {
        label: 'Fade',
        type: 'radio',
        checked: Boolean(transitionEffect === 'fade'),
        click() {
            transitionEffect = 'fade';
        }
    }, {
        label: 'Convex',
        type: 'radio',
        checked: Boolean(transitionEffect === 'convex'),
        click() {
            transitionEffect = 'convex';
        }
    }, {
        label: 'Concave',
        type: 'radio',
        checked: Boolean(transitionEffect === 'concave'),
        click() {
            transitionEffect = 'concave';
        }
    }, {
        label: 'Zoom',
        type: 'radio',
        checked: Boolean(transitionEffect === 'zoom'),
        click() {
            transitionEffect = 'zoom';
        }
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
}]

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

app.on('open-file', (event, file) => {
    const content = fs.readFileSync(file)
        .toString()
    mainWindow.webContents.send('file-opened', file, content)
})

app.on('ready', () => {
    console.log('The application is ready.')

    mainWindow = new BrowserWindow()

    mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

function insert(content) {
    mainWindow.webContents.send('insert', content)
}

function openFile() {
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'Markdown Files',
            extensions: ['md', 'markdown', 'txt']
        }]
    })

    if (!files) return

    const file = files[0]
    const content = fs.readFileSync(file)
        .toString()

    app.addRecentDocument(file)

    mainWindow.webContents.send('file-opened', file, content)
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

exports.openFile = openFile
exports.saveFile = saveFile
exports.saveMd = saveMd