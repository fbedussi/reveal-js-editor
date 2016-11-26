const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

const main = require('./main');

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
    transition: 'default',
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
    main.mainWindow.webContents.send('configurationChange', configuration);
}

function openConfWin() {
    console.log('MAIN', main);
    const parent = main.mainWindow;
    let child = new BrowserWindow({
        width: 600,
        height: 600,
        //autoHideMenuBar: true,
        parent,
        center: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    child.setMenuBarVisibility(false);
    child.webContents.openDevTools()
    child.loadURL('file://' + path.join(__dirname, 'options.html'));

    child.once('ready-to-show', () => {
        child.show()
    });
}

console.log('conf main', main);

//exports.get = get;
//exports.set = set;
//exports.openConfWin = openConfWin;
module.exports = {
    get,
    set,
    openConfWin
}