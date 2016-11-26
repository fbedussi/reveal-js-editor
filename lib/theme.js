var theme = 'none';
const main = require('./main');

function set(newTheme) {
    theme = newTheme;
    main.getMainWin().webContents.send('themeChange', theme);
}

function get() {
    return theme;
}

exports.get = get;
exports.set = set;