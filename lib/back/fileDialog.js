const electron = require('electron');
const dialog = electron.dialog;

/**
 * @desc opens a dialog box to select an image file and sends the file path to the callingWindow
 * @param {string} callingWindow the window that is requesting the file path
 * @returns {string} image file path
 */
function openImg(callingWindow) {
    const files = dialog.showOpenDialog(callingWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'svg', 'gif']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    console.log(file);
    callingWindow.webContents.send('imgPath', file);
}

module.exports = {
    openImg
}