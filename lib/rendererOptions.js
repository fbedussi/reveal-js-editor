const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const mainProcess = remote.require('./main');

var configuration = mainProcess.getConfiguration();

formEl = document.forms[0];
autoSlideInput = document.querySelector('#autoSlide');
autoSlideInput.value = configuration.autoSlide;


resetOptionsButton = document.querySelector('#resetOptionsButton');
applyOptionsButton = document.querySelector('#applyOptionsButton');

resetOptionsButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    mainProcess.updateConfiguration({
        autoSlide: parseInt(autoSlideInput.value)
    });
    remote.getCurrentWindow().close();
});