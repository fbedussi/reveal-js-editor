const {ipcRenderer, remote, shell} = require('electron');

const mainProcess = remote.require('./background')
const _ = mainProcess.getText;
const {createComponent, ui} = require('../ui');

//Init UI
createComponent().getEl('label[for="colorBg"]').setText(() => _('Background color'));
createComponent().getEl('label[for="imageBg"]').setText(() => _('Background image'));
createComponent().getEl('label[for="bgSize"]').setText(() => _('Background size'));
createComponent().getEl('label[for="bgPositionX"]').setText(() => _('Background position x'));
createComponent().getEl('label[for="bgPositionY"]').setText(() => _('Background position y'));
createComponent().getEl('label[for="bgRepeat"]').setText(() => _('Background repeat'));
createComponent().getEl('label[for="videoBg"]').setText(() => _('Background video'));
createComponent().getEl('label[for="videoBgLoop"]').setText(() => _('Background video loop'));
createComponent().getEl('label[for="videoBgMuted"]').setText(() => _('Background video muted'));
createComponent().getEl('label[for="iframeBg"]').setText(() => _('Background web page'));

const imageBgButton = createComponent().getEl('#imageBgButton').setText(() => _('Select image')).on('click', () => {
    mainProcess.openImg();    
});
const imageBgInput = document.querySelector('#imageBg');
const videoBgButton = createComponent().getEl('#videoBgButton').setText(() => _('Select video')).on('click', () => {
    mainProcess.openVideo();    
});
const videoBgInput = document.querySelector('#videoBg');
const videoBgLoopInput = document.querySelector('#videoBgLoop');
const videoBgMutedInput = document.querySelector('#videoBgMuted');
const resetInputs = Array.from(document.querySelectorAll('.resetInput'));
const inputs = Array.from(document.querySelectorAll('input, #bgRepeat'));
const bgPositionPartialsInput = Array.from(document.querySelectorAll('.bgPositionPartial'));
const bgPositionInput = document.querySelector('#bgPosition');

const resetButton = createComponent().getEl('#resetButton').setText(() => _('Reset')).on('click', function() {
    remote.getCurrentWindow().close();
});
const applyButton = createComponent().getEl('#applyButton').setText(() => _('Apply')).on('click', function(e) {
    e.preventDefault();

    inputs
        .filter(input => input.dataset.changed)
        .forEach(input => {
            var value = input.type === 'checkbox'? input.checked : input.value;
            var insertTag = input.value? input.dataset.insert + '="' + value + '"' : '';
            var insertPattern = input.dataset.insert + '="[^"]+"';
            remote.getCurrentWindow().getParentWindow().webContents.send('insert', insertTag, insertPattern);
        })
    ;
    
    remote.getCurrentWindow().close();
});

function enableVideoOptions() {
    videoBgLoopInput.disabled = videoBgMutedInput.disabled = false;    
}

ipcRenderer
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

//This is needed since the closing of the window opened by mainProcess.openImg();
//triggers the form submission
document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
});
