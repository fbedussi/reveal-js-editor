const path = require('path');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
var theme = 'black';

function set(newTheme) {
    theme = newTheme;
    mainWindow.webContents.send('themeChange', theme);
}

function get() {
    return theme;
}

function openCustomWin() {
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent: mainWindow,
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    child.setMenuBarVisibility(false);
    child.webContents.openDevTools()
    child.loadURL('file://' + path.join(path.resolve('lib'), 'front', 'customTheme', 'customTheme.html'));

    child.once('ready-to-show', () => {
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
    custom,
    setMainWindow: (win)=>mainWindow = win
}