const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const mainProcess = remote.require('./configuration');
const _ = mainProcess.getText;

var configuration = mainProcess.get();

const {createComponent, ui} = require('../ui');

//Init UI
createComponent().getEl('label[for="autoSlide"]').setText(() => _('Auto play velocity (0 to disable)'));
createComponent().getEl('label[for="viewDistance"]').setText(() => _('Number of slides preloaded in lazy load mode'));
createComponent().getEl('label[for="parallaxBackgroundSize"]').setText(() => _('Parallax background size (CSS syntax, e.g. \'2100px 900px\')'));
createComponent().getEl('label[for="parallaxBackgroundImage"]').setText(() => _('Parallax background image'));
createComponent().getEl('label[for="parallaxBackgroundHorizontal"]').setText(() => _('Horizontal'));
createComponent().getEl('label[for="parallaxBackgroundVertical"]').setText(() => _('Vertical'));
createComponent().getEl('label[for="keyboard"]').setText(() => _('Keyboard custom mapping, eg:'));
createComponent().getEl('.parallaxBackgroundWrapper').setText(() => _('Number of pixels to move the parallax background per slide (0 to disabled, calculated automatically if unspecified)'));
createComponent().getEl('#parallaxBgImageButton').setText(() => _('Select file')).on('click', () => {
    mainProcess.openImg();
});
createComponent().getEl('#parallaxBgImageReset').setText(() => _('Reset')).on('click', () => {
    parallaxBackgroundImageInput.value = '';
});

createComponent().getEl('#resetOptionsButton').setText(() => _('Reset')).on('click', () => {
    remote.getCurrentWindow().close();
});
createComponent().getEl('#applyOptionsButton').setText(() => _('Apply')).on('click', () => {
    var kbVal = document.querySelector('#keyboard').value;
    
    if (kbVal) {
        eval('var kb = ' + document.querySelector('#keyboard').value);
    }
    
    var options = {
        autoSlide: parseInt(autoSlideInput.getValue()),
        viewDistance: parseInt(viewDistanceInput.getValue()),
        parallaxBackgroundSize: parallaxBackgroundSizeInput.getValue(),
        parallaxBackgroundImage: parallaxBackgroundImageInput.getValue(),
        parallaxBackgroundHorizontal: parseInt(parallaxBackgroundHorizontalInput.getValue()),
        parallaxBackgroundVertical: parseInt(parallaxBackgroundVerticalInput.getValue())
    };
    
    if (kbVal && kb) {
        options.keyboard = kb;
    }
    
    mainProcess.set(options);
    remote.getCurrentWindow().close();
});

const autoSlideInput = createComponent().getEl('#autoSlide').setValue(configuration.autoSlide);
const viewDistanceInput = createComponent().getEl('#viewDistance').setValue(configuration.viewDistance);
const parallaxBackgroundSizeInput = createComponent().getEl('#parallaxBackgroundSize').setValue(configuration.parallaxBackgroundSize);
const parallaxBackgroundImageInput = createComponent().getEl('#parallaxBackgroundImage').setValue(configuration.parallaxBackgroundImage).setPlaceholder(_('File path'));
const parallaxBackgroundHorizontalInput = createComponent().getEl('#parallaxBackgroundHorizontal').setValue(configuration.parallaxBackgroundHorizontal);
const parallaxBackgroundVerticalInput = createComponent().getEl('#parallaxBackgroundVertical').setValue(configuration.parallaxBackgroundVertical);

ipc
    .on('init', (event, conf) => {
        document.querySelector('#colorSchemeLink').href = `../skins/${conf.colorScheme}.css`;
    })
    .on('imgPath', (event, filePath) => {
        parallaxBackgroundImageInput.value = filePath;
    })
;

document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
});
