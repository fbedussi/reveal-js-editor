const electron = require('electron');
const dialog = electron.dialog;

filters = {
    css: {
            name: 'Css',
            extensions: ['css']
        },
        
    img: {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'svg', 'gif']
        },
    
    video: {
            name: 'Video',
            extensions: ['avi', 'mp4', 'mpg', 'mpeg']
        }
}

function openFile(fileType, callingWindow) {
    console.log('pippo ', filters[fileType]);
    const files = dialog.showOpenDialog(callingWindow, {
        properties: ['openFile'],
        filters: [filters[fileType]]
    });

    if (!files) {
        return
    }

    const file = files[0];
    console.log(file);
    callingWindow.webContents.send('filePath', fileType, file);
}

/**
 * @desc opens a dialog box to select an image file and sends the file path to the callingWindow
 * @param {string} callingWindow the window that is requesting the file path
 * @returns {string} file path
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

/**
 * @desc opens a dialog box to select a video file and sends the file path to the callingWindow
 * @param {string} callingWindow the window that is requesting the file path
 * @returns {string} file path
 */
function openVideo(callingWindow) {
    const files = dialog.showOpenDialog(callingWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'Video',
            extensions: ['avi', 'mp4', 'mpg', 'mpeg']
        }]
    });

    if (!files) {
        return
    }

    const file = files[0];
    callingWindow.webContents.send('videoPath', file);
}

module.exports = {
    openImg,
    openVideo,
    openFile
}