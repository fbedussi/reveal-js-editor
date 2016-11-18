const electron = require('electron');
const fs = require('fs')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const Menu = electron.Menu
const templatePath = './template.html';
var transitionEffect = 'convex';

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
    label: 'Transition',
    submenu: [{
        label: 'None',
        rclick() {
            transitionEffect = 'none';
        }
    }, {
        label: 'Slide',
        click() {
            transitionEffect = 'slide';
        }
    }, {
        label: 'Fade',
        click() {
            transitionEffect = 'fade';
        }
    }, {
        label: 'Convex',
        click() {
            transitionEffect = 'convex';
        }
    }, {
        label: 'Concave',
        click() {
            transitionEffect = 'concave';
        }
    }, {
        label: 'Zoom',
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
            .replace('<!--[TRANSITION]-->', transitionEffect);

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