const fs = require('fs-extra');

var translations = {};
var languageIso;

function loadTranslations(iso, cb) {
    languageIso = iso;
    
    fs.readFile(`./lib/locale/${iso}/ui.json`, 'utf8', (err, data) => {
        if (err) {
            console.log(`No transaltions found for language ${iso}. Fallback to en`);
            translations = {};
            return cb();
        }
        
        translations = JSON.parse(data);
        cb();
    });
}

function getText(label) {
    return  translations.hasOwnProperty(label)? translations[label] : label;
}

function getLanguageIso() {
    return languageIso;
}

module.exports = {
    loadTranslations,
    getText,
    getLanguageIso
}