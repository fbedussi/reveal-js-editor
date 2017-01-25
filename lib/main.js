const path = require('path');

const {app, BrowserWindow} = require('electron');

//const menu = require('./menu');
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
                        width: 1000,
                        height: 700,
                        icon: path.join(__dirname, 'images', 'favicon.ico')
                });

                mainWindow.loadURL('file://' + path.join(__dirname, 'front', 'index.html'));

                //menu.update();

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
    bgWin.webContents.openDevTools();
    bgWin.loadURL('file://' + path.join(__dirname, 'front', 'background', 'background.html'));

    bgWin.once('ready-to-show', () => {
        bgWin.webContents.send('init', currentSettings, configuration.getUiConf());
        bgWin.show();
    });

    return new Promise((resolve, reject) => {
        bgWin.on('closed', () => {
            resolve(bgSettings.get());
        });
    });
}

function deleteCssThemes(themes) {
        file.deleteFiles(themes.map(themeName => path.join(__dirname, 'customThemes', themeName + '.css')), function() {
                menu.update();
        });
};

var _bgSettings = {};
const bgSettings = {
	get: () => _bgSettings,
	set: (settings) => {_bgSettings = settings}
}

module.exports = {
        openFile: file.open,
        saveProject: file.save,
        saveMd: file.saveMd,
        getFilePath: fileDialog.getFilePath,


        //addCssTheme: file.addCssTheme,
        //deleteCssThemes: deleteCssThemes,
        //openFileDialog: fileDialog.openFile,

        //openImg: fileDialog.openImg,

        //refreshPreview: menu.openPreview,
        //getText: language.getText,
        //openPreview,
        openBgWin,
		bgSettings
}
