const fs = require('fs-extra');
const path = require('path');

function loadTranslations(iso) {
    var filePath = path.join(__dirname, 'locale', iso, 'ui.json');

	return new Promise((fullfill, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                fullfill(data);
            }
        });
    }).then(data => {
		return JSON.parse(data);
	});
}

function loadTranslationsSync(iso) {
    var translations = fs.readFileSync(path.join('lib', 'locale', iso, 'ui.json'), 'utf8');

    if (!translations) {
        return null;
    }

    return JSON.parse(translations);
}

module.exports = {
    loadTranslations,
    loadTranslationsSync
}
