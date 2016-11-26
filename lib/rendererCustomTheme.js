const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const mainProcess = remote.require('./main');

var configuration = mainProcess.getConfiguration();

formEl = document.forms[0];

autoSlideInput = document.querySelector('#autoSlide');
autoSlideInput.value = configuration.autoSlide;

resetOptionsButton = document.querySelector('#resetButton');
applyOptionsButton = document.querySelector('#applyButton');

resetOptionsButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    mainProcess.setThemesetConfiguration({
        autoSlide: parseInt(autoSlideInput.value),
        viewDistance: parseInt(viewDistanceInput.value),
        parallaxBackgroundSize: parallaxBackgroundSizeInput.value,
        parallaxBackgroundImage: parallaxBackgroundImageInput.value,
        parallaxBackgroundHorizontal: parseInt(parallaxBackgroundHorizontalInput.value),
        parallaxBackgroundVertical: parseInt(parallaxBackgroundVerticalInput.value)
    });
    remote.getCurrentWindow().close();
});