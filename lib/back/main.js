const path = require('path');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const menu = require('./menu');
const theme = require('./theme');
const configuration = require ('./configuration');
const background = require('./background');
const file = require('./file');

var previewWin;

app.on('ready', () => {
        console.log('The application is ready.');
    
        var mainWindow = new BrowserWindow();
    
        mainWindow.loadURL('file://' + path.join(path.resolve(), 'lib', 'front', 'index.html'));
        
        menu.init(mainWindow);
        file.setMainWindow(mainWindow);
        configuration.setMainWindow(mainWindow);
        theme.setMainWindow(mainWindow);
        
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    })
;

function openPreview(content) {
        if (previewWin) { //refresh
                previewWin.webContents.send('refresh', content, configuration.get(), theme.get());
                return;
        }
        
        previewWin = new BrowserWindow({
                width: 600,
                height: 600,
                //autoHideMenuBar: true,
                center: true,
                show: false,
                webPreferences: {
                    devTools: true
                }
        });
    
        previewWin.setMenuBarVisibility(false);
        //previewWin.webContents.openDevTools()
        previewWin.loadURL('file://' + path.join(path.resolve('lib'), 'front', 'preview', 'preview.html'));
    
        previewWin.once('ready-to-show', () => {
            previewWin.webContents.send('init', content, configuration.get(), theme.get())
            previewWin.show()
        });
        
         previewWin.on('closed', () => {
            previewWin = null;
        });
}

function openBgWin(currentSettings) {
        background.openBgWin(currentSettings);        
}

module.exports = {
        openFile: file.open,
        saveProject: file.save,
        saveMd: file.saveMd,
        openPreview,
        openBgWin,
        refreshPreview: menu.openPreview
}
