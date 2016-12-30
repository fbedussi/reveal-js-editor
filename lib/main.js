const path = require('path');

const {app, BrowserWindow} = require('electron');

const menu = require('./menu');
const theme = require('./theme');
const configuration = require ('./configuration');
const background = require('./background');
const file = require('./file');
const fileDialog = require('./fileDialog');
const language = require('./language');

var previewWin;


app.on('ready', () => {
        console.log('The application is ready.');
    
        language.loadTranslations('it', () => {
                var mainWindow = new BrowserWindow({
                        icon: path.join(__dirname, 'images', 'favicon.ico')
                });
    
                mainWindow.loadURL('file://' + path.join(__dirname, 'front', 'index.html'));
                
                menu.update();
                
                mainWindow.on('closed', () => {
                    mainWindow = null;
                });
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
                icon: path.join(__dirname, 'images', 'favicon.ico'),
                webPreferences: {
                    devTools: true
                }
        });
    
        previewWin.setMenuBarVisibility(false);
        //previewWin.webContents.openDevTools()
        previewWin.loadURL('file://' + path.join(__dirname, 'front', 'preview', 'preview.html'));
    
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

function deleteCssThemes(themes) {
        file.deleteFiles(themes.map(themeName => path.join(__dirname, 'customThemes', themeName + '.css')), function() {
                menu.update();
        });
};

module.exports = {
        openFile: file.open,
        saveProject: file.save,
        addCssTheme: file.addCssTheme,
        deleteCssThemes: deleteCssThemes,
        saveMd: file.saveMd,
        openFileDialog: fileDialog.openFile,
        openImg: fileDialog.openImg,
        updateMenu: menu.update,
        refreshPreview: menu.openPreview,
        getText: language.getText,
        openPreview,
        openBgWin
}
