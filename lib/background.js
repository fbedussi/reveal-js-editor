const path = require('path');

const {dialog, BrowserWindow} = require('electron');

const fileDialog = require('./fileDialog');
const language = require('./language');
const configuration = require('./configuration');

var bgWin;

var _bgSettings = {};
const bgSettings = {
	get: () => _bgSettings,
	set: (settings) => {_bgSettings = settings}
}


function openBgWin(currentSettings) {
    bgWin = new BrowserWindow({
        parent: BrowserWindow.getFocusedWindow(),
        width: 480,
        height: 630,
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
    bgWin.loadURL('file://' + path.join(__dirname, 'front', 'background', 'background.html'));

    bgWin.once('ready-to-show', () => {
        bgWin.webContents.send('init', currentSettings, configuration.getUiConf());
        bgWin.show();
    });
}

module.exports = {
    openBgWin,
    openImg: () => {fileDialog.openImg(bgWin)},
    openVideo: () => {fileDialog.openVideo(bgWin)},
    bgSettings
}
