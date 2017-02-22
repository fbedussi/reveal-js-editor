const path = require('path');
const fs = require('fs-extra');
const express = require('express');

const {app, BrowserWindow} = require('electron');

//const menu = require('./menu');
//const theme = require('./theme');
const file = require('./file');
const fileDialog = require('./fileDialog');
const labels = require('./labels');

const port = 3000;
var previewWin;


app.on('ready', () => {
	console.log('The application is ready.');


	const server = express();
	const port = 3000;
console.log(path.resolve('node_modules'));
	server
		.use('/', express.static(path.join(__dirname, 'front')))
		.use('/node_modules', express.static(path.resolve('node_modules')))
		.listen(port, (err) => {
			if (err) {
				return console.log('something bad happened', err)
			}

			console.log(`server is listening on ${port}`)

			var mainWindow = new BrowserWindow({
				width: 1000,
				height: 700,
				icon: path.join(__dirname, 'images', 'favicon.ico')
			});

			mainWindow.loadURL('http://localhost:' + port + '/index.html');

			mainWindow.on('closed', () => {
				mainWindow = null;
			});
		})
	;
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
	saveRemediConfig: file.saveRemediConfig,
	getThemesList: () => file.getFilesList({ path: 'front/skins', extension: '.css' }),
	getLanguagesList: () => file.getFilesList({ path: 'i18n', extension: '.json' }),
	getCustomThemesList: () => file.getFilesList({ path: 'customThemes', extension: '.css' }),
	delCustomTheme: (theme) => file.deleteFiles([path.join(__dirname, 'customThemes', theme + '.css')]),
	loadCustomTheme: (newThemePath) => file.copyFile(newThemePath, path.join(__dirname, 'customThemes', path.basename(newThemePath))),
	loadLabels: labels.loadLabels,
	loadLabelsSync: labels.loadLabelsSync,
	openPreviewWin

	//refreshPreview: menu.openPreview,
}
