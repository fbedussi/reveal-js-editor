const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const mainProcess = remote.require('./configuration');

var configuration = mainProcess.get();

formEl = document.forms[0];

autoSlideInput = document.querySelector('#autoSlide');
autoSlideInput.value = configuration.autoSlide;

viewDistanceInput = document.querySelector('#viewDistance');
viewDistanceInput.value = configuration.viewDistance;

parallaxBackgroundSizeInput = document.querySelector('#parallaxBackgroundSize');
parallaxBackgroundSizeInput.value = configuration.parallaxBackgroundSize;

parallaxBackgroundImageInput = document.querySelector('#parallaxBackgroundImage');
parallaxBackgroundImageInput.value = configuration.parallaxBackgroundImage;

parallaxBackgroundHorizontalInput = document.querySelector('#parallaxBackgroundHorizontal');
parallaxBackgroundHorizontalInput.value = configuration.parallaxBackgroundHorizontal;

parallaxBackgroundVerticalInput = document.querySelector('#parallaxBackgroundVertical');
parallaxBackgroundVerticalInput.value = configuration.parallaxBackgroundVertical;

parallaxBgImageButton = document.querySelector('#parallaxBgImageButton');
parallaxBgImageReset = document.querySelector('#parallaxBgImageReset');

ipc
    .on('imgPath', (event, filePath) => {
        parallaxBackgroundImageInput.value = filePath;
    })
;

parallaxBgImageButton.addEventListener('click', () => {
    mainProcess.openImg();
});

parallaxBgImageReset.addEventListener('click', () => {
    parallaxBackgroundImageInput.value = '';
});


resetOptionsButton = document.querySelector('#resetOptionsButton');
applyOptionsButton = document.querySelector('#applyOptionsButton');

resetOptionsButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
});

applyOptionsButton.addEventListener('click', (e) => {
    mainProcess.set({
        autoSlide: parseInt(autoSlideInput.value),
        viewDistance: parseInt(viewDistanceInput.value),
        parallaxBackgroundSize: parallaxBackgroundSizeInput.value,
        parallaxBackgroundImage: parallaxBackgroundImageInput.value,
        parallaxBackgroundHorizontal: parseInt(parallaxBackgroundHorizontalInput.value),
        parallaxBackgroundVertical: parseInt(parallaxBackgroundVerticalInput.value)
    });
    remote.getCurrentWindow().close();
});