const electron = require('electron');
const fs = require('fs')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const Menu = electron.Menu
const templatePath = './template.html';
var transition = 'convex';
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
        type: 'checkbox',
        click(menuItem) {
            togglePreview(menuItem);
        }
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
        checked: Boolean(transition === 'none'),
        click: changeTransitionEffect
    }, {
        label: 'Slide',
        type: 'radio',
        checked: Boolean(transition === 'slide'),
        click: changeTransitionEffect
    }, {
        label: 'Fade',
        type: 'radio',
        checked: Boolean(transition === 'fade'),
        click: changeTransitionEffect
    }, {
        label: 'Convex',
        type: 'radio',
        checked: Boolean(transition === 'convex'),
        click: changeTransitionEffect
    }, {
        label: 'Concave',
        type: 'radio',
        checked: Boolean(transition === 'concave'),
        click: changeTransitionEffect
    }, {
        label: 'Zoom',
        type: 'radio',
        checked: Boolean(transition === 'zoom'),
        click: changeTransitionEffect
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

function changeTheme(menuItem) {
    theme = menuItem.label.toLowerCase();
    mainWindow.webContents.send('themeChange', theme);
}

function changeTransitionEffect(menuItem) {
    transition = menuItem.label.toLowerCase();
    mainWindow.webContents.send('transitionEffectChange', transition);
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

function togglePreview(menuItem)  {
    mainWindow.webContents.send('togglePreview', Boolean(menuItem.checked), {transition, theme});
}

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