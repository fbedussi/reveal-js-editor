const {ipcRenderer, remote, shell} = require('electron');

const mainProcess = remote.require('./main');
const _ = mainProcess.getText;
const {createComponent, ui} = require('../ui');


//Init UI
createComponent().getEl('#themeNameTh').setText(() => _('Theme name'));

const resetButton = createComponent().getEl('#resetButton').setText(() => _('Reset')).on('click', function() {
    remote.getCurrentWindow().close();
});
const applyButton = createComponent().getEl('#deleteButton').setText(() => _('Delete')).on('click', function(e) {
    e.preventDefault();
    var themesToDelete = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => cb.checked)
        .map(el => el.id)
    ;
    mainProcess.deleteCssThemes(themesToDelete);
    
    remote.getCurrentWindow().close();
});


//This is needed since the closing of the window opened by mainProcess.openImg();
//triggers the form submission
document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
});

ipcRenderer
    .on('init', (event, customThemes) => {
        var tbody = document.getElementsByTagName('tbody')[0];
        
        customThemes.forEach(theme => {
            var tr = document.createElement('tr');
            tr.innerHTML = `<td><input type="checkbox" id="${theme}"></td><td>${theme}</td>`;
            tbody.appendChild(tr);           
        })
    })
;