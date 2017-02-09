const fs = require('fs-extra');
const path = require('path');

function loadLabels(iso) {
    var filePath = path.join(__dirname, 'i18n', iso + '.json');

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

function loadLabelsSync(iso) {
    var translations = fs.readFileSync(path.join('lib', 'locale', iso, 'ui.json'), 'utf8');

    if (!translations) {
        return null;
    }

    return JSON.parse(translations);
}

module.exports = {
    loadLabels,
    loadLabelsSync
}
