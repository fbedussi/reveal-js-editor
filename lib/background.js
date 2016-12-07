const path = require('path');

const electron = require('electron');
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

var bgWin;
var mainWindow = null;


function get() {}

function set(newConfiguration) {}

function openBgWin() {

    bgWin = new BrowserWindow({
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

    bgWin.setMenuBarVisibility(false);
    bgWin.webContents.openDevTools()
    bgWin.loadURL('file://' + path.join(__dirname, 'background.html'));

    bgWin.once('ready-to-show', () => {
        bgWin.show()
    });
}

function openImg() {
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'svg', 'gif']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    console.log('File, ', file);
    bgWin.webContents.send('imgPath', file);
}

module.exports = {
    get,
    set,
    openBgWin,
    openImg,
    setMainWindow: (win) => mainWindow = win
}