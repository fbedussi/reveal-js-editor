const electron = require('electron');

const ipc = electron.ipcRenderer;
const remote = electron.remote;
const shell = electron.shell;

const insert = remote.require('./menu').insert;
const mainProcess = remote.require('./background')

//Cache elements
const formEl = document.forms[0];
const imageBgButton = document.querySelector('#imageBgButton');
const imageBgInput = document.querySelector('#imageBg');
//bgSizeSelectInput = document.querySelector('#bgSizeSelect');
//bgSizeTextInput = document.querySelector('#bgSizeText');
//bgPositionXInput = document.querySelector('#bgPositionX');
//bgPositionYInput = document.querySelector('#bgPositionY');
//bgRepeatInput = document.querySelector('#bgRepeat');

const videoBgButton = document.querySelector('#videoBgButton');
const videoBgInput = document.querySelector('#videoBg');
const videoBgLoopInput = document.querySelector('#videoBgLoop');
const videoBgMutedInput = document.querySelector('#videoBgMuted');
const resetInputs = Array.from(document.querySelectorAll('.resetInput'));
const inputs = Array.from(document.querySelectorAll('input, #bgRepeat'));
const bgPositionPartialsInput = Array.from(document.querySelectorAll('.bgPositionPartial'));
const bgPositionInput = document.querySelector('#bgPosition');

const resetButton = document.querySelector('#resetButton');
const applyButton = document.querySelector('#applyButton');

function enableVideoOptions() {
    videoBgLoopInput.disabled = videoBgMutedInput.disabled = false;    
}

ipc
    .on('init', (event, currentSettings) => {
        if (!currentSettings) {
            return;
        }
        
        currentSettings.forEach(setting => {
            document.querySelector(`[data-insert="${setting.key}"]`).value = setting.value;
        });
        
        if (videoBgInput.value) {
            enableVideoOptions();    
        }
        
        if (bgPositionInput.value) {
            bgPositionsPartial = bgPositionInput.value.split(' ');
            bgPositionPartialsInput[0].value = bgPositionsPartial[0];
            bgPositionPartialsInput[1].value = bgPositionsPartial[1];
        }
    })
    .on('imgPath', (event, path) => {
        imageBgInput.value = path;
        imageBgInput.dataset.changed = true;
    })
    .on('videoPath', (event, path) => {
        videoBgInput.value = path;
        videoBgInput.dataset.changed = true;
        enableVideoOptions();    
    })
;

inputs.forEach((input)=>{
    input.addEventListener('change', (e)=>{
        e.target.dataset.changed = true;
    });
});

bgPositionPartialsInput
    .forEach((bgPositionPartial) => {
        bgPositionPartial.addEventListener('change', (e) => {
            bgPositionInput.value = bgPositionPartialsInput.reduce((a,b) => a.value + ' ' + b.value);
            bgPositionInput.dataset.changed = true;
        });
    })
;

resetInputs.forEach(resetBtn => resetBtn.addEventListener('click', e => {
    targetInput = document.querySelector('#' + e.target.dataset.inputId);
    targetInput.value = null;
    targetInput.dataset.changed = true;     
}));

imageBgButton.addEventListener('click', () => {
    mainProcess.openImg();    
});

videoBgButton.addEventListener('click', () => {
    mainProcess.openVideo();    
});

resetButton.addEventListener('click', function() {
    remote.getCurrentWindow().close();
});

//SUBMISSSION

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
            var value = input.type === 'checkbox'? input.checked : input.value;
            var insertTag = input.value? input.dataset.insert + '="' + value + '"' : '';
            var insertPattern = input.dataset.insert + '="[^"]+"';
            insert(insertTag, insertPattern);
        })
    ;
    
    remote.getCurrentWindow().close();
});
