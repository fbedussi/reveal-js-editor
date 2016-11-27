const path = require('path');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const menu = require('./menu');
const theme = require('./theme');
const configuration = require ('./configuration');
const file = require('./file');

app.on('ready', () => {
        console.log('The application is ready.');
    
        var mainWindow = new BrowserWindow();
    
        mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

        menu.init(mainWindow);
        file.setMainWindow(mainWindow);
        configuration.setMainWindow(mainWindow);
        theme.setMainWindow(mainWindow);

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    })
;


module.exports = {
        openFile: file.open,
        saveFile: file.save,
        saveMd: file.saveMd,
}
