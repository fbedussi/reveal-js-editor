const path = require('path');

const {dialog, BrowserWindow} = require('electron');

const fileDialog = require('./fileDialog');

var bgWin;
var mainWindow = null;


function openBgWin(currentSettings) {
    bgWin = new BrowserWindow({
        parent: mainWindow,
        center: true,
        useContentSize: true,
        //alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    bgWin.setMenuBarVisibility(false);
    //bgWin.webContents.openDevTools();
    bgWin.loadURL('file://' + path.join(path.resolve('lib'), 'front', 'background', 'background.html'));

    bgWin.once('ready-to-show', () => {
        bgWin.webContents.send('init', currentSettings);
        bgWin.show();
    });
}

module.exports = {
    openBgWin,
    openImg: () => {fileDialog.openImg(bgWin)},
    openVideo: () => {fileDialog.openVideo(bgWin)},
    setMainWindow: (win) => mainWindow = win
}