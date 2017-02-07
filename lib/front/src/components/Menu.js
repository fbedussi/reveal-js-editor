import { remote } from 'electron';

import React from 'react';
import { connect } from 'react-redux';

import { openFile, saveProject, saveMd, saveHtml, showInFolder, openInEditor } from '../actions/fileActions';
import { copyHtmlToClipboard, insert, insertImage, openSlideBgPanel, togglePreviewPanel,
	openPreviewWin, setTheme, setConfiguration, openConfPanel } from '../actions/actions';
import { getLabel, getCurrentFileName, getCurrentTheme, getConfiguration } from '../selectors';

const mapStateToProps = (state) => ({
	label: getLabel(state),
	currentFileName: getCurrentFileName(state),
	currentTheme: getCurrentTheme(state),
	configuration: getConfiguration(state)
});

const mapDispatchToProps = dispatch => ({
	openFile: () => dispatch(openFile()),
	saveProject: () => dispatch(saveProject()),
	saveMd: () => dispatch(saveMd()),
	saveHtml: () => dispatch(saveHtml()),
	copyHtmlToClipboard: () => dispatch(copyHtmlToClipboard()),
	showInFolder: () => dispatch(showInFolder()),
	openInEditor: () => dispatch(openInEditor()),
	insert: (text, pattern) => dispatch(insert(text, pattern)),
	insertImage: () => dispatch(insertImage()),
	openSlideBgPanel: () => dispatch(openSlideBgPanel()),
	togglePreviewPanel: () => dispatch(togglePreviewPanel()),
	openPreviewWin: () => dispatch(openPreviewWin()),
	setTheme: (themeName) => dispatch(setTheme(themeName)),
	setConfiguration: (newConf) => dispatch(setConfiguration(newConf)),
	openConfPanel: () => dispatch(openConfPanel())
});



class Menu extends React.Component {

	getTemplate() {
		const transitions = ['None', 'Slide', 'Fade', 'Convex', 'Concave', 'Zoom'];

		const slideTransitionMenuItem = transitions.slice(1).map(transitionName => ({
			label: this.props.label(transitionName),
			click: () => this.props.insert(`transition="${transitionName.toLowerCase()}"', 'transition="[^"]+"`)
		}));

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
				accelerator: 'CommandOrControl+Shift+B',
				click: this.props.openSlideBgPanel
			});

		const themes = ['Black', 'White', 'League', 'Beige', 'Sky', 'Night', 'Serif', 'Simple'];
		// const customThemes = fs.readdirSync(path.join(__dirname, 'customThemes'))
		// 	.filter(file => fs.statSync(path.join(__dirname, 'customThemes', file)).isFile())
		// 	.map(fileName => path.basename(fileName, '.css'))
		// 	;

		const themeMenuItems = themes
			.map(themeName => ({
				label: this.props.label(themeName),
				type: 'radio',
				checked: Boolean(this.props.currentTheme === themeName.toLowerCase()),
				click: () => this.props.setTheme(themeName.toLowerCase())
			}))
			// .concat([{
			// 	type: 'separator'
			// }, {
			// 	label: _('Custom themes'),
			// 	enabled: Boolean(customThemes.length),
			// 	submenu: customThemes
			// 		.map(themeName => ({
			// 			label: _(themeName),
			// 			type: 'radio',
			// 			checked: Boolean(theme.get() === themeName.toLowerCase()),
			// 			click: () => theme.set(themeName.toLowerCase())
			// 		}))
			// }, {
			// 	label: _('Load custom theme'),
			// 	checked: Boolean(theme.get() === theme.custom.getName()),
			// 	click: () => theme.openCustomWin()
			// }, {
			// 	label: _('Delete custom theme'),
			// 	click: () => theme.openDeleteCustomWin(customThemes)
			// }])
			;

		return [{
			label: this.props.label('File'),
			submenu: [{
				label: this.props.label('Open a markdown file...'),
				accelerator: 'CmdOrCtrl+O',
				click: this.props.openFile
			}, {
				label: this.props.label('Save presentation...'),
				accelerator: 'CmdOrCtrl+S',
				click: this.props.saveProject
			}, {
				label: this.props.label('Save markdown only...'),
				click: this.props.saveMd
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

			}]
		}, {
			label: this.props.label('Edit'),
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
			submenu: insertMenuItems
		}, {
			label: this.props.label('Preview'),
			submenu: [{
				label: this.props.label('Show preview in this window'),
				accelerator: 'CmdOrCtrl+P',
				type: 'checkbox',
				click: this.props.togglePreviewPanel
			}, {
				label: this.props.label('Open preview in a new window'),
				accelerator: 'CommandOrControl+Shift+P',
				click: this.props.openPreviewWin
			}]
		}, {
			label: this.props.label('Theme'),
			submenu: themeMenuItems
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

	constructor(props) {
		super(props);

		this.buildMenu();
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.currentFileName !== this.props.currentFileName
	}

	componentDidUpdate() {
		this.buildMenu();
	}


	render() {
		return null;
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
