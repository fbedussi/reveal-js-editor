import {remote} from 'electron';

import React from 'react';
import {connect} from 'react-redux';

import {openFile, saveProject, saveMd, saveHtml, showInFolder, openInEditor} from '../actions/fileActions';
import {copyHtmlToClipboard} from '../actions/actions';
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
    openInEditor: () => dispatch(openInEditor())
});



class Menu extends React.Component {
    
    getTemplate() {
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