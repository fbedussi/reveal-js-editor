const {ipcRenderer, remote, shell} = require('electron');

const mainProcess = remote.require('./main');
const _ = mainProcess.getText;
const {createComponent, ui} = require('../ui');


//Init UI
createComponent().getEl('label[for="customThemeFile"]').setText(() => _('CSS file for custom theme'));

const customThemeButton = createComponent().getEl('#customThemeButton').setText(() => _('Select CSS file')).on('click', () => {
    mainProcess.openFileDialog('css', remote.getCurrentWindow());    
});
const customThemeFileInput = document.querySelector('#customThemeFile');

const resetButton = createComponent().getEl('#resetButton').setText(() => _('Reset')).on('click', function() {
    remote.getCurrentWindow().close();
});
const applyButton = createComponent().getEl('#applyButton').setText(() => _('Apply')).on('click', function(e) {
    e.preventDefault();
    
    mainProcess.addCssTheme(customThemeFileInput.value);
    
    remote.getCurrentWindow().close();
});


//This is needed since the closing of the window opened by mainProcess.openImg();
//triggers the form submission
document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
});

ipcRenderer
    .on('init', (event, uiConf) => {
        document.querySelector('#colorSchemeLink').href = `../skins/${uiConf.colorScheme}.css`;
    })
    .on('filePath', (event, fileType, path) => {
        if (fileType !== 'css') {
            return;
        }
        customThemeFileInput.value = path;    
    })
;