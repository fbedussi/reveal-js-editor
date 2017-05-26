import {remote} from 'electron';

import React from 'react';
import {connect} from 'react-redux';

import {openFile, saveProject, saveMd, saveCurrentMd, saveHtml, showInFolder, openInEditor} from '../actions/fileActions';
import {copyHtmlToClipboard, insert, insertImage, openSlideBgPanel, togglePreviewPanel, setColorScheme,
	openPreviewWin, setTheme, setTransition, setConfiguration, openConfPanel, setUiConf, changeLanguage, openThemesPanel} from '../actions/actions';
import {getLabel, getRecentFiles, getCurrentFileName, getCurrentTheme, getConfiguration, getUiConf, getPreviewPanelOpen} from '../selectors';

const mapStateToProps = (state) => ({
	label: getLabel(state),
	currentFileName: getCurrentFileName(state),
	currentTheme: getCurrentTheme(state),
	configuration: getConfiguration(state),
	uiConf: getUiConf(state),
	recentFiles: getRecentFiles(state),
	previewOpen: getPreviewPanelOpen(state)
});

const mapDispatchToProps = dispatch => ({
	openFile: (filePath) => dispatch(openFile(filePath)),
	saveProject: () => dispatch(saveProject()),
	saveMd: () => dispatch(saveMd()),
	saveCurrentMd: () => dispatch(saveCurrentMd()),
	saveHtml: () => dispatch(saveHtml()),
	copyHtmlToClipboard: () => dispatch(copyHtmlToClipboard()),
	showInFolder: () => dispatch(showInFolder()),
	openInEditor: () => dispatch(openInEditor()),
	insert: (text, pattern) => dispatch(insert(text, pattern)),
	insertImage: () => dispatch(insertImage()),
	openSlideBgPanel: () => dispatch(openSlideBgPanel()),
	togglePreviewPanel: () => dispatch(togglePreviewPanel()),
	openPreviewWin: () => dispatch(openPreviewWin()),
	setColorScheme: (colorScheme) => dispatch(setColorScheme(colorScheme)),
	setTheme: (themeName) => dispatch(setTheme(themeName)),
	setTransition: (transitionName) => dispatch(setTransition(transitionName)),
	setConfiguration: (newConf) => dispatch(setConfiguration(newConf)),
	openConfPanel: () => dispatch(openConfPanel()),
	setUiConf: (newConf) => dispatch(setUiConf(newConf)),
	changeLanguage: (newIso) => dispatch(changeLanguage(newIso)),
	openThemesPanel: () => dispatch(openThemesPanel())
});

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.transitions = ['None', 'Slide', 'Fade', 'Convex', 'Concave', 'Zoom'];
	}

	getFileItems() {
		const currentFile = Boolean(this.props.currentFileName.length);
		var fileItems = [{
				label: this.props.label('Open a markdown file...'),
				accelerator: 'CmdOrCtrl+O',
				click: () => this.props.openFile()
			}, {
				label: this.props.label('Save presentation...'),
				click: this.props.saveProject
			}, {
				label: this.props.label('Save markdown only...'),
				accelerator: !currentFile ? 'CmdOrCtrl+S' : null,
				visible: !currentFile,
				click: this.props.saveMd
			}, {
				label: this.props.label('Save') + ' ' + this.props.currentFileName,
				accelerator: currentFile ? 'CmdOrCtrl+S' : null,
				click: this.props.saveCurrentMd,
				visible: currentFile,
			}, {
				label: this.props.label('Save HTML only...'),
				click: this.props.saveHtml
			}, {
				label: this.props.label('Copy HTML to clipboard'),
				click: this.props.copyHtmlToClipboard
			}, {
				label: this.props.label('Show in file system'),
				enabled: Boolean(this.props.currentFileName.length),
				click: this.props.showInFolder
			}, {
				label: this.props.label('Open in default editor'),
				enabled: Boolean(this.props.currentFileName.length),
				click: this.props.openInEditor
			}];

		if (this.props.recentFiles.length) {
			const recenfFilesItems = this.props.recentFiles.map(filePath => ({
				label: filePath,
				click: () => this.props.openFile(filePath)
			}));

			fileItems = fileItems.concat({
				type: 'separator'
			}, recenfFilesItems);
		}

		return fileItems;
	}

	getInsertMenuItems(slideTransitionMenuItem) {
		const insertMenuItems = [{
			label: this.props.label('Presentation slide'),
			accelerator: 'CommandOrControl+Shift+S',
			click: () => { this.props.insert('::::slide\n\n::::'); }
		}, {
			label: this.props.label('Nested slide'),
			accelerator: 'CommandOrControl+Shift+N',
			click: () => { this.props.insert(':::slide\n\n:::'); }
		}, {
			type: 'separator'
		}, {
			label: this.props.label('Code block'),
			accelerator: 'CommandOrControl+Shift+C',
			click: () => { this.props.insert('````\n\n````'); }
		}
		, {
			type: 'separator'
		}, {
			label: this.props.label('Image'),
			accelerator: 'CommandOrControl+Shift+I',
			click: () => { this.props.insertImage(); }
		}, {
			type: 'separator'
		}, {
			label: this.props.label('Fragment fade in'),
			accelerator: 'CommandOrControl+Shift+F',
			click: () => {
				this.props.insert('{fragment}', '{fragment[^}]*}');
			}
		}];

		['Fragment grow',
			'Fragment shrink',
			'Fragment fade-out',
			'Fragment fade-up',
			'Fragment current-visible',
			'Fragment highlight-current-blue',
			'Fragment highlight-red',
			'Fragment highlight-green',
			'Fragment highlight-blue'
		].forEach(fragmentName => {
			insertMenuItems.push(
				{
					label: this.props.label(fragmentName),
					click: () => {
						this.props.insert(`{${fragmentName.toLowerCase()}}`, '{fragment[^}]*}');
					}
				}
			)
		});

		insertMenuItems.push({
			type: 'separator'
		}, {
				label: this.props.label('Individual slide transition'),
				submenu: slideTransitionMenuItem
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Slide class'),
				click: () => this.props.insert('class=""', 'class="[^"]*"')
			}, {
				label: this.props.label('Slide id'),
				click: () => this.props.insert('id=""', 'id="[^"]*"')
			}, {
				label: this.props.label('Slide background...'),
				enabled: !this.props.previewOpen,
				accelerator: 'CommandOrControl+Shift+B',
				click: this.props.openSlideBgPanel
			});

		return insertMenuItems;
	}

	getThemeMenuItems() {
		const themes = ['Black', 'White', 'League', 'Beige', 'Sky', 'Night', 'Serif', 'Simple'];

		const themeMenuItems = themes
			.map(themeName => ({
				label: this.props.label(themeName),
				type: 'checkbox',
				checked: this.props.currentTheme === themeName.toLowerCase(),
				click: () => this.props.setTheme(themeName.toLowerCase())
			}))
			.concat([{
				type: 'separator'
			}, {
				label: this.props.label('Custom themes'),
				enabled: Boolean(this.props.uiConf.customThemes.length),
				submenu: this.props.uiConf.customThemes
					.map(themeName => ({
						label: themeName,
						type: 'checkbox',
						checked: this.props.currentTheme === themeName,
						click: () => this.props.setTheme(themeName.toLowerCase())
					}))
			}, {
				label: this.props.label('Manage custom themes'),
				click: this.props.openThemesPanel
			}])
		;

		return themeMenuItems;
	}

	getLanguageMenuItems() {
		return this.props.uiConf.languages.map(iso => ({
			label: iso,
			type: 'radio',
			checked: this.props.uiConf.currentLanguage === iso,
			click: (menuItem) => {
				this.props.setUiConf({currentLanguage: menuItem.label});
				this.props.changeLanguage(menuItem.label);
			}
		}));
	}

	getColorSchemeMenuItems() {
		return this.props.uiConf.colorSchemes.map(fileName => ({
            label: fileName,
            type: 'radio',
            checked: this.props.uiConf.currentColorScheme === fileName,
            click: (menuItem) => {this.props.setColorScheme(menuItem.label)}
        }));
	}

	getSlideTransitionMenuItem() {
		 return this.transitions.slice(1).map(transitionName => ({
			label: this.props.label(transitionName),
			click: () => this.props.insert(`transition="${transitionName.toLowerCase()}"', 'transition="[^"]+"`)
		}));
	}

	getTransitionMenuItems() {
		return this.transitions.map(transitionName => ({
			label: this.props.label(transitionName),
			type: 'radio',
			checked: this.props.configuration.transition === transitionName.toLowerCase(),
			click: () => this.props.setTransition(transitionName.toLowerCase())
		}));
	}

	getTemplate() {
		const fileItems = this.getFileItems();
		const transitionMenuItems = this.getTransitionMenuItems();
		const insertMenuItems = this.getInsertMenuItems(transitionMenuItems);
		const themeMenuItems = this.getThemeMenuItems();
		const languageMenuItems = this.getLanguageMenuItems();
		const colorSchemesMenuItems = this.getColorSchemeMenuItems();
		const slideTransitionMenuItem = this.getSlideTransitionMenuItem();

		return [{
			label: this.props.label('File'),
			submenu: fileItems
		}, {
			label: this.props.label('Edit'),
			enabled: !this.props.previewOpen,
			submenu: [{
				label: this.props.label('Undo'),
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
			}, {
				label: this.props.label('Redo'),
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Find'),
				accelerator: 'CmdOrCtrl+F',
				role: 'find'
			}, {
				label: this.props.label('Replace'),
				accelerator: 'CmdOrCtrl+R',
				role: 'replace'
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Cut'),
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
			}, {
				label: this.props.label('Copy'),
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			}, {
				label: this.props.label('Paste'),
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			}, {
				label: this.props.label('Select All'),
				accelerator: 'CmdOrCtrl+A',
				role: 'selectall'
			}]
		}, {
			label: this.props.label('Insert'),
			enabled: !this.props.previewOpen,
			submenu: insertMenuItems
		}, {
			label: this.props.label('Preview'),
			submenu: [{
				label: this.props.label('Show preview in this window'),
				accelerator: 'CmdOrCtrl+P',
				type: 'checkbox',
				checked: this.props.uiConf.previewPanelOpen,
				click: this.props.togglePreviewPanel
			}
			// , {
			// 	label: this.props.label('Open preview in a new window'),
			// 	accelerator: 'CommandOrControl+Shift+P',
			// 	click: this.props.openPreviewWin
			// }
			]
		}, {
			label: this.props.label('Theme'),
			submenu: themeMenuItems
		}, {
			label: this.props.label('Transition'),
			submenu: transitionMenuItems
		}, {
			label: this.props.label('Configuration'),
			submenu: [{
				label: this.props.label('Display controls in the bottom right corner'),
				type: 'checkbox',
				checked: this.props.configuration.controls,
				click: (menuItem) => this.props.setConfiguration({controls: menuItem.checked})
			}, {
				label: this.props.label('Show progress'),
				type: 'checkbox',
				checked: this.props.configuration.progress,
				click: (menuItem) => this.props.setConfiguration({progress: menuItem.checked})
			}, {
				label: this.props.label('Show slide number'),
				type: 'checkbox',
				checked: this.props.configuration.slideNumber,
				click: (menuItem) => this.props.setConfiguration({slideNumber: menuItem.checked})
			}, {
				label: this.props.label('Push each slide to the browser history'),
				type: 'checkbox',
				checked: this.props.configuration.history,
				click: (menuItem) => this.props.setConfiguration({history: menuItem.checked})
			}, {
				label: this.props.label('Keyboard navigation'),
				type: 'checkbox',
				checked: this.props.configuration.keyboard,
				click: (menuItem) => this.props.setConfiguration({keyboard: menuItem.checked})
			}, {
				label: this.props.label('Enable the slide overview mode'),
				type: 'checkbox',
				checked: this.props.configuration.overview,
				click: (menuItem) => this.props.setConfiguration({overview: menuItem.checked})

			}, {
				label: this.props.label('Vertical centering of slides'),
				type: 'checkbox',
				checked: this.props.configuration.center,
				click: (menuItem) => this.props.setConfiguration({center: menuItem.checked})
			}, {
				label: this.props.label('Enables touch navigation'),
				type: 'checkbox',
				checked: this.props.configuration.touch,
				click: (menuItem) => this.props.setConfiguration({touch: menuItem.checked})
			}, {
				label: this.props.label('Loop the presentation'),
				type: 'checkbox',
				checked: this.props.configuration.loop,
				click: (menuItem) => this.props.setConfiguration({loop: menuItem.checked})
			}, {
				label: this.props.label('Change the presentation direction to be RTL'),
				type: 'checkbox',
				checked: this.props.configuration.rtl,
				click: (menuItem) => this.props.setConfiguration({rtl: menuItem.checked})
			}, {
				label: this.props.label('Randomizes the slide order at presentation load'),
				type: 'checkbox',
				checked: this.props.configuration.shuffle,
				click: (menuItem) => this.props.setConfiguration({shuffle: menuItem.checked})
			}, {
				label: this.props.label('Turn fragments on'),
				type: 'checkbox',
				checked: this.props.configuration.fragments,
				click: (menuItem) => this.props.setConfiguration({fragments: menuItem.checked})
			}, {
				label: this.props.label('Embedded'),
				type: 'checkbox',
				checked: this.props.configuration.embedded,
				click: (menuItem) => this.props.setConfiguration({embedded: menuItem.checked})
			}, {
				label: this.props.label('Show a help overlay when ? is pressed'),
				type: 'checkbox',
				checked: this.props.configuration.help,
				click: (menuItem) => this.props.setConfiguration({help: menuItem.checked})
			}, {
				label: this.props.label('Show speaker notes'),
				type: 'checkbox',
				checked: this.props.configuration.showNotes,
				click: (menuItem) => this.props.setConfiguration({showNotes: menuItem.checked})
			}, {
				label: this.props.label('Stop auto-sliding after user input'),
				type: 'checkbox',
				checked: this.props.configuration.autoSlideStoppable,
				click: (menuItem) => this.props.setConfiguration({autoSlideStoppable: menuItem.checked})
			}, {
				label: this.props.label('Enable slide navigation via mouse wheel'),
				type: 'checkbox',
				checked: this.props.configuration.mouseWheel,
				click: (menuItem) => this.props.setConfiguration({mouseWheel: menuItem.checked})
			}, {
				label: this.props.label('Hides the address bar on mobile devices'),
				type: 'checkbox',
				checked: this.props.configuration.hideAddressBar,
				click: (menuItem) => this.props.setConfiguration({hideAddressBar: menuItem.checked})
			}, {
				label: this.props.label('Opens links in an iframe preview overlay'),
				type: 'checkbox',
				checked: this.props.configuration.previewLinks,
				click: (menuItem) => this.props.setConfiguration({previewLinks: menuItem.checked})
			}, {
				label: this.props.label('Other configuration...'),
				click: this.props.openConfPanel
			}]
    }, {
        label: this.props.label('Interface'),
		enabled: !this.props.previewOpen,
        submenu: [{
            label: this.props.label('Change color scheme'),
            submenu: colorSchemesMenuItems
        }, {
            label: this.props.label('Set language'),
            submenu: languageMenuItems
        }, {
            label: this.props.label('Show button text'),
            type: 'checkbox',
            checked: this.props.uiConf.showButtonText,
            click: (menuItem) => {this.props.setUiConf({showButtonText: menuItem.checked})}
        }]
    }, {
			label: 'Developer',
			submenu: [{
				label: 'Toggle Developer Tools',
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'F12',
				click() {
					remote.getCurrentWindow()
						.webContents.toggleDevTools()
				}
			}]
		}];
	}

	buildMenu() {
		const menu = remote.Menu.buildFromTemplate(this.getTemplate());
		remote.Menu.setApplicationMenu(menu);
	}

	render() {
		if (this.props.uiConf.labels) {
			this.buildMenu();
		}

		return null;
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
