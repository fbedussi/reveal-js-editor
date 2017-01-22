import {remote} from 'electron';

import React from 'react';
import {connect} from 'react-redux';

import {openFile, saveProject, saveMd, saveHtml, showInFolder, openInEditor} from '../actions/fileActions';
import {copyHtmlToClipboard, insert} from '../actions/actions';
import {getLabel, getCurrentFileName} from '../selectors';

const mapStateToProps = (state) => ({
    label: getLabel(state),
    currentFileName: getCurrentFileName(state)
});

const mapDispatchToProps = dispatch => ({
    openFile: () => dispatch(openFile()),
    saveProject: () => dispatch(saveProject()),
    saveMd: () => dispatch(saveMd()),
    saveHtml: () => dispatch(saveHtml()),
    copyHtmlToClipboard: () => dispatch(copyHtmlToClipboard()),
    showInFolder: () => dispatch(showInFolder()),
    openInEditor: () => dispatch(openInEditor()),
    insert: (text, pattern) => dispatch(insert(text, pattern))
});



class Menu extends React.Component {
    
    getTemplate() {
        const transitions = ['None', 'Slide',  'Fade', 'Convex', 'Concave', 'Zoom'];
        
        const slideTransitionMenuItem = transitions.slice(1).map(transitionName => ({
            label: this.props.label(transitionName),
            click: () => this.props.insert(`transition="${transitionName.toLowerCase()}"', 'transition="[^"]+"`)
        }));
    
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
        label:  this.props.label('Edit'),
        submenu: [{
            label:  this.props.label('Undo'),
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label:  this.props.label('Redo'),
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label:  this.props.label('Find'),
            accelerator: 'CmdOrCtrl+F',
            role: 'find'
        }, {
            label:  this.props.label('Replace'),
            accelerator: 'CmdOrCtrl+R',
            role: 'replace'
        }, {
            type: 'separator'
        }, {
            label:  this.props.label('Cut'),
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label:  this.props.label('Copy'),
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label:  this.props.label('Paste'),
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label:  this.props.label('Select All'),
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    }, {
        label: this.props.label('Insert'),
        submenu: [{
            label: this.props.label('Presentation slide'),
            accelerator: 'CommandOrControl+Shift+S',
            click: () => {this.props.insert('::::slide\n\n::::');}
        }, {
            label: this.props.label('Nested slide'),
            accelerator: 'CommandOrControl+Shift+N',
            click: () => {this.props.insert(':::slide\n\n:::');}
        }, {
            type: 'separator'
        }, {
            label: this.props.label('Image'),
            accelerator: 'CommandOrControl+Shift+I',
            //click: () => file.openImg(mainWindow)
        }, {
            type: 'separator'
        }, {
            label: this.props.label('Fragment fade in'),
            accelerator: 'CommandOrControl+Shift+F',
            click: () => {
                this.props.insert('{fragment}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment grow'),
            click: () => {
                this.props.insert('{fragment grow}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment shrink'),
            click: () => {
                this.props.insert('{fragment shrink}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment fade-out'),
            click: () => {
                this.props.insert('{fragment fade-out}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment fade-up'),
            click: () => {
                this.props.insert('{fragment fade-up'), '{fragment[^}]*}';
            }
        }, {
            label: this.props.label('Fragment current-visible'),
            click: () => {
                this.props.insert('{fragment current-visible}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment highlight-current-blue'),
            click: () => {
                this.props.insert('{fragment highlight-current-blue}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment highlight-red'),
            click: () => {
                this.props.insert('{fragment highlight-red}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment highlight-green'),
            click: () => {
                this.props.insert('{fragment highlight-green}', '{fragment[^}]*}');
            }
        }, {
            label: this.props.label('Fragment highlight-blue'),
            click: () => {
                this.props.insert('{fragment highlight-blue}', '{fragment[^}]*}');
            }
        }, {
            type: 'separator'
        }, {
            label: this.props.label('Speakers note'),
            click: () => {
                this.props.insert(':::speakerNote\n\n:::');
            }
        }, {
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
            //click: () => {
            //    BrowserWindow.getFocusedWindow().webContents.send('getCurrentSlideBackgrounSettings')
            //}
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