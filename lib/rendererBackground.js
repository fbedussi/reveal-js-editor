const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const insert = remote.require('./menu').insert;

//Cache elements
formEl = document.forms[0];
//colorBgInput = document.querySelector('#colorBg');
//imageBgInput = document.querySelector('#imageBg');
//bgSizeSelectInput = document.querySelector('#bgSizeSelect');
//bgSizeTextInput = document.querySelector('#bgSizeText');
//bgPositionXInput = document.querySelector('#bgPositionX');
//bgPositionYInput = document.querySelector('#bgPositionY');
//bgRepeatInput = document.querySelector('#bgRepeat');
//videoBgInput = document.querySelector('#videoBg');
//videoBgLoopInput = document.querySelector('#videoBgLoop');
//videoBgMutedInput = document.querySelector('#videoBgMuted');
//iframeBgInput = document.querySelector('#iframeBg');
resetButton = document.querySelector('#resetButton');
applyButton = document.querySelector('#applyButton');

resetButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    
    Array
        .from(document.querySelectorAll('input'))
        .forEach((input) => {
            if (input.value) {
                var value = input.type === 'checkbox'? input.checked : input.value;
                var insertTag = input.dataset.insert + '="' + value + '"';
                var insertPattern = input.dataset.insert + '="[^"+]"';
                insert(insertTag, insertPattern);
            }
        })
    ;
    
    remote.getCurrentWindow().close();
});