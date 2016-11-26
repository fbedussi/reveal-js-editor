const path = require('path');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const main = require('./main');
var theme = 'none';

function set(newTheme) {
    theme = newTheme;
    main.getMainWin().webContents.send('themeChange', theme);
}

function get() {
    return theme;
}

function openCustomWin() {
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent: main.getMainWin(),
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    child.setMenuBarVisibility(false);
    child.webContents.openDevTools()
    child.loadURL('file://' + path.join(__dirname, 'customTheme.html'));

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

//exports.get = get;
//exports.set = set;
module.exports = {
    get,
    set,
    openCustomWin,
    custom
}