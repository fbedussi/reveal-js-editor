const {ipcRenderer, remote, shell} = require('electron');

const mainProcess = remote.require('./main')
const _ = mainProcess.getText;


//Init UI
document.querySelector('#imageBgButton').addEventListener('click', () => {
    mainProcess.openImg();
});
const imageBgInput = document.querySelector('#imageBg');
document.querySelector('#videoBgButton').addEventListener('click', () => {
    mainProcess.openVideo();
});
const videoBgInput = document.querySelector('#videoBg');
const videoBgLoopInput = document.querySelector('#videoBgLoop');
const videoBgMutedInput = document.querySelector('#videoBgMuted');
const resetInputs = Array.from(document.querySelectorAll('.resetInput'));
const inputs = Array.from(document.querySelectorAll('input, #bgRepeat'));
const bgPositionPartialsInput = Array.from(document.querySelectorAll('.bgPositionPartial'));
const bgPositionInput = document.querySelector('#bgPosition');

document.querySelector('#resetButton').addEventListener('click', function() {
    remote.getCurrentWindow().close();
});
document.querySelector('#applyButton').addEventListener('click', function(e) {
    e.preventDefault();
	var settings = {};

    inputs
        .filter(input => input.dataset.changed)
        .forEach(input => {
            var value = input.type === 'checkbox'? input.checked : input.value;
            var insertTag = input.value? input.dataset.insert + '="' + value + '"' : '';
            var insertPattern = input.dataset.insert + '="[^"]+"';
            //remote.getCurrentWindow().getParentWindow().webContents.send('insert', insertTag, insertPattern);
			settings[input.dataset.insert.replace(/-(.)/, (match, p1) => p1.toUpperCase())] = {value: insertTag, pattern: insertPattern};
        })
    ;

	mainProcess.bgSettings.set(settings);

    remote.getCurrentWindow().close();
});

function enableVideoOptions() {
    videoBgLoopInput.disabled = videoBgMutedInput.disabled = false;
}

ipcRenderer
    .on('init', (event, currentSettings, uiConf) => {
        if (uiConf) {
            document.querySelector('#colorSchemeLink').href = `../skins/${uiConf.colorScheme}.css`;
        }

		console.log(currentSettings);

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
