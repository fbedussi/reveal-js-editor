const path = require('path');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

function get() {
}

function set(newConfiguration) {
}

function openBgWin() {
    
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
    child.loadURL('file://' + path.join(__dirname, 'background.html'));

    child.once('ready-to-show', () => {
        child.show()
    });
}

module.exports = {
    get,
    set,
    openBgWin,
    setMainWindow: (win)=>mainWindow = win
}