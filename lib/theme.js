const path = require('path');

const {BrowserWindow} = require('electron');

const configuration = require('./configuration');

var theme = 'black';

function set(newTheme) {
    theme = newTheme;
    BrowserWindow.getFocusedWindow().webContents.send('themeChange', theme);
}

function get() {
    return theme;
}

function openCustomWin() {
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent: BrowserWindow.getFocusedWindow(),
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    child.setMenuBarVisibility(false);
    //child.webContents.openDevTools()
    child.loadURL('file://' + path.join(__dirname, 'front', 'customTheme', 'customTheme.html'));

    child.once('ready-to-show', () => {
        child.webContents.send('init', configuration.getUiConf());
        child.show()
    });
}

function openDeleteCustomWin(customThemes) {
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent: BrowserWindow.getFocusedWindow(),
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    child.setMenuBarVisibility(false);
    //child.webContents.openDevTools()
    child.loadURL('file://' + path.join(__dirname, 'front', 'customTheme', 'deleteCustomTheme.html'));

    child.once('ready-to-show', () => {
        child.webContents.send('init', customThemes, configuration.getUiConf())
        child.show()
    });
}

const custom = {
    name: '',
    file: '',
    getName: ()=>this.name,
    getFileName: ()=>this.file,
    set: (fileName)=>{
        theme = 'custom';
        this.file = fileName;
        this.name = path.basename(fileName, '.css');
    }
}

module.exports = {
    get,
    set,
    openCustomWin,
    openDeleteCustomWin,
    custom
}