const path = require('path');

const {app, BrowserWindow} = require('electron');

//const menu = require('./menu');
//const theme = require('./theme');
const file = require('./file');
const fileDialog = require('./fileDialog');
const labels = require('./labels');

var previewWin;


app.on('ready', () => {
	console.log('The application is ready.');

	var mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		icon: path.join(__dirname, 'images', 'favicon.ico')
	});

	mainWindow.loadURL('file://' + path.join(__dirname, 'front', 'index.html'));

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});

function openPreviewWin(content) {
	// if (previewWin) { //refresh
	// 	previewWin.webContents.send('refresh', content, configuration.get(), theme.get());
	// 	return;
	// }
	return new Promise((resolve, reject) => {
		var previewWin = new BrowserWindow({
			width: 600,
			height: 600,
			//autoHideMenuBar: true,
			center: true,
			show: false,
			icon: path.join(__dirname, 'images', 'favicon.ico'),
			webPreferences: {
				devTools: true
			}
		});

		previewWin.setMenuBarVisibility(false);
		//previewWin.webContents.openDevTools()
		previewWin.loadURL('file://' + path.join(__dirname, 'preview', 'preview.html'));

		previewWin.once('ready-to-show', () => {
			//previewWin.webContents.send('init', content, configuration.get(), theme.get())
			previewWin.show()

			resolve(previewWin);
		});

		// previewWin.on('closed', () => {
		// 	previewWin = null;
		// });
	});

}

module.exports = {
	openFile: file.open,
	saveProject: file.save,
	saveMd: file.saveMd,
	getFilePath: fileDialog.getFilePath,
	getRemediConfig: file.getRemediConfig,
	getThemesList: () => file.getFilesList({path: 'front/skins', extension: '.css'}),
	getLanguagesList: () => file.getFilesList({path: 'i18n', extension: '.json'}),
	getCustomThemesList: () => file.getFilesList({path: 'customThemes', extension: '.css'}),
	delCustomTheme: (theme) => file.deleteFiles([path.join(__dirname, 'customThemes', theme + '.css')]),
	loadCustomTheme: (newThemePath) => file.copyFile(newThemePath, path.join(__dirname, 'customThemes', path.basename(newThemePath))),
	loadLabels: labels.loadLabels,
	loadLabelsSync: labels.loadLabelsSync,
	openPreviewWin

	//refreshPreview: menu.openPreview,
}
