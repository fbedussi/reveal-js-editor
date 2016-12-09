const path = require('path');

const electron = require('electron');
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

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

function openImg() {
    const files = dialog.showOpenDialog(bgWin, {
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
    bgWin.webContents.send('imgPath', file);
}

function openVideo() {
    const files = dialog.showOpenDialog(bgWin, {
        properties: ['openFile'],
        filters: [{
            name: 'Video',
            extensions: ['avi', 'mp4', 'mpg', 'mpeg']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    bgWin.webContents.send('videoPath', file);
}

module.exports = {
    openBgWin,
    openImg,
    openVideo,
    setMainWindow: (win) => mainWindow = win
}