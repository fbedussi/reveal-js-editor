const path = require('path');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const fileDialog = require('./fileDialog');


var mainWindow = null;
var confWin;

var configuration = {
    controls: true,
    progress: true,
    slideNumber: false,
    history: false,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoSlide: 0,
    autoSlideStoppable: true,
    //autoSlideMethod: Reveal.navigateNext,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false,
    transition: 'none',
    transitionSpeed: 'default',
    backgroundTransition: 'default',
    viewDistance: 3,
    parallaxBackgroundImage: '',
    parallaxBackgroundSize: '',
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null
};

function get() {
    return configuration;
}

function set(newConfiguration) {
    configuration = Object.assign({}, configuration, newConfiguration);
    mainWindow.webContents.send('configurationChange', configuration);
}

function openConfWin() {
    
    confWin = new BrowserWindow({
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

    confWin.setMenuBarVisibility(false);
    //confWin.webContents.openDevTools()
    confWin.loadURL('file://' + path.join(path.resolve('lib'), 'front', 'options', 'options.html'));

    confWin.once('ready-to-show', () => {
        confWin.show()
    });
}

module.exports = {
    get,
    set,
    openImg: () => {
        fileDialog.openImg(confWin);
    },
    openConfWin,
    setMainWindow: (win)=>mainWindow = win
}