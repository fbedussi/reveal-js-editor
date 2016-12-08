const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const insert = remote.require('./menu').insert;
const mainProcess = remote.require('./background')

//Cache elements
const formEl = document.forms[0];
//colorBgInput = document.querySelector('#colorBg');
const imageBgButton = document.querySelector('#imageBgButton');
const imageBgInput = document.querySelector('#imageBg');
//bgSizeSelectInput = document.querySelector('#bgSizeSelect');
//bgSizeTextInput = document.querySelector('#bgSizeText');
//bgPositionXInput = document.querySelector('#bgPositionX');
//bgPositionYInput = document.querySelector('#bgPositionY');
//bgRepeatInput = document.querySelector('#bgRepeat');
//videoBgInput = document.querySelector('#videoBg');
//videoBgLoopInput = document.querySelector('#videoBgLoop');
//videoBgMutedInput = document.querySelector('#videoBgMuted');
//iframeBgInput = document.querySelector('#iframeBg');

const inputs = Array.from(document.querySelectorAll('input, #bgRepeat'));
const bgPostionPartials = Array.from(document.querySelectorAll('.bgPositionPartial'));
const bgPosition = document.querySelector('#bgPosition');

const resetButton = document.querySelector('#resetButton');
const applyButton = document.querySelector('#applyButton');

ipc
    .on('init', (event, currentSettings) => {
        console.log(currentSettings);
        if (!currentSettings) {
            return;
        }
        
        currentSettings.forEach(setting => {
            document.querySelector(`[data-insert="${setting.key}"]`).value = setting.value;
        });
    })
    .on('imgPath', (event, path) => {
        imageBgInput.value = path;
        imageBgInput.dataset.changed = true;
    })
;

inputs.forEach((input)=>{
    input.addEventListener('change', (e)=>{
        e.target.dataset.changed = true;
    });
});

bgPostionPartials
    .forEach((bgPositionPartial) => {
        bgPositionPartial.addEventListener('change', (e) => {
            bgPosition.value = bgPostionPartials.reduce((a,b) => a.value + ' ' + b.value);
            bgPosition.dataset.changed = true;
        });
    })
;

imageBgButton.addEventListener('click', () => {
    mainProcess.openImg();    
});

resetButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

//This is needed since the closing of the window opened by mainProcess.openImg();
//triggers the form submission
formEl.addEventListener('submit', function(e) {
    e.preventDefault();
});

applyButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    inputs
        .filter(input => input.dataset.changed)
        .forEach(input => {
            if (input.value) {
                var value = input.type === 'checkbox'? input.checked : input.value;
                var insertTag = input.dataset.insert + '="' + value + '"';
                var insertPattern = input.dataset.insert + '="[^"]+"';
                insert(insertTag, insertPattern);
            }
        })
    ;
    
    remote.getCurrentWindow().close();
});
